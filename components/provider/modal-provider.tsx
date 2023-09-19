"use client";

import React, { useEffect, useState } from "react";
import CreateServerModal from "@/components/modal/create-server-modal";
import InviteModal from "@/components/modal/invite-modal";
import EditServerModal from "@/components/modal/edit-server-modal";
import MembersModal from "@/components/modal/members-modal";

const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <>
      <InviteModal />
      <CreateServerModal />
      <EditServerModal />
      <MembersModal/>
    </>
  );
};

export default ModalProvider;
