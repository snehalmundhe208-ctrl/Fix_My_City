import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, PhoneCall, ShieldCheck, Heart, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-800 text-gray-300 pt-12 pb-8 border-t border-navy-700/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-navy-700/60">
          {/* Col 1 & 2: Brand & Platform Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-700 text-white flex items-center justify-center border border-navy-600">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  FixMyCity
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Citizen Civic Services & Redressal Platform
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pr-4">
              FixMyCity empowers residents to directly report municipal bottlenecks, monitor real-time maintenance timelines, collaborate on neighborhood improvements, and receive civic service guarantees.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Civic Community Platform — Public Participation Model</span>
            </div>
          </div>

          {/* Col 3: Quick Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Civic Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/report?cat=garbage" className="hover:text-emerald-400 transition-colors">Garbage & Waste Disposal</Link></li>
              <li><Link to="/report?cat=roads" className="hover:text-emerald-400 transition-colors">Pothole & Road Repair</Link></li>
              <li><Link to="/report?cat=drainage" className="hover:text-emerald-400 transition-colors">Stormwater Drainage Clearing</Link></li>
              <li><Link to="/report?cat=streetlights" className="hover:text-emerald-400 transition-colors">Streetlight Restoration</Link></li>
              <li><Link to="/report?cat=water" className="hover:text-emerald-400 transition-colors">Water Supply Grievances</Link></li>
            </ul>
          </div>

          {/* Col 4: Citizen Portal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Citizen Portal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/track" className="hover:text-emerald-400 transition-colors">Track Complaint Status</Link></li>
              <li><Link to="/community" className="hover:text-emerald-400 transition-colors">Ward Discussions & Polls</Link></li>
              <li><Link to="/rewards" className="hover:text-emerald-400 transition-colors">Rewards & Bus Passes</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Citizen Profile & History</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-400 transition-colors">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* Col 5: Help & Emergency Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              24x7 Helplines
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block text-sm">1800-120-2255</span>
                  <span className="text-[11px] text-gray-400">Toll-free Civic Grievance Line</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-200 block font-medium">help@fixmycity.org</span>
                  <span className="text-[11px] text-gray-400">Escalation Desk</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-gray-400 leading-normal">
                  Central Citizen Services Center, Civic Square
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 FixMyCity Platform. Designed for modern civic governance and transparent community participation.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-gray-400 transition-colors">Citizen Charter</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-400 transition-colors">SLA Guarantee</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Ward Directory</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
