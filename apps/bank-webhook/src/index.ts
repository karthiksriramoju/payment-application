import express from 'express';
import prisma from '@repo/db/client';
import './scheduler'; // 

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    try {
        const { token, user_identifier, amount } = req.body;
        if (!token || !user_identifier || !amount) {
            return res.status(400).json({
                message: "Token, user_identifier and amount are required"
            });
        }

        // First update status to Processing
        await prisma.onRampTransaction.update({
            where: { token },
            data: { status: "Processing" }
        });

        // Simulate bank processing time (random between 1-3 minutes)
        const processingTime = Math.floor(Math.random() * (180000 - 60000) + 60000);
        
        setTimeout(async () => {
            try {
                // 90% chance of success
                const isSuccess = Math.random() < 0.9;
                
                const txn = await prisma.onRampTransaction.findUnique({
                    where: { token }
                });

                if (txn) {
                    await prisma.$transaction([
                        prisma.onRampTransaction.update({
                            where: { token },
                            data: {
                                status: isSuccess ? "Success" : "Failure"
                            }
                        }),
                        // If successful, update balance
                        ...(isSuccess ? [
                            prisma.balance.updateMany({
                                where: { userId: txn.userId },
                                data: {
                                    amount: {
                                        increment: amount * 100
                                    }
                                }
                            })
                        ] : [])
                    ]);
                }
            } catch (error) {
                console.error('Error in delayed processing:', error);
                // Update transaction status to Failed if there's an error
                await prisma.onRampTransaction.update({
                    where: { token },
                    data: { status: "Failure" }
                });
            }
        }, processingTime);

        res.json({
            message: "Processing started",
            estimatedTime: Math.floor(processingTime / 1000) // Send estimated time in seconds
        });
    } catch (error: any) {
        console.error('Error initiating transaction:', error);
        res.status(500).json({
            message: "Error while processing webhook",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Bank webhook server running on port ${PORT}`);
});