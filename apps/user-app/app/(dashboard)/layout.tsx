"use client"
import { SidebarItem } from "../components/SidebarItem";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isSidebarOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:static w-full md:w-72 bg-white border-r border-slate-300 min-h-screen z-10 transition-all duration-300 ease-in-out`}
      >
        <div className="pt-16 md:pt-28">
          <div onClick={() => handleNavigation("/dashboard")}>
            <SidebarItem 
              href="/dashboard" 
              icon={<HomeIcon />} 
              title="Home" 
              selected={pathname === "/dashboard"}
            />
          </div>
          <div onClick={() => handleNavigation("/transfer")}>
            <SidebarItem 
              href="/transfer" 
              icon={<TransferIcon />} 
              title="Transfer" 
              selected={pathname === "/transfer"}
            />
          </div>
          <div onClick={() => handleNavigation("/transactions")}>
            <SidebarItem 
              href="/transactions" 
              icon={<TransactionsIcon />} 
              title="Transactions" 
              selected={pathname === "/transactions"}
            />
          </div>
          <div onClick={() => handleNavigation("/p2pTransfer")}>
            <SidebarItem 
              href="/p2pTransfer" 
              icon={<P2PTransferIcon />} 
              title="P2P Transfer" 
              selected={pathname === "/p2pTransfer"}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 pt-16 md:pt-0">
        {children}
      </div>
    </div>
  );
}

// Icon components remain the same

// Icon components remain the same

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}

function P2PTransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
}