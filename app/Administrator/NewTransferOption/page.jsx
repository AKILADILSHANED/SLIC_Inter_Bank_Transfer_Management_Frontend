"use client";
import React, { useState } from "react";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";
import { useEffect } from "react";
import Spinner from "@/app/Spinner/page";

export default function NewTransferOption() {
  //Define State Variables;
  const [fromAccountId, setFromAccountId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [fromAccountList, setFromAccountList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [viewSpinner, setViewSpinner] = useState(false);
  const [optionSaveSpinner, setOptionSaveSpinner] = useState(false);
  const [optionDetailsTable, setOptionDetailsTable] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define getBankAccount function;
  const getBankAccount = async () => {
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/bank-account/getBankAccounts`,
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
          setFromAccountList(response.responseObject);
        }
      } else {
        setErrorMessage(
          "Unable to load Account Numbers. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    }
  };

  useEffect(() => {
    getBankAccount();
  }, []);

  //Define getChannells function;
  const getChannells = async () => {
    try {
      const request = await fetch(`${baseUrl}/api/v1/channel/define-options`, {
        method: "GET",
        credentials: "include",
      });
      if (request.ok) {
        const response = await request.json();
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          setChannelList(response.responseObject);
        }
      } else {
        setErrorMessage(
          "Unable to load Channel Details. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    }
  };
  useEffect(() => {
    getChannells();
  }, []);

  //Define displayOptionDetails function;
  const displayOptionDetails = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    setSuccessMessage(false);
    setOptionDetailsTable(false);
    setViewSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/transferOption/display-options?accountId=${fromAccountId}&channelId=${channelId}`,
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
          setOptionList(response.responseObject);
          setOptionDetailsTable(true);
          setSelectedRow([]);
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
      setViewSpinner(false);
    }
  };

  //Define handleCheckBox function;
  const handleCheckBox = (
    e,
    existingRowKey,
    fromAccountId,
    toAccountId,
    channelId
  ) => {
    setSelectedRow((prevSelected) => {
      if (!prevSelected.some((item) => item.key == existingRowKey)) {
        return [
          ...prevSelected,
          {
            key: existingRowKey,
            fromAccountId: fromAccountId,
            toAccountId: toAccountId,
            channelId: channelId,
          },
        ];
      } else {
        return prevSelected.filter((item) => item.key !== existingRowKey);
      }
    });
  };
  
  //Define handleSavingOption function;
  const handleSavingOption = async ()=>{
    setOptionSaveSpinner(true);
    setErrorMessage(false);
    setSuccessMessage(false);
    if(selectedRow.length == 0){
      setErrorMessage("Please select at least one option to save!");
      setOptionSaveSpinner(false);
    }else{
      try{
        const savingOptions = selectedRow.map(element =>(
          {
            fromAccountId: element.fromAccountId,
            toAccountId: element.toAccountId,
            channelId: element.channelId
          }
        ));
        const request = await fetch(
          `${baseUrl}/api/v1/transferOption/save-transferOptions`,
          {
            method:"POST",
            credentials:"include",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(savingOptions)
          }
        );
        if(request.ok){
          const response = await request.json();
          if(response.success == false){
            setErrorMessage(response.message);
          }else{
            setSuccessMessage(response.message);
            setOptionDetailsTable(false);
          }
        }else{
          setErrorMessage("No response from server. Please contact administrator!");
        }
      }catch(error){
        setErrorMessage("Un-expected error occurred. Please contact administrator!");
      }finally{
        setOptionSaveSpinner(false);
      }
    }    
  }


  return (
    <div className="mt-4">
      <div className="shadow-md h-[160px]">
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Set New Transfer Option
          </label>
        </div>
        <form onSubmit={(e) => displayOptionDetails(e)}>
          <div className="mt-4 flex flex-row gap-2">
            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                From Account No:
              </label>
              <select
                id="small"
                placeholder="Enter Channel Type"
                onChange={(e) => setFromAccountId(e.target.value)}
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={""}>-Select Account Number-</option>
                {fromAccountList.map((element) => (
                  <option key={element.accountId} value={element.accountId}>
                    {element.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="small"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                Channel Type:
              </label>
              <select
                id="small"
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="Enter Channel Type"
                required
                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={""}>-Select Channel Type-</option>
                {channelList.map((element) => (
                  <option key={element.channelId} value={element.channelId}>
                    {element.channelType} ({element.shortKey})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2 ml-2">
            <button
              type="submit"
              className="flex flex-row gap-1 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
              {viewSpinner && <Spinner size={20} />}
              <label>View</label>
            </button>
          </div>
        </form>
      </div>

      <div>{errorMessage && <ErrorMessage messageValue={errorMessage}/>}</div>
      <div>{successMessage && <SUccessMessage messageValue={successMessage}/>}</div>

      {optionDetailsTable && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  From Account ID
                </th>
                <th scope="col" className="px-6 py-3">
                  From Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  To Account ID
                </th>
                <th scope="col" className="px-6 py-3">
                  To Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Channel ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Channel
                </th>
              </tr>
            </thead>
            <tbody>
              {optionList.map((element) => (
                <tr
                  key={element.fromAccountId + "-" + element.toAccountId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) =>
                          handleCheckBox(
                            e,
                            element.fromAccountId + "-" + element.toAccountId,
                            element.fromAccountId,
                            element.toAccountId,
                            element.channelId
                          )
                        }
                        checked={selectedRow.some(
                          (item) =>
                            item.key ==
                            element.fromAccountId + "-" + element.toAccountId
                        )}
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{element.fromAccountId}</td>
                  <td className="px-6 py-4">{element.fromAccountNumber}</td>
                  <td className="px-6 py-4">{element.toAccountId}</td>
                  <td className="px-6 py-4">{element.toAccountNumber}</td>
                  <td className="px-6 py-4">{element.channelId}</td>
                  <td className="px-6 py-4">{element.channelType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row items-center justify-start">
            <button
            onClick={()=>handleSavingOption()}
            className="flex flex-row gap-1 items-center justify-center bg-blue-600 hover:bg-blue-500 ml-2 mb-2 text-white shadow-sm shadow-slate-800 rounded-md mt-2 w-[150px] h-[28px]">
              {optionSaveSpinner && <Spinner size={20}/>}
              <label>Save Options</label>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
