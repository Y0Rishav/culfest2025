import { useState, useEffect } from "react";
import React from "react";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { useRouter as useNavigator } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

interface PaymentResponse {
  success: boolean;
  data: {
    payment_session_id: string;
  };
}

interface Product {
  price: number;
}

const product = { price: 1250 };

const PaymentComponent: React.FC<{ product: Product }> = () => {
  const router1 = useRouter();
  // const [orderDetails] = useState({
  //   orderId: "123456",
  //   customerName: "John Doe",
  //   items: [
  //     { name: "Product A", price: 20, quantity: 2 },
  //     { name: "Product B", price: 15, quantity: 1 },
  //   ],
  // });

  const router = useNavigator();
  const { price, plan } = router1.query;
  // console.log(plan);
  const numericPrice = Number(price);

  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(true);
  const { data: session, status } = useSession();
  // const router = useRouter();
  const [paymentSessionId, setPaymentSessionId] = useState<string>("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const idRef = React.useRef<string | undefined>();
  // Load Cashfree SDK once on component mount
  React.useEffect(() => {
    const initializeSDK = async () => {
      try {
        await load({ mode: "sandbox" });
        console.log("Cashfree SDK loaded successfully");
      } catch (error) {
        console.error("Error loading Cashfree SDK:", error);
      }
    };

    initializeSDK();
  }, []);

  if (status === "loading") {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  const generateTransactionId = (prefix = "order") => {
    const timestamp = new Date().toISOString().slice(2, 8).replace(/-/g, "");
    const uuid = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
    return `${prefix}_${timestamp}_${uuid}`;
  };
  if (!session) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Please Sign In
        </motion.h1>
        <Button
          className="mt-8 transform bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-105"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </div>
    );
  } else {
    if (session.user.isNITJSR) {
      // NIT Jamshedpur Logic
      if (plan === "Culfest 2026 Standard Plan" && numericPrice === 200) {
        product.price = 200;
      } else if (numericPrice === 2850) {
        product.price = 2850;
      } else {
        // Multi event or default
        product.price = 450;
      }
    } else {
      // Outside College Logic
      if (plan === "Culfest 2026 Standard Plan" && numericPrice === 400) {
        product.price = 400;
      } else if (numericPrice === 2850) {
        product.price = 2850;
      } else {
        // Premium / Multi event
        product.price = 1250;
      }
    }
  }
  const orderDetails = {
    customerName: session?.user?.name,
    customerMail: session?.user?.email,
    customerPhone: session?.user?.phone,
    order_id: orderId,
    order_amount: product.price,
    plan: plan,
    items: [
      { naam: "Participation Charge", paisa: 0 },
      { naam: "Accommodation Charge", paisa: 0 },
      { naam: "Food Charge", paisa: 0 },
      { naam: "Cultural Night Charge", paisa: 0 },
    ],
  };
  if (session && session.user?.isNITJSR) {
    orderDetails.items[0].paisa = Number(product.price);
  } else {
    if (product.price === 400) {
      orderDetails.items[0].paisa = 400;
      orderDetails.items[1].paisa = 0;
      orderDetails.items[2].paisa = 0;
      orderDetails.items[3].paisa = 0;
    } else if (product.price === 2850) {
      orderDetails.items[0].paisa = 2850;
      orderDetails.items[1].paisa = 0;
      orderDetails.items[2].paisa = 0;
      orderDetails.items[3].paisa = 0;
    } else {
      // 1250 breakdown
      orderDetails.items[0].paisa = 500;
      orderDetails.items[1].paisa = 200;
      orderDetails.items[2].paisa = 250;
      orderDetails.items[3].paisa = 300;
    }
  }
  const handleBuyNow = async (pricel: number) => {
    setLoading(true);
    if (!session) {
      router.replace("/login");
      return;
    }

    // const orderId = `order_${new Date().getTime()}`;
    const orderId = generateTransactionId("order"); //unique orderID created
    // console.log(orderId)
    localStorage.setItem("order_id", orderId);
    idRef.current = orderId;
    if (!idRef.current) {
      console.error("Order ID is null");
      setLoading(false);
      return;
    }

    setOrderId(orderId);
    try {
      const id = idRef.current;
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: id,
          order_amount: pricel,
          plan: plan,
          customer_id: `cust_${new Date().getTime()}`,
          customer_phone: `${session.user.phone}`, // Sample phone number
          customer_name: `${session.user.name}`,
          customer_email: `${session.user.email}`,
          session,
        }),
      });

      const data: any = await response.json();

      if (data?.success) {
        setPaymentSessionId(data.data.payment_session_id);
        initiatePayment(data.data.payment_session_id);
        setLoading(false);
      } else {
        alert(data?.msg);
        setLoading(false);
        router.replace("/profile");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    setLoading(true);
    try {
      const id = idRef.current;
      const res = await axios.post("/api/authenticate", {
        id,
        session,
      });

      if (res && res.data.order_status === "Success") {
        setLoading(false);
        alert("Payment verified");
        router.replace("/profile");
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification Error:", error);
    }
  };

  const initiatePayment = async (sessionId: string) => {
    const cashfree = await load({ mode: "sandbox" });

    const checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    };

    cashfree.checkout(checkoutOptions).then(() => {
      verifyPayment();
    });
  };

  return (
    <>
      <Head>
        <title>Checkout Page</title>
        <meta name="description" content="Explore Contact Us Page" />
        <link rel="icon" href="/culfest_logo.png" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start bg-[#0a0a1a] px-4 pt-40 pb-12">
        <h1
          className="mb-8 text-center font-Bangers text-4xl tracking-wider md:text-5xl"
          style={{
            background: "linear-gradient(135deg, #ffd700, #ff4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
          }}
        >
          CHECKOUT
        </h1>
        <div
          className="w-full max-w-lg rounded-2xl p-6"
          style={{
            border: "2px solid rgba(255, 215, 0, 0.3)",
            background: "rgba(10, 10, 30, 0.9)",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)",
          }}
        >
          <h2
            className="mb-6 text-center font-Bangers text-xl tracking-wider md:text-2xl"
            style={{ color: "#00e5ff", textShadow: "0 0 10px rgba(0,229,255,0.3)" }}
          >
            Order & Billing
          </h2>
          <div className="space-y-6">
            {/* <div>
        <p className="text-gray-600">Order ID:</p>
        <p className="font-medium text-gray-900">{idRef.current}</p>
      </div> */}
            <div className="flex-col flex-wrap gap-2">
              <p className="font-Bangers tracking-wide text-gray-400">Customer Name:</p>
              <span className="font-Bangers tracking-wide text-white">
                {orderDetails.customerName}
              </span>
              <p className="font-Bangers tracking-wide text-gray-400">Customer Phone:</p>
              <p className="font-Bangers tracking-wide text-white">
                {orderDetails.customerPhone}
              </p>
              <p className="font-Bangers tracking-wide text-gray-400">Customer Mail:</p>
              <p className="font-Bangers tracking-wide text-white">
                {orderDetails.customerMail}
              </p>
            </div>
            <div>
              <p className="font-Bangers tracking-wide text-gray-400">Items:</p>
              <ul className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg p-3"
                    style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                  >
                    <span className="font-Bangers tracking-wide text-white">{item.naam}</span>
                    <span className="font-Bangers tracking-wide text-yellow-400">₹{item.paisa}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-Bangers tracking-wide text-gray-400">Total:</p>
              <p
                className="font-Bangers text-3xl tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #ff4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{product.price}
              </p>
            </div>
          </div>
          {loading ? (
            <div className="mt-8 text-center">
              <p>Loading...</p>
            </div>
          ) : (
            <button
              className="mt-8 w-full rounded-xl py-3 font-Bangers text-lg tracking-wider text-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ffd700, #ff4444)",
                boxShadow: "0 0 20px rgba(255,215,0,0.3)",
              }}
              onClick={() => handleBuyNow(product.price)}
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;