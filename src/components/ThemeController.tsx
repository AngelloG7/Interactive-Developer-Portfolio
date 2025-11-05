import { motion, AnimatePresence } from 'motion/react';
import { Shuffle, Sun, Moon } from 'lucide-react';
import { useTheme, ColorScheme } from './ThemeContext';
import { useDynamicColors } from './DynamicStyles';

export function ThemeController() {
  const { colorScheme, themeMode, setColorScheme, toggleThemeMode } = useTheme();
  const colors = useDynamicColors();

  const colorOptions: { name: ColorScheme; colors: string[] }[] = [
    { name: 'cyan', colors: ['#22d3ee', '#14b8a6', '#10b981'] },
    { name: 'purple', colors: ['#a855f7', '#ec4899', '#d946ef'] },
    { name: 'blue', colors: ['#3b82f6', '#6366f1', '#8b5cf6'] },
    { name: 'orange', colors: ['#f97316', '#ef4444', '#f43f5e'] },
    { name: 'green', colors: ['#22c55e', '#10b981', '#84cc16'] },
  ];

  const getRandomColor = () => {
    const availableColors = colorOptions.filter(c => c.name !== colorScheme);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex].name;
  };

  const handleRandomColor = () => {
    const randomColor = getRandomColor();
    setColorScheme(randomColor);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col gap-3">
      {/* Control Buttons */}
      <div className="flex flex-col gap-3">
        {/* Theme Mode Toggle */}
        <motion.button
          onClick={toggleThemeMode}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 backdrop-blur-xl ${colors.bg} border-2 border-${colors.border}/30 rounded-full shadow-lg hover:shadow-xl hover:${colors.shadow}/40 flex items-center justify-center ${colors.textFull} hover:border-${colors.border}/60 transition-all duration-300 group relative overflow-hidden`}
          title={themeMode === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {/* Animated background glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
          />
          
          <AnimatePresence mode="wait">
            {themeMode === 'dark' ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ 
                  rotate: 0, 
                  opacity: 1, 
                  scale: 1,
                }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Sun className="w-6 h-6" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ 
                  rotate: 0, 
                  opacity: 1, 
                  scale: 1,
                }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Moon className="w-6 h-6" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple effect on click */}
          <motion.div
            key={themeMode}
            className={`absolute inset-0 rounded-full border-2 border-${colors.border}/50`}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Random Color Scheme Button */}
        <motion.button
          onClick={handleRandomColor}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 360 }}
          className={`w-14 h-14 backdrop-blur-xl ${colors.bg} border-2 border-${colors.border}/30 rounded-full shadow-lg hover:shadow-xl hover:${colors.shadow}/40 flex items-center justify-center transition-all duration-300 group relative overflow-hidden hover:border-${colors.border}/60`}
          title="Cambiar color aleatorio"
        >
          {/* Animated background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
          />

          {/* Rotating circles background */}
          <motion.div
            className="absolute inset-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className={`w-full h-full rounded-full border border-${colors.border}/20`} />
          </motion.div>

          {/* Shuffle Icon */}
          <motion.div
            className="relative z-10"
            animate={{ 
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <Shuffle className={`w-6 h-6 ${colors.textFull}`} />
          </motion.div>

          {/* Color dots indicator */}
          <div className="absolute -bottom-1 -right-1 flex gap-0.5">
            {colorOptions.slice(0, 3).map((color, i) => (
              <motion.div
                key={color.name}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: colorScheme === color.name ? 1 : 0.7,
                  rotate: 360
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }
                }}
                className="w-1.5 h-1.5 rounded-full border border-white/50"
                style={{ backgroundColor: color.colors[0] }}
              />
            ))}
          </div>

          {/* Ripple effect on click */}
          <motion.div
            key={colorScheme}
            className={`absolute inset-0 rounded-full border-2 border-${colors.border}/50`}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </div>
    </div>
  );
}
