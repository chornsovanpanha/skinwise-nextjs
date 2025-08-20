"use client";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import AvatarHeader from "../AvatarHeader";

export function NavFooter() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <AvatarHeader />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
