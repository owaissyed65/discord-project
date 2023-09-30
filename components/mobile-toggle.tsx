// import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
import { Menu } from "lucide-react";
import NavigationBar from "./navigation/navigation-bar";
import ServerSidebar from "./server/server-sidebar";
const MobileToggle = ({ serverId }: { serverId: string }) => {
  // const [isMounted, setMounted] = useState(false);
  // const params = useParams() as { serverId: string };
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!isMounted) {
  //   return null;
  // }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationBar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
