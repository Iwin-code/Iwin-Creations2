import React, { useState, useId } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Calendar,
  FileCheck2,
  Printer,
  ChevronRight,
  Shield,
  HelpCircle,
  Globe2,
} from 'lucide-react';
import { evaluateKivyVote, calculateAgeFromBirthDate } from '../utils/checkVote';
import { JURISDICTIONS } from '../data/jurisdictions';
import { EligibilityEvaluation } from '../types/voting';

interface VoterCheckerProps {
  id?: string;
}

export const VoterChecker: React.FC<VoterCheckerProps> = ({ id = 'voter-checker' }) => {
  const [inputMode, setInputMode] = useState<'age' | 'dob'>('age');
  const [ageInput, setAgeInput] = useState<string>('18');
  const [dobInput, setDobInput] = useState<string>('');
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string>('us_federal');
  const [evaluation, setEvaluation] = useState<EligibilityEvaluation>(() =>
    evaluateKivyVote('18', 18)
  );
  const [dobDetails, setDobDetails] = useState<ReturnType<typeof calculateAgeFromBirthDate>>(null);
  const [isCopied, setIsCopied] = useState(false);

  const selectedJurisdiction =
    JURISDICTIONS.find((j) => j.id === selectedJurisdictionId) || JURISDICTIONS[0];
  const minAge = selectedJurisdiction.votingAge;

  const handleEvaluate = (inputToTest: string) => {
    const result = evaluateKivyVote(inputToTest, minAge);
    setEvaluation(result);

    if (result.status === 'eligible') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#2563eb', '#10b981', '#3b82f6', '#f59e0b'],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAgeInput(val);
    handleEvaluate(val);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDobInput(val);
    const details = calculateAgeFromBirthDate(val);
    setDobDetails(details);
    if (details) {
      setAgeInput(details.age.toString());
      handleEvaluate(details.age.toString());
    } else if (val === '') {
      setAgeInput('');
      handleEvaluate('');
    }
  };

  const setPresetAge = (preset: string) => {
    setAgeInput(preset);
    handleEvaluate(preset);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `IJS_VET Eligibility Verification Report
Jurisdiction: ${selectedJurisdiction.name}
Minimum Voting Age: ${minAge}
User Input Age: ${ageInput}
Result: ${evaluation.resultMessage}
Status: ${evaluation.status.toUpperCase()}
Generated on: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <section id={id} className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <span>Core Tool</span>
            <span aria-hidden="true">·</span>
            <span>IJS_VET Voting Verification</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Check Your Voting Eligibility
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Powered by the IJS_VET decision engine. Test your legal qualification, explore youth preregistration, and prepare your voting plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form and Inputs */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Jurisdiction selector */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <label htmlFor="jurisdiction-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-slate-500" />
                  Voting Jurisdiction & Threshold
                </span>
                <span className="text-blue-600 font-bold normal-case text-xs">
                  Legal age: {minAge}+
                </span>
              </label>
              <select
                id="jurisdiction-select"
                value={selectedJurisdictionId}
                onChange={(e) => {
                  setSelectedJurisdictionId(e.target.value);
                  const newJuris = JURISDICTIONS.find((j) => j.id === e.target.value);
                  if (newJuris) {
                    const result = evaluateKivyVote(ageInput, newJuris.votingAge);
                    setEvaluation(result);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                {JURISDICTIONS.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.flagEmoji} {j.name} (Age {j.votingAge}+)
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2">
                {selectedJurisdiction.notes}
              </p>
            </div>

            {/* Input Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setInputMode('age')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  inputMode === 'age'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Direct Age Input (IJS_VET Default)
              </button>
              <button
                type="button"
                onClick={() => setInputMode('dob')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  inputMode === 'dob'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Date of Birth Calculator
              </button>
            </div>

            {/* Input Fields */}
            {inputMode === 'age' ? (
              <div className="mb-6">
                <label
                  htmlFor="age-input-field"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2"
                >
                  Enter Your Age
                </label>
                <div className="relative">
                  <input
                    id="age-input-field"
                    type="text"
                    value={ageInput}
                    onChange={handleAgeChange}
                    placeholder="e.g. 18"
                    className="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  {ageInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setAgeInput('');
                        handleEvaluate('');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Corresponds directly to <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">ids.age_input.text</code> in Kivy.
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <label
                  htmlFor="dob-input-field"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Your Date of Birth
                </label>
                <input
                  id="dob-input-field"
                  type="date"
                  value={dobInput}
                  onChange={handleDobChange}
                  className="w-full px-4 py-3 text-base font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
                {dobDetails && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      Calculated Age: <strong className="text-slate-900">{dobDetails.age} years old</strong>
                    </span>
                    {!dobDetails.is18OrOlder && (
                      <span className="font-semibold text-amber-700">
                        {dobDetails.daysUntil18} days until 18th birthday
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quick Test Presets */}
            <div className="mb-6">
              <span className="block text-xs font-medium text-slate-500 mb-2">
                Quick Test Cases:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '16 (High School Pre-reg)', value: '16' },
                  { label: '17 (Upcoming Voter)', value: '17' },
                  { label: '18 (Legal Threshold)', value: '18' },
                  { label: '25 (Adult Voter)', value: '25' },
                  { label: 'Invalid ("abc")', value: 'abc' },
                  { label: 'Empty ("")', value: '' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setPresetAge(item.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      ageInput === item.value
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Check Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleEvaluate(ageInput)}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Execute check_vote()</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAgeInput('');
                  setDobInput('');
                  handleEvaluate('');
                }}
                className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-all flex items-center justify-center"
                title="Reset input"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Result Display Card & Civic Action Plan */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Result Banner matching Kivy self.result */}
            <div
              className={`rounded-xl border p-6 shadow-sm transition-all ${
                evaluation.status === 'eligible'
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : evaluation.status === 'ineligible'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                  : evaluation.status === 'empty'
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {evaluation.status === 'eligible' && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  )}
                  {evaluation.status === 'ineligible' && (
                    <XCircle className="w-6 h-6 text-amber-600" />
                  )}
                  {evaluation.status === 'empty' && (
                    <HelpCircle className="w-6 h-6 text-slate-500" />
                  )}
                  {evaluation.status === 'invalid' && (
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Kivy self.result Output
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {evaluation.resultMessage}
                  </h3>

                  {evaluation.numericAge !== undefined && (
                    <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
                      <span>Evaluated Age: <strong className="tabular-nums">{evaluation.numericAge}</strong></span>
                      <span>Required Threshold: <strong className="tabular-nums">{minAge}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preregistration highlight if age is 16-17 */}
              {evaluation.preregistrationEligible && (
                <div className="mt-4 p-3 bg-white/80 rounded-lg border border-amber-200/80 text-xs text-amber-900">
                  <p className="font-semibold flex items-center gap-1.5 mb-1">
                    <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Youth Preregistration Eligible!
                  </p>
                  <p>
                    While you cannot vote in this general election today, many states and countries allow citizens aged 16 or 17 to complete voter registration in advance.
                  </p>
                </div>
              )}
            </div>

            {/* Action Items Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                Actionable Civic Guidance
              </h4>
              <ul className="space-y-2.5">
                {evaluation.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  title="Print Verification Card"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
