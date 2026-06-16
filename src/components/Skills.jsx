import React from 'react';
import { motion } from 'framer-motion';
import { hardSkills, softSkills } from '../data/skills';
import * as LucideIcons from 'lucide-react';

const HardSkillCard = ({ name, iconName }) => {
  const Icon = LucideIcons[iconName] || LucideIcons.Code;
  
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(255, 165, 0, 0.3)" }}
      className="bg-portfolio-dark/50 p-6 rounded-2xl border border-portfolio-beige/10 flex flex-col items-center gap-4 group h-full justify-center"
    >
      <div className="w-12 h-12 bg-portfolio-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-portfolio-beige" size={24} />
      </div>
      <h4 className="font-bold text-sm md:text-lg text-portfolio-beige text-center">{name}</h4>
    </motion.div>
  );
};

const SoftSkillBubble = ({ name, iconName, index }) => {
  const Icon = LucideIcons[iconName] || LucideIcons.Brain;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      className="bg-portfolio-yellow text-portfolio-dark px-6 py-4 rounded-full font-bold flex items-center gap-2 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl hover:bg-portfolio-beige transition-colors text-sm md:text-base"
    >
      <Icon size={18} />
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-portfolio-green text-portfolio-beige relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-portfolio-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-portfolio-yellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-4">Skills</h2>
          <p className="text-portfolio-yellow text-sm uppercase tracking-widest">My Arsenal & Superpowers</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Hard Skills Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-portfolio-orange flex items-center justify-center text-portfolio-dark">
                <LucideIcons.Cpu size={20} />
              </div>
              <h3 className="text-3xl font-serif">Technical Skills</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {hardSkills.map((skill, index) => (
                <HardSkillCard key={index} name={skill.name} iconName={skill.icon} />
              ))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="relative">
             <div className="flex items-center gap-3 mb-8 lg:justify-end">
              <div className="w-10 h-10 rounded-lg bg-portfolio-yellow flex items-center justify-center text-portfolio-dark">
                <LucideIcons.Brain size={20} />
              </div>
              <h3 className="text-3xl font-serif">Professional Skills</h3>
            </div>

            <div className="bg-portfolio-dark/30 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-portfolio-beige/10 min-h-[400px] flex items-center justify-center relative">
               {/* Center Icon */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <LucideIcons.Brain size={200} />
               </div>

               <div className="flex flex-wrap justify-center gap-4 relative z-10">
                 {softSkills.map((skill, index) => (
                   <SoftSkillBubble key={index} name={skill.name} iconName={skill.icon} index={index} />
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;