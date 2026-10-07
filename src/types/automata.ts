export type StateId = 'q00' | 'q10' | 'q20' | 'q01' | 'q11' | 'q21' | 'qtrap';

export type AlphabetSymbol = 'a' | 'b';

export interface StateInfo {
  id: StateId;
  label: string;
  subscript: string;
  name: string;
  aRemainder: number; // 0, 1, 2
  bRemainder: number; // 0, 1
  isStart: boolean;
  isAccept: boolean;
  description: string;
  x: number; // For diagram layout
  y: number; // For diagram layout
}

export interface TransitionEdge {
  from: StateId;
  to: StateId;
  symbol: AlphabetSymbol;
  label: string;
}

export interface SimulationStep {
  stepIndex: number;
  currentChar: string | null;
  charIndex: number; // -1 for initial state
  currentState: StateId;
  previousState: StateId | null;
  transitionSymbol: string | null;
  countA: number;
  countB: number;
  remainderA: number;
  remainderB: number;
  multiplierM: number;
  multiplierN: number;
  isAlphabetValid: boolean;
  instantaneousDescription: string;
}

export interface VerificationResult {
  inputString: string;
  totalLength: number;
  countA: number;
  countB: number;
  remainderA: number;
  remainderB: number;
  multiplierM: number; // countA / 3 if remainderA == 0, else floor
  multiplierN: number; // countB / 2 if remainderB == 0, else floor
  isAccepted: boolean;
  finalState: StateId;
  hasInvalidChars: boolean;
  invalidCharsFound: string[];
  explanation: string;
  steps: SimulationStep[];
}

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedResult: boolean;
  category: 'base' | 'valid' | 'invalid_a' | 'invalid_b' | 'invalid_both' | 'invalid_char';
  description: string;
}
