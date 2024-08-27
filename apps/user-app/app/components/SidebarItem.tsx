"use client"
import React from "react";

export const SidebarItem = ({ 
    href, 
    title, 
    icon,
    selected
  }: { 
    href: string; 
    title: string; 
    icon: React.ReactNode;
    selected: boolean;
  }) => {
      return (
        <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-8`}>
          <div className="pr-2">
              {icon}
          </div>
          <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
              {title}
          </div>
        </div>
      );
  }