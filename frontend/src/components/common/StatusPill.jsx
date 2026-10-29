import React from 'react';

export const StatusPill = ({ status, className = "" }) => {
  const normalized = (status || "").toLowerCase().trim();

  if (normalized === 'pending') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        Pending
      </span>
    );
  }

  if (normalized === 'in progress' || normalized === 'in-progress') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        In Progress
      </span>
    );
  }

  if (normalized === 'resolved') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200/80 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
        Resolved
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>
      {status}
    </span>
  );
};
