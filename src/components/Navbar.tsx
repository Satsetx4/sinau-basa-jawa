import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, BookOpen, Sparkles, Award, User, Edit3, Check } from 'lucide-react';
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
  starsCount
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

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
          <div className="flex items-center gap-2">
            {/* Student Name & Stars Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <span className="text-sm font-heading font-bold flex items-center gap-1 text-amber-600 dark:text-amber-400">
                ⭐ {starsCount}
              </span>
              <div className="h-4 w-px bg-amber-400/40" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="w-24 text-xs font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-amber-400 text-slate-800 dark:text-slate-100 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-0.5 rounded hover:bg-amber-200 dark:hover:bg-amber-900 text-emerald-600"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer hover:underline"
                  title="Klik kanggo ngganti jeneng murid"
                >
                  <User className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span className="max-w-[100px] truncate">{studentName}</span>
                  <Edit3 className="w-2.5 h-2.5 opacity-60" />
                </div>
              )}
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playClick();
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title={isMuted ? 'Uripake Swara (Unmute)' : 'Patèni Swara (Mute)'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                setIsDark(!isDark);
                playClick();
              }}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:scale-105 transition-all shadow-sm"
              title={isDark ? 'Ganti Mode Padhang (Light Mode)' : 'Ganti Mode Wengi (Dark Mode)'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  playClick();
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
