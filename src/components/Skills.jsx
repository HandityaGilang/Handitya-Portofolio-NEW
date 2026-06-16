import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hardSkills, softSkills } from '../data/skills';
import * as LucideIcons from 'lucide-react';
import Matter from 'matter-js';

const HardSkillCard = ({ name, iconName }) => {
  const Icon = LucideIcons[iconName] || LucideIcons.Code;
  
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(255, 165, 0, 0.3)" }}
      className="bg-portfolio-dark/50 p-6 rounded-2xl border border-portfolio-beige/10 flex flex-col items-center gap-4 group h-full justify-center"
    >
      <div className="w-12 h-12 bg-portfolio-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-portfolio-beige" size={24} />
      </div>
      <h4 className="font-bold text-sm md:text-lg text-portfolio-beige text-center">{name}</h4>
    </motion.div>
  );
};

const SoftSkillBubble = ({ name, iconName, index, setRef, isPhysicsEnabled }) => {
  const Icon = LucideIcons[iconName] || LucideIcons.Brain;
  
  if (!isPhysicsEnabled) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-portfolio-yellow text-portfolio-dark px-6 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-portfolio-beige transition-colors text-sm md:text-base"
      >
        <Icon size={18} />
        {name}
      </motion.div>
    );
  }

  return (
    <div
      ref={setRef}
      className="absolute top-0 left-0 bg-portfolio-yellow text-portfolio-dark px-4 py-2 md:px-6 md:py-4 rounded-full font-bold flex items-center gap-2 cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl hover:bg-portfolio-beige transition-colors text-xs md:text-sm lg:text-base select-none z-20 touch-none origin-center"
      style={{ top: '0px', left: '0px', transform: 'translate(-50%, -50%)' }} // Initial hidden/offset state
      onPointerDown={(e) => {
        // Prevent default pointer behavior on mobile to allow matter.js to grab it correctly
        if (e.pointerType === 'touch') {
          e.target.releasePointerCapture(e.pointerId);
        }
      }}
    >
      <Icon size={16} className="md:w-[18px] md:h-[18px]" />
      <span className="whitespace-nowrap">{name}</span>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const elementsRef = useRef([]);
  const bodiesRef = useRef([]);
  const prefersReducedMotion = useReducedMotion();
  const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(!prefersReducedMotion);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize Matter.js Physics
  useEffect(() => {
    if (!isPhysicsEnabled || !containerRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Adjust gravity slightly for a floatier, more readable feel
    engine.gravity.y = 0.8;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Boundaries
    const wallOptions = { isStatic: true, render: { visible: false } };
    // Set floor boundary precisely at the bottom edge of the container height
    const floor = Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    // Optional ceiling
    const ceiling = Bodies.rectangle(width / 2, -500, width * 2, 100, wallOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // Create bodies for skills
    const bodies = [];
    elementsRef.current.forEach((el, index) => {
      if (!el) return;
      // Force element to be visible to get accurate dimensions if it was hidden
      const elWidth = el.offsetWidth || 150; // fallback width
      const elHeight = el.offsetHeight || 40; // fallback height

      // Initial drop spawn points
      const startX = width / 2 + (Math.random() - 0.5) * (width * 0.5);
      const startY = -200 - (index * 50) - (Math.random() * 100);

      const body = Bodies.rectangle(startX, startY, elWidth, elHeight, {
        chamfer: { radius: elHeight / 2 }, // Capsule shape
        restitution: 0.4, // Bounciness
        friction: 0.5,
        frictionAir: 0.01,
        density: 0.005,
        render: { visible: false }
      });

      // Add slight initial random rotation
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);

      bodies.push(body);
      Composite.add(engine.world, body);
    });
    
    bodiesRef.current = bodies;

    // Mouse Interaction
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    // Fix scroll capture issue on touch devices so it doesn't block page scrolling
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    // Allow touch scrolling on mobile
    mouseConstraint.mouse.element.removeEventListener("touchstart", mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener("touchmove", mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener("touchend", mouseConstraint.mouse.mouseup);

    // Custom touch handling to allow scrolling when not dragging a body
    mouseConstraint.mouse.element.addEventListener("touchstart", (e) => {
      mouse.mousedown(e);
      // Only prevent default (which blocks scrolling) if we actually clicked on a physics body
      if (mouseConstraint.body) {
        e.preventDefault();
      }
    }, { passive: false });

    mouseConstraint.mouse.element.addEventListener("touchmove", (e) => {
      mouse.mousemove(e);
      if (mouseConstraint.body) {
        e.preventDefault();
      }
    }, { passive: false });

    mouseConstraint.mouse.element.addEventListener("touchend", (e) => {
      mouse.mouseup(e);
    });

    Composite.add(engine.world, mouseConstraint);

    // Sync React elements with Physics bodies
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, index) => {
        const el = elementsRef.current[index];
        if (el) {
          const { x, y } = body.position;
          // Apply position and rotation, the element itself is absolutely positioned at top 0 left 0
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${body.angle}rad)`;
        }
      });
    });

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Handle Resize
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      // Update boundaries
      Matter.Body.setPosition(floor, { x: width / 2, y: height + 50 });
      Matter.Body.setPosition(leftWall, { x: -50, y: height / 2 });
      Matter.Body.setPosition(rightWall, { x: width + 50, y: height / 2 });
      Matter.Body.setPosition(ceiling, { x: width / 2, y: -150 });
      // Update sizes (Matter.js body scaling is a bit complex, so we just reposition walls)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
      if (engine.world) {
          Composite.clear(engine.world);
      }
      
      // Cleanup DOM styles when physics is disabled
      elementsRef.current.forEach(el => {
        if (el) el.style.transform = '';
      });
    };
  }, [isPhysicsEnabled]);

  // Controls Handlers
  const handleReset = () => {
    if (!containerRef.current || !engineRef.current || !bodiesRef.current.length) return;
    const width = containerRef.current.clientWidth;
    
    bodiesRef.current.forEach((body, index) => {
      const startX = width / 2 + (Math.random() - 0.5) * (width * 0.5);
      const startY = -200 - (index * 50) - (Math.random() * 100);
      
      Matter.Body.setPosition(body, { x: startX, y: startY });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(body, 0);
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);
    });
    
    if (isPaused) handlePauseToggle();
  };

  const handleShuffle = () => {
    if (!bodiesRef.current.length) return;
    bodiesRef.current.forEach(body => {
      const forceMagnitude = 0.05 * body.mass;
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * forceMagnitude,
        y: -Math.random() * forceMagnitude * 2 // Push upwards
      });
    });
    if (isPaused) handlePauseToggle();
  };

  const handlePauseToggle = () => {
    if (!runnerRef.current) return;
    if (isPaused) {
      runnerRef.current.enabled = true;
    } else {
      runnerRef.current.enabled = false;
    }
    setIsPaused(!isPaused);
  };

  return (
    <section id="skills" className="py-20 bg-portfolio-green text-portfolio-beige relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-portfolio-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-portfolio-yellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-4">Skills</h2>
          <p className="text-portfolio-yellow text-sm uppercase tracking-widest">My Arsenal & Superpowers</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Hard Skills Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-portfolio-orange flex items-center justify-center text-portfolio-dark">
                <LucideIcons.Cpu size={20} />
              </div>
              <h3 className="text-3xl font-serif">Technical Skills</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {hardSkills.map((skill, index) => (
                <HardSkillCard key={index} name={skill.name} iconName={skill.icon} />
              ))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="relative">
             <div className="flex items-center gap-3 mb-8 lg:justify-end">
              <div className="w-10 h-10 rounded-lg bg-portfolio-yellow flex items-center justify-center text-portfolio-dark">
                <LucideIcons.Brain size={20} />
              </div>
              <h3 className="text-3xl font-serif">Professional Skills</h3>
            </div>

            <div 
              ref={containerRef}
              className="bg-portfolio-dark/30 backdrop-blur-sm rounded-[2rem] border border-portfolio-beige/10 h-[420px] md:h-[520px] relative overflow-hidden"
            >
               {/* Controls */}
               <div className="absolute top-4 right-4 z-30 flex gap-2">
                 {isPhysicsEnabled && (
                   <>
                     <button 
                       onClick={handleReset}
                       className="p-2 bg-portfolio-dark/50 hover:bg-portfolio-dark rounded-lg text-portfolio-beige transition-colors"
                       aria-label="Reset physics layout"
                     >
                       <LucideIcons.RotateCcw size={18} />
                     </button>
                     <button 
                       onClick={handleShuffle}
                       className="p-2 bg-portfolio-dark/50 hover:bg-portfolio-dark rounded-lg text-portfolio-beige transition-colors"
                       aria-label="Shuffle skills"
                     >
                       <LucideIcons.Shuffle size={18} />
                     </button>
                     <button 
                       onClick={handlePauseToggle}
                       className="p-2 bg-portfolio-dark/50 hover:bg-portfolio-dark rounded-lg text-portfolio-beige transition-colors"
                       aria-label={isPaused ? "Play physics" : "Pause physics"}
                     >
                       {isPaused ? <LucideIcons.Play size={18} /> : <LucideIcons.Pause size={18} />}
                     </button>
                   </>
                 )}
                 <button 
                   onClick={() => setIsPhysicsEnabled(!isPhysicsEnabled)}
                   className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-colors font-bold text-sm ${isPhysicsEnabled ? 'bg-portfolio-yellow text-portfolio-dark' : 'bg-portfolio-dark/50 hover:bg-portfolio-dark text-portfolio-beige'}`}
                   aria-label={isPhysicsEnabled ? "Disable physics layout" : "Enable physics layout"}
                 >
                   {isPhysicsEnabled ? (
                     <>
                       <LucideIcons.LayoutGrid size={16} />
                       Grid View
                     </>
                   ) : (
                     <>
                       <LucideIcons.Dna size={16} />
                       Physics View
                     </>
                   )}
                 </button>
               </div>

               {/* Center Icon */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
                  <LucideIcons.Brain size={200} />
               </div>

               {/* Skills Container */}
               <div 
                 className={`w-full h-full relative z-10 ${!isPhysicsEnabled ? 'flex flex-wrap justify-center gap-4 items-center p-8' : ''}`}
                 style={{ touchAction: isPhysicsEnabled ? 'none' : 'auto' }}
               >
                 {softSkills.map((skill, index) => (
                   <SoftSkillBubble 
                     key={index} 
                     name={skill.name} 
                     iconName={skill.icon} 
                     index={index} 
                     isPhysicsEnabled={isPhysicsEnabled}
                     setRef={el => { elementsRef.current[index] = el; }}
                   />
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;