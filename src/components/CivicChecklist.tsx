import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CalendarCheck,
  CreditCard,
  UserCheck,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  description: string;
  actionHint: string;
  icon: React.ElementType;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'age',
    title: 'Age Eligibility Met',
    category: 'Legal Threshold',
    description: 'You are at least 18 years old on or before Election Day (or meet regional pre-registration criteria).',
    actionHint: 'Use the IJS_VET age checker above to verify your status.',
    icon: CalendarCheck,
  },
  {
    id: 'citizenship',
    title: 'Citizenship Verified',
    category: 'Sovereignty',
    description: 'You are a citizen (by birth or naturalization) of the jurisdiction in which you plan to cast your ballot.',
    actionHint: 'Bring your naturalization certificate or passport if required for initial registration.',
    icon: UserCheck,
  },
  {
    id: 'residency',
    title: 'Local Residency Duration',
    category: 'Jurisdiction',
    description: 'You reside at your current residential address and satisfy local minimum duration rules (typically 30 days).',
    actionHint: 'Update your voter registration if you have recently relocated or moved apartments.',
    icon: MapPin,
  },
  {
    id: 'registration',
    title: 'Active Voter Registration',
    category: 'Roll Verification',
    description: 'Your name appears on the active electoral roll in your district, municipality, or county.',
    actionHint: 'Search your state or national election division registry to confirm active enrollment.',
    icon: CheckCircle,
  },
  {
    id: 'id_documents',
    title: 'Accepted Identification Prepared',
    category: 'Authentication',
    description: 'You possess a valid government-issued photo ID (driver’s license, passport, military ID) or approved alternate ID.',
    actionHint: 'Verify your state’s specific photo ID rules before arriving at your precinct.',
    icon: CreditCard,
  },
  {
    id: 'voting_plan',
    title: 'Election Day Plan Formulated',
    category: 'Execution',
    description: 'You know your polling station address, operating hours, transportation route, or mail-in ballot postmark deadline.',
    actionHint: 'Schedule a specific time on your calendar to vote (early morning or early voting days avoid lines).',
    icon: ShieldCheck,
  },
];

export const CivicChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    new Set(['age', 'citizenship'])
  );

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setCheckedIds(new Set(CHECKLIST_ITEMS.map((item) => item.id)));
  };

  const resetAll = () => {
    setCheckedIds(new Set());
  };

  const completedCount = checkedIds.size;
  const totalCount = CHECKLIST_ITEMS.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <section id="checklist" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <span>Readiness Audit</span>
            <span aria-hidden="true">·</span>
            <span>6-Point Verification</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Civic Readiness Checklist
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Age is the primary requirement, but turning up to vote requires active registration, valid documentation, and a polling plan.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Readiness Score</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 font-bold">{percentage}% Completed</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {completedCount === totalCount
                ? '🎉 You Are 100% Prepared to Vote!'
                : `${completedCount} of ${totalCount} Requirements Confirmed`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {completedCount === totalCount
                ? 'Your eligibility and polling day preparation are fully in order.'
                : 'Review the unchecked items below to ensure smooth voting on Election Day.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={selectAll}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              Check All
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.has(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? 'bg-blue-50/40 border-blue-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-blue-600">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 fill-blue-600 text-white" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`text-sm font-bold ${isChecked ? 'text-slate-900' : 'text-slate-800'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-blue-700 font-medium flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span>{item.actionHint}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
