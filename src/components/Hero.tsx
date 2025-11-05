import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useDynamicColors } from './DynamicStyles';

export function Hero() {
  const colors = useDynamicColors();
  const floatingImages = [
    {
      src: "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2UlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzYyMjk0MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Workspace"
    },
    {
      src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NjIzMDk0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Development"
    },
    {
      src: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYyMjExMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Dashboard"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Images Background */}
      <div className="absolute inset-0 z-0">
        {floatingImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1, 0.8],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
            style={{
              left: `${20 + index * 30}%`,
              top: `${10 + index * 20}%`,
              width: '300px',
              height: '300px',
            }}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-2xl blur-sm"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`backdrop-blur-xl ${colors.bgAlt} border border-${colors.border}/20 rounded-3xl p-12 shadow-2xl`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className={`inline-block px-4 py-2 bg-gradient-to-r ${colors.gradientBg} backdrop-blur-sm border border-${colors.border}/20 rounded-full mb-6 ${colors.textFull}`}>
              👋 Hola, Soy Angello Desarrollador de Software
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
          >
            Creando Experiencias Digitales Increíbles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`mb-8 ${colors.textSecondary} max-w-2xl mx-auto`}
          >
            Desarrollador Full Stack especializado en crear aplicaciones web modernas, 
            escalables y centradas en el usuario con tecnologías de vanguardia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="#projects"
              className={`px-8 py-3 bg-gradient-to-r ${colors.gradientBtn} rounded-full hover:shadow-lg hover:${colors.shadow}/50 transition-all duration-300 hover:scale-105 text-white`}
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className={`px-8 py-3 backdrop-blur-sm ${colors.bgInput} border border-${colors.border}/30 rounded-full hover:bg-opacity-80 hover:border-${colors.border}/50 transition-all duration-300 ${colors.textSecondary}`}
            >
              Contactar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-6 justify-center mt-8"
          >
            <a href="#" className={`${colors.textTertiary} ${colors.hoverText} transition-colors`}>
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className={`${colors.textTertiary} ${colors.hoverText} transition-colors`}>
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className={`${colors.textTertiary} ${colors.hoverText} transition-colors`}>
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12"
        >
          <motion.a
            href="#projects"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className={`w-8 h-8 ${colors.icon} mx-auto`} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
