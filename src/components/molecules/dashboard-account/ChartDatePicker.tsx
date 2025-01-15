import { Button } from '@/components/atoms/Button'
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { FaCalendarAlt } from 'react-icons/fa'
import 'react-day-picker/style.css';

const ChartDatePicker = () => {
    const [selected, setSelected] = useState<Date | undefined>(undefined); // Updated type to Date | undefined
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Manage calendar visibility
  
  
    const toggleCalendar = () => setIsCalendarOpen((prev) => !prev);
  
    const handleDateSelect = (date: Date) => {
      setSelected(date);
      setIsCalendarOpen(false); // Close the calendar when a date is selected
    };
  return (
    <div className="relative">
          <Button
            className="text-[#8391A1]  bg-[#F4F7FE] dark:bg-darkButtonBg dark:text-white rounded p-2.5 text-sm relative cursor-pointer"
            onClick={toggleCalendar}
          >
            {selected ? selected.toLocaleDateString() : '8/12/12'}
            <FaCalendarAlt />
          </Button>

          {/* Calendar dropdown */}
          {isCalendarOpen && (
            <div className="absolute p-3 top-10 left-0 w-[340px] bg-white shadow-lg rounded-md z-10 border animate-slide-down  max-w-[350px] transition-all ease-in-out duration-200">
              <DayPicker
                mode="single"
                selected={selected} // Pass `selected` as Date or undefined
                onSelect={handleDateSelect} // Close the calendar when a date is selected
                footer={
                  selected ? `Selected: ${selected.toLocaleDateString()}` : 'Pick a day.'
                }
                required // Add the required prop here
              />
            </div>
          )}
        </div>
  )
}

export default ChartDatePicker