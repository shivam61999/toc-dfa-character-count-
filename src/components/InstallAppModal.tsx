import React from 'react';
import { X, Smartphone, Monitor, WifiOff, CheckCircle2, Download } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallClick: () => void;
  isInstalled: boolean;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallClick,
  isInstalled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Install App (Android & Desktop)
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                  100% Offline
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Install as a standalone native app on Android phones or Windows/macOS desktop
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Install Button if supported */}
        {deferredPrompt && !isInstalled && (
          <div className="bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/50 p-4 rounded-xl flex items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="text-sm font-bold text-white">Direct 1-Click Install Available</div>
              <div className="text-xs text-indigo-300">
                Your device supports instant installation to your Home screen / Desktop.
              </div>
            </div>
            <button
              onClick={onInstallClick}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 shrink-0 transition"
            >
              <Download className="w-4 h-4" />
              <span>Install Now</span>
            </button>
          </div>
        )}

        {isInstalled && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>This application is already installed on your device and running offline!</span>
          </div>
        )}

        {/* Step-by-Step for Android & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Android Installation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Smartphone className="w-4 h-4" />
              <span>How to Install on Android</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed text-[11px]">
              <li>
                Open the live site in <b>Chrome</b> or <b>Edge</b> on your phone.
              </li>
              <li>
                Tap the <b>three dots menu (⋮)</b> in the top right.
              </li>
              <li>
                Tap <b>"Install app"</b> or <b>"Add to Home screen"</b>.
              </li>
              <li>
                A native app icon labeled <b>TOC DFA</b> will appear in your Android app drawer and home screen!
              </li>
            </ol>
            <div className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
              💡 Works like a native APK, launches full-screen with no browser address bar!
            </div>
          </div>

          {/* Desktop Installation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Monitor className="w-4 h-4" />
              <span>How to Install on Desktop</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed text-[11px]">
              <li>
                Open the site in <b>Chrome</b>, <b>Edge</b>, or <b>Brave</b> on your PC.
              </li>
              <li>
                Look for the <b>Install App icon (⊕ or 🖥️)</b> on the right side of the URL address bar.
              </li>
              <li>
                Click it and select <b>"Install"</b>.
              </li>
              <li>
                It will open in its own separate window, create a desktop shortcut, and appear in your <b>Windows Start Menu</b>!
              </li>
            </ol>
            <div className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
              💡 Launches as a dedicated desktop application window without tabs!
            </div>
          </div>
        </div>

        {/* Offline Guarantee Info */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-3 text-xs">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-slate-200">100% Offline Capability Guarantee</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Once opened once or installed, the service worker caches all assets locally. You can turn off Wi-Fi, enable Airplane Mode, and the entire DFA simulator, batch test cases, and academic guide will continue working flawlessly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-500 font-mono">PWA (Progressive Web Application)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
