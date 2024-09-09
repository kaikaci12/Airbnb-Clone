"use client";
import React from "react";
interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 sm:px-2 px-4">
      {children}
    </div>
  );
}
