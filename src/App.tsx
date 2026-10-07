import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  DFADiagram,
} from './components/DFADiagram';
import { TapeVisualizer } from './components/TapeVisualizer';
import { SimulationControls } from './components/SimulationControls';
import { TransitionTable } from './components/TransitionTable';
import { InstantaneousDescription } from './components/InstantaneousDescription';
import { BatchTestingSuite } from './components/BatchTestingSuite';
import { AcademicGuide } from './components/AcademicGuide';
import { RandomStringModal } from './components/RandomStringModal';
import { DeploymentModal } from './components/DeploymentModal';
import { InstallAppModal } from './components/InstallAppModal';
import { simulateDFA, DFA_STATES } from './utils/dfaEngine';
import type { StateId, VerificationResult } from './types/automata';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Rocket,
  GraduationCap,
  ListFilter,
  Eye,
  Info,
  Download,
  WifiOff,
} from 'lucide-react';

export default function App() {
  const [inputString, setInputString] = useState<string>('aaabb');
  const [simulationResult, setSimulationResult] = useState<VerificationResult>(() =>
    simulateDFA('aaabb')
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'simulator' | 'suite' | 'academic'>('simulator');
  const [isRandomModalOpen, setIsRandomModalOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    }
    return false;
  });
  const [isOffline, setIsOffline] = useState<boolean>(() => !navigator.onLine);
  const [selectedStateInfo, setSelectedStateInfo] = useState<StateId | null>(null);

  // Listen for PWA install and offline events
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const timerRef = useRef<number | null>(null);

  // Recalculate simulation whenever inputString changes
  const handleInputChange = (newStr: string) => {
    // Clean string (only lowercase letters, numbers, etc.)
    setInputString(newStr);
    const result = simulateDFA(newStr);
    setSimulationResult(result);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleSelectQuickPreset = (preset: string) => {
    handleInputChange(preset);
  };

  // Step controls
  const handleStepNext = () => {
    if (currentStepIndex < simulationResult.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleStepPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleJumpStart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleJumpEnd = () => {
    setIsPlaying(false);
    setCurrentStepIndex(simulationResult.steps.length - 1);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const togglePlayPause = () => {
    if (currentStepIndex >= simulationResult.steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(150, 1000 / playbackSpeed);
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((curr) => {
          if (curr < simulationResult.steps.length - 1) {
            return curr + 1;
          } else {
            setIsPlaying(false);
            return curr;
          }
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, simulationResult.steps.length]);

  // Celebration confetti when final step reached and accepted
  const isFinalStep = currentStepIndex === simulationResult.steps.length - 1;
  useEffect(() => {
    if (isFinalStep && simulationResult.isAccepted) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#10b981', '#38bdf8', '#fbbf24', '#a855f7'],
        });
      } catch {
        // Safe fallback if canvas not available
      }
    }
  }, [isFinalStep, simulationResult.isAccepted]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepPrev();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const currentStep = simulationResult.steps[currentStepIndex] || simulationResult.steps[0];
  const activeSymbol = currentStep.transitionSymbol;
  const previousState = currentStep.previousState;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* ---------------- Top Navbar ---------------- */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <span className="font-mono font-black text-white text-base">δ</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Exact Character Count DFA Validator
                <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full font-mono">
                  TOC TAE
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-mono">
                L = {'{'} w ∈ {'{'}a,b{'}'}* | |w|ₐ = 3m and |w|_b = 2n, m,n ≥ 0 {'}'}
              </p>
            </div>
          </div>

          {/* Navigation & Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                  activeTab === 'simulator'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulator</span>
              </button>
              <button
                onClick={() => setActiveTab('suite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                  activeTab === 'suite'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Test Suite</span>
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
                  activeTab === 'academic'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">TAE Dossier</span>
              </button>
            </div>

            {/* Install Offline App Button */}
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition"
              title="Install on Android or Desktop for 100% offline access"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isInstalled ? 'App Installed' : 'Install App'}</span>
              <span className="sm:hidden">Install</span>
            </button>

            {/* Deploy Guide Button */}
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-2 rounded-xl shadow-lg shadow-emerald-600/20 transition"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Deploy</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Main Container ---------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Offline Status Alert Banner */}
        {isOffline && (
          <div className="bg-emerald-950/60 border border-emerald-500/50 p-3 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><b>Offline Mode Active:</b> You are currently offline. All DFA computations, simulations, and test cases are running locally with zero internet required!</span>
            </div>
            <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700 font-mono">
              Offline Ready
            </span>
          </div>
        )}

        {/* String Input Bar & Presets */}
        <section className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Test Input String (w ∈ Σ*)</span>
              <span className="text-slate-500 font-normal font-sans lowercase">
                (allowed alphabet: 'a', 'b')
              </span>
            </label>
            <div className="text-xs text-slate-400 font-mono">
              Shortcuts: [Space] Simulate | [←] [→] Step | [R] Reset
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                value={inputString}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter string of 'a' and 'b' (e.g. aaabb, bbaaa, aaaaaabb)"
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 font-mono text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-600 outline-none transition"
              />
              {inputString.length > 0 && (
                <button
                  onClick={() => handleInputChange('')}
                  title="Clear (Set to empty string ε)"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded bg-slate-800 font-mono"
                >
                  Clear (ε)
                </button>
              )}
            </div>

            <button
              onClick={() => setIsRandomModalOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3.5 py-2.5 rounded-xl text-xs font-medium transition shrink-0"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Random Generator</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <span className="text-[11px] font-medium mr-1 text-slate-500">Quick Test Cases:</span>
            {[
              { label: 'ε (Empty)', val: '' },
              { label: 'aaabb (m=1, n=1)', val: 'aaabb' },
              { label: 'bbaaa (Interleaved)', val: 'bbaaa' },
              { label: 'bb (m=0, n=1)', val: 'bb' },
              { label: 'aaa (m=1, n=0)', val: 'aaa' },
              { label: 'aaaaaabb (m=2, n=1)', val: 'aaaaaabb' },
              { label: 'aaabbbb (m=1, n=2)', val: 'aaabbbb' },
              { label: 'a (Reject)', val: 'a' },
              { label: 'b (Reject)', val: 'b' },
              { label: 'aabb (Na mod 3 ≠ 0)', val: 'aabb' },
              { label: 'aaab (Nb mod 2 ≠ 0)', val: 'aaab' },
              { label: 'aaabbc (Trap)', val: 'aaabbc' },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuickPreset(p.val)}
                className={`px-2 py-1 rounded-md font-mono text-[11px] transition ${
                  inputString === p.val
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Real-time Verdict Status Banner */}
        <section
          className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
            simulationResult.isAccepted
              ? 'bg-emerald-950/30 border-emerald-500/40 shadow-emerald-950/20 shadow-xl'
              : simulationResult.hasInvalidChars
              ? 'bg-rose-950/30 border-rose-500/40 shadow-rose-950/20 shadow-xl'
              : 'bg-amber-950/20 border-amber-500/40 shadow-amber-950/20 shadow-xl'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {simulationResult.isAccepted ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : simulationResult.hasInvalidChars ? (
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-bold tracking-wide uppercase ${
                      simulationResult.isAccepted
                        ? 'text-emerald-300'
                        : simulationResult.hasInvalidChars
                        ? 'text-rose-300'
                        : 'text-amber-300'
                    }`}
                  >
                    {simulationResult.isAccepted
                      ? 'String Accepted by DFA'
                      : simulationResult.hasInvalidChars
                      ? 'String Rejected: Invalid Alphabet'
                      : 'String Rejected by DFA'}
                  </span>
                  <span className="text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700 font-mono text-slate-300">
                    Halted in: {DFA_STATES[simulationResult.finalState].label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {simulationResult.explanation}
                </p>
              </div>
            </div>

            {/* Invariant Chips */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
                <div className="text-[10px] text-slate-500 font-sans uppercase">Na Counter</div>
                <div className="text-sky-400 font-bold">
                  {simulationResult.countA} = 3×{simulationResult.multiplierM} + {simulationResult.remainderA}
                </div>
              </div>
              <div className="bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
                <div className="text-[10px] text-slate-500 font-sans uppercase">Nb Counter</div>
                <div className="text-amber-400 font-bold">
                  {simulationResult.countB} = 2×{simulationResult.multiplierN} + {simulationResult.remainderB}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Tab Content ---------------- */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Visual Tape & Head */}
            <TapeVisualizer
              inputString={inputString}
              currentStep={currentStep}
              totalSteps={simulationResult.steps.length}
            />

            {/* Step Controls */}
            <SimulationControls
              isPlaying={isPlaying}
              currentStepIndex={currentStepIndex}
              totalSteps={simulationResult.steps.length}
              playbackSpeed={playbackSpeed}
              onPlayPause={togglePlayPause}
              onStepNext={handleStepNext}
              onStepPrev={handleStepPrev}
              onJumpStart={handleJumpStart}
              onJumpEnd={handleJumpEnd}
              onReset={handleReset}
              onSpeedChange={setPlaybackSpeed}
            />

            {/* SVG Interactive State Diagram */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-400" />
                  Live DFA Graph Visualization (Click any state node to inspect formal invariant)
                </span>
                <span>Active Edge pulse indicates live character read</span>
              </div>
              <DFADiagram
                currentState={currentStep.currentState}
                previousState={previousState}
                activeSymbol={activeSymbol}
                onSelectState={(st) => setSelectedStateInfo(st)}
                showTrapState={simulationResult.hasInvalidChars || currentStep.currentState === 'qtrap'}
              />
            </div>

            {/* Grid of Formal Math and Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InstantaneousDescription
                steps={simulationResult.steps}
                currentStepIndex={currentStepIndex}
              />
              <TransitionTable
                currentState={currentStep.currentState}
                activeSymbol={activeSymbol}
                showTrapState={simulationResult.hasInvalidChars || currentStep.currentState === 'qtrap'}
              />
            </div>
          </div>
        )}

        {activeTab === 'suite' && (
          <BatchTestingSuite
            onLoadTest={(testVal) => {
              handleInputChange(testVal);
              setActiveTab('simulator');
            }}
          />
        )}

        {activeTab === 'academic' && <AcademicGuide />}
      </main>

      {/* Selected State Inspect Modal / Popup */}
      {selectedStateInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>State Information: {DFA_STATES[selectedStateInfo].label}</span>
                {DFA_STATES[selectedStateInfo].isAccept && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                    Accepting State
                  </span>
                )}
              </h3>
              <button
                onClick={() => setSelectedStateInfo(null)}
                className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {DFA_STATES[selectedStateInfo].description}
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
              <div>Remainder Nₐ mod 3: <b>{DFA_STATES[selectedStateInfo].aRemainder}</b></div>
              <div>Remainder Nb mod 2: <b>{DFA_STATES[selectedStateInfo].bRemainder}</b></div>
              <div>Start State: <b>{DFA_STATES[selectedStateInfo].isStart ? 'Yes (Initial)' : 'No'}</b></div>
              <div>Accepting State: <b>{DFA_STATES[selectedStateInfo].isAccept ? 'Yes (F = {q0,0})' : 'No'}</b></div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <RandomStringModal
        isOpen={isRandomModalOpen}
        onClose={() => setIsRandomModalOpen(false)}
        onSelectString={(str) => handleInputChange(str)}
      />

      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallClick={handleInstallClick}
        isInstalled={isInstalled}
      />

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Theory of Computation (TOC) TAE Project &bull; Exact Character Count DFA (3m, 2n)</span>
          <span>Ready for GitHub, Vercel & Render &bull; 100% Client-Side React + Vite</span>
        </div>
      </footer>
    </div>
  );
}
