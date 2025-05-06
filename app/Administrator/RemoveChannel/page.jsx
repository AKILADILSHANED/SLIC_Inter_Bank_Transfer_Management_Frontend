"use client";
import React from "react";
import { useState } from "react";
import Spinner from "@/app/Spinner/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function RemoveChannel({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [channelId, setChannelId] = useState("");
  const [searchSpinner, setSearchSpinner] = useState(false);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [channelData, setChannelData] = useState({});
  const [channelDataWindow, setChannelDataWindow] = useState(false);

  //Define handleSearch function;
  const handleSearch = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setChannelDataWindow(false);
    setSearchSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/channel/search-removeChannel?channelId=${channelId}`,
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
          setChannelData(response.responseObject);
          setChannelDataWindow(true);
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

  //Define handleRemove function;
  const handleRemove = async () => {
    setDeleteSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/channel/remove-channel?channelId=${channelData.channelId}`,
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
        setErrorMessage("No response from server. Please contact administrator!");
      }
    } catch (error) {
        setErrorMessage("Un-expected error occurred. Please contact administrator!");
    }finally{
        setDeleteSpinner(false);
    }
  };

  return (
    <div className="flex flex-col mt-4 h-[180px] shadow-md">
      <div className="bg-red-800 h-[30px] flex flex-row items-center">
        <label className="text-white ml-3 text-lg font-serif">
          Remove Transfer Channel
        </label>
      </div>
      <form onSubmit={(e)=>handleSearch(e)}>
        <div className="flex flex-row mt-4 ml-2">
          <div>
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
              Channel ID:
            </label>
            <input
              id="small"
              onChange={(e) => {
                setChannelId(e.target.value.toUpperCase());
              }}
              value={channelId}
              placeholder="Enter Channel ID"
              required
              className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button
            type="submit"
            className="flex flex-row ml-4 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
            {searchSpinner && <Spinner size={20} />}
            <label>Search</label>
          </button>

          <button
            type="button"
            onClick={() => onCancel()}
            className="border flex flex-row ml-2 mt-4 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
            <label>Cancel</label>
          </button>
        </div>
      </form>
      <div className="mt-4">{successMessage && <SUccessMessage messageValue={successMessage}/>}</div>
      <div className="mt-4">{errorMessage && <ErrorMessage messageValue={errorMessage}/>}</div>

      {channelDataWindow && (
        <div className="mt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Channel ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Channel Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Short Key
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={channelData.channelId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">{channelData.channelId}</td>
                  <td className="px-6 py-4">{channelData.channelType}</td>
                  <td className="px-6 py-4">{channelData.shortKey}</td>
                  <td className="px-6 py-4">{channelData.priorityLevel}</td>
                  <td className="px-6 py-4">{channelData.createdDate}</td>
                  <td className="px-6 py-4">{channelData.definedBy}</td>
                  <td className="px-6 py-4">
                    <button 
                    onClick={()=>handleRemove()}
                    className="bg-red-700 flex flex-row items-center justify-center text-white h-[27px] w-[80px] rounded-md shadow-slate-600 shadow-md hover:bg-red-600">
                    {deleteSpinner && <Spinner size={20}/>}
                    <label>Delete</label>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
