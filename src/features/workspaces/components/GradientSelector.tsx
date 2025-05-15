// components/workspace/GradientSelector.tsx
import React from "react";
import { GRADIENTS, GradientKey } from "./workspace-avatar";

interface GradientSelectorProps {
  selectedGradient?: GradientKey;
  onSelectGradient: (key: GradientKey) => void;
}

const GradientSelector: React.FC<GradientSelectorProps> = ({ 
  selectedGradient, 
  onSelectGradient 
}) => {
  return (
    <div className="flex flex-wrap gap-2 my-3">
      {Object.entries(GRADIENTS).map(([key, gradient]) => (
        <button
          key={key}
          type="button"
          className={`w-8 h-8 rounded-md cursor-pointer transition-all hover:scale-110 ${
            selectedGradient === key ? "ring-2 ring-offset-2 ring-black" : ""
          }`}
          style={{ background: gradient }}
          onClick={() => onSelectGradient(key as GradientKey)}
          aria-label={`Select ${key} gradient`}
        />
      ))}
    </div>
  );
};

export default GradientSelector;