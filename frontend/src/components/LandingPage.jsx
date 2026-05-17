import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Image as ImageIcon, Zap, Shield, Wand2, Layers, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const trendingPrompt = "A majestic cyberpunk samurai cat in neon-lit Tokyo streets, 8k resolution, cinematic lighting";

  const handleTryPrompt = () => {
    navigate('/dashboard', { state: { initialPrompt: trendingPrompt } });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-24 px-4 text-center relative z-10 max-w-7xl mx-auto">
      {/* Top pill badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-950/80 text-pink-400 border border-purple-500/30 mb-8 backdrop-blur-md shadow-lg shadow-purple-500/10 animate-bounce-subtle">
        <Sparkles size={16} className="animate-spin-slow" />
        <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">Next-Gen AI Image Synthesis Engine 2.0</span>
      </div>
      
      {/* Main Hero Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-none text-white">
        Transform Words Into <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 via-pink-400 to-rose-400 filter drop-shadow-lg">
          Breathtaking Art
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl font-light leading-relaxed">
        Experience the pinnacle of AI creativity. Sign up today to receive <strong className="inline-block whitespace-nowrap mx-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/30 text-pink-300 font-extrabold shadow-lg shadow-pink-500/10 align-middle">10 Free Credits</strong> and generate hyper-realistic, studio-grade masterpieces in seconds.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 mb-20 w-full sm:w-auto justify-center items-center">
        <Link 
          to="/dashboard" 
          className="btn-premium w-full sm:w-auto px-8 py-5 rounded-2xl font-extrabold text-lg text-white flex items-center justify-center gap-3 border border-white/20 group"
        >
          Start Creating for Free <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          to="/gallery" 
          className="btn-secondary w-full sm:w-auto px-8 py-5 rounded-2xl font-extrabold text-lg text-purple-200 hover:text-white flex items-center justify-center gap-3 border border-purple-800/80"
        >
          Explore Community Art <ImageIcon size={22} className="text-pink-400" />
        </Link>
      </div>

      {/* Interactive Prompt Showcase Banner */}
      <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl mb-24 border border-pink-500/40 hover:border-pink-500/80 shadow-2xl shadow-pink-500/10 backdrop-blur-2xl bg-gradient-to-r from-purple-950/60 via-[#150e28]/90 to-purple-950/60 text-left flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all pointer-events-none"></div>

        <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 flex-shrink-0 font-bold border border-white/20 animate-pulse">
            <Wand2 size={26} />
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-extrabold text-pink-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>🔥 TRENDING PROMPT EXAMPLE</span>
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-100 to-white font-semibold text-base sm:text-lg italic tracking-wide line-clamp-2 md:line-clamp-1 drop-shadow-sm">
              "{trendingPrompt}"
            </div>
          </div>
        </div>
        <button 
          onClick={handleTryPrompt}
          className="btn-premium px-8 py-4 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-center shadow-xl shadow-purple-500/20 border border-white/20 group-hover:scale-105 transition-transform relative z-10 cursor-pointer"
        >
          Try This Prompt <Zap size={18} className="animate-bounce" />
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left mb-20">
        <div className="p-8 rounded-3xl glass-card hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 group bg-purple-950/30 border-purple-900/50">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-purple-500/30">
            <Zap className="text-purple-400" size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-3 text-white group-hover:text-purple-400 transition-colors">Lightning Synthesis</h3>
          <p className="text-purple-200/80 leading-relaxed font-light">
            Our state-of-the-art GPU cluster generates complex, high-fidelity visuals in just mere seconds, keeping your creative flow uninterrupted.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card hover:border-fuchsia-500/50 transition-all duration-300 hover:-translate-y-2 group bg-purple-950/30 border-purple-900/50">
          <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-fuchsia-500/30">
            <ImageIcon className="text-fuchsia-400" size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-3 text-white group-hover:text-fuchsia-400 transition-colors">Studio Grade Quality</h3>
          <p className="text-purple-200/80 leading-relaxed font-light">
            Every image is rendered with stunning detail, perfect for professional projects, marketing campaigns, or marketing assets.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2 group bg-purple-950/30 border-purple-900/50">
          <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-pink-500/30">
            <Sparkles className="text-pink-400" size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-3 text-white group-hover:text-pink-400 transition-colors">10 Free Credits</h3>
          <p className="text-purple-200/80 leading-relaxed font-light">
            Begin your creative journey completely free. No credit card required upon signup. Instantly claim your credits and start exploring.
          </p>
        </div>
      </div>

      {/* Bottom Social Proof / Trust Footer */}
      <div className="pt-12 border-t border-purple-900/50 w-full max-w-5xl flex flex-wrap items-center justify-center gap-8 text-purple-400/80 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-emerald-400" /> Secure 256-Bit Encryption
        </div>
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-pink-400" /> Flux Realism AI Model Powered
        </div>
        <div className="flex items-center gap-2">
          <Wand2 size={18} className="text-purple-400" /> 100% Commercial Usage Rights
        </div>
      </div>
    </div>
  );
}
