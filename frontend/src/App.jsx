import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackendOfflineBanner } from './components/common/BackendOfflineBanner';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MfaPage } from './pages/MfaPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { ComplaintTrackingPage } from './pages/ComplaintTrackingPage';
import { CommunityComplaintsPage } from './pages/CommunityComplaintsPage';
import { CitizenRewardsPage } from './pages/CitizenRewardsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CivicServicesPage } from './pages/CivicServicesPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';

import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] text-gray-900 font-sans selection:bg-amber-100 selection:text-navy-900">
      {/* Real backend connectivity warning banner */}
      <BackendOfflineBanner />

      {/* 1. Top Utility Bar */}
      <TopBar />

      {/* 2. Global Header */}
      <Header />

      {/* 3. Main Content Container */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mfa" element={<MfaPage />} />
          
          {/* Citizen Routes */}
          <Route path="/dashboard" element={<CitizenDashboard />} />
          <Route path="/dashboard/complaints" element={<CommunityComplaintsPage />} />
          <Route path="/dashboard/settings" element={<CitizenDashboard />} />
          
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/track" element={<ComplaintTrackingPage />} />
          <Route path="/community" element={<CommunityComplaintsPage />} />
          <Route path="/rewards" element={<CitizenRewardsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Directory & Info Routes */}
          <Route path="/services" element={<CivicServicesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Global Navy Footer */}
      <Footer />
    </div>
  );
}

export default App;
