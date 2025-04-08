"use client";
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";

export default function UpdateBalance() {
  //Define State variables;
  const [textBalanceId, setTextBalanceId] = useState("");
  return (
    <div>
      <div className="h-[120px] w-full shadow-md">
        <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
          <label className="text-white text-lg ml-2 font-serif">
            Update Account Balance
          </label>
        </div>
        <div className="flex flex-row items-center mt-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
            Balance Id:
          </label>
          <input
            type="text"
            onChange={(e)=>setTextBalanceId(e.target.value)}
            value={textBalanceId.toUpperCase()}
            required
            placeholder="Enter Balance ID"
            id="small-input"
            className="block ml-2 w-[450px] p-1 px-2 outline-blue-300 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button className="ml-2 w-[100px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-4xl h-[35px] flex flex-row items-center justify-center">
            <div className="mr-1">
              <Spinner size={20}></Spinner>
            </div>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
