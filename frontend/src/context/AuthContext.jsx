import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const initiateLogin = (email, password, role = 'Citizen') => {
    let targetUser;
    if (role === 'Admin' || email.toLowerCase().includes('admin')) {
      targetUser = { ...ADMIN_USER, email: email || ADMIN_USER.email };
    } else {
      targetUser = { ...CITIZEN_USER, email: email || CITIZEN_USER.email };
    }
    setPendingMfaUser(targetUser);
    return { success: true, requireMfa: true };
  };

  const verifyMfaOtp = (otp) => {
    if (pendingMfaUser) {
      setCurrentUser(pendingMfaUser);
      const destination = pendingMfaUser.role === 'Admin' ? '/admin' : '/dashboard';
      setPendingMfaUser(null);
      return { success: true, destination };
    }
    return { success: false, message: "Invalid session or OTP" };
  };

  const registerCitizen = ({ name, email, phone, password }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || "New Citizen",
      email,
      phone: phone || "+91 98000 00000",
      role: "Citizen",
      ward: "Ward 12",
      initials: (name || "NC").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      avatarBg: "bg-navy-800 text-white"
    };
    setPendingMfaUser(newUser);
    return { success: true, requireMfa: true };
  };

  const switchRole = (newRole) => {
    if (newRole === 'Admin') {
      setCurrentUser(ADMIN_USER);
    } else {
      setCurrentUser(CITIZEN_USER);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setPendingMfaUser(null);
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
