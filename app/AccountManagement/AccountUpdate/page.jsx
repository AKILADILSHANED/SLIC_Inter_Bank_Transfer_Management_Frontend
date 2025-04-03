import React from "react";

export default function UpdateAccount({onCancel}) {
  return (
    <div>
      <div className="mt-4 shadow-md h-[120px]">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Update Account Details
          </label>
        </div>

        <div className="flex flex-row mt-5">
          <label
            htmlFor="small"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
            Account ID:
          </label>
          <input
            id="small"
            placeholder="Enter Bank Account ID"
            required
            className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          <div className="shadow-md border-none ml-2 h-[30px] w-[70px] items-center justify-center flex bg-blue-700 hover:bg-blue-800 rounded-md text-white">
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}
