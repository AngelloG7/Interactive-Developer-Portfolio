import { motion } from 'motion/react';
import { Code2, Smartphone, Database, Cloud, Palette, Zap } from 'lucide-react';
import { useDynamicColors } from './DynamicStyles';

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"]
  },
  {
    icon: Database,
    title: "Backend Development",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    items: ["React Native", "Flutter", "iOS", "Android", "PWA"]
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    items: ["Figma", "Adobe XD", "Responsive Design", "Accessibility", "Design Systems"]
  },
  {
    icon: Zap,
    title: "Performance",
    items: ["Optimization", "SEO", "Web Vitals", "Testing", "Debugging"]
  }
];

export function Skills() {
  const colors = useDynamicColors();
  
  return (
    <section id="skills" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent text-5xl pb-4 border-b-4 border-${colors.border}/30 inline-block`}>
            Habilidades & Tecnologías
          </h2>
          <p className={`${colors.textTertiary} max-w-2xl mx-auto mt-6`}>
            Conjunto diverso de habilidades técnicas para crear soluciones completas y escalables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`backdrop-blur-xl ${colors.bg} border border-${colors.border}/10 rounded-2xl p-6 hover:border-${colors.border}/40 transition-all duration-500 hover:shadow-lg hover:${colors.shadow}/20 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className={`p-3 bg-gradient-to-br ${colors.gradientBg} rounded-xl relative overflow-hidden`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                    />
                    
                    <motion.div
                      animate={{ 
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon className={`w-6 h-6 ${colors.textFull} relative z-10`} />
                    </motion.div>
                  </motion.div>
                  
                  <h3 className={`${colors.textPrimary} group-hover:bg-gradient-to-r group-hover:${colors.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {skill.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                      }}
                      className={`px-3 py-1 ${colors.bgInput} border border-${colors.border}/20 rounded-full ${colors.textSecondary} hover:${colors.textFull} hover:border-${colors.border}/40 transition-all duration-300 cursor-default`}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                {/* Progress indicator */}
                <motion.div
                  className={`mt-4 pt-4 border-t border-${colors.border}/10`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <div className={`h-1.5 ${colors.bgInput} rounded-full overflow-hidden`}>
                    <motion.div
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${75 + Math.random() * 20}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
