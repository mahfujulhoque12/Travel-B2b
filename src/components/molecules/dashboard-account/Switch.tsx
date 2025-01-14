import React from "react";
import { Input } from "@/components/atoms/Input";

type SwitchProps = {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ isChecked, onChange }) => {
  return (
    <label
      className="relative inline-flex items-center cursor-pointer"
      htmlFor="income-expense-switch"
    >
      <Input
        id="income-expense-switch"
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 mt-2 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full dark:bg-gray-700 peer-checked:bg-blue-600"></div>
      <div className="absolute w-4 h-4 mt-2 bg-white rounded-full transition-all peer-checked:translate-x-5 translate-x-1"></div>
    </label>
  );
};

export default Switch;
