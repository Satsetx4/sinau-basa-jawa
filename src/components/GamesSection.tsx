import React, { useState } from 'react';
import { PILAH_WORDS, SUKU_KATA_GAMES, SCENARIO_DIALOGS, PilahWord, SukuKataItem, ScenarioDialog } from '../data/gamesData';
import {
  Volume2,
  Sparkles,
  Check,
  RefreshCw,
  Trophy,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Star,
  Puzzle,
  GraduationCap,
  UserCheck,
  User,
  ArrowLeft,
  HelpCircle
} from 'lucide-react';
import { playClick, playCorrect, playWrong, playFanfare } from '../lib/sound';
import { speakText } from '../lib/speech';
import confetti from 'canvas-confetti';

interface GamesSectionProps {
  onEarnStar: () => void;
  onBack?: () => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onEarnStar, onBack }) => {
  const [activeGameTab, setActiveGameTab] = useState<'pilah' | 'suku' | 'dialog'>('pilah');

  // State for Game 1: Pilah Swara
  const [pilahIndex, setPilahIndex] = useState(0);
  const [pilahScore, setPilahScore] = useState(0);
  const [pilahFeedback, setPilahFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [pilahCompleted, setPilahCompleted] = useState(false);

  // State for Game 2: Rakit Suku Kata
  const [sukuIndex, setSukuIndex] = useState(0);
  const [sukuScore, setSukuScore] = useState(0);
  const [assembledChunks, setAssembledChunks] = useState<string[]>([]);
  const [availableChunks, setAvailableChunks] = useState<string[]>([]);
  const [sukuFeedback, setSukuFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [sukuCompleted, setSukuCompleted] = useState(false);

  // State for Game 3: Simulator Dialog
  const [dialogIndex, setDialogIndex] = useState(0);
  const [dialogScore, setDialogScore] = useState(0);
  const [selectedDialogOpt, setSelectedDialogOpt] = useState<number | null>(null);
  const [dialogCompleted, setDialogCompleted] = useState(false);

  // Initialize/Reset Game 2 on start or word change
  const currentSukuGame = SUKU_KATA_GAMES[sukuIndex];
  React.useEffect(() => {
    if (currentSukuGame) {
      // Shuffle chunks
      const shuffled = [...currentSukuGame.chunks].sort(() => Math.random() - 0.5);
      setAvailableChunks(shuffled);
      setAssembledChunks([]);
      setSukuFeedback(null);
    }
  }, [sukuIndex]);

  // --- Handlers for Game 1: Pilah Swara ---
  const currentPilahWord = PILAH_WORDS[pilahIndex];

  const handlePilahAnswer = (category: 'jejeg' | 'miring') => {
    if (pilahFeedback) return;
    const isCorrect = currentPilahWord.category === category;
    if (isCorrect) {
      playCorrect();
      setPilahScore((prev) => prev + 1);
      onEarnStar();
      setPilahFeedback({
        isCorrect: true,
        message: `Bener banget! ${currentPilahWord.hint}`
      });
    } else {
      playWrong();
      setPilahFeedback({
        isCorrect: false,
        message: `Durung trep. ${currentPilahWord.hint}`
      });
    }
  };

  const handleNextPilah = () => {
    playClick();
    setPilahFeedback(null);
    if (pilahIndex + 1 < PILAH_WORDS.length) {
      setPilahIndex((prev) => prev + 1);
    } else {
      setPilahCompleted(true);
      playFanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetPilah = () => {
    playClick();
    setPilahIndex(0);
    setPilahScore(0);
    setPilahFeedback(null);
    setPilahCompleted(false);
  };

  // --- Handlers for Game 2: Suku Kata ---
  const handleAddChunk = (chunk: string, index: number) => {
    playClick();
    const newAssembled = [...assembledChunks, chunk];
    const newAvailable = [...availableChunks];
    newAvailable.splice(index, 1);

    setAssembledChunks(newAssembled);
    setAvailableChunks(newAvailable);

    // If all chunks selected, check correctness
    if (newAssembled.length === currentSukuGame.chunks.length) {
      const resultWord = newAssembled.join('');
      if (resultWord.toLowerCase() === currentSukuGame.word.toLowerCase()) {
        playCorrect();
        setSukuScore((prev) => prev + 1);
        onEarnStar();
        setSukuFeedback({
          isCorrect: true,
          message: `Mantap! "${resultWord}" iku tembung sing bener. (${currentSukuGame.meaning})`
        });
        speakText(resultWord);
      } else {
        playWrong();
        setSukuFeedback({
          isCorrect: false,
          message: `Urutan "${resultWord}" durung trep. Ayo dibaleni maneh!`
        });
      }
    }
  };

  const handleResetCurrentSuku = () => {
    playClick();
    const shuffled = [...currentSukuGame.chunks].sort(() => Math.random() - 0.5);
    setAvailableChunks(shuffled);
    setAssembledChunks([]);
    setSukuFeedback(null);
  };

  const handleRemoveChunk = (index: number) => {
    playClick();
    const removedChunk = assembledChunks[index];
    const newAssembled = [...assembledChunks];
    newAssembled.splice(index, 1);
    setAssembledChunks(newAssembled);
    setAvailableChunks([...availableChunks, removedChunk]);
    setSukuFeedback(null);
  };

  const handleNextSuku = () => {
    playClick();
    setSukuFeedback(null);
    if (sukuIndex + 1 < SUKU_KATA_GAMES.length) {
      setSukuIndex((prev) => prev + 1);
    } else {
      setSukuCompleted(true);
      playFanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetSukuAll = () => {
    playClick();
    setSukuIndex(0);
    setSukuScore(0);
    setSukuCompleted(false);
  };

  // --- Handlers for Game 3: Simulator Dialog ---
  const currentDialog = SCENARIO_DIALOGS[dialogIndex];

  const handleSelectDialogOption = (optIdx: number) => {
    if (selectedDialogOpt !== null) return;
    setSelectedDialogOpt(optIdx);
    const chosen = currentDialog.options[optIdx];
    if (chosen.isCorrect) {
      playCorrect();
      setDialogScore((prev) => prev + 1);
      onEarnStar();
    } else {
      playWrong();
    }
    speakText(chosen.text);
  };

  const handleNextDialog = () => {
    playClick();
    setSelectedDialogOpt(null);
    if (dialogIndex + 1 < SCENARIO_DIALOGS.length) {
      setDialogIndex((prev) => prev + 1);
    } else {
      setDialogCompleted(true);
      playFanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetDialog = () => {
    playClick();
    setDialogIndex(0);
    setDialogScore(0);
    setSelectedDialogOpt(null);
    setDialogCompleted(false);
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-heading font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arena Dolanan Interaktif Basa Jawa</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Dolanan Sinau karo Tantangan Cerdas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Sinau dadi saya nyenengake liwat dolanan pilah swara, nyambung suku kata, lan simulator tata krama pacelathon!
          </p>
        </div>

        {/* Game Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => { setActiveGameTab('pilah'); playClick(); }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeGameTab === 'pilah'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            1. Pilah Swara A
          </button>
          <button
            onClick={() => { setActiveGameTab('suku'); playClick(); }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeGameTab === 'suku'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            2. Rakit Suku Kata
          </button>
          <button
            onClick={() => { setActiveGameTab('dialog'); playClick(); }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeGameTab === 'dialog'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            3. Simulator Unggah-Ungguh
          </button>
        </div>
      </div>

      {/* ================= GAME 1: PILAH SWARA ================= */}
      {activeGameTab === 'pilah' && (
        <div className="max-w-3xl mx-auto">
          {pilahCompleted ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">
                Hore! Dolanan Pilah Swara Rampung!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans">
                Skormu: <strong className="text-emerald-600 dark:text-emerald-400 text-xl font-heading">{pilahScore}</strong> saka {PILAH_WORDS.length} tembung bener!
              </p>
              <button
                onClick={handleResetPilah}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Baleni Dolanan
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
              {/* Progress & Score Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
                <span className="text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400">
                  Tembung #{pilahIndex + 1} saka {PILAH_WORDS.length}
                </span>
                <span className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Skor Bintang: {pilahScore}</span>
                </span>
              </div>

              {/* Target Word Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/60 dark:to-slate-800/60 border-2 border-slate-200 dark:border-slate-700 text-center space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Wacanen kanthi teliti, banjur pilihen kategorine:
                </span>
                <div className="flex items-center justify-center gap-3">
                  <h3 className="font-heading font-bold text-5xl sm:text-6xl text-slate-900 dark:text-white tracking-tight">
                    {currentPilahWord.word}
                  </h3>
                  <button
                    onClick={() => {
                      playClick();
                      speakText(currentPilahWord.spokenText);
                    }}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white border border-slate-200 dark:border-slate-600 shadow-md transition-all active:scale-90"
                    title="Rungokna swara tembung"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Klik tombol speaker kanggo ngrungokake unine tembung iki!
                </p>
              </div>

              {/* Category Choice Baskets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  disabled={pilahFeedback !== null}
                  onClick={() => handlePilahAnswer('jejeg')}
                  className="p-5 rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 transition-all text-left group active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-heading font-bold text-sm mb-2 shadow-sm">
                    A
                  </div>
                  <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    Swara A Jejeg
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Nalika diwaca muni kaya aksara <strong className="text-emerald-600">&ldquo;O&rdquo;</strong> (kaya: sega, lara).
                  </p>
                </button>

                <button
                  disabled={pilahFeedback !== null}
                  onClick={() => handlePilahAnswer('miring')}
                  className="p-5 rounded-2xl border-2 border-sky-500/30 hover:border-sky-500 bg-sky-50/40 hover:bg-sky-50 dark:bg-sky-950/20 dark:hover:bg-sky-950/40 transition-all text-left group active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-heading font-bold text-sm mb-2 shadow-sm">
                    A
                  </div>
                  <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    Swara A Miring
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    Nalika diwaca tetep muni aksara <strong className="text-sky-600">&ldquo;A&rdquo;</strong> (kaya: bapak, dalan).
                  </p>
                </button>
              </div>

              {/* Answer Feedback Card */}
              {pilahFeedback && (
                <div
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                    pilahFeedback.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {pilahFeedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">{pilahFeedback.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNextPilah}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading font-bold text-xs shrink-0 shadow-md active:scale-95 transition-all"
                  >
                    Sabanjure ➔
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 2: RAKIT SUKU KATA ================= */}
      {activeGameTab === 'suku' && (
        <div className="max-w-3xl mx-auto">
          {sukuCompleted ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
                <Puzzle className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">
                Wah Joss! Dolanan Suku Kata Rampung!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans">
                Kowe wis pinter nggabungake {SUKU_KATA_GAMES.length} tembung basa Jawa kanthi makna bener!
              </p>
              <button
                onClick={handleResetSukuAll}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Baleni Dolanan
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
              {/* Progress & Clue */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
                <span className="text-xs font-heading font-bold text-sky-600 dark:text-sky-400">
                  Tembung #{sukuIndex + 1} saka {SUKU_KATA_GAMES.length}
                </span>
                <span className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Skor Bintang: {sukuScore}</span>
                </span>
              </div>

              {/* Clue Box */}
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block mb-1">
                  Petunjuk Tembung (Cangkriman Cilik):
                </span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  &ldquo;{currentSukuGame.clue}&rdquo;
                </p>
              </div>

              {/* Assembled Word Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center min-h-[96px] flex flex-col items-center justify-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Papan Gandheng Suku Kata:
                </span>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {assembledChunks.length === 0 ? (
                    <span className="text-xs sm:text-sm text-slate-400 italic">
                      (Pencet potongan suku kata ing ngisor iki kanggo nggabung)
                    </span>
                  ) : (
                    assembledChunks.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRemoveChunk(idx)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-rose-600 text-white font-heading font-bold text-2xl shadow-md animate-pop-in cursor-pointer group transition-all relative"
                        title="Tutul kanggo mbatalake/undo suku kata iki"
                        aria-label={`Batalake ${ch}`}
                      >
                        <span>{ch}</span>
                        <span className="text-[10px] absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
                      </button>
                    ))
                  )}
                </div>
                {assembledChunks.length > 0 && (
                  <span className="text-[11px] text-slate-400 italic">
                    💡 Tutul suku kata ing ndhuwur iki yen arep mbatalake (undo)
                  </span>
                )}
              </div>

              {/* Available Chunks to Click */}
              <div className="space-y-2">
                <span className="text-xs font-heading font-bold text-slate-500">
                  Pilihen Suku Kata kanthi Urut:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {availableChunks.map((chunk, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddChunk(chunk, idx)}
                      className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-700 border-2 border-emerald-500/40 hover:border-emerald-500 text-emerald-700 dark:text-emerald-300 font-heading font-bold text-2xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {chunk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback and Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={handleResetCurrentSuku}
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Baleni Susun Tembung Iki
                </button>

                {sukuFeedback && (
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold ${
                        sukuFeedback.isCorrect ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {sukuFeedback.message}
                    </span>
                    {sukuFeedback.isCorrect && (
                      <button
                        onClick={handleNextSuku}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all"
                      >
                        Sabanjure ➔
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= GAME 3: SIMULATOR UNGGAH-UNGGUH ================= */}
      {activeGameTab === 'dialog' && (
        <div className="max-w-3xl mx-auto">
          {dialogCompleted ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">
                Luar Biasa! Tata Krama Basa Jawa Mantul!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 font-sans">
                Kowe wis lulus uji simulator unggah-ungguh kanthi skor {dialogScore} saka {SCENARIO_DIALOGS.length}!
              </p>
              <button
                onClick={handleResetDialog}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Baleni Dolanan
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
                <span className="text-xs font-heading font-bold text-purple-600 dark:text-purple-400">
                  Kahanan #{dialogIndex + 1} saka {SCENARIO_DIALOGS.length}
                </span>
                <span className="text-xs font-heading font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>Skor Bintang: {dialogScore}</span>
                </span>
              </div>

              {/* Scenario Context Card */}
              <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-purple-300">
                    {currentDialog.characterRole === 'Guru' ? (
                      <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    ) : currentDialog.characterRole === 'Simbah' ? (
                      <UserCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <User className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
                      Lawan Bicara ({currentDialog.characterRole})
                    </span>
                    <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                      {currentDialog.characterName}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {currentDialog.situation}
                </p>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800">
                  <p className="font-heading font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span>{currentDialog.question}</span>
                  </p>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentDialog.options.map((opt, oIdx) => {
                  const isSelected = selectedDialogOpt === oIdx;
                  return (
                    <button
                      key={oIdx}
                      disabled={selectedDialogOpt !== null}
                      onClick={() => handleSelectDialogOption(oIdx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-400'
                            : 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-100 ring-2 ring-rose-400'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-heading font-bold text-xs text-slate-600 dark:text-slate-300 shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.text}
                        </span>
                      </div>
                      <span className="p-1 rounded-md text-slate-400 hover:text-emerald-600">
                        <Volume2 className="w-4 h-4" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dialog Explanation & Next */}
              {selectedDialogOpt !== null && (
                <div className="space-y-4 pt-2">
                  <div
                    className={`p-4 rounded-2xl border ${
                      currentDialog.options[selectedDialogOpt].isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-semibold mb-1">
                      {currentDialog.options[selectedDialogOpt].feedback}
                    </p>
                    <p className="text-xs font-sans text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{currentDialog.explanation}</span>
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextDialog}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-2"
                    >
                      <span>Kahanan Sabanjure</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
