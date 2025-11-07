"use client";
import React, { useState } from "react";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import Router, { useRouter } from "next/navigation";

export default function UserRegister({ onCancel }) {
  const router = useRouter();

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define State Variables
  const [userStatus, setUserStatus] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [epf, setEpf] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [signatureImage, setSignatureImage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);

  //Define functions
  const handleCancel = () => {
    onCancel();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage("Please select a valid image file");
        return;
      }

      // Validate file size (e.g., 2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size should be less than 2MB");
        return;
      }

      setSignatureImage(file);
      setErrorMessage("");
    }
  };  

  const userRegister = async (e) => {
    setLoader(true);
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {      
      //Create new form data object;
      const formDataObject = new FormData();
      formDataObject.append('userTitle', userStatus);
      formDataObject.append('userLevel', userLevel);
      formDataObject.append('userFirstName', firstName);
      formDataObject.append('userLastName', lastName);
      formDataObject.append('department', department);
      formDataObject.append('section', section);
      formDataObject.append('userPosition', userPosition);
      formDataObject.append('userEmail', email);
      formDataObject.append('userEpf', epf);
      formDataObject.append('userSignature', signatureImage);

      const request = await fetch(
        `${baseUrl}/api/v1/user/user-register`,
        {
          method: "POST",
          credentials: "include",
          body: formDataObject
        }
      );

      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
          setLoader(false);
        } else {
          setSuccessMessage(response.message);
          setLoader(false);
          // Reset form after successful registration
          setSignatureImage(null);
          // Reset file input
          const fileInput = document.getElementById('signature-image');
          if (fileInput) fileInput.value = '';
        }
      } else {
        setErrorMessage(
          "No response received from server. Please contact administrator!"
        );
        setLoader(false);
      }
    } catch (error) {
      setErrorMessage(
        error +
        " (Un-expected error occurred. Please contact administrator!)"
      );
      setLoader(false);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => userRegister(e)} encType="multipart/form-data">
          <div className="w-full h-[380px] shadow-md"> {/* Increased height to accommodate new field */}
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
                  value={userStatus}
                  id="small"
                  required
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
                  value={userLevel}
                  id="small"
                  required
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select User Level-</option>
                  <option value="0">General User</option>
                  <option value="1">Administrator</option>
                </select>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  User Position:
                </label>
                <select
                  onChange={(e) => setUserPosition(e.target.value)}
                  value={userPosition}
                  id="small"
                  required
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select User Position-</option>
                  <option value="Finance Assistant">Finance Assistant</option>
                  <option value="Finance Executive">Finance Executive</option>
                  <option value="Insurance Assistant">Insurance Assistant</option>
                  <option value="Assistant Finance Manager">Assistant Finance Manager</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Senior Finance Manager">Senior Finance Manager</option>
                  <option value="Assistant General Manager">Assistant General Manager</option>
                  <option value="Deputy General Manager">Deputy General Manager</option>
                  <option value="Chief Financial Officer">Chief Financial Officer</option>
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
                  value={firstName}
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
                  value={lastName}
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
                  value={email}
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
                  value={epf}
                  id="small"
                  placeholder="Enter EPF"
                  required
                  className="outline-none block w-[350px] ml-[106px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
              </div>

              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  Department
                </label>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  id="small"
                  required
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Department-</option>
                  <option value="Finance Department">Finance Department</option>
                </select>

                <label
                  htmlFor="small"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-15">
                  Section:
                </label>
                <select
                  onChange={(e) => setSection(e.target.value)}
                  value={section}
                  id="small"
                  required
                  className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Section-</option>
                  <option value="Investment">Investment</option>
                  <option value="Payment">Payment</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Motor Payments">Motor Payments</option>
                  <option value="Tax">Tax</option>
                  <option value="Miscellaneous Payments">Miscellaneous Payments</option>
                </select>
              </div>

              <div className="flex flex-row items-center mt-5">
                <label
                  htmlFor="signature-image"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                  Signature Image:
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  id="signature-image"
                  accept="image/*"
                  className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                {signatureImage && (
                  <span className="ml-3 text-sm text-green-600">
                    ✓ {signatureImage.name}
                  </span>
                )}
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