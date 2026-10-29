import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MfaPage = () => {
  const navigate = useNavigate();
  const { pendingMfaUser, verifyMfaOtp } = useAuth();
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']); // prefilled convenient demo OTP
  const [timeLeft, setTimeLeft] = useState(167); // 02:47
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(179);
    setError('');
    alert("New 6-digit verification code sent to your registered contact channel.");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }

    const result = verifyMfaOtp(code);
    if (result.success) {
      navigate(result.destination);
    } else {
      setError(result.message || 'Verification failed');
    }
  };

  const maskedEmail = pendingMfaUser?.email
    ? pendingMfaUser.email.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + '*'.repeat(Math.max(1, b.length)))
    : "you@example.com";

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 sm:p-6 bg-[#F8F9FB]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-card p-8 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Shield + Lock Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-navy-800 text-white flex items-center justify-center shadow-md mb-5">
          <ShieldCheck className="w-9 h-9 text-emerald-400" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center shadow">
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Verify it's you</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
          We have sent a 6-digit security code to <br />
          <strong className="text-gray-900 font-semibold">{maskedEmail}</strong>
        </p>

        {error && (
          <div className="mt-4 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="mt-6 space-y-6">
          {/* 6-digit OTP boxes */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold text-navy-800 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent transition-all"
              />
            ))}
          </div>

          {/* Countdown timer */}
          <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <span>Code expires in</span>
            <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
              {formatTimer(timeLeft)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Confirm & Proceed</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-2.5 text-xs">
          <div className="text-gray-500">
            <span>Didn't get the code? </span>
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-navy-800 hover:underline inline-flex items-center gap-1 ml-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Resend</span>
            </button>
          </div>

          <Link
            to="/login"
            className="text-gray-400 hover:text-navy-800 font-medium inline-flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
