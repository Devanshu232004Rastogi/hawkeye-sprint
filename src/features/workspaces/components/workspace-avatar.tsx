// components/workspace/WorkspaceAvatar.tsx
import React from "react";

// Define the gradients object with type safety
const GRADIENTS: Record<string, string> = {
  "blue-violet": "linear-gradient(135deg, #4158D0, #C850C0)",
  "blue-pink": "linear-gradient(135deg, #0093E9, #FF5EDF)",
  "violet-pink": "linear-gradient(135deg, #8E2DE2, #FF8797)",
  "orange-red": "linear-gradient(135deg, #FF8008, #FF3D68)",
  "green-blue": "linear-gradient(135deg, #00C9FF, #92FE9D)",
  "purple-blue": "linear-gradient(135deg, #6A11CB, #2575FC)",
};

// Export the gradients for use in other components
export { GRADIENTS };

// Type for gradient keys
export type GradientKey = keyof typeof GRADIENTS;

// Get a random gradient function
const getRandomGradient = (): string => {
  const gradientKeys = Object.keys(GRADIENTS);
  const randomIndex = Math.floor(Math.random() * gradientKeys.length);
  return GRADIENTS[gradientKeys[randomIndex]];
};

// Get initials from a name
const getInitials = (name?: string): string => {
  if (!name) return "WS";
  return name.substring(0, 2).toUpperCase();
};

// Size type
type SizeType = "sm" | "md" | "lg" | "xl";

// Props interface
interface WorkspaceAvatarProps {
  name?: string;
  size?: SizeType;
  gradientKey?: GradientKey;
  className?: string;
}

const WorkspaceAvatar: React.FC<WorkspaceAvatarProps> = ({
  name,
  size = "md",
  gradientKey,
  className = "",
}) => {
  // Size variants
  const sizeClasses: Record<SizeType, string> = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  // Use provided gradient or get a random one
  const gradient =
    gradientKey && GRADIENTS[gradientKey]
      ? GRADIENTS[gradientKey]
      : getRandomGradient();

  return (
    <div
      className={`${sizeClasses[size]} ${className} flex items-center justify-center font-medium text-white relative  shadow-md transition-transform hover:rotate-0`}
      style={{
        background: gradient,
        borderRadius: "15%",
      }}
    >
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white to-transparent" />
      <span className="">{getInitials(name)}</span>
    </div>
  );
};

export default WorkspaceAvatar;
