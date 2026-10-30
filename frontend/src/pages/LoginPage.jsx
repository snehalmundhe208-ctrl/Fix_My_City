import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Lock, ArrowRight, UserCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { initiateLogin } = useAuth();
  const [email, setEmail] = useState('amit.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }
    setError('');
    const role = email.toLowerCase().includes('admin') ? 'Admin' : 'Citizen';
    try {
      await initiateLogin(email, password, role);
      navigate('/mfa');
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    }
  };

  const setDemoCitizen = () => {
    setEmail('amit.sharma@example.com');
    setPassword('citizenPass123');
  };

  const setDemoAdmin = () => {
    setEmail('admin@fixmycity.org');
    setPassword('adminSecure123');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col lg:flex-row bg-white">
      {/* Left Half: City building photo with dark overlay */}
      <div className="relative lg:w-1/2 min-h-[260px] lg:min-h-auto flex flex-col justify-between p-8 sm:p-12 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/80 to-navy-900/60" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center border border-navy-700 shadow">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold tracking-tight">FixMyCity</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md my-8">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Citizen & Admin Unified Auth
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 leading-snug">
            Civic Participation Made Simple, Transparent & Rewarding.
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
            Log in to submit complaints, monitor field repair status with photos, claim monthly bus passes, or access administrative management.
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted with standard 256-bit civic portal security</span>
        </div>
      </div>

      {/* Right Half: White Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8F9FB]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200/90 shadow-card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="text-xs text-gray-500 mt-1">
              Select an account or enter your civic portal credentials
            </p>
          </div>

          {/* Demo quick fillers */}
          <div className="mb-6 p-3 bg-navy-50 rounded-xl border border-navy-100 space-y-2">
            <p className="text-[11px] font-bold text-navy-800 uppercase tracking-wider">
              Quick Demo Fillers:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={setDemoCitizen}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-navy-100 text-navy-800 border border-navy-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-navy-800" />
                <span>Citizen Demo</span>
              </button>
              <button
                type="button"
                onClick={setDemoAdmin}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#help" onClick={(e) => { e.preventDefault(); alert("Password reset link dispatched to registered email / phone OTP."); }} className="text-xs text-navy-800 font-semibold hover:underline">
                  Need password help?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-600">
            <span>Don't have an account? </span>
            <Link to="/register" className="font-bold text-navy-800 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
