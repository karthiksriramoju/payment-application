import prisma from "@repo/db/client";

import { OnRampTransactions } from "../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampP2p } from "../../components/OnRampP2p";
import { CombinedTransactions } from "../../components/CombinedTransactions";


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

  // Combine and label them as "Received" or "Sent"
  const transactions = [
    ...receivedTxns.map((t:any) => ({
      time: t.timestamp,
      amount: t.amount,
      type: "Received",
    })),
    ...sentTxns.map((t:any) => ({
      time: t.timestamp,
      amount: t.amount,
      type: "Sent",
    })),
  ];

  // Sort transactions by time, most recent first
  return transactions.sort((a, b) => b.time.getTime() - a.time.getTime());
}


async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txns.map((t:any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
    type: "OnRamp", // Add type to differentiate OnRamp transactions
  }));
}



export default async function Page() {
  const onRampTransactions = await getOnRampTransactions();
  const p2pTransactions = await getOnRampP2pTransactions();

  // Combine OnRamp and P2P transactions
  const allTransactions = [...onRampTransactions, ...p2pTransactions];
  allTransactions.sort((a, b) => b.time.getTime() - a.time.getTime());


  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        All Transactions
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <CombinedTransactions transactions={allTransactions} />
        </div>
      </div>
    </div>
  );
}
