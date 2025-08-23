import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SWStarter",
    description: "SWStarter",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${montserrat.variable} antialiased`}>
        <Navbar/>
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8 gap-8">
            {children}
        </div>
        </body>
        </html>
    );
}
