import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MateriSection } from './components/MateriSection';
import { AnggotaAwak } from './components/AnggotaAwak';
import { GamesSection } from './components/GamesSection';
import { QuizSection } from './components/QuizSection';
import { KamusSection } from './components/KamusSection';
import { CertificateModal } from './components/CertificateModal';
import { NameModal } from './components/NameModal';
import { Footer } from './components/Footer';
import { setMuted, getMuted, playClick } from './lib/sound';
import { safeStorage, STORAGE_KEYS } from './lib/storage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('materi');

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
    const saved = safeStorage.getItem(STORAGE_KEYS.STARS);
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [lastExamScore, setLastExamScore] = useState<number | null>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.LAST_EXAM_SCORE);
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // First launch onboarding name modal (opens on clean fresh start)
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(() => {
    return !safeStorage.getItem(STORAGE_KEYS.STUDENT_NAME);
  });

  const [quizTopicFilter, setQuizTopicFilter] = useState<string | null>(null);

  // Certificate Modal
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [certScore, setCertScore] = useState<number | null>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.LAST_EXAM_SCORE);
    return saved !== null ? parseInt(saved, 10) : null;
  });

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

  const handleEarnStar = (amount = 1) => {
    setStarsCount((prev) => {
      const next = prev + amount;
      safeStorage.setItem(STORAGE_KEYS.STARS, next.toString());
      return next;
    });
  };

  const handleToggleCompleteTopic = (topicId: string) => {
    setCompletedTopics((prev) => {
      const isCompleted = prev.includes(topicId);
      let updated: string[];
      if (isCompleted) {
        updated = prev.filter((id) => id !== topicId);
      } else {
        updated = [...prev, topicId];
        handleEarnStar(5);
      }
      safeStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveExamScore = (score: number) => {
    setLastExamScore(score);
    setCertScore(score);
    safeStorage.setItem(STORAGE_KEYS.LAST_EXAM_SCORE, score.toString());
    const earned = Math.max(1, Math.round(score / 10));
    handleEarnStar(earned);
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
      handleEarnStar(3);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Apa kowe yakin arep ngresiki kabeh data pasinaon? Jeneng, bintang, lan biji ujian bakal direset saka awal (fresh start).')) {
      playClick();
      safeStorage.clearAllProgress();
      setStudentName('');
      setStarsCount(0);
      setLastExamScore(null);
      setCertScore(null);
      setCompletedTopics([]);
      setIsNameModalOpen(true);
    }
  };

  const handleStartQuizTopic = (topicId: string) => {
    setQuizTopicFilter(topicId);
    setActiveTab('soal');
  };

  const handleOpenCertificate = (score: number) => {
    setCertScore(score);
    setIsCertOpen(true);
  };

  const handleToggleMute = (muted: boolean) => {
    setIsMutedState(muted);
    setMuted(muted);
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#fcfaf7] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top & Mobile Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
            setActiveTab={setActiveTab}
            studentName={studentName}
            onOpenNameModal={() => setIsNameModalOpen(true)}
          />
        )}

        {/* Dynamic Tab Views */}
        <div className="transition-opacity duration-300">
          {activeTab === 'materi' && (
            <MateriSection
              onStartQuizTopic={handleStartQuizTopic}
              completedTopics={completedTopics}
              onToggleCompleteTopic={handleToggleCompleteTopic}
            />
          )}

          {activeTab === 'awak' && (
            <AnggotaAwak
              onEarnStar={() => handleEarnStar(1)}
              onBack={() => setActiveTab('materi')}
            />
          )}

          {activeTab === 'dolanan' && (
            <GamesSection
              onEarnStar={() => handleEarnStar(1)}
              onBack={() => setActiveTab('materi')}
            />
          )}

          {activeTab === 'soal' && (
            <QuizSection
              studentName={studentName}
              onOpenCertificate={handleOpenCertificate}
              onEarnStar={() => handleEarnStar(1)}
              initialTopicFilter={quizTopicFilter}
              lastExamScore={lastExamScore}
              onSaveExamScore={handleSaveExamScore}
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
      </main>

      {/* Footer with Reset Progress Action */}
      <Footer
        setActiveTab={setActiveTab}
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
        score={certScore ?? lastExamScore}
        onGoToQuiz={() => {
          setIsCertOpen(false);
          setActiveTab('soal');
        }}
      />

      {/* Child Onboarding & Name Personalization Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        currentName={studentName}
        onSaveName={handleSaveStudentName}
        onClose={() => setIsNameModalOpen(false)}
        onResetProgress={studentName ? handleResetProgress : undefined}
        isFirstLaunch={!studentName}
      />
    </div>
  );
}

export default App;
