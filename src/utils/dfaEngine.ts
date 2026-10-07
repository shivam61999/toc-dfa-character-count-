import type { StateId, StateInfo, AlphabetSymbol, SimulationStep, VerificationResult, TestCase } from '../types/automata';

export const DFA_STATES: Record<StateId, StateInfo> = {
  q00: {
    id: 'q00',
    label: 'q₀,₀',
    subscript: '0,0',
    name: 'State (0, 0)',
    aRemainder: 0,
    bRemainder: 0,
    isStart: true,
    isAccept: true,
    description: "Accepting State: Count of 'a's ≡ 0 (mod 3) and Count of 'b's ≡ 0 (mod 2).",
    x: 160,
    y: 130,
  },
  q10: {
    id: 'q10',
    label: 'q₁,₀',
    subscript: '1,0',
    name: 'State (1, 0)',
    aRemainder: 1,
    bRemainder: 0,
    isStart: false,
    isAccept: false,
    description: "Non-accepting: Count of 'a's ≡ 1 (mod 3) and Count of 'b's ≡ 0 (mod 2).",
    x: 420,
    y: 130,
  },
  q20: {
    id: 'q20',
    label: 'q₂,₀',
    subscript: '2,0',
    name: 'State (2, 0)',
    aRemainder: 2,
    bRemainder: 0,
    isStart: false,
    isAccept: false,
    description: "Non-accepting: Count of 'a's ≡ 2 (mod 3) and Count of 'b's ≡ 0 (mod 2).",
    x: 680,
    y: 130,
  },
  q01: {
    id: 'q01',
    label: 'q₀,₁',
    subscript: '0,1',
    name: 'State (0, 1)',
    aRemainder: 0,
    bRemainder: 1,
    isStart: false,
    isAccept: false,
    description: "Non-accepting: Count of 'a's ≡ 0 (mod 3) and Count of 'b's ≡ 1 (mod 2).",
    x: 160,
    y: 370,
  },
  q11: {
    id: 'q11',
    label: 'q₁,₁',
    subscript: '1,1',
    name: 'State (1, 1)',
    aRemainder: 1,
    bRemainder: 1,
    isStart: false,
    isAccept: false,
    description: "Non-accepting: Count of 'a's ≡ 1 (mod 3) and Count of 'b's ≡ 1 (mod 2).",
    x: 420,
    y: 370,
  },
  q21: {
    id: 'q21',
    label: 'q₂,₁',
    subscript: '2,1',
    name: 'State (2, 1)',
    aRemainder: 2,
    bRemainder: 1,
    isStart: false,
    isAccept: false,
    description: "Non-accepting: Count of 'a's ≡ 2 (mod 3) and Count of 'b's ≡ 1 (mod 2).",
    x: 680,
    y: 370,
  },
  qtrap: {
    id: 'qtrap',
    label: 'q_trap',
    subscript: 'trap',
    name: 'Trap State (Dead State)',
    aRemainder: -1,
    bRemainder: -1,
    isStart: false,
    isAccept: false,
    description: 'Dead State: Input contained characters outside the alphabet Σ = {a, b}.',
    x: 880,
    y: 250,
  },
};

export const TRANSITION_TABLE: Record<StateId, Record<AlphabetSymbol, StateId>> = {
  q00: { a: 'q10', b: 'q01' },
  q10: { a: 'q20', b: 'q11' },
  q20: { a: 'q00', b: 'q21' },
  q01: { a: 'q11', b: 'q00' },
  q11: { a: 'q21', b: 'q10' },
  q21: { a: 'q01', b: 'q20' },
  qtrap: { a: 'qtrap', b: 'qtrap' },
};

/**
 * Transition function δ(q, σ)
 */
export function transition(currentState: StateId, symbol: string): StateId {
  if (currentState === 'qtrap') {
    return 'qtrap';
  }
  if (symbol === 'a' || symbol === 'b') {
    return TRANSITION_TABLE[currentState][symbol];
  }
  // Any symbol outside {a, b} leads to trap state
  return 'qtrap';
}

