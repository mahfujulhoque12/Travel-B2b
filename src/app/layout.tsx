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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased bg-[#eff3f8] overflow-x-hidden p-5  dark:bg-darkMainBg`}
      >
        <div className="flex flex-col md:flex-row w-full">
          <Sidebar
            toggleAppSlidebar={toggleAppSlidebar}
            isOpen={isOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div
            className={`flex-1 flex flex-col space-y-0 md:space-y-5 transition-all duration-300 fixed top-0 left-0 md:left-5 z-[500] w-full md:h-[calc(100vh-40px)] ${
              isOpen ? "lg:pl-56" : "lg:pl-20"
            } md:relative  md:pr-5`}
            // style={{ height: "calc(100vh - 40px)" }}
          >
            <div className="flex flex-col space-y-1 h-full md:space-y-5 md:mt-0">
              <Topbar />

              <main className="flex-grow overflow-y-auto rounded-md space-y-5 table-container bg-white">
                <div>{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
