import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Bookmark, Languages, Download } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";

function TypingLogo() {
  const fullText = "শব্দে শব্দে অর্থ";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 3000); // Pause at end
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  const word1 = "শব্দে ";
  const word2 = "শব্দে ";
  const word3 = "অর্থ";

  let remaining = displayedText;
  
  let part1 = remaining.slice(0, word1.length);
  remaining = remaining.slice(word1.length);
  
  let part2 = remaining.slice(0, word2.length);
  remaining = remaining.slice(word2.length);
  
  let part3 = remaining.slice(0, word3.length);

  return (
    <span className="text-xl font-bold tracking-tight text-white flex items-center min-w-[140px]">
      <span>
        <span>{part1}</span>
        <span className="text-emerald-400">{part2}</span>
        <span>{part3}</span>
      </span>
      <span className="animate-pulse border-r-2 border-emerald-400 h-5 ml-[2px]"></span>
    </span>
  );
}

export function Navbar() {
  const { isInstallable, install } = usePWAInstall();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-lg shadow-indigo-500/20">
            <Languages size={22} className="absolute" />
          </div>
          <TypingLogo />
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? "text-indigo-400" : "text-slate-400 hover:text-white"
              }`
            }
          >
            <Languages size={18} />
            <span className="hidden sm:inline">অনুবাদ</span>
          </NavLink>
          <NavLink
            to="/islamic-phrases"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? "text-emerald-400" : "text-slate-400 hover:text-white"
              }`
            }
          >
            <BookOpen size={18} />
            <span className="hidden sm:inline">ইসলামিক বাক্য</span>
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? "text-amber-400" : "text-slate-400 hover:text-white"
              }`
            }
          >
            <Bookmark size={18} />
            <span className="hidden sm:inline">সংরক্ষিত</span>
          </NavLink>
          
          {isInstallable && (
            <button
              onClick={install}
              className="ml-2 flex items-center gap-2 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/30 hover:text-indigo-300"
              title="Install App"
            >
              <Download size={16} />
              <span className="hidden sm:inline">ইন্সটল</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
