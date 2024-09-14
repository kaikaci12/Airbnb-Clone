"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

// import { SafeUser } from "@/app/types";
import { UserType } from "@/models/User";

interface NavbarProps {
  currentUser?: UserType;
}
function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed w-full  bg-white shadow-sm ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex  items-center  justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
