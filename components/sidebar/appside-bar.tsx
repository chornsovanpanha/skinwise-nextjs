"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "./data";
import { NavFeatures } from "./nav-features";
import { NavFooter } from "./nav-footers";
import { NavOverviews } from "./nav-overview";
import { NavUsers } from "./nav-users";
import { TeamSwitcher } from "./team-switcher";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;
export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavOverviews navbars={data.overviews} />
        <NavFeatures navbars={data.navMain} />
        <NavUsers navbars={data.users} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
