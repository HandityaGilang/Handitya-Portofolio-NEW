import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Instagram, Linkedin, Youtube, Twitter, Wallet, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';

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
    <footer id="contact" className="py-20 relative">
      <div className="flex items-center justify-between border-b-4 border-ink pb-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-display uppercase bg-ink text-paper px-4 py-2 inline-block flex items-center gap-3">
          <Terminal size={32} />
          {isAlterMode ? "Open Transmission" : "Communication Terminal"}
        </h2>
        <span className="font-mono text-accent text-sm md:text-base hidden sm:inline">PORT: 8080</span>
      </div>

      <div className="bg-ink text-paper p-8 md:p-12 border-4 border-ink shadow-[12px_12px_0px_rgba(232,28,108,1)] relative">
        {/* Terminal Header */}
        <div className="flex gap-2 mb-8 border-b border-paper/20 pb-4">
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-paper/50"></div>
          <div className="w-3 h-3 rounded-full bg-paper/20"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-accent">
              {isAlterMode ? (
                <>
                  {t?.title_alter || 'Up to date'} <br />
                  <span className="text-paper">{t?.subtitle_alter || 'with me!'}</span>
                </>
              ) : (
                <>
                  {t?.title_normal || "Let's work"} <br />
                  <span className="text-paper">{t?.subtitle_normal || 'together!'}</span>
                </>
              )}
            </h2>
            <p className="text-lg mb-8 font-mono max-w-md text-paper/70">
              {isAlterMode 
                ? (t?.desc_alter || "Follow my latest adventures, experiments, and creative chaos on social media.")
                : (t?.desc_normal || "I'm always open to discussing product design work or partnership opportunities.")}
            </p>

            {!isAlterMode && (
              <motion.button 
                onClick={() => navigate('/commission')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-ink font-display text-xl uppercase hover:bg-paper transition-colors shadow-lg"
              >
                <Wallet size={20} />
                <span>INIT_COMMISSION</span>
              </motion.button>
            )}
          </div>

          <div className="space-y-4 flex flex-col justify-center font-mono">
            {isAlterMode ? (
               // Social Media Links for Garda
              <div className="grid grid-cols-1 gap-4">
                 <motion.a 
                  href={SOCIAL_LINKS.YOUTUBE}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase group border border-paper/20 p-4 hover:border-accent hover:bg-accent/10 transition-colors"
                >
                  <Youtube size={20} className="text-accent group-hover:text-paper" />
                  <span>EXT_LINK: YOUTUBE_CHANNEL</span>
                </motion.a>
                
                <motion.a 
                  href={SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase group border border-paper/20 p-4 hover:border-accent hover:bg-accent/10 transition-colors"
                >
                  <Instagram size={20} className="text-accent group-hover:text-paper" />
                  <span>EXT_LINK: INSTAGRAM (@garda.creative)</span>
                </motion.a>

                 <motion.a 
                  href="#"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase group border border-paper/20 p-4 hover:border-accent hover:bg-accent/10 transition-colors"
                >
                  <Twitter size={20} className="text-accent group-hover:text-paper" />
                  <span>EXT_LINK: TWITTER (@garda_tweets)</span>
                </motion.a>
              </div>
            ) : (
              // Contact Info for Handitya
              <>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase border-l-2 border-accent pl-4"
                >
                  <MapPin size={20} className="text-accent" />
                  <span>LOC: Indonesia, Yogyakarta</span>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase border-l-2 border-accent pl-4"
                >
                  <Mail size={20} className="text-accent" />
                  <a href="mailto:hanhandityagw@gmail.com" className="hover:text-accent transition-colors">MAILTO: hanhandityagw@gmail.com</a>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase border-l-2 border-accent pl-4"
                >
                  <Phone size={20} className="text-accent" />
                  <span>TEL: +62 831 0852 7143</span>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm uppercase border-l-2 border-accent pl-4"
                >
                  <DiscordIcon size={20} className="text-accent" />
                  <span>DSCRD: han_garda</span>
                </motion.div>
              </>
            )}
          </div>

        </div>

        {/* Footer Metadata */}
        <div className="mt-20 pt-8 border-t-2 border-paper/20 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase text-paper/50">
          <p>COPYRIGHT &copy; {new Date().getFullYear()} HANDITYA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href={SOCIAL_LINKS.INSTAGRAM_PERSONAL} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href={SOCIAL_LINKS.LINKEDIN} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href={SOCIAL_LINKS.GITHUB} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">GITHUB</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;
