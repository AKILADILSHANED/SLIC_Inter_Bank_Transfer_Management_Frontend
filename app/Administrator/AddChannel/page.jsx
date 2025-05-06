"use client"
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";

export default function AddChannel({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [saveSpinner, setSaveSpinner] = useState(false);

  const [channelType, setChannelType] = useState("");
  const [shortKey, setShortKey] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");

  //Define handleSave function;
  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
        setSaveSpinner(true);
      const request = await fetch(`${baseUrl}/api/v1/channel/add-channel`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelType: channelType,
          shortKey: shortKey,
          priorityLevel: priorityLevel,
        }),
      });
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
    }finally{
        setSaveSpinner(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-4 h-[250px] shadow-md">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Add New Transfer Channel
          </label>
        </div>
        <form onSubmit={(e)=>handleSave(e)}>
          <div className="flex flex-row mt-4 ml-2">
            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Channel Type:
              </label>
              <input
                id="small"
                onChange={(e) => {
                  setChannelType(e.target.value);
                }}
                placeholder="Enter Channel Type"
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
            <div className="ml-10">
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Short Key:
              </label>
              <input
                id="small"
                onChange={(e) => {
                  setShortKey(e.target.value);
                }}
                placeholder="Enter Short Key"
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
          </div>

          <div className="flex flex-row mt-2 ml-2">
            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Set Priority Level:
              </label>
              <input
                id="small"
                onChange={(e) => {
                  setPriorityLevel(e.target.value);
                }}
                type="number"
                placeholder="Set Priority Level"
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <button
              type="submit"
              className="flex flex-row ml-4 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
              {saveSpinner && <Spinner size={20} />}
              <label>Save</label>
            </button>

            <button
              type="button"
              onClick={() => onCancel()}
              className="border flex flex-row ml-2 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
              <label>Cancel</label>
            </button>
          </div>
        </form>
      </div>

      <div>
        {successMessage && <SUccessMessage messageValue={successMessage}/>}
      </div>
      <div>
        {errorMessage && <ErrorMessage messageValue={errorMessage}/>}
      </div>
    </div>
  );
}
