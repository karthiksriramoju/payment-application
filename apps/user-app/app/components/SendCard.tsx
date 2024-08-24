"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Textinput } from "@repo/ui/textInput";
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
          <Textinput
            placeholder="Number"
            label="Number"
            value={number}
            onChange={(value) => setNumber(value)}
          />
          <Textinput
            placeholder="Amount"
            label="Amount"
            value={amount}
            onChange={(value) => setAmount(value)}
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
