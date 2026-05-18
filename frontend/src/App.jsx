import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { Menu, X, Sparkles, Zap, Image as ImageIcon, LayoutDashboard, LogOut, ShieldAlert } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import SharePage from './components/SharePage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <BrowserRouter>
        <div className="min-h-screen bg-[#090710] text-slate-100 flex flex-col relative overflow-hidden font-sans selection:bg-pink-500 selection:text-white">
          
          {/* Mesmerizing Animated Background System */}
          <div className="bg-animated-grid opacity-35 z-0"></div>
          <div className="stardust-bg z-0"></div>
          <div className="orb-1 z-0"></div>
          <div className="orb-2 z-0"></div>
          <div className="orb-3 z-0"></div>

        {/* Floating Glass Navbar */}
        <div className="pt-3 sm:pt-4 px-6 sm:px-8 max-w-4xl w-full mx-auto sticky top-0 z-50">
          <nav className="glass-nav w-full flex justify-between items-center gap-6 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-2xl shadow-2xl transition-all duration-300 border border-purple-500/20 backdrop-blur-xl bg-[#120c1f]/90 relative">
            <Link to="/" onClick={closeMenu} className="text-lg sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 hover:opacity-90 transition flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs sm:text-base font-black shadow-lg shadow-purple-500/40 border border-purple-400/30">AI</span>
              AI Gen
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex gap-2.5 md:gap-3 items-center">
              {user ? (
                <>
                  <span className="text-xs text-purple-200 font-medium bg-purple-950/60 px-3 py-1.5 rounded-lg border border-purple-800/60 backdrop-blur-md flex items-center gap-1.5 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse shadow-lg shadow-pink-500"></span>
                    Credits: <strong className="text-white font-extrabold">{user.credits}</strong>
                  </span>
                  <Link to="/pricing" className="btn-premium px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white flex items-center gap-1 shadow-lg shadow-purple-500/30 border border-white/20">
                    Buy Credits
                  </Link>
                  {user.email === "viralpatanvadiya07@gmail.com" && (
                    <Link to="/admin" className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-bold text-pink-400 hover:text-white border border-pink-500/50">
                      Admin
                    </Link>
                  )}
                  <Link to="/gallery" className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-bold text-purple-200 hover:text-white border border-purple-800/50">
                    Gallery
                  </Link>
                  <Link to="/dashboard" className="btn-premium px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white shadow-lg shadow-purple-500/25 border border-white/20">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-bold text-rose-300 border border-rose-500/30 hover:border-rose-500 hover:text-white cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary px-4 py-1.5 rounded-lg text-xs font-bold text-purple-200 hover:text-white border border-purple-800/50">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-premium px-4 py-1.5 rounded-lg text-xs font-extrabold text-white shadow-lg shadow-purple-500/30 border border-white/20">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-3">
              {user && (
                <span className="text-[11px] sm:text-xs text-purple-200 font-bold bg-purple-950/60 px-2.5 py-1 rounded-xl border border-purple-800/60 backdrop-blur-md flex items-center gap-1 shadow-inner">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
                  Credits: <strong className="text-white font-extrabold">{user.credits}</strong>
                </span>
              )}
              <button 
                onClick={toggleMenu} 
                className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {/* Mobile Drawer (Slide Down) */}
            {isMenuOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 p-4 rounded-xl border border-purple-500/25 bg-[#120c1f] shadow-2xl flex flex-col gap-2.5 z-[999] xl:hidden animate-fade-in">
                {user ? (
                  <>
                    <div className="flex items-center justify-between border-b border-purple-900/50 pb-2 mb-0.5">
                      <span className="text-xs font-medium text-purple-300">Welcome back</span>
                      <span className="text-xs font-extrabold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-md border border-pink-500/20 flex items-center gap-1">
                        <Sparkles size={12} /> {user.credits} Credits
                      </span>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={closeMenu} 
                      className="btn-premium px-4 py-2 rounded-lg text-xs font-extrabold text-white flex items-center justify-center gap-1.5 border border-white/20 w-full"
                    >
                      <LayoutDashboard size={14} /> Studio Dashboard
                    </Link>
                    <Link 
                      to="/gallery" 
                      onClick={closeMenu} 
                      className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-purple-800/50 w-full"
                    >
                      <ImageIcon size={14} className="text-pink-400" /> My Gallery
                    </Link>
                    <Link 
                      to="/pricing" 
                      onClick={closeMenu} 
                      className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-purple-800/50 w-full"
                    >
                      <Zap size={14} className="text-amber-400 animate-pulse" /> Buy Credits
                    </Link>
                    {user.email === "viralpatanvadiya07@gmail.com" && (
                      <Link 
                        to="/admin" 
                        onClick={closeMenu} 
                        className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold text-pink-400 flex items-center justify-center gap-1.5 border border-pink-500/50 w-full"
                      >
                        <ShieldAlert size={14} /> Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => { logout(); closeMenu(); }} 
                      className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold text-rose-300 border border-rose-500/30 flex items-center justify-center gap-1.5 w-full mt-1 cursor-pointer"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={closeMenu} 
                      className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-purple-800/50 w-full bg-purple-950/60"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={closeMenu} 
                      className="btn-premium px-4 py-2 rounded-lg text-xs font-extrabold text-white flex items-center justify-center gap-1.5 border border-white/20 w-full"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/share/:id" element={<SharePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
