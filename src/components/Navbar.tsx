import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { useDynamicColors } from './DynamicStyles';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const colors = useDynamicColors();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#contact', label: 'Contacto' },
  ];

  const bgClass = colors.themeMode === 'dark' 
    ? `${colors.bg}/80` 
    : 'bg-white/80';

  const borderClass = `border-${colors.border}/20`;
  const shadowClass = `shadow-${colors.border}/5`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? `${bgClass} backdrop-blur-2xl border-b ${borderClass} shadow-lg ${shadowClass}`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with animated background */}
          <motion.a
            href="#home"
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${colors.gradientBg} rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <span className={`relative text-2xl bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent px-2`}>
              Portfolio
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                onClick={() => setActiveSection(link.href)}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === link.href
                    ? colors.textFull
                    : colors.textSecondary
                }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                
                {/* Animated underline */}
                <motion.span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Active indicator */}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className={`absolute inset-0 bg-gradient-to-r ${colors.gradientBg} rounded-lg -z-10`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Contact Info with stagger animation */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { href: "mailto:tu@email.com", icon: Mail, title: "Email" },
              { href: "tel:+521234567890", icon: Phone, title: "Teléfono" },
              { href: "#", icon: Github, title: "GitHub" },
              { href: "#", icon: Linkedin, title: "LinkedIn" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-lg ${colors.textTertiary} ${colors.hoverText} ${colors.bgHover} transition-all duration-300`}
                  title={item.title}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.85, rotate: 90 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-lg ${colors.textSecondary} ${colors.hoverText} ${colors.bgHover} transition-all duration-300`}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className={`mt-4 rounded-xl ${colors.bg} backdrop-blur-xl border ${borderClass} p-4`}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
              >
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block ${colors.textSecondary} ${colors.hoverText} transition-all duration-300 py-3 px-4 rounded-lg ${colors.bgHover} border-l-3 border-transparent hover:border-${colors.border}`}
                      whileTap={{ scale: 0.98, x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                
                <motion.div 
                  className={`flex gap-3 mt-4 pt-4 border-t ${borderClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { href: "mailto:tu@email.com", icon: Mail },
                    { href: "tel:+521234567890", icon: Phone },
                    { href: "#", icon: Github },
                    { href: "#", icon: Linkedin },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={index}
                        href={item.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2.5 rounded-lg ${colors.textTertiary} ${colors.hoverText} ${colors.bgHover} transition-colors`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
