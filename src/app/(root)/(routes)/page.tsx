"use client";

import CustomModal from "@/components/CustomModal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <>
      <div className="mx-auto h-screen flex flex-col gap-2 p-[1rem]">
        <UserButton afterSwitchSessionUrl="/sign-in" />
        root page
      </div>
    </>
  );
}
