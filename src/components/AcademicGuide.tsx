import React, { useState } from 'react';
import { BookOpen, GraduationCap, ChevronDown, ChevronUp, Download, CheckCircle, Award } from 'lucide-react';

export const AcademicGuide: React.FC = () => {
  const [openVivaId, setOpenVivaId] = useState<number | null>(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const vivaQuestions = [
    {
      q: 'Why does this DFA require exactly 6 states, and is it minimal?',
      a: 'The language requires tracking two independent modular counters: Nₐ(w) mod 3 (which has 3 distinct residues: 0, 1, 2) and N_b(w) mod 2 (which has 2 distinct residues: 0, 1). By the Cartesian Product Automaton theorem, the state space is Q = Qₐ × Q_b, giving 3 × 2 = 6 states. By the Myhill-Nerode Theorem, every pair of these 6 states is pairwise distinguishable by a distinguishing string z ∈ {a, b}*. For instance, between q₁,₀ and q₂,₀, the distinguishing string z = "aa" leads q₁,₀ to q₀,₀ (Accept) but q₂,₀ to q₁,₀ (Reject). Hence, the DFA is strictly minimal and cannot be compressed further.',
    },
    {
      q: 'Is the empty string ε accepted by this automaton?',
      a: 'Yes. For w = ε (length 0), the count of "a"s is Nₐ = 0 and count of "b"s is N_b = 0. Since 0 = 3 × 0 (m = 0) and 0 = 2 × 0 (n = 0), both conditions are satisfied with non-negative integers m = 0, n = 0. Consequently, the initial state q₀,₀ is designated as an accepting state.',
    },
    {
      q: 'Does the relative order or arrangement of "a"s and "b"s affect acceptance?',
      a: 'No. The transition function δ acts commutatively with respect to the final state: reading "ab" yields δ(q₀,₀, ab) = δ(q₁,₀, b) = q₁,₁, while reading "ba" yields δ(q₀,₀, ba) = δ(q₀,₁, a) = q₁,₁. Modulo addition is abelian (commutative), so any permutation of an accepted string (e.g., "aaabb", "bbaaa", "ababa") halts in the exact same state q₀,₀.',
    },
    {
      q: 'Can this language be accepted by an NFA with fewer than 6 states?',
      a: 'No. The Myhill-Nerode equivalence relation is a fundamental algebraic property of the regular language itself, establishing that the language has index 6. While NFAs can sometimes be exponentially smaller than DFAs for certain non-deterministic choices, modular counting over independent alphabets yields an irreducible product structure. Any NFA recognizing this exact language must also possess at least 6 states.',
    },
    {
      q: 'How are invalid characters (not in Σ = {a, b}) formally handled?',
      a: 'In standard formal automata theory over alphabet Σ = {a, b}, strings containing foreign symbols are not in Σ* and are syntactically rejected. In robust software implementation, this is modeled via a Dead / Trap State (q_trap): any symbol σ ∉ {a, b} triggers δ(q, σ) = q_trap, with self-loop δ(q_trap, ·) = q_trap. The trap state is non-accepting.',
    },
    {
      q: 'What are the 6 Myhill-Nerode equivalence classes?',
      a: 'The equivalence classes [w] are defined by (Nₐ(w) mod 3, N_b(w) mod 2): [ε] = {w | Nₐ ≡ 0 mod 3, N_b ≡ 0 mod 2}, [a] = {w | Nₐ ≡ 1 mod 3, N_b ≡ 0 mod 2}, [aa] = {w | Nₐ ≡ 2 mod 3, N_b ≡ 0 mod 2}, [b] = {w | Nₐ ≡ 0 mod 3, N_b ≡ 1 mod 2}, [ab] = {w | Nₐ ≡ 1 mod 3, N_b ≡ 1 mod 2}, [aab] = {w | Nₐ ≡ 2 mod 3, N_b ≡ 1 mod 2}.',
    },
  ];

  const handleExportMarkdown = () => {
    const markdownContent = `# TOC TAE Project Report: Exact Character Count DFA Validator
**Problem Statement:** Design and implement a Deterministic Finite Automaton (DFA) that accepts all strings over alphabet Σ = {a, b} where the count of 'a's is 3m and count of 'b's is 2n for non-negative integers m, n.

## 1. Formal 5-Tuple Definition
The DFA is formally defined as M = (Q, Σ, δ, q₀, F):
- **States (Q):** { q₀,₀, q₁,₀, q₂,₀, q₀,₁, q₁,₁, q₂,₁ } where q_{i,j} tracks (Nₐ mod 3 = i, N_b mod 2 = j)
- **Alphabet (Σ):** { a, b }
- **Start State (q₀):** q₀,₀
- **Accepting States (F):** { q₀,₀ }
- **Transition Function (δ):**
  - δ(q_{i,j}, a) = q_{(i+1) mod 3, j}
  - δ(q_{i,j}, b) = q_{i, (j+1) mod 2}

## 2. State Transition Table
| Current State | Input 'a' | Input 'b' | Description |
|---------------|-----------|-----------|-------------|
| -> * q₀,₀     | q₁,₀      | q₀,₁      | Na ≡ 0 mod 3, Nb ≡ 0 mod 2 (Initial & Final) |
|      q₁,₀     | q₂,₀      | q₁,₁      | Na ≡ 1 mod 3, Nb ≡ 0 mod 2 |
|      q₂,₀     | q₀,₀      | q₂,₁      | Na ≡ 2 mod 3, Nb ≡ 0 mod 2 |
|      q₀,₁     | q₁,₁      | q₀,₀      | Na ≡ 0 mod 3, Nb ≡ 1 mod 2 |
|      q₁,₁     | q₂,₁      | q₁,₀      | Na ≡ 1 mod 3, Nb ≡ 1 mod 2 |
|      q₂,₁     | q₀,₁      | q₂,₀      | Na ≡ 2 mod 3, Nb ≡ 1 mod 2 |

## 3. Minimality Proof (Myhill-Nerode)
All 6 states are pairwise distinguishable:
- Between different 'b' remainders: string z = ε distinguishes accept vs non-accept if one has (0,0), or z = "b" toggles Nb.
- Between different 'a' remainders: distinguishing suffix z ∈ {"a", "aa"} bridges remainder to 0.
Therefore, the index of the language is 6, proving 6 states is strictly minimal.

## 4. Cartesian Product Machine
Let M₁ = (Q₁, Σ, δ₁, q₀₁, F₁) count 'a' mod 3 with 3 states.
Let M₂ = (Q₂, Σ, δ₂, q₀₂, F₂) count 'b' mod 2 with 2 states.
M = M₁ × M₂ accepts L(M₁) ∩ L(M₂), requiring |Q₁| × |Q₂| = 3 × 2 = 6 states.
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TOC_TAE_DFA_Character_Count_Report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              Theory of Computation (TOC) Academic & Viva Dossier
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono">
                TAE Ready
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Formal specifications, Cartesian product proof, Myhill-Nerode minimality, and oral exam Q&A
            </p>
          </div>
        </div>

        <button
          onClick={handleExportMarkdown}
          className="flex items-center gap-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Report Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export TAE Report (.md)</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Formal Theory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* 5-Tuple Definition */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Formal 5-Tuple Specification: M = (Q, Σ, δ, q₀, F)</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 leading-relaxed font-mono">
            <li>
              <b className="text-slate-100 font-sans">Q (States):</b> {'{'}q₀,₀, q₁,₀, q₂,₀, q₀,₁, q₁,₁, q₂,₁{'}'} (|Q| = 6)
            </li>
            <li>
              <b className="text-slate-100 font-sans">Σ (Alphabet):</b> {'{'}a, b{'}'}
            </li>
            <li>
              <b className="text-slate-100 font-sans">q₀ (Start State):</b> q₀,₀ (Nₐ ≡ 0 mod 3, Nb ≡ 0 mod 2)
            </li>
            <li>
              <b className="text-slate-100 font-sans">F (Accepting States):</b> {'{'}q₀,₀{'}'}
            </li>
            <li className="text-[11px] text-slate-400 font-sans pt-1">
              <b className="text-slate-200">Transition function:</b> δ(q_{'{i,j}'}, a) = q_{'{(i+1)%3, j}'} and δ(q_{'{i,j}'}, b) = q_{'{i, (j+1)%2}'}
            </li>
          </ul>
        </div>

        {/* Product Automaton */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <Award className="w-4 h-4" />
            <span>Cartesian Product Machine (M = M₁ × M₂)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            The language is the intersection of two regular languages:
          </p>
          <div className="bg-slate-900 p-2 rounded border border-slate-800 font-mono text-indigo-300 text-[11px]">
            L = L₁ ∩ L₂ = {'{'}w | Nₐ(w) ≡ 0 (mod 3){'}'} ∩ {'{'}w | Nb(w) ≡ 0 (mod 2){'}'}
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Since regular languages are closed under intersection, we build the cross-product DFA. 
            M₁ has 3 states and M₂ has 2 states. The product DFA requires exactly 3 × 2 = 6 states.
          </p>
        </div>
      </div>

      {/* Viva Voce Q&A Accordion */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span>TOC TAE Viva Voce / Presentation Model Q&A</span>
          <span className="text-xs text-slate-500 font-normal">
            (Click question to view detailed answer)
          </span>
        </h3>

        <div className="space-y-2">
          {vivaQuestions.map((item, idx) => {
            const isOpen = openVivaId === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenVivaId(isOpen ? null : idx)}
                  className="w-full p-3.5 flex items-center justify-between text-left gap-3 hover:bg-slate-900/60 transition"
                >
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-mono text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/30">
                    <p className="bg-slate-900/70 p-3 rounded-lg border border-slate-800/80 text-slate-300">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
