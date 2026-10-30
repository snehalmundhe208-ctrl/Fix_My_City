import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerCitizen } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [ward, setWard] = useState('Ward 12');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerCitizen({ name, email, phone, password, ward });
      navigate('/mfa');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col lg:flex-row bg-white">
      {/* Left Half: City building photo with dark overlay */}
      <div className="relative lg:w-1/2 min-h-[260px] lg:min-h-auto flex flex-col justify-between p-8 sm:p-12 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=80')`
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
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Citizen Registration
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 leading-snug">
            Become an Active Citizen Guardian in Your Neighborhood.
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
            Report civic bottlenecks, earn verified community badges, and receive statutory delay compensations if issues exceed turnaround deadlines.
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role automatically designated as Citizen</span>
        </div>
      </div>

      {/* Right Half: White Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8F9FB]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200/90 shadow-card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Citizen Account</h2>
            <p className="text-xs text-gray-500 mt-1">
              Join thousands of residents improving their city infrastructure
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98220..."
                    className="w-full text-xs sm:text-sm pl-9 pr-2 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Ward Locality
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
                >
                  <option value="Ward 12">Ward 12 (Central)</option>
                  <option value="Ward 5">Ward 5 (North)</option>
                  <option value="Ward 8">Ward 8 (West)</option>
                  <option value="Ward 14">Ward 14 (East)</option>
                  <option value="Ward 3">Ward 3 (South)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
              <span className="font-semibold text-gray-800">Assigned Role: </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Citizen
              </span>
              <span className="text-[11px] text-gray-500 block mt-0.5">Admin access is restricted to municipal administrators.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-navy-800 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
