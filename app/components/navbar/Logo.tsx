"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function Logo() {
  // const router = useRouter();

  return (
    <div className="">
      <Image
        alt="logo"
        className=" hidden md:block cursor-pointer"
        width="100"
        height="100"
        src="/images/logo.png"
      ></Image>
    </div>
  );
}
