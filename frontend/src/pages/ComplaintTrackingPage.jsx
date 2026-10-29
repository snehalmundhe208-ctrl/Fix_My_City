import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, RefreshCw, UserCheck, Phone, MapPin, Calendar,
  ShieldCheck, AlertTriangle, Award, CheckCircle2, FileText,
  Clock, Truck, ChevronRight
} from 'lucide-react';
import { Timeline } from '../components/common/Timeline';
import { StatusPill } from '../components/common/StatusPill';
import { getCategoryIcon } from '../components/common/ComplaintRow';
import { useCivic } from '../context/CivicContext';

export const ComplaintTrackingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { complaints } = useCivic();
  
  const queryId = searchParams.get('id') || 'CM-8921';
  const isNew = searchParams.get('new') === 'true';

  const [inputTicketId, setInputTicketId] = useState(queryId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const activeComplaint = complaints.find(c => c.id.toLowerCase() === queryId.toLowerCase()) || complaints[0];
  const CategoryIcon = getCategoryIcon(activeComplaint?.category);

  const handleSearchTicket = (e) => {
    e.preventDefault();
    if (!inputTicketId.trim()) return;
    setSearchParams({ id: inputTicketId.trim().toUpperCase() });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Search / Lookup banner */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Track Civic Grievance</h2>
          <p className="text-xs text-gray-500">Enter ticket ID to inspect stage-by-stage municipal action</p>
        </div>

        <form onSubmit={handleSearchTicket} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputTicketId}
              onChange={(e) => setInputTicketId(e.target.value)}
              placeholder="e.g. CM-8921"
              className="w-full text-xs font-semibold pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shrink-0"
          >
            Track
          </button>
        </form>
      </div>

      {isNew && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-900">Complaint #{activeComplaint.id} registered successfully!</p>
              <p className="text-xs text-emerald-700">You earned +15 civic reward points. A tracking SMS has been sent.</p>
            </div>
          </div>
          <Link to="/rewards" className="text-xs font-bold text-emerald-800 underline">
            View Rewards
          </Link>
        </div>
      )}

      {/* Main Grid: Left Card COMPLAINT DETAILS (~4 cols), Right TIMELINE (~8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: COMPLAINT DETAILS */}
        <div className="lg:col-span-4 bg-white rounded-card border border-gray-200/90 shadow-card p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                COMPLAINT DETAILS
              </span>
              <span className="text-xs font-bold text-navy-800 bg-navy-50 px-2.5 py-1 rounded-md border border-navy-100">
                #{activeComplaint.id}
              </span>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center shrink-0 border border-navy-100">
                <CategoryIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  {activeComplaint.title}
                </h3>
                <span className="text-xs text-gray-500 font-medium">{activeComplaint.category}</span>
              </div>
            </div>
          </div>

          {/* Details Table Rows */}
          <div className="space-y-3 pt-3 border-t border-gray-100 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Status</span>
              <StatusPill status={activeComplaint.status} />
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Department</span>
              <span className="font-semibold text-gray-900 text-right">{activeComplaint.department}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Reported On</span>
              <span className="font-semibold text-gray-900">{activeComplaint.reportedDate || activeComplaint.reportedAt}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Ward Jurisdiction</span>
              <span className="font-semibold text-gray-900">{activeComplaint.ward}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium">SLA Resolution Target</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {activeComplaint.slaDeadline || "Within 48 Hours"}
              </span>
            </div>
          </div>

          {/* Assigned Officer Tile */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              Assigned Field Officer
            </span>
            {activeComplaint.assignedOfficer ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900">{activeComplaint.assignedOfficer.name}</p>
                  <p className="text-xs text-gray-500">{activeComplaint.assignedOfficer.designation}</p>
                </div>
                <a
                  href={`tel:${activeComplaint.assignedOfficer.phone}`}
                  className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center hover:bg-navy-700 transition-colors shadow-sm"
                  title="Call Officer"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Officer assignment pending triage queue.</p>
            )}
          </div>

          {/* SLA Breach or Compensation status */}
          {activeComplaint.compensationCredited ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Statutory Civic Compensation Credited</span>
              </div>
              <p className="text-xs text-emerald-900">
                <strong>{activeComplaint.compensationCredited.amount}</strong> via {activeComplaint.compensationCredited.type}
              </p>
              <p className="text-[11px] text-emerald-700">
                Reason: {activeComplaint.compensationCredited.reason}
              </p>
            </div>
          ) : activeComplaint.isBreached ? (
            <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Turnaround SLA Exceeded</p>
                <p className="text-[11px] text-red-700">Eligible for citizen service delay compensation under municipal charter.</p>
              </div>
            </div>
          ) : null}

          {/* Evidence photo if any */}
          {activeComplaint.imageUrl && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Attached Photo Proof
              </span>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-36 bg-gray-100">
                <img src={activeComplaint.imageUrl} alt="Proof" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Right Main Panel: Title + Refresh Button + TIMELINE + Recent Updates */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Complaint Tracking
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Live verification audit trail from registration to on-site clearance
                </p>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-sm transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-navy-800 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Status</span>
              </button>
            </div>

            {/* Vertical Timeline with Green Check Circles */}
            <div className="py-2">
              <Timeline items={activeComplaint.timeline || []} />
            </div>

            {/* Satisfaction Rating / Citizen Sign-off */}
            <div className="mt-8 pt-6 border-t border-gray-100 bg-gray-50/70 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-gray-900">Are you satisfied with this update?</p>
                <p className="text-[11px] text-gray-500">Provide feedback to help rate the assigned ward team</p>
              </div>
              {feedbackGiven ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for your rating!</span>
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedbackGiven(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    👍 Satisfied
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackGiven(true)}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    👎 Needs Attention
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Below: Recent Updates list */}
          <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-6">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">
              Recent Updates & Field Logs
            </h3>

            <div className="space-y-3">
              {(activeComplaint.updates || []).map((up, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/70 border border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-navy-100 text-navy-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{up.title}</p>
                    <span className="text-xs text-gray-400 shrink-0">{up.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
