import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Commission from './components/Commission';
import LoadingScreen from './components/LoadingScreen';
import { translations } from './translations';

import DossierFrame from './components/DossierFrame';

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
        <div className={`min-h-screen flex justify-center transition-colors duration-500 bg-frame py-0 md:py-8 ${isAlterMode ? 'alter-mode' : ''}`}>
          <DossierFrame isAlterMode={isAlterMode}>
            
            <Routes>
              <Route path="/" element={<Home isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} t={t} />} />
              <Route path="/commission" element={<Commission isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} t={t} />} />
            </Routes>

            {/* Floating Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className={`fixed bottom-8 right-8 z-50 px-4 py-2 font-mono text-xs font-bold border-2 shadow-xl flex items-center gap-2 transition-colors duration-300 ${
                isAlterMode 
                  ? 'bg-ink text-accent border-accent hover:bg-accent hover:text-ink' 
                  : 'bg-ink text-paper border-ink hover:bg-accent hover:border-accent hover:text-paper'
              }`}
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'EN' : 'ID'}</span>
            </motion.button>
          </DossierFrame>
        </div>
      )}
    </>
  );
}

export default App;
