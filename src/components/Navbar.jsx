import { motion } from 'framer-motion';
import { Menu, X, TerminalSquare } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ isAlterMode, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: t?.about || 'Profile', href: '#about' },
    { name: t?.work || 'Archive', href: '#works' },
    !isAlterMode && { name: t?.resume || 'Log', href: '#resume' }, // Hide Resume in Alter Mode
    !isAlterMode && { name: t?.skills || 'System', href: '#skills' }, // Hide Skills in Alter Mode
  ].filter(Boolean); // Remove false values

  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-display font-bold flex items-center gap-2 cursor-pointer bg-ink text-paper px-4 py-2 uppercase border-2 border-ink"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-accent">
          <TerminalSquare size={24} />
        </span>
        {isAlterMode ? "Garda" : "Handitya"}
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 bg-paper border-4 border-ink p-2 shadow-[4px_4px_0px_rgba(17,17,17,1)]">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-ink hover:text-paper hover:bg-ink px-4 py-1 transition-colors font-mono font-bold text-xs uppercase tracking-wider"
          >
            [{link.name}]
          </motion.a>
        ))}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContactClick}
          className="bg-accent text-ink px-6 py-2 font-display text-lg uppercase hover:bg-ink hover:text-paper transition-colors ml-4 border-2 border-transparent hover:border-ink"
        >
          {t?.contact || 'Terminal'}
        </motion.button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden bg-ink text-paper p-2 border-2 border-ink"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-4 right-4 bg-paper border-4 border-ink p-6 flex flex-col gap-4 md:hidden shadow-[8px_8px_0px_rgba(17,17,17,1)] mt-2"
        >
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-ink hover:text-paper hover:bg-ink p-2 font-mono text-sm font-bold uppercase transition-colors"
              onClick={() => setIsOpen(false)}
            >
              [{link.name}]
            </a>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              handleContactClick();
            }}
            className="bg-accent text-ink px-6 py-3 font-display text-xl uppercase mt-4 border-2 border-ink"
          >
            {t?.contact || 'Open Terminal'}
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
