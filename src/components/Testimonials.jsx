import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Creative Director",
    company: "Studio Alpha",
    content: "Handitya's ability to translate complex concepts into stunning visual experiences is unmatched. A true professional who delivers beyond expectations.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead",
    company: "InnovateCorp",
    content: "Working with Garda (his alter ego) was a wild ride! The creativity he brought to our experimental campaign was exactly what we needed to stand out.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Marketing Manager",
    company: "BrandFlow",
    content: "The attention to detail in his work is incredible. From the micro-interactions to the overall layout, everything feels polished and purposeful.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials = ({ isAlterMode }) => {
  return (
    <section className={`py-20 overflow-hidden transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-green text-portfolio-beige' : 'bg-portfolio-beige text-portfolio-dark'}`}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Testimonials</h2>
          <p className="text-portfolio-orange text-sm uppercase tracking-widest">What people say</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl relative ${isAlterMode ? 'bg-portfolio-dark border border-portfolio-green/20' : 'bg-white shadow-xl'}`}
            >
              <Quote className={`absolute top-8 right-8 w-10 h-10 opacity-20 ${isAlterMode ? 'text-portfolio-orange' : 'text-portfolio-green'}`} />
              
              <p className={`mb-8 relative z-10 italic ${isAlterMode ? 'text-portfolio-beige/80' : 'text-portfolio-dark/80'}`}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-portfolio-orange"
                />
                <div>
                  <h4 className="font-bold font-serif">{testimonial.name}</h4>
                  <p className={`text-xs uppercase tracking-wider ${isAlterMode ? 'text-portfolio-yellow' : 'text-portfolio-orange'}`}>
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
