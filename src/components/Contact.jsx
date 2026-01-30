import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, Twitter, Wallet, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import starAnimation from '../assets/star.json';

const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="0" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5382-9.674-3.533-13.6632a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

const Contact = ({ isAlterMode, t }) => {
  const navigate = useNavigate();

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
                    {t?.title_alter || 'Up to date'} <br />
                    <span className="text-portfolio-orange italic">{t?.subtitle_alter || 'with me!'}</span>
                  </>
                ) : (
                  <>
                    {t?.title_normal || "Let's work"} <br />
                    <span className="text-portfolio-orange italic">{t?.subtitle_normal || 'together!'}</span>
                  </>
                )}
              </h2>
              <p className={`text-lg mb-8 max-w-md ${isAlterMode ? 'text-portfolio-dark/60' : 'text-portfolio-beige/60'}`}>
                {isAlterMode 
                  ? (t?.desc_alter || "Follow my latest adventures, experiments, and creative chaos on social media.")
                  : (t?.desc_normal || "I'm always open to discussing product design work or partnership opportunities.")}
              </p>

              {!isAlterMode && (
                <motion.button 
                  onClick={() => navigate('/commission')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold shadow-xl transition-all ${
                    isAlterMode 
                    ? 'bg-portfolio-orange text-portfolio-dark hover:bg-portfolio-green hover:text-portfolio-dark border-2 border-transparent hover:border-portfolio-dark' 
                    : 'bg-portfolio-orange text-portfolio-dark hover:bg-portfolio-beige hover:text-portfolio-dark'
                  }`}
                >
                  <Wallet size={20} />
                  <span>Start a Project / Commission</span>
                </motion.button>
              )}
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

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-portfolio-green flex items-center justify-center text-portfolio-orange">
                      <DiscordIcon size={24} />
                    </div>
                    <span>han_garda</span>
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
