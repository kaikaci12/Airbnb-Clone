"use client";
import React, { useCallback, useMemo } from "react";
import { ListingType } from "@/models/Listing";
import { ReservationType } from "@/models/Reservation";
import { UserType } from "@/models/User";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";

import { format } from "date-fns";
interface ListingCardProps {
  data: ListingType;
  reservation?: ReservationType;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: UserType | null;
}
export default function ListingCard({
  data,
  reservation,
  onAction,
  actionId,
  actionLabel,
  currentUser,
}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      className="col-span-1  cursor-pointer group "
      onClick={() => router.push(`/listings/${data._id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden  rounded-xl ">
          <Image
            alt="listings"
            src={data.imageSrc}
            className="object-cover h-full w-full group hover:scale-110 transition"
            fill
          />
          <div className="absolute top-3 right-3 ">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
