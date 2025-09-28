"use client";
import { BadgeCheck, CreditCard, LogOut, Sparkles } from "lucide-react";
import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSidebar } from "./ui/sidebar";
import UserAvatar from "./UserAvatar";

type AvatarHeaderProps = {
  className?: string;
};
const AvatarHeader: React.FC<AvatarHeaderProps> = ({ className }) => {
  const { isMobile, open } = useSidebar();

  return (
    <DropdownMenuTrigger asChild>
      <div
        className={`flex items-center flex-row gap-2 ${className} justify-between`}
      >
        <UserAvatar showIcon open={open} />
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg my-4"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <UserAvatar showIcon={false} />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenuTrigger>
  );
};

export default AvatarHeader;
