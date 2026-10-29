import React, { useState } from 'react';
import {
  ShieldAlert, UserCheck, CheckCircle2, Clock, Award,
  Filter, Search, AlertTriangle, ArrowUpRight, Phone,
  Layers, Users, CheckSquare, PlusCircle
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { StatusPill } from '../components/common/StatusPill';
import { AssignOfficerModal } from '../components/admin/AssignOfficerModal';
import { UpdateStatusModal } from '../components/admin/UpdateStatusModal';
import { CompensationModal } from '../components/admin/CompensationModal';
import { useCivic } from '../context/CivicContext';

export const AdminDashboard = () => {
  const { complaints, officers, stats } = useCivic();

  const [activeTab, setActiveTab] = useState('pending'); // 'all' | 'pending' | 'breached' | 'officers'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCompensationOpen, setIsCompensationOpen] = useState(false);

  // Filter complaints
  const filteredQueue = complaints.filter(c => {
    const matchesSearch = !searchTerm.trim() ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ward.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'pending') return c.status === 'Pending' || c.status === 'In Progress';
    if (activeTab === 'breached') return c.isBreached || !c.assignedOfficer;
    return true;
  });

  const handleOpenAssign = (complaint) => {
    setSelectedComplaint(complaint);
    setIsAssignOpen(true);
  };

  const handleOpenStatus = (complaint) => {
    setSelectedComplaint(complaint);
    setIsStatusOpen(true);
  };

  const handleOpenCompensation = (complaint) => {
    setSelectedComplaint(complaint);
    setIsCompensationOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Title + Subtitle + + Assign Officer button top-right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              CENTRAL COMMAND
            </span>
            <span className="text-xs text-gray-400">• Command Center v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage civic complaints, field officer assignments, and statutory delay compensations
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const firstPending = complaints.find(c => c.status === 'Pending') || complaints[0];
            handleOpenAssign(firstPending);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>+ Assign Officer</span>
        </button>
      </div>

      {/* 3 Stat Cards: Total Complaints 12,450, Resolved 9,820, Pending 2,630 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={Layers}
          label="Total Complaints"
          value={stats.total.toLocaleString()}
          subtext="Central citywide grievance database"
          iconBg="bg-blue-50 text-navy-800"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved"
          value={stats.resolved.toLocaleString()}
          subtext="Closed with verified photo audit"
          iconBg="bg-green-50 text-green-700"
          valueColor="text-green-700"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={stats.pending.toLocaleString()}
          subtext="Awaiting officer triage or dispatch"
          iconBg="bg-amber-50 text-amber-700"
          valueColor="text-amber-600"
        />
      </div>

      {/* Pending Complaints Queue Card */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card overflow-hidden">
        {/* Header & Tabs */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pending Complaints Queue</h2>
            <p className="text-xs text-gray-500">Live triage desk: assign officers, update workflow milestones, or issue SLA compensations</p>
          </div>

          {/* Search within queue */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by ID, ward or issue..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>
        </div>

        {/* Filter sub-tabs */}
        <div className="px-6 py-2 bg-gray-50/80 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'pending'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending & In-Progress ({complaints.filter(c => c.status !== 'Resolved').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('breached')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'breached'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-red-700 hover:bg-red-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SLA At Risk / Breached</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-navy-800 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Tickets ({complaints.length})
          </button>
        </div>

        {/* Table / Rows */}
        <div className="divide-y divide-gray-100">
          {filteredQueue.map((c) => (
            <div
              key={c.id}
              className="p-5 hover:bg-gray-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Complaint Summary */}
              <div className="min-w-0 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-navy-800 bg-navy-50 px-2 py-0.5 rounded">
                    #{c.id}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{c.category}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-medium text-gray-600">{c.ward}</span>
                  {c.isBreached && (
                    <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      SLA Breached
                    </span>
                  )}
                  {c.compensationCredited && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Compensated {c.compensationCredited.amount}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                  {c.title}
                </h4>

                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                  <span>Reported {c.reportedAt} by {c.citizenName}</span>
                  <span>•</span>
                  <span>
                    Officer: <strong>{c.assignedOfficer ? c.assignedOfficer.name : "Unassigned"}</strong>
                  </span>
                  <span>•</span>
                  <span className="text-amber-700 font-medium">Target: {c.slaDeadline || "48h"}</span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <StatusPill status={c.status} />

                {/* Assign Officer button */}
                <button
                  type="button"
                  onClick={() => handleOpenAssign(c)}
                  className="px-3 py-1.5 bg-navy-50 hover:bg-navy-100 text-navy-800 border border-navy-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  title="Assign or reassign field officer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-navy-800" />
                  <span>Assign Officer</span>
                </button>

                {/* Update Status button */}
                <button
                  type="button"
                  onClick={() => handleOpenStatus(c)}
                  className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  title="Change status or mark resolved"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-gray-500" />
                  <span>Update</span>
                </button>

                {/* Trigger Compensation button */}
                <button
                  type="button"
                  onClick={() => handleOpenCompensation(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 border ${
                    c.compensationCredited
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                  }`}
                  title="Award statutory civic compensation for delay"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{c.compensationCredited ? 'Compensated' : 'Compensate'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ward Officers Deployment Status Card */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Ward Field Engineers Directory</h3>
              <p className="text-xs text-gray-500">Live operational capacity and active dispatch caseloads</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
            {officers.length} Active Officers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {officers.map((off) => (
            <div key={off.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">{off.name}</p>
                <p className="text-xs text-gray-500">{off.department}</p>
                <p className="text-[11px] text-gray-400 mt-1">{off.ward} • {off.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-navy-800 bg-white border border-gray-200 px-2.5 py-1 rounded-md block">
                  {off.activeCases} Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AssignOfficerModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        complaint={selectedComplaint}
      />

      <UpdateStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        complaint={selectedComplaint}
      />

      <CompensationModal
        isOpen={isCompensationOpen}
        onClose={() => setIsCompensationOpen(false)}
        complaint={selectedComplaint}
      />
    </div>
  );
};
