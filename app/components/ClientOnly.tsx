"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaDivide } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

function ClientOnly({ children }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default ClientOnly;
