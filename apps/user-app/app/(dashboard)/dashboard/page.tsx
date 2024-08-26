// app/pages/home.tsx
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransaction";
import { Card } from "@repo/ui/card"; // Custom Card component for visual elements
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getRecentTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: { startTime: "desc" },
    take: 4, // Limit to 4 recent transactions
  });
  return txns.map((t:any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function HomePage() {
  const balance = await getBalance();
  const session = await getServerSession(authOptions);
  const recentTransactions = await getRecentTransactions();

  return (
    <div className="w-screen px-4 py-8">
      <div className="text-3xl text-[#6a51a6] font-bold mb-4">
        Welcome {session?.user?.name || " "}
      </div>

      {/* BalanceCard taking full width */}
      <div className="mb-8">
        <BalanceCard amount={balance.amount} locked={balance.locked} className="w-full h-64 md:h-80" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Recent Transactions Section */}

        <div>
          <div className="text-xl font-semibold mb-4">Offers</div>
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#6a51a6]">Exclusive 20% Off</h3>
              <p className="mt-2 text-gray-600">Get 20% off on all transactions this weekend! Limited time offer.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#6a51a6]">Free Transaction</h3>
              <p className="mt-2 text-gray-600">Enjoy one free transaction per month. Just for our loyal users!</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#6a51a6]">Weekend Special</h3>
              <p className="mt-2 text-gray-600">Special weekend promotions on selected providers. Check it out!</p>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xl font-semibold mb-4">Recent Transactions</div>
          <OnRampTransactions transactions={recentTransactions} />
        </div>

        {/* Promotional Offers Section */}

      </div>
    </div>
  );
}
