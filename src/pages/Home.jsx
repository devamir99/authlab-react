import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-6">
              Welcome to AuthLab React
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A modern and complete authentication system with React that includes registration, login, 
              session management and route protection.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-blue-400 text-3xl mb-4">🔐</div>
                <h3 className="text-lg font-semibold mb-2 text-white">Secure Authentication</h3>
                <p className="text-gray-300">
                  Complete and secure login and registration system with validation
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-green-400 text-3xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold mb-2 text-white">Protected Routes</h3>
                <p className="text-gray-300">
                  Protection of sensitive pages with React Router
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-purple-400 text-3xl mb-4">💾</div>
                <h3 className="text-lg font-semibold mb-2 text-white">Session Management</h3>
                <p className="text-gray-300">
                  Session persistence with LocalStorage and Context API
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {isAuthenticated ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-300 mb-6">
                  Welcome, <span className="font-semibold text-blue-400">{user?.name}</span>!
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg backdrop-blur-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-8">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'React Router', 'Axios', 'Formik', 'Yup', 'Tailwind CSS', 'Context API'].map((tech) => (
                <span
                  key={tech}
                  className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-medium text-gray-200 shadow-lg border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
