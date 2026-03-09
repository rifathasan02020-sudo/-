import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ISLAMIC_PHRASES } from "../data/islamicPhrases";
import { motion, AnimatePresence } from "motion/react";

export function IslamicPhrases() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        {/* Premium Header */}
        <div className="relative flex flex-col items-center text-center">
          <div className="absolute -top-12 h-48 w-48 rounded-full bg-emerald-500/20 blur-[80px]" />
          <h1 className="relative bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl pb-2">
            নামাজের দোয়া ও তাসবিহ
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg text-emerald-100/60 font-light">
            সালাতে পঠিত সকল দোয়া, তাকবির এবং তাসবিহ সমূহের অর্থ ও বিশ্লেষণ
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>

        {/* Cards List */}
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-5">
          {ISLAMIC_PHRASES.length > 0 ? (
            ISLAMIC_PHRASES.map((phrase, index) => {
              const isLongText = phrase.arabic.length > 80;
              return (
              <motion.div
                key={phrase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group overflow-hidden rounded-3xl border transition-all duration-500 ${
                  expandedId === phrase.id 
                    ? 'border-emerald-500/30 bg-gradient-to-b from-slate-900/80 to-slate-900/40 shadow-2xl shadow-emerald-500/5' 
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleExpand(phrase.id)}
                  className="flex w-full items-center justify-between p-6 sm:p-8 text-left outline-none"
                >
                  <span className={`text-xl sm:text-2xl font-medium transition-colors duration-300 ${
                    expandedId === phrase.id ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {phrase.transliteration}
                  </span>
                  <div className={`ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    expandedId === phrase.id 
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 rotate-180' 
                      : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-white/20 group-hover:text-white'
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === phrase.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-8 sm:px-8 pt-2">
                        {/* Arabic & Translation Section */}
                        <div className="flex flex-col items-center text-center gap-8 border-b border-white/5 pb-10">
                          <h2 className={`font-arabic leading-[1.8] font-bold text-emerald-400 drop-shadow-md ${isLongText ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`} dir="rtl">
                            {phrase.arabic}
                          </h2>
                          <div className="flex flex-col gap-3">
                            <h3 className={`font-medium text-white leading-snug ${isLongText ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                              {phrase.bengaliTranslation}
                            </h3>
                            <span className={`text-emerald-200/50 font-light tracking-wide ${isLongText ? 'text-base' : 'text-lg'}`}>
                              {phrase.bengaliPronunciation}
                            </span>
                          </div>
                        </div>

                        {/* Word Breakdown Section */}
                        <div className="mt-8">
                          <h4 className="mb-4 text-sm font-medium text-slate-400">শব্দভিত্তিক বিশ্লেষণ</h4>
                          <div className="flex flex-col gap-3 divide-y divide-white/5">
                            {phrase.words.map((word, wIndex) => {
                              const isArabic = /[\u0600-\u06FF]/.test(word.word);
                              return (
                                <div key={wIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 first:pt-0">
                                  <div className="flex items-center gap-2 min-w-[140px]">
                                    <span 
                                      className={`text-xl sm:text-2xl font-medium text-white ${isArabic ? 'font-arabic' : ''}`}
                                      dir={isArabic ? 'rtl' : 'ltr'}
                                    >
                                      {word.word}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-base sm:text-lg text-indigo-400">({word.pronunciation})</span>
                                    <span className="text-slate-500 hidden sm:inline">-</span>
                                    <span className="text-lg sm:text-xl text-emerald-400">{word.meaning}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              );
            })
          ) : (
            <div className="text-center text-slate-500">
              কোনো বাক্য পাওয়া যায়নি
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
