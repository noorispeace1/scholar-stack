"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      const { error: signUpError } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to sign up.");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (err: any) {
      setError(err.message || "Failed to log in with Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full p-8 rounded-[2rem] bg-slate-950/65 backdrop-blur-2xl border border-white/10 hover:border-purple-500/20 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] transition-all duration-300 relative"
    >
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-purple-200/50 text-sm">Join ScholarStack today</p>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-sm text-red-400"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <div className={`relative group rounded-xl border bg-slate-900/60 transition-all duration-200 ${errors.name ? 'border-red-500/30 group-hover:border-red-500/50 focus-within:border-red-500' : 'border-white/10 focus-within:border-purple-500/50 focus-within:bg-slate-950/60'}`}>
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors h-5 w-5" />
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all text-sm"
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <div className={`relative group rounded-xl border bg-slate-900/60 transition-all duration-200 ${errors.email ? 'border-red-500/30 group-hover:border-red-500/50 focus-within:border-red-500' : 'border-white/10 focus-within:border-purple-500/50 focus-within:bg-slate-950/60'}`}>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors h-5 w-5" />
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all text-sm"
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <div className={`relative group rounded-xl border bg-slate-900/60 transition-all duration-200 ${errors.password ? 'border-red-500/30 group-hover:border-red-500/50 focus-within:border-red-500' : 'border-white/10 focus-within:border-purple-500/50 focus-within:bg-slate-950/60'}`}>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors h-5 w-5" />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all text-sm"
            />
          </div>
          {errors.password && <p className="text-red-400 text-xs ml-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <div className={`relative group rounded-xl border bg-slate-900/60 transition-all duration-200 ${errors.confirmPassword ? 'border-red-500/30 group-hover:border-red-500/50 focus-within:border-red-500' : 'border-white/10 focus-within:border-purple-500/50 focus-within:bg-slate-950/60'}`}>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors h-5 w-5" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none transition-all text-sm"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-xs ml-1">{errors.confirmPassword.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 mt-2 transition-all duration-300 shadow-[0_0_20px_0_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign Up <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      <div className="flex items-center gap-4 py-6">
        <div className="flex-1 h-px bg-white/10"></div>
        <p className="text-purple-200/35 text-xs font-semibold uppercase tracking-wider">Or continue with</p>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isSubmitting}
        className="w-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 hover:border-purple-500/30 flex items-center justify-center gap-3 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white/70" />
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </>
        )}
      </motion.button>

      <div className="mt-8 text-center text-sm">
        <span className="text-purple-200/50">Already have an account? </span>
        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors hover:underline">
          Sign In
        </Link>
      </div>
    </motion.div>
  );
}
