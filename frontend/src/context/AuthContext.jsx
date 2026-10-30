import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext();

const CITIZEN_USER = {
  id: "usr-citizen-1",
  name: "Amit Sharma",
  email: "amit.sharma@example.com",
  role: "Citizen",
  phone: "+91 98220 12345",
  ward: "Ward 12",
  initials: "AS",
  avatarBg: "bg-navy-800 text-white"
};

const ADMIN_USER = {
  id: "usr-admin-1",
  name: "Sunil K. Verma",
  email: "admin@fixmycity.org",
  role: "Admin",
  phone: "+91 98110 55667",
  designation: "Central Civic Command Administrator",
  initials: "SV",
  avatarBg: "bg-emerald-700 text-white"
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fixmycity_user');
    return saved ? JSON.parse(saved) : CITIZEN_USER;
  });

  const [pendingMfaUser, setPendingMfaUser] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fixmycity_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fixmycity_user');
    }
  }, [currentUser]);

  const initiateLogin = async (email, password, role = 'Citizen') => {
    let targetUser = {
      email,
      role: role || (email.toLowerCase().includes('admin') ? 'Admin' : 'Citizen'),
      name: email.toLowerCase().includes('admin') ? 'Sunil K. Verma' : 'Amit Sharma',
      initials: email.toLowerCase().includes('admin') ? 'SV' : 'AS'
    };

    try {
      const res = await apiClient.post('/auth/login', { email, password, role });
      if (res && res.user) {
        targetUser = {
          ...targetUser,
          ...res.user,
          initials: (res.user.name || "User").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
          demoOtp: res.demoOtp
        };
      }
    } catch (e) {
      // Allow fallback only if offline mode enabled
      if (import.meta.env.VITE_OFFLINE_MODE === 'true' || localStorage.getItem('fixmycity_dev_offline_mode') === 'true') {
        targetUser = role === 'Admin' ? ADMIN_USER : CITIZEN_USER;
      } else {
        throw e;
      }
    }

    setPendingMfaUser(targetUser);
    return { success: true, requireMfa: true, user: targetUser };
  };

  const verifyMfaOtp = async (otp) => {
    if (!pendingMfaUser) {
      return { success: false, message: "No pending login session found. Please sign in again." };
    }

    let verifiedUser = { ...pendingMfaUser };
    let destination = pendingMfaUser.role === 'Admin' ? '/admin' : '/dashboard';

    try {
      const res = await apiClient.post('/auth/verify-otp', { email: pendingMfaUser.email, otp });
      if (res && res.token) {
        localStorage.setItem('fixmycity_token', res.token);
      }
      if (res && res.user) {
        verifiedUser = {
          ...verifiedUser,
          ...res.user,
          initials: (res.user.name || "User").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        };
      }
      if (res && res.destination) {
        destination = res.destination;
      }
    } catch (e) {
      if (import.meta.env.VITE_OFFLINE_MODE === 'true' || localStorage.getItem('fixmycity_dev_offline_mode') === 'true') {
        console.warn('Using offline MFA verification');
      } else {
        return { success: false, message: e.message || "Invalid or expired OTP code" };
      }
    }

    setCurrentUser(verifiedUser);
    setPendingMfaUser(null);
    return { success: true, destination };
  };

  const registerCitizen = async ({ name, email, phone, password, ward }) => {
    let newUser = {
      id: `usr-${Date.now()}`,
      name: name || "New Citizen",
      email,
      phone: phone || "+91 98220 00000",
      role: "Citizen",
      ward: ward || "Ward 12",
      initials: (name || "NC").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      avatarBg: "bg-navy-800 text-white"
    };

    try {
      const res = await apiClient.post('/auth/register', { name, email, phone, password, ward });
      if (res && res.user) {
        newUser = {
          ...newUser,
          ...res.user,
          demoOtp: res.demoOtp
        };
      }
    } catch (e) {
      if (import.meta.env.VITE_OFFLINE_MODE === 'true' || localStorage.getItem('fixmycity_dev_offline_mode') === 'true') {
        console.warn('Using offline registration');
      } else {
        throw e;
      }
    }

    setPendingMfaUser(newUser);
    return { success: true, requireMfa: true, user: newUser };
  };

  const switchRole = async (newRole) => {
    if (newRole === 'Admin') {
      setCurrentUser(ADMIN_USER);
    } else {
      setCurrentUser(CITIZEN_USER);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setPendingMfaUser(null);
    localStorage.removeItem('fixmycity_token');
    localStorage.removeItem('fixmycity_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        pendingMfaUser,
        initiateLogin,
        verifyMfaOtp,
        registerCitizen,
        switchRole,
        logout,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'Admin',
        isCitizen: currentUser?.role === 'Citizen'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
