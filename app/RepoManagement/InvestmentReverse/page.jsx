"use client"
import React from 'react'
import SUccessMessage from '@/app/Messages/SuccessMessage/page'
import ErrorMessage from '@/app/Messages/ErrorMessage/page'
import { useState } from 'react'
import { useEffect } from 'react'

export default function InvestmentReverse() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables
    const [repoList, setRepoList] = useState([]);
    const [repoDetails, setRepoDetails] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(false);

    //Define showRepoDetails function;
    const showRepoDetails = async () => {
        setLoadingStatus(true);
        setErrorMessage("");
        setSuccessMessage("");
        setRepoDetails(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/display-invested-repo-details`,
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

    //Define initiateReversal function;
    const initiateReversal = async (repoId) => {
        try {
            setErrorMessage("");
            setSuccessMessage("");
            // Immediately remove the repo from the UI state
            setRepoList(prevList => prevList.filter(item => item.repoId !== repoId));
            const request = await fetch(
                `${baseUrl}/api/v1/repo/investment-reverse?repoId=${encodeURIComponent(repoId)}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );
            const response = await request.json();
            if (request.status === 200) {                
                showRepoDetails();                
                setSuccessMessage(response.message);
                setRepoDetails(false);
            } else if (request.status === 409) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!!");
        }

    }
    useEffect(() => {
        showRepoDetails();
    }, []);

    return (
        <div>
            <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                <label className="text-white text-lg ml-2 font-serif">
                    Investment Reverse
                </label>
            </div>
            {errorMessage && <ErrorMessage messageValue={errorMessage} />}
            {successMessage && <SUccessMessage messageValue={successMessage} />}

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
                                    <button onClick={() => initiateReversal(item.repoId)} className="flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors">
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6">
                                            </path>
                                        </svg>
                                        Reverse
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
