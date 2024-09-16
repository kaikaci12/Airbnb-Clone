"use client";
import React from "react";
import { IconType } from "react-icons";
interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}
export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
    ${selected ? "border-black" : "border-neutral-200"}
    `}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className="font-semibold "></div>
    </div>
  );
}
