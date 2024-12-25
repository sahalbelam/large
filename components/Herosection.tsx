import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from 'react'

const Herosection = () => {
    return (
        <div className='flex justify-center text-slate-200 mt-5'>
            <div className='w-full max-w-6xl'>
                <div className='flex justify-center'>
                    <div >
                        <div className='inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent text-7xl font-bold'> Write. Read. Repeat.</div>
                        <div className='text-2xl flex justify-center mt-3'><span>A space for creators and readers to connect and grow</span></div>
                        <div className="flex justify-center mt-5">
                            <SignedIn >
                                <Link
                                    href="/write"
                                    className="min-w-fit h-fit px-3 py-2 font-bold text-white bg-[#d90429] border-2 border-[#d90429] rounded-full transition-all duration-300 hover:bg-white hover:text-[#d90429]"
                                >
                                    Start Writing
                                </Link>
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    href="/signup"
                                    className="min-w-fit h-fit px-3 py-2 font-bold text-white bg-[#d90429] border-2 border-[#d90429] rounded-full transition-all duration-300 hover:bg-white hover:text-[#d90429]"
                                >
                                    Join Us
                                </Link>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Herosection
