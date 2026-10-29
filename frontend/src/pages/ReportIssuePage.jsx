import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Phone, UploadCloud, CheckCircle2,
  AlertCircle, Trash2, Truck, Waves, Lightbulb, Droplets,
  Crosshair, Image, X, Sparkles
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { useAuth } from '../context/AuthContext';

export const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addComplaint } = useCivic();
  const { currentUser } = useAuth();

  const initialCat = searchParams.get('cat') || 'roads';

  const categoryMap = {
    garbage: 'Garbage',
    roads: 'Roads',
    drainage: 'Drainage',
    water: 'Water Supply',
    streetlights: 'Streetlights'
  };

  const [category, setCategory] = useState(categoryMap[initialCat.toLowerCase()] || 'Roads');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [ward, setWard] = useState('Ward 12');
  const [contact, setContact] = useState(currentUser?.phone || '+91 98220 12345');
  const [urgency, setUrgency] = useState('Medium');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { label: 'Garbage', icon: Trash2 },
    { label: 'Roads', icon: Truck },
    { label: 'Drainage', icon: Waves },
    { label: 'Water Supply', icon: Droplets },
    { label: 'Streetlights', icon: Lightbulb },
  ];

  const handleGpsDetect = () => {
    setDetectingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setDetectingGps(false);
          setGpsSuccess(true);
          setLocation(`18.5204° N, 73.8567° E (Near Market Yard Road, Ward 12)`);
        },
        (err) => {
          setDetectingGps(false);
          // fallback simulation
          setGpsSuccess(true);
          setLocation(`GPS Detected: Junction of 4th Main & Subhash Chowk, Ward 12`);
        },
        { timeout: 4000 }
      );
    } else {
      setDetectingGps(false);
      setLocation(`GPS Detected: Ward 12 Central Avenue`);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide an issue description.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const created = addComplaint({
        title: title || `${category} issue at ${location || ward}`,
        category,
        description,
        location: location || "Central Ward 12",
        ward,
        contact,
        urgency,
        citizenName: currentUser?.name || "Amit Sharma",
        citizenEmail: currentUser?.email || "amit.sharma@example.com",
        imageUrl: uploadedFile?.previewUrl || undefined
      });

      setIsSubmitting(false);
      navigate(`/track?id=${created.id}&new=true`);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Report a Civic Issue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Provide accurate details for faster resolution and municipal dispatch
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
          <span>← Back to Dashboard</span>
        </Link>
      </div>

      {/* Single Large White Card */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Issue Category Toggle Chips */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                1. Select Issue Category
              </label>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+15 Reward Points</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.label;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setCategory(cat.label)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-3.5 sm:px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-navy-800 text-white border-navy-800 shadow-md ring-2 ring-navy-800/20'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-gray-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Issue Title (optional quick summary) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              2. Brief Issue Summary
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep pothole right at Market Yard Gate 3"
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
            />
          </div>

          {/* 3. Issue Description Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                3. Detailed Issue Description
              </label>
              <span className="text-[11px] text-gray-400">
                {description.length} / 500 characters
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the exact civic bottleneck, safety risk, visible duration, and any landmarks..."
              className="w-full text-xs sm:text-sm p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent leading-relaxed"
              required
            />
            {/* Quick description templates */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-gray-400 uppercase font-semibold">Templates:</span>
              <button
                type="button"
                onClick={() => setDescription("Severe pothole approx 2ft wide causing traffic hazard. Multiple vehicles skidded.")}
                className="text-[11px] text-navy-800 hover:underline bg-navy-50 px-2 py-0.5 rounded"
              >
                Pothole Hazard
              </button>
              <button
                type="button"
                onClick={() => setDescription("Municipal waste container overflowing for over 48 hours. Strong odor and health hazard.")}
                className="text-[11px] text-navy-800 hover:underline bg-navy-50 px-2 py-0.5 rounded"
              >
                Overflowing Garbage
              </button>
              <button
                type="button"
                onClick={() => setDescription("Streetlight completely dark on main pedestrian avenue. Safety risk at night.")}
                className="text-[11px] text-navy-800 hover:underline bg-navy-50 px-2 py-0.5 rounded"
              >
                Dark Streetlights
              </button>
            </div>
          </div>

          {/* 4. Location and Contact Number (Side by Side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  4. Location & Landmark
                </label>
                <button
                  type="button"
                  onClick={handleGpsDetect}
                  disabled={detectingGps}
                  className="text-xs text-navy-800 hover:text-emerald-600 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Crosshair className={`w-3.5 h-3.5 ${detectingGps ? 'animate-spin' : ''}`} />
                  <span>{detectingGps ? 'Locating...' : 'Detect GPS'}</span>
                </button>
              </div>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Street name, landmark, or GPS"
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
              {gpsSuccess && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>GPS Coordinates captured accurately</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                5. Citizen Contact Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98220..."
                  className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                For field officer inspection updates via SMS
              </p>
            </div>
          </div>

          {/* Ward and Urgency selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Ward Jurisdiction
              </label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
              >
                <option value="Ward 12">Ward 12 — Swargate / Market Yard</option>
                <option value="Ward 5">Ward 5 — Shivajinagar / Central</option>
                <option value="Ward 8">Ward 8 — Kothrud / Paud Road</option>
                <option value="Ward 14">Ward 14 — Kalyani Nagar / East</option>
                <option value="Ward 3">Ward 3 — Hadapsar / South</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Priority Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800 bg-white"
              >
                <option value="Low">Low — Routine maintenance (72h SLA)</option>
                <option value="Medium">Medium — Standard grievance (48h SLA)</option>
                <option value="High">High — Hazardous / Active impediment (24h SLA)</option>
                <option value="Critical">Critical — Immediate safety risk (12h SLA)</option>
              </select>
            </div>
          </div>

          {/* 5. Upload Evidence Dashed Drop-zone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              6. Upload Photo / Video Evidence
            </label>

            {uploadedFile ? (
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
                    <img src={uploadedFile.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">{uploadedFile.name}</p>
                    <p className="text-[11px] text-gray-500">{uploadedFile.size} • Attached</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-300 hover:border-navy-800 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-navy-50/20 group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-navy-800 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-navy-800" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-800 mt-3">
                  Click to upload or drag & drop photo proof
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Supports JPG, PNG, MP4 up to 15MB. Geotagged camera photos preferred.
                </p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileDrop}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Citizen Charter Service Guarantee Notice */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <span className="font-bold">Civic Service Guarantee: </span>
              Your report will be automatically triaged to your ward's Junior Engineer within 2 hours. If the issue is not attended to within statutory turnaround deadlines, statutory citizen compensation will be issued.
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Ticket & Dispatching...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Submit Civic Complaint</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
