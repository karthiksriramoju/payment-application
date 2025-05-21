"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react"
import { TextInput } from "@repo/ui/textInput";
import { createOnRampTransactions } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const handleAddMoney = async () => {
        try {
            setError("");
            if (value <= 0) {
                setError("Please enter a valid amount");
                return;
            }
            setIsProcessing(true);
            const result = await createOnRampTransactions(provider, value);
            if (result.message === "Done") {
                window.location.href = redirectUrl || "";
            } else {
                setError(result.message || "Something went wrong");
                setIsProcessing(false);
            }
        } catch (error: any) {
            setError(error.message || "Failed to process transaction");
            setIsProcessing(false);
        }
    };

    return <Card title="Add Money">
        <div className="w-full">
            <TextInput 
                label={"Amount"} 
                placeholder={"Amount"} 
                onChange={(val) => {
                    setValue(Number(val));
                    setError("");
                }}
                disabled={isProcessing}
            />
            {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
            <div className="py-4 text-left">
                Bank
            </div>
            <Select 
                onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }} 
                options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} 
                disabled={isProcessing}
            />
            <div className="flex justify-center pt-4">
                <Button 
                    onClick={handleAddMoney}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Add Money"}
                </Button>
            </div>
        </div>
    </Card>
}
