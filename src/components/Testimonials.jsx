import { motion } from 'framer-motion';
import { Quote, User, CheckCircle2 } from 'lucide-react';

const testimonials = [];

const Testimonials = ({ isAlterMode }) => {
  return (
    <section className="py-20 border-b-[12px] border-ink mb-20 relative overflow-hidden">
      
      <div className="flex items-center justify-between border-b-4 border-ink pb-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-display uppercase bg-ink text-paper px-4 py-2 inline-block">
          External Reports
        </h2>
        <span className="font-mono text-accent text-sm md:text-base hidden sm:inline">TYPE: EVALUATION</span>
      </div>

      <div className="relative">
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-paper border-4 border-ink p-6 relative shadow-[8px_8px_0px_rgba(17,17,17,1)] flex flex-col"
              >
                {/* Stamp */}
                <div className="absolute top-4 right-4 rotate-12 opacity-80 flex items-center gap-1 text-accent border-2 border-accent px-2 py-1">
                  <CheckCircle2 size={14} />
                  <span className="font-display uppercase text-sm font-bold">Verified</span>
                </div>
                
                <div className="flex items-center gap-4 mb-6 border-b-2 border-ink pb-4">
                  <div className="w-16 h-16 border-2 border-ink bg-ink/10 p-1">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover grayscale contrast-125"
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl uppercase leading-none mb-1">{testimonial.name}</h4>
                    <p className="font-mono text-[10px] uppercase text-ink/60">
                      ID: {testimonial.role} <br/>
                      ORG: {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="relative flex-1">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 opacity-10 text-ink rotate-180" />
                  <p className="font-mono text-sm leading-relaxed text-ink/80 z-10 relative">
                    {testimonial.content}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t-2 border-ink border-dashed flex justify-between font-mono text-[10px] uppercase text-ink/50">
                  <span>REPORT_ID: EVAL-{testimonial.id.toString().padStart(4, '0')}</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-paper border-4 border-ink border-dashed p-12 text-center relative max-w-2xl mx-auto">
             {/* Corner tape */}
             <div className="absolute -top-4 -left-4 w-12 h-6 bg-white/50 backdrop-blur-sm -rotate-45 border border-ink/10"></div>
             <div className="absolute -bottom-4 -right-4 w-12 h-6 bg-white/50 backdrop-blur-sm -rotate-45 border border-ink/10"></div>
             
             <div className="flex flex-col items-center justify-center gap-4">
               <User size={48} className="text-ink/20 mb-4" />
               <p className="text-3xl font-display uppercase text-ink/40">NO EVALUATION RECORDS FOUND</p>
               <p className="font-mono text-xs uppercase text-ink/50">
                 External evaluation reports have not yet been filed for this subject.
               </p>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
