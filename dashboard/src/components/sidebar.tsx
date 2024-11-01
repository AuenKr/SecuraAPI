import Link from "next/link";
import { sideBarConfig as config } from "./config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Shield } from "lucide-react";

export function SideBar() {
  return (
    <aside>
      <Sidebar>
        <SidebarHeader className="flex flex-row justify-between items-center">
          <span className="flex items-center">
            <Shield className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">SecuraAPI</span>
          </span>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="space-y-2">
            {config.sidebar.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`w-full py-2 px-4 border-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-black text-center font-bold`}
              >
                {item.title}
              </Link>
            ))}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
}
