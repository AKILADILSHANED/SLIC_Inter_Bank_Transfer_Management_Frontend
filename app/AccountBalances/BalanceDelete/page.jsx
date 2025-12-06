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
  const [showTransferIdsSpinner, setShowTransferIdsSpinner] = useState(false);
  const [transferDataTable, setTransferDataTable] = useState(false);
  const [transferIdList, setTransferIdList] = useState([]);

  //Define handleSearch function;
  const handleSearch = async () => {
    setErrorMessage("");
    setSucceessMessage("");
    setBalanceDisplayWindow(false);
    setTransferDataTable(false);
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
      if (request.status === 200) {
        const response = await request.json();
        setSucceessMessage(response.message);
        setBalanceDisplayWindow(false);

      } else if (request.status === 409) {
        const response = await request.json();
        setErrorMessage(response.message);

      } else if (request.status === 404) {
        const response = await request.json();
        setErrorMessage(response.message);
      }
      else if (request.status === 500) {
        const response = await request.json();
        setErrorMessage(response.message);
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

  //Define getRelatedTransfers function;
  const getRelatedTransfers = async () => {
    setTransferDataTable(false);
    setShowTransferIdsSpinner(true);
    setErrorMessage(false);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/account-balance/get-transferId-list?balanceId=${balanceData.balanceId}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      if (request.status === 200) {
        const response = await request.json();
        setTransferIdList(response.responseObject);
        setTransferDataTable(true);
      } else if(request.status === 409) {
        const response = await request.json();
        setErrorMessage(response.message);
      }else{
        const response = await request.json();
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!!!"
      );
    } finally {
      setShowTransferIdsSpinner(false);
    }
  }

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
              Please check balance details before confirm the deletion
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
                        {balanceData.balanceDate}
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
          <div className="flex flex-row">
            <button
              onClick={() => onCancel()}
              type="button"
              className="text-white ml-2 mt-3 h-[32px] flex flex-row items-center bg-red-700 hover:bg-red-600 outline-none focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Cancel
            </button>

            <button
              onClick={() => getRelatedTransfers()}
              type="button"
              className="text-white ml-2 mt-3 h-[32px] flex flex-row items-center bg-blue-700 hover:bg-blue-600 outline-none focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
              {showTransferIdsSpinner && <Spinner size={20} />}
              <label className="ml-1">Show Transfer Ids</label>
            </button>
          </div>

          {
            transferDataTable && (
              <div className="max-w-2xl mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                {/* Card Header */}
                <div className="bg-gradient-to-r from-slate-500 to-slate-400 text-center border-b border-slate-500">
                  <h3 className="text-lg font-semibold text-white">
                    Available Transfer IDs for provided Balance ID | Showing {transferIdList.length} transfer{transferIdList.length !== 1 ? 's' : ''}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Transfer IDs
                    </h4>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {transferIdList.map((event) => (
                      <div
                        key={event}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 group"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors flex-shrink-0"></div>
                        <span className="font-medium text-slate-800 group-hover:text-slate-900 break-all">
                          {event}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}
