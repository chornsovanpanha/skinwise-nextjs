"use client";
import { tabData } from "@/app/(features)/(main)/profile/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";
import { Typography } from "./Typography";

const TabWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const router = useRouter();

  const initialTab = path.split("/")?.[2] || tabData[0].value;
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleTabChange = (value: string) => {
    startTransition(() => {
      router.push(`/profile/${value}`, { scroll: false });
    });
  };

  useEffect(() => {
    setCurrentTab(initialTab);
  }, [path, initialTab]);

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
