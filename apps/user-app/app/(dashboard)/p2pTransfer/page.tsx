// Page Component
import { SendCard } from "../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampP2p } from "../../components/OnRampP2p";
import { BalanceCard2 } from "../../components/BalanceCard2";


async function getBalance() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { amount: 0, locked: 0 }; // or handle accordingly
  }
  const balance = await prisma.balance.findFirst({
      where: {
          userId: Number(session.user.id)
      }
  });
  return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
  };
}

async function getOnRampP2pTransactions() {
  const session = await getServerSession(authOptions);
  
  // Fetch received transactions
  const receivedTxns = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user?.id),
    },
  });

  // Fetch sent transactions
  const sentTxns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  // Combine and mark each transaction as "Received" or "Sent"
  const transactions = [
    ...receivedTxns.map((t:any) => ({
      time: new Date(t.timestamp), // Convert to Date
      amount: t.amount,
      type: "Received" as const, // Ensure correct type
    })),
    ...sentTxns.map((t:any) => ({
      time: new Date(t.timestamp), // Convert to Date
      amount: t.amount,
      type: "Sent" as const, // Ensure correct type
    })),
  ];

  // Sort transactions by time, most recent first
  return transactions.sort((a, b) => b.time.getTime() - a.time.getTime());
}

export default async function Page() {
  const balance = await getBalance();
  const transactions = await getOnRampP2pTransactions();

  return (
    <div className="w-full px-4 py-8">
      <div className="text-3xl text-[#6a51a6] font-bold mb-6">
        P2P Transfers
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="mb-6 md:mb-0"> {/* Add margin-bottom for mobile */}
          <SendCard />
        </div>
        <div>
          <BalanceCard2 amount={balance.amount} locked={balance.locked} />
          <div className="pt-6">
            <OnRampP2p transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
