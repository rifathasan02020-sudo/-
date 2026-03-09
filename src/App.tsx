import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { IslamicPhrases } from "./pages/IslamicPhrases";
import { SavedPhrases } from "./pages/SavedPhrases";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <Navbar />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/islamic-phrases" element={<IslamicPhrases />} />
            <Route path="/saved" element={<SavedPhrases />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
