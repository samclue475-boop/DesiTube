import React from 'react';
import { Wifi, Battery, Signal, Sparkles, Download, Smartphone } from 'lucide-react';

interface FlutterPhoneFrameProps {
  children: React.ReactNode;
  isFlutterMode: boolean;
  onToggleFlutterMode: () => void;
  onOpenApkModal?: () => void;
}

export const FlutterPhoneFrame: React.FC<FlutterPhoneFrameProps> = ({
  children,
  isFlutterMode,
  onToggleFlutterMode,
  onOpenApkModal,
}) => {
  if (!isFlutterMode) {
    return <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-center">
      
      {/* Flutter Device Header Bar */}
      <div className="max-w-[430px] w-full mb-3 flex items-center justify-between px-2 text-xs text-gray-400">
        <div className="flex items-center gap-2 font-bold text-gray-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2BA640]"></span>
          <span>DesiTube Flutter App</span>
          {onOpenApkModal && (
            <button
              onClick={onOpenApkModal}
              className="bg-[#2BA640]/20 hover:bg-[#2BA640]/30 text-[#2BA640] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#2BA640]/40 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-2.5 h-2.5" />
              <span>Get APK</span>
            </button>
          )}
        </div>
        <button
          onClick={onToggleFlutterMode}
          className="text-amber-400 hover:text-amber-300 font-semibold text-xs underline cursor-pointer"
        >
          Expand to Web View
        </button>
      </div>

      {/* Realistic Mobile Mockup Frame */}
      <div className="relative w-full max-w-[420px] h-[860px] bg-[#0f0f0f] rounded-[48px] shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-[6px] border-[#272727] flex flex-col overflow-hidden ring-1 ring-[#333]">
        
        {/* Mobile Status Bar */}
        <div className="bg-[#0f0f0f] px-6 pt-3 pb-1 flex items-center justify-between text-white text-xs select-none z-50 shrink-0">
          <span className="font-bold text-[11px] tracking-wide">09:41</span>
          
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-4 bg-[#1a1a1a] rounded-full flex items-center justify-center gap-1.5 border border-[#333]">
            <span className="w-2 h-2 rounded-full bg-[#FF0000]"></span>
            <span className="text-[9px] font-bold text-gray-400">DesiTube</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-[#2BA640]" />
          </div>
        </div>

        {/* Inner Scrollable App Screen */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col bg-[#0f0f0f] pb-16">
          {children}
        </div>

        {/* Flutter Home Indicator Line */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-50">
          <div className="w-32 h-1 bg-[#444] rounded-full"></div>
        </div>

      </div>
    </div>
  );
};
