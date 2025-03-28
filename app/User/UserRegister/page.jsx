"use client";
import React, { useState } from "react";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";

export default function UserRegister({ onCancel }) {
  //Define State Variables
  const [userStatus, setUserStatus] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [epf, setEpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);

  //Define functions
  const handleCancel = () => {
    onCancel();
  };

  const userRegister = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (!userStatus || !userLevel) {
      setSuccessMessage("");
      setErrorMessage(
        "Please select both User Status and User Level from drop down box!"
      );
      setLoader(false);
    } else {
      if (password !== confirmedPassword) {
        setSuccessMessage("");
        setErrorMessage(
          "Pasword and Confirmed password does not matched. Please check!"
        );
        setLoader(false);
      } else {
        try {
          const request = await fetch(
            "http://localhost:8080/api/v1/user/user-register",
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userTitle: userStatus,
                userLevel: userLevel,
                userFirstName: firstName.trim(),
                userLastName: lastName.trim(),
                userEmail: email.trim(),
                userEpf: epf.trim(),
                userPassword: password.trim(),
              }),
            }
          );
          if (request.ok) {
            const response = await request.text();
            setErrorMessage("");
            setSuccessMessage(response);
            setLoader(false);
          } else {
            setSuccessMessage("");
            setErrorMessage(
              "No response received from server. Please contact administrator!"
            );
            setLoader(false);
          }
        } catch (error) {
          setSuccessMessage("");
          setErrorMessage(
            error +
              " (Un-expected error occurred. Please contact administrator!)"
          );
          setLoader(false);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => userRegister(e)}>
          <div className="w-full h-[330px] shadow-md">
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
              <label className="text-white ml-3 text-lg font-serif">
                Provide User Details
              </label>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  User Status:
                </label>
                <select
                  onChange={(e) => setUserStatus(e.target.value)}
                  id="small"
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Status-</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss.">Miss.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Doc.">Doc.</option>
                </select>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  User Level:
                </label>
                <select
                  onChange={(e) => setUserLevel(e.target.value)}
                  id="small"
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select User Level-</option>
                  <option value="0">Administrator</option>
                  <option value="1">Authorizer</option>
                  <option value="2">Initiator</option>
                </select>
              </div>

              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  First Name:
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  id="small"
                  placeholder="Enter First Name"
                  required
                  className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-15">
                  Last Name:
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  id="small"
                  placeholder="Enter Last Name"
                  required
                  className="outline-none block w-[350px] ml-[60px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>

              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  Email:
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="small"
                  placeholder="example@slicgeneral.com"
                  required
                  className="outline-none block w-[350px] ml-[46px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-15">
                  EPF:
                </label>
                <input
                  onChange={(e) => setEpf(e.target.value)}
                  id="small"
                  placeholder="Enter EPF"
                  required
                  className="outline-none block w-[350px] ml-[106px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>

              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  Password:
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="small"
                  placeholder="Enter Password"
                  required
                  className="outline-none block w-[350px] ml-[15px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-15">
                  Confirm Password:
                </label>
                <input
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                  type="password"
                  id="small"
                  placeholder="Enter Password"
                  required
                  className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>

              <div className="flex flex-row items-center mt-4 ml-25">
                <button
                  type="submit"
                  className="text-white flex flex-row items-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {loader && <Spinner size={20}></Spinner>}
                  Register
                </button>

                <button
                  onClick={() => handleCancel()}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {successMessage && (
        <div>
          <SUccessMessage messageValue={successMessage}></SUccessMessage>
        </div>
      )}
      {errorMessage && (
        <div>
          <ErrorMessage messageValue={errorMessage}></ErrorMessage>
        </div>
      )}
    </div>
  );
}
