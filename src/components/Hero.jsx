import { motion } from 'framer-motion';
import { Download, FolderOpen, ShieldAlert, ScanLine, Fingerprint } from 'lucide-react';
import Lottie from 'lottie-react';
import starAnimation from '../assets/star.json';

const Hero = ({ isAlterMode, toggleAlterMode, t }) => {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center border-b-[12px] border-ink pb-20 mb-20">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] leading-none font-display text-ink whitespace-nowrap opacity-50">
          DATA FILE
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start relative z-10 w-full">
        
        {/* Left Side: Information */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-full justify-between"
        >
          <div>
            {/* Header section with lines */}
            <div className="flex items-center gap-4 mb-6">
               <ShieldAlert className="text-accent" size={32} />
               <div className="flex-1 h-0.5 bg-ink"></div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-ink mb-4 uppercase leading-none">
              {isAlterMode ? "Garda" : "Handitya"}
              <span className="block text-accent">{isAlterMode ? "Persona" : "Personnel"}</span>
            </h1>

            {/* Metadata tags */}
            <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs text-paper bg-ink p-2">
              <span className="px-2 border-r border-paper/30">ID: {isAlterMode ? "GRD-ALT-99" : "HAN-DEV-01"}</span>
              <span className="px-2 border-r border-paper/30">CLEARANCE: LEVEL 4</span>
              <span className="px-2 text-accent">STATUS: APPROVED</span>
            </div>

            {/* Role / Summary */}
            <p className="text-ink/80 text-lg md:text-xl max-w-xl leading-relaxed border-l-4 border-accent pl-6 mb-8">
              {isAlterMode ? (
                t?.role_alter || "A persona online who loves singing and creating content."
              ) : (
                t?.role_normal || "Junior Game Programmer, App & Web Developer. Passionate about Unity and creating useful applications for the community."
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
             <button 
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-between gap-4 bg-ink text-paper px-6 py-4 font-display text-xl uppercase hover:bg-accent transition-colors"
            >
              <span className="flex items-center gap-3">
                <FolderOpen size={24} />
                {t?.btn_works || "Access Archive"}
              </span>
              <span className="font-mono text-xs opacity-50 group-hover:opacity-100">CMD_01</span>
            </button>
            <button 
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="group flex items-center justify-between gap-4 border-2 border-ink text-ink px-6 py-4 font-display text-xl uppercase hover:bg-ink hover:text-paper transition-colors"
            >
              <span className="flex items-center gap-3">
                <Download size={24} />
                Download Data
              </span>
              <span className="font-mono text-xs opacity-50">DOC_DL</span>
            </button>
          </div>
        </motion.div>

        {/* Right Side: ID Card / Portrait */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-sm w-full mx-auto md:mx-0"
        >
           {/* Photo Frame Container */}
           <div className="bg-paper border-4 border-ink p-4 pb-12 shadow-[8px_8px_0px_rgba(17,17,17,1)] relative rotate-2 hover:rotate-0 transition-transform duration-300">
              
              {/* Tape detail */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 backdrop-blur-sm -rotate-2 border border-ink/10 shadow-sm z-20"></div>

              {/* Top info on photo */}
              <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-ink uppercase border-b-2 border-ink pb-2">
                <span>Subject Photo</span>
                <span>{new Date().getFullYear()}</span>
              </div>

              {/* The Image */}
              <div className="relative aspect-[3/4] border-2 border-ink bg-muted/20 overflow-hidden group">
                 {isAlterMode && (
                    <motion.div
                      animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-accent mix-blend-overlay z-10"
                    />
                 )}
                 <img 
                  src={isAlterMode ? "/images/hero-alter.jpg" : "/images/hero-normal.jpg"}
                  alt={isAlterMode ? "Garda" : "Handitya"}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    const target = e.target;
                    if (target.src.includes('.jpg')) {
                      target.src = target.src.replace('.jpg', '.png');
                    }
                  }}
                 />
                 
                 {/* Scanner line overlay on image */}
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHBhdGggZD0iTTAgMEg0djFINHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=')] opacity-50 pointer-events-none z-20"></div>
              </div>

              {/* Bottom metadata on photo */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                 <div className="font-mono text-xs font-bold leading-tight">
                    <span className="block text-accent uppercase">{isAlterMode ? "Alias" : "Name"}</span>
                    {isAlterMode ? "GARDA" : "HANDITYA G."}
                 </div>
                 {/* Fingerprint icon as stamp */}
                 <Fingerprint className="text-accent opacity-80" size={32} />
              </div>
           </div>

           {/* Mode Toggle Button */}
           <div className="absolute -bottom-6 -right-6 md:-right-12 z-30">
              <button
                onClick={toggleAlterMode}
                className="bg-ink text-paper border-4 border-paper shadow-[0_0_0_2px_rgba(17,17,17,1)] p-4 rounded-full hover:bg-accent hover:text-ink transition-colors group flex flex-col items-center gap-1"
              >
                <ScanLine size={24} className="group-hover:animate-pulse" />
                <span className="font-mono text-[8px] uppercase font-bold tracking-widest">Toggle</span>
              </button>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
