import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Home, Briefcase, AlertCircle, Users, Info, Phone,
  PlusCircle, Search, User, LogOut, Menu, X, ShieldAlert, Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Header = () => {
  const { currentUser, isAuthenticated, isAdmin, isCitizen, logout, switchRole } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = location.pathname === '/';

  const navItems = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('services'), path: '/services', icon: Briefcase },
    { name: t('complaints'), path: '/community', icon: AlertCircle },
    { name: t('community'), path: '/community', icon: Users },
    { name: t('aboutUs'), path: '/about', icon: Info },
    { name: t('contact'), path: '/contact', icon: Phone }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Tile + Title */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-md group-hover:bg-navy-900 transition-colors">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-navy-800">
                  FixMyCity
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  CIVIC 2.0
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium tracking-normal -mt-0.5">
                {t('subtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Pills with Icons */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive && (item.path !== '/' || location.pathname === '/')
                        ? 'bg-navy-50 text-navy-800 font-semibold'
                        : 'text-gray-600 hover:text-navy-800 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-navy-800" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick action buttons */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('reportIssue')}</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                {/* Role indicator badge */}
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                  isAdmin ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-navy-800 border-blue-200'
                }`}>
                  {currentUser.role}
                </span>

                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Go to Dashboard"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isAdmin ? 'bg-purple-700 text-white' : 'bg-navy-800 text-white'
                  }`}>
                    {currentUser.initials || "AS"}
                  </div>
                </Link>

                {/* Role Switcher Demo button */}
                <button
                  type="button"
                  onClick={() => switchRole(isAdmin ? 'Citizen' : 'Admin')}
                  className="text-[11px] font-medium text-gray-500 hover:text-navy-800 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-200"
                  title="Switch Role for Testing"
                >
                  Switch to {isAdmin ? 'Citizen' : 'Admin'}
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/track"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t('trackComplaint')}</span>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white transition-all shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>{t('login')}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-navy-50 text-navy-800 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-4 h-4 text-gray-400" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-500 text-white font-semibold text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('reportIssue')}</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-navy-800 text-white font-semibold text-sm"
                >
                  <span>Dashboard ({currentUser.role})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    switchRole(isAdmin ? 'Citizen' : 'Admin');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-xs text-navy-800 font-semibold bg-gray-100 rounded-lg"
                >
                  Switch Role to {isAdmin ? 'Citizen' : 'Admin'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-xs text-red-600 font-semibold"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-navy-800 text-navy-800 font-semibold text-sm"
              >
                <User className="w-4 h-4" />
                <span>{t('login')}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
