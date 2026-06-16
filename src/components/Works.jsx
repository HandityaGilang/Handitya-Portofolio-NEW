import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, MonitorPlay } from 'lucide-react';
import { projectsData, videosData } from '../data/projects';

// Helper to extract YouTube ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Works = ({ isAlterMode, t }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const projects = projectsData;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= projects.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = projects.length - 1;
      return nextIndex;
    });
  }, [projects.length]);

  useEffect(() => {
    if (isAlterMode || isPaused) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAlterMode, isPaused, paginate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const activeProject = projects[activeIndex];

  return (
    <section 
      id="work" 
      className={`py-20 min-h-screen flex flex-col justify-center relative transition-colors duration-500 overflow-hidden
      ${isAlterMode ? 'bg-portfolio-dark text-portfolio-green' : 'bg-portfolio-green text-portfolio-beige'}`}
    >
      <div className="container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-7xl font-serif mb-12 relative z-10"
        >
          {t?.title || "My Works"}
        </motion.h2>

        {isAlterMode ? (
          /* Video Gallery Grid for Garda */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
            {videosData.map((video) => {
              const videoId = getYouTubeId(video.url);
              const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.url;

              return (
                <motion.div 
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-portfolio-green/20 bg-black"
                >
                  <div className="w-full h-full relative">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={embedUrl} 
                      title={video.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <h3 className="text-xl font-serif text-portfolio-yellow">{video.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Cinematic Carousel Container for Handitya */
          <div 
            className="relative w-full max-w-7xl h-[600px] md:h-[650px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
             {/* Background Project Number */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 opacity-5">
                <span className="text-[30rem] font-serif font-bold leading-none select-none">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
             </div>

             <div className="relative w-full h-full flex items-center justify-center z-10 perspective-1000">
               
               {/* Previous Card Outline (Clickable) */}
               <div 
                  className="hidden md:block absolute left-0 w-[20%] h-[60%] opacity-30 hover:opacity-60 cursor-pointer transition-opacity z-10 blur-[2px]"
                  onClick={() => paginate(-1)}
               >
                  {projects[(activeIndex - 1 + projects.length) % projects.length].image && (
                     <img 
                       src={projects[(activeIndex - 1 + projects.length) % projects.length].image}
                       alt="Previous"
                       className="w-full h-full object-cover rounded-2xl"
                     />
                  )}
               </div>

               {/* Next Card Outline (Clickable) */}
               <div 
                  className="hidden md:block absolute right-0 w-[20%] h-[60%] opacity-30 hover:opacity-60 cursor-pointer transition-opacity z-10 blur-[2px]"
                  onClick={() => paginate(1)}
               >
                  {projects[(activeIndex + 1) % projects.length].image && (
                     <img 
                       src={projects[(activeIndex + 1) % projects.length].image}
                       alt="Next"
                       className="w-full h-full object-cover rounded-2xl"
                     />
                  )}
               </div>

               {/* Active Card */}
               <AnimatePresence initial={false} custom={direction} mode="popLayout">
                 <motion.div
                   key={activeIndex}
                   custom={direction}
                   variants={slideVariants}
                   initial="enter"
                   animate="center"
                   exit="exit"
                   transition={{
                     x: { type: "spring", stiffness: 300, damping: 30 },
                     opacity: { duration: 0.2 },
                     scale: { duration: 0.3 }
                   }}
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   dragElastic={1}
                   onDragEnd={(e, { offset, velocity }) => {
                     const swipe = swipePower(offset.x, velocity.x);
                     if (swipe < -swipeConfidenceThreshold) {
                       paginate(1);
                     } else if (swipe > swipeConfidenceThreshold) {
                       paginate(-1);
                     }
                   }}
                   className="absolute w-full max-w-4xl h-[90%] md:h-[85%] bg-portfolio-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group touch-pan-y"
                 >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden bg-black/20">
                      {activeProject.image ? (
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={activeProject.image} 
                          alt={activeProject.title} 
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-portfolio-beige/30">
                          No Image
                        </div>
                      )}
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-portfolio-orange/90 text-portfolio-dark text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                          {activeProject.category}
                        </span>
                      </div>
                      
                      {/* Image Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-portfolio-dark"></div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center h-full relative z-10 bg-portfolio-dark/95 backdrop-blur-md">
                      
                      <div className="text-portfolio-orange/50 font-mono text-sm mb-2 font-bold tracking-widest">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </div>

                      <h3 className="text-2xl md:text-4xl font-serif text-portfolio-beige mb-4 leading-tight">
                        {activeProject.title}
                      </h3>

                      <div className="text-[10px] md:text-xs text-portfolio-beige/60 uppercase tracking-widest mb-4 flex flex-wrap gap-x-3 gap-y-1 items-center font-semibold">
                         <span>{activeProject.role}</span>
                         <span className="w-1 h-1 bg-portfolio-orange rounded-full"></span>
                         <span>{activeProject.year}</span>
                         <span className="w-1 h-1 bg-portfolio-orange rounded-full"></span>
                         <span className={activeProject.status === "Completed" ? "text-green-400" : "text-yellow-400"}>
                           {activeProject.status}
                         </span>
                      </div>

                      <p className="text-portfolio-beige/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 md:line-clamp-none">
                        {activeProject.summary}
                      </p>

                      <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map(tech => (
                            <span key={tech} className="bg-portfolio-beige/10 border border-portfolio-beige/20 text-portfolio-beige text-xs px-3 py-1 rounded-full transition-colors hover:bg-portfolio-orange hover:text-portfolio-dark hover:border-portfolio-orange cursor-default">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto flex flex-wrap gap-3">
                        {activeProject.liveUrl && (
                          <a 
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] bg-portfolio-orange text-portfolio-dark py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-portfolio-yellow transition-colors shadow-lg shadow-portfolio-orange/10 group"
                            aria-label={`View live project for ${activeProject.title}`}
                          >
                            <MonitorPlay size={18} className="group-hover:scale-110 transition-transform" />
                            View Project
                          </a>
                        )}
                        
                        {activeProject.githubUrl && (
                          <a 
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] border-2 border-portfolio-beige/30 text-portfolio-beige py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-portfolio-beige hover:bg-portfolio-beige/5 transition-colors group"
                            aria-label={`View source code for ${activeProject.title}`}
                          >
                            <Github size={18} className="group-hover:scale-110 transition-transform" />
                            Source Code
                          </a>
                        )}
                      </div>
                      
                    </div>
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Carousel Controls Container */}
             <div className="absolute bottom-[-3rem] md:bottom-[-4rem] left-0 right-0 flex items-center justify-center gap-6 z-20">
               <button
                 className="w-12 h-12 rounded-full border border-portfolio-beige/30 flex items-center justify-center text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark hover:border-portfolio-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-orange disabled:opacity-50"
                 onClick={() => paginate(-1)}
                 aria-label="Previous project"
               >
                 <ChevronLeft size={24} />
               </button>
               
               {/* Dots Indicator for Mobile/Desktop */}
               <div className="flex gap-2">
                 {projects.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => {
                        setDirection(idx > activeIndex ? 1 : -1);
                        setActiveIndex(idx);
                     }}
                     aria-label={`Go to project ${idx + 1}`}
                     className={`h-2 rounded-full transition-all duration-300 ${
                       activeIndex === idx 
                         ? 'w-8 bg-portfolio-orange' 
                         : 'w-2 bg-portfolio-beige/30 hover:bg-portfolio-beige/60'
                     }`}
                   />
                 ))}
               </div>

               <button
                 className="w-12 h-12 rounded-full border border-portfolio-beige/30 flex items-center justify-center text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark hover:border-portfolio-orange transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-orange disabled:opacity-50"
                 onClick={() => paginate(1)}
                 aria-label="Next project"
               >
                 <ChevronRight size={24} />
               </button>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;