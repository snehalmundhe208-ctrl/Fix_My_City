import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const UpdateStatusModal = ({ isOpen, onClose, complaint }) => {
  const { updateComplaintStatus } = useCivic();
  const [newStatus, setNewStatus] = useState(complaint?.status || "In Progress");
  const [resolutionNote, setResolutionNote] = useState("");

  if (!isOpen || !complaint) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    updateComplaintStatus(complaint.id, newStatus, resolutionNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-card max-w-md w-full p-6 shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-navy-800 text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Update Complaint Status</h3>
              <p className="text-xs text-gray-500">Ticket #{complaint.id}</p>
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

        <form onSubmit={handleUpdate} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Select New Stage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Pending", value: "Pending", color: "border-amber-200 text-amber-700 bg-amber-50" },
                { label: "In Progress", value: "In Progress", color: "border-emerald-200 text-emerald-700 bg-emerald-50" },
                { label: "Resolved", value: "Resolved", color: "border-green-300 text-green-800 bg-green-50" }
              ].map(statusOpt => (
                <button
                  key={statusOpt.value}
                  type="button"
                  onClick={() => setNewStatus(statusOpt.value)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                    newStatus === statusOpt.value
                      ? `${statusOpt.color} ring-2 ring-navy-800 ring-offset-1`
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {statusOpt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Resolution / Status Notes
            </label>
            <textarea
              rows={3}
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="e.g. Work completed by crew #4. Road surface restored and inspected with ward engineer."
              className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-800 focus:border-transparent"
              required
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
              Save Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
