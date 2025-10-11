"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menus } from "@/utils/constant/menus";
import Link from "next/link";
import AuthButtonMobile from "./AuthButtonMobile";
import ContactInfo from "./ContactInfo";
import RightOwnerDate from "./RightOwnerDate";
import MobileLogout from "./MobileLogout";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const MobileNavBar = ({ isLogin }: { isLogin: boolean }) => {
  const router = useRouter();
  const currentPathName = usePathname();

  const mobileMenus = isLogin ? menus : menus?.filter((item) => item.id != 0);
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
        <nav className="space-y-4 p-4 ">
          <SheetHeader className="p-0">
            <Link href={"/"}>
              <SheetTitle className="text-xl text-left font-bold">
                Skinwise
              </SheetTitle>
            </Link>
          </SheetHeader>

          {mobileMenus?.map((navbar) => (
            <Link
              key={navbar.id}
              href={navbar.link}
              className={clsx(
                "block text-gray-800 dark:text-white hover:underline text-base hover:text-primary duration-50 transition-colors  ease-in",
                {
                  "text-secondary !font-bold":
                    navbar.link == `${currentPathName}`,
                }
              )}
            >
              {navbar.name}
            </Link>
          ))}

          <ContactInfo />
        </nav>

        <SheetFooter className="pt-6 pb-12">
          <section className="space-y-2">
            {!isLogin && (
              <Button
                onClick={() => {
                  router.push("/pricing");
                }}
                className="bg-secondary rounded-full text-primary px-6 hover:text-white w-full"
              >
                Get Premium
              </Button>
            )}
            {!isLogin ? (
              <AuthButtonMobile key={isLogin + ""} />
            ) : (
              <MobileLogout key={isLogin + ""} />
            )}

            <RightOwnerDate />
          </section>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavBar;
