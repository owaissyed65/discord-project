"use client";
import React from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

const EmojiPicker = ({ onChange }: any) => {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        alignOffset={40}
        sideOffset={40}
        className="bg-transparent border-none shadow-none border-shadow-none mb-16"
      >
        <Picker
          data={data}
          onEmojiSelect={(e: any) => onChange(e.native)}
          theme={theme}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
