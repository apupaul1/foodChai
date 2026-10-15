import Navbar from "@/Components/shared/Navbar";
import React from "react";

const HomeLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;
