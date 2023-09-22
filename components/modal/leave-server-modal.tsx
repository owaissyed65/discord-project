"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "@/components/ui/button";

const LeaveServerModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const [isLoading, setLoading] = useState(false);
  const isModal = isOpen && type === "leaveServer";
  const router = useRouter();
  const onClick = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/servers/${data?.server?.id}/leave`);
      router.refresh();
      onClose();
      window.location.reload();
      router.push("/");
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
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you really want to leave{" "}
            <span className="text-indigo-500">{data?.server?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-100 p-6">
          <DialogDescription className="grid grid-cols-3 gap-x-3">
            <Button
              variant={"ghost"}
              className="col-span-3 md:col-span-1 capitalize"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant={"primary"}
              className="col-span-3 md:col-span-2 capitalize"
              disabled={isLoading}
              onClick={onClick}
            >
              confirm
            </Button>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
