import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  X, 
  Sparkles, 
  Layers, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface ApkModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
}

export const ApkModal: React.FC<ApkModalProps> = ({ isOpen, onClose, appUrl }) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'builder' | 'capacitor'>('instant');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const currentUrl = appUrl || (typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-kgqi5g6nyugeung56jvx4m-852320721391.asia-southeast1.run.app');

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    sounds.playCoinChime();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Direct instructions for Android Chrome WebAPK
      alert(
        'To install DesiTube APK on your Android Phone:\n\n' +
        '1. Open this link in Chrome / Brave on your Android phone.\n' +
        '2. Tap the 3 dots menu (⋮) at top-right.\n' +
        '3. Tap "Install App" or "Add to Home Screen".\n' +
        '4. Android will build and install the official DesiTube WebAPK with offline support and red play icon!'
      );
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    sounds.playTap();
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="apk-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[#121212] border border-[#272727] rounded-2xl shadow-2xl overflow-hidden text-[#f1f1f1] my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#272727] bg-[#171717]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center shadow-lg shadow-red-600/30">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">DesiTube Android APK</h2>
                  <span className="text-[10px] bg-[#2BA640] text-white font-bold px-2 py-0.5 rounded-full">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs text-gray-400">Install as native WebAPK or build standalone APK</p>
              </div>
            </div>

            <button
              id="close-apk-modal-btn"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-[#272727] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-[#272727] bg-[#0f0f0f] px-4 pt-2">
            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab('instant');
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'instant'
                  ? 'border-[#2BA640] text-[#2BA640]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>1-Click Android WebAPK</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab('builder');
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'builder'
                  ? 'border-[#2BA640] text-[#2BA640]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Online APK Generator</span>
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                setActiveTab('capacitor');
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'capacitor'
                  ? 'border-[#2BA640] text-[#2BA640]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Capacitor / Studio</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            
            {/* Tab 1: Instant WebAPK Install */}
            {activeTab === 'instant' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#272727] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FF0000] w-12 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#f1f1f1]">DesiTube for Android</h4>
                      <p className="text-xs text-gray-400">Includes ₹780 Wallet, Red Player, & Green Creator Studio</p>
                    </div>
                  </div>

                  <button
                    id="apk-install-now-btn"
                    onClick={handleInstallClick}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#2BA640] hover:bg-[#259439] text-white font-bold text-sm rounded-full shadow-lg shadow-[#2BA640]/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstalled ? 'Installed ✓' : 'Install on Android'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    How WebAPK Works on Android:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#171717] rounded-xl border border-[#272727] text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#272727] text-gray-300 font-bold flex items-center justify-center mb-2">1</span>
                      <p className="font-semibold text-gray-200">Open on Android</p>
                      <p className="text-gray-400 mt-0.5 text-[11px]">Open this link in Chrome or mobile browser.</p>
                    </div>

                    <div className="p-3 bg-[#171717] rounded-xl border border-[#272727] text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#272727] text-gray-300 font-bold flex items-center justify-center mb-2">2</span>
                      <p className="font-semibold text-gray-200">Tap 3 Dots Menu</p>
                      <p className="text-gray-400 mt-0.5 text-[11px]">Select &quot;Install App&quot; or &quot;Add to Home Screen&quot;.</p>
                    </div>

                    <div className="p-3 bg-[#171717] rounded-xl border border-[#272727] text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#272727] text-gray-300 font-bold flex items-center justify-center mb-2">3</span>
                      <p className="font-semibold text-gray-200">Real App Installed</p>
                      <p className="text-gray-400 mt-0.5 text-[11px]">Android builds the APK with app icon on your home screen.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#171717] rounded-xl border border-[#272727] flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="text-gray-400">App URL: </span>
                    <span className="text-gray-200 font-mono">{currentUrl}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentUrl, 'url')}
                    className="px-3 py-1.5 bg-[#272727] hover:bg-[#3f3f3f] text-gray-300 rounded-lg shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedCode === 'url' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#2BA640]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'url' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: PWABuilder / Online APK Generator */}
            {activeTab === 'builder' && (
              <div className="space-y-4">
                <p className="text-xs text-gray-300 leading-relaxed">
                  You can convert this DesiTube URL into a signed <strong>.apk</strong> or <strong>.aab</strong> package ready for Google Play Store using Microsoft PWABuilder or Google Bubblewrap.
                </p>

                <div className="p-4 bg-[#171717] rounded-xl border border-[#272727] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-300">Option A: Microsoft PWABuilder (No Code)</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-semibold">Instant APK</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Paste the app URL into pwabuilder.com to download your Android APK package with 1 click.
                  </p>
                  <a
                    href={`https://www.pwabuilder.com?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    <span>Generate APK on PWABuilder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 bg-[#171717] rounded-xl border border-[#272727] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-300">Option B: Google Bubblewrap CLI (TWA)</span>
                    <span className="text-[10px] bg-[#2BA640]/20 text-[#2BA640] px-2 py-0.5 rounded font-semibold">Official Google CLI</span>
                  </div>
                  <div className="p-2.5 bg-black rounded-lg font-mono text-[11px] text-gray-300 flex items-center justify-between">
                    <code>npx @bubblewrap/cli init --manifest={currentUrl}/manifest.json</code>
                    <button
                      onClick={() => copyToClipboard(`npx @bubblewrap/cli init --manifest=${currentUrl}/manifest.json`, 'bubble')}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      {copiedCode === 'bubble' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#2BA640]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Capacitor / Android Studio */}
            {activeTab === 'capacitor' && (
              <div className="space-y-4">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Export project files from Settings menu (ZIP / GitHub) and compile natively to an `.apk` using Capacitor:
                </p>

                <div className="p-3 bg-black rounded-xl border border-[#272727] space-y-2 font-mono text-xs text-gray-300">
                  <div className="flex items-center justify-between border-b border-[#272727] pb-1 text-gray-500 text-[11px]">
                    <span>Terminal Commands</span>
                    <button
                      onClick={() => copyToClipboard('npm install @capacitor/core @capacitor/cli @capacitor/android\nnpx cap init "DesiTube" "com.desitube.app"\nnpx cap add android\nnpx cap run android', 'cap')}
                      className="flex items-center gap-1 text-gray-400 hover:text-white"
                    >
                      {copiedCode === 'cap' ? <CheckCircle2 className="w-3 h-3 text-[#2BA640]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode === 'cap' ? 'Copied' : 'Copy All'}</span>
                    </button>
                  </div>
                  <p className="text-gray-400"># 1. Install Capacitor Android</p>
                  <p className="text-[#2BA640]">npm install @capacitor/core @capacitor/cli @capacitor/android</p>
                  <p className="text-gray-400 pt-1"># 2. Initialize project</p>
                  <p className="text-[#2BA640]">npx cap init &quot;DesiTube&quot; &quot;com.desitube.app&quot; --web-dir dist</p>
                  <p className="text-gray-400 pt-1"># 3. Add Android platform & build APK</p>
                  <p className="text-[#2BA640]">npx cap add android && npx cap open android</p>
                </div>
                
                <div className="p-3 bg-[#171717] rounded-xl border border-[#272727] text-xs text-gray-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2BA640] shrink-0" />
                  <span>Builds signed release APK & AAB ready for side-loading or Google Play Store.</span>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-[#171717] border-t border-[#272727] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#2BA640]"></span>
              <span>PWA & Android WebAPK Ready</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#272727] hover:bg-[#3f3f3f] text-gray-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
