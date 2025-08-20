import Footer from "@/components/custom/footer/Footer";
import Wrapper from "@/components/custom/layout/Wrapper";
import NavBar from "@/components/custom/navbar/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full">
      <NavBar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </main>
  );
};

export default Layout;
