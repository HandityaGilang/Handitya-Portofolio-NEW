import { motion } from 'framer-motion';
import { Globe, Heart, Stamp } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const About = ({ isAlterMode, t }) => {
  return (
    <section id="about" className="py-20 relative border-b-[12px] border-ink mb-20">
      
      <div className="flex items-center justify-between border-b-4 border-ink pb-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-display uppercase bg-ink text-paper px-4 py-2 inline-block">
          Profile Record
        </h2>
        <span className="font-mono text-accent text-sm md:text-base">SEC-02</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
          
        {/* Left Side: ID Info */}
        <motion.div 
          className="bg-paper border-4 border-ink p-6 relative shadow-[8px_8px_0px_rgba(17,17,17,1)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Decorative screws */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-ink/50 flex items-center justify-center"><div className="w-1 h-[1px] bg-ink/50 rotate-45"></div></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-ink/50 flex items-center justify-center"><div className="w-1 h-[1px] bg-ink/50 rotate-45"></div></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-ink/50 flex items-center justify-center"><div className="w-1 h-[1px] bg-ink/50 rotate-45"></div></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-ink/50 flex items-center justify-center"><div className="w-1 h-[1px] bg-ink/50 rotate-45"></div></div>

          <div className="flex gap-6 items-start">
             <div className="w-24 h-24 bg-ink/10 border-2 border-ink p-1 shrink-0 group overflow-hidden">
               <img src={isAlterMode ? "/images/about-alter.jpg" : "/images/about-normal.png"} alt="Thumbnail" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300" onError={(e) => { e.target.style.display = 'none'; }} />
             </div>
             <div>
                <h3 className="font-display text-3xl mb-1">{isAlterMode ? "Garda" : "Handitya G."}</h3>
                <div className="font-mono text-xs uppercase space-y-1 mb-4 text-ink/80">
                  <p>DOB: <span className="bg-ink/10 px-1">CLASSIFIED</span></p>
                  <p>LOC: <span className="bg-ink/10 px-1">YOGYAKARTA, ID</span></p>
                  <p>OCC: <span className="bg-ink/10 px-1">{isAlterMode ? "CONTENT CREATOR" : "DEVELOPER"}</span></p>
                </div>
             </div>
          </div>
          
          <div className="mt-6 border-t-2 border-ink pt-4 relative">
             <h4 className="font-mono text-xs font-bold mb-2 uppercase">Official Stamp</h4>
             <div className="text-accent border-4 border-accent w-32 h-32 rounded-full flex items-center justify-center rotate-[-15deg] mx-auto absolute right-0 -top-10 opacity-70 mix-blend-multiply pointer-events-none hover:rotate-[-5deg] transition-transform">
               <div className="border-2 border-accent w-28 h-28 rounded-full flex items-center justify-center p-2 text-center">
                 <span className="font-display text-2xl uppercase font-bold tracking-wider leading-none">Verified<br/>Active</span>
               </div>
             </div>
             
             {/* Small social links as codes */}
             <div className="font-mono text-[10px] space-y-1 mt-8 text-ink/60 uppercase">
                <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="block hover:text-accent hover:underline">EXT_LINK: LINKEDIN_PROFILE</a>
                {isAlterMode && (
                   <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="block hover:text-accent hover:underline">EXT_LINK: YOUTUBE_CHANNEL</a>
                )}
             </div>
          </div>
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div 
          className="relative text-lg md:text-xl font-sans"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="prose prose-lg prose-p:leading-relaxed max-w-none text-ink">
            <p className="mb-6 font-medium">
              {isAlterMode ? (
                t?.bio_alter || "Welcome to The other side of me who likes to express with cover songs and content creating. Hoping one day I can make my own song."
              ) : (
                t?.bio_normal || "I am Johanes De Britto Handitya Gilang Wicaksana, an IT graduate with a strong passion for Game Programming, App Development, and Web Development. My goal is to continuously grow in the IT industry and utilize my skills to create impactful solutions for the community."
              )}
            </p>
            
            {/* Highlighted text styling using background */}
            <div className="bg-accent-dim border-l-4 border-accent p-4 font-mono text-sm mb-8 text-ink shadow-sm">
              <span className="font-bold uppercase mb-1 block opacity-50">Observer Note:</span>
              Subject shows high aptitude in <span className="font-bold underline decoration-accent decoration-2 underline-offset-2">{isAlterMode ? "creative expression" : "problem solving and logical structuring"}</span>.
            </div>
          </div>

          {/* Languages & Hobbies */}
          {!isAlterMode && (
            <div className="grid sm:grid-cols-2 gap-8 mt-12 pt-8 border-t-2 border-ink border-dashed">
              <div>
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2 uppercase tracking-wider bg-ink text-paper px-2 inline-flex">
                  <Globe size={18} className="text-accent" />
                  {t?.languages || "Languages"}
                </h3>
                <ul className="font-mono text-sm space-y-2">
                  <li className="flex justify-between border-b border-ink/10 pb-1"><span>[ID] Indonesian</span> <span className="text-accent font-bold">Native</span></li>
                  <li className="flex justify-between border-b border-ink/10 pb-1"><span>[EN] English</span> <span className="text-ink font-bold">Proficient</span></li>
                  <li className="flex justify-between border-b border-ink/10 pb-1"><span>[DE] German</span> <span className="text-ink/50">A1</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2 uppercase tracking-wider bg-ink text-paper px-2 inline-flex">
                  <Heart size={18} className="text-accent" />
                  {t?.hobbies || "Interests"}
                </h3>
                <ul className="font-mono text-sm space-y-2 list-disc list-inside">
                  <li>Traveling & Culinary</li>
                  <li>Singing</li>
                  <li>Game Dev & Modern Tech</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
