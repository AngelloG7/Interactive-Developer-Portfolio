import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useDynamicColors } from './DynamicStyles';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const colors = useDynamicColors();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:tu@email.com', label: 'Email' },
  ];

  const quickLinks = [
    { href: '#projects', label: 'Proyectos' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <footer className={`border-t border-${colors.border}/10 backdrop-blur-xl ${colors.bg} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3 
              className={`mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              whileHover={{ scale: 1.02 }}
            >
              Tu Nombre
            </motion.h3>
            <p className={colors.textTertiary}>
              Desarrollador de software creando experiencias digitales increíbles.
            </p>
            
            {/* Decorative line */}
            <motion.div
              className={`mt-4 h-1 bg-gradient-to-r ${colors.gradient} rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={`mb-4 ${colors.textPrimary}`}>Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className={`${colors.textTertiary} ${colors.hoverText} transition-colors inline-flex items-center gap-2 group`}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className={`w-0 h-0.5 bg-gradient-to-r ${colors.gradient} group-hover:w-4 transition-all duration-300`}
                    />
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={`mb-4 ${colors.textPrimary}`}>Sígueme</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -10, 10, -10, 0],
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 ${colors.bgInput} border border-${colors.border}/20 rounded-xl hover:${colors.bgHover} hover:border-${colors.border}/50 transition-all ${colors.textSecondary} ${colors.hoverText} group relative overflow-hidden`}
                    title={social.label}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                    <Icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className={`pt-8 border-t border-${colors.border}/10`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className={`${colors.textTertiary} text-center md:text-left`}
              whileHover={{ scale: 1.02 }}
            >
              © {currentYear} Angel Caro. Todos los derechos reservados.
            </motion.p>
            
            {/* Heart animation */}
            <motion.p 
              className={`${colors.textTertiary} flex items-center gap-2`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Hecho con
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`inline-block ${colors.textFull}`}
              >
                ♥
              </motion.span>
              en Colombia
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
