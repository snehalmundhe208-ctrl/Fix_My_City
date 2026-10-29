import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, PlusCircle, AlertCircle, CheckCircle2, Award,
  Clock, ArrowUpRight, ChevronRight, Activity, Filter, RefreshCw
} from 'lucide-react';
import { CitizenSidebar } from '../components/citizen/CitizenSidebar';
import { StatCard } from '../components/common/StatCard';
import { ComplaintRow } from '../components/common/ComplaintRow';
import { useCivic } from '../context/CivicContext';
import { useAuth } from '../context/AuthContext';

export const CitizenDashboard = () => {
  const { complaints, rewardPoints, recentActivities, stats } = useCivic();
  const { currentUser } = useAuth();
  const [filterMonth, setFilterMonth] = useState('October 2026');

  // Filter complaints reported by citizen or relevant to citizen
  const citizenComplaints = complaints.filter(
    c => c.citizenEmail === "amit.sharma@example.com" || c.id === "CM-8921" || c.id === "CM-8920" || c.id === "CM-8910" || c.id === "CM-8890"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Card: CITIZEN PROFILE (~4 cols) */}
        <div className="lg:col-span-4">
          <CitizenSidebar />
        </div>

        {/* Right Main Content (~8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Citizen Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Monitor your reported civic issues, neighborhood updates, and civic rewards
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => alert(`Showing data for ${filterMonth}`)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>This Month</span>
              </button>

              <Link
                to="/report"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Report Issue</span>
              </Link>
            </div>
          </div>

          {/* 3 Stat Cards: Active Complaints 3, Resolved 12, Reward Points 450 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Clock}
              label="Active Complaints"
              value="3"
              subtext="Under active field investigation"
              iconBg="bg-amber-50 text-amber-600"
              valueColor="text-amber-600"
            />
            <StatCard
              icon={CheckCircle2}
              label="Resolved"
              value="12"
              subtext="Verified by citizen signature"
              iconBg="bg-green-50 text-green-700"
              valueColor="text-green-700"
            />
            <StatCard
              icon={Award}
              label="Reward Points"
              value={rewardPoints.toString()}
              subtext="Redeemable for transit passes"
              iconBg="bg-amber-50 text-amber-500"
              valueColor="text-amber-500"
            />
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-card border border-gray-200 shadow-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
              </div>
              <span className="text-xs text-gray-400">Real-time log</span>
            </div>

            <div className="divide-y divide-gray-100">
              {recentActivities.map((act) => (
                <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-50 text-navy-800 flex items-center justify-center shrink-0 border border-navy-100">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {act.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {act.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 shrink-0">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Complaints Summary List */}
          <div className="bg-white rounded-card border border-gray-200 shadow-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-2">
              <div>
                <h3 className="text-base font-bold text-gray-900">My Reported Issues</h3>
                <p className="text-xs text-gray-500">Tickets created under your verified citizen profile</p>
              </div>
              <Link to="/community" className="text-xs font-bold text-navy-800 hover:underline">
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-100 -mx-6">
              {citizenComplaints.slice(0, 3).map((complaint) => (
                <ComplaintRow key={complaint.id} complaint={complaint} />
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">Need immediate field assistance?</span>
              <Link to="/track?id=CM-8921" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                <span>Open Active Ticket #CM-8921</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
