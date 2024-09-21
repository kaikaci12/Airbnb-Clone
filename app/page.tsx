import ClientOnly from "./components/ClientOnly";
import Container from "@/app/components/Container";
import getListings from "./actions/getListings";
import { ListingType } from "@/models/Listing";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import EmptyState from "./components/EmptyState";
export default async function Home() {
  const isEmpty = true;
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (isEmpty) {
    <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>;
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 gird grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing: ListingType) => {
            return <ListingCard key={listing._id} currentUser />;
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
