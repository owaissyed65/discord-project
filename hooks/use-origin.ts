import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return typeof window !== undefined ? window.location.origin : "";
};
