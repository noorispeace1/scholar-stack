"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, LogIn, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

const LOGGED_OUT_LINKS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const LOGGED_IN_LINKS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { logout } = useAuth();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isLoggedIn = !!user;
  
  const pathname = usePathname();
  const links = isLoggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-[var(--color-primary)]" />
              <span className="font-bold text-xl tracking-tight">ScholarStack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
                  pathname === link.href ? "text-[var(--color-primary)]" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 animate-in fade-in duration-200">
                {/* Profile picture icon that toggles details */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 focus:outline-none rounded-full p-0.5 hover:ring-2 hover:ring-[var(--color-primary)]/30 transition-all cursor-pointer"
                    aria-label="User menu"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-9 w-9 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm transition-opacity">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-surface p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-xs font-semibold text-foreground/50">Signed in as</p>
                        <p className="text-sm font-semibold text-foreground truncate mt-0.5">{user.name}</p>
                        <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-surface-hover text-foreground/80 hover:text-[var(--color-primary)] transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Profile Settings
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sign Out Button next to user picture icon */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm font-medium hover:text-red-500 hover:bg-red-50/10 dark:hover:bg-red-950/20 px-3 py-1.5 rounded-lg transition-colors border border-border hover:border-red-500/30 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span className="text-foreground/80 hover:text-red-500">Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium px-4 py-2 rounded-lg border border-border hover:border-purple-500/50 hover:bg-purple-500/5 text-foreground/80 hover:text-purple-400 transition-all duration-300 cursor-pointer"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_5px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-surface-hover transition-colors focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-surface border-b border-border",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-surface-hover hover:text-[var(--color-primary)]",
                pathname === link.href ? "text-[var(--color-primary)] bg-surface-hover" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-surface-hover rounded-lg">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-10 w-10 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-base">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-base font-medium text-foreground hover:bg-surface-hover transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-white px-4 py-2 text-base font-medium hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-base font-medium text-foreground/80 hover:bg-surface-hover hover:text-purple-400 transition-colors cursor-pointer"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-base font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-200 cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
