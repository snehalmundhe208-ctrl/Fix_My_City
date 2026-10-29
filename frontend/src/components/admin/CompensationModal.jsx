import React, { useState } from 'react';
import { X, Award, AlertCircle, DollarSign, Fuel, ShoppingBag } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const CompensationModal = ({ isOpen, onClose, complaint }) => {
  const { triggerCompensation } = useCivic();
  const [amount, setAmount] = useState("₹250");
  const [compensationType, setCompensationType] = useState("Cash DBT Bank Transfer");
  const [reason, setReason] = useState("Statutory SLA turnaround time (48h) exceeded for hazardous civic issue.");

  if (!isOpen || !complaint) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerCompensation(complaint.id, {
      amount,
      type: compensationType,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-card max-w-md w-full p-6 shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Issue SLA Compensation</h3>
              <p className="text-xs text-gray-500">Citizen Guarantee Protection • #{complaint.id}</p>
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Under the FixMyCity Citizen Charter, municipal service delays entitle the reporting citizen to statutory civic compensation.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Compensation Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Cash DBT", value: "Cash DBT Bank Transfer", icon: DollarSign },
                { label: "Fuel Discount", value: "Petrol/Diesel Fuel Voucher", icon: Fuel },
                { label: "Ration Subsidies", value: "Community Ration Credit", icon: ShoppingBag }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setCompensationType(item.value)}
                    className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                      compensationType === item.value
                        ? 'border-navy-800 bg-navy-50 text-navy-900 ring-1 ring-navy-800'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Compensation Amount / Credit Value
            </label>
            <div className="flex gap-2">
              {["₹150", "₹250", "₹500"].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    amount === val ? 'bg-navy-800 text-white border-navy-800' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Official Justification / Audit Reason
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-navy-800 focus:border-transparent"
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
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-sm transition-colors"
            >
              Approve & Credit Compensation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
