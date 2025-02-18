import { useState, useEffect } from 'react';

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('dark-mode');
    if (storedTheme === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return storedTheme === 'true';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dark-mode')) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('dark-mode', String(newValue));
      return newValue;
    });
  };

  return { isDark, toggleTheme };
};

export default useTheme;