import React from 'react';
import type { SimulationStep } from '../types/automata';

interface TapeVisualizerProps {
  inputString: string;
  currentStep: SimulationStep;
  totalSteps: number;
}

export const TapeVisualizer: React.FC<TapeVisualizerProps> = ({
  inputString,
  currentStep,
}) => {
  const isEpsilon = inputString.length === 0;
  const chars = isEpsilon ? ['ε'] : inputString.split('');
  const activeCharIndex = isEpsilon ? 0 : currentStep.charIndex;

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-4">
      {/* Header and Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Input Tape
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
            Length: {inputString.length}
          </span>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2 text-xs">
          {/* 'a' counter */}
          <div className="flex items-center gap-1.5 bg-sky-950/70 border border-sky-800/80 px-2.5 py-1 rounded-lg">
            <span className="font-bold text-sky-400">Na = {currentStep.countA}</span>
            <span className="text-slate-400">|</span>
            <span className="text-sky-300 font-mono">
              3 × {currentStep.multiplierM} + <b className={currentStep.remainderA === 0 ? 'text-emerald-400' : 'text-amber-400'}>{currentStep.remainderA}</b>
            </span>
          </div>

          {/* 'b' counter */}
          <div className="flex items-center gap-1.5 bg-amber-950/70 border border-amber-800/80 px-2.5 py-1 rounded-lg">
            <span className="font-bold text-amber-400">Nb = {currentStep.countB}</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-300 font-mono">
              2 × {currentStep.multiplierN} + <b className={currentStep.remainderB === 0 ? 'text-emerald-400' : 'text-amber-400'}>{currentStep.remainderB}</b>
            </span>
          </div>
        </div>
      </div>

      {/* Tape Cells & Read Head */}
      <div className="relative overflow-x-auto py-2 px-1">
        <div className="flex items-center gap-1.5 min-w-max mx-auto justify-center">
          {chars.map((char, idx) => {
            const isProcessed = !isEpsilon && idx < activeCharIndex;
            const isCurrent = isEpsilon ? currentStep.stepIndex === 0 : idx === activeCharIndex;
            const isPending = !isEpsilon && idx > activeCharIndex;

            let cellBg = 'bg-slate-800/70 text-slate-300 border-slate-700';
            if (isCurrent) {
              cellBg = 'bg-indigo-600/30 text-indigo-200 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105';
            } else if (isProcessed) {
              cellBg = 'bg-slate-900/40 text-slate-500 border-slate-800';
            } else if (isPending) {
              cellBg = 'bg-slate-800/40 text-slate-400 border-slate-700/50';
            }

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Pointer Arrow */}
                <div
                  className={`h-4 text-[10px] flex items-center justify-center font-bold transition-all duration-200 ${
                    isCurrent ? 'opacity-100 text-indigo-400 translate-y-0' : 'opacity-0 -translate-y-1'
                  }`}
                >
                  ▼
                </div>

                {/* Tape Cell */}
                <div
                  className={`w-10 h-11 flex items-center justify-center rounded-lg border font-mono text-base font-bold transition-all duration-200 ${cellBg}`}
                >
                  {char}
                </div>

                {/* Tape Index */}
                <span className="text-[10px] text-slate-500 font-mono mt-1">
                  {isEpsilon ? '0' : idx}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
        <div>
          Current State:{' '}
          <span className="font-mono font-bold text-sky-400">
            {currentStep.currentState}
          </span>{' '}
          ({currentStep.currentState === 'q00' ? 'Accepting' : currentStep.currentState === 'qtrap' ? 'Trap' : 'Non-accepting'})
        </div>
        <div>
          {currentStep.charIndex >= 0 ? (
            <span>
              Read symbol:{' '}
              <span className="font-mono font-bold text-amber-300">
                '{currentStep.currentChar}'
              </span>
            </span>
          ) : (
            <span className="italic text-slate-500">Initial State (no symbol read yet)</span>
          )}
        </div>
      </div>
    </div>
  );
};
