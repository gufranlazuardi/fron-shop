"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import CustomModal from "../CustomModal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <CustomModal
      title="Buat store"
      description="Tambahkan store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Store Form
    </CustomModal>
  );
};
