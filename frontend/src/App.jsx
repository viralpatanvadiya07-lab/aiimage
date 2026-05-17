import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import SharePage from './components/SharePage';

function App() {
  const { user, logout } = useContext(AuthContext);

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
        <div className="pt-6 px-4 max-w-7xl w-full mx-auto sticky top-0 z-50">
          <nav className="glass-nav w-full flex justify-between items-center gap-6 px-6 sm:px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 border border-purple-500/20 backdrop-blur-xl bg-[#120c1f]/80">
            <Link to="/" className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 hover:opacity-90 transition flex items-center gap-3 flex-shrink-0">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-purple-500/40 border border-purple-400/30">AI</span>
              AI Gen
            </Link>
            <div className="flex gap-3 md:gap-4 items-center">
              {user ? (
                <>
                  <span className="text-sm text-purple-200 font-medium bg-purple-950/60 px-4 py-2.5 rounded-xl border border-purple-800/60 backdrop-blur-md flex items-center gap-2 shadow-inner hidden sm:flex">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-lg shadow-pink-500"></span>
                    Credits: <strong className="text-white font-extrabold">{user.credits}</strong>
                  </span>
                  <Link to="/pricing" className="btn-premium px-5 py-2.5 rounded-xl text-sm font-extrabold text-white flex items-center gap-1.5 shadow-lg shadow-purple-500/30 border border-white/20">
                    Buy Credits
                  </Link>
                  <Link to="/gallery" className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-bold text-purple-200 hover:text-white border border-purple-800/50">
                    Gallery
                  </Link>
                  <Link to="/dashboard" className="btn-premium px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow-lg shadow-purple-500/25 border border-white/20">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-bold text-rose-300 border border-rose-500/30 hover:border-rose-500 hover:text-white">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary px-6 py-2.5 rounded-xl text-sm font-bold text-purple-200 hover:text-white border border-purple-800/50">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-premium px-6 py-2.5 rounded-xl text-sm font-extrabold text-white shadow-lg shadow-purple-500/30 border border-white/20">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
