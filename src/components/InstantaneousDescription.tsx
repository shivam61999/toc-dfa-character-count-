import React, { useState } from 'react';
import type { SimulationStep } from '../types/automata';
import { DFA_STATES } from '../utils/dfaEngine';
import { Copy, Check, Terminal } from 'lucide-react';

interface InstantaneousDescriptionProps {
  steps: SimulationStep[];
  currentStepIndex: number;
}

export const InstantaneousDescription: React.FC<InstantaneousDescriptionProps> = ({
  steps,
  currentStepIndex,
}) => {
  const [copied, setCopied] = useState(false);

  // Build full formal math trace up to current step
  const currentTrace = steps
    .slice(0, currentStepIndex + 1)
    .map((s) => s.instantaneousDescription)
    .join(' ⊢ ');

  const fullTrace = steps.map((s) => s.instantaneousDescription).join(' ⊢ ');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTrace);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            Formal Instantaneous Descriptions (IDs) & Trace
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full ID Trace</span>
            </>
          )}
        </button>
      </div>

      {/* Math representation box */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
        <div className="text-[11px] text-slate-500 mb-1 uppercase tracking-wider font-sans font-medium">
          Step-by-step Configuration Transition:
        </div>
        <div className="whitespace-nowrap text-indigo-200">
          {currentTrace || '(q₀,₀, ε)'}
        </div>
      </div>

      {/* Step history table */}
      <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800/80">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-950 sticky top-0 text-slate-400">
            <tr className="border-b border-slate-800">
              <th className="py-2 px-3">Step</th>
              <th className="py-2 px-3">State</th>
              <th className="py-2 px-3">Read Symbol</th>
              <th className="py-2 px-3">Configuration (q, w)</th>
              <th className="py-2 px-3">Na</th>
              <th className="py-2 px-3">Nb</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 font-mono">
            {steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isCurrent
                      ? 'bg-indigo-950/50 text-white font-bold'
                      : isPast
                      ? 'text-slate-400 bg-slate-900/30'
                      : 'text-slate-600 bg-slate-950/20'
                  }`}
                >
                  <td className="py-1.5 px-3">{st.stepIndex}</td>
                  <td className="py-1.5 px-3">
                    <span
                      className={
                        DFA_STATES[st.currentState].isAccept
                          ? 'text-emerald-400'
                          : st.currentState === 'qtrap'
                          ? 'text-rose-400'
                          : 'text-sky-300'
                      }
                    >
                      {DFA_STATES[st.currentState].label}
                    </span>
                  </td>
                  <td className="py-1.5 px-3">
                    {st.transitionSymbol ? (
                      <span className="text-amber-300 font-bold">'{st.transitionSymbol}'</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="py-1.5 px-3 text-indigo-300">{st.instantaneousDescription}</td>
                  <td className="py-1.5 px-3 text-sky-400">{st.countA}</td>
                  <td className="py-1.5 px-3 text-amber-400">{st.countB}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
