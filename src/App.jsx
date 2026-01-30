import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Commission from './components/Commission';
import LoadingScreen from './components/LoadingScreen';
import { translations } from './translations';

function App() {
  const [isAlterMode, setIsAlterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en' or 'id'

  const t = translations[language];

  useEffect(() => {
    // Simulasi loading selama 3 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className={`min-h-screen flex justify-center transition-colors duration-500 ${isAlterMode ? 'bg-portfolio-yellow' : 'bg-black'}`}>
          <div className={`w-full max-w-[1440px] relative shadow-2xl overflow-hidden ${isAlterMode ? 'alter-mode bg-portfolio-dark' : 'bg-portfolio-beige'}`}>
            
            <Routes>
              <Route path="/" element={<Home isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} t={t} />} />
              <Route path="/commission" element={<Commission isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} t={t} />} />
            </Routes>

            {/* Floating Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className={`fixed bottom-8 right-8 z-50 px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2 transition-colors duration-300 ${
                isAlterMode 
                  ? 'bg-portfolio-orange text-portfolio-dark hover:bg-portfolio-beige' 
                  : 'bg-portfolio-dark text-portfolio-beige hover:bg-portfolio-orange hover:text-portfolio-dark'
              }`}
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'EN' : 'ID'}</span>
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
