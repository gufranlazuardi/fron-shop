"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useState, useEffect } from "react";

export const ModalProvider = () => {
  // isMounted hanya akan berjalan di client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // jika ada di client component, maka return StoreModal
  return (
    <>
      <StoreModal />
    </>
  );
};
