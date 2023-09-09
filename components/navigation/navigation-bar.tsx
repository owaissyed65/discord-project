import React from "react";

import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import ActionTooltip from "@/components/action-tooltip";

const NavigationBar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 w-full h-full py-3 text-primary bg-primary/10 flex flex-col items-center dark:bg-[#1e1f22]">
      <NavigationAction />
      <Separator className="h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full ">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto pb-3 flex items-center flex-col gap-y-4">
        <ModeToggle className="rounded-full w-[48px] h-[48px]" />

        <ActionTooltip
          align="center"
          side="right"
          label={`Name: ${profile.name}`}
        >
          <button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-[48px] w-[48px]",
                },
              }}
            />
          </button>
        </ActionTooltip>
      </div>
    </div>
  );
};

export default NavigationBar;
