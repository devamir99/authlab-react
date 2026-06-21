import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await authAPI.getProfile();
        if (result.success) {
          setProfile(result.user);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Error fetching user information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                User Dashboard
              </h1>
              <p className="text-gray-300">
                Welcome to AuthLab React user panel
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Last login</p>
              <p className="text-sm font-medium text-white">
                {new Date().toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              User Information
            </h2>
            
            {error ? (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 font-semibold text-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">User ID</p>
                      <p className="font-medium text-white">#{user?.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors border border-blue-500/30 backdrop-blur-sm"
              >
                🔄 Refresh Information
              </button>
              
              <button
                onClick={() => alert('This feature will be added in the next version')}
                className="w-full text-left px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors border border-green-500/30 backdrop-blur-sm"
              >
                ⚙️ Account Settings
              </button>
              
              <button
                onClick={() => alert('This feature will be added in the next version')}
                className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors border border-purple-500/30 backdrop-blur-sm"
              >
                📊 Statistics & Reports
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-semibold text-white mb-2">Authentication</h3>
              <p className="text-sm text-gray-300">
                High security login and registration system
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-white mb-2">Protected Routes</h3>
              <p className="text-sm text-gray-300">
                Protection of sensitive pages
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
            <div className="text-center">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-semibold text-white mb-2">Session Management</h3>
              <p className="text-sm text-gray-300">
                Session persistence with LocalStorage
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={logout}
            className="bg-red-600/80 hover:bg-red-700/80 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg backdrop-blur-sm border border-red-500/30"
          >
            Logout from Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

