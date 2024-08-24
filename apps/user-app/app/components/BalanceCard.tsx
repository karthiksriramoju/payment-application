// components/BalanceCard.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


interface BalanceCardProps {
  amount: number;
  locked: number;
}



export const BalanceCard: React.FC<BalanceCardProps> = ({ amount, locked }) => {

    const router = useRouter();

    const handleNavigation = (path: string) => {
      router.push(path);
    };

  return (
    <div className="bg-gradient-to-r from-[#6a51a6] to-[#8e2de2] p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
      <div className="text-2xl font-bold mb-2">Balance</div>
      <div className="text-4xl font-extrabold mb-4">
      ₹{amount/100}
      </div>
      <div className="text-lg mb-2">Locked: ₹{locked/100}</div>
      <div className="flex space-x-2">
        <button className="bg-white text-[#6a51a6] py-2 px-4 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105" onClick={() => handleNavigation('/transfer')}>
          Add Funds
        </button>
 
      </div>
    </div>
  );
};
