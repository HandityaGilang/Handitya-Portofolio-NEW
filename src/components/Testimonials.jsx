import { motion } from 'framer-motion';
import { Quote, Plus, User } from 'lucide-react';

/* 
  PANDUAN MENAMBAH TESTIMONIAL BARU:
  1. Tambahkan object baru ke dalam array 'testimonials' di bawah.
  2. Format:
     {
       id: angka_unik,
       name: "Nama Orang",
       role: "Jabatan",
       company: "Perusahaan/Instansi",
       content: "Isi testimoni...",
       image: "/images/nama-file-foto.jpg" (Pastikan foto ada di folder public/images)
     }
  3. Jika ingin menambahkan foto sendiri:
     - Siapkan foto (rasio 1:1 atau kotak disarankan).
     - Masukkan ke folder 'public/images/'.
     - Ganti properti 'image' dengan path foto tersebut.
*/

const testimonials = [
  // {
  //   id: 1,
  //   name: "Sarah Johnson",
  //   role: "Creative Director",
  //   company: "Studio Alpha",
  //   content: "Handitya's ability to translate complex concepts into stunning visual experiences is unmatched.",
  //   image: "https://randomuser.me/api/portraits/women/44.jpg"
  // },
  // {
  //   id: 2,
  //   name: "Michael Chen",
  //   role: "Tech Lead",
  //   company: "InnovateCorp",
  //   content: "Working with Garda (his alter ego) was a wild ride! The creativity he brought to our experimental campaign was exactly what we needed.",
  //   image: "https://randomuser.me/api/portraits/men/32.jpg"
  // },
  // {
  //   id: 3,
  //   name: "Jessica Williams",
  //   role: "Marketing Manager",
  //   company: "BrandFlow",
  //   content: "The attention to detail in his work is incredible. From the micro-interactions to the overall layout, everything feels polished.",
  //   image: "https://randomuser.me/api/portraits/women/68.jpg"
  // },
  // {
  //   id: 4,
  //   name: "David Smith",
  //   role: "CEO",
  //   company: "StartUp Inc",
  //   content: "Highly recommended! Delivered the project on time and with great quality.",
  //   image: "https://randomuser.me/api/portraits/men/45.jpg"
  // }
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

        {/* Scrollable Container */}
        <div className="relative">
          {testimonials.length > 0 ? (
            <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`min-w-[300px] md:min-w-[400px] snap-center p-8 rounded-2xl relative flex-shrink-0 ${isAlterMode ? 'bg-portfolio-dark border border-portfolio-green/20' : 'bg-white shadow-xl'}`}
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
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
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
          ) : (
            // Empty State
            <div className={`text-center py-12 border-2 border-dashed rounded-xl ${isAlterMode ? 'border-portfolio-green/30 text-portfolio-green/50' : 'border-portfolio-dark/20 text-portfolio-dark/50'}`}>
               <div className="flex flex-col items-center justify-center gap-4">
                 <User size={48} className="opacity-50" />
                 <p className="text-xl font-serif">Belum ada testimoni saat ini.</p>
                 <p className="text-sm opacity-70 max-w-md mx-auto">
                   Testimoni dari klien akan muncul di sini. <br/>
                   (Edit file <code>src/components/Testimonials.jsx</code> untuk menambahkan data manual).
                 </p>
               </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
