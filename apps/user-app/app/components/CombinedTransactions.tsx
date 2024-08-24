import { Card } from "@repo/ui/card";

type Transaction = {
  time: Date;
  amount: number;
  status?: string;   // For OnRamp transactions
  provider?: string; // For OnRamp transactions
  type: "Received" | "Sent" | "OnRamp"; // Differentiate transaction types
};

export const CombinedTransactions = ({ transactions }: { transactions: Transaction[] }) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center text-gray-500 py-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="divide-y divide-gray-200">
        {transactions.map((t, index) => (
          <div className="flex justify-between items-center py-4" key={index}>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {t.type === "OnRamp"
                  ? ` ${t.provider}`
                  : `${t.type} INR`}
                {t.status && <span className="text-red-500 ml-1">{t.status}</span>}
              </div>
              <div className="text-gray-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {t.type === "Sent" ? "- " : "+ "}Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
