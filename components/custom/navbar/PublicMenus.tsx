import { Typography } from "@/components/Typography";
import { menus } from "@/utils/constant/menus";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const PublicMenus = () => {
  return menus.map((navbar) => (
    <div key={navbar.id} className="relative group flex items-center">
      <Link
        href={navbar.link}
        className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 flex items-center gap-1"
      >
        <Typography
          variant="default"
          className="hover:text-primary duration-50 transition-colors  ease-in "
        >
          {navbar.name}
          {navbar.hasHover && <ChevronDown className="w-4 h-4" />}
        </Typography>
      </Link>

      {navbar.hasHover && (
        <div
          className={`absolute top-full mt-2 dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-4 px-2 ${
            navbar.id === 1 ? "left-0 right-0 w-[1000px]" : "max-w-md"
          }`}
        >
          <main>{navbar.content}</main>
        </div>
      )}
    </div>
  ));
};

export default PublicMenus;
