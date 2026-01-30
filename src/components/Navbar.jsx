import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ isAlterMode, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: t?.about || 'About me', href: '#about' },
    { name: t?.work || 'Work', href: '#work' },
    !isAlterMode && { name: t?.resume || 'Resume', href: '#resume' }, // Hide Resume in Alter Mode
    !isAlterMode && { name: t?.skills || 'Skills', href: '#skills' }, // Hide Skills in Alter Mode
  ].filter(Boolean); // Remove false values

  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-50 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-between items-center border-b transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-dark/90 text-portfolio-beige border-portfolio-green/10' : 'bg-portfolio-green/90 text-portfolio-beige border-portfolio-beige/10'}`}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-serif font-bold flex items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-portfolio-orange">✦</span> {isAlterMode ? "Garda" : "Handitya"}
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="hover:text-portfolio-orange transition-colors font-medium text-sm uppercase tracking-wider"
          >
            {link.name}
          </motion.a>
        ))}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContactClick}
          className="bg-portfolio-orange text-portfolio-dark px-6 py-2 rounded-full font-bold text-sm uppercase hover:bg-portfolio-yellow transition-colors"
        >
          Get In touch!
        </motion.button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-portfolio-beige"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-portfolio-green border-b border-portfolio-beige/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-portfolio-beige hover:text-portfolio-orange py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              handleContactClick();
            }}
            className="bg-portfolio-orange text-portfolio-dark px-6 py-2 rounded-full font-bold text-sm uppercase w-full"
          >
            {t?.contact || 'Get In touch!'}
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
