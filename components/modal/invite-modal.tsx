"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

const InviteModal = () => {
  const { type, isOpen, onClose, data, onOpen } = useModal();
  const [isLoading, setLoading] = useState(false);
  const [copied, setCopied] = useState();
  const isModal = isOpen && type === "invite";
  const { server } = data;
  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const handleCopy = () => {
    setLoading(true);
    navigator.clipboard.writeText(inviteUrl);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  const onNew = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isModal} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black p-0">
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite your friend
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center gap-x-2 ml-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
              value={inviteUrl}
              disabled={isLoading}
            />
            <Button size={"icon"} onClick={handleCopy} disabled={isLoading}>
              {!isLoading ? (
                <Copy className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-sm text-zinc-500 mt-4"
            disabled={isLoading}
            onClick={onNew}
          >
            Generate new Link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
