"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export function NavUsers({
  navbars,
}: {
  navbars: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();
  const { setOpen } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Users Overviews</SidebarGroupLabel>

      <SidebarMenu>
        {navbars.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.url == pathName}
            className="group/collapsible"
          >
            <SidebarMenuItem
              className={clsx({
                "bg-sidebar-accent": pathName == item.url,
              })}
            >
              {item.items?.length ? (
                <CollapsibleTrigger asChild onClick={() => setOpen(true)}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <Link href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