/**
 * Validates a string and produces complete step-by-step DFA execution trace
 */
export function simulateDFA(inputString: string): VerificationResult {
  const steps: SimulationStep[] = [];
  const invalidCharsFound: string[] = [];

  let currentState: StateId = 'q00';
  let countA = 0;
  let countB = 0;

  // Step 0: Initial configuration before reading any character
  steps.push({
    stepIndex: 0,
    currentChar: null,
    charIndex: -1,
    currentState: 'q00',
    previousState: null,
    transitionSymbol: null,
    countA: 0,
    countB: 0,
    remainderA: 0,
    remainderB: 0,
    multiplierM: 0,
    multiplierN: 0,
    isAlphabetValid: true,
    instantaneousDescription: `(q₀,₀, ${inputString === '' ? 'ε' : inputString})`,
  });

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    const prev = currentState;
    const isCharValid = char === 'a' || char === 'b';

    if (!isCharValid && !invalidCharsFound.includes(char)) {
      invalidCharsFound.push(char);
    }

    if (char === 'a') countA++;
    if (char === 'b') countB++;

    currentState = transition(currentState, char);

    const remainderA = countA % 3;
    const remainderB = countB % 2;
    const multiplierM = Math.floor(countA / 3);
    const multiplierN = Math.floor(countB / 2);
    const remainingTape = inputString.slice(i + 1) || 'ε';

    steps.push({
      stepIndex: i + 1,
      currentChar: char,
      charIndex: i,
      currentState,
      previousState: prev,
      transitionSymbol: char,
      countA,
      countB,
      remainderA,
      remainderB,
      multiplierM,
      multiplierN,
      isAlphabetValid: isCharValid,
      instantaneousDescription: `(q${currentState.replace('q', '')}, ${remainingTape})`,
    });
  }

  const remainderA = countA % 3;
  const remainderB = countB % 2;
  const multiplierM = Math.floor(countA / 3);
  const multiplierN = Math.floor(countB / 2);
  const hasInvalidChars = invalidCharsFound.length > 0;
  const isAccepted = currentState === 'q00' && !hasInvalidChars;

  let explanation = '';
  if (hasInvalidChars) {
    explanation = `REJECTED: The input string contains illegal characters [${invalidCharsFound.join(', ')}] outside alphabet Σ = {a, b}. The automaton transitioned to the dead/trap state (q_trap).`;
  } else if (isAccepted) {
    explanation = `ACCEPTED: Count of 'a's is ${countA} (= 3 × ${multiplierM}) and count of 'b's is ${countB} (= 2 × ${multiplierN}) for non-negative integers m = ${multiplierM}, n = ${multiplierN}. Machine halted in accepting state q₀,₀.`;
  } else {
    const reasons: string[] = [];
    if (remainderA !== 0) {
      reasons.push(`Count of 'a's is ${countA} (3 × ${multiplierM} + ${remainderA}), remainder ${remainderA} ≠ 0`);
    }
    if (remainderB !== 0) {
      reasons.push(`Count of 'b's is ${countB} (2 × ${multiplierN} + ${remainderB}), remainder ${remainderB} ≠ 0`);
    }
    explanation = `REJECTED: ${reasons.join(' and ')}. Machine halted in non-accepting state ${DFA_STATES[currentState].label}.`;
  }

  return {
    inputString,
    totalLength: inputString.length,
    countA,
    countB,
    remainderA,
    remainderB,
    multiplierM,
    multiplierN,
    isAccepted,
    finalState: currentState,
    hasInvalidChars,
    invalidCharsFound,
    explanation,
    steps,
  };
}

/**
 * Generate formatted mathematical trace
 */
export function formatTraceMathematical(steps: SimulationStep[]): string {
  if (steps.length === 0) return '';
  return steps.map((s) => s.instantaneousDescription).join(' ⊢ ');
}

