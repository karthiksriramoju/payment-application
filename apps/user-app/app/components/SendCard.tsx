"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2ptransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = async () => {
    const response = await p2pTransfer(Number(number), Number(amount) * 100);

    if (response.success) {
      setMessage("🎉 " + response.message);
      setIsSuccess(true);
      setNumber("");
      setAmount("");
    } else {
      setMessage("⚠️ " + response.message);
      setIsSuccess(false);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="h-[90vh]">
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder="Number"
            label="Number"
            value={number}
            onChange={(value:any) => setNumber(value)}
          />
          <TextInput
            placeholder="Amount"
            label="Amount"
            value={amount}
            onChange={(value:any) => setAmount(value)}
          />
          <div className="pt-4 flex justify-center">
            <Button onClick={handleTransfer}>Send</Button>
          </div>
          {message && (
            <div className="mt-4 text-center">
              <div className={`text-2xl font-bold animate-pulse ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                {message}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
