import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useDynamicColors } from './DynamicStyles';

export function Contact() {
  const colors = useDynamicColors();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'tu@email.com',
      href: 'mailto:tu@email.com'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+52 123 456 7890',
      href: 'tel:+521234567890'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Ciudad de México, México',
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent text-5xl pb-4 border-b-4 border-${colors.border}/30 inline-block`}>
            Contacto
          </h2>
          <p className={`${colors.textTertiary} max-w-2xl mx-auto mt-6`}>
            ¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className={`backdrop-blur-xl ${colors.bg} border border-${colors.border}/10 rounded-2xl p-8 hover:border-${colors.border}/30 transition-all duration-500`}>
              <h3 className={`mb-6 ${colors.textPrimary}`}>Información de Contacto</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 cursor-pointer group"
                    >
                      <motion.div 
                        className={`p-3 bg-gradient-to-br ${colors.gradientBg} rounded-xl relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                        />
                        <Icon className={`w-5 h-5 ${colors.textFull} relative z-10`} />
                      </motion.div>
                      <div>
                        <p className={colors.textMuted}>{info.label}</p>
                        <p className={`${colors.textPrimary} group-hover:${colors.textFull} transition-colors`}>
                          {info.value}
                        </p>
                      </div>
                    </motion.div>
                  );

                  return info.href ? (
                    <a key={index} href={info.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Decorative element */}
              <motion.div
                className={`mt-8 pt-8 border-t border-${colors.border}/20`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className={`${colors.textTertiary} text-sm`}>
                  Disponible para proyectos freelance y colaboraciones
                </p>
                <motion.div
                  className={`mt-3 h-2 bg-gradient-to-r ${colors.gradient} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={`backdrop-blur-xl ${colors.bg} border border-${colors.border}/10 rounded-2xl p-8 hover:border-${colors.border}/30 transition-all duration-500`}>
              <div className="space-y-4">
                <div>
                  <label className={`block ${colors.textSecondary} mb-2`}>Nombre</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 ${colors.bgInput} border border-${colors.border}/20 rounded-xl ${colors.textPrimary} placeholder-${colors.border}-300/50 focus:outline-none focus:border-${colors.border}/50 focus:ring-2 focus:ring-${colors.border}/20 transition-all`}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className={`block ${colors.textSecondary} mb-2`}>Email</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 ${colors.bgInput} border border-${colors.border}/20 rounded-xl ${colors.textPrimary} placeholder-${colors.border}-300/50 focus:outline-none focus:border-${colors.border}/50 focus:ring-2 focus:ring-${colors.border}/20 transition-all`}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className={`block ${colors.textSecondary} mb-2`}>Mensaje</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 ${colors.bgInput} border border-${colors.border}/20 rounded-xl ${colors.textPrimary} placeholder-${colors.border}-300/50 focus:outline-none focus:border-${colors.border}/50 focus:ring-2 focus:ring-${colors.border}/20 transition-all resize-none`}
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-3 bg-gradient-to-r ${colors.gradientBtn} rounded-xl hover:shadow-lg hover:${colors.shadow}/50 transition-all duration-300 flex items-center justify-center gap-2 text-white relative overflow-hidden group`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                  />
                  <span className="relative z-10">Enviar Mensaje</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-4 h-4 relative z-10" />
                  </motion.div>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
