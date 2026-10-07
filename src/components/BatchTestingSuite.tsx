import React, { useState } from 'react';
import type { TestCase } from '../types/automata';
import { DEFAULT_TEST_CASES, simulateDFA } from '../utils/dfaEngine';
import { CheckCircle2, XCircle, Play, Plus, RefreshCw, Filter } from 'lucide-react';

interface BatchTestingSuiteProps {
  onLoadTest: (testInput: string) => void;
}

export const BatchTestingSuite: React.FC<BatchTestingSuiteProps> = ({ onLoadTest }) => {
  const [testCases, setTestCases] = useState<TestCase[]>(DEFAULT_TEST_CASES);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newString, setNewString] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Results cache for all test cases
  const results = testCases.map((tc) => {
    const sim = simulateDFA(tc.input);
    const passed = sim.isAccepted === tc.expectedResult;
    return {
      ...tc,
      actualResult: sim.isAccepted,
      passed,
      countA: sim.countA,
      countB: sim.countB,
      finalState: sim.finalState,
    };
  });

  const totalPassed = results.filter((r) => r.passed).length;
  const passRate = Math.round((totalPassed / results.length) * 100);

  const filteredResults = results.filter((r) => {
    if (filterCategory === 'all') return true;
    return r.category === filterCategory;
  });

  const handleAddCustomTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newString.trim() === '' && !window.confirm('Add empty string as test?')) return;

    // determine expected result based on count:
    const aCount = (newString.match(/a/g) || []).length;
    const bCount = (newString.match(/b/g) || []).length;
    const isOnlyAB = /^[ab]*$/.test(newString);
    const expected = isOnlyAB && aCount % 3 === 0 && bCount % 2 === 0;

    const newTestCase: TestCase = {
      id: `custom-${Date.now()}`,
      name: `Custom: "${newString}"`,
      input: newString,
      expectedResult: expected,
      category: expected ? 'valid' : 'invalid_both',
      description: newDesc || `Custom user test: Na=${aCount}, Nb=${bCount}`,
    };

    setTestCases([newTestCase, ...testCases]);
    setNewString('');
    setNewDesc('');
  };

  const handleResetToDefault = () => {
    setTestCases(DEFAULT_TEST_CASES);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-5">
      {/* Header and stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            Automated DFA Test Suite
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                passRate === 100
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              {passRate}% Pass Rate ({totalPassed}/{results.length})
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive verification against boundary conditions, modulo cycles, and edge cases
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Tests</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
        {[
          { id: 'all', label: 'All Tests' },
          { id: 'base', label: 'Base / ε' },
          { id: 'valid', label: 'Valid (3m, 2n)' },
          { id: 'invalid_a', label: "Invalid 'a' (Na ≠ 3m)" },
          { id: 'invalid_b', label: "Invalid 'b' (Nb ≠ 2n)" },
          { id: 'invalid_both', label: 'Both Invalid' },
          { id: 'invalid_char', label: 'Trap / Invalid Char' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterCategory(f.id)}
            className={`px-2.5 py-1 rounded-lg transition font-medium ${
              filterCategory === f.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Test List Table */}
      <div className="overflow-x-auto max-h-96 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-950 sticky top-0 text-slate-400 z-10">
            <tr className="border-b border-slate-800">
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Test Case</th>
              <th className="py-2.5 px-3">Input String (w)</th>
              <th className="py-2.5 px-3">Na / Nb</th>
              <th className="py-2.5 px-3">Expected</th>
              <th className="py-2.5 px-3">Actual</th>
              <th className="py-2.5 px-3">Halting State</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-mono">
            {filteredResults.map((tc) => (
              <tr
                key={tc.id}
                className="hover:bg-slate-800/30 transition group"
              >
                <td className="py-2 px-3">
                  {tc.passed ? (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-sans font-bold">PASS</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span className="text-[10px] font-sans font-bold">FAIL</span>
                    </div>
                  )}
                </td>
                <td className="py-2 px-3 font-sans">
                  <div className="font-medium text-slate-200">{tc.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{tc.description}</div>
                </td>
                <td className="py-2 px-3">
                  <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-indigo-300 font-bold">
                    {tc.input === '' ? 'ε (empty)' : tc.input}
                  </span>
                </td>
                <td className="py-2 px-3 text-slate-300">
                  <span className="text-sky-400 font-bold">{tc.countA}</span>a,{' '}
                  <span className="text-amber-400 font-bold">{tc.countB}</span>b
                </td>
                <td className="py-2 px-3 font-sans">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      tc.expectedResult
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {tc.expectedResult ? 'ACCEPT' : 'REJECT'}
                  </span>
                </td>
                <td className="py-2 px-3 font-sans">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      tc.actualResult
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {tc.actualResult ? 'ACCEPT' : 'REJECT'}
                  </span>
                </td>
                <td className="py-2 px-3 text-slate-400">
                  {tc.finalState}
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => onLoadTest(tc.input)}
                    className="inline-flex items-center gap-1 text-[11px] font-sans font-medium bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-2.5 py-1 rounded-md transition"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Load</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Custom Test Case Form */}
      <form
        onSubmit={handleAddCustomTest}
        className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center gap-3"
      >
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-indigo-400" />
          Add Custom Test String:
        </span>
        <input
          type="text"
          value={newString}
          onChange={(e) => setNewString(e.target.value)}
          placeholder="e.g. aaabb or aabb"
          className="bg-slate-900 border border-slate-700 text-slate-100 px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-500 flex-1 min-w-[140px]"
        />
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Optional description"
          className="bg-slate-900 border border-slate-700 text-slate-100 px-3 py-1.5 rounded-lg text-xs font-sans focus:outline-none focus:border-indigo-500 flex-1 min-w-[160px]"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition"
        >
          Add to Suite
        </button>
      </form>
    </div>
  );
};
