import React from 'react';
import { useState, useEffect } from 'react';

function ThemeToggle() {
 const [darkMode, setDarkMode] = useState(
   window.matchMedia('(prefers-color-scheme: dark)').matches
 );

 useEffect(() => {
   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
   const handleChange = (e) => setDarkMode(e.matches);
   mediaQuery.addEventListener('change', handleChange);
   return () => mediaQuery.removeEventListener('change', handleChange);
 }, []);

 useEffect(() => {
   if (darkMode) {
     document.documentElement.classList.add('dark');
   } else {
     document.documentElement.classList.remove('dark');
   }
 }, [darkMode]);

 return (
   <button
     onClick={() => setDarkMode(!darkMode)}
     className="text-xl p-0 "
   >
     {darkMode ? '☀️' : '🌙'}
   </button>
 );
}

export default ThemeToggle;