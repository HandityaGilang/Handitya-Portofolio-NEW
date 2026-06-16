import React from 'react';
import { motion } from 'framer-motion';
import { experienceData, educationData, certsAndAwardsData } from '../data/experience';

const ResumeItem = ({ year, title, subtitle, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-10 border-l-2 border-portfolio-orange last:border-0 last:pb-0"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-portfolio-orange border-2 border-portfolio-beige"></div>
    <span className="text-portfolio-orange font-bold text-sm mb-1 block">{year}</span>
    <h3 className="text-xl font-serif font-bold text-portfolio-beige">{title}</h3>
    <p className="text-portfolio-beige/60 italic text-sm mb-2">{subtitle}</p>
    {description && <p className="text-portfolio-beige/80 text-sm whitespace-pre-line">{description}</p>}
  </motion.div>
);

const Resume = () => {
  return (
    <section id="resume" className="py-20 bg-portfolio-green text-portfolio-beige">
      <div className="container mx-auto px-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-7xl font-serif mb-16 text-portfolio-orange"
        >
          Resume
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Education & Certifications */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-3xl font-serif mb-8 text-portfolio-yellow border-b border-portfolio-yellow/30 pb-4 inline-block">Education</h3>
              <div className="space-y-2">
                {educationData.map((edu, idx) => (
                  <ResumeItem key={idx} {...edu} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif mb-8 text-portfolio-yellow border-b border-portfolio-yellow/30 pb-4 inline-block">Certifications & Awards</h3>
              <div className="space-y-2">
                {certsAndAwardsData.map((cert, idx) => (
                  <ResumeItem key={idx} {...cert} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience */}
          <div>
            <h3 className="text-3xl font-serif mb-8 text-portfolio-yellow border-b border-portfolio-yellow/30 pb-4 inline-block">Work Experience</h3>
            <div className="space-y-2">
              {experienceData.map((exp, idx) => (
                <ResumeItem key={idx} {...exp} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;