import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Works from './Works';
import Resume from './Resume';
import Skills from './Skills';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home = ({ isAlterMode, toggleAlterMode, t }) => {
  return (
    <>
      <Navbar isAlterMode={isAlterMode} t={t?.navbar} />
      <Hero isAlterMode={isAlterMode} toggleAlterMode={toggleAlterMode} t={t?.hero} />
      <About isAlterMode={isAlterMode} toggleAlterMode={toggleAlterMode} t={t?.about} />
      {!isAlterMode && <Resume />}
      {!isAlterMode && <Skills />}
      <Works isAlterMode={isAlterMode} t={t?.works} />
      {!isAlterMode && <Testimonials isAlterMode={isAlterMode} />}
      <Contact isAlterMode={isAlterMode} t={t?.contact} />
    </>
  );
};

export default Home;
