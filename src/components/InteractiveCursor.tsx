import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { useDynamicColors } from './DynamicStyles';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
}

export function InteractiveCursor() {
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const colors = useDynamicColors();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail effect
      const newTrail: Trail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };
      setTrails(prev => [...prev.slice(-8), newTrail]); // Keep only last 8 trails

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           target.closest('a') !== null || 
                           target.closest('button') !== null ||
                           target.classList.contains('cursor-pointer');
      setIsHovering(isInteractive);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  // Get dynamic gradient colors
  const getGradientColors = () => {
    const colorMap: Record<string, string[]> = {
      cyan: ['rgba(6,182,212,0.15)', 'rgba(20,184,166,0.15)', 'rgba(16,185,129,0.15)'],
      purple: ['rgba(168,85,247,0.15)', 'rgba(236,72,153,0.15)', 'rgba(217,70,239,0.15)'],
      blue: ['rgba(59,130,246,0.15)', 'rgba(99,102,241,0.15)', 'rgba(139,92,246,0.15)'],
      orange: ['rgba(249,115,22,0.15)', 'rgba(239,68,68,0.15)', 'rgba(244,63,94,0.15)'],
      green: ['rgba(34,197,94,0.15)', 'rgba(16,185,129,0.15)', 'rgba(132,204,22,0.15)'],
    };
    return colorMap[colors.colorScheme] || colorMap.cyan;
  };

  const getRippleColor = () => {
    const colorMap: Record<string, string> = {
      cyan: 'rgb(34,211,238)',
      purple: 'rgb(217,70,239)',
      blue: 'rgb(139,92,246)',
      orange: 'rgb(251,146,60)',
      green: 'rgb(52,211,153)',
    };
    return colorMap[colors.colorScheme] || colorMap.cyan;
  };

  const gradientColors = getGradientColors();
  const rippleColor = getRippleColor();

  return (
    <>
      {/* Main cursor follower with glow */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="relative w-8 h-8"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${gradientColors[0]}, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Inner core */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${gradientColors[1]}, ${gradientColors[2]})`,
              boxShadow: `0 0 20px ${gradientColors[1]}, 0 0 40px ${gradientColors[2]}`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[99]"
            initial={{
              x: trail.x,
              y: trail.y,
              scale: 1,
              opacity: 0.6,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div
              className="w-3 h-3 rounded-full blur-sm"
              style={{
                background: `radial-gradient(circle, ${gradientColors[0]}, transparent)`,
                opacity: (index / trails.length) * 0.5,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Ripples with multiple rings */}
      <AnimatePresence>
        {clickRipples.map((ripple) => (
          <div key={ripple.id}>
            {/* Main ripple */}
            <motion.div
              className="fixed pointer-events-none z-[98]"
              initial={{ 
                x: ripple.x, 
                y: ripple.y,
              }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: 4, 
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-12 h-12 rounded-full border-2"
                style={{
                  borderColor: rippleColor,
                  boxShadow: `0 0 20px ${rippleColor}`,
                }}
              />
            </motion.div>

            {/* Secondary ripple */}
            <motion.div
              className="fixed pointer-events-none z-[98]"
              initial={{ 
                x: ripple.x, 
                y: ripple.y,
              }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ 
                  scale: 3, 
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="w-12 h-12 rounded-full border"
                style={{
                  borderColor: rippleColor,
                }}
              />
            </motion.div>

            {/* Particles burst */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const distance = 50;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={`particle-${ripple.id}-${i}`}
                  className="fixed pointer-events-none z-[98]"
                  initial={{ 
                    x: ripple.x, 
                    y: ripple.y,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    x: ripple.x + x,
                    y: ripple.y + y,
                    scale: 0,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  style={{
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: rippleColor,
                      boxShadow: `0 0 10px ${rippleColor}`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </AnimatePresence>

      {/* Large gradient following cursor - ambient light */}
      <motion.div
        className="fixed pointer-events-none z-[95]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 20,
        }}
      >
        <motion.div
          className="w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${gradientColors[0]}, ${gradientColors[1]} 40%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: colors.themeMode === 'dark' ? [0.3, 0.5, 0.3] : [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </>
  );
}
