import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useDynamicColors } from './DynamicStyles';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

export function ProjectCard({ title, description, image, tags, liveUrl, githubUrl, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = useDynamicColors();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        className="group cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${colors.bg} border border-${colors.border}/10 hover:border-${colors.border}/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:${colors.shadow}/20`}>
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Gradient overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Hover indicator */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`px-6 py-3 bg-gradient-to-r ${colors.gradientBtn} backdrop-blur-xl rounded-full text-white flex items-center gap-2 shadow-lg`}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Ver detalles</span>
              </motion.div>
            </motion.div>

            {/* Quick action buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 bg-${colors.border}-500/20 backdrop-blur-xl rounded-lg border border-${colors.border}-400/40 hover:bg-${colors.border}-500/30 transition-all shadow-lg`}
                >
                  <ExternalLink className={`w-4 h-4 ${colors.textFull}`} />
                </motion.a>
              )}
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 bg-${colors.border}-500/20 backdrop-blur-xl rounded-lg border border-${colors.border}-400/40 hover:bg-${colors.border}-500/30 transition-all shadow-lg`}
                >
                  <Github className={`w-4 h-4 ${colors.textFull}`} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className={`mb-3 ${colors.textPrimary}`}>{title}</h3>
            <p className={`${colors.textTertiary} mb-4 line-clamp-2`}>{description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 bg-gradient-to-r ${colors.gradientBg} backdrop-blur-sm border border-${colors.border}/20 rounded-full ${colors.textFull} text-sm`}
                >
                  {tag}
                </motion.span>
              ))}
              {tags.length > 3 && (
                <span className={`px-3 py-1 ${colors.textMuted} text-sm`}>
                  +{tags.length - 3} más
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-3xl ${colors.bg} backdrop-blur-2xl border-2 border-${colors.border}/30 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(false)}
                className={`absolute top-4 right-4 z-10 p-3 ${colors.bg} backdrop-blur-xl rounded-full border border-${colors.border}/30 ${colors.textSecondary} hover:${colors.textFull} transition-all shadow-lg`}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Expanded Image */}
              <div className="relative h-96 overflow-hidden rounded-t-3xl">
                <motion.div
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent`} />
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent text-4xl`}
                >
                  {title}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`${colors.textSecondary} mb-6 text-lg leading-relaxed`}
                >
                  {description}
                </motion.p>

                {/* All Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className={`${colors.textPrimary} mb-3`}>Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`px-4 py-2 bg-gradient-to-r ${colors.gradientBg} backdrop-blur-sm border border-${colors.border}/30 rounded-full ${colors.textFull}`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 flex-wrap"
                >
                  {liveUrl && (
                    <motion.a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r ${colors.gradientBtn} rounded-xl hover:shadow-lg hover:${colors.shadow}/50 transition-all duration-300 flex items-center justify-center gap-2 text-white`}
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Ver en vivo</span>
                    </motion.a>
                  )}
                  {githubUrl && (
                    <motion.a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 min-w-[200px] px-6 py-3 ${colors.bgInput} backdrop-blur-xl border border-${colors.border}/30 rounded-xl hover:border-${colors.border}/50 transition-all duration-300 flex items-center justify-center gap-2 ${colors.textSecondary} hover:${colors.textFull}`}
                    >
                      <Github className="w-5 h-5" />
                      <span>Ver código</span>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
