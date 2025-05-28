"use client"
import React, { use, useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function DeleteRequest({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [searchSpinner, setSearchSpinner] = useState(false);
  const [searchedRequestId, setSearchedRequestId] = useState("");
  const [searchedRequestType, setSearchedRequestType] = useState("");
  const [updateSpinner, setUpdateSpinner] = useState(false);
  const [successMessage, SetSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [fundRequestData, setfundRequestData] = useState({});
  const [requestDetailsWindow, setrequestDetailsWindow] =
    useState(false);
  

  //Define handleSearch function;
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchSpinner(true);
    SetSuccessMessage(false);
    setErrorMessage(false);
    setrequestDetailsWindow(false);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/delete-request?requestId=${encodeURIComponent(
          searchedRequestId
        )}&requestType=${encodeURIComponent(searchedRequestType)}`,
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
          setrequestDetailsWindow(true);
          setfundRequestData(response.responseObject);
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

  //Define handleDelete function;
  const handleDelete = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    SetSuccessMessage(false);
    setUpdateSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/save-requestDelete?requestId=${encodeURIComponent(fundRequestData.requestId)}&requestType=${encodeURIComponent(fundRequestData.requestType)}`,
        {
          method:"PUT",
          credentials:"include"
        }
      );
      if(request.ok){
        const response = await request.json();
        if(response.success == false){
          setErrorMessage(response.message);
        }else{
          SetSuccessMessage(response.message);
        }
      }else{
        setErrorMessage("No response from server. Please contact administrator!");
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    } finally {
      setUpdateSpinner(false);
    }
  };

  return (
    <div>
      <div className="bg-red-800 h-[30px] flex flex-row items-center mt-4">
        <label className="text-white ml-3 text-lg font-serif">
          Delete Fund Request Details
        </label>
      </div>
      <form onSubmit={(e) => handleSearch(e)}>
        <div className="flex flex-col shadow-md h-[130px]">
          <div className="flex flex-row items-center gap-10 mt-4 ml-2">
            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Fund Request ID:
              </label>
              <input
                type="text"
                value={searchedRequestId}
                onChange={(e) => setSearchedRequestId(e.target.value)}
                placeholder="Enter Fund Request ID"
                required
                id="small"
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
                onChange={(e) => setSearchedRequestType(e.target.value)}
                value={searchedRequestType}
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

      {successMessage && (
        <div>
          <SUccessMessage messageValue={successMessage} />
        </div>
      )}
      {errorMessage && (
        <div>
          <ErrorMessage messageValue={errorMessage} />
        </div>
      )}

      {requestDetailsWindow && (
        <form className="mt-4" onSubmit={(e) => handleDelete(e)}>
          <div className="bg-slate-600 h-[30px] flex flex-row items-center">
              <label className="text-white text-lg ml-2 font-serif">
                Fund Request details for provided Request ID
              </label>
            </div>
          <div className="relative overflow-x-auto mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Account Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Request Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Request Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Required Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {fundRequestData.requestId}
                  </th>
                  <td className="px-6 py-4">
                    {fundRequestData.accountNumber}
                  </td>
                  <td className="px-6 py-4">
                    {fundRequestData.paymentType}
                  </td>
                  <td className="px-6 py-4">
                    <p className="block text-sm text-slate-800 text-right">
                      {typeof fundRequestData.requestAmount === "number"
                        ? fundRequestData.requestAmount.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : fundRequestData.requestAmount}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {fundRequestData.requestDate}
                  </td>
                  <td className="px-6 py-4">
                    {fundRequestData.requiredDate}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="submit"
                      className="border w-[80px] h-[30px] flex flex-row items-center justify-center shadow-md shadow-slate-500 rounded-sm bg-red-600 border-red-600 hover:bg-red-500 text-white">
                      {updateSpinner && <Spinner size={20} />}
                      <label className="ml-1">Delete</label>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      )}
    </div>
  );
}
