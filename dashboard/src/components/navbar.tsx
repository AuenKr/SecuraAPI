import { Shield } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import LoginBtn from "./loginBtn";

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center dark:bg-gray-950">
      <Link className="flex items-center justify-center" href="#">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">SecuraAPI</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
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
    </header>
  );
}
