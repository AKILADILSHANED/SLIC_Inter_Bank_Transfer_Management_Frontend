"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function EnterBalance() {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [displayTable, setDisplayTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [accountObject, setAccountObject] = useState([{}]);
  const [balances, setBalances] = useState({}); // Store balances for each account

  const handleChange = (e, accountId) => {
    const value = e.target.value;

    // Allow: empty, numbers, negative numbers (minus only at start), and decimal numbers
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setBalances(prev => ({
        ...prev,
        [accountId]: value
      }));
    }
  };

  const handleKeyDown = (e) => {
    // Allow: Backspace, Delete, Tab, Escape, Enter
    if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) ||
      // Allow: Home, End, Left, Right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }

    // Allow minus sign only at the beginning
    if ((e.key === '-' || e.keyCode === 189) && e.target.selectionStart === 0) {
      // Check if minus sign already exists
      if (!e.target.value.includes('-')) {
        return;
      }
    }

    // Allow decimal point (only one)
    if (e.key === '.' || e.keyCode === 190) {
      if (!e.target.value.includes('.')) {
        return;
      }
    }

    // Allow numbers (both main keyboard and numpad)
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      return;
    }

    // Prevent any other key
    e.preventDefault();
  };

  //Define displayTable function;
  const handleDisplayAccount = async () => {
    try {
      setSpinner(true);
      setDisplayTable(false);
      setErrorMessage(false);
      setSuccessMessage(false);

      const request = await fetch(
        `${baseUrl}/api/v1/account-balance/get-accounts`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          setAccountObject(response.responseObject);
          setDisplayTable(true);
        }
      } else {
        setErrorMessage(
          "No response from server. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        error + "Un-expected error occurred. Please contact administrator!"
      );
    } finally {
      setSpinner(false);
    }
  };

  //Define balance saving function;
  const handleSave = async (accountId) => {
    setErrorMessage(false);
    setSuccessMessage(false);
    
    const balanceAmount = balances[accountId];
    
    if (!balanceAmount || balanceAmount === '' || balanceAmount == 0) {
      setErrorMessage("Please provide Account Balance!");
      return;
    }

    try {
      const request = await fetch(
        `${baseUrl}/api/v1/account-balance/save-balance?accountId=${encodeURIComponent(
          accountId
        )}&balanceAmount=${encodeURIComponent(balanceAmount)}`,
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
          setSuccessMessage(response.message);
          // Clear the balance for this account after successful save
          setBalances(prev => {
            const newBalances = { ...prev };
            delete newBalances[accountId];
            return newBalances;
          });
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
      await handleDisplayAccount();
    }
  };

  return (
    <div>
      <div className="bg-red-800 h-[30px] flex flex-row items-center">
        <label className="text-white ml-3 text-lg font-serif">
          Enter balances for below Bank Accounts
        </label>
      </div>
      <div className="ml-3 mt-4 flex flex-row items-center">
        <label
          onClick={handleDisplayAccount}
          className="hover:underline text-blue-600 mr-4">
          Display all accounts
        </label>
        {spinner && (
          <div>
            <Spinner size={24} />
          </div>
        )}
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

      {displayTable && (
        <div>
          <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col className="w-24" />
                </colgroup>
                <thead className="dark:bg-gray-300">
                  <tr className="text-left">
                    <th className="p-3">Account ID</th>
                    <th className="p-3">Bank</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Account Number</th>
                    <th className="p-3">Account Balance</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accountObject.map((element) => (
                    <tr
                      key={element.accountId}
                      className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50 hover:text-blue-800 hover:bg-slate-50">
                      <td key={element.accountId} className="p-3">
                        <p>{element.accountId}</p>
                      </td>
                      <td className="p-3">
                        <p>{element.bankName}</p>
                      </td>
                      <td className="p-3">
                        <p>{element.bankBranch}</p>
                      </td>
                      <td className="p-3">
                        <p>{element.accountNumber}</p>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={balances[element.accountId] || ''}
                          onChange={(e) => handleChange(e, element.accountId)}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter Account Balance"
                          className="border px-2 border-blue-600 text-black rounded-md outline-none h-[30px]"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleSave(element.accountId)}
                          data-ripple-light="true"
                          className="rounded-md px-3 h-[30px] bg-slate-800 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                          type="button">
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}