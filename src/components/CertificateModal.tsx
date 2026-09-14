import React from 'react';
import { X, Printer, Award, Sparkles, CheckCircle } from 'lucide-react';
import { playClick } from '../lib/sound';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  score: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  score
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden">
        {/* Top bar with Print and Close buttons (hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-heading font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Sertifikat Siswa Berprestasi</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpen PDF</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= Printable Certificate Canvas ================= */}
        <div className="p-8 sm:p-12 text-center relative bg-[#fffdfa] text-slate-900 border-[10px] border-double border-amber-600/30 m-4 rounded-2xl shadow-inner selection:bg-amber-200">
          {/* Corner Decorative Javanese Ornaments */}
          <div className="absolute top-3 left-3 text-amber-500 text-2xl font-bold">ꦗ</div>
          <div className="absolute top-3 right-3 text-amber-500 text-2xl font-bold">ꦗ</div>
          <div className="absolute bottom-3 left-3 text-amber-500 text-2xl font-bold">ꦗ</div>
          <div className="absolute bottom-3 right-3 text-amber-500 text-2xl font-bold">ꦗ</div>

          {/* Certificate Header */}
          <div className="space-y-1 mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-700 block">
              PIWULANG BASA JAWA KELAS 3 SEKOLAH DASAR
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              SURAT KATRANGAN PRESTASI
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-sans mb-3">
            Katur dhumateng siswa ingkang wasis lan nduweni tata krama becik:
          </p>

          {/* Recipient Name */}
          <div className="py-2 border-b-2 border-amber-600/40 inline-block px-8 mb-4">
            <h3 className="font-heading font-bold text-3xl sm:text-4xl text-emerald-800 tracking-wide">
              {studentName}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-sans mb-6">
            Sampun kasil ngrampungaken gladhen pasinaon lan Ujian Penilaian Harian materi{' '}
            <strong>Nyimak Swara A Jejeg/Miring, Basa Ngoko-Krama, Konsonan TH/DH, lan Anggota Awak</strong> kanthi
            biji sanget maremaken:
          </p>

          {/* Score & Star Ribbon */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm mb-8">
            <span className="text-2xl">⭐</span>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 block">
                Biji Penilaian
              </span>
              <span className="font-heading font-bold text-2xl text-amber-900">
                {score} / 100
              </span>
            </div>
            <span className="text-2xl">⭐</span>
          </div>

          {/* Bottom Signatures & Seal */}
          <div className="grid grid-cols-2 gap-8 items-end pt-4 border-t border-slate-200 text-xs font-sans text-slate-600">
            {/* Left Signature: Teacher */}
            <div className="space-y-12">
              <span className="block text-[11px]">Surakarta, {currentDate}</span>
              <div>
                <span className="font-heading font-bold text-sm text-slate-900 block underline">
                  Bu Guru Siti, S.Pd.
                </span>
                <span className="text-[10px] text-slate-500">Guru Basa Jawa Kelas 3</span>
              </div>
            </div>

            {/* Right Seal & Headmaster */}
            <div className="space-y-12">
              <div className="inline-block w-16 h-16 rounded-full border-2 border-dashed border-amber-600 text-amber-700 flex items-center justify-center text-[10px] font-bold rotate-12 mx-auto">
                CAP RESMI<br/>SEKOLAH
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-slate-900 block underline">
                  Drs. Bambang Wijaya, M.Pd.
                </span>
                <span className="text-[10px] text-slate-500">Kepala Sekolah Dasar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
