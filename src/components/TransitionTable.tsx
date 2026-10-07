import React from 'react';
import type { StateId } from '../types/automata';
import { DFA_STATES, TRANSITION_TABLE } from '../utils/dfaEngine';

interface TransitionTableProps {
  currentState: StateId;
  activeSymbol: string | null;
  showTrapState?: boolean;
}

export const TransitionTable: React.FC<TransitionTableProps> = ({
  currentState,
  activeSymbol,
  showTrapState = true,
}) => {
  const states = (Object.keys(DFA_STATES) as StateId[]).filter(
    (s) => showTrapState || s !== 'qtrap'
  );

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            State Transition Table (δ: Q × Σ → Q)
          </h3>
          <p className="text-xs text-slate-400">
            Row indicates current state, column indicates input symbol
          </p>
        </div>
        <div className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
          |Q| = {showTrapState ? '7 (with trap)' : '6 states'}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-3">State (q ∈ Q)</th>
              <th className="py-2.5 px-3">Na mod 3</th>
              <th className="py-2.5 px-3">Nb mod 2</th>
              <th
                className={`py-2.5 px-3 text-center transition-colors ${
                  activeSymbol === 'a' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-sky-400'
                }`}
              >
                Input 'a'
              </th>
              <th
                className={`py-2.5 px-3 text-center transition-colors ${
                  activeSymbol === 'b' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-amber-400'
                }`}
              >
                Input 'b'
              </th>
              <th className="py-2.5 px-3">Type / Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {states.map((stId) => {
              const state = DFA_STATES[stId];
              const isCurrent = currentState === stId;
              const nextOnA = TRANSITION_TABLE[stId].a;
              const nextOnB = TRANSITION_TABLE[stId].b;

              let rowClass = 'transition-colors hover:bg-slate-800/40';
              if (isCurrent) {
                rowClass = 'bg-indigo-950/40 border-l-4 border-indigo-500 font-semibold text-white';
              }

              return (
                <tr key={stId} className={rowClass}>
                  <td className="py-2.5 px-3 flex items-center gap-2">
                    {state.isStart && (
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-1 rounded">
                        →
                      </span>
                    )}
                    {state.isAccept && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1 rounded">
                        *
                      </span>
                    )}
                    <span className={state.isAccept ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                      {state.label}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {state.aRemainder === -1 ? '—' : state.aRemainder}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {state.bRemainder === -1 ? '—' : state.bRemainder}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-center transition-colors ${
                      isCurrent && activeSymbol === 'a'
                        ? 'bg-sky-500/30 text-sky-200 font-bold scale-105'
                        : 'text-sky-300'
                    }`}
                  >
                    {DFA_STATES[nextOnA].label}
                  </td>
                  <td
                    className={`py-2.5 px-3 text-center transition-colors ${
                      isCurrent && activeSymbol === 'b'
                        ? 'bg-amber-500/30 text-amber-200 font-bold scale-105'
                        : 'text-amber-300'
                    }`}
                  >
                    {DFA_STATES[nextOnB].label}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-[11px] text-slate-400">
                    {state.isAccept ? (
                      <span className="text-emerald-400 font-medium">Initial & Accepting</span>
                    ) : state.id === 'qtrap' ? (
                      <span className="text-rose-400">Dead / Trap state</span>
                    ) : (
                      <span>Intermediate remainder state</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
