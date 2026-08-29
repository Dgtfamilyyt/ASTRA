import React, { useState } from 'react';
import { Sparkles, Telescope, MessageSquare } from 'lucide-react';

interface FloatingAIAssistantButtonProps {
  onOpen: () => void;
}

export const FloatingAIAssistantButton: React.FC<FloatingAIAssistantButtonProps> = ({ onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0a0f28]/95 border border-indigo-500/40 text-xs font-mono text-white shadow-2xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
          <span>Ask ASTRA AI Guide</span>
        </div>
      )}

      <button
        id="floating-ask-astra-btn"
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open Ask ASTRA AI Assistant"
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 border border-cyan-400/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Pulsing Outer Cosmic Ring */}
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-40 blur group-hover:opacity-75 animate-pulse transition duration-300"></span>

        {/* Icon */}
        <div className="relative flex items-center justify-center">
          <Telescope className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-200 absolute -top-1.5 -right-1.5 animate-spin-slow" />
        </div>
      </button>
    </div>
  );
};
