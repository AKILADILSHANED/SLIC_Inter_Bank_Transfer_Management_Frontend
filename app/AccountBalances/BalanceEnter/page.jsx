"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function EnterBalance() {
  //Define state variables;
  const [displayTable, setDisplayTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [accountObject, setAccountObject] = useState([{}]);
  const [balance, setBalance] = useState("");

  const handleKeyDown = (e) => {
    // Allow: Backspace, Delete, Tab, Arrow Keys
    if (
      ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(
        e.key
      ) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key)) ||
      // Allow: Numbers (0-9) and a single decimal point (.)
      /^[0-9.]$/.test(e.key)
    ) {
      // Prevent multiple decimal points
      if (e.key === "." && balance.includes(".")) {
        e.preventDefault();
      }
      return; // Allow the key
    }
    e.preventDefault(); // Block everything else
  };

  const handleChange = (e) => {
    // Final sanitization (in case of paste or autofill)
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setBalance(sanitizedValue);
  };

  //Define displayTable function;
  const handleDisplayAccount = async () => {
    try {
      setSpinner(true);
      setDisplayTable(false);
      setErrorMessage(false);
      setSuccessMessage(false);

      const request = await fetch(
        "http://localhost:8080/api/v1/account-balance/get-accounts",
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
  const handleSave = async (accountId, balanceAmount) => {
    setErrorMessage(false);
    setSuccessMessage(false);
    if (balanceAmount == 0) {
      setErrorMessage("Please provide Account Balance!");
    } else {
      try {
        const request = await fetch(
          `http://localhost:8080/api/v1/account-balance/save-balance?accountId=${encodeURIComponent(
            accountId
          )}&balanceAmount=${encodeURIComponent(balance)}`,
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
        setBalance("");
        await handleDisplayAccount();
      }
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
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter Account Balance"
                          className="border px-2 border-blue-600 text-black rounded-md outline-none h-[30px]"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleSave(element.accountId, balance)}
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
