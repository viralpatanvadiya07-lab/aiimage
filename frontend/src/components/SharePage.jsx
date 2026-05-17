import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Sparkles, Loader2, Zap, Share2 } from 'lucide-react';

export default function SharePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedImage = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/shared-image/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load image');
        setImage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedImage();
  }, [id]);

  const handleDownload = async () => {
    if (!image) return;
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanPrompt = image.prompt.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
      link.download = `AI_${cleanPrompt}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Download failed. Please right-click the image and save as.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-gray-400 font-medium animate-pulse">Loading masterpiece...</p>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="p-8 rounded-3xl bg-gray-800/50 border border-gray-700 max-w-md backdrop-blur-sm shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-3">Image Not Found</h3>
          <p className="text-gray-400 text-sm mb-6">
            {error || "This image may have been deleted or the link is invalid."}
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-500/25"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      {/* Top Banner */}
      <div className="w-full flex items-center justify-between mb-8 p-4 rounded-2xl glass-card border border-purple-800/40 backdrop-blur-sm bg-purple-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 font-bold border border-white/20">
            AI
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AI Gen Platform</h4>
            <p className="text-xs text-purple-200/70">Created by {image.authorName}</p>
          </div>
        </div>
        <Link 
          to="/signup" 
          className="btn-premium px-5 py-2 rounded-xl text-white text-sm font-bold shadow-lg shadow-purple-500/30 transition transform hover:scale-105 flex items-center gap-1.5 border border-white/20"
        >
          <Zap size={16} /> Create Your Own
        </Link>
      </div>

      {/* Main Art Display */}
      <div className="w-full glass-card border border-purple-800/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-6 md:p-8 backdrop-blur-sm mb-8 bg-purple-950/20">
        <div className="relative max-w-full rounded-2xl overflow-hidden shadow-2xl mb-8 bg-[#090710]">
          <img 
            src={image.imageUrl} 
            alt={image.prompt} 
            className="max-h-[600px] w-auto object-contain rounded-2xl border border-white/10" 
          />
        </div>

        {/* Prompt & Metadata */}
        <div className="w-full max-w-3xl text-center flex flex-col items-center gap-4">
          <div className="flex gap-2 flex-wrap justify-center">
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">
              {image.aspectRatio}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              {image.style} Style
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-200/70 text-xs font-semibold">
              {new Date(image.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
            "{image.prompt}"
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <button 
              onClick={handleDownload}
              className="btn-premium px-8 py-4 rounded-xl text-white font-bold transition shadow-lg shadow-purple-500/30 flex items-center gap-2 transform hover:scale-105 active:scale-95 border border-white/20"
            >
              <Download size={20} /> Download Image
            </button>
            <button 
              onClick={handleCopyLink}
              className="btn-secondary px-8 py-4 rounded-xl text-white font-bold transition shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 border border-purple-800"
            >
              <Share2 size={20} /> Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center py-8">
        <h3 className="text-xl font-bold text-white mb-2">Want to create images like this?</h3>
        <p className="text-purple-200/70 text-sm mb-4 max-w-md mx-auto leading-relaxed font-light">
          Join AI Gen today and get 10 free credits to instantly turn your imagination into stunning artwork.
        </p>
        <Link 
          to="/signup" 
          className="btn-premium inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold shadow-lg shadow-purple-500/30 transition transform hover:scale-105 border border-white/20"
        >
          <Sparkles size={20} /> Claim Your 10 Free Credits
        </Link>
      </div>
    </div>
  );
}
