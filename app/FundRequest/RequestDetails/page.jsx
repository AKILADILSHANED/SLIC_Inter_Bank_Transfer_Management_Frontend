"use client";
import React from "react";
import { useState } from "react";
import Spinner from "@/app/Spinner/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function SearchRequest({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [requestType, setRequestType] = useState("");
  const [searchSpinner, setSearchSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [actualRequestDetailsWindow, setActualRequestDetailsWindow] =
    useState(false);
  const [forecastRequestDetailsWindow, setForecastRequestDetailsWindow] =
    useState(false);

  //Define handleSearch function;
  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    setActualRequestDetailsWindow(false);
    setForecastRequestDetailsWindow(false);
    try {
      setSearchSpinner(true);
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/get-fundRequest-details?requiredDate=${encodeURIComponent(
          selectedDate
        )}&requestType=${encodeURIComponent(requestType)}`,
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
          if (requestType == 0) {
            setRequestList(response.responseObject);
            setActualRequestDetailsWindow(true);
          } else {
            setRequestList(response.responseObject);
            setForecastRequestDetailsWindow(true);
          }
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
      setSearchSpinner(false);
    }
  };

  return (
    <div>
      <div className="bg-red-800 h-[30px] flex flex-row items-center mt-4">
        <label className="text-white ml-3 text-lg font-serif">
          Search Fund Request Details
        </label>
      </div>
      <form onSubmit={(e) => handleSearch(e)}>
        <div className="flex flex-col shadow-md h-[150px]">
          <div className="flex flex-row items-center gap-10 mt-4 ml-2">
            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Funds Required Date:
              </label>
              <input
                type="date"
                required
                id="small"
                defaultValue={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
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
                onChange={(e) => setRequestType(e.target.value)}
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={""}>- Select Request Type -</option>
                <option value={0}>Actual Fund Request</option>
                <option value={1}>Forecasted Fund Request</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <button
              type="submit"
              className="border flex flex-row ml-4 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
              {searchSpinner && <Spinner size={20} />}
              <label>View</label>
            </button>

            <button
              type="button"
              onClick={() => onCancel()}
              className="border flex flex-row ml-2 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
              <label>Cancel</label>
            </button>
          </div>
        </div>
      </form>
      {errorMessage && (
        <div>
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}

      {actualRequestDetailsWindow && (
        <div className="mt-4">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg ml-2 font-serif">
              List of Fund Request details
            </label>
          </div>
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request ID
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Account Number
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Payment Type
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request Amount
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 text-right">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Outstanding Amount
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 text-right">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request Date
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Required Date
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Approve Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Approved By
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Delete Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Delete By
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request By
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requestList.map((element) => (
                  <tr key={element.requestId} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestId}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.accountNumber}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.paymentType}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-right">
                      <p className="block text-sm text-slate-800">
                        {typeof element.requestAmount === "number"
                          ? element.requestAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : element.requestAmount}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-right">
                      <p className="block text-sm text-slate-800">
                        {typeof element.outstandingAmount === "number"
                          ? element.outstandingAmount.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : element.outstandingAmount}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestDate}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requiredDate}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.approveStatus}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.approvedBy}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.deleteStatus}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.deleted_by}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestedBy}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {forecastRequestDetailsWindow && (
        <div className="mt-4">
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
            <label className="text-white text-lg ml-2 font-serif">
              List of Fund Request details
            </label>
          </div>
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request ID
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Account Number
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Payment Type
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request Amount
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50 text-right">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request Date
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Required Date
                    </p>
                  </th>                  
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Delete Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Delete By
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-300 bg-slate-50">
                    <p className="block text-sm font-normal leading-none text-slate-500">
                      Request By
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requestList.map((element) => (
                  <tr key={element.requestId} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestId}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.accountNumber}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.paymentType}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-right">
                      <p className="block text-sm text-slate-800">
                        {typeof element.requestAmount === "number"
                          ? element.requestAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : element.requestAmount}
                      </p>
                    </td>                    
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestDate}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requiredDate}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.deleteStatus}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.deleted_by}
                      </p>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <p className="block text-sm text-slate-800">
                        {element.requestedBy}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
