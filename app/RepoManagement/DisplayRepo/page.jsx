"use client"
import React from 'react'
import { useState } from 'react';
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';

export default function DisplayRepo() {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables
  const [textRepoId, setTextRepoId] = useState("");
  const [spinnerSearch, setSpinnerSearch] = useState(false);
  const [repoDataTable, setRepoDataTable] = useState(false);
  const [repoDetails, setRepoDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  //Define getRepoDetails function;
  const getRepoDetails = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setRepoDataTable(false);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/repo/display-repo?repoId=${textRepoId}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      if (request.status === 200) {
        const response = await request.json();
        setRepoDetails(response.responseObject);
        setRepoDataTable(true);
      } else if (request.status === 409) {
        const response = await request.json();
        setErrorMessage(response.message);
      } else if (request.status === 500) {
        const response = await request.json();
        setErrorMessage(response.message);
      } else {
        const response = await request.json();
        setErrorMessage(response.message);
      }
    } catch (rror) {
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    }
  }

  return (
    <div>
      <div className="h-[120px] w-full shadow-md">
        <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
          <label className="text-white text-lg ml-2 font-serif">
            Display Repo Details
          </label>
        </div>
        <form onSubmit={(e) => getRepoDetails(e)}>
          <div className="flex flex-row items-center mt-5">
            <label
              htmlFor="small-input"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
              Repo Id:
            </label>
            <input
              type="text"
              onChange={(e) => setTextRepoId(e.target.value)}
              value={textRepoId.toUpperCase()}
              required
              placeholder="Enter REPO ID"
              id="small-input"
              className="block ml-2 w-[450px] p-1 px-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type='submit' className="ml-2 w-[100px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-4xl h-[35px] flex flex-row items-center justify-center">
              {spinnerSearch && (
                <div className="mr-1">
                  <Spinner size={20}></Spinner>
                </div>
              )}
              Search
            </button>
          </div>
        </form>
      </div>

      <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>

      {
        repoDataTable &&
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REPO ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opening Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Closing Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REPO Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invest Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maturity Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deleted User
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {
                repoDetails.map((element) => (
                  <tr key={element.repoId}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.repoId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.accountNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(element.openingBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(element.closingBalance)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.interestRate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.repoType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.investDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.maturityDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.createdDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.createdBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.deleteStatus}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{element.deleteUser}</div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
