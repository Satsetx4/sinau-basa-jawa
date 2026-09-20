import React, { useState, useEffect } from 'react';
import { BANK_SOAL, QuestionItem } from '../data/bankSoalData';
import {
  Award,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  RefreshCw,
  Clock,
  ArrowRight,
  Lightbulb,
  Check,
  Printer,
  FileText,
  Trophy,
  BookOpen,
  AlertTriangle,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { playClick, playCorrect, playWrong, playFanfare } from '../lib/sound';
import { speakText } from '../lib/speech';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  studentName: string;
  onOpenCertificate: (score: number) => void;
  onEarnStar: () => void;
  initialTopicFilter?: string | null;
  lastExamScore?: number | null;
  onSaveExamScore?: (score: number) => void;
  onBack?: () => void;
  onOpenNameModal?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  studentName,
  onOpenCertificate,
  onEarnStar,
  initialTopicFilter = null,
  lastExamScore = null,
  onSaveExamScore,
  onBack,
  onOpenNameModal
}) => {
  const [quizMode, setQuizMode] = useState<'latihan' | 'ujian'>('latihan');
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopicFilter || 'all');

  // Filtered question pool
  const filteredQuestions = BANK_SOAL.filter(
    (q) => selectedTopic === 'all' || q.topicId === selectedTopic
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer for Ujian mode
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const answeredCount = filteredQuestions.filter((q) => selectedAnswers[q.id] !== undefined).length;
  const unansweredCount = filteredQuestions.length - answeredCount;

  // Sync initial topic filter if changed from parent
  useEffect(() => {
    if (initialTopicFilter) {
      setSelectedTopic(initialTopicFilter);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
    }
  }, [initialTopicFilter]);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (quizMode === 'ujian' && isTimerRunning && !isSubmitted && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizMode, isTimerRunning, isSubmitted, timerSeconds]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const userChoice = selectedAnswers[currentQuestion?.id];
  const hasAnsweredCurrent = userChoice !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (quizMode === 'latihan' && hasAnsweredCurrent) return; // Locked in study mode after selection
    playClick();

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));

    if (quizMode === 'latihan') {
      const isCorrect = optIdx === currentQuestion.correctAnswer;
      if (isCorrect) {
        playCorrect();
        onEarnStar();
      } else {
        playWrong();
      }
    }
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / filteredQuestions.length) * 100);
    if (onSaveExamScore) {
      onSaveExamScore(finalScore);
    }

    if (finalScore >= 70) {
      playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
      playCorrect();
    }
  };

  const handleAttemptSubmit = () => {
    playClick();
    if (unansweredCount > 0 && quizMode === 'ujian') {
      setShowConfirmSubmit(true);
    } else {
      handleSubmitExam();
    }
  };

  const handleResetQuiz = () => {
    playClick();
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimerSeconds(900);
    if (quizMode === 'ujian') {
      setIsTimerRunning(true);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / filteredQuestions.length) * 100) || 0;
    return { correct, total: filteredQuestions.length, percentage };
  };

  const results = calculateResults();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSpeakQuestion = () => {
    playClick();
    if (currentQuestion) {
      const textToSpeak = `${currentQuestion.question}. Pilihan: ${currentQuestion.options.map((opt, i) => `${String.fromCharCode(65 + i)}: ${opt}`).join('. ')}`;
      speakText(textToSpeak);
    }
  };

  const topicsList = [
    { id: 'all', label: 'Kabeh Topik (20 Soal)' },
    { id: 'swara-a', label: 'Swara A Jejeg/Miring' },
    { id: 'nyimak-swara', label: 'Nyimak Swara' },
    { id: 'ngoko-krama', label: 'Ngoko & Krama' },
    { id: 'konsonan-th-dh', label: 'Konsonan TH/DH' },
    { id: 'suku-kata', label: 'Suku Kata' },
    { id: 'anggota-awak', label: 'Anggota Awak' },
  ];

  return (
    <section className="py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Wayfinding Back Button */}
      {onBack && (
        <button
          onClick={() => { playClick(); onBack(); }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-heading font-semibold transition-all mb-4 min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bali menyang Beranda</span>
        </button>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Bank Soal Standar Kurikulum Basa Jawa Kelas 3 SD</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Ujian & Gladhen Soal kanthi Pembahasan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Latihan soal interaktif kanthi rong mode: <strong>Mode Latihan</strong> (pembahasan langsung muncul) lan{' '}
            <strong>Mode Ujian</strong> (penilaian harian mawa wektu lan biji pungkasan)!
          </p>
        </div>

        {/* Mode Selector Pill */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          <button
            onClick={() => {
              setQuizMode('latihan');
              handleResetQuiz();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 min-h-[40px] cursor-pointer ${
              quizMode === 'latihan'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mode Latihan Santai</span>
          </button>
          <button
            onClick={() => {
              setQuizMode('ujian');
              setIsTimerRunning(true);
              handleResetQuiz();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 min-h-[40px] cursor-pointer ${
              quizMode === 'ujian'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Mode Penilaian Harian</span>
          </button>
        </div>
      </div>

      {/* Last Exam Score Banner (if already taken exam before) */}
      {lastExamScore !== null && !isSubmitted && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-amber-900 dark:text-amber-200">
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Biji Ujian Penilaian Harian Paling Anyar:</span>
            <span className="font-bold text-base text-amber-600 dark:text-amber-400">{lastExamScore}/100</span>
          </div>
          <button
            onClick={() => onOpenCertificate(lastExamScore)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
          >
            Deleng / Cetak Sertifikat ➔
          </button>
        </div>
      )}

      {/* Topic Filter Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {topicsList.map((t) => {
          const isSelected = selectedTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopic(t.id);
                setCurrentIndex(0);
                setSelectedAnswers({});
                setIsSubmitted(false);
                playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ================= EXAMINATION REPORT SCREEN (WHEN SUBMITTED) ================= */}
      {isSubmitted ? (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Summary Score Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-emerald-500/30 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-inner border border-emerald-300 dark:border-emerald-700">
              {results.percentage >= 70 ? (
                <Trophy className="w-10 h-10 text-amber-500" />
              ) : (
                <BookOpen className="w-10 h-10 text-emerald-600" />
              )}
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                Rapor Penilaian Harian Basa Jawa
              </span>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">
                {results.percentage >= 80 ? 'Pinter Banget, Bocah Hebat!' : results.percentage >= 60 ? 'Bagus! Terus Sinau ya!' : 'Ayo Semangat Sinau Maneh!'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans">
                Jeneng Siswa:{' '}
                {studentName.trim() ? (
                  <strong className="text-slate-800 dark:text-slate-200">{studentName.trim()}</strong>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      if (onOpenNameModal) onOpenNameModal();
                    }}
                    className="underline text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer"
                  >
                    [Klik kanggo nulis jenengmu]
                  </button>
                )}
              </p>
            </div>

            {/* Score Badges Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block uppercase">
                  Biji / Nilai
                </span>
                <span className="font-heading font-bold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
                  {results.percentage}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                  Bener
                </span>
                <span className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
                  {results.correct}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 block uppercase">
                  Salah
                </span>
                <span className="font-heading font-bold text-3xl sm:text-4xl text-rose-600 dark:text-rose-400">
                  {results.total - results.correct}
                </span>
              </div>
            </div>

            {/* Teacher Encouragement Letter */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-left flex items-start gap-3.5 max-w-2xl mx-auto">
              <div className="p-2 rounded-2xl bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                  Cathetan Evaluasi saka Bu Guru Siti:
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-sans">
                  {results.percentage >= 80
                    ? `Selamat ya${studentName.trim() ? ` ${studentName.trim()}` : ''}! Kowe wis wasis banget babagan Swara A Jejeg, Unggah-Ungguh Krama, lan Jeneng Anggota Awak. Pertahankan prestasimu!`
                    : results.percentage >= 60
                    ? `Wis apik${studentName.trim() ? ` ${studentName.trim()}` : ''}, nanging kudu luwih teliti maneh mbedakake Swara A Jejeg/Miring lan Konsonan TH/DH ya. Ayo gladhen maneh!`
                    : `Ora apa-apa${studentName.trim() ? ` ${studentName.trim()}` : ''}, sinau iku proses. Wacanen materi ing Bab 1 nganti 6 lan gatekna pituduh Bu Guru, mesthi sesuk entuk nilai 100!`}
                </p>
              </div>
            </div>

            {/* Action Buttons: Certificate, Retry, and Wayfinding Back */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenCertificate(results.percentage)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-heading font-bold text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 active:scale-95 transition-all min-h-[46px]"
              >
                <Printer className="w-4 h-4" />
                Cetak Sertifikat Siswa
              </button>

              <button
                onClick={handleResetQuiz}
                className="px-5 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading font-bold text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all min-h-[46px]"
              >
                <RefreshCw className="w-4 h-4" />
                Ulangi Ujian
              </button>

              {onBack && (
                <button
                  onClick={() => { playClick(); onBack(); }}
                  className="px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-heading font-semibold text-sm flex items-center gap-2 active:scale-95 transition-all min-h-[46px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Bali menyang Beranda
                </button>
              )}
            </div>
          </div>

          {/* Full Pedagogical Review of All Questions */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              Tinjauan Pembahasan Soal Jangkep ({filteredQuestions.length} Soal)
            </h3>

            <div className="space-y-4">
              {filteredQuestions.map((q, qIdx) => {
                const ans = selectedAnswers[q.id];
                const isCorrect = ans === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border bg-white dark:bg-slate-800/90 shadow-sm space-y-3 ${
                      isCorrect
                        ? 'border-emerald-500/40'
                        : 'border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-heading font-bold ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}
                        >
                          {qIdx + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{q.topicName}</span>
                      </div>
                      <span
                        className={`text-xs font-heading font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isCorrect ? 'Bener (+5)' : 'Salah (0)'}
                      </span>
                    </div>

                    <p className="font-heading font-bold text-base text-slate-900 dark:text-white">
                      {q.question}
                    </p>

                    {/* Options list showing user selection & correct option */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = ans === oIdx;
                        const isTheCorrectOne = q.correctAnswer === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              isTheCorrectOne
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                                : isChosen
                                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 font-medium'
                                : 'bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span>
                              <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                            </span>
                            {isTheCorrectOne && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                            {isChosen && !isTheCorrectOne && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Pedagogical Explanation */}
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                        💡 Pembahasan Guru SD:
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                      <p className="text-[11px] font-medium text-amber-700 dark:text-amber-300 pt-1">
                        🎯 <strong>Tips Teliti:</strong> {q.teacherTip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ================= ACTIVE QUESTION SCREEN ================= */
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Question Navigator Grid (1..N) - Quick Jump with Color-Coded Answer Status */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-heading font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <span>Daftar Pitakon:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ({answeredCount}/{filteredQuestions.length} Wis Diisi)
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {Math.round((answeredCount / filteredQuestions.length) * 100)}% Rampung
              </span>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${Math.round((answeredCount / filteredQuestions.length) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {filteredQuestions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = currentIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      playClick();
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-heading font-bold text-xs flex items-center justify-center shrink-0 transition-all cursor-pointer min-w-[32px] min-h-[32px] ${
                      isCurrent
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-2 scale-105 shadow-md'
                        : isAnswered
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                    title={`Soal nomer ${idx + 1} (${isAnswered ? 'Wis diisi' : 'Durung diisi'})`}
                    aria-label={`Soal nomer ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
            {/* Question Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-heading font-bold text-xs flex items-center justify-center">
                  {currentIndex + 1}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Saka {filteredQuestions.length} Pitakon ({currentQuestion.topicName})
                </span>
              </div>

              {quizMode === 'ujian' && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold border transition-colors ${
                    timerSeconds < 60
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 animate-pulse'
                      : timerSeconds < 180
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Wektu: {formatTime(timerSeconds)}</span>
                </div>
              )}
            </div>

            {/* Question Stem */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                  {currentQuestion.question}
                </h3>
                <button
                  onClick={handleSpeakQuestion}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors shrink-0"
                  title="Rungokna pitakon iki"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Multiple Choice Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = userChoice === oIdx;
                const isCorrectOption = currentQuestion.correctAnswer === oIdx;

                let optionStyle = 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                if (quizMode === 'latihan' && hasAnsweredCurrent) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-400 font-semibold';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 ring-2 ring-rose-400';
                  }
                } else if (quizMode === 'ujian' && isSelected) {
                  optionStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 font-bold';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.98] ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-heading font-bold text-xs ${
                          isSelected && quizMode === 'ujian'
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-sm font-medium leading-relaxed">{opt}</span>
                    </div>

                    {quizMode === 'latihan' && hasAnsweredCurrent && (
                      <div>
                        {isCorrectOption ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Pedagogical Explanation (In Study Mode when Answered) */}
            {quizMode === 'latihan' && hasAnsweredCurrent && (
              <div
                className={`p-5 rounded-2xl border space-y-2 animate-fade-in ${
                  userChoice === currentQuestion.correctAnswer
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Pembahasan Guru SD:
                  </span>
                  <button
                    onClick={() => speakText(currentQuestion.explanation)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:underline"
                  >
                    <Volume2 className="w-3 h-3" />
                    Rungokna
                  </button>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed font-sans text-slate-700 dark:text-slate-300">
                  {currentQuestion.explanation}
                </p>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 pt-1 border-t border-amber-200/60 dark:border-amber-800/60 flex items-start gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{currentQuestion.teacherTip}</span>
                </p>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/60 gap-3">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrevQuestion}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-heading font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Pitakon Sadurunge</span>
              </button>

              {currentIndex + 1 < filteredQuestions.length ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-2 min-h-[44px]"
                >
                  <span>Pitakon Sabanjure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleAttemptSubmit}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-md shadow-amber-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <Award className="w-4 h-4" />
                  <span>Kirim & Deleng Rapor</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Unanswered Questions Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl border border-amber-500/40 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Isih Ana Soal Sing Durung Diisi!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              Kowe durung ngrampungake <strong className="text-rose-600 dark:text-rose-400 font-bold">{unansweredCount} pitakon</strong> saka total {filteredQuestions.length} soal. Yakin arep dikirim saiki?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-heading font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                Terusna Nggarap Soal
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  handleSubmitExam();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-md shadow-amber-500/30 transition-all cursor-pointer"
              >
                Tetep Kirim Rapor
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
