import React, { useState } from 'react';
import { KAMUS_DATA, KamusEntry } from '../data/kamusData';
import { Search, Volume2, BookOpen, Filter, X, ArrowLeft } from 'lucide-react';
import { playClick } from '../lib/sound';
import { speakText } from '../lib/speech';

interface KamusSectionProps {
  onBack?: () => void;
}

export const KamusSection: React.FC<KamusSectionProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');

  const filteredList = KAMUS_DATA.filter((item) => {
    const matchCategory = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const query = searchTerm.toLowerCase();
    const matchSearch =
      item.indonesia.toLowerCase().includes(query) ||
      item.ngoko.toLowerCase().includes(query) ||
      item.krama.toLowerCase().includes(query) ||
      item.kramaInggil.toLowerCase().includes(query) ||
      item.contoh.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });

  const handleSpeakWord = (item: KamusEntry) => {
    playClick();
    speakText(`Basa ngoko: ${item.ngoko}. Basa krama: ${item.krama}. Basa krama inggil: ${item.kramaInggil}. ${item.contoh}`);
  };

  const categories = ['Semua', 'Awak', 'Pakaryan', 'Kahanan', 'Panganan', 'Srawung'];

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bausastra Cilik Jawa - Indonesia</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Kamus Saku Digital Basa Jawa
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Golekana tegese tembung, pasangan ngoko, krama, lan krama inggil kanthi gampang lan jangkep mawa swara audio!
          </p>
        </div>
      </div>

      {/* Search Bar & Filter Chips */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Golek tembung (contone: mangan, kepala, ngombe, turu, untu)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-11 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 shadow-sm"
          />
          {searchTerm.length > 0 && (
            <button
              onClick={() => {
                setSearchTerm('');
                playClick();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Kosongake telusuran"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {categories.map((kat) => (
            <button
              key={kat}
              onClick={() => {
                setSelectedKategori(kat);
                playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                selectedKategori === kat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {kat}
            </button>
          ))}
          <span className="text-xs text-slate-400 font-medium ml-auto pl-2 whitespace-nowrap">
            Ketemu {filteredList.length} Tembung
          </span>
        </div>
      </div>

      {/* Dictionary Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            Tembung ora ditemokake
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Coba tulis nganggo tembung liyane utawa ganti pilihan kategori ing dhuwur.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                {/* Header: Indonesian & Category */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Basa Indonesia
                    </span>
                    <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                      {item.indonesia}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                    {item.kategori}
                  </span>
                </div>

                {/* Ngoko & Krama Levels */}
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ngoko:</span>
                    <span className="font-heading font-bold text-slate-800 dark:text-slate-200">
                      {item.ngoko}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Krama:</span>
                    <span className="font-heading font-semibold text-slate-700 dark:text-slate-300">
                      {item.krama}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Krama Inggil:</span>
                    <span className="font-heading font-bold text-purple-700 dark:text-purple-300 text-sm">
                      {item.kramaInggil}
                    </span>
                  </div>
                </div>

                {/* Example sentence */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Conto Ukara:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                    &ldquo;{item.contoh}&rdquo;
                  </p>
                </div>
              </div>

              {/* Pronounce Button */}
              <button
                onClick={() => handleSpeakWord(item)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white dark:bg-slate-700 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 text-xs font-heading font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Rungokna Lafal & Ukara
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
