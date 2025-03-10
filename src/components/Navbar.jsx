"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk(); // Get the signOut function
  const router = useRouter();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Login", slug: "/sign-in", active: !user },
    { name: "Signup", slug: "/sign-up", active: !user },
    { name: "Post Job", slug: "/business/job-post", active: user },
    { name: "Job Proposals", slug: "/business/job-proposals", active: user },
    { name: "My Profile", slug: "/business/profile-setup", active: user },
    { name: "My Profile", slug: "/lancer/profile-setup", active: user },
  ];

  return (
    <nav className="flex items-center justify-between px-6 sm:px-10 pt-6 relative">
      <Link href={"/"}>
        <div className="font-bold text-3xl">
          MIND<span className="text-blue-700">Lancer</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex space-x-3">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.slug}>
                <button
                  onClick={() => router.push(item.slug)}
                  className="h-[40px] w-[110px] inline-flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium 
                  bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:outline-blue-700 hover:outline-dotted hover:outline-3 focus:outline-none focus:ring-blue-500 active:scale-90"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {user && (
          <li>
            <button
              onClick={() => signOut()}
              className="inline-block w-auto h-[42px] py-2 px-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 hover:drop-shadow-lg active:scale-90 hover:outline-red-600 hover:outline-dotted hover:outline-3"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-3 py-2 outline-2 outline-blue-600 rounded-2xl text-blue-600 hover:bg-blue-100"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute z-30 top-20 right-5 w-48 bg-white shadow-2xl rounded-lg p-2 lg:hidden">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.slug}
                  onClick={() => {
                    router.push(item.slug);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-blue-600 hover:bg-blue-100"
                >
                  {item.name}
                </button>
              )
          )}
          {user && (
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
