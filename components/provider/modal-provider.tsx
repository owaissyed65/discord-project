"use client"

import React, { useEffect, useState } from "react";
import CreateServerModal from "@/components/modal/create-server-modal";

const ModalProvider = () => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!isMounted) {
    return;
  }
  return <CreateServerModal />;
};

export default ModalProvider;
