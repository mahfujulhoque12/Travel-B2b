'use client';

import { Button } from '@/components/atoms/Button';
import React, { useEffect, useState } from 'react';
import { IoMdSunny } from 'react-icons/io';
import { IoMoonOutline } from 'react-icons/io5';

const Theme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Button
        className={`${darkMode && 'dark'} bg-[#F4F7FE4D] text-[#8391A1] shadow-sm p-2 rounded-full dark:text-white dark:bg-darkButtonBg`}
        onClick={toggleDarkMode}
      >
        {darkMode ? <IoMdSunny size={18} /> : <IoMoonOutline size={18} />}
      </Button>
    </div>
  );
};

export default Theme;
