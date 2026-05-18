import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Admin email directly set for frontend logic check
  // Best practice is the backend enforces this, we just hide UI if not admin
  const adminEmail = "viralpatanvadiya07@gmail.com"; 

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || user.email !== adminEmail) {
      navigate('/dashboard'); // Redirect non-admins
      return;
    }

    fetchUsers();
  }, [user, authLoading, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Admin Portal
        </h1>
        <p className="text-zinc-400 mb-8">Manage users and view their credit balance.</p>

        <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1a1a1a] border-b border-white/10">
                <tr>
                  <th className="py-4 px-6 font-medium text-zinc-300">Name</th>
                  <th className="py-4 px-6 font-medium text-zinc-300">Email</th>
                  <th className="py-4 px-6 font-medium text-zinc-300">Credits</th>
                  <th className="py-4 px-6 font-medium text-zinc-300">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-zinc-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium">{u.name}</td>
                      <td className="py-4 px-6 text-zinc-400">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.credits > 50 ? 'bg-green-500/10 text-green-400' :
                          u.credits > 0 ? 'bg-blue-500/10 text-blue-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {u.credits}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-zinc-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
