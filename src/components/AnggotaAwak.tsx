import React, { useState } from 'react';
import { Volume2, Sparkles, Check, HelpCircle } from 'lucide-react';
import { playClick, playCorrect } from '../lib/sound';
import { speakText } from '../lib/speech';

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
    pinY: 13,
    iconSymbol: '👑'
  },
  {
    id: 'mata',
    nameIndo: 'Mata',
    ngoko: 'mripat',
    kramaInggil: 'paningal',
    exampleSentence: 'Paningalipun Bu Guru mirsani para murid kanthi kebak asih.',
    teacherNote: 'Paningal asale saka tembung "tingal" (ndeleng utawa mirsani). Mripat kanggone ndeleng, krama inggile paningal.',
    pinX: 43,
    pinY: 22,
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
    pinY: 22,
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
    pinY: 25,
    iconSymbol: '👃'
  },
  {
    id: 'mulut',
    nameIndo: 'Mulut',
    ngoko: 'cangkem',
    kramaInggil: 'tutuk',
    exampleSentence: 'Nalika matur marang Bapak lan Ibu Guru, tutukipun mesem sopan.',
    teacherNote: 'Aja tau ngucapake cangkem marang wong tuwa ya bocah-bocah, kudu matur nganggo tembung tutuk!',
    pinX: 50,
    pinY: 30,
    iconSymbol: '👄'
  },
  {
    id: 'gigi',
    nameIndo: 'Gigi',
    ngoko: 'untu',
    kramaInggil: 'waos',
    exampleSentence: 'Waosipun adik dipungosok saben enjang lan sadurunge tilem.',
    teacherNote: 'Untu krama inggile waos. Eling-eling: waos kudu resik supaya ora gampang krowok.',
    pinX: 50,
    pinY: 34,
    iconSymbol: '🦷'
  },
  {
    id: 'tangan',
    nameIndo: 'Tangan',
    ngoko: 'tangan',
    kramaInggil: 'asta',
    exampleSentence: 'Bapak ngasta tas werni cemeng nalika tindak dhateng kantor.',
    teacherNote: 'Tangan krama inggile asta. Nalika salim karo Bu Guru, kita nyalami asta kanthi sopan santun.',
    pinX: 20,
    pinY: 53,
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
    pinY: 86,
    iconSymbol: '🦵'
  }
];

