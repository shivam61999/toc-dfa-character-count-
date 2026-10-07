import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Cloud, Globe, GitBranch } from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'github' | 'vercel' | 'render'>('vercel');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Deployment & Hosting Guide
              </h3>
              <p className="text-xs text-slate-400">
                Publish your TOC TAE DFA Validator to GitHub, Vercel, or Render in minutes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs">
          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition ${
              activeTab === 'vercel'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Vercel (Recommended - Fastest)</span>
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition ${
              activeTab === 'github'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub & GitHub Pages</span>
          </button>
          <button
            onClick={() => setActiveTab('render')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition ${
              activeTab === 'render'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Render</span>
          </button>
        </div>

        {/* Tab 1: Vercel */}
        {activeTab === 'vercel' && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="bg-indigo-950/30 border border-indigo-800/50 p-3.5 rounded-xl space-y-2">
              <h4 className="font-bold text-indigo-300 flex items-center justify-between">
                <span>Option A: Deploy via Vercel Web Dashboard (1-Click)</span>
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  <span>Open Vercel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>Push this repository to your GitHub account (see GitHub tab).</li>
                <li>Go to <span className="text-slate-200 font-mono">vercel.com</span> and sign in with GitHub.</li>
                <li>Click <b className="text-slate-200">"Add New..."</b> &rarr; <b className="text-slate-200">"Project"</b>.</li>
                <li>Import your <span className="text-slate-200 font-mono">toc-dfa-character-count</span> repository.</li>
                <li>Framework Preset will auto-detect as <b className="text-slate-200">Vite</b>.</li>
                <li>Click <b className="text-emerald-400 font-bold">Deploy</b>. You'll get a live URL (e.g., <code className="text-sky-300">your-project.vercel.app</code>) in ~30 seconds!</li>
              </ol>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Option B: Deploy via Vercel CLI</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'npm i -g vercel\nvercel login\nvercel',
                      'vercel-cli'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {copiedCode === 'vercel-cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'vercel-cli' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 overflow-x-auto">
{`# 1. In project directory:
npm.cmd install -g vercel
vercel login
vercel`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: GitHub & Pages */}
        {activeTab === 'github' && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">1. Initialize and Push to GitHub</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      'git init\ngit add .\ngit commit -m "feat: complete TOC TAE DFA Character Count Validator"\ngit branch -M main\ngit remote add origin https://github.com/shivam61999/toc-dfa-character-count.git\ngit push -u origin main',
                      'git-push'
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {copiedCode === 'git-push' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'git-push' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 overflow-x-auto">
{`git init
git add .
git commit -m "feat: complete TOC TAE DFA Character Count Validator"
git branch -M main
git remote add origin https://github.com/shivam61999/toc-dfa-character-count.git
git push -u origin main`}
              </pre>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-800/50 p-3.5 rounded-xl space-y-2">
              <span className="font-bold text-indigo-300">2. Deploying to GitHub Pages</span>
              <p className="text-slate-400 leading-relaxed">
                We've configured <code className="text-sky-300 font-mono">base: './'</code> in <code className="text-sky-300 font-mono">vite.config.ts</code> so the build works flawlessly on GitHub Pages subpaths!
              </p>
              <pre className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 overflow-x-auto">
{`npm.cmd run build
# Deploy dist folder or use GitHub Pages Settings:
# Settings -> Pages -> Source: GitHub Actions (Static HTML/Vite)`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Render */}
        {activeTab === 'render' && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200 flex items-center justify-between">
                <span>Deploy on Render as Static Site</span>
                <a
                  href="https://dashboard.render.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  <span>Open Render</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed">
                <li>Log in to <span className="text-slate-200 font-mono">render.com</span>.</li>
                <li>Click <b className="text-slate-200">New +</b> and choose <b className="text-slate-200">Static Site</b>.</li>
                <li>Connect your GitHub repository.</li>
                <li>Fill in the build settings:
                  <div className="bg-slate-900 p-2 rounded mt-1 font-mono text-[11px] text-indigo-200 space-y-1">
                    <div><b>Build Command:</b> <code className="text-amber-300">npm run build</code></div>
                    <div><b>Publish Directory:</b> <code className="text-emerald-300">dist</code></div>
                  </div>
                </li>
                <li>Click <b className="text-emerald-400 font-bold">Create Static Site</b>!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-500 font-mono">
            Vite 8 + React 19 + Tailwind CSS 3
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
