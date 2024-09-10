"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import MenuItem from "./MenuItem";
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 ">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4  rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb Your Home
        </div>
        <div
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className="p-4 md:py-1 md:px-4 border-[1px] border-neutral-200 flex flex-row items-center  gap-3 rounded-full  cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[15vw] bg-white overflow-hidden top-12 right-0 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}
