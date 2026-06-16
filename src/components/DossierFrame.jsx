import { motion } from 'framer-motion';
import { AlertTriangle, Fingerprint, ScanLine } from 'lucide-react';

const DossierFrame = ({ children, isAlterMode }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto relative shadow-2xl overflow-hidden bg-paper bg-paper-texture">
      
      {/* Top Warning/Metadata Bar */}
      <div className="bg-accent text-paper font-mono text-[10px] md:text-xs py-2 px-4 flex justify-between items-center relative z-20 border-b-4 border-ink">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border border-paper/30 px-2 py-0.5">
             <AlertTriangle size={14} className="animate-pulse" />
             <span className="hidden md:inline">CLASSIFIED DATA</span>
          </div>
          <span className="uppercase tracking-widest hidden md:inline">
            FILE_ID: HG-PORTFOLIO-2026
          </span>
        </div>
        <div className="flex items-center gap-4 uppercase">
          <span className="border-l border-paper/30 pl-4">{isAlterMode ? 'CREATIVE IDENTITY' : 'PERSONNEL DATA'}</span>
          <span className="hidden md:inline">LOCATION: YK, ID</span>
          <span className="font-bold">STATUS: ACTIVE</span>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="relative border-x-[12px] border-b-[24px] border-frame min-h-screen">
        
        {/* Paper Grain Overlay */}
        <div className="absolute inset-0 bg-halftone bg-halftone-size opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"></div>

        {/* Content Container */}
        <div className="relative z-10 px-4 md:px-12 lg:px-20 pt-10 pb-20">
            {children}
        </div>

        {/* Scanner Line Animation */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
          className="absolute left-0 w-full h-1 bg-accent/30 shadow-[0_0_15px_rgba(232,28,108,0.5)] z-50 pointer-events-none"
        />

        {/* Registration Marks */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-ink opacity-30"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-ink opacity-30"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-ink opacity-30"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-ink opacity-30"></div>
      </div>
    </div>
  );
};

export default DossierFrame;
