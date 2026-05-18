import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, Image as ImageIcon, Loader2, Zap, Sparkles, Sliders, ShieldAlert, Download, Share2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedImageId, setGeneratedImageId] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [style, setStyle] = useState('Photorealistic');
  
  const { user, token, updateCredits } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const credits = user ? user.credits : 0;
  const maxCredits = Math.max(credits, 10);

  useEffect(() => {
    if (location.state?.initialPrompt) {
      setPrompt(location.state.initialPrompt);
    }
  }, [location.state]);

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI_Art_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Download failed. Please right-click the image and save.");
    }
  };

  const handleShare = async () => {
    if (!generatedImageId) return;
    const shareUrl = `${window.location.origin}/share/${generatedImageId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(`Shareable link copied to clipboard!\n\n${shareUrl}`);
    } catch (err) {
      alert("Failed to copy URL. Here is your link:\n" + shareUrl);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (!user) {
      alert("Please login to generate images.");
      return;
    }
    if (credits <= 0) {
      alert("Not enough credits! Please upgrade.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}` + '/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt, style, aspectRatio })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }
      
      setIsImageLoading(true);
      setGeneratedImage(data.imageUrl);
      setGeneratedImageId(data.imageId);
      updateCredits(data.credits);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
      {/* Left Sidebar - Controls (Span 4) */}
      <div className="lg:col-span-4 space-y-8 flex flex-col justify-start">
        {/* Balance Card */}
        <div className="p-8 rounded-3xl glass-card border border-purple-800/50 shadow-2xl bg-purple-950/30 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Zap className="text-pink-400" size={24} /> Balance
            </h2>
            <div className="px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-pink-300 rounded-full font-extrabold text-sm shadow-inner">
              {credits} Credits
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#090710]/80 rounded-full h-3 mb-4 overflow-hidden p-0.5 border border-purple-900/50 shadow-inner relative z-10">
            <div 
              className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-pink-500/50 animate-pulse" 
              style={{ width: `${Math.min((credits/maxCredits)*100, 100)}%` }}
            ></div>
          </div>

          <p className="text-xs text-purple-200/80 mb-8 font-medium flex items-center gap-1.5 relative z-10">
            <Sparkles size={14} className="text-pink-400" /> 1 Credit = 1 Studio-Grade Image Generation
          </p>

          <button
            onClick={() => navigate('/pricing')}
            className="btn-premium w-full py-4 rounded-2xl font-extrabold text-white flex justify-center items-center gap-2 shadow-xl shadow-purple-500/30 border border-white/20 relative z-10"
          >
            <Zap size={18} /> Buy More Credits
          </button>
        </div>

        {/* Studio Settings Card */}
        <div className="p-8 rounded-3xl glass-card border border-purple-800/50 shadow-2xl bg-purple-950/30 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6 border-b border-purple-900/50 pb-4">
            <Sliders className="text-pink-400" size={22} />
            <h2 className="text-xl font-extrabold text-white">Synthesis Parameters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Aspect Ratio</span>
                <span className="text-pink-400 font-mono lowercase">{aspectRatio}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '1:1', name: 'Square' },
                  { label: '16:9', name: 'Landscape' },
                  { label: '9:16', name: 'Portrait' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setAspectRatio(item.label)}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                      aspectRatio === item.label 
                        ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-lg shadow-pink-500/20' 
                        : 'bg-[#090710]/60 border-purple-900/60 text-purple-300/70 hover:border-purple-700 hover:text-purple-200'
                    }`}
                  >
                    <span className="font-mono text-sm">{item.label}</span>
                    <span className="text-[10px] opacity-80">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Aesthetic Style</span>
                <span className="text-pink-400 font-medium">{style}</span>
              </label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#090710]/80 text-white border border-purple-900/60 rounded-2xl p-4 font-medium focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 shadow-inner transition cursor-pointer appearance-none"
              >
                <option value="Photorealistic">📸 Photorealistic (Hyper-Real)</option>
                <option value="Anime">🎨 Anime (Japanese Studio)</option>
                <option value="Digital Art">✨ Digital Art (Cyberpunk / Fantasy)</option>
                <option value="Oil Painting">🖌️ Oil Painting (Masterpiece)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Area - Generation (Span 8) */}
      <div className="lg:col-span-8 flex flex-col min-h-[500px] sm:min-h-[650px] space-y-6">
        {/* Output Window */}
        <div className="flex-1 glass-panel border border-purple-800/50 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center shadow-2xl bg-purple-950/20 backdrop-blur-2xl group min-h-[350px] sm:min-h-[450px]">
          
          {(isGenerating || isImageLoading) && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-[#090710]/95 backdrop-blur-md transition-all">
              {/* Outer pulsing ring */}
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-pink-500 animate-spin blur-md opacity-70"></div>
                <div className="absolute inset-1 rounded-full bg-[#090710] flex items-center justify-center">
                  <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400 animate-spin" />
                </div>
              </div>
              <div className="text-center px-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1 animate-pulse">Synthesizing Neural Art...</h3>
                <p className="text-[10px] sm:text-xs text-pink-400/80 font-mono">
                  {isImageLoading ? "Applying final upscaling & color grading..." : "Running Flux Realism diffusion passes..."}
                </p>
              </div>
            </div>
          )}

          {generatedImage ? (
            <div className="relative w-full h-full p-4 sm:p-8 flex flex-col items-center justify-center">
              <img 
                src={generatedImage} 
                alt="Generated Art" 
                className={`max-w-full max-h-[300px] sm:max-h-[550px] object-contain rounded-2xl shadow-2xl border border-white/10 transition-all duration-700 transform ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  alert("Failed to load the generated image. Please try again.");
                  setGeneratedImage(null);
                }}
              />
              {!isImageLoading && (
                <>
                  {/* Desktop Hover Overlay */}
                  <div className="absolute inset-0 bg-[#090710]/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center gap-4 rounded-3xl m-2">
                    <button 
                      onClick={handleDownload} 
                      className="btn-premium px-6 py-3 text-white font-bold rounded-xl shadow-xl flex items-center gap-2 border border-white/20 cursor-pointer"
                    >
                      <Download size={18} /> Download HD
                    </button>
                    <button 
                      onClick={handleShare} 
                      className="btn-secondary px-6 py-3 text-white font-bold rounded-xl shadow-xl flex items-center gap-2 border border-purple-800 cursor-pointer"
                    >
                      <Share2 size={18} /> Share Showcase
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : !isGenerating && (
            <div className="text-center text-purple-300/50 flex flex-col items-center gap-4 p-6 sm:p-8 max-w-md">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-purple-950/40 flex items-center justify-center border border-purple-800/40 shadow-inner group-hover:scale-105 transition-transform">
                <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400/60 group-hover:text-pink-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-purple-200 mb-1">Canvas is Empty</h3>
                <p className="text-[11px] sm:text-xs text-purple-300/60 leading-relaxed font-light">
                  Type your prompt in the neural input bar below and hit generate to bring your wildest imagination to life.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile-Only Action Buttons for Generated Image */}
        {generatedImage && !isImageLoading && (
          <div className="flex md:hidden gap-3 w-full px-1">
            <button 
              onClick={handleDownload} 
              className="btn-premium flex-1 py-3 text-sm font-extrabold text-white rounded-xl shadow-lg flex items-center justify-center gap-1.5 border border-white/10"
            >
              <Download size={16} /> Download
            </button>
            <button 
              onClick={handleShare} 
              className="btn-secondary flex-1 py-3 text-sm font-bold text-purple-200 rounded-xl shadow-lg flex items-center justify-center gap-1.5 border border-purple-800/50"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleGenerate} className="relative mt-auto">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your masterpiece..."
            className="w-full bg-[#090710]/95 text-white border border-purple-800/80 rounded-3xl py-4.5 sm:py-6 pl-5 sm:pl-8 pr-16 sm:pr-36 font-medium focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 shadow-2xl backdrop-blur-xl transition text-sm sm:text-base placeholder:text-purple-300/40"
            disabled={isGenerating}
          />
          <button 
            type="submit" 
            disabled={isGenerating || !prompt.trim() || credits <= 0}
            className="btn-premium absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-2.5 sm:py-4 disabled:bg-purple-950 disabled:text-purple-500 disabled:border-purple-900 disabled:cursor-not-allowed rounded-2xl font-bold text-white shadow-lg shadow-purple-500/30 flex items-center gap-2 border border-white/20 cursor-pointer"
          >
            <span className="hidden sm:inline text-sm">Synthesize</span> <Send size={16} className="sm:w-5 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
