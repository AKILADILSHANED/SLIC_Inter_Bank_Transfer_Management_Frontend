"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";

export default function DisplayBalance() {
  //Define states;
  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [accountBalanceTable, setAccountBalanceTable] = useState(false);
  const [balancesObject, setBalancesObject] = useState([{}]);

  //Base URL;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define getBalance function;
  const getBalances = async () => {
    setErrorMessage("");
    setAccountBalanceTable(false);
    setSpinner(false);
    if (selectedDate == null) {
      setErrorMessage("Please select a date first!");
    } else {
      try {
        setSpinner(true);
        const request = await fetch(
          `${baseUrl}/api/v1/account-balance/get-balances?balanceDate=${encodeURIComponent(
            selectedDate
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
            setBalancesObject(response.responseObject);
            setAccountBalanceTable(true);
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

  return (
    <div>
      <div className="shadow-md h-[100px]">
        <div className="bg-red-800 h-[30px] flex flex-row items-center mt-4">
          <label className="text-white ml-3 text-lg font-serif">
            Display Account Balances
          </label>
        </div>

        <div className="flex flex-row items-center mt-4 ml-2">
          <div className="ml-2">
            <label>Pick a date: </label>
          </div>
          <div>
            <input
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border ml-4 rounded border-blue-500 shadow-md w-[200px] h-[27px] px-2"
              type="date"
            />
          </div>
          <div>
            <button
              onClick={() => getBalances()}
              className="text-white flex flex-row items-center justify-center bg-blue-700 w-[90px] h-[27px] shadow-md border-none hover:bg-blue-600 ml-2 rounded">
              {spinner && <Spinner size={20} />}
              Submit
            </button>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-2">
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}
      {accountBalanceTable && (
        <div className="mt-5">
          <div className="w-full">
            <h3 className="text-lg font-semibold ml-3 text-slate-800">
              Available Account Balances
            </h3>
          </div>
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
                      Delete Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Deleted By
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Enter By
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {balancesObject.map((element) => {
                  const isDeleted = element.deleteStatus === "Deleted";

                  return (
                    <tr
                      key={element.balanceId}
                      className={`hover:bg-slate-50 ${isDeleted ? "bg-red-50" : ""}`}
                    >
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.balanceId}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.bank}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.accountNumber}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.balanceDate}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"} text-right`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {typeof element.balanceAmount === "number"
                            ? element.balanceAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            : element.balanceAmount}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.deleteStatus}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.deletedBy}
                        </p>
                      </td>
                      <td className={`p-4 border-b ${isDeleted ? "border-red-200" : "border-slate-200"}`}>
                        <p className={`block text-sm ${isDeleted ? "text-red-800" : "text-slate-800"}`}>
                          {element.enteredBy}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
