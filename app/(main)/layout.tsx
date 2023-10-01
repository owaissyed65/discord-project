import NavigationBar from "@/components/navigation/navigation-bar";
import React from "react";

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-full hidden md:flex flex-col fixed inset-y-0 z-30 w-[72px]">
        <NavigationBar />
      </div>
      <main className="pl-0 md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default Mainlayout;
