"use client";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import React, { useState } from "react";
import { useEffect } from "react";

export default function ChannelDetails() {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [errorMessage, setErrorMessage] = useState("");
  const [channelData, setChannelData] = useState([]);

  //Define getChannelDetails function;
  const getChannelDetails = async () => {
    setErrorMessage("");
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/channel/get-channelDetails`,
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
    }
  };

  useEffect(() => {
    getChannelDetails();
  }, []);

  return (
    <div className="mt-4">
      <div className="bg-red-800 h-[30px] flex flex-row items-center">
        <label className="text-white ml-3 text-lg font-serif">
          Transfer Channel Details
        </label>
      </div>
      <div>{errorMessage && <ErrorMessage />}</div>
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
                Delete Status
              </th>
              <th scope="col" className="px-6 py-3">
                Delete By
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((element) => (
              <tr
                key={element.channelId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td className="px-6 py-4">{element.channelId}</td>
                <td className="px-6 py-4">{element.channelType}</td>
                <td className="px-6 py-4">{element.shortKey}</td>
                <td className="px-6 py-4">{element.priorityLevel}</td>
                <td className="px-6 py-4">{element.createdDate}</td>
                <td className="px-6 py-4">{element.deletedStatus}</td>
                <td className="px-6 py-4">{element.deleteBy}</td>
                <td className="px-6 py-4">{element.definedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
