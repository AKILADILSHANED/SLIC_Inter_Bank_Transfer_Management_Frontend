"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";

export default function SearchAccount() {

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [errorMessage, setErrorMessage] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [accountDetailsWindow, setAccountDetailsWindow] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [loader, setLoader] = useState(false);

  //Define handle search function;
  const handleSearch = async () => {
    setErrorMessage(false);
    setAccountDetailsWindow(false);
    setLoader(false);
    if (!accountId) {
      setErrorMessage("Please provide valid Account ID!");
    } else {
      try {
        setLoader(true);
        const request = await fetch(
          `${baseUrl}/api/v1/bank-account/account-search?accountId=${encodeURIComponent(
            accountId
          )}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (request.ok) {
          const response = await request.json();
          if (response.success == false) {
            setErrorMessage(response.message);
          } else {
            setResponseData(response.responseObject);
            setAccountDetailsWindow(true);
          }
        } else {
          setErrorMessage(
            "No response from server. Please contact administrator!"
          );
        }
      } catch (error) {
        setErrorMessage(
          "Un-expected error occurred while fetching account data. Please contact administrator!"
        );
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <div className="mt-4 shadow-md h-[120px]">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Search Account Details
          </label>
        </div>

        <div className="flex flex-row mt-5">
          <label
            htmlFor="small"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
            Account ID:
          </label>
          <input
            onChange={(e) => setAccountId(e.target.value.toUpperCase())}
            value={accountId.toUpperCase()}
            id="small"
            placeholder="Enter Bank Account ID"
            required
            className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          <div
            onClick={handleSearch}
            className="shadow-md border-none ml-2 h-[30px] w-[90px] items-center justify-center flex bg-blue-700 hover:bg-blue-800 rounded-md text-white">
            <button className="flex flex-row">
              {loader && <Spinner size={20} />}
              Search
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-2">
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}
      {accountDetailsWindow && (
        <div className="shadow-md mt-4 h-[150px]">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg font-serif ml-2">
              Account Details for provided Account ID
            </label>
          </div>

          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max mt-4">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Account ID
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Bank
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Bank Branch
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Account Number
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Account Type
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Currency
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      GL Code
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Registered Date
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Registered By
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key={responseData.accountId} className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.accountId}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.bankName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.bankBranch}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.accountNumber}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.accountType}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.currency}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.glCode}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.registeredDate}
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      {responseData.registeredBy}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
