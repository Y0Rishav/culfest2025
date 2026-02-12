"use client";
import * as React from "react";
import ComicBackground from "@/components/ComicBackground";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
const product = { price: 1250 };
export default function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const plan = params.get("plan");
  const numericPrice = Number(amount);
  const { data: main, status } = useSession();
  const idRef = React.useRef<string | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(true);

  React.useEffect(() => {
    if (!amount) {
      router.replace("/");
      return;
    }

    const checkUserPaymentStatus = async () => {
      try {
        const session = await getSession();
        // console.log(session);
        if (!session) {
          router.replace("/login");
          return;
        }

        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: numericPrice * 100, session, plan }),
        });

        if (response.ok) {
          const data = await response.json();
          idRef.current = data.orderId;
          setLoading1(false);
        } else if (response.status === 400) {
          alert("You have already made a payment");
          router.replace("/profile");
        } else {
          const errorData = await response.json();
          alert(errorData.msg);
          router.replace("/profile");
        }
      } catch (error) {
        console.error("Error during fetch operation:", error);
      }
    };

    checkUserPaymentStatus();
  }, []);
  // if (session.user.isNITJSR) {
  //   if (plan === "Culfest 2025 Standard Plan" && numericPrice === 300) {
  //     product.price = 300;
  //   } else {
  //     product.price = 500;
  //   }
  // } else {
  //   if (plan === "Culfest 2025 Standard Plan" && numericPrice === 650) {
  //     product.price = 650;
  //   } else {
  //     product.price = 1250;
  //   }
  // }
  // Derived variables
  let productPrice = 1250;
  if (main?.user?.isNITJSR) {
    if (plan === "Culfest 2026 Standard Plan" && numericPrice === 200) {
      productPrice = 200;
    } else {
      productPrice = 450;
    }
  } else {
    if (plan === "Culfest 2026 Standard Plan" && numericPrice === 400) {
      productPrice = 400;
    } else if (plan === "Battle Crew Plan" && numericPrice === 2850) {
      productPrice = 2850;
    } else {
      productPrice = 1250;
    }
  }

  const orderDetails = {
    customerName: main?.user?.name,
    customerMail: main?.user?.email,
    customerPhone: main?.user?.phone,
    order_amount: productPrice,
    plan,
    items: [
      { naam: "Participation Charge", paisa: 0 },
      { naam: "Accomodation Charge", paisa: 0 },
      { naam: "Food Charge", paisa: 0 },
      { naam: "Cultural Night Charge", paisa: 0 },
    ],
  };
  if (main && main.user?.isNITJSR) {
    orderDetails.items[0].paisa = Number(productPrice);
  } else {
    if (productPrice === 400) {
      orderDetails.items[0].paisa = 400;
      orderDetails.items[1].paisa = 0;
      orderDetails.items[2].paisa = 0;
      orderDetails.items[3].paisa = 0;
    } else if (productPrice === 2850) {
      orderDetails.items[0].paisa = 2850;
      orderDetails.items[1].paisa = 0;
      orderDetails.items[2].paisa = 0;
      orderDetails.items[3].paisa = 0;
    } else {
      orderDetails.items[0].paisa = 500;
      orderDetails.items[1].paisa = 200;
      orderDetails.items[2].paisa = 250;
      orderDetails.items[3].paisa = 300;
    }
  }
  if (status === "loading" || loading1) {
    return (
      <motion.div
        className="container flex h-screen items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LoaderCircle className="h-20 w-20 animate-spin text-primary" />
      </motion.div>
    );
  }

  if (!main) {
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
  }

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const session = await getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      // console.log(process.env.NEXT_PUBLIC_KEY_ID);
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: numericPrice * 100,
        currency: "INR",
        name: session?.user?.email,
        description: session?.user?.email,
        order_id: idRef.current,
        handler: async (response: any) => {
          setLoading(true);
          setLoading1(true);
          const data = {
            orderCreationId: idRef.current,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            session,
            productPrice,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          const res = await result.json();
          if (res.isOk) {
            alert(res.message);
            router.replace("/profile");
          } else {
            alert(res.message);
          }
        },
        notes: {
          description: session?.user?.email,
          college: session?.user?.name,
        },
        theme: { color: "#6366f1" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <Head>
        <title>Checkout Page</title>
        <meta name="description" content="Explore Contact Us Page" />
        <link rel="icon" href="/culfest_logo.png" />
      </Head>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-4" style={{ background: "#0a0a1a" }}>
        {/* Comic Con Background - same as homepage */}
        <ComicBackground backgroundColor="#0a0a1a" />

        {/* Card - compact to fit single screen */}
        <div
          className="relative z-10 w-full max-w-md min-h-[85vh] flex flex-col justify-between rounded-2xl p-5 md:max-w-xl md:p-8"
          style={{
            margin: "5rem",
            border: "2px solid rgba(255, 215, 0, 0.3)",
            background: "linear-gradient(145deg, rgba(15,15,35,0.95), rgba(10,10,26,0.98))",
            boxShadow: "0 0 30px rgba(255, 215, 0, 0.08), 0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Checkout heading */}
          <h1
            className="mb-0 text-center font-Bangers text-2xl tracking-wider md:text-3xl"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff4444, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Checkout
          </h1>
          <h2
            className="mb-4 text-center font-Bangers text-sm tracking-[4px] md:text-base"
            style={{ color: "#00e5ff", textShadow: "0 0 12px rgba(0,229,255,0.4)" }}
          >
            Order & Billing
          </h2>

          <div className="space-y-3">
            {/* Customer details */}
            <div className="flex flex-col gap-0.5 rounded-lg p-3" style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.1)" }}>
              <p className="font-Bangers text-[10px] tracking-wider text-gray-500">CUSTOMER NAME</p>
              <span className="font-Bangers text-sm tracking-wide text-white">
                {orderDetails.customerName}
              </span>
              <p className="mt-1 font-Bangers text-[10px] tracking-wider text-gray-500">CUSTOMER PHONE</p>
              <p className="font-Bangers text-sm tracking-wide text-white">
                {orderDetails.customerPhone}
              </p>
              <p className="mt-1 font-Bangers text-[10px] tracking-wider text-gray-500">CUSTOMER MAIL</p>
              <p className="font-Bangers text-sm tracking-wide text-white">
                {orderDetails.customerMail}
              </p>
            </div>

            {/* Items */}
            <div>
              <p className="mb-1 font-Bangers text-[10px] tracking-wider text-gray-500">ITEMS</p>
              <ul className="space-y-1.5">
                {orderDetails.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{
                      background: "rgba(255,215,0,0.04)",
                      border: "1px solid rgba(255,215,0,0.12)",
                    }}
                  >
                    <span className="font-Bangers text-sm tracking-wide text-gray-300">{item.naam}</span>
                    <span className="font-Bangers text-sm tracking-wide text-yellow-400">₹{item.paisa}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between rounded-lg px-3 py-2" style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)" }}>
              <p className="font-Bangers text-sm tracking-wider text-gray-400">TOTAL</p>
              <p
                className="font-Bangers text-2xl tracking-wider md:text-3xl"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #ff4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹{productPrice}
              </p>
            </div>
          </div>

          {/* Pay Button */}
          {loading ? (
            <div className="mt-3 text-center">
              <p className="animate-pulse font-Bangers tracking-wider text-yellow-400">Processing...</p>
            </div>
          ) : (
            <form onSubmit={processPayment}>
              <button
                className="mt-4 w-full rounded-xl py-3 font-Bangers text-lg tracking-wider text-black transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #ff8c00, #ffd700)",
                  boxShadow: "0 0 25px rgba(255,215,0,0.25)",
                }}
                type="submit"
              >
                {loading ? "Processing..." : "⚡ PAY NOW"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}