import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, MonitorPlay, ExternalLink, Mail, Youtube, X, Info, LayoutGrid, Maximize } from 'lucide-react';
import { projectsData, videosData } from '../data/projects';

// Helper to extract YouTube ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Extract unique categories from project data
const allCategories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

const Works = ({ isAlterMode, t }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [isGridView, setIsGridView] = useState(false);

  // Close preview modal when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewProject(null);
      }
    };
    if (previewProject) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [previewProject]);
  const trackRef = useRef(null);

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setPreviewProject(null);
  }, [selectedCategory]);

  // Auto-advance carousel
  useEffect(() => {
    if (isAlterMode || isPaused || filteredProjects.length <= 1 || previewProject) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % filteredProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAlterMode, isPaused, filteredProjects.length, previewProject]);

  const paginate = useCallback((dir) => {
    setActiveIndex(prev => {
      const next = prev + dir;
      if (next < 0) return filteredProjects.length - 1;
      if (next >= filteredProjects.length) return 0;
      return next;
    });
  }, [filteredProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      else if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Get visible cards (prev, active, next) for the strip
  const getVisibleIndices = () => {
    const len = filteredProjects.length;
    if (len === 0) return [];
    if (len === 1) return [{ index: 0, position: 'center' }];
    if (len === 2) return [
      { index: activeIndex, position: 'center' },
      { index: (activeIndex + 1) % len, position: 'right' }
    ];
    return [
      { index: (activeIndex - 1 + len) % len, position: 'left' },
      { index: activeIndex, position: 'center' },
      { index: (activeIndex + 1) % len, position: 'right' }
    ];
  };

  const visibleCards = getVisibleIndices();

  // Drag handling
  const dragStartX = useRef(0);
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) paginate(1);
      else paginate(-1);
    }
    setTimeout(() => setIsDragging(false), 50);
  };

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
          className="text-center text-5xl md:text-7xl font-serif mb-8 relative z-10"
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
          <>
            {/* Category Filters & View Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mb-8 gap-6 z-10"
            >
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                      selectedCategory === cat
                        ? 'bg-portfolio-orange text-portfolio-dark border-portfolio-orange shadow-lg shadow-portfolio-orange/20'
                        : 'bg-transparent text-portfolio-beige/70 border-portfolio-beige/20 hover:border-portfolio-beige/50 hover:text-portfolio-beige'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="flex items-center gap-2 px-4 py-2 bg-portfolio-dark/20 border border-portfolio-beige/20 rounded-full text-portfolio-beige/80 hover:text-portfolio-beige hover:border-portfolio-beige/50 hover:bg-portfolio-dark/40 transition-all text-sm font-bold"
              >
                {isGridView ? (
                  <>
                    <Maximize size={16} /> Carousel View
                  </>
                ) : (
                  <>
                    <LayoutGrid size={16} /> Grid View
                  </>
                )}
              </button>
            </motion.div>

            {/* Display Area (Grid or Carousel) */}
            <div className="w-full max-w-7xl z-10">
              {isGridView ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={`grid-${project.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative h-[300px] rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={() => setPreviewProject(project)}
                    >
                      {/* Card Image */}
                      <div className="w-full h-full relative">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-portfolio-dark/50 flex items-center justify-center text-portfolio-beige/30">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-portfolio-orange/90 text-portfolio-dark text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                            project.status === "Completed" ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-portfolio-dark'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="text-portfolio-orange/70 font-mono text-[10px] mb-1 font-bold tracking-widest">
                            {project.type} • {project.year}
                          </div>
                          <h3 className="text-lg font-serif text-white mb-1 leading-tight">
                            {project.title}
                          </h3>
                          <button className="mt-2 flex items-center gap-2 bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-portfolio-orange group-hover:text-portfolio-dark transition-all backdrop-blur-sm">
                            <Info size={14} />
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div 
                  className="relative w-full"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Cards Strip */}
                  <div 
                    ref={trackRef}
                    className="relative w-full h-[420px] md:h-[380px] flex items-center justify-center select-none overflow-hidden"
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchEnd={handleDragEnd}
                    style={{ touchAction: 'pan-y' }}
                  >
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleCards.map(({ index, position }) => {
                    const project = filteredProjects[index];
                    if (!project) return null;
                    const isCenter = position === 'center';

                    // Position offsets using pixel values for reliable placement
                    let xPercent = 0;
                    let scaleVal = 0.82;
                    let opacityVal = 0.6;
                    let zVal = 1;

                    if (isCenter) {
                      xPercent = 0;
                      scaleVal = 1;
                      opacityVal = 1;
                      zVal = 10;
                    } else if (position === 'left') {
                      xPercent = -65;
                      zVal = 5;
                    } else {
                      xPercent = 65;
                      zVal = 5;
                    }

                    return (
                      <motion.div
                        key={`card-${position}`}
                        initial={false}
                        animate={{
                          opacity: opacityVal,
                          scale: scaleVal,
                          x: `${xPercent}%`,
                          zIndex: zVal,
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                        className="absolute w-[75%] md:w-[42%] h-[88%] rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => {
                          if (isDragging) return;
                          if (!isCenter) {
                            paginate(position === 'left' ? -1 : 1);
                          }
                        }}
                        style={{ filter: isCenter ? 'none' : 'brightness(0.6) blur(1px)' }}
                      >
                        {/* Card Image */}
                        <div className="w-full h-full relative">
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                              draggable="false"
                            />
                          ) : (
                            <div className="w-full h-full bg-portfolio-dark/50 flex items-center justify-center text-portfolio-beige/30">
                              No Image
                            </div>
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-portfolio-orange/90 text-portfolio-dark text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                              {project.category}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                              project.status === "Completed" ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-portfolio-dark'
                            }`}>
                              {project.status}
                            </span>
                          </div>

                          {/* Bottom Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col items-start pointer-events-none">
                            <div className="text-portfolio-orange/70 font-mono text-xs mb-1 font-bold tracking-widest">
                              {project.type} • {project.year}
                            </div>
                            <h3 className="text-lg md:text-2xl font-serif text-white mb-1 leading-tight">
                              {project.title}
                            </h3>
                            <p className="text-white/60 text-xs mb-4">{project.role}</p>

                            {/* Info Button for center card */}
                            {isCenter && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewProject(project);
                                }}
                                className="mt-2 pointer-events-auto flex items-center gap-2 bg-white/90 text-portfolio-dark text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg backdrop-blur-sm"
                              >
                                <Info size={16} />
                                View Details
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-6 z-20 relative">
                <button
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-orange ${
                    isAlterMode 
                      ? 'border-portfolio-green/30 text-portfolio-green hover:bg-portfolio-green hover:text-portfolio-dark' 
                      : 'border-portfolio-beige/30 text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark hover:border-portfolio-orange'
                  }`}
                  onClick={() => paginate(-1)}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={22} />
                </button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {filteredProjects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
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
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-orange ${
                    isAlterMode 
                      ? 'border-portfolio-green/30 text-portfolio-green hover:bg-portfolio-green hover:text-portfolio-dark' 
                      : 'border-portfolio-beige/30 text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark hover:border-portfolio-orange'
                  }`}
                  onClick={() => paginate(1)}
                  aria-label="Next project"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          )}
          </div>

          {/* Preview Modal Overlay */}
          <AnimatePresence>
            {previewProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
                onClick={() => setPreviewProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-4xl max-h-[90vh] bg-portfolio-dark border border-portfolio-beige/20 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setPreviewProject(null)}
                    className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-portfolio-orange hover:text-portfolio-dark text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Image Section */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black/20 shrink-0">
                    {previewProject.image ? (
                      <img 
                        src={previewProject.image} 
                        alt={previewProject.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-portfolio-beige/30">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-portfolio-dark"></div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative z-10 bg-portfolio-dark/95 backdrop-blur-md overflow-y-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-portfolio-orange text-portfolio-dark text-xs font-bold px-3 py-1 rounded-full">
                        {previewProject.category}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        previewProject.status === "Completed" ? 'border-green-500 text-green-400' : 'border-yellow-500 text-yellow-400'
                      }`}>
                        {previewProject.status}
                      </span>
                    </div>

                    <div className="text-portfolio-orange/70 font-mono text-sm mb-2 font-bold tracking-widest">
                      {previewProject.type} • {previewProject.year}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight">
                      {previewProject.title}
                    </h3>
                    <p className="text-portfolio-beige/60 text-sm mb-6">{previewProject.role}</p>

                    <p className="text-portfolio-beige/90 text-sm md:text-base leading-relaxed mb-8">
                      {previewProject.summary}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-portfolio-beige/50 uppercase tracking-widest mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {previewProject.technologies.map(tech => (
                          <span key={tech} className="bg-portfolio-beige/10 border border-portfolio-beige/20 text-portfolio-beige text-xs px-3 py-1.5 rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3">
                      {previewProject.liveUrl && (
                        <a 
                          href={previewProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[140px] bg-portfolio-orange text-portfolio-dark py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-portfolio-yellow transition-colors"
                        >
                          <MonitorPlay size={18} />
                          {t?.view_project || "View Project"}
                        </a>
                      )}
                      {previewProject.githubUrl && (
                        <a 
                          href={previewProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[140px] border border-portfolio-beige/30 text-portfolio-beige py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-portfolio-beige/10 transition-colors"
                        >
                          <Github size={18} />
                          {t?.code || "Code"}
                        </a>
                      )}
                      {previewProject.demoUrl && (
                        <a 
                          href={previewProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[140px] bg-red-600 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 transition-colors"
                        >
                          <Youtube size={18} />
                          Demo Video
                        </a>
                      )}
                      {(!previewProject.liveUrl && !previewProject.githubUrl && previewProject.category === 'Client Based') && (
                        <a 
                          href="#contact"
                          onClick={() => setPreviewProject(null)} 
                          className="flex-1 min-w-[140px] border-2 border-portfolio-orange text-portfolio-orange py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-portfolio-orange hover:text-portfolio-dark transition-colors"
                        >
                          <Mail size={18} />
                          Contact Me to Access
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
        )}
      </div>
    </section>
  );
};

export default Works;
