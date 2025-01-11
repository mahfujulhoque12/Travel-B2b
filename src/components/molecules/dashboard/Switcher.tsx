import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isOpen, toggle, close, ref };
};

const Switcher = () => {
  const languageDropdown = useDropdown();
  const [selectedLanguage, setSelectedLanguage] = useState('Orders');

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    languageDropdown.close();
  };

  return (
    <div className="px-4 flex items-center justify-between mb-3">
      {/* Title Section */}
      <div>
        <span className="text-lg font-normal text-[#243045]">
          Income/Expense
        </span>
      </div>

      {/* Switch and Dropdown Section */}
      <div className="flex items-center justify-center gap-4">
        {/* Switch Section */}
        <div>
          <label
            className="relative inline-flex items-center cursor-pointer"
            htmlFor="income-expense-switch"
          >
            <Input
              id="income-expense-switch"
              type="checkbox"
              className="sr-only peer"
              aria-checked="false"
              onChange={(e) => console.log(e.target.checked)}
            />
            <div className="w-11 h-6 mt-2 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full dark:bg-gray-700 peer-checked:bg-blue-600"></div>
            <div className="absolute w-4 h-4 mt-2 bg-white rounded-full transition-all peer-checked:translate-x-5 translate-x-1"></div>
          </label>
        </div>

        {/* Language Dropdown */}
        <div
          className="relative"
          ref={languageDropdown.ref}
          onKeyDown={(event) => {
            if (event.key === 'Escape') languageDropdown.close();
          }}
        >
          <Button
            className="text-[#8391A1] bg-white rounded p-1 text-sm relative cursor-pointer flex items-center gap-1"
            onClick={languageDropdown.toggle}
            aria-haspopup="true"
            aria-expanded={languageDropdown.isOpen}
          >
            {selectedLanguage}
            <FaAngleDown />
          </Button>

          {languageDropdown.isOpen && (
            <ul className="absolute animate-slide-down bg-white shadow-md rounded w-24 top-10 border z-10">
              {['Orders', 'Cancle', 'Pending'].map((language) => (
                <li
                  key={language}
                  className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelection(language)}
                >
                  {language}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Switcher;
