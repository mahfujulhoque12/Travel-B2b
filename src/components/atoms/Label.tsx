import React from "react";

interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, className = "", children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block select-none cursor-pointer ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
