"use client"
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import Spinner from "@/app/Spinner/page";
import React, { useState } from "react";
import { useEffect } from "react";

export default function RegisterAccount({ onCancel }) {

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [spinner, setSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //Define state variables to store user input data;
  const [textBank, setTextBank] = useState("");
  const [bankList, setBankList] = useState([]);
  const [textBranch, setTextBranch] = useState("");
  const [textAccountType, setAccountType] = useState("");
  const [textCurrency, setCurrency] = useState("");
  const [textGlCode, setGlCode] = useState("");
  const [textAccountNumber, setAccountNumber] = useState("");

  //define getBankList function;
  const getBankList = async ()=>{
    try{
      const request = await fetch(
        `${baseUrl}/api/v1/bank/bank-list`,
        {
          method:"GET",
          credentials:"include"
        }
      );
      if(request.ok){
        const response = await request.json();
        if(response.success == false){
          setErrorMessage(response.message);
        }else{
          setBankList(response.responseObject);
        }
      }else{
        setErrorMessage("Unable to fetch Bank List. Please contact administrator!");
      }
    }catch(error){
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    }
  }

  useEffect(()=>{
    getBankList();
  },[]);

  //Define handle register function;
  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setSpinner(true);

    if (!textBank) {
      setErrorMessage("Please select the bank from drop down!");
      setSpinner(false);
    } else if (!textAccountType) {
      setErrorMessage("Please select the account type from drop down!");
      setSpinner(false);
    } else if (!textCurrency) {
      setErrorMessage("Please select currency from drop down!");
      setSpinner(false);
    } else {
      try {
        const request = await fetch(
            `${baseUrl}/api/v1/bank-account/account-register`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bank: textBank,
              bankBranch: textBranch,
              accountType: textAccountType,
              currency: textCurrency,
              glCode: textGlCode,
              accountNumber: textAccountNumber,
            }),
          }
        );
        if (request.ok) {
          const response = await request.json();
          if (response.success == false) {
            setErrorMessage(response.message);
            setSpinner(false);
          } else {
            setSuccessMessage(response.message);
            setSpinner(false);
          }
        } else {
          setErrorMessage(
            "No response received from server. Please contact administrator!"
          );
          setSpinner(false);
        }
      } catch (error) {
        setErrorMessage(
          error + " Un-expected error occurred. Please contact administrator!"
        );
        setSpinner(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <div className="bg-red-800 h-[30px] flex flex-row items-center">
            <label className="text-white ml-3 text-lg font-serif">
              Provide Bank Account Details
            </label>
          </div>
          <div className="shadow-md h-[290px] flex flex-col">
            <div className="flex flex-row mt-4">
              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                Bank:
              </label>
              <select
                onChange={(e) => setTextBank(e.target.value)}
                value={textBank}
                id="small"
                className="block w-[200px] ml-[94px] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">-Select Bank-</option> 
                {bankList.map(element=>(
                  <option key={element.bankName} value={element.bankId}>{element.bankName}</option> 
                ))}                               
              </select>
            </div>

            <div className="flex flex-row mt-5">
              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                Bank Branch:
              </label>
              <input
                onChange={(e) => setTextBranch(e.target.value)}
                id="small"
                placeholder="Enter Bank Branch"
                required
                className="outline-none block w-[350px] ml-[38px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>

              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-15">
                Account Type:
              </label>
              <select
                onChange={(e) => setAccountType(e.target.value)}
                id="small"
                className="block w-[200px] ml-2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">-Select Account Type-</option>
                <option value="1">Current Account</option>
                <option value="2">Saving Account</option>
              </select>
            </div>

            <div className="flex flex-row mt-5">
              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                Currency:
              </label>
              <select
                onChange={(e) => setCurrency(e.target.value)}
                id="small"
                className="block w-[200px] ml-[65px] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">-Select Account Currency-</option>
                <option value="LKR">LKR</option>
                <option value="AUD">AUD</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="SGD">SGD</option>
              </select>

              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-[209px]">
                GL Code:
              </label>
              <input
                onChange={(e) => setGlCode(e.target.value)}
                id="small"
                placeholder="Enter GL Code"
                required
                className="outline-none block w-[350px] ml-[40px] p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>

            <div className="flex flex-row mt-5">
              <label
                htmlFor="small"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-3">
                Account Number:
              </label>
              <input
                onChange={(e) => setAccountNumber(e.target.value)}
                id="small"
                placeholder="Enter Account Number"
                required
                className="outline-none block w-[350px] ml-2 p-1 px-2 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>

            <div className="flex flex-row items-center mt-4 ml-[144px]">
              <button
                type="submit"
                className="text-white flex flex-row items-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {spinner && <Spinner size={20}></Spinner>}
                Register
              </button>

              <button
                onClick={() => onCancel()}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      {successMessage && (
        <SUccessMessage messageValue={successMessage}></SUccessMessage>
      )}

      {errorMessage && (
        <ErrorMessage messageValue={errorMessage}></ErrorMessage>
      )}
    </div>
  );
}
