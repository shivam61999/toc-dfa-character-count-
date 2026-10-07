import React from 'react';
import type { StateId } from '../types/automata';
import { DFA_STATES } from '../utils/dfaEngine';

interface DFADiagramProps {
  currentState: StateId;
  previousState: StateId | null;
  activeSymbol: string | null;
  onSelectState?: (stateId: StateId) => void;
  showTrapState?: boolean;
}

export const DFADiagram: React.FC<DFADiagramProps> = ({
  currentState,
  previousState,
  activeSymbol,
  onSelectState,
  showTrapState = true,
}) => {
  // Coordinates for states:
  // Top row (b ≡ 0 mod 2): q00 (x:150, y:120), q10 (x:430, y:120), q20 (x:710, y:120)
  // Bottom row (b ≡ 1 mod 2): q01 (x:150, y:340), q11 (x:430, y:340), q21 (x:710, y:340)
  // Trap state (optional): qtrap (x:890, y:230)

  // Determine if a transition edge is active
  const isEdgeActive = (from: StateId, to: StateId, symbol: string) => {
    return previousState === from && currentState === to && activeSymbol === symbol;
  };

  return (
    <div className="w-full overflow-x-auto bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-2xl relative select-none">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center space-x-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-400"></span>
            Double Circle = Accept State (q₀,₀)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-sky-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            Blue Arrow = 'a' transition (+1 mod 3)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Amber Arrow = 'b' transition (+1 mod 2)
          </span>
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          Grid: Row 0 (b=even), Row 1 (b=odd) | Cols: a=0, a=1, a=2 (mod 3)
        </div>
      </div>

      <svg
        viewBox="0 0 960 460"
        className="w-full h-auto min-w-[700px] max-h-[460px] mx-auto filter drop-shadow-md"
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="arrow-a"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
          </marker>
          <marker
            id="arrow-a-active"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f2fe" />
          </marker>

          <marker
            id="arrow-b"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#fbbf24" />
          </marker>
          <marker
            id="arrow-b-active"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#fef08a" />
          </marker>

          <marker
            id="arrow-start"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#a78bfa" />
          </marker>

          <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Start State Indicator Arrow */}
        <g>
          <path
            d="M 60 120 L 110 120"
            stroke="#a78bfa"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrow-start)"
          />
          <text
            x="45"
            y="110"
            fill="#c4b5fd"
            fontSize="13"
            fontWeight="bold"
            fontFamily="monospace"
          >
            Start
          </text>
        </g>

        {/* ----------------- TRANSITION EDGES FOR 'a' (Horizontal) ----------------- */}
        {/* Row 0 'a' transitions: q00 -> q10 -> q20 -> q00 */}
        {/* q00 -> q10 (straight) */}
        <g className={isEdgeActive('q00', 'q10', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 190 110 L 390 110"
            stroke={isEdgeActive('q00', 'q10', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q00', 'q10', 'a') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q00', 'q10', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="282" y="94" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="293" y="107" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* q10 -> q20 (straight) */}
        <g className={isEdgeActive('q10', 'q20', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 470 110 L 670 110"
            stroke={isEdgeActive('q10', 'q20', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q10', 'q20', 'a') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q10', 'q20', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="562" y="94" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="573" y="107" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* q20 -> q00 (curved loop over top) */}
        <g className={isEdgeActive('q20', 'q00', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 710 80 C 710 20, 150 20, 150 80"
            stroke={isEdgeActive('q20', 'q00', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q20', 'q00', 'a') ? '4' : '2'}
            strokeDasharray={isEdgeActive('q20', 'q00', 'a') ? '6 2' : 'none'}
            fill="none"
            markerEnd={isEdgeActive('q20', 'q00', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="420" y="22" width="24" height="20" rx="4" fill="#0f172a" />
          <text x="432" y="36" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* Row 1 'a' transitions: q01 -> q11 -> q21 -> q01 */}
        {/* q01 -> q11 (straight) */}
        <g className={isEdgeActive('q01', 'q11', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 190 330 L 390 330"
            stroke={isEdgeActive('q01', 'q11', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q01', 'q11', 'a') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q01', 'q11', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="282" y="314" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="293" y="327" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* q11 -> q21 (straight) */}
        <g className={isEdgeActive('q11', 'q21', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 470 330 L 670 330"
            stroke={isEdgeActive('q11', 'q21', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q11', 'q21', 'a') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q11', 'q21', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="562" y="314" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="573" y="327" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* q21 -> q01 (curved loop beneath bottom) */}
        <g className={isEdgeActive('q21', 'q01', 'a') ? 'animate-pulse' : ''}>
          <path
            d="M 710 380 C 710 440, 150 440, 150 380"
            stroke={isEdgeActive('q21', 'q01', 'a') ? '#00f2fe' : '#38bdf8'}
            strokeWidth={isEdgeActive('q21', 'q01', 'a') ? '4' : '2'}
            strokeDasharray={isEdgeActive('q21', 'q01', 'a') ? '6 2' : 'none'}
            fill="none"
            markerEnd={isEdgeActive('q21', 'q01', 'a') ? 'url(#arrow-a-active)' : 'url(#arrow-a)'}
          />
          <rect x="420" y="420" width="24" height="20" rx="4" fill="#0f172a" />
          <text x="432" y="434" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            a
          </text>
        </g>

        {/* ----------------- TRANSITION EDGES FOR 'b' (Vertical Bi-directional) ----------------- */}
        {/* Col 0: q00 <-> q01 */}
        {/* q00 -> q01 (curved left) */}
        <g className={isEdgeActive('q00', 'q01', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 135 158 C 115 200, 115 260, 135 302"
            stroke={isEdgeActive('q00', 'q01', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q00', 'q01', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q00', 'q01', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="100" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="111" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>
        {/* q01 -> q00 (curved right) */}
        <g className={isEdgeActive('q01', 'q00', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 165 302 C 185 260, 185 200, 165 158"
            stroke={isEdgeActive('q01', 'q00', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q01', 'q00', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q01', 'q00', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="180" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="191" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>

        {/* Col 1: q10 <-> q11 */}
        {/* q10 -> q11 (curved left) */}
        <g className={isEdgeActive('q10', 'q11', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 415 158 C 395 200, 395 260, 415 302"
            stroke={isEdgeActive('q10', 'q11', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q10', 'q11', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q10', 'q11', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="380" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="391" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>
        {/* q11 -> q10 (curved right) */}
        <g className={isEdgeActive('q11', 'q10', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 445 302 C 465 260, 465 200, 445 158"
            stroke={isEdgeActive('q11', 'q10', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q11', 'q10', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q11', 'q10', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="460" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="471" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>

        {/* Col 2: q20 <-> q21 */}
        {/* q20 -> q21 (curved left) */}
        <g className={isEdgeActive('q20', 'q21', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 695 158 C 675 200, 675 260, 695 302"
            stroke={isEdgeActive('q20', 'q21', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q20', 'q21', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q20', 'q21', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="660" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="671" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>
        {/* q21 -> q20 (curved right) */}
        <g className={isEdgeActive('q21', 'q20', 'b') ? 'animate-pulse' : ''}>
          <path
            d="M 725 302 C 745 260, 745 200, 725 158"
            stroke={isEdgeActive('q21', 'q20', 'b') ? '#fef08a' : '#fbbf24'}
            strokeWidth={isEdgeActive('q21', 'q20', 'b') ? '4' : '2'}
            fill="none"
            markerEnd={isEdgeActive('q21', 'q20', 'b') ? 'url(#arrow-b-active)' : 'url(#arrow-b)'}
          />
          <rect x="740" y="220" width="22" height="18" rx="4" fill="#0f172a" />
          <text x="751" y="233" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            b
          </text>
        </g>

        {/* Optional Trap State & loop */}
        {showTrapState && (
          <g>
            {/* Trap self loop on any */}
            <path
              d="M 870 205 C 870 170, 910 170, 910 205"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow-a)"
            />
            <text x="890" y="165" fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">
              Σ
            </text>
          </g>
        )}

        {/* ----------------- STATE NODES ----------------- */}
        {Object.values(DFA_STATES).map((state) => {
          if (state.id === 'qtrap' && !showTrapState) return null;

          const isCurrent = currentState === state.id;
          const isAccept = state.isAccept;
          const nodeRadius = 38;

          // Colors
          let fillColor = '#1e293b'; // slate-800
          let strokeColor = '#475569'; // slate-600
          let textColor = '#e2e8f0';

          if (isAccept) {
            fillColor = isCurrent ? '#065f46' : '#064e3b';
            strokeColor = '#10b981';
            textColor = '#ecfdf5';
          } else if (state.id === 'qtrap') {
            fillColor = isCurrent ? '#7f1d1d' : '#450a0a';
            strokeColor = '#ef4444';
            textColor = '#fecaca';
          }

          if (isCurrent) {
            strokeColor = isAccept ? '#34d399' : '#38bdf8';
          }

          return (
            <g
              key={state.id}
              className="cursor-pointer transition-all duration-300"
              onClick={() => onSelectState && onSelectState(state.id)}
            >
              {/* Pulsing halo if current state */}
              {isCurrent && (
                <circle
                  cx={state.x}
                  cy={state.y}
                  r={nodeRadius + 10}
                  fill="none"
                  stroke={isAccept ? '#10b981' : '#38bdf8'}
                  strokeWidth="3"
                  className="animate-ping opacity-60"
                />
              )}

              {/* Accepting outer concentric circle */}
              {isAccept && (
                <circle
                  cx={state.x}
                  cy={state.y}
                  r={nodeRadius + 6}
                  fill="none"
                  stroke={isCurrent ? '#34d399' : '#10b981'}
                  strokeWidth={isCurrent ? 3.5 : 2}
                  filter={isCurrent ? 'url(#glow-active)' : undefined}
                />
              )}

              {/* Main State circle */}
              <circle
                cx={state.x}
                cy={state.y}
                r={nodeRadius}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={isCurrent ? 3.5 : 2}
                filter={isCurrent ? 'url(#glow-active)' : undefined}
                className="transition-colors duration-200"
              />

              {/* State label text */}
              <text
                x={state.x}
                y={state.y - 2}
                fill={textColor}
                fontSize={state.id === 'qtrap' ? 14 : 19}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="system-ui, sans-serif"
              >
                {state.label}
              </text>

              {/* Sub-label showing remainders */}
              {state.id !== 'qtrap' && (
                <text
                  x={state.x}
                  y={state.y + 20}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  a:{state.aRemainder} b:{state.bRemainder}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
