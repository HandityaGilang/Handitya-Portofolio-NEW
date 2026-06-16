import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const RecordItem = ({ year, title, subtitle, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative pl-6 pb-8 border-l-2 border-ink last:border-0 last:pb-0"
  >
    {/* Timeline Dot */}
    <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-none bg-ink group-hover:bg-accent transition-colors"></div>
    
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
       <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 border border-accent/20 w-max">{year}</span>
       <h3 className="text-xl font-display uppercase font-bold text-ink">{title}</h3>
    </div>
    
    <p className="text-ink/60 font-mono text-xs uppercase mb-2">ORG: {subtitle}</p>
    <p className="text-ink/80 text-sm leading-relaxed border-l-2 border-transparent group-hover:border-accent pl-4 ml-[-20px] transition-all duration-300">{description}</p>
  </motion.div>
);

const Resume = () => {
  return (
    <section id="resume" className="py-20 border-b-[12px] border-ink mb-20 relative">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none overflow-hidden">
        <h2 className="text-[150px] font-display leading-none rotate-90 origin-top-right">MISSION LOG</h2>
      </div>

      <div className="flex items-center justify-between border-b-4 border-ink pb-4 mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display uppercase bg-ink text-paper px-4 py-2 inline-block">
          Mission Log
        </h2>
        <span className="font-mono text-accent text-sm md:text-base hidden sm:inline">RECORD_TYPE: EXP_EDU</span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 relative z-10">
        
        {/* Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-ink border-dashed pb-4">
            <Briefcase className="text-accent" size={24} />
            <h3 className="text-3xl font-display uppercase">Field Experience</h3>
          </div>
          <div className="space-y-2">
            <RecordItem 
              year="2025 - Present"
              title="Desktop Programmer Unity (Intern)"
              subtitle="Alpha Bumi Mandiri (Maganghub)"
              description="Developing a GIS (Geographic Information System) application for ITSensing. (Estimated completion: 23 May 2026)"
            />
            <RecordItem 
              year="2024"
              title="R&D Intern (VR & Simulation)"
              subtitle="Duta Wacana Christian University"
              description="Designed and built a physics classroom simulation app. Conducted R&D on VR technology usability. Collaborated with Chulalongkorn University on Mango Metaverse development."
            />
            <RecordItem 
              year="2022 - 2024"
              title="E-commerce Manager & Data Entry"
              subtitle="ISVARA BATIK"
              description="Managed the company's online sales platform and ensured accurate data entry for products, inventory, and customer transactions."
            />
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b-2 border-ink border-dashed pb-4">
            <GraduationCap className="text-accent" size={24} />
            <h3 className="text-3xl font-display uppercase">Training Data</h3>
          </div>
          <div className="space-y-2">
            <RecordItem 
              year="2020 - 2025"
              title="Informatics Engineering"
              subtitle="Duta Wacana Christian University (GPA 3.51/4.00)"
              description="Activities: Vice Chair of ITFEST 2022, Coordinator of UKDW ESPORT TURNEY GAME 2022, Member of UKDW ESPORT 2022. Interned in a lab developing a VR Framework for faculty research."
            />
            <RecordItem 
              year="2017 - 2020"
              title="Social Sciences"
              subtitle="Kolese De Britto High School"
              description="Active student focusing on Social Sciences."
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Resume;
