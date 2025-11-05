import { ThemeProvider, useTheme } from './components/ThemeContext';
import { InteractiveCursor } from './components/InteractiveCursor';
import { Navbar } from './components/Navbar';
import { AnimatedBanner } from './components/AnimatedBanner';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeController } from './components/ThemeController';

function AppContent() {
  const { themeMode, colorScheme } = useTheme();

  // Dynamic background colors based on theme and color scheme
  const bgColors = {
    dark: {
      cyan: 'from-slate-950 via-cyan-950/30 to-slate-950',
      purple: 'from-slate-950 via-purple-950/30 to-slate-950',
      blue: 'from-slate-950 via-blue-950/30 to-slate-950',
      orange: 'from-slate-950 via-orange-950/30 to-slate-950',
      green: 'from-slate-950 via-green-950/30 to-slate-950',
    },
    light: {
      cyan: 'from-slate-50 via-cyan-50/50 to-slate-50',
      purple: 'from-slate-50 via-purple-50/50 to-slate-50',
      blue: 'from-slate-50 via-blue-50/50 to-slate-50',
      orange: 'from-slate-50 via-orange-50/50 to-slate-50',
      green: 'from-slate-50 via-green-50/50 to-slate-50',
    },
  };

  const gradients = {
    cyan: ['rgba(6,182,212,0.1)', 'rgba(20,184,166,0.15)', 'rgba(34,211,238,0.1)'],
    purple: ['rgba(168,85,247,0.1)', 'rgba(236,72,153,0.15)', 'rgba(217,70,239,0.1)'],
    blue: ['rgba(59,130,246,0.1)', 'rgba(99,102,241,0.15)', 'rgba(139,92,246,0.1)'],
    orange: ['rgba(249,115,22,0.1)', 'rgba(239,68,68,0.15)', 'rgba(244,63,94,0.1)'],
    green: ['rgba(34,197,94,0.1)', 'rgba(16,185,129,0.15)', 'rgba(132,204,22,0.1)'],
  };

  const textColor = themeMode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColors[themeMode][colorScheme]} ${textColor} overflow-x-hidden transition-colors duration-500`}>
      <InteractiveCursor />
      
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${gradients[colorScheme][0]}, rgba(0,0,0,0))` 
          }}
        />
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle at 80% 20%, ${gradients[colorScheme][1]}, rgba(0,0,0,0))` 
          }}
        />
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle at 20% 80%, ${gradients[colorScheme][2]}, rgba(0,0,0,0))` 
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10">
        <div id="home">
          <AnimatedBanner />
          <Hero />
        </div>
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>

      {/* Theme Controller */}
      <ThemeController />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
