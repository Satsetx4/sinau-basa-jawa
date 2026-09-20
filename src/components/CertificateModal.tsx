import React from 'react';
import { X, Printer, Award, Sparkles, Star } from 'lucide-react';
import { playClick } from '../lib/sound';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onOpenNameModal?: () => void;
  score: number | null;
  onGoToQuiz?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onOpenNameModal,
  score,
  onGoToQuiz
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden"
      >
        {/* Top bar with Print and Close buttons (hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-heading font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Sertifikat Siswa Berprestasi</span>
          </div>

          <div className="flex items-center gap-2">
            {score !== null && score > 0 && (
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer min-h-[38px]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Simpen PDF</span>
              </button>
            )}

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Tutup Jendela Sertifikat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {score === null || score === 0 ? (
          <div className="p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              Durung Ana Biji Ujian
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Kowe durung ngrampungake <strong>Ujian Penilaian Harian</strong>. Ayo garap 20 pitakon ujian dhisik supaya biji rapormu metu lan sertifikat resmi iki bisa dicetak!
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  if (onGoToQuiz) onGoToQuiz();
                  playClick();
                }}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer min-h-[44px]"
              >
                Garap Ujian Saiki ➔
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-heading font-semibold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-10 text-center relative bg-[#fffdfa] text-slate-900 border-4 sm:border-[10px] border-double border-amber-600/30 m-2 sm:m-4 rounded-2xl shadow-inner selection:bg-amber-200 max-h-[82vh] overflow-y-auto">
            {/* Corner Decorative Javanese Ornaments */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 text-amber-500 text-xl sm:text-2xl font-bold">ꦗ</div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-amber-500 text-xl sm:text-2xl font-bold">ꦗ</div>
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-amber-500 text-xl sm:text-2xl font-bold">ꦗ</div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-amber-500 text-xl sm:text-2xl font-bold">ꦗ</div>

            {/* Certificate Header */}
            <div className="space-y-1 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-amber-700 block">
                PIWULANG BASA JAWA KELAS 3 SEKOLAH DASAR
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight">
                SURAT KATRANGAN PRESTASI
              </h2>
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-sans mb-2 sm:mb-3">
              Katur dhumateng siswa ingkang wasis lan nduweni tata krama becik:
            </p>

            {/* Recipient Name */}
            <div className="py-1.5 sm:py-2 border-b-2 border-amber-600/40 inline-block px-4 sm:px-8 mb-3 sm:mb-4">
              {studentName.trim() ? (
                <h3 className="font-heading font-bold text-2xl sm:text-4xl text-emerald-800 tracking-wide">
                  {studentName.trim()}
                </h3>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    if (onOpenNameModal) onOpenNameModal();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-900 font-heading font-bold text-base sm:text-xl inline-flex items-center gap-2 cursor-pointer no-print"
                  title="Klik kanggo ngisi jenengmu dhisik"
                >
                  <span>[Klik Kanggo Ngisi Jeneng Siswa]</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-sans mb-4 sm:mb-6">
              Sampun kasil ngrampungaken gladhen pasinaon lan Ujian Penilaian Harian materi{' '}
              <strong>Nyimak Swara A Jejeg/Miring, Basa Ngoko-Krama, Konsonan TH/DH, lan Anggota Awak</strong> kanthi
              biji sanget maremaken:
            </p>

            {/* Score & Star Ribbon */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm mb-6 sm:mb-8">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 block">
                  Biji Penilaian
                </span>
                <span className="font-heading font-bold text-xl sm:text-2xl text-amber-900">
                  {score} / 100
                </span>
              </div>
              <Star className="w-5 h-5 fill-amber-400 text-amber-500 shrink-0" />
            </div>

            {/* Bottom Signatures & Seal */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 items-end pt-4 border-t border-slate-200 text-xs font-sans text-slate-600">
              {/* Left Signature: Teacher */}
              <div className="space-y-8 sm:space-y-12">
                <span className="block text-[10px] sm:text-[11px]">Surakarta, {currentDate}</span>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 block underline">
                    Bu Guru Siti, S.Pd.
                  </span>
                  <span className="text-[10px] text-slate-500">Guru Basa Jawa Kelas 3</span>
                </div>
              </div>

              {/* Right Seal & Headmaster */}
              <div className="space-y-8 sm:space-y-12">
                <div className="inline-block w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-amber-600 text-amber-700 flex items-center justify-center text-[9px] sm:text-[10px] font-bold rotate-12 mx-auto">
                  CAP RESMI<br/>SEKOLAH
                </div>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 block underline">
                    Drs. Bambang Wijaya, M.Pd.
                  </span>
                  <span className="text-[10px] text-slate-500">Kepala Sekolah Dasar</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 no-print mt-6 italic">
              💡 Tips Cetak: Centang pilihan &apos;Background Graphics&apos; ing setelan browser supaya werna border lan latar mburi sertifikat katon cetha.
            </p>

            <div className="no-print pt-6 mt-4 border-t border-slate-200 flex items-center justify-center gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs shadow-md active:scale-95 transition-all min-h-[40px] flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Sertifikat</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-heading font-semibold text-xs transition-colors min-h-[40px]"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
