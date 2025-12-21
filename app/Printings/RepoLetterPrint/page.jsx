"use client"
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function RepoLetterPrint() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables
    const [repoList, setRepoList] = useState([]);
    const [repoDetails, setRepoDetails] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(false);

    //Define showRepoDetails function;
    const showRepoDetails = async () => {
        setLoadingStatus(true);
        setErrorMessage("");
        setRepoDetails(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/display-repo-details-for-print`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            const response = await request.json();
            if (request.status === 200) {
                setRepoList(response.responseObject);
            } else if (request.status === 409) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setLoadingStatus(false);
        }
    }

    useEffect(() => {
        showRepoDetails();
    }, []);

    return (
        <div>
            <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                <label className="text-white text-lg ml-2 font-serif">
                    Print Repo Letters
                </label>
            </div>
            {errorMessage && <ErrorMessage messageValue={errorMessage} />}

            {loadingStatus && <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    {/* Inner spinning ring */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
                <p className="mt-2 text-gray-400 text-sm">Please wait a moment</p>
            </div>}

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Repo Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Repo ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Bank Account
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Repo Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Invest Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {repoList.map((item) => (
                            <tr key={item.repoId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.repoDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{item.repoId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.accountNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.repoType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    {typeof item.investmentValue === "number"
                                        ? item.investmentValue.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })
                                        : item.investmentValue}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => investmentDetails(item.repoId, item.investmentValue)} className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">
                                        <svg
                                            className="w-4 h-4 mr-1.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                            />
                                        </svg>
                                        Print
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
