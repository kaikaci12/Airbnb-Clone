"use client";
import { PuffLoader } from "react-spinners";
function Loader() {
  return (
    <div className="h-[70-vh] flex flex-col justify-center items-center ">
      <PuffLoader size={100} color="red" />
    </div>
  );
}

export default Loader;
