"use client";
import { UserType } from "@/models/User";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface HeartButtonProps {
  listingId?: string;
  currentUser?: UserType | null;
}
export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={29}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
