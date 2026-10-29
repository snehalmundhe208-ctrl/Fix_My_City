import React from 'react';
import { CheckCircle2, Clock, CircleDot, AlertCircle, Check } from 'lucide-react';

export const Timeline = ({ items = [] }) => {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
      {items.map((item, index) => {
        const isCompleted = item.status === 'completed';
        const isCurrent = item.status === 'current';
        const isPending = item.status === 'pending';

        return (
          <div key={index} className="relative flex items-start group">
            {/* Dot indicator */}
            <div className="absolute -left-6 sm:-left-8 flex items-center justify-center">
              {isCompleted ? (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              ) : isCurrent ? (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-amber-100 shadow-sm animate-pulse">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-400 flex items-center justify-center">
                  <CircleDot className="w-3 h-3 text-gray-300" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 ml-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h5 className={`text-sm sm:text-base font-semibold ${
                  isCurrent ? 'text-amber-800' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {item.step}
                  {isCurrent && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-800">
                      Current Stage
                    </span>
                  )}
                </h5>
                <span className="text-xs font-medium text-gray-500 shrink-0">
                  {item.time}
                </span>
              </div>
              {item.desc && (
                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                  isPending ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
