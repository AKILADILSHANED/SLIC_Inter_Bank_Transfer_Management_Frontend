import React from "react";
import Spinner from "@/app/Spinner/page";
import { useState } from "react";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function UpdateUser({ onCancel }) {
  const [userId, setUserId] = useState("");
  const [errorMessageStatus, setErrorMessageStatus] = useState(false);
  const [successMessageStatus, setSuccessMessageStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [userDetailsWindow, setUserDetailsWindow] = useState(false);

  //Defined states for Updating text fields.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [epf, setEpf] = useState("");
  const [email, setEmail] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleCancel = () => {
    onCancel();
  };

  //Define search function.
  const handleSearch = async () => {
    setLoader(true);
    setErrorMessageStatus(false);
    setSuccessMessageStatus(false);
    setMessage(false);

    if (userId == "") {
      setErrorMessageStatus(true);
      setMessage("Please provide a valid User ID!");
      setUserDetailsWindow(false);
      setLoader(false);
    } else {
      try {
        const request = await fetch(
          `http://localhost:8080/api/v1/user/user-search?userId=${encodeURIComponent(
            userId
          )}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (request.ok) {
          const respnse = await request.json();
          if (respnse.success == true) {
            //Setting response values to text field states.
            setFirstName(respnse.responseObject.userFirstName);
            setLastName(respnse.responseObject.userLastName);
            setEpf(respnse.responseObject.userEpf);
            setEmail(respnse.responseObject.userEmail);
            setActiveStatus(respnse.responseObject.userActiveStatus);
            setUserLevel(respnse.responseObject.userLevel);
            setCreatedDate(respnse.responseObject.userCreatedDate);
            setCreatedBy(respnse.responseObject.userCreateBy);
            setUserDetailsWindow(true);
          } else {
            setErrorMessageStatus(true);
            setMessage(respnse.message);
            setUserDetailsWindow(false);
          }
        } else {
          setErrorMessageStatus(true);
          setMessage(
            "No response received from the server. Please contact the administrator!"
          );
          setUserDetailsWindow(false);
        }
        setLoader(false);
      } catch (error) {
        setErrorMessageStatus(true);
        setMessage("Un-expected error occured. Please contact administrator!");
        setUserDetailsWindow(false);
        setLoader(false);
      }
      setLoader(false);
    }
  };

  //Define Update function;
  const handleUserUpdate = async () => {
    setErrorMessageStatus(false);
    setMessage(false);
    setSuccessMessageStatus(false);
    try {
      setUpdateLoader(true);
      const request = await fetch(
        "http://localhost:8080/api/v1/user/user-update",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            userFirstName: firstName,
            userLastName: lastName,
            userEpf: epf,
            userEmail: email,
            userLevel: userLevel,
          }),
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.success == true) {
          setSuccessMessageStatus(true);
          setMessage(response.message);
          setUpdateLoader(false);
        } else {
          setErrorMessageStatus(true);
          setMessage(response.message);
          setUpdateLoader(false);
        }
      } else {
        setErrorMessageStatus(true);
        setMessage(
          "Unable to update the user at this moment. Please contact administrator!"
        );
        setUpdateLoader(false);
      }
    } catch (error) {
      setErrorMessageStatus(true);
      setMessage("Un-expected error occurred. Please contact administrator!");
      setUpdateLoader(false);
    }
  };

  return (
    <div>
      <div className="h-[120px] w-full shadow-md mt-4">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white text-lg ml-2 font-serif">
            Update User Details
          </label>
        </div>
        <div className="flex flex-row items-center mt-5">
          <label
            htmlFor="small-input"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-8">
            User Id:
          </label>
          <input
            onChange={(e) => setUserId(e.target.value)}
            type="text"
            required
            placeholder="Enter User ID"
            id="small-input"
            className="block ml-2 w-[450px] p-1 px-2 outline-blue-300 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 w-[100px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-4xl h-[35px] flex flex-row items-center justify-center">
            View
          </button>
          {loader && (
            <div className="ml-2">
              <Spinner size={25}></Spinner>
            </div>
          )}
        </div>
      </div>

      {errorMessageStatus && (
        <div className="mt-2">
          <ErrorMessage messageValue={message}></ErrorMessage>
        </div>
      )}

      {successMessageStatus && (
        <div className="mt-2">
          <SUccessMessage messageValue={message}></SUccessMessage>
        </div>
      )}

      {userDetailsWindow && (
        <div>
          <div className="shadow mt-5 h-[374px]">
            <div className="bg-slate-600 h-[30px] flex flex-row items-center">
              <label className="text-white text-lg font-serif ml-2">
                User Details for provided User ID
              </label>
            </div>
            <div>
              <div className="flex flex-row">
                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    EPF:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEpf(e.target.value)}
                    value={epf}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Active Status:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={activeStatus}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User Level:
                  </label>
                  <select
                    type="text"
                    onChange={(e) => setUserLevel(e.target.value)}
                    value={userLevel}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={0}>Administrator</option>
                    <option value={1}>Authorizer</option>
                    <option value={2}>Initiator</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User Created On:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={createdDate}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="ml-2 mt-3">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    User Created By:
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={createdBy}
                    id="small-input"
                    className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-3 ml-2 flex flex-row justify-center">
                <div>
                  <button
                    onClick={() => handleUserUpdate()}
                    type="submit"
                    className="flex flex-row items-center justify-center rounded-md w-[120px] h-[30px] shadow-md bg-green-700 text-white hover:bg-green-600">
                    {updateLoader && (
                      <div>
                        <Spinner size={20}></Spinner>
                      </div>
                    )}
                    <svg
                      className="w-6 h-6 text-white dark:text-white mr-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                      />
                    </svg>
                    Update
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleCancel()}
                    type="button"
                    className="flex flex-row items-center justify-center rounded-md w-[120px] h-[30px] shadow-md ml-2 bg-red-700 text-white hover:bg-red-600">
                    <svg
                      className="w-6 h-6 text-white mr-1 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
