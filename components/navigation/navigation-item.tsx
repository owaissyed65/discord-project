"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import ActionTooltip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const handleClick = () => {
    if (id !== params?.serverId) {
      router.push(`/servers/${id}`);
    }
  };
  return (
    <ActionTooltip align="center" side="right" label={name}>
      <button
        onClick={() => {
          handleClick();
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            src={imageUrl}
            alt="image"
            fill
            className="object-cover object-center"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
