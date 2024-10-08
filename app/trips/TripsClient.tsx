"use client";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import ListingCard from "../components/listings/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsClientProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}
const TripsClient = ({ currentUser, reservations }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  console.log(reservations);
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((e) => {
          toast.error(e.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation._id}
            data={reservation.listingId}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
