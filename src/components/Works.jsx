import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Play, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const videos = [
  // --- TEMPAT MENAMBAHKAN VIDEO BARU (UNTUK MODE GARDA) ---
  // Copy format di bawah ini dan tempelkan sebelum penutup kurung siku ]
  // {
  //   id: 4, (Pastikan ID unik/berbeda dari yang lain)
  //   title: "Judul Video",
  //   url: "Link Youtube (Bisa format watch?v= atau youtu.be)", 
  // },
  {
    id: 1,
    title: "Overdose",
    url: "https://www.youtube.com/watch?v=6xkJyJ3MP4Y", 
  },
  {
    id: 2,
    title: "ダーリン (Darling)",
    url: "https://www.youtube.com/watch?v=T163qB7hndQ", 
  },
  {
    id: 3,
    title: "Tonight",
    url: "https://youtu.be/E7s3c3vokOE", 
  }
];

// Helper to extract YouTube ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Works = ({ isAlterMode, t }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState('All');

  const projects = [
    // --- TEMPAT MENAMBAHKAN PROJECT BARU (UNTUK MODE HANDITYA) ---
    // Copy format di bawah ini dan tempelkan di dalam array
    // {
    //   id: 4, (Pastikan ID unik)
    //   title: "Nama Project",
    //   type: "Tipe Project (Web/Mobile/Design)",
    //   category: "Pilih salah satu: 'Personal Project', 'Academic', 'Client Based'",
    //   description: "Deskripsi singkat project...",
    //   // CARA PAKAI GAMBAR FILE SENDIRI:
    //   // 1. Simpan gambar di folder: public/images/
    //   // 2. Tulis path-nya seperti contoh di bawah:
    //   image: "/images/nama-file-anda.jpg", 
    //   tags: ["React", "CSS", "Lainnya"],
    //   link: "https://link-project-anda.com"
    // },
    {
      id: 0,
      title: t?.intro_title || "Welcome to My Workspace",
      type: "Introduction",
      category: "Intro",
      description: t?.intro_desc || "Here lies a collection of my digital craftsmanship. I believe in clean code, pixel-perfect design, and intuitive user experiences. Swipe to explore my recent projects.",
      image: null, // Intro card doesn't need an image
      tags: ["Portfolio", "Journey", "Showcase"]
    },
    {
      id: 1,
      title: "Virtual labs V 1.0",
      type: "Virtual Reality",
      category: "Academic",
      description: "An immersive VR learning simulation focused on series and parallel circuits, developed as an undergraduate thesis at Duta Wacana Christian University.",
      image: "https://img.itch.zone/aW1hZ2UvMzI3ODM2NS8xOTU2MzI5MS5wbmc=/original/CVJAr7.png", 
      tags: ["VR", "Unity", "Game Design"],
      link: "https://han-garda.itch.io/virtual-labs-v-10"
    },
    {
      id: 2,
      title: "Money Tracker(WIP)",
      type: "Mobile",
      category: "Personal Project",
      description: "A simple money tracker app for personal and shared savings. Users can track individual savings or save together online using a unique code to manage shared funds transparently.",
      image: "https://placehold.co/800x600/1a1a1a/e5e5e5?text=Money+Tracker",
      tags: ["Flutter", "Supabase", "Dart"],
      link: "https://github.com/HandityaGilang/Money-Tracker-By-Han"
    },
    {
      id: 3,
      title: "PDF.ReDoc (WIP)",
      type: "Experimental",
      category: "Personal Project",
      description: "A modern PDF-to-DOCX conversion app built with Next.js 15, designed to transform PDF documents into fully editable Word files while preserving the original layout.",
      image: "https://placehold.co/800x600/1a1a1a/e5e5e5?text=PDF.Redoc",
      tags: ["Next.js", "Node.js", "React"],
      link: "https://github.com/HandityaGilang/PDF.ReDoc"
    },
    {
      id: 4,
      title: "Isvara Inventory Manager (IIM)",
      type: "Desktop App",
      category: "Client Based",
      description: "A modern desktop inventory management application designed to help small and medium businesses manage stock, sales, and profits easily and efficiently.",
      image: "https://placehold.co/800x600/1a1a1a/e5e5e5?text=IIM",
      tags: ["Next.js", "Node.js", "React"],
      link: "https://github.com/HandityaGilang/Isvara-Inventory-Manager2/releases/tag/Isvara"
    },
    {
      id: 5,
      title: "Website portofolio Isvara Batik & Konveksi",
      type: "website",
      category: "Client Based",
      description: "Website Portofolio of a small business",
      image: "/images/Screenshot 2026-01-30 125753.png",
      tags: ["HTML", "PHP", "js"],
      link: "https://handityagilang.github.io/Website-Isvara-Konveksi/"
    },
    {
      id: 6,
      title: "Website portofolio 52Herzt",
      type: "website",
      category: "Client Based",
      description: "Website Portofolio of a artist commision",
      image: "/images/Screenshot 2026-01-31 011359.png",
      tags: ["React.js", "Node.js", "js"],
      link: "https://52herzt.vercel.app/"
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  // Auto-play logic (Only for Carousel)
  useEffect(() => {
    if (isAlterMode) return;
    if (filteredProjects.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % filteredProjects.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [isAlterMode, filteredProjects.length, filter]); // Reset interval when filter changes

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    setActiveIndex((current) => (current + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    setActiveIndex((current) => (current - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Helper to determine position relative to active index
  const getPosition = (index) => {
    if (filteredProjects.length === 0) return 'hidden';
    if (index === activeIndex) return 'center';
    
    // Logic circular untuk Next (Kanan)
    if (activeIndex === filteredProjects.length - 1 && index === 0) return 'right';
    if (index === activeIndex + 1) return 'right';

    // Logic circular untuk Prev (Kiri)
    if (activeIndex === 0 && index === filteredProjects.length - 1) return 'left';
    if (index === activeIndex - 1) return 'left';

    return 'hidden';
  };

  // Determine mobile offset for animation
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const xOffset = isMobile ? '85%' : '60%'; // Increased from 10% to 85% for mobile to show "side" cards clearly

  const toggleFilter = (category) => {
    setFilter(current => current === category ? 'All' : category);
  };

  return (
    <section id="work" className={`py-20 overflow-hidden min-h-screen flex flex-col justify-center relative transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-dark text-portfolio-green' : 'bg-portfolio-green text-portfolio-beige'}`}>
      <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-7xl font-serif mb-16"
        >
          {t?.title || "My Works"}
        </motion.h2>

        {/* Filter Buttons (Only in Normal Mode) */}
        {!isAlterMode && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Personal Project', 'Academic', 'Client Based'].map((category) => (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-bold uppercase tracking-wider
                  ${filter === category 
                    ? 'bg-portfolio-orange text-portfolio-dark border-portfolio-orange' 
                    : 'bg-transparent text-portfolio-beige border-portfolio-beige/30 hover:border-portfolio-orange hover:text-portfolio-orange'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {isAlterMode ? (
          /* Video Gallery Grid for Garda */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {videos.map((video) => {
              const videoId = getYouTubeId(video.url);
              const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.url;
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

              return (
                <motion.div 
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-portfolio-green/20 bg-black"
                >
                  {/* Facade Pattern: Show Image first, allow click to play */}
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
          /* Carousel Container for Handitya */
          <div className="relative w-full max-w-6xl h-[450px] md:h-[500px] flex items-center justify-center perspective-1000">
             <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <div className="text-portfolio-beige/50 text-xl font-serif">No projects found in this category.</div>
              ) : (
                filteredProjects.map((project, index) => {
                const position = getPosition(index);
                
                // Only render relevant slides
                if (position === 'hidden') return null;

                const isCenter = position === 'center';
                const isLeft = position === 'left';
                
                return (
                  <motion.div
                    key={project.id}
                    layoutId={project.id} // Enable smooth layout transitions
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.4,
                      scale: isCenter ? 1 : 0.8,
                      rotateY: isCenter ? 0 : isLeft ? 15 : -15,
                      x: isCenter ? 0 : isLeft ? `-${xOffset}` : xOffset,
                      zIndex: isCenter ? 10 : 1,
                      filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`absolute w-[90%] md:w-full max-w-3xl aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl cursor-pointer ${isCenter ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    onClick={() => {
                       if (isLeft) handlePrev();
                       if (!isLeft && !isCenter) handleNext();
                    }}
                  >
                    {/* Project Content */}
                    <div className="relative w-full h-full bg-portfolio-dark group">
                       {/* Background Image/Color */}
                       {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                          onError={(e) => {
                            const target = e.target;
                            if (target.src.includes('.jpg')) {
                              target.src = target.src.replace('.jpg', '.png');
                            } else {
                              // If png also fails or original wasn't jpg
                              target.style.display = 'none';
                              // You might want to show a fallback placeholder here if you had one
                            }
                          }}
                        />
                       ) : (
                         <div className="w-full h-full bg-portfolio-dark flex items-center justify-center">
                            {/* Intro text removed as requested */}
                         </div>
                       )}

                       {/* Content Overlay */}
                       <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end bg-gradient-to-t from-portfolio-dark via-portfolio-dark/50 to-transparent">
                          <div className="flex items-center gap-2 md:gap-4 mb-2">
                             <span className="text-portfolio-yellow uppercase tracking-widest text-[10px] md:text-sm">{project.type}</span>
                             <span className="px-2 py-0.5 border border-portfolio-beige/20 rounded-full text-[10px] text-portfolio-beige/60 uppercase">{project.category}</span>
                          </div>
                          <h3 className="text-xl md:text-5xl font-serif text-portfolio-beige mb-2 md:mb-4 leading-tight">{project.title}</h3>
                          
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isCenter ? 'auto' : 0, opacity: isCenter ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                             <p className="text-portfolio-beige/80 text-xs md:text-lg mb-3 md:mb-6 max-w-xl line-clamp-2 md:line-clamp-none">{project.description}</p>
                             <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                               {project.tags.map(tag => (
                                 <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 border border-portfolio-beige/20 rounded-full text-[10px] md:text-xs text-portfolio-beige/60">{tag}</span>
                               ))}
                             </div>
                             
                             {project.id !== 0 && (
                               <div className="flex gap-2 md:gap-4">
                                  {project.link && (
                                    <a 
                                      href={project.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 md:gap-2 bg-portfolio-orange text-portfolio-dark px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-[10px] md:text-sm hover:bg-white transition-colors"
                                    >
                                      {t?.view_project || "View"} <ExternalLink size={12} className="md:w-4 md:h-4" />
                                    </a>
                                  )}
                               </div>
                             )}
                          </motion.div>
                       </div>
                    </div>
                  </motion.div>
                );
              })
            )}
            </AnimatePresence>

            {/* Navigation Arrows (Hidden if no projects or single project) */}
            {filteredProjects.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-portfolio-dark/50 text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark backdrop-blur-sm transition-all z-20"
                >
                  <ArrowLeft size={20} className="md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-portfolio-dark/50 text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark backdrop-blur-sm transition-all z-20"
                >
                  <ArrowRight size={20} className="md:w-6 md:h-6" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex flex-col items-center mt-12 md:mt-16">
           <p className={`text-lg md:text-xl font-serif mb-4 ${isAlterMode ? 'text-portfolio-green/80' : 'text-portfolio-dark/80'}`}>
             interested in making a project?
           </p>
           <motion.button 
             onClick={() => navigate('/commission')}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-colors border-2 ${
               isAlterMode 
               ? 'bg-portfolio-green text-portfolio-dark border-portfolio-green hover:bg-transparent hover:text-portfolio-green' 
               : 'bg-portfolio-dark text-portfolio-beige border-portfolio-dark hover:bg-transparent hover:text-portfolio-dark'
             }`}
           >
             <Wallet size={20} />
             Commission Me
           </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Works;