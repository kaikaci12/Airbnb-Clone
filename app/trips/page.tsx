import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
export const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({
    userId: currentUser?._id,
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unothorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found"
          subtitle="Looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};
