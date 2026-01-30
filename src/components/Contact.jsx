import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import Lottie from 'lottie-react';
import starAnimation from '../assets/star.json';

const Contact = ({ isAlterMode }) => {
  return (
    <footer id="contact" className={`bg-portfolio-beige text-portfolio-dark py-20 relative transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-dark text-portfolio-green' : ''}`}>
      <div className="container mx-auto px-6">
        
        <div className={`rounded-[3rem] p-10 md:p-20 relative overflow-hidden transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-green text-portfolio-dark' : 'bg-portfolio-dark text-portfolio-beige'}`}>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-portfolio-orange rounded-full translate-x-1/3 -translate-y-1/3 opacity-20 blur-3xl"></div>
          
          {/* Lottie Star Animation */}
          <div className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 opacity-90 pointer-events-none">
            <Lottie animationData={starAnimation} loop={true} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            
            <div>
              <h2 className="text-5xl md:text-7xl font-serif mb-8">
                {isAlterMode ? (
                  <>
                    Up to date <br />
                    <span className="text-portfolio-orange italic">with me!</span>
                  </>
                ) : (
                  <>
                    Let's work <br />
                    <span className="text-portfolio-orange italic">together!</span>
                  </>
                )}
              </h2>
              <p className={`text-lg mb-8 max-w-md ${isAlterMode ? 'text-portfolio-dark/60' : 'text-portfolio-beige/60'}`}>
                {isAlterMode 
                  ? "Follow my latest adventures, experiments, and creative chaos on social media." 
                  : "I'm always open to discussing product design work or partnership opportunities."}
              </p>
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              {isAlterMode ? (
                 // Social Media Links for Garda
                <div className="grid grid-cols-1 gap-4">
                   <motion.a 
                    href="#"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl group"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-dark flex items-center justify-center text-portfolio-orange group-hover:bg-portfolio-orange group-hover:text-portfolio-dark transition-colors">
                      <Youtube size={24} />
                    </div>
                    <span>Youtube Channel</span>
                  </motion.a>
                  
                  <motion.a 
                    href="#"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl group"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-dark flex items-center justify-center text-portfolio-orange group-hover:bg-portfolio-orange group-hover:text-portfolio-dark transition-colors">
                      <Instagram size={24} />
                    </div>
                    <span>@garda.creative</span>
                  </motion.a>

                   <motion.a 
                    href="#"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl group"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-dark flex items-center justify-center text-portfolio-orange group-hover:bg-portfolio-orange group-hover:text-portfolio-dark transition-colors">
                      <Twitter size={24} />
                    </div>
                    <span>@garda_tweets</span>
                  </motion.a>
                </div>
              ) : (
                // Contact Info for Handitya
                <>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-green flex items-center justify-center text-portfolio-orange">
                      <MapPin size={24} />
                    </div>
                    <span>Indonesia, Yogyakarta</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-green flex items-center justify-center text-portfolio-orange">
                      <Mail size={24} />
                    </div>
                    <a href="mailto:hanhandityagw@gmail.com" className="hover:text-portfolio-orange transition-colors">hanhandityagw@gmail.com</a>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-green flex items-center justify-center text-portfolio-orange">
                      <Phone size={24} />
                    </div>
                    <span>+62 831 0852 7143</span>
                  </motion.div>
                </>
              )}
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-portfolio-beige/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-portfolio-beige/40">
            <p>&copy; 2026 Handitya. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-portfolio-orange transition-colors">Instagram</a>
              <a href="#" className="hover:text-portfolio-orange transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-portfolio-orange transition-colors">GitHub</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Contact;
