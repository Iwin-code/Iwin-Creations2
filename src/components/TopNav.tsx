import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onTriggerCheck: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onTriggerCheck,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('checker')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 text-left flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm">
            IV
          </span>
          <span>IJS_VET</span>
        </button>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('checker')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'checker'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Eligibility Checker
          </button>
          <button
            onClick={() => onSelectTab('jurisdictions')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'jurisdictions'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Jurisdictions
          </button>
          <button
            onClick={() => onSelectTab('checklist')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'checklist'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Civic Checklist
          </button>
          <button
            onClick={() => onSelectTab('simulator')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'simulator'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Kivy Simulator
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'guide'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Voter Rights
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTriggerCheck}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verify Eligibility</span>
          </button>
        </div>
      </div>
    </header>
  );
};
