import { motion } from 'framer-motion';

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
    <p className="text-portfolio-beige/80 text-sm">{description}</p>
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

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Education */}
          <div>
            <h3 className="text-3xl font-serif mb-8 text-portfolio-yellow border-b border-portfolio-yellow/30 pb-4 inline-block">Education</h3>
            <div className="space-y-2">
              <ResumeItem 
                year="2020 - 2025"
                title="Informatics Engineering"
                subtitle="Duta Wacana Christian University (GPA 3.51/4.00)"
                description="Activities: Vice Chair of ITFEST 2022, Coordinator of UKDW ESPORT TURNEY GAME 2022, Member of UKDW ESPORT 2022. Interned in a lab developing a VR Framework for faculty research."
              />
              <ResumeItem 
                year="2017 - 2020"
                title="Social Sciences"
                subtitle="Kolese De Britto High School"
                description="Active student focusing on Social Sciences."
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-3xl font-serif mb-8 text-portfolio-yellow border-b border-portfolio-yellow/30 pb-4 inline-block">Experience</h3>
            <div className="space-y-2">
              <ResumeItem 
                year="2023 - Present"
                title="Freelance Web Developer"
                subtitle="Self-employed"
                description="Building websites for small businesses and personal portfolios."
              />
              <ResumeItem 
                year="2022"
                title="Web Design Intern"
                subtitle="Company Name"
                description="Assisted in designing user interfaces and creating wireframes."
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
