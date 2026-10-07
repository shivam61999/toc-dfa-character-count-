import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface SimulationControlsProps {
  isPlaying: boolean;
  currentStepIndex: number;
  totalSteps: number;
  playbackSpeed: number;
  onPlayPause: () => void;
  onStepNext: () => void;
  onStepPrev: () => void;
  onJumpStart: () => void;
  onJumpEnd: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isPlaying,
  currentStepIndex,
  totalSteps,
  playbackSpeed,
  onPlayPause,
  onStepNext,
  onStepPrev,
  onJumpStart,
  onJumpEnd,
  onReset,
  onSpeedChange,
}) => {
  const isAtStart = currentStepIndex === 0;
  const isAtEnd = currentStepIndex >= totalSteps - 1;

  const speeds = [0.5, 1, 1.5, 2, 3];

  return (
    <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
      {/* Step Info */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Step:</span>
        <span className="text-sm font-mono font-bold text-slate-200 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
          {currentStepIndex} / {Math.max(0, totalSteps - 1)}
        </span>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Jump to start */}
        <button
          onClick={onJumpStart}
          disabled={isAtStart || isPlaying}
          title="Jump to Start"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Step Prev */}
        <button
          onClick={onStepPrev}
          disabled={isAtStart || isPlaying}
          title="Step Backward (Left Arrow)"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={onPlayPause}
          disabled={isAtEnd && !isPlaying}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition shadow-lg ${
            isPlaying
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 disabled:opacity-50'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isAtEnd ? 'Completed' : 'Simulate'}</span>
            </>
          )}
        </button>

        {/* Step Next */}
        <button
          onClick={onStepNext}
          disabled={isAtEnd || isPlaying}
          title="Step Forward (Right Arrow)"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Jump to End */}
        <button
          onClick={onJumpEnd}
          disabled={isAtEnd || isPlaying}
          title="Jump to End"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-800 transition"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          title="Reset Simulation (R)"
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Speed Controls */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <span className="hidden sm:inline">Speed:</span>
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded text-xs font-mono transition ${
                playbackSpeed === s
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
