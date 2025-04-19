"use client";
import React from "react";
import { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function NewRequest() {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;

  const [loadAccounts, setLoadAccounts] = useState("Load Accounts");
  const [accountLoadingSpinner, setAccountLoadingSpinner] = useState(false);
  const [requestSaveSpinner, setRequestSaveSpinner] = useState(false);
  const [loadPayments, setLoadPayments] = useState("Load Payments");
  const [paymentLoadingSpinner, setPaymentLoadingSpinner] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [bankAccount, setBankAccount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [requestType, setRequestType] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //Define loadBankAccounts function;
  const loadBankAccounts = async () => {
    try {
      setAccountLoadingSpinner(true);
      const request = await fetch(
        `${baseUrl}/api/v1/bank-account/getBankAccounts`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setLoadAccounts(response.success);
        } else {
          setAccountList(response.responseObject);
          setLoadAccounts("");
        }
      } else {
        setLoadAccounts("No response from server!");
      }
    } catch (error) {
      setLoadAccounts("Un-expected error occurred!");
    } finally {
      setAccountLoadingSpinner(false);
    }
  };

  //Define loadPayments function;
  const loadPaymentList = async () => {
    try {
      setPaymentLoadingSpinner(true);
      const request = await fetch(`${baseUrl}/api/v1/payment/getPaymentList`, {
        method: "GET",
        credentials: "include",
      });
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setLoadPayments(response.success);
        } else {
          setPaymentList(response.responseObject);
          setLoadPayments("");
        }
      } else {
        setLoadPayments("No response from server!");
      }
    } catch (error) {
      setLoadPayments("Un-expected error occurred!");
    } finally {
      setPaymentLoadingSpinner(false);
    }
  };

  //Define handleSubmit function;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setRequestSaveSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/new-request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: bankAccount,
            paymentId: paymentType,
            requestAmount: requestAmount,
            requestType: requestType,
            requiredDate: selectedDate,
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
        alert(error.message);
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    } finally {
      setRequestSaveSpinner(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Provide Fund Request Details
          </label>
        </div>

        <form>
          <div className="flex flex-col shadow-md h-[290px]">
            <div className="flex flex-row items-center gap-15 mt-6 ml-2">
              <div>
                <label
                  htmlFor="small"
                  className="mb-2 flex flex-row text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Bank Account:
                  <label
                    onClick={() => loadBankAccounts()}
                    className="underline text-blue-600 ml-4 hover:text-red-600 mr-2">
                    {loadAccounts}
                  </label>
                  {accountLoadingSpinner && <Spinner size={20} />}
                </label>
                <select
                  id="small"
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="Enter Payment Name"
                  required
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option key={0} value={""}>
                    - Select Bank Account -
                  </option>
                  {accountList.map((element) => {
                    return (
                      <option key={element.accountId} value={element.accountId}>
                        {element.accountNumber}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  htmlFor="small"
                  className="flex flex-row mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Payment:
                  <label
                    onClick={() => loadPaymentList()}
                    className="underline text-blue-600 ml-4 hover:text-red-600 mr-2">
                    {loadPayments}
                  </label>
                  {paymentLoadingSpinner && <Spinner size={20} />}
                </label>
                <select
                  id="small"
                  placeholder="Enter Payment Name"
                  onChange={(e) => setPaymentType(e.target.value)}
                  required
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option key={0} value={""}>
                    - Select Payment Type -
                  </option>
                  {paymentList.map((element) => {
                    return (
                      <option key={element.paymentId} value={element.paymentId}>
                        {element.paymentType}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex flex-row items-center gap-15 mt-4 ml-2">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Amount:
                </label>
                <input
                  id="small"
                  type="number"
                  onChange={(e) => setRequestAmount(e.target.value)}
                  placeholder="Enter Request Amount"
                  required
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Type:
                </label>
                <select
                  id="small"
                  placeholder="Enter Payment Name"
                  onChange={(e) => setRequestType(e.target.value)}
                  required
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value={""}>- Select Request Type -</option>
                  <option value={0}>Actual Fund Request</option>
                  <option value={1}>Forecasted Fund Request</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row items-center gap-15 mt-4 ml-2">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Fund Required Date:
                </label>
                <input
                  type="date"
                  required
                  id="small"
                  defaultValue={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="Enter Request Amount"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
            </div>

            <button
              type="submit"
              onClick={(e)=>handleSubmit(e)}
              className="border flex flex-row ml-4 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
              {requestSaveSpinner && <Spinner size={20} />}
              <label>Save</label>
            </button>
          </div>
        </form>
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
      </div>
    </div>
  );
}
