"use client";

import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}
import React from "react";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientOnly";

function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ClientOnly>
      <EmptyState title="Uh Oh" subtitle="Something went wrong" />;
    </ClientOnly>
  );
}

export default ErrorState;
