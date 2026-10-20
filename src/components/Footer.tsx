import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                IV
              </span>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                IJS_VET
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-4">
              IJS Voter Eligibility Tool & Civic Participation Portal. Built from the original Kivy application specification into a responsive, privacy-preserving web platform.
            </p>
            <div className="text-xs text-slate-400">
              Nonpartisan civic educational utility · All age calculations performed client-side.
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('checker')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Age Eligibility Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('jurisdictions')}
                  className="hover:text-slate-900 transition-colors"
                >
                  International Jurisdictions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('checklist')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Civic Readiness Checklist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('simulator')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Kivy OpenGL Simulator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Civic Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.vote.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                >
                  Vote.org National Registry
                </a>
              </li>
              <li>
                <a
                  href="https://www.usa.gov/voting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                >
                  USA.gov Voter Information
                </a>
              </li>
              <li>
                <a
                  href="https://www.eac.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                >
                  Election Assistance Commission
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} IJS_VET Civic Portal. Open educational tool.</p>
          <div className="flex items-center gap-4">
            <span>Client-Side Privacy Guaranteed</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AA Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
