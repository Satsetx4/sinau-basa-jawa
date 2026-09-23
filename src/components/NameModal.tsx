import React, { useState } from 'react';
import { Sparkles, Check, X, RotateCcw, AlertTriangle, Gift, Star, ArrowRight } from 'lucide-react';
import { playClick } from '../lib/sound';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface NameModalProps {
  isOpen: boolean;
  currentName: string;
  onSaveName: (name: string) => void;
  onClose: () => void;
  onResetProgress?: () => void;
  isFirstLaunch?: boolean;
}

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  currentName,
  onSaveName,
  onClose,
  onResetProgress,
  isFirstLaunch = false
}) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [errorMsg, setErrorMsg] = useState('');
  const dialogRef = useDialogFocus(isOpen, onClose);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMsg('Jeneng ora kena kosong ya cah pinter!');
      return;
    }
    playClick();
    onSaveName(trimmed);
  };

  const handleSkip = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="name-modal-title" tabIndex={-1} className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/30 overflow-hidden p-6 sm:p-8 text-center space-y-5">
        {/* Top Close Button (only if not forced first-launch or child wants to close) */}
        {!isFirstLaunch && (
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Mascot Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-lg shadow-emerald-500/30">
          ꦗ
        </div>

        {/* Header Content */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isFirstLaunch ? 'Sugeng Rawuh ing Sinau Jawa!' : 'Profil Siswa'}</span>
          </div>
          <h3 id="name-modal-title" className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
            {isFirstLaunch ? 'Sapa Jenengmu, Cah Pinter?' : 'Ganti Jeneng Siswa'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
            {isFirstLaunch
              ? 'Yen gelem, tulis jeneng panggilan kanggo piagam latihanmu. Jeneng iki mung disimpen ing browser iki.'
              : 'Jeneng panggilan iki bakal katulis ing piagam latihanmu lan disimpen ing browser iki.'}
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              aria-label="Jeneng panggilan"
              aria-invalid={Boolean(errorMsg)}
              aria-describedby={errorMsg ? 'name-error' : undefined}
              autoFocus
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Tulis jeneng panggilanmu..."
              className="w-full text-center font-heading font-bold text-lg sm:text-xl py-3 px-4 rounded-2xl border-2 border-emerald-400/70 focus:border-emerald-500 bg-emerald-50/30 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all shadow-inner"
              maxLength={32}
            />
            {nameInput && (
              <button
                type="button"
                onClick={() => setNameInput('')}
                aria-label="Busak isian jeneng"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {errorMsg && (
            <p id="name-error" role="alert" className="text-xs font-semibold text-rose-500 animate-shake flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}

          {/* First launch star bonus info */}
          {isFirstLaunch && (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-heading font-bold flex items-center justify-center gap-2">
              <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="flex items-center gap-1">
                <span>Bonus +3 Bintang</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 inline" />
                <span>kanggo murid anyar!</span>
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span className="inline-flex items-center gap-1.5">
                <span>{isFirstLaunch ? 'Mulai Sinau Saiki!' : 'Simpen Jeneng Anyar'}</span>
                {isFirstLaunch && <ArrowRight className="w-4 h-4" />}
              </span>
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-heading font-semibold text-xs transition-colors cursor-pointer"
            >
              {isFirstLaunch ? 'Lewati dhisik (Bisa diisi mengko)' : 'Batal'}
            </button>
          </div>
        </form>

        {/* Reset Progress Danger Zone (for phone sharing or clearing cache) */}
        {onResetProgress && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Resik Data Pasinaon (Reset Saka Awal)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameModal;
