"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`px-4 py-2 rounded-lg ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6a51a6] hover:bg-[#8a71c6] cursor-pointer'} text-white`}
    >
      {children}
    </button>
  );
};
