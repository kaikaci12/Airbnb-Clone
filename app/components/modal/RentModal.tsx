"use client";
import React, { useMemo, useState } from "react";

import Modal from "./Modal";
import CategoryInput from "../inputs/CategoryInput";
import { useRentModal } from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import Map from "../Map";
import { categories } from "../navbar/Categories";
import { useForm, FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
export default function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((step) => step - 1);
  };
  const onNext = () => {
    setStep((step) => step + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "NEXT";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "BACK";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <Heading
        subtitle="Pick a category"
        title="Which of this best described your place"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((cat) => {
          return (
            <div key={cat.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === cat.label}
                label={cat.label}
                icon={cat.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
  if (step == STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        LocationStep
        <Heading
          title="Where is you place located"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latling} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some Basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter title="Number of guests" subtitle="How many guests" />
      </div>
    );
  }
  return (
    <div>
      <Modal
        // disabled={isLoading}
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        title="Airbnb your home!"
        actionLabel={actionLabel}
        onSubmit={onNext}
        // onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
      />
    </div>
  );
}
