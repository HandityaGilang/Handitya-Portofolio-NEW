import { motion } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import Lottie from 'lottie-react';
import starAnimation from '../assets/star.json';

const Hero = ({ isAlterMode, toggleAlterMode, t }) => {
  return (
    <section className="relative min-h-screen bg-portfolio-green text-portfolio-beige flex flex-col justify-center items-center overflow-hidden pt-20 transition-colors duration-500">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
        <div className="flex flex-col items-center">
           <motion.h1 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[15vw] leading-none font-serif font-outline-text text-transparent stroke-portfolio-beige"
          >
            PORTFOLIO
          </motion.h1>
          <motion.h1 
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-[15vw] leading-none font-serif text-portfolio-beige/20 italic"
          >
            PORTFOLIO
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image Placeholder */}
        <motion.div 
          animate={{ 
            rotateY: isAlterMode ? 360 : 0,
            scale: isAlterMode ? 0.9 : 1
          }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          style={{ perspective: 1000 }} // Tambahkan perspektif agar efek 3D terlihat
          className="relative order-2 md:order-1"
        >
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto" style={{ transformStyle: "preserve-3d" }}>
            
            {/* NEW: Alter Mode Specific Animations (Glow & Floating Elements) */}
            {isAlterMode && (
              <>
                 {/* 1. Electric Glow Behind */}
                 <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-8 bg-portfolio-orange/30 blur-3xl rounded-full -z-10"
                 />
                 
                 {/* 2. Floating Zap Icon */}
                 <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-12 -right-4 text-portfolio-orange z-20 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                 >
                    <Zap size={32} fill="currentColor" />
                 </motion.div>

                 {/* 3. Orbiting Dashed Circle */}
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-24 h-24 border border-dashed border-portfolio-yellow/50 rounded-full z-0"
                 />

                 {/* 4. Glitch Effect Text */}
                 <motion.div
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute top-1/2 -right-16 text-portfolio-orange font-mono text-xs tracking-widest rotate-90"
                 >
                    SYSTEM_ALTERED
                 </motion.div>

                 {/* 5. Lottie Star Animation */}
                 <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-20 -right-20 w-40 h-40 z-20 pointer-events-none"
                 >
                    <Lottie 
                        animationData={starAnimation} 
                        loop={true}
                    />
                 </motion.div>
              </>
            )}

            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -left-6 text-portfolio-orange w-12 h-12"
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
            </motion.div>
            
            {/* The Image Box */}
            <div className={`w-full h-full rounded-lg overflow-hidden border-2 border-portfolio-orange relative group transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-dark' : 'bg-portfolio-orange/20'}`}>
              
              {/* Image Setup */}
              {/* 
                  CARA GANTI FOTO:
                  1. Siapkan foto Anda.
                  2. Beri nama 'hero-normal.jpg' untuk foto Handitya.
                  3. Beri nama 'hero-alter.jpg' untuk foto Garda (mode Alter).
                  4. Masukkan kedua file tersebut ke folder: public/images/
              */}
              <img 
                src={isAlterMode ? "/images/hero-alter.jpg" : "/images/hero-normal.jpg"}
                alt={isAlterMode ? "Garda" : "Handitya"}
                className="w-full h-full object-cover transition-opacity duration-500"
                onError={(e) => {
                  const target = e.target;
                  if (target.src.includes('.jpg')) {
                    target.src = target.src.replace('.jpg', '.png');
                  } else {
                    target.style.display = 'none';
                    target.nextSibling.style.display = 'flex';
                  }
                }}
              />

              {/* Fallback if image not found */}
              <div className="hidden absolute inset-0 items-center justify-center text-portfolio-orange/50 font-serif text-center p-4">
                 <p>{isAlterMode ? "Simpan foto 'hero-alter.jpg' (atau .png) di public/images/" : "Simpan foto 'hero-normal.jpg' (atau .png) di public/images/"}</p>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-t opacity-60 transition-colors duration-500 ${isAlterMode ? 'from-portfolio-green/80' : 'from-portfolio-green/80'}`}></div>
            </div>

            {/* Floating Info Box */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 right-0 md:-right-6 bg-portfolio-orange text-portfolio-dark p-4 rounded-lg shadow-xl max-w-[200px]"
            >
              <p className="text-xs font-bold mb-1">{isAlterMode ? "The Wild Side" : "Creative Developer"}</p>
              <p className="text-[10px] leading-tight">{isAlterMode ? "Unleashing creative chaos." : "I approach problems in a rational and pragmatic way."}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Introduction */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left order-1 md:order-2 relative"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-portfolio-orange font-bold uppercase tracking-widest">Introduction</h2>
            
            {/* Alter Button */}
            <button
              onClick={toggleAlterMode}
              className={`
                relative group px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300
                ${isAlterMode 
                  ? 'bg-portfolio-orange text-portfolio-green shadow-[0_0_20px_rgba(255,215,0,0.5)]' 
                  : 'bg-portfolio-dark text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark border border-portfolio-beige/20'}
              `}
            >
              <span className="flex items-center gap-2">
                <Zap size={14} className={isAlterMode ? "fill-current" : ""} />
                Alter
              </span>
              <span className="absolute -inset-1 rounded-xl border border-portfolio-orange opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></span>
            </button>
          </div>

          <h1 className="text-[12vw] md:text-7xl font-serif mb-6 leading-tight">
            Hello, <br/>
            I'm <span className="text-portfolio-yellow italic">{isAlterMode ? "Garda" : "Handitya"}</span>
          </h1>
          <p className="text-portfolio-beige/80 text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
            {isAlterMode ? (
              t?.role_alter || "A persona online who loves singing and creating content."
            ) : (
              t?.role_normal || "Junior Game Programmer, App & Web Developer. Passionate about Unity and creating useful applications for the community."
            )}
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-portfolio-orange text-portfolio-dark px-6 py-2 md:px-8 md:py-3 rounded-full font-bold uppercase hover:bg-portfolio-yellow transition-colors shadow-lg shadow-portfolio-orange/20 text-xs md:text-base"
            >
              {t?.btn_works || "My Works"}
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-portfolio-beige text-portfolio-beige px-6 py-2 md:px-8 md:py-3 rounded-full font-bold uppercase hover:bg-portfolio-beige hover:text-portfolio-dark transition-colors text-xs md:text-base"
            >
              {t?.btn_contact || "Contact Me"}
            </button>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-portfolio-beige/60"
      >
        <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        <div className="w-10 h-10 rounded-full border border-portfolio-beige/30 flex items-center justify-center">
          <ArrowDown size={16} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
