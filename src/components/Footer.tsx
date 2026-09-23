import React from 'react';
import { Heart } from 'lucide-react';
import { playClick } from '../lib/sound';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onResetProgress?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onResetProgress }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-[#f8f5f0] dark:bg-[#070b14] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-heading font-bold text-xl shadow-md">
              ꦗ
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Sinau Jawa Asik • Kelas 3 SD
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Media Pembelajaran Interaktif Nyimak Swara, Unggah-Ungguh & Anggota Awak
              </p>
            </div>
          </div>

          {/* Quick Navigation Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-heading font-semibold text-slate-600 dark:text-slate-400">
            <button
              onClick={() => { setActiveTab('materi'); playClick(); }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Materi Sinau
            </button>
            <button
              onClick={() => { setActiveTab('awak'); playClick(); }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Wayang Awak
            </button>
            <button
              onClick={() => { setActiveTab('dolanan'); playClick(); }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Dolanan Game
            </button>
            <button
              onClick={() => { setActiveTab('soal'); playClick(); }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Bank Soal & Ujian
            </button>
            <button
              onClick={() => { setActiveTab('kamus'); playClick(); }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Bausastra Cilik
            </button>
          </div>
        </div>

        {/* Javanese Wisdom Banner */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
              Paribasan Jawa Luhur
            </span>
            <p className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 italic">
              &ldquo;Ajining dhiri dumunung ana ing lathi, ajining raga ana ing busana, ajining awak ana ing tumindak.&rdquo;
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              (Harga diri seseorang ada pada ucapannya yang santun, kehormatan diri ada pada kerapian pakaian, dan kemuliaan hidup ada pada perilaku baik).
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Dirancang kanthi tresna</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>kagem bocah-bocah SD</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 dark:text-slate-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Sinau Basa Jawa Kelas 3 SD. Materi latihan mandiri; cocogna isi lan lafal karo guru Basa Jawa.
          </p>
          {onResetProgress && (
            <button
              onClick={onResetProgress}
              className="hover:text-rose-500 underline transition-colors cursor-pointer"
              title="Ngresiki kabeh data lan biji saka piranti iki"
            >
              Resik Data Pasinaon (Reset Piranti)
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
