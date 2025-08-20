"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "lucide-react";
import Link from "next/link";
import ContactInfo from "./ContactInfo";
import RightOwnerDate from "./RightOwnerDate";

const menus = [
  {
    id: 1,
    link: "#",
    name: "Explore",
  },
  {
    id: 2,
    link: "#",
    name: "Tools",
  },
  {
    id: 3,
    link: "#",
    name: "Routine",
  },
  {
    id: 4,
    link: "#",
    name: "Subscribe",
  },
  {
    id: 5,
    link: "#",
    name: "Contact",
  },
  {
    id: 6,
    link: "#",
    name: "About us",
  },
];

const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="open menu"
          className="text-black dark:text-white dark:hover:text-gray-300  focus:outline-none focus:ring-2 rounded focus:ring-gray-600"
        >
          <svg
            className="fill-stroke"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 12H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader className="h-10">
          <SheetTitle className="text-lg font-bold">SKINWISE</SheetTitle>
        </SheetHeader>
        <nav className="space-y-4 p-4">
          {menus.map((navbar) => (
            <Link
              key={navbar.id}
              href={navbar.link}
              className="block text-gray-800 dark:text-white hover:underline text-base"
            >
              {navbar.name}
            </Link>
          ))}

          <ContactInfo />
        </nav>

        <SheetFooter className="pt-6 pb-12 ">
          <div className="flex flex-col space-y-2 w-full text-sm text-gray-600  bg-white pb-2">
            <Button className="bg-gray-50 text-black hover:bg-gray-100 focus:border-0">
              <User />
              Login / Create an Account
            </Button>
          </div>

          <RightOwnerDate />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
