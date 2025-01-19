import React from "react";
import { Button } from "./Button";

interface SwitchProps {
  toggleSetting: (id: string) => void;
  className: string;
  enabled: boolean;
  id: string;
}

const Switch: React.FC<SwitchProps> = ({
  toggleSetting,
  className,
  enabled,
  id,
}) => {
  return (
    <Button onClick={() => toggleSetting(id)} className={className}>
      <span
        className={`absolute w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-[9px]" : "translate-x-[-9px]"
        }`}
      />
    </Button>
  );
};

export default Switch;
