"use client";
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/organisms/topbar/Topbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAppSlidebar = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased bg-[#eff3f8] overflow-x-hidden p-5`}
      >
        <div className="flex space-x-5">
          <Sidebar
            toggleAppSlidebar={toggleAppSlidebar}
            isOpen={isOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div
            className={`flex flex-1 flex-col space-y-5 transition-all duration-300 fixed top-5 z-[500] w-full pr-14 ${
              isOpen ? "pl-56" : "pl-20"
            }`}
            style={{ height: "calc(100vh - 40px)" }}
          >
            <div className="flex flex-col h-full space-y-5">
              <Topbar />

              <main className="flex-grow overflow-y-auto rounded-md space-y-5 bg-white">
                <div>{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
