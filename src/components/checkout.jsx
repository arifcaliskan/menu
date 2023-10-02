import React from "react";
import Navbar from "./Navbar";
import foodready from "../assets/foodready.gif";
const checkout = () => {
  return (
    <div className="bg-zinc-400 ">
      <Navbar />
      <div className="w-screen h-screen flex justify-center flex-col">
        <div className="mx-auto">
          <p className="text-emerald-600">Thank you for your Purchase</p>
          <p>Your food will arrive soon.</p>
          <p>Enjoy</p>
          <img src={foodready} className="w-48 mx-auto" alt="Food ready" />
        </div>
      </div>
    </div>
  );
};

export default checkout;
