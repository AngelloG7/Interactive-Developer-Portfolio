import { useTheme } from './ThemeContext';

export function useDynamicColors() {
  const { colorScheme, themeMode } = useTheme();

  const colors = {
    cyan: {
      gradient: 'from-cyan-400 via-teal-400 to-emerald-400',
      gradientBg: 'from-cyan-500/20 to-teal-500/20',
      gradientBtn: 'from-cyan-600 to-teal-600',
      border: 'cyan-500',
      text: 'cyan-400',
      borderFull: 'border-cyan-500',
      textFull: 'text-cyan-400',
      hoverText: 'hover:text-cyan-400',
      bgHover: 'hover:bg-cyan-500/10',
      shadow: 'shadow-cyan-500',
      icon: 'text-cyan-500',
    },
    purple: {
      gradient: 'from-purple-400 via-pink-400 to-fuchsia-400',
      gradientBg: 'from-purple-500/20 to-pink-500/20',
      gradientBtn: 'from-purple-600 to-pink-600',
      border: 'purple-500',
      text: 'purple-400',
      borderFull: 'border-purple-500',
      textFull: 'text-purple-400',
      hoverText: 'hover:text-purple-400',
      bgHover: 'hover:bg-purple-500/10',
      shadow: 'shadow-purple-500',
      icon: 'text-purple-500',
    },
    blue: {
      gradient: 'from-blue-400 via-indigo-400 to-violet-400',
      gradientBg: 'from-blue-500/20 to-indigo-500/20',
      gradientBtn: 'from-blue-600 to-indigo-600',
      border: 'blue-500',
      text: 'blue-400',
      borderFull: 'border-blue-500',
      textFull: 'text-blue-400',
      hoverText: 'hover:text-blue-400',
      bgHover: 'hover:bg-blue-500/10',
      shadow: 'shadow-blue-500',
      icon: 'text-blue-500',
    },
    orange: {
      gradient: 'from-orange-400 via-red-400 to-rose-400',
      gradientBg: 'from-orange-500/20 to-red-500/20',
      gradientBtn: 'from-orange-600 to-red-600',
      border: 'orange-500',
      text: 'orange-400',
      borderFull: 'border-orange-500',
      textFull: 'text-orange-400',
      hoverText: 'hover:text-orange-400',
      bgHover: 'hover:bg-orange-500/10',
      shadow: 'shadow-orange-500',
      icon: 'text-orange-500',
    },
    green: {
      gradient: 'from-green-400 via-emerald-400 to-lime-400',
      gradientBg: 'from-green-500/20 to-emerald-500/20',
      gradientBtn: 'from-green-600 to-emerald-600',
      border: 'green-500',
      text: 'green-400',
      borderFull: 'border-green-500',
      textFull: 'text-green-400',
      hoverText: 'hover:text-green-400',
      bgHover: 'hover:bg-green-500/10',
      shadow: 'shadow-green-500',
      icon: 'text-green-500',
    },
  };

  const bg = themeMode === 'dark' 
    ? 'bg-slate-900/30' 
    : 'bg-white/60';
    
  const bgAlt = themeMode === 'dark'
    ? 'bg-slate-900/40'
    : 'bg-white/70';

  const bgInput = themeMode === 'dark'
    ? 'bg-slate-800/40'
    : 'bg-white/80';

  const borderColor = themeMode === 'dark'
    ? `border-${colors[colorScheme].border}/10`
    : `border-${colors[colorScheme].border}/20`;

  const textPrimary = themeMode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = themeMode === 'dark' ? 'text-slate-200' : 'text-gray-700';
  const textTertiary = themeMode === 'dark' ? 'text-slate-300' : 'text-gray-600';
  const textMuted = themeMode === 'dark' ? 'text-slate-400' : 'text-gray-500';

  return {
    ...colors[colorScheme],
    bg,
    bgAlt,
    bgInput,
    borderColor,
    textPrimary,
    textSecondary,
    textTertiary,
    textMuted,
    themeMode,
    colorScheme,
  };
}
