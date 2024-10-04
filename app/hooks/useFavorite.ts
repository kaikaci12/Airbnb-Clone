import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { UserType } from "@/models/User";
import { useLoginModal } from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser: UserType | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // Check if the current user has favorited the listing
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen(); // Open login modal if user is not logged in
      }
      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          // Add to favorites
          await axios.post(`/api/favorites/${listingId}`);
        }
        router.refresh(); // Refresh the router to update the UI
        toast.success("Success"); // Show success message
      } catch (error) {
        toast.error("Something Went Wrong"); // Show error message
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
