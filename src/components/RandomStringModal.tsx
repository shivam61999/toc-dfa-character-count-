import React, { useState } from 'react';
import { generateRandomString } from '../utils/dfaEngine';
import { Sparkles, X, Shuffle, Check } from 'lucide-react';

interface RandomStringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectString: (generated: string) => void;
}

export const RandomStringModal: React.FC<RandomStringModalProps> = ({
  isOpen,
  onClose,
  onSelectString,
}) => {
  const [mode, setMode] = useState<'valid' | 'invalid_a' | 'invalid_b' | 'invalid_both'>('valid');
  const [multiplierM, setMultiplierM] = useState<number>(1);
  const [multiplierN, setMultiplierN] = useState<number>(1);
  const [previewString, setPreviewString] = useState<string>('aaabb');

  if (!isOpen) return null;

  const handleGenerate = () => {
    const generated = generateRandomString({
      mode,
      multiplierM,
      multiplierN,
    });
    setPreviewString(generated);
  };

  const handleApply = () => {
    onSelectString(previewString);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-semibold text-slate-100">
              Random Test String Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Generator Controls */}
        <div className="space-y-4 text-xs">
          {/* Target type */}
          <div>
            <label className="block text-slate-400 font-medium mb-1.5">
              Generation Target:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('valid')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  mode === 'valid'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-emerald-400">Valid String (3m, 2n)</div>
                <div className="text-[10px] text-slate-400">Na = 3m, Nb = 2n</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('invalid_a')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  mode === 'invalid_a'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-rose-400">Invalid 'a's (Na ≠ 3m)</div>
                <div className="text-[10px] text-slate-400">Valid 'b's, defective 'a's</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('invalid_b')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  mode === 'invalid_b'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-rose-400">Invalid 'b's (Nb ≠ 2n)</div>
                <div className="text-[10px] text-slate-400">Valid 'a's, defective 'b's</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('invalid_both')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  mode === 'invalid_both'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-rose-400">Both Invalid</div>
                <div className="text-[10px] text-slate-400">Both fail modulo</div>
              </button>
            </div>
          </div>

          {/* Multipliers */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>
              <label className="block text-sky-400 font-semibold mb-1">
                m Multiplier (Count 'a' = 3 × m):
              </label>
              <select
                value={multiplierM}
                onChange={(e) => setMultiplierM(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              >
                {[0, 1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    m = {val} ({3 * val} 'a's base)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-amber-400 font-semibold mb-1">
                n Multiplier (Count 'b' = 2 × n):
              </label>
              <select
                value={multiplierN}
                onChange={(e) => setMultiplierN(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              >
                {[0, 1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    n = {val} ({2 * val} 'b's base)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generated Result Preview */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold">Generated String Preview:</span>
              <span className="font-mono text-[11px]">
                Len: {previewString.length} | a: {(previewString.match(/a/g) || []).length} | b:{' '}
                {(previewString.match(/b/g) || []).length}
              </span>
            </div>
            <div className="font-mono text-sm bg-slate-900 p-2 rounded border border-slate-800 text-indigo-300 break-all select-all min-h-[36px] flex items-center">
              {previewString === '' ? 'ε (empty string)' : previewString}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Generate New</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            <Check className="w-4 h-4" />
            <span>Use String</span>
          </button>
        </div>
      </div>
    </div>
  );
};
