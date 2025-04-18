"use client"
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function PaymentRegister({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [textPaymentType, setTextPaymentType] = useState("");
  const [spinnerSearch, setSpinnerSearch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentData, setPaymentData] = useState({});
  const [paymentRegisterDataWindow, setPaymentRegisterDataWindow] =
    useState(false);

  //Define handleRegister function;
  const handleRegister = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setPaymentRegisterDataWindow(false);
    if (textPaymentType == "") {
      setErrorMessage("Please provide a Payment Name!");
    } else {
      try {
        setSpinnerSearch(true);
        const request = await fetch(
          `${baseUrl}/api/v1/payment/registerPayment?paymentType=${encodeURIComponent(
            textPaymentType
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
            setPaymentData(response.responseObject);
            setPaymentRegisterDataWindow(true);
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
        setSpinnerSearch(false);
        setTextPaymentType("");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Provide Payment Details
          </label>
        </div>

        <div className="flex flex-row items-center shadow-md h-[80px]">
          <label
            htmlFor="small"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
            Payment Type:
          </label>
          <input
            onChange={(e) => setTextPaymentType(e.target.value)}
            value={textPaymentType}
            id="small"
            placeholder="Enter Payment Name"
            required
            className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          <button
            onClick={() => handleRegister()}
            type="button"
            className="border flex flex-row ml-2 h-[32px] items-center justify-center w-[100px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
            {spinnerSearch && <Spinner size={20}></Spinner>}
            <label className="ml-1">Register</label>
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

      {paymentRegisterDataWindow && (
        <div className="mt-5">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg font-serif ml-2">
              Payment registration details
            </label>
          </div>

          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Payment ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Registered Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Registered By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{paymentData.paymentId}</td>
                    <td className="px-6 py-4">{paymentData.paymentType}</td>
                    <td className="px-6 py-4">{paymentData.registeredDate}</td>
                    <td className="px-6 py-4">{paymentData.registeredBy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            onClick={() => onCancel()}
            className="bg-red-700 text-white w-[70px] h-[30px] flex items-center justify-center shadow-md rounded-md ml-2 mt-2 hover:bg-red-600">
            <button>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
