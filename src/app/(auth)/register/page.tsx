import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070814] p-4 sm:p-8 relative overflow-hidden">
      {/* Dynamic background color spots */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.15)_0%,_rgba(0,0,0,0)_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.15)_0%,_rgba(0,0,0,0)_70%)] blur-[80px] pointer-events-none" />
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
      
      {/* Grid Overlay for premium texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10">
        <GraduationCap className="h-6 w-6 text-purple-400" />
        <Link href="/" className="font-bold tracking-tight text-xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ScholarStack</Link>
      </div>
      
      <div className="w-full max-w-[420px] z-10 relative">
        {/* Colorful glowing aura behind the form */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-[2rem] blur-2xl -z-10 opacity-70" />
        <RegisterForm />
      </div>
    </div>
  );
}
