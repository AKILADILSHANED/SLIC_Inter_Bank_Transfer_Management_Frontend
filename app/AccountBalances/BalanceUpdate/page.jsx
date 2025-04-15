"use client";
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function UpdateBalance({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define State variables;
  const [textBalanceId, setTextBalanceId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucceessMessage] = useState("");
  const [balanceDisplayWindow, setBalanceDisplayWindow] = useState();
  const [spinner, setSpinner] = useState(false);
  const [balanceData, setBalanceData] = useState({});
  const [saveSpinner, setSaveSpinner] = useState(false);

  //Defined state to send updating details to backend;
  const [balanceId, setBalanceId] = useState();
  const [balanceAmount, setBalanceAmount] = useState();
  const [outstandingAmount, setOutstandingAmount] = useState();
  const [actionState, setActionState] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState("");

  //Define handleSearch function;
  const handleSearch = async () => {
    setErrorMessage("");
    setSucceessMessage("");
    setSucceessMessage("");
    setSpinner(true);
    setBalanceDisplayWindow(false);
    if (textBalanceId == "") {
      setErrorMessage("Please provide a Balance ID!");
      setSpinner(false);
    } else {
      try {
        setSpinner(true);
        const request = await fetch(
          `${baseUrl}/api/v1/account-balance/balance-update?balanceId=${encodeURIComponent(
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
            setBalanceId(response.responseObject.balanceId);
            setBalanceAmount(response.responseObject.balanceAmount);
            setOutstandingAmount(response.responseObject.outstandingBalance);
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

  //Define handleSave function;
  const handleSave = async () => {
    setErrorMessage("");
    setSucceessMessage("");
    setSaveSpinner(false);
    if (!adjustmentAmount) {
      setErrorMessage("Please provide an Adjustment Amount!");
    } else if (actionState == "") {
      setErrorMessage("Please select an Adjustment Type!");
    } else {
      try {
        setSaveSpinner(true);
        const request = await fetch(
          `${baseUrl}/api/v1/account-balance/save-balance-update`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              balanceId: balanceId,
              balanceAmount: balanceAmount,
              outstandingBalance: outstandingAmount,
              action: actionState,
              adjustmentAmount: adjustmentAmount,
            }),
          }
        );
        if (request.ok) {
          const response = await request.json();
          if (response.success == false) {
            setErrorMessage(response.message);
          } else {
            setSucceessMessage(response.message);
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
        setSaveSpinner(false);
        setActionState("");
        setAdjustmentAmount("");
      }
    }
  };

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
            onChange={(e) => setTextBalanceId(e.target.value)}
            value={textBalanceId.toUpperCase()}
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

      {errorMessage && (
        <div className="mt-4">
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}
      {successMessage && (
        <div>
          <SUccessMessage messageValue={successMessage} />
        </div>
      )}

      {balanceDisplayWindow && (
        <div className="mt-4 shadow-md h-[240px]">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg ml-2 font-serif">
              Balance Details for provided Balance ID
            </label>
          </div>
          <div>
            <form>
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
                          Balance
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Outstanding Balance
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Action
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50 text-left">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Adjustment Amount
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50 text-left">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Save
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
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
                      <td className="p-4 border-b border-slate-200">
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
                      <td className="p-4 border-b border-slate-200">
                        <label className="sr-only">Underline select</label>
                        <select
                          id="underline_select"
                          onChange={(e) => setActionState(e.target.value)}
                          value={actionState}
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                          <option value="">- Select Adjustment Type -</option>
                          <option value="+">Add Balance (+)</option>
                          <option value="-">Deduct Balance (-)</option>
                        </select>
                      </td>
                      <td className="p-4 border-b border-slate-200 text-right">
                        <div>
                          <input
                            type="text"
                            onChange={(e) =>
                              setAdjustmentAmount(e.target.value)
                            }
                            value={adjustmentAmount}
                            placeholder="Enter Adjustment Amount"
                            id="small-input"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg outline-none bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200 text-left">
                        <button
                          onClick={() => handleSave()}
                          type="button"
                          className="flex flex-row items-center h-[30px] justify-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          {saveSpinner && <Spinner size={20} />}
                          <svg
                            className="w-6 h-6 mr-1 text-white dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 28 28">
                            <path
                              fillRule="evenodd"
                              d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M14 17h-4v-2h4v2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
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
