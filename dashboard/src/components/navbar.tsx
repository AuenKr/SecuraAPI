import { Shield } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import LoginBtn from "./loginBtn";
import { getServerSession } from "next-auth";
import { SidebarTrigger } from "./ui/sidebar";

export async function Navbar() {
  const session = await getServerSession();
  return (
    <nav className="px-4 lg:px-6 h-14 flex justify-between items-center gap-4 sm:gap-6 dark:bg-gray-950">
      <div className="flex items-center">
        {session?.user ? (
          <SidebarTrigger />
        ) : (
          <Shield className="h-6 w-6 text-primary" />
        )}
        <span className="ml-2 text-lg font-bold">SecuraAPI</span>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hidden md:flex"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 hidden md:flex"
          href="#how-it-works"
        >
          How It Works
        </Link>
        <LoginBtn />
        <ModeToggle />
      </div>
    </nav>
  );
}
