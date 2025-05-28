"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import Spinner from "@/app/Spinner/page";

export default function PriorityLevel({ onCancel }) {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define State variables;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [channelData, setChannelData] = useState([]);
  const [channelDetailsWindow, setChannelDetailsWindow] = useState(false);
  const [newLevel, setNewLevel] = useState("");
  const [newChannelId, setNewChannelId] = useState("");
  const [modalError, setModalError] = useState("");
  const [modal, setModal] = useState(false);
  const [saveSpinner, setSaveSpinner] = useState(false);

  const loadChannelData = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setChannelDetailsWindow(false);
    try {
      const request = await fetch(`${baseUrl}/api/v1/channel/priority-levels`, {
        method: "GET",
        credentials: "include",
      });
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          setChannelData(response.responseObject);
          setChannelDetailsWindow(true);
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
    loadChannelData();
  }, []);

  //Define modal close function;
  const modalClose = () => {
    setModal(false);
  };

  //Define changeLevel function;
  const changeLevel = async (channelId, newLevel) => {
    if (newLevel == "") {
      setModalError("Please provide a new level for this channel!");
    } else {
      try {
        setSaveSpinner(true);
        const request = await fetch(
          `${baseUrl}/api/v1/channel/level-update?channelId=${channelId}&newLevel=${newLevel}`,
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
            setModal(false);
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
        setSaveSpinner(false);
      }
    }
  };

  //Define handleClickChannelId function;
  const handleClickChannelId = (channelId) => {
    setNewChannelId(channelId);
    setModal(true);
    setErrorMessage(false);
    setSuccessMessage(false);
    setModalError(false);
    setNewLevel("");
  };

  return (
    <div className="mt-4">
      <div className="bg-red-800 h-[30px] flex flex-row items-center">
        <label className="text-white ml-3 text-lg font-serif">
          Set-up Priority Levels
        </label>
      </div>

      <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
      <div>
        {successMessage && <SUccessMessage messageValue={successMessage} />}
      </div>

      {channelDetailsWindow && (
        <div className="relative overflow-x-auto">
          <table className="w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  Existing Level
                </th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((element) => (
                <tr
                  key={element.channelId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      onClick={() => handleClickChannelId(element.channelId)}
                      className="text-blue-600 hover:underline hover:font-bold">
                      {element.channelId}
                    </a>
                  </td>
                  <td className="px-6 py-4">{element.channelType}</td>
                  <td className="px-6 py-4">{element.shortKey}</td>
                  <td className="px-6 py-4">{element.priorityLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Set-up New Level
                </h3>
                <button
                  onClick={() => modalClose()}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal">
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                  Changing the priority level for a transfer channel will
                  immediately affect how transfers are processed across the
                  system. This modification may significantly alter existing
                  transfer workflows. Please verify the new priority level is
                  correct before confirming this change, as the impact will take
                  effect immediately upon saving.
                </p>
                <div>
                  <label className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    New Level:
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setNewLevel(e.target.value)}
                    value={newLevel}
                    className="border rounded-sm ml-2 px-2"
                    placeholder="Enter new priority level"></input>
                  {modalError && (
                    <div className="text-red-500">{modalError}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => changeLevel(newChannelId, newLevel)}
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white flex flex-row items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {saveSpinner && <Spinner size={20} />}
                  <label>Save</label>
                </button>
                <button
                  onClick={() => modalClose()}
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
