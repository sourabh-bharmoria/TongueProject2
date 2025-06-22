import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tongue Diagnostics",
    description: "AI-Powered Tongue Diagnostics",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo.png" sizes="any" />
            </head>
            <body className={`${inter.className} bg-white text-black`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
