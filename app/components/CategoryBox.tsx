import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import qs from "query-string";
import { IconType } from "react-icons";
import { query } from "express";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  description: string;
  selected: boolean;
}
export default function CategoryBox({
  icon: Icon,
  label,
  description,
  selected,
}: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  }, [label, router, params]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={26}></Icon>
      <div className="font-medium text-sm ">{label}</div>
    </div>
  );
}
