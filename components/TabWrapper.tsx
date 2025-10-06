"use client";
import { tabData } from "@/app/(features)/(main)/profile/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userAtom } from "@/lib/atom/user.atom";
import { UserPrisma } from "@/types";
import { useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";
import { Typography } from "./Typography";

const TabWrapper = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile?: UserPrisma | null;
}) => {
  const path = usePathname();
  const router = useRouter();
  const setUserAtom = useSetAtom(userAtom);
  const initialTab = path.split("/")?.[2] || tabData[0].value;
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleTabChange = (value: string) => {
    startTransition(() => {
      router.push(`/profile/${value}`, { scroll: false });
    });
  };

  useEffect(() => {
    setCurrentTab(initialTab);
    if (profile) {
      const skinType = profile?.profile?.skinType;
      const skinConcerns = profile?.profile?.concerns?.map((item) => item.name);
      setUserAtom((pre) => ({
        ...pre,
        email: profile?.email,
        name: profile?.name,
        bio: profile?.bio,
        skinType: skinType,
        skinConcerns: skinConcerns,
        photoUrl: {
          url: profile?.Image?.at(profile?.Image?.length - 1)?.url
            ? profile?.Image?.at(profile?.Image?.length - 1)?.url
            : pre.photoUrl?.url,
        },
      }));
    }
  }, [path, initialTab, profile, setUserAtom]);

  return (
    <Tabs
      value={currentTab}
      defaultValue={initialTab}
      onValueChange={handleTabChange}
      className=" my-2 justify-center max-w-4xl container mx-auto "
    >
      <Typography variant="h5" className="text-secondary  w-full">
        Account
      </Typography>
      <main className="overflow-x-scroll no-scrollbar">
        <TabsList className="overflow-y-hidden  no-scrollbar flex gap-4">
          {tabData.map((tab) => (
            <TabsTrigger
              className="px-8 py-4 bg-primary text-secondary data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:hover:bg-secondary/80 hover:bg-primary/70 cursor-pointer"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </main>

      <TabsContent value={currentTab} className="mt-4">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default TabWrapper;
