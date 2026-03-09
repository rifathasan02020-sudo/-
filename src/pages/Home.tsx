import { useState } from "react";
import { Loader2, ArrowRight, RefreshCw } from "lucide-react";
import { translateText } from "../services/geminiService";
import { TranslationResult } from "../types";
import { TranslationCard } from "../components/TranslationCard";
import { motion } from "motion/react";

export function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const translation = await translateText(inputText);
      setResult(translation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleRefresh = () => {
    setInputText("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white leading-tight"
            >
              জ্ঞানের আলো ছড়িয়ে
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent pt-1 pb-2 leading-tight"
            >
              পড়ুক প্রতিটি শব্দে
            </motion.div>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            প্রতিটি শব্দের গভীরে প্রবেশ করুন। ইংরেজি, আরবি এবং উর্দু থেকে বাংলায় শব্দভিত্তিক অনুবাদ ও ব্যাখ্যা।
          </motion.p>
        </div>

        <div className="relative mx-auto w-full max-w-3xl mt-4">
          <div className="group relative rounded-3xl bg-slate-900/50 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-all focus-within:ring-indigo-500/50">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="অনুবাদ করার জন্য এখানে লিখুন..."
              className="min-h-[140px] w-full resize-none bg-transparent p-5 text-lg text-white placeholder-slate-500 focus:outline-none"
              dir="auto"
            />
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  title="রিফ্রেশ করুন"
                >
                  <RefreshCw size={18} className={inputText || result ? "text-emerald-400" : ""} />
                  <span className="hidden sm:inline">রিফ্রেশ</span>
                </button>
                <span className="text-sm text-slate-500 hidden md:inline-block">
                  অনুবাদ করতে Enter চাপুন
                </span>
              </div>
              <button
                onClick={handleTranslate}
                disabled={isLoading || !inputText.trim()}
                className="flex items-center gap-2 rounded-full bg-indigo-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400 disabled:opacity-50 disabled:hover:bg-indigo-500 ml-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    অনুবাদ হচ্ছে...
                  </>
                ) : (
                  <>
                    অনুবাদ করুন
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto w-full max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <div className="mt-8">
            <TranslationCard result={result} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
