import React, { useState, useEffect } from 'react';
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

export function App() {
  const [activeTab, setActiveTab] = useState<string>('materi');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sinau_jawa_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isMutedState, setIsMutedState] = useState<boolean>(getMuted);

  // Student profile & empty defaults on clean launch
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sinau_jawa_student_name') || '';
    }
    return '';
  });

  const [starsCount, setStarsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sinau_jawa_stars');
      return saved !== null ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [lastExamScore, setLastExamScore] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sinau_jawa_last_exam_score');
      return saved !== null ? parseInt(saved, 10) : null;
    }
    return null;
  });

  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sinau_jawa_completed_topics');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // First launch onboarding name modal
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('sinau_jawa_student_name');
    }
    return false;
  });

  const [quizTopicFilter, setQuizTopicFilter] = useState<string | null>(null);

  // Certificate Modal
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [certScore, setCertScore] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sinau_jawa_last_exam_score');
      return saved !== null ? parseInt(saved, 10) : null;
    }
    return null;
  });

  // Sync dark class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sinau_jawa_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sinau_jawa_dark_mode', 'false');
    }
  }, [isDark]);

  // Persist stars count
  useEffect(() => {
    localStorage.setItem('sinau_jawa_stars', starsCount.toString());
  }, [starsCount]);

  const handleEarnStar = (amount = 1) => {
    setStarsCount((prev) => {
      const next = prev + amount;
      localStorage.setItem('sinau_jawa_stars', next.toString());
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
      localStorage.setItem('sinau_jawa_completed_topics', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveExamScore = (score: number) => {
    setLastExamScore(score);
    setCertScore(score);
    localStorage.setItem('sinau_jawa_last_exam_score', score.toString());
    const earned = Math.max(1, Math.round(score / 10));
    handleEarnStar(earned);
  };

  const handleSaveStudentName = (name: string) => {
    const isFirstTime = !studentName;
    setStudentName(name);
    localStorage.setItem('sinau_jawa_student_name', name);
    setIsNameModalOpen(false);
    if (isFirstTime && name.trim()) {
      handleEarnStar(3);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Apa kowe yakin arep ngresiki kabeh data pasinaon? Jeneng, bintang, lan biji ujian bakal direset saka awal.')) {
      playClick();
      localStorage.removeItem('sinau_jawa_student_name');
      localStorage.removeItem('sinau_jawa_stars');
      localStorage.removeItem('sinau_jawa_last_exam_score');
      localStorage.removeItem('sinau_jawa_completed_topics');
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
              studentName={studentName || 'Bocah Pinter'}
              onOpenCertificate={handleOpenCertificate}
              onEarnStar={() => handleEarnStar(1)}
              initialTopicFilter={quizTopicFilter}
              lastExamScore={lastExamScore}
              onSaveExamScore={handleSaveExamScore}
              onBack={() => setActiveTab('materi')}
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
        studentName={studentName || 'Bocah Pinter'}
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
