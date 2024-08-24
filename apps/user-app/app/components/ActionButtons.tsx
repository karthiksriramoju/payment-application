"use client"
// app/components/ActionButtons.tsx
import { Button } from "@repo/ui/button";
import { useRouter } from 'next/navigation';

const ActionButtons = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-4">
      <Button className="w-full" onClick={() => handleNavigation('/transfer')}>
        Add Money
      </Button>
      <Button className="w-full" onClick={() => handleNavigation('/p2pTransfer')}>
        Transfer
      </Button>
      <Button className="w-full" onClick={() => handleNavigation('/transactions')}>
        View Transactions
      </Button>
    </div>
  );
};

export default ActionButtons;
