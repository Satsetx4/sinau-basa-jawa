import React, { useState, useMemo } from 'react';
import { Volume2, Sparkles, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { playClick, playCorrect, playWrong } from '../lib/sound';
import { speakText } from '../lib/speech';
import wayangSiswaImg from '../assets/wayang-siswa.jpg';

interface BodyPart {
  id: string;
  nameIndo: string;
  ngoko: string;
  kramaInggil: string;
  exampleSentence: string;
  teacherNote: string;
  pinX: number; // percentage X
  pinY: number; // percentage Y
  iconSymbol: string;
}

const BODY_PARTS: BodyPart[] = [
  {
    id: 'kepala',
    nameIndo: 'Kepala',
    ngoko: 'sirah',
    kramaInggil: 'mustaka',
    exampleSentence: 'Mustakanipun Simbah nembe gerah, mila dipunpijeti ibu.',
    teacherNote: 'Elinga ya: Mahkota iku dipasang ing mustaka (sirah). Marang guru utawa wong tuwa kudu matur nganggo tembung mustaka.',
    pinX: 50,
    pinY: 8,
    iconSymbol: '👑'
  },
  {
    id: 'mata',
    nameIndo: 'Mata',
    ngoko: 'mripat',
    kramaInggil: 'paningal',
    exampleSentence: 'Paningalipun Bu Guru mirsani para murid kanthi kebak asih.',
    teacherNote: 'Paningal asale saka tembung "tingal" (ndeleng utawa mirsani). Mripat kanggone ndeleng, krama inggile paningal.',
    pinX: 41,
    pinY: 17.5,
    iconSymbol: '👀'
  },
  {
    id: 'telinga',
    nameIndo: 'Telinga',
    ngoko: 'kuping',
    kramaInggil: 'talingan',
    exampleSentence: 'Talinganipun Simbah taksih mireng kanthi cetha nalika dipuncaosi kabar.',
    teacherNote: 'Kuping kanggone ngrungokake. Krama inggile talingan, pamirengane kanggo ngrungokake dawuh becik.',
    pinX: 62,
    pinY: 19.5,
    iconSymbol: '👂'
  },
  {
    id: 'hidung',
    nameIndo: 'Hidung',
    ngoko: 'irung',
    kramaInggil: 'grana',
    exampleSentence: 'Adik gadhah grana mancung kados almarhum eyang.',
    teacherNote: 'Irung kanggo ambegan lan ngrasakake ganda arum. Krama inggile yaiku grana.',
    pinX: 50,
    pinY: 20.5,
    iconSymbol: '👃'
  },
  {
    id: 'mulut',
    nameIndo: 'Mulut',
    ngoko: 'cangkem',
    kramaInggil: 'tutuk',
    exampleSentence: 'Nalika matur marang Bapak lan Ibu Guru, tutukipun mesem sopan.',
    teacherNote: 'Aja tau ngucapake cangkem marang wong tuwa ya bocah-bocah, kudu matur nganggo tembung tutuk!',
    pinX: 45,
    pinY: 24,
    iconSymbol: '👄'
  },
  {
    id: 'gigi',
    nameIndo: 'Gigi',
    ngoko: 'untu',
    kramaInggil: 'waos',
    exampleSentence: 'Waosipun adik dipungosok saben enjang lan sadurunge tilem.',
    teacherNote: 'Untu krama inggile waos. Eling-eling: waos kudu resik supaya ora gampang krowok.',
    pinX: 55,
    pinY: 24,
    iconSymbol: '🦷'
  },
  {
    id: 'tangan',
    nameIndo: 'Tangan',
    ngoko: 'tangan',
    kramaInggil: 'asta',
    exampleSentence: 'Bapak ngasta tas werni cemeng nalika tindak dhateng kantor.',
    teacherNote: 'Tangan krama inggile asta. Nalika salim karo Bu Guru, kita nyalami asta kanthi sopan santun.',
    pinX: 32,
    pinY: 56,
    iconSymbol: '✋'
  },
  {
    id: 'kaki',
    nameIndo: 'Kaki',
    ngoko: 'sikil',
    kramaInggil: 'suku',
    exampleSentence: 'Sukunipun Simbah sayah sakwise mlampah-mlampah ing pekarangan.',
    teacherNote: 'Sikil krama inggile suku. Digunakake kanggo mlampah menyang panggonan sing becik.',
    pinX: 43,
    pinY: 82,
    iconSymbol: '🦵'
  }
];

interface AnggotaAwakProps {
  onEarnStar?: () => void;
}

export const AnggotaAwak: React.FC<AnggotaAwakProps> = ({ onEarnStar }) => {
  const [selectedPart, setSelectedPart] = useState<BodyPart>(BODY_PARTS[0]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);

  const handleSelectPart = (part: BodyPart) => {
    setSelectedPart(part);
    playClick();
    speakText(`Basa ngoko: ${part.ngoko}. Basa krama inggil: ${part.kramaInggil}. ${part.exampleSentence}`);
  };

  const currentQuizPart = BODY_PARTS[quizQuestionIndex];

  // Generate 3 randomized multiple-choice options for the interactive guessing game
  const quizOptions = useMemo(() => {
    const correct = currentQuizPart.kramaInggil;
    const others = BODY_PARTS
      .filter((p) => p.kramaInggil !== correct)
      .map((p) => p.kramaInggil)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }, [quizQuestionIndex, currentQuizPart]);

  const handleQuizAnswer = (option: string) => {
    if (quizSelectedOption !== null) return;
    setQuizSelectedOption(option);
    if (option === currentQuizPart.kramaInggil) {
      playCorrect();
      if (onEarnStar) onEarnStar();
      speakText(`Bener! Basa krama inggile ${currentQuizPart.ngoko} yaiku ${currentQuizPart.kramaInggil}`);
    } else {
      playWrong();
      speakText(`Durung trep. Basa krama inggile ${currentQuizPart.ngoko} yaiku ${currentQuizPart.kramaInggil}`);
    }
  };

  const handleNextQuiz = () => {
    playClick();
    setQuizSelectedOption(null);
    setQuizQuestionIndex((prev) => (prev + 1) % BODY_PARTS.length);
  };

  return (
    <section className="py-6 sm:py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-heading font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wayang Awak Interaktif (Anatomi Jeneng Anggota Awak)</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Jeneng Anggota Awak: Ngoko & Krama Inggil
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Klik pin ing awak siswa Bima utawa pilih tombol perangan awak ing sisih tengen kanggo nyimak basa Ngoko lan Krama Inggil!
          </p>
        </div>

        {/* Mini Quiz Mode Toggle */}
        <button
          onClick={() => {
            setQuizMode(!quizMode);
            setQuizSelectedOption(null);
            playClick();
          }}
          className={`px-4 py-2.5 rounded-2xl font-heading font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start md:self-auto cursor-pointer ${
            quizMode
              ? 'bg-purple-600 text-white shadow-purple-600/30'
              : 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-400/40 hover:bg-purple-50 dark:hover:bg-slate-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          {quizMode ? 'Bali menyang Mode Sinau' : 'Mode Tebak Cepat Krama Inggil'}
        </button>
      </div>

      {quizMode ? (
        /* Interactive 3-Choice Guessing Game */
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-purple-500/30 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
            Tebak Cepat #{quizQuestionIndex + 1} saka {BODY_PARTS.length}
          </div>

          <div className="space-y-2">
            <span className="text-5xl sm:text-6xl block mb-2 animate-bounce" style={{ animationDuration: '3s' }}>
              {currentQuizPart.iconSymbol}
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Apa basa krama inggile perangan awak iki?
            </p>
            <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {currentQuizPart.nameIndo} ({currentQuizPart.ngoko})
            </h3>
          </div>

          {/* 3 Interactive Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quizOptions.map((option, idx) => {
              const isSelected = quizSelectedOption === option;
              const isCorrect = option === currentQuizPart.kramaInggil;

              let btnStyle = 'bg-slate-50 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200';
              if (quizSelectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300';
                } else {
                  btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={quizSelectedOption !== null}
                  onClick={() => handleQuizAnswer(option)}
                  className={`p-4 rounded-2xl border-2 font-heading font-bold text-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {quizSelectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {quizSelectedOption !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Teacher Hint */}
          {quizSelectedOption !== null && (
            <div
              className={`p-5 rounded-2xl border space-y-2 animate-fade-in ${
                quizSelectedOption === currentQuizPart.kramaInggil
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="text-left space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {quizSelectedOption === currentQuizPart.kramaInggil ? '🎉 Jawabanmu Bener!' : '💡 Jawaban sing bener:'}
                </span>
                <p className="text-sm font-semibold">
                  Basa krama inggile <strong className="text-purple-700 dark:text-purple-300 font-bold">{currentQuizPart.ngoko}</strong> yaiku <strong className="text-emerald-700 dark:text-emerald-300 font-bold">{currentQuizPart.kramaInggil}</strong>.
                </p>
                <p className="text-xs italic text-slate-600 dark:text-slate-300 pt-1">
                  &ldquo;{currentQuizPart.exampleSentence}&rdquo;
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-300 pt-1 font-medium">
                  💡 {currentQuizPart.teacherNote}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Soal Sabanjure ➔
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Main Interactive Anatomy Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: 3D Character Illustration with Non-Overlapping Interactive Pins */}
          <div className="lg:col-span-5 p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-purple-500/5 via-teal-500/5 to-emerald-500/5 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center relative">
            <div className="w-full text-center mb-3">
              <span className="text-xs font-heading font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                Peta Awak Siswa SD: Bima
              </span>
            </div>

            {/* Responsive 3D Character Canvas */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] mx-auto select-none rounded-2xl overflow-hidden shadow-inner border border-slate-200/70 dark:border-slate-700 bg-white/40 dark:bg-slate-900/60">
              <img
                src={wayangSiswaImg}
                alt="Karakter 3D Siswa SD Bima"
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Clickable Anatomy Pins Overlay with safe touch areas */}
              {BODY_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    style={{ left: `${part.pinX}%`, top: `${part.pinY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-all duration-300 p-1.5 focus:outline-none ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                    }`}
                    title={`${part.nameIndo}: ${part.ngoko} -> ${part.kramaInggil}`}
                    aria-label={`${part.nameIndo} (${part.ngoko} - ${part.kramaInggil})`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white ring-4 ring-purple-300 dark:ring-purple-900 scale-110 shadow-purple-600/50'
                          : 'bg-white/95 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-2 border-purple-500 hover:bg-purple-50 shadow-md'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{part.iconSymbol}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-3 italic text-center font-medium">
              💡 Tutul sembarang titik pin ing awak siswa kanggo ngrungokake swara!
            </p>
          </div>

          {/* Right Column: Selected Organ Detail Card & Quick Selection Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Highlight Card */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-purple-500/40 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-3xl shadow-inner border border-purple-300 dark:border-purple-800 shrink-0">
                    {selectedPart.iconSymbol}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Perangan Awak: {selectedPart.nameIndo}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{selectedPart.ngoko}</span>
                      <span className="text-purple-600 dark:text-purple-400">➔</span>
                      <span className="text-purple-600 dark:text-purple-400">{selectedPart.kramaInggil}</span>
                    </h3>
                  </div>
                </div>

                {/* Pronounce Button */}
                <button
                  onClick={() => {
                    playClick();
                    speakText(`Basa ngoko: ${selectedPart.ngoko}. Basa krama inggil: ${selectedPart.kramaInggil}`);
                  }}
                  className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 transition-transform active:scale-95 cursor-pointer shrink-0"
                  title="Rungokna pengucapan"
                  aria-label="Rungokna pengucapan"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                    Basa Ngoko (Kanca)
                  </span>
                  <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    {selectedPart.ngoko}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block uppercase">
                    Krama Inggil (Guru/Simbah)
                  </span>
                  <span className="font-heading font-bold text-xl text-purple-700 dark:text-purple-300">
                    {selectedPart.kramaInggil}
                  </span>
                </div>
              </div>

              {/* Example Sentence */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  Conto Ukara Sopan:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic font-medium leading-relaxed">
                  &ldquo;{selectedPart.exampleSentence}&rdquo;
                </p>
              </div>

              {/* Teacher Pedagogy Note */}
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed pt-1">
                💡 <strong className="text-slate-800 dark:text-slate-200">Cathetan Guru:</strong> {selectedPart.teacherNote}
              </p>
            </div>

            {/* Quick Select Buttons Grid (All 8 Parts) */}
            <div className="space-y-2">
              <span className="text-xs font-heading font-bold text-slate-700 dark:text-slate-300">
                Pilih Perangan Awak Liyane:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BODY_PARTS.map((part) => {
                  const isSelected = selectedPart.id === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => handleSelectPart(part)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer min-h-[48px] active:scale-95 ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-lg shrink-0">{part.iconSymbol}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-heading font-bold truncate">
                          {part.nameIndo}
                        </div>
                        <div className={`text-[11px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                          {part.kramaInggil}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnggotaAwak;
