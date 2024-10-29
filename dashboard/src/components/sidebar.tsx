import Link from "next/link";
import { sideBarConfig as config } from "./config";

export function SideBar() {
  return (
    <aside className="p-4 w-[200px] text-center">
      <nav className="w-full space-y-4 flex flex-col justify-center">
        {config.sidebar.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`w-full py-2 px-4 border-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
