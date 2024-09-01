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
            className={`w-full py-2 px-4 rounded bg-purple-500 hover:bg-purple-700 text-white`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
