"use client";
import React, { useState } from "react";
import Spinner from "../Spinner/page";

export default function UserManagement() {
  //Define state variables.
  const [clickRegister, setClickRegister] = useState(false);
  const [status, setStatus] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [epf, setEpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  //Define functions for User Registration
  const handleRegisterNewWindow = () => {
    if (!clickRegister) {
      setClickRegister(true);
      setErrorMessage(false);
      setPassword("");
      setConfirmPassword("");
      setSuccessMessage(false);
    } else {
      setClickRegister(false);
      setErrorMessage(false);
      setSuccessMessage(false);
    }
  };
  const handleCancel = () => {
    if (!clickRegister) {
      setClickRegister(true);
      setErrorMessage(false);
      setSuccessMessage(false);
    } else {
      setClickRegister(false);
      setErrorMessage(false);
      setSuccessMessage(false);
    }
  };
  const confirmRegister = async (e) => {
    setLoader(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    e.preventDefault();
    if (password !== confirmPassword) {
      setLoader(false);
      setErrorMessage("Password and Confirmed password is not matched.");
      setSuccessMessage(false);
    } else {
      setErrorMessage(false);
      setSuccessMessage(false);
      try {
        const request = await fetch(
          "http://localhost:8080/api/v1/user/user-register",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userTitle: status,
              userLevel: userLevel,
              userFirstName: firstName,
              userLastName: lastName,
              userEmail: email,
              userEpf: epf,
              userPassword: password,
            }),
          }
        );
        if (request.ok) {
          const response = await request.text();
          setLoader(false);
          setSuccessMessage(response);
        } else {
          setLoader(false);
          setErrorMessage(
            "Response not received from server. Please contact the administrator!"
          );
        }
      } catch (error) {
        setLoader(false);
        setErrorMessage(
          "Un-expected error occurred. Please contact administrator!"
        );
      }
    }
  };

  return (
    <div>
      <div className="bg-slate-800 w-full h-[45px] flex flex-row items-center shadow-lg">
        <svg
          className="w-6 h-6 text-white dark:text-white ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <label className="text-white text-xl ml-4">User Management |</label>
        </div>

        <div className="flex flex-row items-center justify-center ml-[100px]">
          <svg
            className="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
              clipRule="evenodd"
            />
          </svg>
          <div
            onClick={() => handleRegisterNewWindow()}
            className="text-sm text-white hover:bg-slate-700 w-[110px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Register New</button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[70px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Search</button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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

          <div className="text-sm text-white hover:bg-slate-700 w-[120px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Update Details</button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[100px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Delete User</button>
          </div>
        </div>
      </div>

      {/*Sub windows*/}
      {clickRegister && (
        <div className="w-[full] h-[370px] mt-4 shadow-md">
          <div className="bg-red-800 w-full h-[30px] flex flex-row items-center">
            <label className="text-white ml-2">Provide User details</label>
          </div>
          <form
            onSubmit={(e) => {
              confirmRegister(e);
            }}
            className="flex flex-col">
            <div className="flex flex-row mt-4">
              <select
                onChange={(e) => setStatus(e.target.value)}
                id="small"
                required
                className="block w-[150px] ml-8 p-2 outline-blue-300 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss.">Miss.</option>
                <option value="Prof.">Prof.</option>
                <option value="Doc.">Doc.</option>
              </select>

              <select
                onChange={(e) => setUserLevel(e.target.value)}
                id="small"
                required
                className="block w-[150px] ml-8 p-2 outline-blue-300 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="0">Administrator</option>
                <option value="1.">Authorizer</option>
                <option value="2">Initiator</option>
              </select>
            </div>

            <div className="flex flex-row mt-1">
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  First Name:
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter First Name"
                  id="small-input"
                  className="block ml-8 w-[450px] p-2 outline-blue-300 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  Last Name:
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  id="small-input"
                  className="block ml-8 w-[450px] p-2 outline-blue-300 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row mt-1">
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  Email Address:
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="example@slicgeneral.com"
                  id="small-input"
                  className="block ml-8 w-[450px] outline-blue-300 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  EPF:
                </label>
                <input
                  onChange={(e) => setEpf(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  id="small-input"
                  className="block ml-8 w-[450px] outline-blue-300 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row mt-1">
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  Password:
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Enter Password"
                  id="small-input"
                  className="block ml-8 w-[450px] outline-blue-300 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-8">
                  Confirm Password:
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Enter Password again"
                  id="small-input"
                  className="block ml-8 w-[450px] outline-blue-300 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row mt-4 ml-8">
              <button
                type="submit"
                className="flex flex-row items-center border-none justify-center h-[30px] w-[90px] shadow-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-md text-sm text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="w-6 h-6 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 28 28">
                  <path
                    fillRule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
                Register
              </button>

              <button
                onClick={() => handleCancel()}
                type="button"
                className="flex flex-row items-center justify-center me-2 mb-2 h-[30px] w-[90px] shadow-md text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 f dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 28 28">
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancel
              </button>
              {loader && (
                <div>
                  <Spinner></Spinner>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {/*Success message components*/}
      {successMessage && (
        <div
          id="alert-border-3"
          className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert">
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">{successMessage}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close">
            <span className="sr-only">Dismiss</span>
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
          </button>
        </div>
      )}

      {/*Error message components*/}
      {errorMessage && (
        <div
          id="alert-border-2"
          className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert">
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">{errorMessage}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close">
            <span className="sr-only">Dismiss</span>
            <svg
              onClick={() => setErrorMessage(false)}
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
          </button>
        </div>
      )}
    </div>
  );
}
