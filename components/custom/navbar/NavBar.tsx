import AuthenticatedButton from "@/app/(auth)/components/AuthenticatedButton";
import { SkinwiseLogoTop } from "@/assets";
import LoginButton from "@/components/LoginButton";
import { getAppSession } from "@/lib/sessions/cookie";
import Image from "next/image";
import Link from "next/link";
import MobileNavBar from "./MobileNavBar";
import PublicMenus from "./PublicMenus";

export default async function NavBar() {
  const cookie = await getAppSession();

  return (
    <div className="sticky top-0 z-[12000] bg-gray-50">
      <div className="flex mx-auto container max-w-7xl justify-between px-6 sm:px-12 py-6 ">
        {/* Left side (Logo) */}
        <Link href="/" className="flex items-center">
          <Image
            alt="skin-wise-logo"
            src={SkinwiseLogoTop}
            className="w-40 h-auto"
            priority
          />
        </Link>

        {/* Right side (Menus + Auth) */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <PublicMenus />
          {/* Authentication Buttons */}
          {cookie ? <AuthenticatedButton /> : <LoginButton />}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <MobileNavBar isLogin={!!cookie} />
        </div>
      </div>
    </div>
  );
}
