import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusPill } from './StatusPill';
import { Trash2, Truck, Waves, Lightbulb, Droplets, AlertCircle, ThumbsUp, MessageSquare, ChevronRight, MapPin } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const getCategoryIcon = (category) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes('garbage')) return Trash2;
  if (cat.includes('road')) return Truck;
  if (cat.includes('drain')) return Waves;
  if (cat.includes('light')) return Lightbulb;
  if (cat.includes('water')) return Droplets;
  return AlertCircle;
};

export const getCategoryColor = (category) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes('garbage')) return 'bg-orange-50 text-orange-600 border-orange-100';
  if (cat.includes('road')) return 'bg-amber-50 text-amber-700 border-amber-100';
  if (cat.includes('drain')) return 'bg-blue-50 text-blue-600 border-blue-100';
  if (cat.includes('light')) return 'bg-yellow-50 text-yellow-700 border-yellow-100';
  if (cat.includes('water')) return 'bg-cyan-50 text-cyan-700 border-cyan-100';
  return 'bg-gray-50 text-gray-700 border-gray-100';
};

export const ComplaintRow = ({ complaint, showActions = true, onSelect }) => {
  const navigate = useNavigate();
  const { toggleUpvote } = useCivic();
  const Icon = getCategoryIcon(complaint.category);
  const colorClass = getCategoryColor(complaint.category);

  const handleClick = () => {
    if (onSelect) {
      onSelect(complaint);
    } else {
      navigate(`/track?id=${complaint.id}`);
    }
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    toggleUpvote(complaint.id);
  };

  return (
    <div
      onClick={handleClick}
      className="group p-4 sm:p-5 hover:bg-gray-50/80 transition-all border-b border-gray-100 last:border-b-0 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex items-start gap-3.5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-navy-800 bg-navy-50 px-2 py-0.5 rounded">
              #{complaint.id}
            </span>
            <span className="text-xs font-medium text-gray-500">
              {complaint.category}
            </span>
            {complaint.isBreached && (
              <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                SLA Breached
              </span>
            )}
            {complaint.compensationCredited && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Compensated {complaint.compensationCredited.amount}
              </span>
            )}
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-navy-800 transition-colors mt-1 line-clamp-1">
            {complaint.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {complaint.ward}
            </span>
            <span>•</span>
            <span>{complaint.reportedAt || "Recently"}</span>
            {complaint.assignedOfficer && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-gray-600">Officer: {complaint.assignedOfficer.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <StatusPill status={complaint.status} />

        {showActions && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUpvote}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                complaint.hasUpvoted
                  ? 'bg-navy-50 text-navy-800 border-navy-200 font-semibold'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
              title="Upvote this complaint"
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${complaint.hasUpvoted ? 'text-navy-800 fill-navy-800' : ''}`} />
              <span>{complaint.upvotes || 0}</span>
            </button>

            <span className="flex items-center gap-1 text-xs text-gray-500 px-2 py-1">
              <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
              <span>{complaint.commentsCount || (complaint.comments ? complaint.comments.length : 0)}</span>
            </span>

            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-navy-800 group-hover:translate-x-0.5 transition-all" />
          </div>
        )}
      </div>
    </div>
  );
};
