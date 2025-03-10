import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import Link from "next/link";
import { neobrutalism } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: neobrutalism
    }}>
      <SignedIn>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </SignedIn>
      <SignedOut>
        <div className="bg-gradient-to-bl from-slate-800 to-slate-950 h-screen flex justify-center items-center">
          <div className="text-2xl font-semibold text-white">
            <span>SignUp first to write a blog -{">"} </span>
            <Link href="/signup" className="italic underline">singup</Link>
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  )
}
