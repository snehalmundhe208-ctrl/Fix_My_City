import React, { useState } from 'react';
import { X, UserCheck, Shield, Phone, Briefcase } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const AssignOfficerModal = ({ isOpen, onClose, complaint }) => {
  const { officers, assignOfficerToComplaint } = useCivic();
  const [selectedOfficerId, setSelectedOfficerId] = useState(officers[0]?.id || "");
  const [instructions, setInstructions] = useState("");

  if (!isOpen || !complaint) return null;

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedOfficerId) return;
    assignOfficerToComplaint(complaint.id, selectedOfficerId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-card max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-navy-800 text-white flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Assign Field Officer</h3>
              <p className="text-xs text-gray-500">Complaint #{complaint.id} • {complaint.category}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAssign} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Select Qualified Ward Officer
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {officers.map((officer) => (
                <label
                  key={officer.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedOfficerId === officer.id
                      ? 'border-navy-800 bg-navy-50/70 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="officer"
                      value={officer.id}
                      checked={selectedOfficerId === officer.id}
                      onChange={() => setSelectedOfficerId(officer.id)}
                      className="text-navy-800 focus:ring-navy-800 h-4 w-4"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{officer.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span>{officer.department}</span>
                        <span>•</span>
                        <span>{officer.ward}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                      {officer.activeCases} active cases
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Specific Dispatch Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Bring heavy patching machinery, coordinate with ward traffic inspector..."
              className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-800 focus:border-transparent"
            />
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
