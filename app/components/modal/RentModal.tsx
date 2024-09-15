"use client";
import React from "react";
import Modal from "./Modal";
import { useRentModal } from "@/app/hooks/useRentModal";

export default function RentModal() {
  const rentModal = useRentModal();
  return (
    <div>
      <Modal
        // disabled={isLoading}
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        actionLabel="Submit"
        // onSubmit={handleSubmit(onSubmit)}
        // secondaryActionLabel={secondActionLabel}
        // secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onClose={rentModal.onClose}
        // body={bodyContent}
      />
    </div>
  );
}
