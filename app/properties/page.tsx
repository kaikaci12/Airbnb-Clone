import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import TripsClient from "./TripsClient";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    userId: currentUser?._id,
  });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unothorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties Found"
          subtitle="Looks like you haven't reserved any Properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default PropertiesPage;
