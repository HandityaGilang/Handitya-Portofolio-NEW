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
  {
    id: 1,
    name: "Abednego Lanang Wicaksono",
    role: "",
    company: "",
    content: "Handitya is an incredibly talented developer. His ability to deliver high-quality applications on time while maintaining excellent communication made our collaboration seamless. Highly recommended!",
    image: "/images/Screenshot 2026-06-17 023527.png"
  },
  {
    id: 2,
    name: "Raditya Bagas",
    role: "CEO",
    company: "Isvara Batik",
    content: "Working with him was a great experience. He easily understood our requirements and translated them into a beautiful, functional app. The attention to detail is fantastic.",
    image: "/images/Screenshot 2026-06-17 023718.png"
  },
  {
    id: 3,
    name: "52Herzt",
    role: "2d Artist",
    company: "",
    content: "AHHH, I absolutely love it! The result truly exceeded my expectations 😭😘😋 The design is clean, neat, and beautifully arranged. They were also very accommodating with detailed revision requests, and the final result was still incredibly satisfying. I’m genuinely so happy with it. Highly recommended!!",
    image: "/images/Logo.jpg"
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
                  className={`w-full max-w-[300px] md:max-w-none md:min-w-[400px] snap-center p-6 md:p-8 rounded-2xl relative flex-shrink-0 ${isAlterMode ? 'bg-portfolio-dark border border-portfolio-green/20' : 'bg-white shadow-xl'}`}
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
