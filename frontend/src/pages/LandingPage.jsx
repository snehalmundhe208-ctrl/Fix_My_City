import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, PlusCircle, ArrowRight, ShieldCheck, CheckCircle2,
  Clock, AlertCircle, Trash2, Truck, Waves, Lightbulb, Droplets,
  Star, ChevronRight, FileText, Bell, Megaphone, Users, Sparkles
} from 'lucide-react';
import { CityAssistChat } from '../components/common/CityAssistChat';
import { StatCard } from '../components/common/StatCard';
import { StatusPill } from '../components/common/StatusPill';
import { useCivic } from '../context/CivicContext';
import { useLanguage } from '../context/LanguageContext';
import { ANNOUNCEMENTS, TESTIMONIALS, SERVICE_CATEGORIES } from '../data/mockData';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { complaints, stats } = useCivic();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/community?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleQuickChip = (category) => {
    navigate(`/community?category=${encodeURIComponent(category)}`);
  };

  const latestComplaints = complaints.slice(0, 4);

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'garbage': return Trash2;
      case 'roads': return Truck;
      case 'drainage': return Waves;
      case 'streetlights': return Lightbulb;
      case 'water': return Droplets;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* 1. Search Band (navy rounded strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="bg-navy-800 rounded-2xl p-4 sm:p-5 shadow-lg border border-navy-700">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-white text-gray-900 placeholder-gray-400 pl-12 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span>{t('searchButton')}</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pl-2 border-l border-navy-700/80">
                <span className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Quick:
                </span>
                {['Garbage', 'Roads', 'Drainage', 'Water Supply'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleQuickChip(chip)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-navy-700/80 text-gray-200 hover:bg-navy-600 hover:text-white transition-colors border border-navy-600 whitespace-nowrap"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 2. Hero Section: Left ~70% Photo Banner, Right ~30% CityAssist AI Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left ~70% Hero Banner */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-10 shadow-lg border border-gray-200">
            {/* Background Image: Clean, modern city avenue */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=80')`
              }}
            />
            {/* Dark Navy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/80 to-navy-900/40" />

            {/* Content overlay */}
            <div className="relative z-10 space-y-4 max-w-2xl text-white">
              {/* Neutral civic badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('badgeCivicPlatform')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t('welcomeTitle')}
              </h1>

              <p className="text-base sm:text-xl text-gray-200 font-medium leading-relaxed">
                {t('welcomeSubtitle')}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 font-normal">
                {t('welcomeTagline')}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/report"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all hover:translate-y-[-1px]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('reportIssue')}</span>
                </Link>

                <Link
                  to="/track"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white hover:bg-gray-100 text-navy-800 shadow-md transition-all hover:translate-y-[-1px]"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <span>{t('trackComplaint')}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right ~30% Hero Panel: CityAssist AI Assistant Card */}
          <div className="lg:col-span-4 flex flex-col">
            <CityAssistChat />
          </div>
        </div>
      </section>

      {/* 3. 3 Feature Image Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Online Civic Services */}
          <div className="relative rounded-2xl overflow-hidden min-h-[260px] p-6 flex flex-col justify-between group shadow-card border border-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/75 to-navy-900/40" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                MUNICIPAL DIRECTORY
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Online Civic Services</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Access 40+ civic services across road maintenance, garbage disposal schedules, and water pipelines.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-navy-800 text-xs font-bold hover:bg-gray-100 transition-colors shadow"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Report & Track Complaints */}
          <div className="relative rounded-2xl overflow-hidden min-h-[260px] p-6 flex flex-col justify-between group shadow-card border border-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/75 to-navy-900/40" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                TRANSPARENT TRIAGE
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Report & Track Complaints</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Submit complaints with GPS coordinates and photos. Track field officer allocation in real-time.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                to="/report"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-navy-800 text-xs font-bold hover:bg-gray-100 transition-colors shadow"
              >
                <span>Report Issue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Community Participation */}
          <div className="relative rounded-2xl overflow-hidden min-h-[260px] p-6 flex flex-col justify-between group shadow-card border border-gray-200">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/75 to-navy-900/40" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                CITIZEN ACTION
              </span>
              <h3 className="text-xl font-bold text-white mt-2">Community Participation</h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Upvote issues in your ward, discuss solutions, take awareness quizzes, and earn civic reward points.
              </p>
            </div>
            <div className="relative z-10 pt-4">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-navy-800 text-xs font-bold hover:bg-gray-100 transition-colors shadow"
              >
                <span>Join Community</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Civic Service Categories (5 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t('quickCategories')}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select an issue category to launch immediate reporting with pre-configured SLA deadlines
            </p>
          </div>
          <Link to="/services" className="text-xs font-bold text-navy-800 hover:underline flex items-center gap-1">
            <span>{t('viewAll')}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            return (
              <Link
                key={cat.id}
                to={`/report?cat=${cat.id}`}
                className="bg-white rounded-card border border-gray-200/90 p-5 shadow-card hover:shadow-cardHover hover:border-navy-800/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center mb-3 group-hover:bg-navy-800 group-hover:text-emerald-400 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-navy-800">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="font-semibold text-emerald-600">{cat.slaHours}h SLA</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-navy-800 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Stats Row (3 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            icon={FileText}
            label={t('totalComplaints')}
            value={stats.total.toLocaleString()}
            subtext="Across all 24 municipal wards"
            iconBg="bg-blue-50 text-navy-800"
          />
          <StatCard
            icon={CheckCircle2}
            label={t('resolvedComplaints')}
            value={stats.resolved.toLocaleString()}
            subtext="78.8% verified completion rate"
            iconBg="bg-green-50 text-green-700"
            valueColor="text-green-700"
          />
          <StatCard
            icon={Clock}
            label={t('inProgressComplaints')}
            value={stats.inProgress.toLocaleString()}
            subtext="Actively assigned to field crews"
            iconBg="bg-amber-50 text-amber-700"
            valueColor="text-amber-600"
          />
        </div>
      </section>

      {/* 6. Two Columns: Latest Announcements & Latest Civic Complaints */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Latest Announcements (~5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-card border border-gray-200 shadow-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {t('latestAnnouncements')}
                  </h3>
                </div>
                <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-semibold">
                  Official
                </span>
              </div>

              <div className="divide-y divide-gray-100 mt-2">
                {ANNOUNCEMENTS.map((item) => (
                  <div key={item.id} className="py-3.5 hover:bg-gray-50/60 transition-colors rounded-lg px-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy-700 bg-navy-50 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <h5 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-navy-800 cursor-pointer transition-colors mt-1.5 leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link to="/about" className="text-xs font-bold text-navy-800 hover:underline flex items-center justify-between">
                <span>View all civic notices & updates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Latest Civic Complaints (~7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-card border border-gray-200 shadow-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {t('latestComplaints')}
                  </h3>
                </div>
                <Link to="/community" className="text-xs font-bold text-navy-800 hover:underline">
                  {t('viewAll')}
                </Link>
              </div>

              <div className="divide-y divide-gray-100 mt-2">
                {latestComplaints.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/track?id=${c.id}`)}
                    className="py-3.5 hover:bg-gray-50/70 transition-colors rounded-lg px-2 cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-navy-800">#{c.id}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">{c.category}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-semibold text-gray-900 truncate mt-0.5">
                        {c.title}
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {c.ward} • Reported {c.reportedAt}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <StatusPill status={c.status} />
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Public feed updated in real-time
              </span>
              <Link
                to="/community"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Browse All Community Issues</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Citizen Testimonials (3 cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real outcomes from verified neighborhood residents using FixMyCity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-card border border-gray-200/90 p-6 shadow-card flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy-800 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.locality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
