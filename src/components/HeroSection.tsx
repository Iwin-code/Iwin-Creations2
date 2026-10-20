import React from 'react';
import { ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToChecker: () => void;
  onOpenSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToChecker,
  onOpenSimulator,
}) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Pitch */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wider uppercase mb-3">
              <span>Civic Participation Standard</span>
              <span aria-hidden="true">·</span>
              <span>IJS_VET Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
              Instant Voter Eligibility & Civic Readiness
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Verify legal voting age thresholds in seconds, calculate youth preregistration milestones, inspect state and international jurisdiction rules, and experience the original IJS_VET application.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onScrollToChecker}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>Check Your Age Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenSimulator}
                className="px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-slate-200 whitespace-nowrap"
              >
                Launch Kivy Simulator
              </button>
            </div>

            {/* Proof Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  18+
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Standard Legal Voting Age
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  16–17
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Youth Preregistration Window
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  100%
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Client-Side Private Verification
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 aspect-16/10 lg:aspect-auto lg:h-[420px]">
              <img
                src="/src/assets/images/civic_voting_hero_1791984203546.jpg"
                alt="Civic voting center with ballot box and voting booths"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Resilient styled fallback container
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-200 mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Democracy & Active Citizenship</span>
                </div>
                <p className="text-sm font-semibold text-slate-100">
                  Every vote shapes schools, public safety, local infrastructure, and national policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
