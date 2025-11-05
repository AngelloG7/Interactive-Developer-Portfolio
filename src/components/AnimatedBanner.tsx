import { motion } from 'motion/react';
import { Code2, Sparkles, Zap, Rocket, Star, Award } from 'lucide-react';
import { useDynamicColors } from './DynamicStyles';

export function AnimatedBanner() {
  const colors = useDynamicColors();
  
  const bannerItems = [
    { icon: Code2, text: 'Desarrollo Web Moderno', color: 'from-0%' },
    { icon: Sparkles, text: 'Diseño Innovador', color: 'from-25%' },
    { icon: Zap, text: 'Alto Rendimiento', color: 'from-50%' },
    { icon: Rocket, text: 'Soluciones Escalables', color: 'from-75%' },
    { icon: Star, text: 'Experiencia de Usuario', color: 'from-100%' },
    { icon: Award, text: 'Código de Calidad', color: 'from-0%' },
  ];

  const bgClass = colors.themeMode === 'dark'
    ? `bg-gradient-to-r ${colors.gradientBg}`
    : `bg-gradient-to-r from-${colors.border}-100/30 via-${colors.border}-50/20 to-${colors.border}-100/30`;

  const gradientOverlayStart = colors.themeMode === 'dark'
    ? 'from-slate-950'
    : 'from-slate-50';

  const gradientOverlayEnd = colors.themeMode === 'dark'
    ? 'to-transparent'
    : 'to-transparent';

  return (
    <div className={`relative overflow-hidden ${bgClass} border-y border-${colors.border}/30 mt-20 transition-all duration-500`}>
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${colors.themeMode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-${colors.border}-400/40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Scrolling Content */}
      <div className="relative py-6">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{
            x: [0, -2400],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Repeat items for seamless loop */}
          {[...Array(5)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-16">
              {bannerItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={`${groupIndex}-${index}`}
                    className="flex items-center gap-4 px-6 group cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Icon with glow effect */}
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-50 blur-md`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <Icon className={`relative w-7 h-7 ${colors.textFull} drop-shadow-lg`} />
                    </motion.div>

                    {/* Text with gradient on hover */}
                    <motion.span 
                      className={`${colors.textSecondary} group-hover:bg-gradient-to-r group-hover:${colors.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                    >
                      {item.text}
                    </motion.span>

                    {/* Animated separator */}
                    <motion.div
                      className="flex gap-1"
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${colors.gradient}`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Gradient Overlays */}
      <div className={`absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r ${gradientOverlayStart} ${gradientOverlayEnd} pointer-events-none`} />
      <div className={`absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l ${gradientOverlayStart} ${gradientOverlayEnd} pointer-events-none`} />
      
      {/* Top glow line */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${colors.gradient}`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Bottom glow line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${colors.gradient}`}
        animate={{
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
