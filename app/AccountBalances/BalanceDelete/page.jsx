"use client";
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function DeleteBalance({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables
  const [textBalanceId, setTextBalanceId] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucceessMessage] = useState("");
  const [balanceData, setBalanceData] = useState({});
  const [balanceDisplayWindow, setBalanceDisplayWindow] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);

  //Define handleSearch function;
  const handleSearch = async () => {
    setErrorMessage("");
    setSucceessMessage("");
    setBalanceDisplayWindow(false);
    if (textBalanceId == "") {
      setErrorMessage("Please provide a valid Balance ID!");
    } else {
      try {
        setSpinner(true);
        const request = await fetch(
          `${baseUrl}/api/v1/account-balance/balance-delete?balanceId=${encodeURIComponent(
            textBalanceId
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
            setBalanceData(response.responseObject);
            setBalanceDisplayWindow(true);
          }
        } else {
          setErrorMessage(
            "No response from server. Please contact administrator!"
          );
        }
      } catch (error) {
        setErrorMessage(
          "Un-expected error occurred. Please contact administrator!"
        );
      } finally {
        setSpinner(false);
      }
    }
  };

  //Define handle delete function;
  const handleDelete = async () => {
    setDeleteSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/account-balance/save-balance-delete?balanceId=${encodeURIComponent(
          balanceData.balanceId
        )}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          setSucceessMessage(response.message);
          setBalanceDisplayWindow(false);
        }
      } else {
        setErrorMessage(
          "No response from server. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    } finally {
      setDeleteSpinner(false);
    }
  };

  return (
    <div>
      <div className="h-[120px] w-full shadow-md">
        <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
          <label className="text-white text-lg ml-2 font-serif">
            Delete Account Balance
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
            value={textBalanceId.toUpperCase()}
            onChange={(e) => setTextBalanceId(e.target.value)}
            required
            placeholder="Enter Balance ID"
            id="small-input"
            className="block ml-2 w-[450px] p-1 px-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={() => handleSearch()}
            className="ml-2 w-[100px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-4xl h-[35px] flex flex-row items-center justify-center">
            {spinner && (
              <div className="mr-1">
                <Spinner size={20}></Spinner>
              </div>
            )}
            Search
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="mt-4">
          <SUccessMessage messageValue={successMessage} />
        </div>
      )}

      {errorMessage && (
        <div className="mt-4">
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}

      {balanceDisplayWindow && (
        <div className="mt-4 shadow-md h-[220px]">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg ml-2 font-serif">
              Balance Details for provided Balance ID
            </label>
          </div>
          <div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Balance ID
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Bank
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Account Number
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Balance Date
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50 text-right">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Balance
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50 text-right">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Outstanding Balance
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={balanceData.balanceId} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {balanceData.balanceId}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {balanceData.bank}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {balanceData.accountNumber}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {balanceData.accountNumber}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-right">
                      <p className="block text-sm text-slate-800">
                        {typeof balanceData.balanceAmount === "number"
                          ? balanceData.balanceAmount.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : balanceData.balanceAmount}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-right">
                      <p className="block text-sm text-slate-800">
                        {typeof balanceData.outstandingBalance === "number"
                          ? balanceData.outstandingBalance.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : balanceData.outstandingBalance}
                      </p>
                    </td>
                    <td
                      onClick={() => handleDelete()}
                      className="p-4 border-b border-slate-200">
                      <button className="bg-red-700 text-white w-[90px] rounded-md h-[30px] hover:bg-red-600 flex flex-row items-center justify-center">
                        {deleteSpinner && <Spinner size={20} />}
                        <label className="ml-1">Delete</label>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <button
              onClick={() => onCancel()}
              type="button"
              className="text-white ml-2 mt-3 h-[32px] flex flex-row items-center bg-red-700 hover:bg-red-600 outline-none focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
