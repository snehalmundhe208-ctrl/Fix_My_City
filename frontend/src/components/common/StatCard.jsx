import React from 'react';

export const StatCard = ({ icon: Icon, label, value, subtext, iconBg = "bg-navy-50 text-navy-800", valueColor = "text-gray-900" }) => {
  return (
    <div className="bg-white rounded-card border border-gray-200/90 p-5 shadow-card hover:shadow-cardHover transition-shadow flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
        <p className={`text-3xl font-bold tracking-tight ${valueColor}`}>{value}</p>
        {subtext && (
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">{subtext}</p>
        )}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
