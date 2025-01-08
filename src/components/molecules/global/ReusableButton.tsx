import React from "react";

interface ReusableButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={`rounded ${className}`}>
      {label}
    </button>
  );
};

export default ReusableButton;
