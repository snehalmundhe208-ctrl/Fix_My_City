import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Civic Grievance & Ward Helplines
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Reach our 24x7 central grievance desk or contact your local municipal ward officer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact details */}
        <div className="space-y-4">
          <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Direct Channels</h3>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">24x7 Toll Free Helpline</p>
                <p className="text-sm font-bold text-emerald-600">1800-120-2255</p>
                <p className="text-[11px] text-gray-500">Accessible from all cellular operators nationwide</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Email Escalation Desk</p>
                <p className="text-sm font-bold text-navy-800">help@fixmycity.org</p>
                <p className="text-[11px] text-gray-500">4-hour email response turnaround</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Central Citizen Redressal Center</p>
                <p className="text-xs text-gray-600">Civic Command Center, 4th Floor, Municipal Plaza</p>
                <p className="text-[11px] text-gray-500">Monday to Saturday: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="bg-white rounded-card border border-gray-200 p-6 shadow-card">
          <h3 className="font-bold text-gray-900 text-base mb-1">Send Citizen Inquiry</h3>
          <p className="text-xs text-gray-500 mb-4">Have questions regarding policies, ward boundaries, or compensations?</p>

          {submitted ? (
            <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-sm font-bold text-emerald-900">Inquiry Dispatched Successfully!</p>
              <p className="text-xs text-emerald-700">A civic coordinator will respond to your email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit Sharma"
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email or Phone</label>
                <input
                  type="text"
                  required
                  placeholder="name@example.com or mobile"
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject / Question</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry or feedback..."
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
