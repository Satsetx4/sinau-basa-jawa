import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, BookOpen, Sparkles, Award, User, Edit3, Check, Star } from 'lucide-react';
import { playClick } from '../lib/sound';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  starsCount: number;
  onOpenNameModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  isMuted,
  setIsMuted,
  studentName,
  setStudentName,
  starsCount,
  onOpenNameModal
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  React.useEffect(() => {
    setTempName(studentName);
  }, [studentName]);

  const navItems = [
    { id: 'materi', label: 'Materi Sinau', icon: BookOpen },
    { id: 'awak', label: 'Wayang Awak', icon: Sparkles },
    { id: 'dolanan', label: 'Dolanan Game', icon: Sparkles },
    { id: 'soal', label: 'Bank Soal & Ujian', icon: Award },
    { id: 'kamus', label: 'Bausastra Cilik', icon: BookOpen },
  ];

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
    }
    setIsEditingName(false);
    playClick();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fcfaf7]/90 dark:bg-[#0b0f19]/90 border-b border-emerald-900/10 dark:border-emerald-500/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => { setActiveTab('materi'); playClick(); }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <span className="font-heading font-bold text-2xl tracking-tighter">ꦗ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-xl text-slate-900 dark:text-white leading-none">
                  Sinau Jawa <span className="text-emerald-600 dark:text-emerald-400">Asik</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  Kelas 3 SD
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Nyimak Swara & Unggah-Ungguh Basa
              </p>
            </div>
          </div>

          {/* Desktop Navigation Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-300/40 dark:border-slate-700/40">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    playClick();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-heading font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Utility Controls (Sound, Dark/Light, Student Profile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Student Name & Stars Pill - Visible on mobile too! */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <span className="text-xs sm:text-sm font-heading font-bold flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                <span>{starsCount}</span>
              </span>
              <div className="h-3.5 w-px bg-amber-400/40" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="w-20 sm:w-28 text-xs font-semibold px-1 py-0.5 rounded bg-white dark:bg-slate-800 border border-amber-400 text-slate-800 dark:text-slate-100 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 rounded hover:bg-amber-200 dark:hover:bg-amber-900 text-emerald-600"
                    aria-label="Simpen Jeneng"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (onOpenNameModal) {
                      onOpenNameModal();
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 hover:underline cursor-pointer"
                  title="Klik kanggo ngisi utawa ngganti jeneng murid"
                  aria-label="Ganti Jeneng Murid"
                >
                  <User className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="max-w-[65px] sm:max-w-[110px] truncate">
                    {studentName || 'Isi Jeneng'}
                  </span>
                  <Edit3 className="w-2.5 h-2.5 opacity-60 hidden sm:inline shrink-0" />
                </button>
              )}
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playClick();
              }}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title={isMuted ? 'Uripake Swara (Unmute)' : 'Patèni Swara (Mute)'}
              aria-label={isMuted ? 'Uripake Swara' : 'Patèni Swara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                setIsDark(!isDark);
                playClick();
              }}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:scale-105 transition-all shadow-sm"
              title={isDark ? 'Ganti Mode Padhang (Light Mode)' : 'Ganti Mode Wengi (Dark Mode)'}
              aria-label={isDark ? 'Mode Padhang' : 'Mode Wengi'}
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Docked Mobile Bottom Navigation Bar (Thumb-Zone Friendly) */}
      <nav
        aria-label="Navigasi Utama Ponsel"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                playClick();
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] min-h-[46px] transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30 scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
              <span className="text-[10px] font-heading font-semibold leading-tight tracking-tight">
                {item.id === 'materi' ? 'Materi' : item.id === 'awak' ? 'Wayang' : item.id === 'dolanan' ? 'Dolanan' : item.id === 'soal' ? 'Ujian' : 'Kamus'}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
