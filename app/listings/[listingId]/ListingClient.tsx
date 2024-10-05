"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import Reservation, { ReservationType } from "@/models/Reservation";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { SafeListing, SafeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingReservation from "@/app/components/listings/ListingReservation";

import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
interface ListingClientProps {
  reservation: ReservationType[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
export default function ListingClient({
  reservation = [],
  listing,
  currentUser,
}: ListingClientProps) {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen();
      setIsLoading(true);
    }
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?._id,
      })
      .then(() => {
        toast.success("Listing Reserved!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
        setIsLoading(false);
      });
  }, [totalPrice, currentUser, router, loginModal, listing?._id, dateRange]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);
  const category = useMemo(() => {
    return categories.find((item) => item.label == listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing._id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
