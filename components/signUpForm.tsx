import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    state: "",
    college: "",
    gender: "male",
    graduationYear: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    formData["confirmPassword"] = formData["re-enter password"];
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/sendemailforregister", {
        email: formData?.email,
        purpose: "registration",
        phone: formData?.phone,
      });
      if (response.data.status === 400) {
        setError(response.data.message);
      } else if (response.data.status === 409) {
        setError(response.data.message);
      } else if (response.data.status === 201) {
        setSentOtp(true);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately if needed, though not used in current form structure
    const checked =
      type === "checkbox" && (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formData["confirmPassword"] = formData["re-enter password"];
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/auth/signup", {
        email: formData?.email,
        otp,
        formData,
      });
      setIsSubmitting(false);

      if (response.status === 201) {
        alert("Registered successfully");
        router.push("/login");
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err.response.data.message);
      setTimeout(() => {
        setError("Try again");
      }, 2000);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">

      {/* Logo - Home Link */}
      <Link href="/" className="fixed left-5 top-5 z-20">
        <img
          src="/colorLogo.png"
          alt="CULFEST Logo"
          className="animate-bounce-slow h-[60px] md:h-[115px] w-auto rounded-lg bg-black/30 p-2 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        />
      </Link>

      {/* Registration Form Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-[10%] lg:px-[20%] font-Quicksand">

        <div className="relative flex w-full max-w-5xl flex-col rounded-xl border border-cyan-500/30 bg-slate-900/80 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl lg:flex-row overflow-hidden">

          {/* Decorative Corner Accents */}
          <div className="absolute -left-1 -top-1 h-10 w-10 rounded-tl-xl border-l-2 border-t-2 border-yellow-400 z-20"></div>
          <div className="absolute -right-1 -top-1 h-10 w-10 rounded-tr-xl border-r-2 border-t-2 border-yellow-400 z-20"></div>
          <div className="absolute -bottom-1 -left-1 h-10 w-10 rounded-bl-xl border-b-2 border-l-2 border-yellow-400 z-20"></div>
          <div className="absolute -bottom-1 -right-1 h-10 w-10 rounded-br-xl border-b-2 border-r-2 border-yellow-400 z-20"></div>


          {/* Logo Section */}
          <div className="flex w-full items-center justify-center bg-black/40 p-8 lg:w-1/3 lg:border-r border-cyan-500/20">
            <motion.img
              src="/culfest_logo.png"
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="h-40 w-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              style={{
                animation: "floatLogo 6s ease-in-out infinite",
              }}
            />
          </div>

          {/* Form Section */}
          <div className="max-h-[70vh] w-full overflow-y-auto p-8 lg:w-2/3 custom-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-8 text-center lg:text-left"
            >
              <h1 className="mb-2 text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-500 font-Bangers">
                USER REGISTRATION
              </h1>
              <p className="text-sm font-medium text-cyan-200/70 tracking-widest uppercase">
                CULFEST'26 - COMIC CON EDITION
              </p>
              <div className="mt-4 rounded border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-200/80">
                ⚠️ NOTICE: NIT Jamshedpur students must use official institute communication channels (college email).
              </div>
            </motion.div>

            {/* Form Fields */}
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={
                isOtpCorrect
                  ? handleSubmit
                  : sentOtp
                    ? handleSubmit
                    : handleSendOtp
              }
            >
              {[
                "Username",
                "Email",
                "Password",
                "Re-enter Password",
                "Phone",
                "City",
                "State",
                "College",
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={field.toLowerCase().includes("email") || field.toLowerCase().includes("college") ? "md:col-span-2" : ""}
                >
                  <div className="group relative">
                    <input
                      type={field.toLowerCase().includes("password") ? "password" : "text"}
                      required
                      placeholder=" "
                      name={field.toLowerCase()}
                      value={formData[field.toLowerCase()]}
                      onChange={handleInputChange}
                      className="peer w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-transparent outline-none transition-all focus:border-yellow-400 focus:bg-slate-800 focus:shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                    />
                    <label className="pointer-events-none absolute left-3 -top-2.5 bg-slate-900/90 px-1 text-xs text-cyan-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-400">
                      {field.toUpperCase()}
                    </label>
                  </div>
                </motion.div>
              ))}

              {/* Gender Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white outline-none transition-all focus:border-yellow-400 focus:bg-slate-800"
                    onChange={handleInputChange}
                    name={"gender"}
                    value={formData["gender"]}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-4 text-slate-400">▼</div>
                  <label className="pointer-events-none absolute left-3 -top-2.5 bg-slate-900/90 px-1 text-xs text-cyan-400">
                    GENDER
                  </label>
                </div>
              </motion.div>

              {/* Year of Graduation Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-white outline-none transition-all focus:border-yellow-400 focus:bg-slate-800"
                    onChange={handleInputChange}
                    name={"graduationYear"}
                    value={formData["graduationYear"]}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-4 text-slate-400">▼</div>
                  <label className="pointer-events-none absolute left-3 -top-2.5 bg-slate-900/90 px-1 text-xs text-cyan-400">
                    GRADUATION YEAR
                  </label>
                </div>
              </motion.div>

              <div className="md:col-span-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 py-3 font-bold text-slate-900 shadow-lg transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] font-Bangers tracking-widest text-xl"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
                  {loading
                    ? "PROCESSING..."
                    : isOtpCorrect
                      ? "FINALIZE REGISTRATION"
                      : sentOtp
                        ? "SUBMIT VERIFICATION"
                        : "SEND OTP VERIFICATION"}
                </motion.button>
              </div>

              {error && <p className="text-red-400 text-center md:col-span-2 bg-red-900/20 p-2 rounded border border-red-500/30">{error}</p>}

              {sentOtp && (
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogContent className="bg-slate-900 border border-cyan-500/50 text-white font-Quicksand">
                    <AlertDialogHeader className="relative flex justify-center">
                      <AlertDialogTitle className="h2 text-center text-yellow-400 font-Bangers tracking-wide text-2xl">
                        ENTER SECURITY CODE
                        <button onClick={() => setIsOpen(false)} className="absolute right-0 top-0 text-slate-400 hover:text-white">✕</button>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center text-slate-400">
                        A verification code has been transmitted to your email.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex justify-center py-4">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <InputOTPSlot key={i} index={i} className="border-slate-600 bg-slate-800 text-white focus:border-yellow-400 w-10 h-12" />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <AlertDialogFooter>
                      <div className="flex w-full flex-col gap-4">
                        <AlertDialogAction
                          onClick={handleSubmit}
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-Bangers tracking-wide"
                          disabled={isSubmitting}
                          type="button"
                        >
                          VERIFY
                          {isSubmitting && (
                            <span className="ml-2 animate-spin">⟳</span>
                          )}
                        </AlertDialogAction>
                        {error && <p className="text-red-400 text-center">{error}</p>}
                      </div>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <p className="md:col-span-2 text-center mt-4 text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-yellow-400 hover:text-yellow-300 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Global Styles for Scrollbar & Animations */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar {
            scrollbar-color: rgba(6, 182, 212, 0.5) rgba(15, 23, 42, 0.5);
            scrollbar-width: thin;
        }
        
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateY(10deg); }
        }
      `}</style>
    </div>
  );
};
export default SignupForm;
