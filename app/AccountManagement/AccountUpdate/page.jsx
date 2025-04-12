"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";

export default function UpdateAccount({ onCancel }) {

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [textAccountID, setTextAccountID] = useState("");
  const [accountDetailsWindow, setAccountDetailsWindow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinnerSearch, setSpinnerSearch] = useState(false);
  const [spinnerUpdate, setSpinnerUpdate] = useState(false);

  //Define states to holds values of account details;
  const [accountId, setAccountId] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [currency, setCurrency] = useState("");
  const [glCode, setGlCode] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [registerBy, setRegisterBy] = useState("");

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
            //Set values for each state;
            setAccountId(response.responseObject.accountId);
            setBank(response.responseObject.bankName);
            setBranch(response.responseObject.bankBranch);
            setAccountType(response.responseObject.accountType);
            setCurrency(response.responseObject.currency);
            setGlCode(response.responseObject.glCode);
            setAccountNumber(response.responseObject.accountNumber);
            setRegisterDate(response.responseObject.registeredDate);
            setRegisterBy(response.responseObject.registeredBy);
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

  //Define Update function;
  const handleUpdateAccount = async () => {
    setSpinnerUpdate(false);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      setSpinnerUpdate(true);
      const request = await fetch(
        `${baseUrl}/api/v1/bank-account/account-update`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountId: accountId,
            bankName: bank,
            bankBranch: branch,
            accountType: accountType,
            currency: currency,
            glCode: glCode,
            accountNumber: accountNumber,
          }),
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
        "Un-expected error occurred while updating account data. Please contact administrator!"
      );
    } finally {
      setSpinnerUpdate(false);
    }
  };

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
              Account Details for provided Account ID
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
                value={accountId}
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
                value={bank}
                onChange={(e) => setBank(e.target.value)}
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
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
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
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
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
                onChange={(e) => setAccountType(e.target.value)}
                value={accountType}
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
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
                onChange={(e) => setGlCode(e.target.value)}
                value={glCode}
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
                value={registerDate}
                type="text"
                readOnly
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
                value={registerBy}
                type="text"
                readOnly
                id="small-input"
                className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div onClick={handleUpdateAccount} className="flex flex-row">
            <button className="bg-green-700 ml-2 mt-3 text-white w-[120px] h-[30px] rounded-md hover:bg-green-600 flex flex-row items-center justify-center">
              {spinnerUpdate && <Spinner size={20} />}
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
              Update
            </button>
            <button
              onClick={() => onCancel()}
              className="bg-red-700 ml-2 mt-3 text-white w-[120px] h-[30px] rounded-md hover:bg-red-600 flex flex-row items-center justify-center">
              <svg
                className="w-6 h-6 text-white mr-1 dark:text-white"
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
