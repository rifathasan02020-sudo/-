import { Copy, Bookmark, BookmarkCheck } from "lucide-react";
import { TranslationResult } from "../types";
import { useSavedTranslations } from "../hooks/useSavedTranslations";
import { motion } from "motion/react";

interface TranslationCardProps {
  result: TranslationResult;
}

export function TranslationCard({ result }: TranslationCardProps) {
  const { isSaved, saveTranslation, removeTranslation } = useSavedTranslations();
  const saved = isSaved(result.originalText);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.fullTranslation);
  };

  const toggleSave = () => {
    if (saved) {
      removeTranslation(result.originalText);
    } else {
      saveTranslation(result);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Full Translation Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                title="অনুবাদ কপি করুন"
              >
                <Copy size={18} />
              </button>
              <button
                onClick={toggleSave}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                title={saved ? "সংরক্ষণ থেকে মুছুন" : "সংরক্ষণ করুন"}
              >
                {saved ? <BookmarkCheck size={18} className="text-amber-400" /> : <Bookmark size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                {result.fullTranslation}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Word-by-Word Breakdown Board */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-medium text-slate-300">শব্দভিত্তিক বিশ্লেষণ</h3>
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 divide-y divide-white/5">
            {result.words.map((word, index) => {
              const isArabic = /[\u0600-\u06FF]/.test(word.word);
              return (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-4 first:pt-0">
                  <div className="flex items-center gap-2 min-w-[150px]">
                    <span 
                      className={`text-xl font-medium text-white ${isArabic ? 'font-arabic' : ''}`}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {word.word}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-indigo-400">({word.pronunciation})</span>
                    <span className="text-slate-500 hidden sm:inline">-</span>
                    <span className="text-lg text-emerald-400">{word.meaning}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
