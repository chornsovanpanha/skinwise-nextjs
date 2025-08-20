import { MobileMenu } from "@/types";
import { DatabaseBackup, Search, User } from "lucide-react";

export const menus: MobileMenu[] = [
  {
    id: 1,
    link: "#",
    name: "Explore",
    hasHover: true,
    content: (
      <main className="space-y-2 grid grid-cols-3 h-56">
        <section className="w-full h-full bg-green-50 col-span-1"></section>
        <section className="w-full h-full bg-blue-50 col-span-2"></section>
      </main>
    ),
  },
  {
    id: 2,
    link: "#",
    name: "Tools",
    hasHover: true,
    content: (
      <main className="space-y-2  ">
        <div className="flex gap-4">
          <Search className="w-10 h-10" />
          <div>
            <header>Ingredient Checker</header>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              nulla repellat.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Search className="w-10 h-10" />
          <div>
            <header>Ingredient Checker</header>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              nulla repellat.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Search className="w-10 h-10" />
          <div>
            <header>Ingredient Checker</header>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
              nulla repellat.
            </p>
          </div>
        </div>
      </main>
    ),
  },
  {
    id: 3,
    link: "#",
    name: "Routine",
    hasHover: true,
    content: (
      <main className="space-y-2">
        {Array.from({ length: 5 }, (item, index) => (
          <div
            className="flex gap-4 items-center hover:bg-gray-100 hover:cursor-pointer"
            key={index}
          >
            <div className="p-2 bg-blue-50">
              <DatabaseBackup className="w-8 h-8" />
            </div>
            <div>
              <header>Skincare Reviews</header>
            </div>
          </div>
        ))}
      </main>
    ),
  },
  {
    id: 4,
    link: "#",
    name: "Subscribe",
    hasHover: false,
  },
];
