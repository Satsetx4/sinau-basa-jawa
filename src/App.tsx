import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MateriSection } from './components/MateriSection';
import { AnggotaAwak } from './components/AnggotaAwak';
import { GamesSection } from './components/GamesSection';
import { QuizSection } from './components/QuizSection';
import { KamusSection } from './components/KamusSection';
import { CertificateModal } from './components/CertificateModal';
import { Footer } from './components/Footer';
import { setMuted, getMuted } from './lib/sound';

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

  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sinau_jawa_student_name') || 'Bima Arya';
    }
    return 'Bima Arya';
  });

  const [starsCount, setStarsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sinau_jawa_stars');
      return saved ? parseInt(saved, 10) : 15;
    }
    return 15;
  });

  const [quizTopicFilter, setQuizTopicFilter] = useState<string | null>(null);

  // Certificate Modal
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);
  const [certScore, setCertScore] = useState<number>(100);

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

  // Persist student name
  useEffect(() => {
    localStorage.setItem('sinau_jawa_student_name', studentName);
  }, [studentName]);

  // Persist stars
  useEffect(() => {
    localStorage.setItem('sinau_jawa_stars', starsCount.toString());
  }, [starsCount]);

  const handleEarnStar = () => {
    setStarsCount((prev) => prev + 1);
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

  return (
    <div className="min-h-screen bg-[#fcfaf7] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        isMuted={isMutedState}
        setIsMuted={handleToggleMute}
        studentName={studentName}
        setStudentName={setStudentName}
        starsCount={starsCount}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Welcoming Hero Banner */}
        <HeroBanner
          setActiveTab={setActiveTab}
          studentName={studentName}
        />

        {/* Dynamic Tab Views */}
        <div className="transition-opacity duration-300">
          {activeTab === 'materi' && (
            <MateriSection onStartQuizTopic={handleStartQuizTopic} />
          )}

          {activeTab === 'awak' && (
            <AnggotaAwak />
          )}

          {activeTab === 'dolanan' && (
            <GamesSection onEarnStar={handleEarnStar} />
          )}

          {activeTab === 'soal' && (
            <QuizSection
              studentName={studentName}
              onOpenCertificate={handleOpenCertificate}
              onEarnStar={handleEarnStar}
              initialTopicFilter={quizTopicFilter}
            />
          )}

          {activeTab === 'kamus' && (
            <KamusSection />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Printable Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        studentName={studentName}
        score={certScore}
      />
    </div>
  );
}

export default App;
