import { getMyProfileAction } from "@/actions/profile/profile.action";
import AuthenticatedButton from "@/app/(auth)/components/AuthenticatedButton";
import { SkinwiseLogoTop, SkinwisePremium } from "@/assets";
import LoginButton from "@/components/LoginButton";
import { getAppSession } from "@/lib/sessions/cookie";
import { getUserIdFromSession } from "@/lib/sessions/session";
import { UserWithSubscription } from "@/types/prisma";
import { PlanType } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import MobileNavBar from "./MobileNavBar";
import PublicMenus from "./PublicMenus";

export default async function NavBar() {
  const cookie = await getAppSession();
  const userId = await getUserIdFromSession();
  const profile = (await getMyProfileAction(
    userId ?? ""
  )) as UserWithSubscription;

  return (
    <div className="sticky top-0 z-[50] bg-gray-50 shadow-md">
      <div className="flex mx-auto container max-w-7xl justify-between px-6 sm:px-12 py-6 ">
        {/* Left side (Logo) */}
        <Link href="/" className="flex items-center">
          <Image
            alt="skin-wise-logo"
            src={
              profile && profile?.subscription?.plan == PlanType.PRO
                ? SkinwisePremium
                : SkinwiseLogoTop
            }
            className={clsx(" w-40 h-auto", {
              "w-60": profile && profile?.subscription?.plan == PlanType.PRO,
              "w-30": profile?.subscription?.plan == PlanType.FREE,
            })}
            priority
          />
        </Link>

        {/* Right side (Menus + Auth) */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          <PublicMenus isLogin={!!profile} />

          {/* Authentication Buttons */}
          {cookie ? <AuthenticatedButton profile={profile} /> : <LoginButton />}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <MobileNavBar isLogin={!!cookie} />
        </div>
      </div>
    </div>
  );
}
