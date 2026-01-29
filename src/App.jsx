import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isAlterMode, setIsAlterMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selama 3 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {!isLoading && (
        <div className={`bg-portfolio-beige min-h-screen selection:bg-portfolio-orange selection:text-white ${isAlterMode ? 'alter-mode' : ''}`}>
          <Navbar isAlterMode={isAlterMode} />
          <Hero isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} />
          <About isAlterMode={isAlterMode} toggleAlterMode={() => setIsAlterMode(!isAlterMode)} />
          {!isAlterMode && <Resume />}
          {!isAlterMode && <Skills />}
          <Works isAlterMode={isAlterMode} />
          <Testimonials isAlterMode={isAlterMode} />
          <Contact isAlterMode={isAlterMode} />
        </div>
      )}
    </>
  );
}

export default App;
