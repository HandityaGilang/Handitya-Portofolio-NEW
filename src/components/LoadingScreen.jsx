import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json'; // Menggunakan star.json sebagai placeholder

const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-portfolio-green flex flex-col items-center justify-center text-portfolio-beige"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-48 h-48 md:w-64 md:h-64"
      >
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          onLoopComplete={() => {
             // Opsional: jika ingin trigger berdasarkan loop
          }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-serif text-xl italic tracking-widest"
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
