import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function UpdateRequest({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [searchSpinner, setSearchSpinner] = useState(false);
  const [updateSpinner, setUpdateSpinner] = useState(false);
  const [successMessage, SetSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});
  const [requestDetailsWindow, setRequestDetailsWindow] = useState(false);
  const [searchedRequestId, setSearchedRequestId] = useState("");
  const [searchedRequestType, setSearchedRequestType] = useState("");

  const [updatedAccountNumber, setUpdatedAccountNumber] = useState("");
  const [updatedPaymentType, setUpdatedPaymentType] = useState("");
  const [updatedAdjustmentType, setUpdatedAdjustmentType] = useState("");
  const [updatedAdjustmentAmount, setUpdatedAdjustmentAmount] = useState("");

  //Define handleSearch function;
  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    SetSuccessMessage(false);
    setRequestDetailsWindow(false);
    setRequestDetails(null);
    try {
      setSearchSpinner(true);
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/fundRequest-update?requestId=${encodeURIComponent(
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
          setRequestDetails(response.responseObject);
          setUpdatedAccountNumber(response.responseObject.accountId);
          setUpdatedPaymentType(response.responseObject.paymentId);
          setRequestDetailsWindow(true);
          setUpdatedAdjustmentType("");
          setUpdatedAdjustmentAmount("");
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

  //define handleKeyDown function; This will be restricted typing minus values in the text box;
  const handleKeyDown = (e) => {
    if (e.key === "-") {
      e.preventDefault();
    } else {
      //No code block to be run;
    }
  };

  //Define handleUpdate function;
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateSpinner(true);
    setErrorMessage(false);
    SetSuccessMessage(false);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/save-requestUpdate`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestId: requestDetails.requestId,
            accountId: updatedAccountNumber,
            requestAmount: requestDetails.requestAmount,
            outstandingAmount: requestDetails.outstandingAmount,
            paymentType: updatedPaymentType,
            adjustmentType: updatedAdjustmentType,
            adjustmentAmount: updatedAdjustmentAmount,
          }),
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          SetSuccessMessage(response.message);
          setUpdatedAdjustmentType("");
          setUpdatedAdjustmentAmount("");
        }
      } else {
        setErrorMessage(
          "No response from server. Please contact administrator!"
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    } finally {
      setUpdateSpinner(false);
      setUpdatedAdjustmentType("");
      setUpdatedAdjustmentAmount("");
    }
  };

  //Define number formating function. This function will formatted the number in comma separated;
  const formatAmount = (value) => {
    const number = parseFloat(value || 0);
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <div>
      <div className="bg-red-800 h-[30px] flex flex-row items-center mt-4">
        <label className="text-white ml-3 text-lg font-serif">
          Update Fund Request Details
        </label>
      </div>
      <form
        onSubmit={(e) => {
          handleSearch(e);
        }}>
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
        <form onSubmit={(e) => handleUpdate(e)}>
          <div className="mt-4 h-[334px] shadow-md">
            <div className="bg-slate-600 h-[30px] flex flex-row items-center">
              <label className="text-white text-lg ml-2 font-serif">
                Fund Request details for provided Request ID
              </label>
            </div>
            <div className="flex flex-row items-center mt-1 ml-2 gap-4">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Fund Request ID:
                </label>
                <input
                  type="text"
                  value={requestDetails.requestId}
                  readOnly
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Account Number:
                </label>
                <select
                  type="text"
                  value={updatedAccountNumber}
                  onChange={(e) => setUpdatedAccountNumber(e.target.value)}
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {requestDetails.accountList.map((element) => (
                    <option key={element.accountId} value={element.accountId}>
                      {element.accountNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row items-center mt-1 ml-2 gap-4">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Payment Type:
                </label>
                <select
                  type="text"
                  value={updatedPaymentType}
                  onChange={(e) => setUpdatedPaymentType(e.target.value)}
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {requestDetails.paymentList.map((element) => (
                    <option key={element.paymentId} value={element.paymentId}>
                      {element.paymentType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Amount:
                </label>
                <input
                  type="text"
                  value={formatAmount(requestDetails.requestAmount)}
                  readOnly
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
            </div>
            <div className="flex flex-row items-center mt-1 ml-2 gap-4">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Outstanding Amount:
                </label>
                <input
                  type="text"
                  value={formatAmount(requestDetails.outstandingAmount)}
                  readOnly
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Request Date:
                </label>
                <input
                  readOnly
                  type="text"
                  value={requestDetails.requestDate}
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
            </div>
            <div className="flex flex-row items-center mt-1 ml-2 gap-4">
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  Required Date:
                </label>
                <input
                  type="text"
                  value={requestDetails.requiredDate}
                  readOnly
                  required
                  id="small"
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>
              <div className="bg-green-200 rounded-md shadow-md">
                <div className="px-2 py-2 flex flex-row items-center">
                  <div>
                    <label
                      htmlFor="small"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                      Adjustment Type:
                    </label>
                    <select
                      type="text"
                      onChange={(e) => setUpdatedAdjustmentType(e.target.value)}
                      value={updatedAdjustmentType}
                      placeholder="Enter Adjustment Amount"
                      id="small"
                      className="outline-none block w-[200px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={""}>- Select Type -</option>
                      <option value={"+"}>Add Request</option>
                      <option value={"-"}>Deduct Request</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="small"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                      Adjustment Amount:
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUpdatedAdjustmentAmount(e.target.value)
                      }
                      value={updatedAdjustmentAmount}
                      placeholder="Enter Adjustment Amount"
                      onKeyDown={handleKeyDown}
                      id="small"
                      className="outline-none block w-[200px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="border-none items-center justify-center ml-2 mt-6 h-[28px] w-[90px] flex flex-row bg-blue-500 text-white shadow-lg hover:bg-blue-600 rounded-sm">
                      {updateSpinner && <Spinner size={20} />}
                      <label>Update</label>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
