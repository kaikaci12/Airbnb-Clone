import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?._id });
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default ReservationsPage;
