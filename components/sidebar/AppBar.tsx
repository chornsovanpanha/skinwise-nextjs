"use client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import AvatarHeader from "../AvatarHeader";
import { Typography } from "../Typography";
import { Card } from "../ui/card";
import { SidebarTrigger } from "../ui/sidebar";
type AppBarProps = { title: string };
const AppBar = ({ title }: AppBarProps) => {
  return (
    <Card className="max-w-8xl mx-4 my-4 flex-row items-center justify-between">
      <aside className="flex">
        <SidebarTrigger size={"lg"} className="md:hidden" />
        <Typography variant="h3">{title}</Typography>
      </aside>
      <DropdownMenu>
        <AvatarHeader className="card-border md:hidden" />
      </DropdownMenu>
    </Card>
  );
};

export default AppBar;
