import { Button } from '@/components/atoms/Button';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6';
import { PiListChecksFill } from 'react-icons/pi';


const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isOpen, toggle, close, ref };
};

const ChartDropdownCom = () => {
    const chartDropdown = useDropdown();
    const [selectedchart, setSelectedchart] = useState('Orders');
  
    const handlechartSelection = (chart: string) => {
      setSelectedchart(chart);
      chartDropdown.close();
    };
  return (
    <div
    className="relative"
    ref={chartDropdown.ref}
    onKeyDown={(event) => {
      if (event.key === 'Escape') chartDropdown.close();
    }}
  >
    <Button
      className="text-[#8391A1]  bg-[#F4F7FE] dark:bg-darkButtonBg dark:text-white rounded p-2.5 text-sm relative cursor-pointer flex items-center gap-1"
      onClick={chartDropdown.toggle}
      aria-haspopup="true"
      aria-expanded={chartDropdown.isOpen}
    >
      <PiListChecksFill />
      {selectedchart}
      <FaAngleDown />
    </Button>

    {chartDropdown.isOpen && (
      <ul className="absolute animate-slide-down bg-white  shadow-md rounded w-24 top-10 border z-10">
        {['Orders', 'Cancel', 'Pending'].map((chart) => (
          <li
            key={chart}
            className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
            onClick={() => handlechartSelection(chart)}
          >
            {chart}
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default ChartDropdownCom