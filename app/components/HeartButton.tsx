"use client";
import { UserType } from "@/models/User";
import React from "react";
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
  return <div className=""></div>;
}
