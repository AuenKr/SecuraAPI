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
          <div className="flex flex-col justify-between h-full w-full">
            <div className="grid grid-cols-1 w-full h-full">
              <div className="col-span-1 w-full">
                <Navbar />
              </div>
              <div className="col-span-1 flex flex-col w-full">
                <main className="flex-grow w-full">{children}</main>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
