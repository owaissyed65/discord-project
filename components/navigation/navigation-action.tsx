"use client";

import React from "react";
import { Plus } from "lucide-react";

import ActionTooltip from "@/components/action-tooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip align="center" side="right" label="Create a server">
        <button className="group flex items-center">
          <div className="flex mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-emerald-500 dark:bg-neutral-700 ">
            <Plus
              className="group-hover:text-white transition-all text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
