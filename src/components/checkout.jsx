import React from "react";
import Navbar from "./Navbar";
import foodready from "../assets/foodready.gif";
const checkout = () => {
  return (
    <div className="bg-zinc-950 ">
      <Navbar />
      <div className="w-screen h-screen flex justify-center flex-col">
        <div className="mx-auto justify-center text-center text-emerald-600 bg-slate-900 border-separate border-1 border-green-500 px-24 py-12 rounded-xl text-2xl">
          <p className="">Thank you for your Purchase.</p>
          <p className="">Your food will arrive soon.</p>
          <p>Enjoy</p>
          <img src={foodready} className="w-96 md:w-64 mx-auto" alt="Food ready" />
          
        </div>
       
      </div>
    </div>
  );
};

export default checkout;
