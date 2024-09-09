"use client";
import { useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  footer?: string;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  footer,
  disabled,
  secondaryAction,
  secondaryLabel,
}: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  return <div></div>;
}
