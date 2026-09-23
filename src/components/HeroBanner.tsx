import React from 'react';
import { Sparkles, BookOpen, Award, Volume2, ArrowRight, GraduationCap, MessageSquareQuote, UserCheck, Pencil } from 'lucide-react';
import { playClick } from '../lib/sound';
import { speakText } from '../lib/speech';

interface HeroBannerProps {
  setActiveTab: (tab: string) => void;
  onOpenTopic: (topicId: string) => void;
  studentName: string;
  onOpenNameModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ setActiveTab, onOpenTopic, studentName, onOpenNameModal }) => {
  const hasName = Boolean(studentName && studentName.trim());
  const displayName = hasName ? studentName.trim() : '';

  const handleTeacherGreeting = () => {
    playClick();
    if (hasName) {
      speakText(`Sugeng rawuh ${displayName}! Ayo sinau basa Jawa kanthi bungah lan teliti!`);
    } else {
      speakText('Sugeng rawuh! Ayo sinau basa Jawa kanthi bungah lan teliti!');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-10">
      {/* Background soft decorative ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Left Intro Text */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-heading font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Wulangan Basa Jawa Kelas 3 SD • Nyimak Swara & Unggah-Ungguh</span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Sinau Basa Jawa Dadi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500">
                Gampang, Seru, & Berprestasi!
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Sugeng rawuh
              {hasName ? (
                <>
                  ,{' '}
                  <button
                    type="button"
                    onClick={onOpenNameModal}
                    className="text-emerald-600 dark:text-emerald-400 font-bold underline decoration-dotted underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center gap-1"
                    title="Klik kanggo ngganti jeneng"
                  >
                    <span>{displayName}</span>
                  </button>
                </>
              ) : (
                <>
                  !{' '}
                  <button
                    type="button"
                    onClick={onOpenNameModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-heading font-semibold text-xs transition-colors cursor-pointer"
                    title="Klik kanggo ngisi jeneng siswa"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Tulis Jenengmu</span>
                  </button>
                </>
              )}
              ! Ayo nyimak bedane <span className="font-semibold text-slate-800 dark:text-slate-200">Swara A Jejeg lan Miring</span>,
              ngrakit suku kata, ngenal krama inggil <span className="font-semibold text-slate-800 dark:text-slate-200">anggota awak</span>,
              lan gladhen soal ujian kanthi pembahasan pedagogis jangkep!
            </p>

            {/* Teacher Encouragement Speech Bubble */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-emerald-500/20 shadow-md flex items-start gap-3.5 relative">
              <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-heading font-bold text-emerald-700 dark:text-emerald-300">
                    Pesen Pasinaon
                  </span>
                  <button
                    onClick={handleTeacherGreeting}
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md"
                  >
                    <Volume2 className="w-3 h-3" />
                    Rungokna Suwara
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic font-medium leading-snug">
                  &ldquo;Basa Jawa iku adiluhung. Nalika ngomong karo kanca nganggo ngoko, nanging marang wong tuwa lan guru kudu krama supaya dadi bocah sing ngajeni lan disuyudi!&rdquo;
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { onOpenTopic('swara-a'); playClick(); }}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Mulai Sinau Materi
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setActiveTab('soal'); playClick(); }}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 transform active:scale-95 transition-all"
              >
                <Award className="w-4 h-4" />
                Bank Soal & Ujian (20 Soal)
              </button>

              <button
                onClick={() => { setActiveTab('awak'); playClick(); }}
                className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-heading font-semibold text-sm flex items-center gap-2 transform active:scale-95 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-purple-500" />
                Wayang Awak Interaktif
              </button>
            </div>
          </div>

          {/* Right Feature Showcase Card / Visual Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {/* Feature 1: Swara A */}
            <button type="button"
              onClick={() => { onOpenTopic('swara-a'); playClick(); }}
              className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/15 dark:to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-heading font-bold text-lg mb-2.5 shadow-md shadow-emerald-500/30">
                A
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Swara A Jejeg & Miring
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sega [sego] vs Bapak [bapak]. Rumus gampang & audio cetha!
              </p>
            </button>

            {/* Feature 2: Ngoko vs Krama */}
            <button type="button"
              onClick={() => { onOpenTopic('ngoko-krama'); playClick(); }}
              className="p-4 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 dark:from-indigo-500/15 dark:to-purple-500/10 border border-indigo-500/30 hover:border-indigo-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-heading font-bold text-lg mb-2.5 shadow-md shadow-indigo-500/30">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Ngoko & Basa Krama
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kanca sebaya vs Guru & Simbah. Unggah-ungguh sopan santun.
              </p>
            </button>

            {/* Feature 3: Konsonan TH & DH */}
            <button type="button"
              onClick={() => { onOpenTopic('konsonan-th-dh'); playClick(); }}
              className="p-4 rounded-3xl bg-gradient-to-br from-rose-500/10 to-amber-500/5 dark:from-rose-500/15 dark:to-amber-500/10 border border-rose-500/30 hover:border-rose-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-heading font-bold text-xs mb-2.5 shadow-md shadow-rose-500/30">
                TH≠DH
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Konsonan TH & DH
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Thukul vs Dhahar. Aja nganti kleru artikulasi swarane!
              </p>
            </button>

            {/* Feature 4: Anggota Awak */}
            <button type="button"
              onClick={() => { setActiveTab('awak'); playClick(); }}
              className="p-4 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 dark:from-purple-500/15 dark:to-pink-500/10 border border-purple-500/30 hover:border-purple-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-heading font-bold text-lg mb-2.5 shadow-md shadow-purple-500/30">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Wayang Awak
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sirah-mustaka, mripat-paningal, kuping-talingan, tangan-asta.
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
