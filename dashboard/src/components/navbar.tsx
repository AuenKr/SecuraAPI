import { Shield } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import LoginBtn from "./loginBtn";

export function Navbar() {
  return (
    <nav className="px-4 lg:px-6 h-14 flex justify-between items-center gap-4 sm:gap-6 dark:bg-gray-950">
      <div >
        <Link className="flex items-center justify-center" href="#">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SecuraAPI</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
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
