"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, LogIn, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { useAuth } from "@/context/AuthContext";

const LOGGED_OUT_LINKS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const LOGGED_IN_LINKS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage", href: "/courses/manage" },
  { name: "Profile", href: "/dashboard/profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  
  const pathname = usePathname();
  const links = isLoggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

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
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                title="Log Out"
              >
                <User className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary)]/90 transition-colors"
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
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-hover px-4 py-2 text-base font-medium text-foreground hover:bg-border transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-base font-medium text-foreground hover:bg-surface-hover transition-colors"
                >
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-base font-medium text-white hover:bg-[var(--color-primary)]/90 transition-colors"
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
