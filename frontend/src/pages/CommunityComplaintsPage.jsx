import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Filter, Search, MessageSquare, ThumbsUp, Send, X,
  MapPin, PlusCircle, CheckCircle2, ChevronRight, User
} from 'lucide-react';
import { ComplaintRow } from '../components/common/ComplaintRow';
import { useCivic } from '../context/CivicContext';
import { useAuth } from '../context/AuthContext';

export const CommunityComplaintsPage = () => {
  const [searchParams] = useSearchParams();
  const { complaints, addComment } = useCivic();
  const { currentUser } = useAuth();

  const urlCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search');

  const [selectedWard, setSelectedWard] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All');
  const [searchTerm, setSearchTerm] = useState(urlSearch || '');
  const [activeDiscussionComplaint, setActiveDiscussionComplaint] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  const wards = ['All', 'Ward 12', 'Ward 5', 'Ward 8', 'Ward 14', 'Ward 3'];
  const categories = ['All', 'Garbage', 'Roads', 'Drainage', 'Streetlights', 'Water Supply'];

  // Filtering
  const filteredComplaints = complaints.filter(c => {
    const matchesWard = selectedWard === 'All' || c.ward === selectedWard;
    const matchesCategory = selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchTerm.trim() ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWard && matchesCategory && matchesSearch;
  });

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeDiscussionComplaint) return;

    addComment(
      activeDiscussionComplaint.id,
      newCommentText.trim(),
      currentUser?.name || "Amit Sharma",
      currentUser?.role === 'Admin'
    );
    setNewCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Title & Subtitle + Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Community Complaints
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            View and participate in local civic discussions across your municipal ward
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Report Issue</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search community issues by keyword, ticket ID, or locality..."
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>

          {/* Filter by Ward button / selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 shrink-0">
              <Filter className="w-4 h-4 text-navy-800" />
              <span>Ward:</span>
            </div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-navy-800"
            >
              {wards.map(w => (
                <option key={w} value={w}>{w === 'All' ? 'All Wards' : w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-navy-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List in Single White Card */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Showing {filteredComplaints.length} Issues
            </span>
            {selectedWard !== 'All' && (
              <span className="text-xs font-semibold text-navy-800 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded-full">
                {selectedWard}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">Click any row to join discussion or view tracking</span>
        </div>

        {filteredComplaints.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-bold text-gray-700">No issues found matching your filters</p>
            <p className="text-xs text-gray-400">Try clearing the search term or switching to "All Wards"</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredComplaints.map((c) => (
              <ComplaintRow
                key={c.id}
                complaint={c}
                onSelect={(comp) => setActiveDiscussionComplaint(comp)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Community Comments Drawer / Modal */}
      {activeDiscussionComplaint && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-xl w-full p-6 shadow-2xl border border-gray-200 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-800 bg-navy-50 px-2 py-0.5 rounded">
                    #{activeDiscussionComplaint.id}
                  </span>
                  <span className="text-xs text-gray-500">{activeDiscussionComplaint.ward}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-1">
                  {activeDiscussionComplaint.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDiscussionComplaint(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description quote */}
            <div className="p-3 bg-gray-50 rounded-xl my-3 text-xs text-gray-700 leading-relaxed border border-gray-100">
              {activeDiscussionComplaint.description}
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Community Discussion ({(activeDiscussionComplaint.comments || []).length})
              </p>

              {(activeDiscussionComplaint.comments || []).length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">
                  No comments yet. Be the first neighbor to endorse or comment!
                </p>
              ) : (
                activeDiscussionComplaint.comments.map((cm) => (
                  <div
                    key={cm.id}
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      cm.isOfficial
                        ? 'bg-navy-50/80 border border-navy-200/80 text-navy-950'
                        : 'bg-gray-50 border border-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{cm.user}</span>
                        {cm.isOfficial && (
                          <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold">
                            Official Update
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-gray-400">{cm.time}</span>
                    </div>
                    <p className="leading-relaxed">{cm.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handlePostComment} className="pt-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your input or endorse this issue..."
                className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy-800"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reply</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
