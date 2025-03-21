import React from "react";

export default function SearchUser() {
  return (
    <div>
      <div className="h-[120px] w-full shadow-md">
        <div className="bg-red-800 h-[30px]">
          <label className="text-white ml-2">Search User Details</label>
        </div>
        <div className="flex flex-row items-center mt-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-8">
            User Id:
          </label>
          <input
            type="text"
            required
            placeholder="Enter User Name"
            id="small-input"
            className="block ml-2 w-[450px] p-1 px-2 outline-blue-300 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button className="ml-2 w-[80px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-md h-[30px]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
