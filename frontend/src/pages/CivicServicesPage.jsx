import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Truck, Waves, Lightbulb, Droplets, ArrowRight, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/mockData';

export const CivicServicesPage = () => {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'garbage': return Trash2;
      case 'roads': return Truck;
      case 'drainage': return Waves;
      case 'streetlights': return Lightbulb;
      case 'water': return Droplets;
      default: return FileCheck;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-50 text-navy-800 border border-navy-200">
            MUNICIPAL SERVICES
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Civic Services Directory
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Explore public grievance redressal categories, statutory resolution deadlines, and direct reporting channels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          return (
            <div
              key={cat.id}
              className="bg-white rounded-card border border-gray-200/90 shadow-card p-6 flex flex-col justify-between hover:shadow-cardHover transition-shadow"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {cat.slaHours}h SLA
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Inspection target: within 4 hours</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Compensation eligible if breached</span>
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={`/report?cat=${cat.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Report {cat.name} Issue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
