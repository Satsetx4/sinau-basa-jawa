import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CertificateModal } from './components/CertificateModal';
import { NameModal } from './components/NameModal';
import { Footer } from './components/Footer';
import { setMuted, getMuted, playClick } from './lib/sound';
import { safeStorage, STORAGE_KEYS } from './lib/storage';
import { BANK_SOAL } from './data/bankSoalData';
import { MATERI_MODULES } from './data/materiData';
import { ExamResult, isCertificateEligible, parseExamResult } from './domain/assessment';
import { grantAchievement, parseStars } from './domain/progress';

const MateriSection = lazy(() => import('./components/MateriSection').then(module => ({ default: module.MateriSection })));
const AnggotaAwak = lazy(() => import('./components/AnggotaAwak').then(module => ({ default: module.AnggotaAwak })));
const GamesSection = lazy(() => import('./components/GamesSection').then(module => ({ default: module.GamesSection })));
const QuizSection = lazy(() => import('./components/QuizSection').then(module => ({ default: module.QuizSection })));
const KamusSection = lazy(() => import('./components/KamusSection').then(module => ({ default: module.KamusSection })));

const TABS = ['materi', 'awak', 'dolanan', 'soal', 'kamus'];

function readStringList(key: string): string[] {
  try {
    const value: unknown = JSON.parse(safeStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch { return []; }
}

export function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    return saved && TABS.includes(saved) ? saved : 'materi';
  });
  const [activeTopic, setActiveTopic] = useState<string>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_TOPIC);
    return MATERI_MODULES.some(module => module.id === saved) ? saved! : MATERI_MODULES[0].id;
  });

  // Dark/Light mode theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (saved !== null) return saved === 'true';
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isMutedState, setIsMutedState] = useState<boolean>(getMuted);

  // Student profile & empty defaults on clean launch (fresh start on new devices)
  const [studentName, setStudentName] = useState<string>(() => {
    return safeStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '';
  });

  const [starsCount, setStarsCount] = useState<number>(() => {
    return parseStars(safeStorage.getItem(STORAGE_KEYS.STARS));
  });

  const [examResult, setExamResult] = useState<ExamResult | null>(() =>
    parseExamResult(safeStorage.getItem(STORAGE_KEYS.EXAM_RESULT), BANK_SOAL));

  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    return readStringList(STORAGE_KEYS.COMPLETED_TOPICS).filter(id => MATERI_MODULES.some(module => module.id === id));
  });
  const completedTopicsRef = useRef(completedTopics);
  const achievementsRef = useRef(new Set([
    ...readStringList(STORAGE_KEYS.ACHIEVEMENTS),
    ...completedTopics.map(id => `topic:${id}`),
    ...(studentName ? ['profile:first-name'] : []),
  ]));
  const starsRef = useRef(starsCount);

  // First launch onboarding name modal (opens on clean fresh start)
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(() => {
    return !safeStorage.getItem(STORAGE_KEYS.STUDENT_NAME);
  });

  const [quizTopicFilter, setQuizTopicFilter] = useState<string | null>(null);
  const [quizSession, setQuizSession] = useState(0);

  // Certificate Modal
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);

  // Sync dark class on <html> & persist choice in localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      safeStorage.setItem(STORAGE_KEYS.DARK_MODE, 'true');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorage.setItem(STORAGE_KEYS.DARK_MODE, 'false');
    }
  }, [isDark]);

  // Persist stars count only on actual changes (avoids writing dirty '0' key before user action)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    safeStorage.setItem(STORAGE_KEYS.STARS, starsCount.toString());
  }, [starsCount]);

  useEffect(() => {
    if (safeStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) === null && achievementsRef.current.size) {
      safeStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify([...achievementsRef.current]));
    }
  }, []);

  const handleEarnStar = (achievementId: string, amount = 1) => {
    const next = grantAchievement({ stars: starsRef.current, achievements: [...achievementsRef.current] }, achievementId, amount);
    if (next.stars === starsRef.current) return;
    starsRef.current = next.stars;
    achievementsRef.current = new Set(next.achievements);
    safeStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(next.achievements));
    setStarsCount(next.stars);
  };

  const handleToggleCompleteTopic = (topicId: string) => {
    const previous = completedTopicsRef.current;
    const isCompleted = previous.includes(topicId);
    const updated = isCompleted ? previous.filter(id => id !== topicId) : [...previous, topicId];
    completedTopicsRef.current = updated;
    setCompletedTopics(updated);
    safeStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(updated));
    if (!isCompleted) handleEarnStar(`topic:${topicId}`, 5);
  };

  const handleSaveExamResult = (result: ExamResult) => {
    if (result.mode !== 'exam' || result.topicId !== null || result.totalQuestions !== BANK_SOAL.length) return;
    setExamResult(result);
    safeStorage.setItem(STORAGE_KEYS.EXAM_RESULT, JSON.stringify(result));
    handleEarnStar('exam:first-completion', Math.max(1, Math.round(result.score / 10)));
  };

  const handleSaveStudentName = (name: string) => {
    const trimmed = name.trim();
    const isFirstTime = !studentName;
    setStudentName(trimmed);
    if (trimmed) {
      safeStorage.setItem(STORAGE_KEYS.STUDENT_NAME, trimmed);
    } else {
      safeStorage.removeItem(STORAGE_KEYS.STUDENT_NAME);
    }
    setIsNameModalOpen(false);
    if (isFirstTime && trimmed) {
      handleEarnStar('profile:first-name', 3);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Apa kowe yakin arep ngresiki kabeh data pasinaon? Jeneng, bintang, lan biji ujian bakal direset saka awal (fresh start).')) {
      playClick();
      safeStorage.clearAllProgress();
      setStudentName('');
      setStarsCount(0);
      starsRef.current = 0;
      setExamResult(null);
      setCompletedTopics([]);
      completedTopicsRef.current = [];
      achievementsRef.current.clear();
      setQuizTopicFilter(null);
      setActiveTab('materi');
      setActiveTopic(MATERI_MODULES[0].id);
      setIsNameModalOpen(true);
    }
  };

  const handleStartQuizTopic = (topicId: string) => {
    setQuizTopicFilter(topicId);
    setActiveTab('soal');
  };

  const handleOpenCertificate = () => {
    if (isCertificateEligible(examResult, BANK_SOAL.length)) setIsCertOpen(true);
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'soal') {
      setQuizTopicFilter(null);
      setQuizSession(previous => previous + 1);
      safeStorage.removeItem(STORAGE_KEYS.QUIZ_DRAFT);
    }
    setActiveTab(tab);
  };

  const handleToggleMute = (muted: boolean) => {
    setIsMutedState(muted);
    setMuted(muted);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#fcfaf7] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top & Mobile Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        isDark={isDark}
        setIsDark={setIsDark}
        isMuted={isMutedState}
        setIsMuted={handleToggleMute}
        studentName={studentName}
        setStudentName={handleSaveStudentName}
        starsCount={starsCount}
        onOpenNameModal={() => setIsNameModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-24 md:pb-10">
        {/* Welcoming Hero Banner only on Materi/Beranda */}
        {activeTab === 'materi' && (
          <HeroBanner
            setActiveTab={handleNavigate}
            onOpenTopic={(topicId) => {
              safeStorage.setItem(STORAGE_KEYS.ACTIVE_TOPIC, topicId);
              setActiveTopic(topicId);
              document.getElementById('materi-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
            studentName={studentName}
            onOpenNameModal={() => setIsNameModalOpen(true)}
          />
        )}

        {/* Dynamic Tab Views */}
        <Suspense fallback={<div role="status" className="min-h-48 p-8 text-center text-slate-600 dark:text-slate-300">Mbukak kaca pasinaon…</div>}>
        <div className="transition-opacity duration-300">
          {activeTab === 'materi' && (
            <MateriSection
              key={activeTopic}
              onStartQuizTopic={handleStartQuizTopic}
              completedTopics={completedTopics}
              onToggleCompleteTopic={handleToggleCompleteTopic}
            />
          )}

          {activeTab === 'awak' && (
            <AnggotaAwak
              onEarnStar={(id) => handleEarnStar(`awak:${id}`)}
              onBack={() => setActiveTab('materi')}
            />
          )}

          {activeTab === 'dolanan' && (
            <GamesSection
              onEarnStar={(id) => handleEarnStar(`game:${id}`)}
              onBack={() => setActiveTab('materi')}
            />
          )}

          {activeTab === 'soal' && (
            <QuizSection
              key={`${quizTopicFilter || 'all'}:${quizSession}`}
              studentName={studentName}
              onOpenCertificate={handleOpenCertificate}
              onEarnStar={(id) => handleEarnStar(`practice:${id}`)}
              initialTopicFilter={quizTopicFilter}
              lastExamResult={examResult}
              onSaveExamResult={handleSaveExamResult}
              onBack={() => setActiveTab('materi')}
              onOpenNameModal={() => setIsNameModalOpen(true)}
            />
          )}

          {activeTab === 'kamus' && (
            <KamusSection
              onBack={() => setActiveTab('materi')}
            />
          )}
        </div>
        </Suspense>
      </main>

      {/* Footer with Reset Progress Action */}
      <Footer
        setActiveTab={handleNavigate}
        onResetProgress={handleResetProgress}
      />

      {/* Printable Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        studentName={studentName}
        onOpenNameModal={() => {
          setIsCertOpen(false);
          setIsNameModalOpen(true);
        }}
        result={examResult}
        onGoToQuiz={() => {
          setIsCertOpen(false);
          handleNavigate('soal');
        }}
      />

      {/* Child Onboarding & Name Personalization Modal */}
      {isNameModalOpen && <NameModal
        isOpen={isNameModalOpen}
        currentName={studentName}
        onSaveName={handleSaveStudentName}
        onClose={() => setIsNameModalOpen(false)}
        onResetProgress={studentName ? handleResetProgress : undefined}
        isFirstLaunch={!studentName}
      />}
    </div>
  );
}

export default App;
