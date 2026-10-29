import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Volume2, VolumeX, Eye, ShieldCheck } from 'lucide-react';

export const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const { fontSize, setFontSize, screenReaderActive, toggleScreenReader } = useAccessibility();

  return (
    <div className="bg-[#0F1F3D] text-gray-200 text-xs py-1.5 px-4 sm:px-6 border-b border-navy-700/60 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: National Portal of India style title */}
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold tracking-wide text-white">
            {t('portalTitle')}
          </span>
          <span className="hidden md:inline text-gray-400 text-[11px] font-normal border-l border-gray-600 pl-2">
            Civic Grievance & Community Redressal Framework
          </span>
        </div>

        {/* Center: Language toggle */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium bg-navy-900/60 px-2.5 py-0.5 rounded-full border border-navy-700/50">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'en' ? 'text-amber-400 font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            English
          </button>
          <span className="text-gray-600">|</span>
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'hi' ? 'text-amber-400 font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            हिंदी
          </button>
          <span className="text-gray-600">|</span>
          <button
            type="button"
            onClick={() => setLang('mr')}
            className={`px-1.5 py-0.5 rounded transition-colors ${lang === 'mr' ? 'text-amber-400 font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            मराठी
          </button>
        </div>

        {/* Right: Accessibility controls */}
        <div className="flex items-center gap-3">
          {/* Screen Reader toggle */}
          <button
            type="button"
            onClick={toggleScreenReader}
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
              screenReaderActive ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}
            title="Toggle Screen Reader Simulation"
          >
            {screenReaderActive ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3 text-gray-400" />}
            <span className="hidden sm:inline">Screen Reader</span>
          </button>

          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Font Size Controls: A A A */}
          <div className="flex items-center gap-1 bg-navy-900/60 px-2 py-0.5 rounded border border-navy-700/50">
            <span className="text-[10px] text-gray-400 mr-1 hidden sm:inline">Text:</span>
            <button
              type="button"
              onClick={() => setFontSize('sm')}
              className={`px-1 rounded text-[11px] font-bold ${fontSize === 'sm' ? 'text-amber-400 underline' : 'text-gray-400 hover:text-white'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('base')}
              className={`px-1 rounded text-xs font-bold ${fontSize === 'base' ? 'text-amber-400 underline' : 'text-gray-300 hover:text-white'}`}
              title="Default Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('lg')}
              className={`px-1 rounded text-sm font-bold ${fontSize === 'lg' ? 'text-amber-400 underline' : 'text-gray-300 hover:text-white'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
