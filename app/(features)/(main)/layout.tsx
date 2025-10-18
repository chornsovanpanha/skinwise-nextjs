import Footer from "@/components/custom/footer/Footer";
import NavBar from "@/components/custom/navbar/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "Skinwise | %s",
    default: "Skinwise landing page",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />

        <main className="flex-1 w-full min-h-screen overflow-x-hidden">
          {children}
        </main>

        <div className="bg-primary mt-10">
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
