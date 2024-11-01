import { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./global.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SecuraAPI",
  description: "Secure API endpoints",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <>{children}</>
            <Toaster />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
