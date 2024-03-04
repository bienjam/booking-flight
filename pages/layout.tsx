import Footer from "@/components/footer";
import { MainNav } from "@/components/nav";
import React, { ReactNode } from "react";

const mainNav = [
  {
    title: "Flights",
    href: "#flights",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
];

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="my-5 mx-8">
        <MainNav items={mainNav} />
      </div>
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
