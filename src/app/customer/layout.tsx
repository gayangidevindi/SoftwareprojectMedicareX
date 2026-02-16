import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartPharma - Customer Portal",
  description: "Shop medicines online",
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} w-full`}>
      <Navbar />
      <main className="min-h-screen w-full">{children}</main>
      <Footer />
    </div>
  );
}