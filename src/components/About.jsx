import { motion } from 'framer-motion';
import { Linkedin, Zap, Globe, Heart, Youtube, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = ({ isAlterMode, toggleAlterMode, t }) => {
  const navigate = useNavigate();

  return (
    <section id="about" className={`py-20 relative overflow-hidden transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-green text-portfolio-beige' : 'bg-portfolio-beige text-portfolio-dark'}`}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="relative md:pl-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             {/* Alter Button - Clickable */}
             <div className="absolute top-0 -right-4 md:-right-8 z-10 -mt-2">
              <button
                onClick={toggleAlterMode}
                className={`
                  p-3 rounded-full transition-all duration-300 cursor-pointer
                  ${isAlterMode 
                    ? 'bg-portfolio-orange text-portfolio-green shadow-[0_0_20px_rgba(255,215,0,0.5)]' 
                    : 'bg-portfolio-dark text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark'}
                `}
              >
                <Zap size={20} className={isAlterMode ? "fill-current" : ""} />
              </button>
            </div>

            <h2 className="text-6xl md:text-8xl font-serif leading-none mb-6">
              {isAlterMode ? (t?.hello_alter || "It's Garda!") : (t?.hello_normal || "Handitya's")} <br />
              <span className="italic relative inline-block">
                {isAlterMode ? (t?.here_alter || "Garda.") : (t?.here_normal || "here!")}
                <motion.svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-portfolio-orange"
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                </motion.svg>
              </span>
            </h2>
            
            <motion.div
              key={isAlterMode ? "alter" : "normal"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm md:text-xl text-portfolio-dark/80 mb-8 leading-relaxed">
                {isAlterMode ? (
                  t?.bio_alter || "Welcome to The other side of me who likes to express with cover songs and content creating. Hoping one day I can make my own song."
                ) : (
                  t?.bio_normal || "I am Johanes De Britto Handitya Gilang Wicaksana, an IT graduate with a strong passion for Game Programming, App Development, and Web Development. My goal is to continuously grow in the IT industry and utilize my skills to create impactful solutions for the community."
                )}
              </p>

              {/* NEW SECTION: Languages & Hobbies */}
              {!isAlterMode && (
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-serif text-2xl mb-2 flex items-center gap-2">
                      <Globe size={20} className="text-portfolio-orange" />
                      {t?.languages || "Languages"}
                    </h3>
                    <ul className="text-portfolio-dark/80 space-y-1 text-sm md:text-base">
                      <li>Bahasa Indonesia <span className="text-portfolio-orange text-xs">(Native)</span></li>
                      <li>English <span className="text-portfolio-orange text-xs">(Professional)</span></li>
                      <li>German <span className="text-portfolio-orange text-xs">(A1)</span></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl mb-2 flex items-center gap-2">
                      <Heart size={20} className="text-portfolio-orange" />
                      {t?.hobbies || "Hobbies & Interest"}
                    </h3>
                    <ul className="text-portfolio-dark/80 space-y-1 text-sm md:text-base">
                      <li>Traveling & Culinary</li>
                      <li>Singing</li>
                      <li>Game Dev & Modern Tech</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.a 
              href={isAlterMode ? "#" : "#"} // Ganti dengan link YouTube Garda nanti
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-portfolio-orange text-portfolio-dark px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors"
            >
              {isAlterMode ? <Youtube size={20} /> : <Linkedin size={20} />}
              {isAlterMode ? "youtube.com/@Garda" : "linkedin.com/in/handitya"}
            </motion.a>

            <div className="mt-4">
              <motion.button 
                onClick={() => navigate('/commission')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transition-colors ${
                  isAlterMode 
                  ? 'bg-portfolio-orange text-portfolio-dark hover:bg-portfolio-beige' 
                  : 'bg-portfolio-dark text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark'
                }`}
              >
                <Wallet size={20} />
                Commission Me
              </motion.button>
            </div>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div 
            animate={{ 
              rotate: isAlterMode ? 360 : 0,
              scale: isAlterMode ? 0.9 : 1
            }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            {isAlterMode ? (
              /* ALTER MODE - Original Design */
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute top-10 right-0 w-3/4 h-3/4 rounded-full opacity-20 blur-3xl bg-portfolio-yellow transition-colors duration-500"></div>
                
                <div className="relative z-10 bg-portfolio-dark text-portfolio-beige w-full h-full rounded-2xl overflow-hidden flex items-center justify-center border-4 border-portfolio-orange">
                   <img 
                     src="/images/about-alter.jpg"
                     alt="Garda"
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       const target = e.target;
                       if (target.src.includes('.jpg')) {
                         target.src = target.src.replace('.jpg', '.png');
                       } else {
                         target.style.display = 'none';
                         target.nextSibling.style.display = 'block';
                       }
                     }}
                   />
                   
                   <div className="hidden text-center p-8 w-full">
                    <p className="font-serif italic text-2xl opacity-50">[Garda]</p>
                    <p className="text-sm mt-2 opacity-30">Simpan 'about-alter.jpg' (atau .png) di public/images/</p>
                  </div>
                </div>
              </div>
            ) : (
              /* NORMAL MODE - Poster Design */
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto mt-12">
                {/* 1. Green Background Card - Dikecilkan */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[75%] bg-[#1F3933] rounded-sm shadow-2xl">
                    {/* 2. White Circle */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 bg-[#F5F0E6] rounded-full"></div>
                </div>

                {/* 3. The Person Image (PNG) - OUT OF FRAME (Z-Index lebih tinggi) */}
                <img 
                    src="/images/about-normal.png"
                    alt="Handitya"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] md:w-[95%] object-contain z-30 drop-shadow-2xl"
                    style={{ maxHeight: '120%' }}
                    onError={(e) => {
                        if (e.target.src.includes('.png')) {
                            e.target.src = e.target.src.replace('.png', '.jpg');
                        }
                    }}
                />

                {/* 6. AI Disclaimer Bubble (Circle Frame) */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute top-10 right-0 md:-right-8 z-50"
                >
                    {/* The Circle */}
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full border-4 border-portfolio-orange shadow-xl overflow-hidden flex items-center justify-center relative z-20">
                         <img 
                            src="/images/real-face.png" 
                            alt="Real Face" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback jika real-face.jpg belum ada, pakai about-normal.png
                                if (!e.target.src.includes('about-normal.png')) {
                                    e.target.src = '/images/about-normal.png';
                                }
                            }}
                         />
                    </div>
                </motion.div>

                {/* 4. Floating Pills */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-[30%] -left-4 md:-left-8 bg-portfolio-orange text-portfolio-dark px-5 py-2 rounded-full font-bold shadow-lg z-40 text-xs whitespace-nowrap"
                >
                    {t?.labels?.web || 'Web Developer'}
                </motion.div>

                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute top-[50%] -right-4 md:-right-8 bg-portfolio-orange text-portfolio-dark px-5 py-2 rounded-full font-bold shadow-lg z-40 text-xs whitespace-nowrap"
                >
                    {t?.labels?.game || 'Game Programmer'}
                </motion.div>

                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="absolute top-[70%] -left-4 md:-left-8 bg-portfolio-orange text-portfolio-dark px-5 py-2 rounded-full font-bold shadow-lg z-40 text-xs whitespace-nowrap"
                >
                    {t?.labels?.app || 'App Developer'}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
