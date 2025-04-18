"use client";
import React, { useState } from "react";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function DeletePayment({ onCancel }) {
  //Define Base URL;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [textPaymentId, setTextPaymentId] = useState("");
  const [textPaymentType, setTextPaymentType] = useState("");
  const [spinnerSearch, setSpinnerSearch] = useState(false);
  const [spinnerDelete, setSpinnerDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [paymentDetailsWindow, setPaymentDetailsWindow] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  //Define handleSearchFunction;
  const handleSearch = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setPaymentDetailsWindow(false);
    if (textPaymentId == "") {
      setErrorMessage("Please provide a Payment ID!");
    } else {
      try {
        setSpinnerSearch(true);
        const request = await fetch(
          `${baseUrl}/api/v1/payment/payment-search?paymentId=${encodeURIComponent(
            textPaymentId
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
            setPaymentData(response.responseObject);
            setTextPaymentType(response.responseObject.paymentType);
            setPaymentDetailsWindow(true);
          }
        } else {
          setErrorMessage(
            "No response from server. Please contact administrator!"
          );
        }
      } catch (error) {
        setErrorMessage(
          "Un-expected eror occurred. Please contact administrator!"
        );
      } finally {
        setSpinnerSearch(false);
      }
    }
  };

  //Define handleDelete function;
  const handleDelete = async () => {
    try {
      setSpinnerDelete(true);
      const request = await fetch(
        `${baseUrl}/api/v1/payment/payment-delete?paymentId=${encodeURIComponent(paymentData.paymentId)}`,
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
      <div className="flex flex-col mt-4">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Delete Payment Details
          </label>
        </div>

        <div className="flex flex-row items-center shadow-md h-[80px]">
          <label
            htmlFor="small"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
            Payment ID:
          </label>
          <input
            onChange={(e) => setTextPaymentId(e.target.value)}
            value={textPaymentId.toUpperCase()}
            id="small"
            placeholder="Enter Payment ID"
            required
            className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          <button
            onClick={() => handleSearch()}
            type="button"
            className="border flex flex-row ml-2 h-[32px] items-center justify-center w-[100px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
            {spinnerSearch && <Spinner size={20}></Spinner>}
            <label className="ml-1">Search</label>
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

      {paymentDetailsWindow && (
        <div className="mt-5 shadow-md h-[250px] w-full">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg font-serif ml-2">
              Please check Payment details before confirm deletion
            </label>
          </div>

          <div className="flex flex-row items-center mt-5">
            <div>
              <label readOnly className="ml-2 text-sm">
                Payment ID:
              </label>
              <input
                type="text"
                value={paymentData.paymentId}
                readOnly
                className="outline-none text-sm block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="ml-2 text-sm">Payment Type:</label>
              <input
                readOnly
                value={textPaymentType}
                type="text"
                className="outline-none text-sm block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div readOnly className="flex flex-row items-center mt-4">
            <div>
              <label className="ml-2 text-sm">Registered Date:</label>
              <input
                type="text"
                value={paymentData.registeredDate}
                readOnly
                className="outline-none text-sm block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label className="ml-2 text-sm">Registered By:</label>
              <input
                type="text"
                value={paymentData.registeredBy}
                readOnly
                className="outline-none text-sm block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-row items-center mt-4">
            <button
              onClick={() => handleDelete()}
              type="Submit"
              className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[90px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
              {spinnerDelete && <Spinner size={20}></Spinner>}
              <label className="ml-1">Delete</label>
            </button>
            <button
              onClick={() => onCancel()}
              type="button"
              className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[90px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
              <label className="ml-1">Cancel</label>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
