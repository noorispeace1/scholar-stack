"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  MapPin,
  Phone,
  Camera,
  Save,
  Loader2,
  CheckCircle,
  Briefcase,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const router = useRouter();

  // Profile fields state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("student");

  // Interaction states
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Uploading states
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  // Input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setCoverPhoto((session.user as any).coverPhoto || "");
      setLocation((session.user as any).location || "");
      setPhoneNumber((session.user as any).phoneNumber || "");
      setRole((session.user as any).role || "student");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070814]">
        <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  // ImgBB Upload Function
  const uploadImageToImgBB = async (file: File, type: "avatar" | "cover") => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setError("ImgBB API key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY in .env");
      return;
    }

    if (type === "avatar") {
      setIsUploadingImg(true);
    } else {
      setIsUploadingCover(true);
    }
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error?.message || "Failed to upload image to ImgBB");
      }

      const uploadedUrl = result.data.url;

      if (type === "avatar") {
        setImage(uploadedUrl);
      } else {
        setCoverPhoto(uploadedUrl);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingImg(false);
      setIsUploadingCover(false);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToImgBB(file, "avatar");
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToImgBB(file, "cover");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);
    setShowSuccess(false);

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          image,
          role,
          location,
          coverPhoto,
          phoneNumber
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      await refetch();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070814] text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.1)_0%,_rgba(0,0,0,0)_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.1)_0%,_rgba(0,0,0,0)_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Success / Error Alerts */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm"
            >
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p>Profile updated successfully!</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-950/65 backdrop-blur-2xl shadow-2xl overflow-hidden">
          
          {/* Cover Photo Banner */}
          <div className="relative h-48 md:h-64 bg-slate-900 overflow-hidden group">
            <img
              src={coverPhoto || DEFAULT_COVER}
              alt="Cover Photo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                disabled={isUploadingCover}
                onClick={() => coverInputRef.current?.click()}
                className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white font-medium px-4 py-2 rounded-xl border border-white/20 hover:bg-black/80 transition-colors cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Camera className="h-4 w-4" />
                <span>Change Cover Photo</span>
              </button>
            </div>
            {isUploadingCover && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                  <span className="text-sm text-slate-300 font-medium">Uploading cover photo...</span>
                </div>
              </div>
            )}
          </div>

          {/* User Details Header Area */}
          <div className="px-6 md:px-8 pb-6 border-b border-white/5 relative">
            {/* Profile Avatar (overlaps cover photo) */}
            <div className="absolute -top-16 left-6 md:left-8 group">
              <div className="h-28 w-28 rounded-2xl border-4 border-slate-950 bg-slate-900 overflow-hidden relative shadow-xl">
                {image ? (
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-4xl text-white">
                    {name ? name[0].toUpperCase() : "U"}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div 
                  onClick={() => !isUploadingImg && fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <button
                    type="button"
                    disabled={isUploadingImg}
                    className="p-2 bg-black/60 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                    title="Change Profile Picture"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                {isUploadingImg && (
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Name, Email, and Role Badge */}
            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                    {name || "User Name"}
                  </h2>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${role === 'instructor' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                    <Briefcase className="h-3 w-3" />
                    {role === "instructor" ? "Course Teacher" : "Student"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{session.user.email}</p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80">
                  Full Name
                </label>
                <div className="relative rounded-xl border border-white/10 bg-slate-900/60 focus-within:border-purple-500/50 transition-colors">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Mobile number input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80">
                  Mobile Number
                </label>
                <div className="relative rounded-xl border border-white/10 bg-slate-900/60 focus-within:border-purple-500/50 transition-colors">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+8801700000000"
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Location input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80">
                  Location
                </label>
                <div className="relative rounded-xl border border-white/10 bg-slate-900/60 focus-within:border-purple-500/50 transition-colors">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Dhaka, Bangladesh"
                    className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Role Select Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80">
                  Join As (Role)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 border text-sm font-semibold transition-all cursor-pointer ${role === "student" ? 'border-purple-500 bg-purple-50/10 text-purple-400' : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 text-slate-400'}`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("instructor")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 border text-sm font-semibold transition-all cursor-pointer ${role === "instructor" ? 'border-indigo-500 bg-indigo-55/10 text-indigo-400' : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 text-slate-400'}`}
                  >
                    Course Teacher
                  </button>
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isUpdating || isUploadingImg || isUploadingCover}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_0_rgba(168,85,247,0.4)] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