/**
 * Pre-defined Comprehensive Test Cases for TOC TAE
 */
export const DEFAULT_TEST_CASES: TestCase[] = [
  // Base & Empty String
  {
    id: 'tc-01',
    name: 'Empty String (ε)',
    input: '',
    expectedResult: true,
    category: 'base',
    description: 'm = 0, n = 0 → 0 "a"s (3×0) and 0 "b"s (2×0). Must be accepted!',
  },
  {
    id: 'tc-02',
    name: 'Minimal Accepted (a³ b²)',
    input: 'aaabb',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 1 → 3 "a"s and 2 "b"s. Standard accepting order.',
  },
  {
    id: 'tc-03',
    name: 'Inverted Order (b² a³)',
    input: 'bbaaa',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 1 → 2 "b"s followed by 3 "a"s. Order is irrelevant for modulo count.',
  },
  {
    id: 'tc-04',
    name: 'Interleaved (a b a b a)',
    input: 'ababa',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 1 → 3 "a"s and 2 "b"s interleaved.',
  },
  {
    id: 'tc-05',
    name: 'Only b\'s (m = 0, n = 1)',
    input: 'bb',
    expectedResult: true,
    category: 'valid',
    description: 'm = 0, n = 1 → 0 "a"s (3×0) and 2 "b"s (2×1).',
  },
  {
    id: 'tc-06',
    name: 'Only a\'s (m = 1, n = 0)',
    input: 'aaa',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 0 → 3 "a"s (3×1) and 0 "b"s (2×0).',
  },
  {
    id: 'tc-07',
    name: 'Higher Multiplier (a⁶ b²)',
    input: 'aaaaaabb',
    expectedResult: true,
    category: 'valid',
    description: 'm = 2, n = 1 → 6 "a"s (3×2) and 2 "b"s (2×1).',
  },
  {
    id: 'tc-08',
    name: 'Higher Multiplier (a³ b⁴)',
    input: 'aaabbbb',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 2 → 3 "a"s (3×1) and 4 "b"s (2×2).',
  },
  {
    id: 'tc-09',
    name: 'Complex Interleaving (b a a b b b a)',
    input: 'baabbba',
    expectedResult: true,
    category: 'valid',
    description: 'm = 1, n = 2 → 3 "a"s and 4 "b"s distributed irregularly.',
  },
  {
    id: 'tc-10',
    name: 'Large Multiplier (a⁶ b⁴)',
    input: 'aaaaaabbbb',
    expectedResult: true,
    category: 'valid',
    description: 'm = 2, n = 2 → 6 "a"s and 4 "b"s.',
  },
  // Invalid due to 'a' count
  {
    id: 'tc-11',
    name: 'Single "a"',
    input: 'a',
    expectedResult: false,
    category: 'invalid_a',
    description: 'Count of "a" = 1 (1 mod 3 ≠ 0), count of "b" = 0. Halts in q₁,₀.',
  },
  {
    id: 'tc-12',
    name: 'Two "a"s',
    input: 'aa',
    expectedResult: false,
    category: 'invalid_a',
    description: 'Count of "a" = 2 (2 mod 3 ≠ 0), count of "b" = 0. Halts in q₂,₀.',
  },
  {
    id: 'tc-13',
    name: 'Valid b, Deficient a (a² b²)',
    input: 'aabb',
    expectedResult: false,
    category: 'invalid_a',
    description: 'Count of "b" is 2 (valid), but count of "a" is 2 (needs 3m). Halts in q₂,₀.',
  },
  {
    id: 'tc-14',
    name: 'Valid b, Excess a (a⁴ b²)',
    input: 'aaaabb',
    expectedResult: false,
    category: 'invalid_a',
    description: 'Count of "a" is 4 (4 mod 3 = 1), count of "b" is 2. Halts in q₁,₀.',
  },
  // Invalid due to 'b' count
  {
    id: 'tc-15',
    name: 'Single "b"',
    input: 'b',
    expectedResult: false,
    category: 'invalid_b',
    description: 'Count of "b" = 1 (1 mod 2 ≠ 0), count of "a" = 0. Halts in q₀,₁.',
  },
  {
    id: 'tc-16',
    name: 'Odd "b"s (b³)',
    input: 'bbb',
    expectedResult: false,
    category: 'invalid_b',
    description: 'Count of "b" = 3 (odd), count of "a" = 0. Halts in q₀,₁.',
  },
  {
    id: 'tc-17',
    name: 'Valid a, Deficient b (a³ b)',
    input: 'aaab',
    expectedResult: false,
    category: 'invalid_b',
    description: 'Count of "a" is 3 (valid), but count of "b" is 1 (needs 2n). Halts in q₀,₁.',
  },
  {
    id: 'tc-18',
    name: 'Valid a, Odd b (a³ b³)',
    input: 'aaabbb',
    expectedResult: false,
    category: 'invalid_b',
    description: 'Count of "a" is 3 (valid), but count of "b" is 3 (odd). Halts in q₀,₁.',
  },
  // Invalid due to both
  {
    id: 'tc-19',
    name: 'Single "a" and Single "b"',
    input: 'ab',
    expectedResult: false,
    category: 'invalid_both',
    description: 'Count of "a" = 1, Count of "b" = 1. Halts in q₁,₁.',
  },
  {
    id: 'tc-20',
    name: 'Two "a"s and Single "b"',
    input: 'aab',
    expectedResult: false,
    category: 'invalid_both',
    description: 'Count of "a" = 2, Count of "b" = 1. Halts in q₂,₁.',
  },
  {
    id: 'tc-21',
    name: 'Four "a"s and Three "b"s',
    input: 'aaaabbb',
    expectedResult: false,
    category: 'invalid_both',
    description: 'Count of "a" = 4 (1 mod 3), Count of "b" = 3 (1 mod 2). Halts in q₁,₁.',
  },
  // Invalid Alphabet Symbols (Trap State)
  {
    id: 'tc-22',
    name: 'Invalid Character "c"',
    input: 'aaabbc',
    expectedResult: false,
    category: 'invalid_char',
    description: 'Symbol "c" is outside alphabet Σ = {a, b}. Diverts to q_trap.',
  },
  {
    id: 'tc-23',
    name: 'Invalid Digits "123"',
    input: 'a3b2',
    expectedResult: false,
    category: 'invalid_char',
    description: 'Numbers in string are non-alphabet symbols. Diverts to q_trap.',
  },
  {
    id: 'tc-24',
    name: 'Spaces in String',
    input: 'aaa bb',
    expectedResult: false,
    category: 'invalid_char',
    description: 'Whitespace is not an accepted token in alphabet Σ = {a, b}.',
  },
];

/**
 * Generates a random valid or invalid string
 */
export function generateRandomString(options: {
  mode: 'valid' | 'invalid_a' | 'invalid_b' | 'invalid_both';
  multiplierM?: number;
  multiplierN?: number;
}): string {
  const m = options.multiplierM ?? Math.floor(Math.random() * 3) + 1; // 1 to 3
  const n = options.multiplierN ?? Math.floor(Math.random() * 3) + 1; // 1 to 3

  let numA = 3 * m;
  let numB = 2 * n;

  if (options.mode === 'invalid_a') {
    numA += Math.random() > 0.5 ? 1 : 2;
  } else if (options.mode === 'invalid_b') {
    numB += 1;
  } else if (options.mode === 'invalid_both') {
    numA += Math.random() > 0.5 ? 1 : 2;
    numB += 1;
  }

  const chars: string[] = [];
  for (let i = 0; i < numA; i++) chars.push('a');
  for (let i = 0; i < numB; i++) chars.push('b');

  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}
