import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import connectToDatabase from "./conntectToDatabase";
import Payment from "./models/Payment.model";
import Razorpay from "razorpay";

// Disable Next.js body parsing so we can access the raw body for signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to read raw body from request stream
function getRawBody(req: NextApiRequest): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: any) => { data += chunk; });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const rawBody = await getRawBody(req);
        const signature = req.headers["x-razorpay-signature"] as string;

        if (!signature) {
            return res.status(400).json({ error: "Missing signature" });
        }

        // Verify webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.key_secret!;
        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(rawBody, "utf8")
            .digest("hex");

        if (expectedSignature !== signature) {
            console.error("Webhook signature verification failed");
            return res.status(400).json({ error: "Invalid signature" });
        }

        const event = JSON.parse(rawBody);
        console.log("Razorpay webhook event received:", event.event);

        // Handle payment.captured and payment.authorized events
        if (
            event.event === "payment.captured" ||
            event.event === "payment.authorized"
        ) {
            const payment = event.payload?.payment?.entity;
            if (!payment) {
                return res.status(400).json({ error: "Invalid payload" });
            }

            const razorpayPaymentId = payment.id;
            const razorpayOrderId = payment.order_id;
            const amount = payment.amount / 100; // Convert paise to rupees
            const paymentStatus = payment.status;

            if (paymentStatus !== "captured" && paymentStatus !== "authorized") {
                return res.status(200).json({ status: "ignored", reason: "not a successful payment" });
            }

            await connectToDatabase();

            // Idempotency checks
            const existingPayment = await Payment.findOne({ paymentId: razorpayPaymentId });
            if (existingPayment) {
                console.log("Payment already recorded:", razorpayPaymentId);
                return res.status(200).json({ status: "already_recorded" });
            }

            const existingOrderPayment = await Payment.findOne({ orderId: razorpayOrderId });
            if (existingOrderPayment) {
                console.log("Payment already recorded for order:", razorpayOrderId);
                return res.status(200).json({ status: "already_recorded" });
            }

            // Fetch order from Razorpay to get user info from notes
            const razorpay = new Razorpay({
                key_id: process.env.key_id!,
                key_secret: process.env.key_secret!,
            });

            const order = await razorpay.orders.fetch(razorpayOrderId);
            const orderNotes = (order as any).notes || {};

            // Try to get userId directly from order notes (set during order creation in order.ts)
            let userId = orderNotes.userId || "";

            // If no userId in notes, try to find user by email
            if (!userId) {
                const userEmail = orderNotes.email || orderNotes.description || "";
                if (userEmail) {
                    const User = (await import("./models/User.model")).default;
                    const normalizedEmail = userEmail.toLowerCase();
                    const user = await User.findOne({
                        email: new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
                    });
                    userId = user ? user._id.toString() : "";
                }
            }

            if (!userId) {
                console.error("Could not determine user for order:", razorpayOrderId, "notes:", orderNotes);
            }

            const newPayment = new Payment({
                userId: userId || "unknown_webhook",
                paymentId: razorpayPaymentId,
                orderId: razorpayOrderId,
                status: "success",
                amount: amount.toString(),
            });

            await newPayment.save();
            console.log("Payment saved via webhook:", razorpayPaymentId, "for user:", userId || "unknown");

            return res.status(200).json({ status: "ok" });
        }

        // For other events, just acknowledge
        return res.status(200).json({ status: "ignored", event: event.event });
    } catch (error: any) {
        console.error("Webhook error:", error);
        // Always return 200 to Razorpay to prevent retries on our errors
        return res.status(200).json({ status: "error", message: error.message });
    }
}
