import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight, PhoneCall, Send, Sparkles, X, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CityAssistChat = ({ isFloating = false }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you today with your civic complaints, tracking, or services?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(!isFloating);

  const quickActions = [
    { label: "Report an issue", link: "/report", hint: "Potholes, garbage, water leaks" },
    { label: "Track complaint", link: "/track", hint: "Check status using CM-XXXX" },
    { label: "Find civic services", link: "/services", hint: "Ward offices & helplines" }
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');

    // Simulated smart civic AI response
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botReply = "I can assist you with that! You can log this issue directly through our Report page, or contact your Ward Officer.";

      if (lower.includes('track') || lower.includes('cm-') || lower.includes('status')) {
        botReply = "To track any complaint, enter your ID (e.g. CM-8921) on our Complaint Tracking page. Most issues are assigned within 2 hours!";
      } else if (lower.includes('pothole') || lower.includes('road') || lower.includes('garbage') || lower.includes('report')) {
        botReply = "You can report this in 3 easy steps on our 'Report an Issue' page: choose category, add your location, and upload a photo!";
      } else if (lower.includes('reward') || lower.includes('point')) {
        botReply = "Citizens earn +15 points for every valid complaint and +10 for community participation! Redeem them for bus passes or local vouchers.";
      } else if (lower.includes('compensation') || lower.includes('delay') || lower.includes('sla')) {
        botReply = "Under our Civic Service Guarantee, if a critical complaint breaches its statutory deadline (SLA), citizen compensation is credited!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  const handleActionClick = (link) => {
    navigate(link);
  };

  return (
    <div className="bg-white rounded-card border border-gray-200/90 shadow-card flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              CityAssist AI Assistant
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5"></span>
              <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">v2.4</span>
      </div>

      {/* Body: Chat & Quick Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[360px]">
        {/* Messages */}
        <div className="space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-navy-50 text-navy-800 flex items-center justify-center shrink-0 border border-navy-100 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-navy-800" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                  m.sender === 'user'
                    ? 'bg-navy-800 text-white rounded-br-none'
                    : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Quick-Action Rows with Arrows */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Quick Actions</p>
          {quickActions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleActionClick(action.link)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-gray-200 hover:border-navy-800 hover:bg-navy-50/50 transition-all text-left group"
            >
              <div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-navy-800 block">
                  {action.label}
                </span>
                <span className="text-[11px] text-gray-500 block">
                  {action.hint}
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-navy-800 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white" />
              </div>
            </button>
          ))}
        </div>

        {/* Chat input */}
        <form onSubmit={handleSend} className="relative mt-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI: e.g. Track CM-8921..."
            className="w-full pl-3 pr-10 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-800 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 p-1 rounded-md bg-navy-800 text-white hover:bg-navy-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Dark navy helpline card at bottom */}
      <div className="p-4 bg-navy-800 text-white m-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-200">Need help right away?</p>
            <p className="text-xs text-amber-400 font-bold tracking-wide">1800-120-2255 (Toll Free)</p>
            <p className="text-[10px] text-gray-400">24x7 Citizen Helpline</p>
          </div>
        </div>
      </div>
    </div>
  );
};
