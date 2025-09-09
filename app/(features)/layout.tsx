import Footer from "@/components/custom/footer/Footer";
import NavBar from "@/components/custom/navbar/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: {
    template: "Skinwise | %s",
    default: "Home",
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <main className="w-full">
        <NavBar />
        {children}
        <div className="bg-primary">
          <Footer />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
