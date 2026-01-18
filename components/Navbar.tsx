"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sprout, LayoutDashboard, CloudSun, BadgeIndianRupee, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Sprout size={18} /> },
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Weather", href: "/weather", icon: <CloudSun size={18} /> },
    { name: "Mandi Rates", href: "/mandi", icon: <BadgeIndianRupee size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-green-100 shadow-sm group-hover:shadow-md transition-all">
                <Image
                  src="/logo.png"
                  alt="Halधर"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                Halधर
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <User size={18} />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors flex items-center gap-3"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-green-700 text-white px-3 py-3 rounded-md font-medium hover:bg-green-800 transition-colors"
            >
              Login / Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
