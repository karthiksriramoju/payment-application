"use client"
import { usePathname } from "next/navigation";
import { AppbarClient } from "./AppbarClient";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show navigation on landing page (/) since it has its own navigation
  const showNavigation = pathname !== "/";

  return (
    <>
      {showNavigation && <AppbarClient />}
      {children}
    </>
  );
} 