export const AnggotaAwak: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart>(BODY_PARTS[0]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelectPart = (part: BodyPart) => {
    setSelectedPart(part);
    playClick();
    speakText(`Basa ngoko: ${part.ngoko}. Basa krama inggil: ${part.kramaInggil}. ${part.exampleSentence}`);
  };

  const handleNextQuiz = () => {
    playClick();
    setShowAnswer(false);
    setQuizQuestionIndex((prev) => (prev + 1) % BODY_PARTS.length);
  };

  const currentQuizPart = BODY_PARTS[quizQuestionIndex];

  return (
    <section className="py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-heading font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wayang Awak Interaktif (Anatomi Jeneng Anggota Awak)</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Jeneng Anggota Awak: Ngoko & Krama Inggil
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Klik pin titik-titik ing awak wayang bocah sekolah utawa pilih tombol ing sisih tengen kanggo nyimak basa Ngoko lan Krama Inggil!
          </p>
        </div>

        {/* Mini Flashcard Quiz Mode Toggle */}
        <button
          onClick={() => {
            setQuizMode(!quizMode);
            setShowAnswer(false);
            playClick();
          }}
          className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start md:self-auto ${
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
        /* Mini Interactive Flashcard Quiz */
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-purple-500/30 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold">
            Tebak Cepat #{quizQuestionIndex + 1} saka {BODY_PARTS.length}
          </div>

          <div className="space-y-2">
            <span className="text-6xl block mb-2">{currentQuizPart.iconSymbol}</span>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Apa basa krama inggile perangan awak iki?
            </p>
            <h3 className="font-heading font-bold text-4xl text-slate-900 dark:text-white">
              {currentQuizPart.nameIndo} ({currentQuizPart.ngoko})
            </h3>
          </div>

          {showAnswer ? (
            <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-700 space-y-3 animate-fade-in">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Wangsulan Krama Inggil:
              </span>
              <h4 className="font-heading font-bold text-3xl text-purple-700 dark:text-purple-300">
                {currentQuizPart.kramaInggil}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                &ldquo;{currentQuizPart.exampleSentence}&rdquo;
              </p>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 pt-1">
                💡 {currentQuizPart.teacherNote}
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAnswer(true);
                playCorrect();
                speakText(`Basa krama inggile ${currentQuizPart.ngoko} yaiku ${currentQuizPart.kramaInggil}`);
              }}
              className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-heading font-bold text-sm shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
            >
              Buka Wangsulan & Swara
            </button>
          )}

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleNextQuiz}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-heading font-semibold text-xs transition-all"
            >
              Soal Sabanjure ➔
            </button>
          </div>
        </div>
      ) : (
        /* Main Interactive Anatomy Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Illustrated Avatar Map */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-purple-500/5 via-teal-500/5 to-emerald-500/5 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center relative min-h-[500px]">
            <div className="w-full text-center mb-4">
              <span className="text-xs font-heading font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                Peta Awak Siswa: Bima & Siti
              </span>
            </div>

            {/* Stylized SVG Interactive Character Representation */}
            <div className="relative w-72 h-[420px] mx-auto select-none">
              <svg viewBox="0 0 200 320" className="w-full h-full drop-shadow-md">
                {/* Background Shadow */}
                <ellipse cx="100" cy="305" rx="55" ry="8" fill="rgba(0,0,0,0.12)" />

                {/* Legs & Shoes */}
                <rect x="75" y="210" width="18" height="65" rx="8" fill="#1e293b" />
                <rect x="107" y="210" width="18" height="65" rx="8" fill="#1e293b" />
                {/* Shoes (Sepatu) */}
                <ellipse cx="80" cy="280" rx="14" ry="7" fill="#0f172a" />
                <ellipse cx="120" cy="280" rx="14" ry="7" fill="#0f172a" />

                {/* Torso / Uniform (Klambi Seragam SD) */}
                <path d="M 60 110 L 140 110 L 132 215 L 68 215 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                {/* Red tie / Dasi SD */}
                <polygon points="100,118 95,150 100,165 105,150" fill="#dc2626" />
                {/* Red Skirt / Pants (Celana/Rok Abang SD) */}
                <rect x="68" y="180" width="64" height="40" rx="4" fill="#dc2626" />

                {/* Arms & Hands (Tangan / Asta) */}
                <rect x="42" y="115" width="18" height="65" rx="9" fill="#fbcfe8" transform="rotate(15 50 115)" />
                <circle cx="34" cy="180" r="10" fill="#fbcfe8" />
                <rect x="140" y="115" width="18" height="65" rx="9" fill="#fbcfe8" transform="rotate(-15 150 115)" />
                <circle cx="166" cy="180" r="10" fill="#fbcfe8" />

                {/* Neck */}
                <rect x="91" y="98" width="18" height="16" rx="4" fill="#fbcfe8" />

                {/* Head (Sirah / Mustaka) */}
                <circle cx="100" cy="65" r="38" fill="#fbcfe8" />
                {/* Hair */}
                <path d="M 64 60 C 64 25, 136 25, 136 60 C 130 50, 115 48, 100 48 C 85 48, 70 50, 64 60 Z" fill="#1e293b" />

                {/* Eyes (Mripat / Paningal) */}
                <ellipse cx="88" cy="64" rx="4.5" ry="6" fill="#0f172a" />
                <ellipse cx="112" cy="64" rx="4.5" ry="6" fill="#0f172a" />
                <circle cx="89.5" cy="62" r="1.5" fill="#ffffff" />
                <circle cx="113.5" cy="62" r="1.5" fill="#ffffff" />

                {/* Nose (Irung / Grana) */}
                <path d="M 100 68 Q 102 74 98 75" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Mouth & Teeth (Cangkem / Tutuk & Untu / Waos) */}
                <path d="M 92 82 Q 100 90 108 82" stroke="#dc2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Ears (Kuping / Talingan) */}
                <circle cx="61" cy="65" r="6" fill="#fbcfe8" />
                <circle cx="139" cy="65" r="6" fill="#fbcfe8" />
              </svg>

              {/* Clickable Anatomy Pins Overlay */}
              {BODY_PARTS.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part)}
                    style={{ left: `${part.pinX}%`, top: `${part.pinY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-all duration-300 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                    }`}
                    title={`${part.nameIndo}: ${part.ngoko} -> ${part.kramaInggil}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white ring-4 ring-purple-300 dark:ring-purple-900 animate-bounce'
                          : 'bg-white dark:bg-slate-800 text-purple-600 border-2 border-purple-500 hover:bg-purple-50'
                      }`}
                    >
                      <span className="text-xs">{part.iconSymbol}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 mt-2 italic text-center">
              Pencet sembarang titik pin ing awak bocah kanggo ngrungokake swara!
            </p>
          </div>

          {/* Right Column: Selected Organ Detail Card & Selection List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Highlight Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-purple-500/40 shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-3xl shadow-inner border border-purple-300 dark:border-purple-800">
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
                  className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 transition-transform active:scale-95"
                  title="Rungokna pengucapan"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                    Basa Ngoko (Karo Kanca)
                  </span>
                  <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    {selectedPart.ngoko}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block uppercase">
                    Krama Inggil (Marang Guru / Simbah)
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
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="text-lg">{part.iconSymbol}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-heading font-bold truncate">
                          {part.nameIndo}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
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
