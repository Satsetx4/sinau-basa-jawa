import React, { useState } from 'react';
import { MATERI_MODULES } from '../data/materiData';
import { Volume2, Sparkles, CheckCircle, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import { playClick } from '../lib/sound';
import { speakText } from '../lib/speech';
import { safeStorage, STORAGE_KEYS } from '../lib/storage';

interface MateriSectionProps {
  onStartQuizTopic: (topicId: string) => void;
  completedTopics?: string[];
  onToggleCompleteTopic?: (topicId: string) => void;
}

export const MateriSection: React.FC<MateriSectionProps> = ({
  onStartQuizTopic,
  completedTopics = [],
  onToggleCompleteTopic
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_TOPIC);
    return MATERI_MODULES.some(module => module.id === saved) ? saved! : MATERI_MODULES[0].id;
  });

  const currentModule = MATERI_MODULES.find(m => m.id === selectedTopicId) || MATERI_MODULES[0];

  const handleSpeak = (text: string) => {
    playClick();
    speakText(text);
  };

  return (
    <section id="materi-content" lang="jv" className="py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-heading font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi Pasinaon Basa Jawa Kelas 3 SD</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Wulangan & Nyimak Swara Tembung
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Pilihen topik pasinaon ing ngisor iki. Swara saka browser mung pandhuan tambahan; lafal perlu dicocogake karo guru utawa penutur Basa Jawa.
          </p>
        </div>

        {/* Quick Quiz Shortcut */}
        <button
          onClick={() => {
            playClick();
            onStartQuizTopic(currentModule.id);
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Gladhen Soal Topik Iki
        </button>
      </div>

      {/* Horizontal Scrollable/Grid Topic Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
        {MATERI_MODULES.map((m) => {
          const isSelected = m.id === selectedTopicId;
          const isCompleted = completedTopics.includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => {
                setSelectedTopicId(m.id);
                safeStorage.setItem(STORAGE_KEYS.ACTIVE_TOPIC, m.id);
                playClick();
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-heading font-bold text-xs ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-slate-700 dark:text-emerald-400'
                  }`}
                >
                  {isCompleted ? '✓' : m.number}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-emerald-100' : isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  {isCompleted ? 'Rampung' : `Bab ${m.number}`}
                </span>
              </div>
              <p className={`font-heading font-bold text-xs line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {m.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Module Content Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xl space-y-8">
        {/* Module Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Wulangan {currentModule.number}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {currentModule.badge}
              </span>
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              {currentModule.title}
            </h3>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              {currentModule.subtitle}
            </p>
          </div>

          {/* Pronounce Topic Title Button */}
          <button
            onClick={() => handleSpeak(`${currentModule.title}. ${currentModule.summary}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold self-start md:self-center transition-colors"
          >
            <Volume2 className="w-4 h-4 text-emerald-500" />
            Rungokna Ringkesan
          </button>
        </div>

        {/* Teacher Note Advice */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/40 dark:border-amber-700/40 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 shrink-0">
            <Lightbulb className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200 mb-0.5">
              Paweling Pasinaon (Tips Gampang Ngelingi)
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-sans leading-relaxed">
              {currentModule.teacherNote}
            </p>
          </div>
        </div>

        {/* Sub-sections within Module */}
        <div className="space-y-8">
          {currentModule.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {sec.heading}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {sec.description}
              </p>

              {/* Interactive Audio Word Badges */}
              {sec.items && sec.items.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {sec.items.map((item, wIdx) => (
                    <div
                      key={wIdx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all flex flex-col justify-between gap-3 group shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                              {item.word}
                            </span>
                            <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                              [{item.spoken}]
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 block">
                            Tegese: {item.meaning}
                          </span>
                        </div>

                        {/* Speaker Button */}
                        <button
                          onClick={() => handleSpeak(item.spoken)}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white border border-slate-200 dark:border-slate-600 shadow-sm active:scale-90 transition-all"
                          title={`Rungokna lafal: ${item.spoken}`}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparison Table */}
              {sec.comparison && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-900/80 font-heading font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      <tr>
                        <th className="px-5 py-3.5">{sec.comparison.col1Title}</th>
                        <th className="px-5 py-3.5">{sec.comparison.col2Title}</th>
                        <th className="px-5 py-3.5 hidden sm:table-cell">Katrangan</th>
                        <th className="px-5 py-3.5 text-right">Swara</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 font-sans">
                      {sec.comparison.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                        >
                          <td className="px-5 py-3 font-heading font-semibold text-slate-900 dark:text-white">
                            {row.left}
                          </td>
                          <td className="px-5 py-3 font-heading font-bold text-emerald-600 dark:text-emerald-400">
                            {row.right}
                          </td>
                          <td className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                            {row.note || '-'}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button
                              onClick={() => handleSpeak(row.right.split('(')[0].replace(/["']/g, ''))}
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-emerald-600 dark:text-emerald-300 inline-flex items-center justify-center transition-colors"
                              title="Rungokna"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Step by step instructions */}
              {sec.steps && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {sec.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-xl bg-sky-500 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {sIdx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                        {st}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Rules / Bullet Points */}
              {sec.rules && (
                <div className="space-y-2 pt-1">
                  {sec.rules.map((rule, ruIdx) => (
                    <div
                      key={ruIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA for Module */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {onToggleCompleteTopic && (
              <button
                onClick={() => {
                  playClick();
                  onToggleCompleteTopic(currentModule.id);
                }}
                className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                  completedTopics.includes(currentModule.id)
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:bg-slate-50'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${completedTopics.includes(currentModule.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="inline-flex items-center gap-1">
                  {completedTopics.includes(currentModule.id) ? (
                    'Wis Ditandhani Rampung'
                  ) : (
                    <>
                      <span>Tandhani Rampung Sinau</span>
                    </>
                  )}
                </span>
              </button>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400 italic hidden md:block">
              💡 {currentModule.interactiveTip}
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              onStartQuizTopic(currentModule.id);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Gladhen Soal Bab {currentModule.number}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
