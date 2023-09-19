"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";

import { useModal } from "@/hooks/use-modal-store";
import { serverWithMembersWithProfie } from "@/types";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

const MembersModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const roleIconMap = new Map([
    ["ADMIN", null],
    ["MODERATOR", <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />],
    ["GUEST", <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />],
  ]);
  const isModal = isOpen && type === "members";
  const { server } = data as { server: serverWithMembersWithProfie };
  const [loadingId, setLoadingId] = useState();
  return (  
    <Dialog open={isModal} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black ">
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription>
            <div className="text-xs text-zinc-500 text-center">
              {server?.members?.length} Members
            </div>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[450px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member?.profile?.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  {member?.profile?.name}
                  {roleIconMap.get(member.role)}
                </div>
                <p className="text-xs text-zinc-500 flex items-center">
                  {member?.profile?.email}
                </p>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto">
                  Actions
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
