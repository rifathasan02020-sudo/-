import { useState } from "react";
import { useSavedTranslations } from "../hooks/useSavedTranslations";
import { Bookmark, Trash2, ChevronDown, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function SavedPhrases() {
  const { savedTranslations, removeTranslation } = useSavedTranslations();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (e: React.MouseEvent, originalText: string) => {
    e.stopPropagation();
    removeTranslation(originalText);
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
          <div className="absolute -top-12 h-48 w-48 rounded-full bg-amber-500/20 blur-[80px]" />
          <h1 className="relative bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl pb-2">
            সংরক্ষিত অনুবাদ
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg text-amber-100/60 font-light">
            আপনার সংরক্ষিত অনুবাদ এবং শব্দের অর্থের ব্যক্তিগত সংগ্রহ
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        {/* Saved Items List */}
        {savedTranslations.length > 0 ? (
          <div className="mx-auto w-full max-w-4xl flex flex-col gap-5">
            <AnimatePresence>
              {savedTranslations.map((translation, index) => {
                const isExpanded = expandedId === translation.originalText;
                const isArabic = /[\u0600-\u06FF]/.test(translation.originalText);
                const isLongText = translation.originalText.length > 80;

                return (
                  <motion.div
                    key={translation.originalText}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ delay: index * 0.05 }}
                    className={`group overflow-hidden rounded-3xl border transition-all duration-500 ${
                      isExpanded 
                        ? 'border-amber-500/30 bg-gradient-to-b from-slate-900/80 to-slate-900/40 shadow-2xl shadow-amber-500/5' 
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
                    }`}
                  >
                    <div
                      onClick={() => toggleExpand(translation.originalText)}
                      className="flex w-full cursor-pointer items-center justify-between p-6 sm:p-8 text-left outline-none"
                    >
                      <div className="flex-1 pr-4">
                        <h3 
                          className={`font-medium transition-colors duration-300 line-clamp-1 ${
                            isLongText ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                          } ${isExpanded ? 'text-amber-400' : 'text-slate-200 group-hover:text-white'} ${
                            isArabic ? 'font-arabic leading-[1.8]' : ''
                          }`}
                          dir={isArabic ? 'rtl' : 'ltr'}
                        >
                          {translation.originalText}
                        </h3>
                        <p className="mt-2 text-sm text-slate-400 line-clamp-1">
                          {translation.fullTranslation}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => handleDelete(e, translation.originalText)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400 opacity-0 transition-all hover:bg-red-500/20 group-hover:opacity-100 sm:flex"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                          isExpanded 
                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 rotate-180' 
                            : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-white/20 group-hover:text-white'
                        }`}>
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className="px-6 pb-8 sm:px-8 pt-2">
                            {/* Full Translation Section */}
                            <div className="flex flex-col gap-6 border-b border-white/5 pb-8">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">সম্পূর্ণ অনুবাদ</h4>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => handleCopy(e, translation.fullTranslation)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                                    title="কপি করুন"
                                  >
                                    <Copy size={16} />
                                  </button>
                                  <button
                                    onClick={(e) => handleDelete(e, translation.originalText)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20 sm:hidden"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                              <p className={`font-medium text-white leading-relaxed ${isLongText ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                                {translation.fullTranslation}
                              </p>
                            </div>

                            {/* Word Breakdown Section */}
                            <div className="mt-8">
                              <h4 className="mb-6 text-sm font-medium text-slate-500 uppercase tracking-wider">শব্দভিত্তিক বিশ্লেষণ</h4>
                              <div className="flex flex-col gap-3 divide-y divide-white/5">
                                {translation.words.map((word, wIndex) => {
                                  const isWordArabic = /[\u0600-\u06FF]/.test(word.word);
                                  return (
                                    <div key={wIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-4 first:pt-0">
                                      <div className="flex items-center gap-2 min-w-[180px]">
                                        <span 
                                          className={`text-xl sm:text-2xl font-medium text-white ${isWordArabic ? 'font-arabic leading-[1.8]' : ''}`}
                                          dir={isWordArabic ? 'rtl' : 'ltr'}
                                        >
                                          {word.word}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-base sm:text-lg text-indigo-400">({word.pronunciation})</span>
                                        <span className="text-slate-500 hidden sm:inline">-</span>
                                        <span className="text-lg sm:text-xl text-amber-400">{word.meaning}</span>
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
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 flex flex-col items-center justify-center gap-6 text-center"
          >
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-900/50 ring-1 ring-white/10 shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-xl" />
              <Bookmark size={48} className="text-slate-600 relative z-10" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-medium text-slate-400">এখনো কোনো অনুবাদ সংরক্ষণ করা হয়নি</h2>
              <p className="max-w-md text-sm text-slate-500">
                আপনি যখন কোনো বাক্য অনুবাদ করবেন, তখন বুকমার্ক আইকনে ক্লিক করে এখানে সংরক্ষণ করতে পারবেন।
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
