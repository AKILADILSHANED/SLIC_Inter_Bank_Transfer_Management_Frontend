import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";

export default function SearchUser() {
  const [userId, setUserId] = useState("");
  const [messageStatus, setMessageStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userFirstName: "",
    userLastName: "",
    userEpf: "",
    userEmail: "",
    userActiveStatus: "",
    userLevel: "",
    userCreatedDate: "",
    userCreateBy: "",
  });
  const [userDetailsWindow, setUserDetailsWindow] = useState(false);

  //Define search function.
  const handleSearch = async () => {
    setLoader(true);
    setMessageStatus(false);
    if (userId == "") {
      setMessageStatus(true);
      setMessage("Please provide a valid User ID!");
      setUserDetailsWindow(false);
      setLoader(false);
    } else {
      setMessageStatus(false);
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
            setCurrentUser(respnse.responseObject);
            setUserDetailsWindow(true);
          } else {
            setMessageStatus(true);
            setMessage(respnse.message);
            setUserDetailsWindow(false);
          }
        } else {
          setMessageStatus(true);
          setMessage("No response received from the server. Please contact the administrator!");
          setUserDetailsWindow(false);
        }
        setLoader(false);
      } catch (error) {
        setMessageStatus(true);
        setMessage("Un-expected error occuured. Please contact administrator!");
        setUserDetailsWindow(false);
      }
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="h-[120px] w-full shadow-md">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white text-lg ml-2 font-serif">
            Search User Details
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
            Search
          </button>
          {loader && (
            <div className="ml-2">
              <Spinner size={25}></Spinner>
            </div>
          )}
        </div>
      </div>

      {userDetailsWindow && <div>
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
                  readOnly
                  value={currentUser.userFirstName}
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
                  readOnly
                  value={currentUser.userLastName}
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
                  readOnly
                  value={currentUser.userEpf}
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
                  readOnly
                  value={currentUser.userEmail}
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
                  value={currentUser.userActiveStatus}
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
                <input
                  type="text"
                  readOnly
                  value={currentUser.userLevel}
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
                  User Created On:
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentUser.userCreatedDate}
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
                  value={currentUser.userCreateBy}
                  id="small-input"
                  className="block w-[500px] outline-blue-400 px-2 py-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>}

      {messageStatus && (
        <div className="mt-2">
          <ErrorMessage messageValue={message}></ErrorMessage>
        </div>
      )}
    </div>
  );
}
