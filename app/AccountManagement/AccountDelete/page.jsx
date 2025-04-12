"use client";
import React from "react";
import { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function DeleteAccount({ onCancel }) {

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [textAccountID, setTextAccountID] = useState("");
  const [accountDetailsWindow, setAccountDetailsWindow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinnerSearch, setSpinnerSearch] = useState(false);
  const [spinnerDelete, setSpinnerDelete] = useState(false);
  const [accountData, setAccountData] = useState({});
 

  //Define search function;
  const handleSearch = async () => {
    setSpinnerSearch(true);
    setAccountDetailsWindow(false);
    setSuccessMessage("");
    setErrorMessage("");
    if (textAccountID == "") {
      setErrorMessage("Please provide valid Account ID!");
      setSpinnerSearch(false);
    } else {
      try {
        const request = await fetch(
          `${baseUrl}/api/v1/bank-account/account-searchForUpdate?accountId=${encodeURIComponent(
            textAccountID
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
            setAccountData(response.responseObject);
            setAccountDetailsWindow(true);
          }
        } else {
          setErrorMessage(
            "No response from server. Please contact administrator!"
          );
        }
      } catch (error) {
        setErrorMessage(
          error +
            ":" +
            " Un-expected error occurred while fetching account data. Please contact administrator!"
        );
      } finally {
        setSpinnerSearch(false);
      }
    }
  };

  //Define Delete function;
  const handleDeleteAccount = async () => {
    setSpinnerDelete(false);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      setSpinnerDelete(true);
      const request = await fetch(
        `${baseUrl}/api/v1/bank-account/account-delete?accountId=${encodeURIComponent(accountData.accountId)}`,
        {
          method: "PUT",
          credentials: "include",          
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          setSuccessMessage(response.message);
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
      setSpinnerDelete(false);
    }
  };

  return (
    <div>
      <div className="mt-4 shadow-md h-[120px]">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Delete Bank Account
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
            onChange={(e) => setTextAccountID(e.target.value.toUpperCase())}
            value={textAccountID.toUpperCase()}
            placeholder="Enter Bank Account ID"
            required
            className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          <div
            onClick={handleSearch}
            className="flex flex-row items-center justify-center shadow-md border-none ml-2 h-[30px] w-[90px] bg-blue-700 hover:bg-blue-800 rounded-md text-white">
            <button className="flex flex-row items-center justify-center">
              {spinnerSearch && <Spinner size={20} />}
              Search
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="mt-2">
          <SUccessMessage messageValue={successMessage} />
        </div>
      )}

      {errorMessage && (
        <div className="mt-2">
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}
      {accountDetailsWindow && (
        <div className="mt-4 shadow-md h-[430px]">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="ml-3 text-white text-lg font-serif">
              Please check Account details before confirm deletion
            </label>
          </div>

          <div className="flex flex-row">
            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Account ID:
              </label>
              <input
                type="text"
                readOnly
                value={accountData.accountId}
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bank:
              </label>
              <select
                readOnly
                value={accountData.bankName}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Amana Bank PLC">Amana Bank PLC</option>
                <option value="Bank of Ceylon">Bank of Ceylon</option>
                <option value="Bank of China Ltd">Bank of China Ltd</option>
                <option value="Cargills Bank PLC">Cargills Bank PLC</option>
                <option value="Citibank">Citibank</option>
                <option value="Commercial Bank of Ceylon PLC">
                  Commercial Bank of Ceylon PLC
                </option>
                <option value="Deutsche Bank">Deutsche Bank</option>
                <option value="DFCC Bank PLC">DFCC Bank PLC</option>
                <option value="Habib Bank Ltd">Habib Bank Ltd</option>
                <option value="Hatton National Bank PLC">
                  Hatton National Bank PLC
                </option>
                <option value="Indian Bank">Indian Bank</option>
                <option value="Indian Overseas Bank">
                  Indian Overseas Bank
                </option>
                <option value="MCB Bank Ltd">MCB Bank Ltd</option>
                <option value="National Development Bank PLC">
                  National Development Bank PLC
                </option>
                <option value="Nations Trust Bank PLC">
                  Nations Trust Bank PLC
                </option>
                <option value="Pan Asia Banking Corporation PLC">
                  Pan Asia Banking Corporation PLC
                </option>
                <option value="People's Bank">People's Bank</option>
                <option value="Public Bank Berhad">Public Bank Berhad</option>
                <option value="Sampath Bank PLC">Sampath Bank PLC</option>
                <option value="Seylan Bank PLC">Seylan Bank PLC</option>
                <option value="Standard Chartered Bank">
                  Standard Chartered Bank
                </option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="The Hongkong & Shanghai Banking Corporation Ltd (HSBC)">
                  The Hongkong & Shanghai Banking Corporation Ltd (HSBC)
                </option>
                <option value="Union Bank of Colombo PLC">
                  Union Bank of Colombo PLC
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bank Branch:
              </label>
              <input
                readOnly
                value={accountData.bankBranch}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Account Number:
              </label>
              <input
                readOnly
                value={accountData.accountNumber}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Account Type:
              </label>
              <select
                readOnly
                value={accountData.accountType}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={1}>Current Account</option>
                <option value={2}>Saving Account</option>
              </select>
            </div>

            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Currency:
              </label>
              <select
                readOnly
                value={accountData.currency}
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="LKR">LKR</option>
                <option value="AUD">AUD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="SGD">SGD</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                GL Code:
              </label>
              <input
                readOnly
                value={accountData.glCode}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Registered Date:
              </label>
              <input
                readOnly
                value={accountData.registeredDate}
                type="text"
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="ml-2 mt-3">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Registered By:
              </label>
              <input
                value={accountData.registeredBy}
                type="text"
                readOnly
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-700 ml-2 mt-3 shadow-md text-white w-[120px] h-[30px] rounded-md hover:bg-red-600 flex flex-row items-center justify-center">
              {spinnerDelete && <Spinner size={20} />}
              <svg
                className="w-6 h-6 text-white dark:text-white mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                />
              </svg>
              Delete
            </button>
            <button
              onClick={() => onCancel()}
              className="border border-slate-500 ml-2 mt-3 hover:shadow-md hover:border-blue-800 hover:text-blue-800 text-slate-500 w-[120px] h-[30px] rounded-md flex flex-row items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-500 mr-1 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
