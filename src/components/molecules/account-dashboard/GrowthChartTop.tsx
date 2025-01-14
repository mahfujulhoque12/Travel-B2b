import { Button } from '@/components/atoms/Button';
import CardTitle from '@/components/atoms/CardTitle';
import Span from '@/components/atoms/Span';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6';


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
const GrowthChartTop = () => {

    const chartDropdown = useDropdown();
    const [selectedchart, setSelectedchart] = useState('January');
  
    const handlechartSelection = (chart: string) => {
      setSelectedchart(chart);
      chartDropdown.close();
    };

  return (
    <div className='p-4 flex items-center justify-between'>
    <div>
      <CardTitle className="lg:text-xl font-semibold text-[#243045]">
        Income Growth
      </CardTitle>
      <Span className='font-normal text-base text-[#797979]'>
        6 month Income growth
      </Span>
    </div>
    <div>
      {/* Orders Dropdown */}
      <div
        className="relative"
        ref={chartDropdown.ref}
        onKeyDown={(event) => {
          if (event.key === 'Escape') chartDropdown.close();
        }}
      >
        <Button
          className="text-[#8391A1] bg-[#F4F7FE] rounded p-2.5 text-sm relative cursor-pointer flex items-center gap-1"
          onClick={chartDropdown.toggle}
          aria-haspopup="true"
          aria-expanded={chartDropdown.isOpen}
        >

          {selectedchart}
          <FaAngleDown />
        </Button>

        {chartDropdown.isOpen && (
          <ul className="absolute animate-slide-down bg-white shadow-md rounded w-24 top-10 border z-10">
            {['January', 'February', 'March','April','May','June','July'].map((chart) => (
              <li
                key={chart}
                className="px-3 py-1.5 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
                onClick={() => handlechartSelection(chart)}
              >
                {chart}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
  )
}

export default GrowthChartTop