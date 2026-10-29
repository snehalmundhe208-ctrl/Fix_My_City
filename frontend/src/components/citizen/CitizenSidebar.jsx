import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Gift, Settings, ShieldCheck, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCivic } from '../../context/CivicContext';

export const CitizenSidebar = () => {
  const { currentUser } = useAuth();
  const { rewardPoints } = useCivic();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Complaints", path: "/dashboard/complaints", icon: FileText },
    { name: "Rewards", path: "/rewards", icon: Gift, badge: `${rewardPoints} pts` },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card p-6 flex flex-col space-y-6">
      {/* Profile Header */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
          CITIZEN PROFILE
        </p>
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-navy-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {currentUser?.initials || "AS"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900 text-base truncate">
                {currentUser?.name || "Amit Sharma"}
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Citizen" />
            </div>
            <p className="text-xs text-gray-500 truncate">
              {currentUser?.email || "amit.sharma@example.com"}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{currentUser?.ward || "Ward 12"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="space-y-1.5 pt-2 border-t border-gray-100">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-navy-800 font-semibold'
                    : 'text-gray-600 hover:text-navy-800 hover:bg-gray-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-gray-500" />
                <span>{link.name}</span>
              </div>
              {link.badge && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick civic status */}
      <div className="bg-navy-50/70 border border-navy-100 rounded-xl p-3.5 text-xs text-navy-900 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Civic Score</span>
          <span className="font-bold text-emerald-600">Level 3 (Gold)</span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-1.5 rounded-full w-3/4"></div>
        </div>
        <p className="text-[10px] text-gray-500 pt-1">
          75 pts to Level 4 Civic Champion
        </p>
      </div>
    </div>
  );
};
