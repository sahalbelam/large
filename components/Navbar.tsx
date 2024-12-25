"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BookOpenText, Library, SquarePen} from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <nav className="backdrop-filter backdrop-blur-md bg-opacity-30 w-full max-w-6xl rounded-xl shadow-lg bg-slate-600  mt-4">
        <div className="text-white font-semibold flex justify-between items-center px-6 h-14 w-full">
          <div >
            <Link className="flex items-center h-fit gap-2 text-lg font-semibold" href="/">
              <BookOpenText className="hover:scale-110 transition-transform duration-300" /> <span>Large</span> 
            </Link>
            
          </div>
          <div className="flex items-center gap-5">
            <SignedIn>
              <Link href="/myblogs"><Library className="hover:scale-110 transition-transform duration-300"/></Link>
              <Link href="/write"><SquarePen className="hover:scale-110 transition-transform duration-300"/></Link>
            </SignedIn>
            <div className="flex">
              <SignedOut>
                <Link href="/signup" className="italic underline hover:text-slate-400">SignUP</Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
