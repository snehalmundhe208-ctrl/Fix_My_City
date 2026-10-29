import React from 'react';
import { Building2, ShieldCheck, Award, Heart, CheckCircle2, Users } from 'lucide-react';

export const AboutUsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Citizen Civic Charter
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
          About FixMyCity Platform
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
          FixMyCity is a civic community platform designed to eliminate friction between residents and municipal field operations through transparent tracking and guaranteed redressal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-1">Direct Field Triage</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Eliminates traditional bureaucratic gatekeeping. Complaints are automatically geo-routed directly to the designated Ward Junior Engineer.
          </p>
        </div>

        <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-1">Service Delay Compensation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every category has a binding SLA (12 to 48 hours). When an issue is delayed, our system credits direct civic compensation to the citizen.
          </p>
        </div>

        <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-1">Incentivized Stewardship</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Citizens earn verified civic points redeemable for public transit passes, community grocery discounts, and tree plantations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-gray-200 p-8 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Standard Turnaround Commitments (SLAs)</h2>
        <div className="divide-y divide-gray-100 text-xs sm:text-sm">
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Water Pipeline Burst / Contamination</span>
            <span className="font-bold text-emerald-600">12 Hours Guaranteed</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Clogged Stormwater Drain / Sewer Overflow</span>
            <span className="font-bold text-emerald-600">24 Hours Guaranteed</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Commercial / Residential Garbage Dump</span>
            <span className="font-bold text-emerald-600">24 Hours Guaranteed</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-gray-800">Dangerous Road Potholes & Asphalt Defects</span>
            <span className="font-bold text-emerald-600">48 Hours Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
