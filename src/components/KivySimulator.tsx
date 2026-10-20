import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Play,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  ORIGINAL_KIVY_CODE,
  ORIGINAL_KV_CODE,
  evaluateKivyVote,
} from '../utils/checkVote';

export const KivySimulator: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'kivy' | 'kv' | 'architecture'>('kivy');
  const [simulatedAgeInput, setSimulatedAgeInput] = useState<string>('18');
  const [simulatedResult, setSimulatedResult] = useState<string>('✅ You are eligible to vote.');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleKivyCheck = () => {
    // Exact simulation of:
    // age_text = self.ids.age_input.text.strip()
    // if age_text == "": self.result = "Please enter your age." ...
    const ageText = simulatedAgeInput.trim();

    if (ageText === '') {
      setSimulatedResult('Please enter your age.');
      return;
    }

    const isInt = /^-?\d+$/.test(ageText);
    if (!isInt) {
      setSimulatedResult('Please enter a valid number.');
      return;
    }

    const age = Number.parseInt(ageText, 10);
    if (age >= 18) {
      setSimulatedResult('✅ You are eligible to vote.');
    } else {
      setSimulatedResult('❌ You are not eligible to vote.');
    }
  };

  const copyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(tabName);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  return (
    <section id="kivy-simulator" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <span>Framework Emulation</span>
            <span aria-hidden="true">·</span>
            <span>Python & Kivy Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Original Kivy App & Code Inspector
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Inspect the Python codebase, the companion <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-xs">ij_svet.kv</code> UI layout specification, and run the emulated Kivy window in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Simulated Kivy OpenGL Window */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 text-white">
              {/* Window Title Bar */}
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono font-medium text-slate-300">
                    IJS_VET (Kivy 2.3.0 · OpenGL ES 2.0)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Monitor className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Window Content: Emulated BoxLayout */}
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px] bg-[#161a23]">
                {/* Kivy Label 1: Title */}
                <h3 className="text-3xl font-extrabold text-white tracking-tight text-center mb-1">
                  IJS_VET
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-8 text-center">
                  Voter Eligibility Checker
                </p>

                {/* Kivy TextInput: age_input */}
                <div className="w-full max-w-xs mb-4">
                  <label htmlFor="sim-age-input" className="block text-[11px] font-mono text-slate-400 mb-1">
                    id: age_input (input_filter: 'int')
                  </label>
                  <input
                    id="sim-age-input"
                    type="text"
                    value={simulatedAgeInput}
                    onChange={(e) => setSimulatedAgeInput(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-600 rounded text-white text-base font-mono focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
                  />
                </div>

                {/* Kivy Button: Check Eligibility */}
                <div className="w-full max-w-xs mb-6">
                  <button
                    type="button"
                    onClick={handleKivyCheck}
                    className="w-full py-3 px-4 bg-[#2364c7] hover:bg-[#1d55ab] active:bg-[#174690] text-white font-medium text-sm rounded shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Check Eligibility (on_release)</span>
                  </button>
                </div>

                {/* Kivy Label: result_label (root.result) */}
                <div className="w-full max-w-xs p-4 rounded bg-slate-800/80 border border-slate-700 min-h-[70px] flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                    id: result_label · root.result
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {simulatedResult || '(result empty)'}
                  </p>
                </div>

                {/* Quick test pills within simulator */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
                  <span className="text-[11px] mr-1">Inject:</span>
                  {['17', '18', '21', '""', '"hello"'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        const testVal = val === '""' ? '' : val.replace(/"/g, '');
                        setSimulatedAgeInput(testVal);
                        // Trigger check
                        const ageText = testVal.trim();
                        if (ageText === '') {
                          setSimulatedResult('Please enter your age.');
                        } else if (!/^-?\d+$/.test(ageText)) {
                          setSimulatedResult('Please enter a valid number.');
                        } else if (Number.parseInt(ageText, 10) >= 18) {
                          setSimulatedResult('✅ You are eligible to vote.');
                        } else {
                          setSimulatedResult('❌ You are not eligible to vote.');
                        }
                      }}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Tabs and Architectural Insights */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Header Tabs */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveCodeTab('kivy')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeCodeTab === 'kivy'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  main.py
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCodeTab('kv')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeCodeTab === 'kv'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ij_svet.kv
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCodeTab('architecture')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeCodeTab === 'architecture'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Architecture & Bindings
                </button>
              </div>

              {activeCodeTab !== 'architecture' && (
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      activeCodeTab === 'kivy' ? ORIGINAL_KIVY_CODE : ORIGINAL_KV_CODE,
                      activeCodeTab
                    )
                  }
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded flex items-center gap-1.5 shadow-2xl transition-all"
                >
                  {copiedCode === activeCodeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto min-h-[380px] leading-relaxed">
              {activeCodeTab === 'kivy' && (
                <pre className="text-slate-100">
                  <code>{ORIGINAL_KIVY_CODE}</code>
                </pre>
              )}

              {activeCodeTab === 'kv' && (
                <pre className="text-slate-100">
                  <code>{ORIGINAL_KV_CODE}</code>
                </pre>
              )}

              {activeCodeTab === 'architecture' && (
                <div className="font-sans text-slate-300 space-y-4">
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      1. StringProperty Reactivity
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      In Kivy, <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">result = StringProperty("")</code> automatically triggers a UI re-render whenever the variable is reassigned. This is the Kivy equivalent of React's <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">useState</code> hook.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-amber-400" />
                      2. Widget Id Lookup
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">self.ids.age_input.text.strip()</code> queries the widget hierarchy defined in <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">ij_svet.kv</code>. Stripping whitespace prevents trailing spaces from causing false negatives.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-emerald-400" />
                      3. Exception Handling (ValueError)
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Kivy's python <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">int(age_text)</code> throws a <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">ValueError</code> on non-integer inputs (such as characters or floats), which is gracefully caught to set <code className="text-emerald-300 bg-slate-800 px-1 py-0.5 rounded">self.result = "Please enter a valid number."</code>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
