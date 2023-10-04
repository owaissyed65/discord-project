"use client";

import { useState } from "react";
import axios from "axios";
import qs from "query-string";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteMessageModal = () => {
  const { type, isOpen, onClose, data } = useModal();
  const { apiUrl, query } = data;
  const [isLoading, setLoading] = useState(false);
  const isModal = isOpen && type === "deleteMessage";
  const onClick = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl as string,
        query: query,
      });
      await axios.delete(url);

      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you really want to Delete{" "}
            <span className="text-indigo-500">{data?.channel?.name}</span>? This
            will delete permanently
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

export default DeleteMessageModal;
