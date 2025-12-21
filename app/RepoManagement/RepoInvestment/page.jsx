"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';

export default function RepoInvestment() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables
    const [repoList, setRepoList] = useState([]);
    const [repoId, setRepoId] = useState("");
    const [investmentValue, setInvestmentValue] = useState("");
    const [repoDetails, setRepoDetails] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [selectedFromDate, setSelectedFromDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [repoFromDate, setRepoFromDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [selectedToDate, setSelectedToDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [repoToDate, setRepoToDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [rate, setRate] = useState("");
    const [method, setMethod] = useState("");
    const [maturityValue, setMaturityValue] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");

    //Define showRepoDetails function;
    const showRepoDetails = async () => {
        setLoadingStatus(true);
        setErrorMessage("");
        setSuccessMessage("");
        setRepoDetails(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/display-repo-details`,
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

    //Define investmentDetails function;
    const investmentDetails = (repoId, investValue) => {
        setErrorMessage("");
        setMaturityValue("");
        setMethod("");
        setRate("");
        setNumberOfDays("");
        setSuccessMessage("");
        // Immediately remove the repo from the UI state
        setRepoList(prevList => prevList.filter(item => item.repoId !== repoId));
        try {
            if (investValue <= 0) {
                setRepoDetails(false);
                setErrorMessage("Not enough value to invest under this Repo ID: " + repoId);
            } else {
                setRepoDetails(false);
                setRepoId(repoId);
                setInvestmentValue(investValue);
                setRepoDetails(true);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }
    }

    //Define maturityCalculation method;
    const maturityCalculation = (investValue, fromDate, toDate, interestRate, method) => {
        setErrorMessage("");
        setMaturityValue(""); // Set to empty string instead of false

        // Validate inputs
        if (!investValue || !fromDate || !toDate || !interestRate || method === undefined || method === "") {
            setErrorMessage("Please fill all required fields");
            return;
        }

        try {
            // Convert dates from string to Date objects
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);

            // Calculate difference in days
            const timeDiff = toDateObj.getTime() - fromDateObj.getTime();
            const numDays = timeDiff / (1000 * 3600 * 24);

            // Parse values to numbers
            const investVal = parseFloat(investValue);
            const rate = parseFloat(interestRate);

            if (isNaN(investVal) || isNaN(rate) || isNaN(numDays)) {
                setErrorMessage("Invalid input values");
                return;
            }

            let interest;
            if (method === "0") {
                interest = ((investVal / 100) * rate / 364) * numDays;
                setNumberOfDays(numDays);
            } else {
                interest = ((investVal / 100) * rate / 365) * numDays;
                setNumberOfDays(numDays);
            }

            const maturity = investVal + interest;

            // Format the maturity value
            setMaturityValue(maturity.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }));

        } catch (error) {
            setErrorMessage("Error in calculation: " + error.message);
            setMaturityValue("");
        }
    }

    //Define initiateInvestment function;
    const initiateInvestment = async(repoId, repoToDate, rate, method, maturityValue) => {
        setErrorMessage("");
        setSuccessMessage("");
        // Immediately remove the repo from the UI state
        setRepoList(prevList => prevList.filter(item => item.repoId !== repoId));
        const request = await fetch(
            `${baseUrl}/api/v1/repo/invest-repo?repoId=${encodeURIComponent(repoId)}&toDate=${encodeURIComponent(repoToDate)}&rate=${encodeURIComponent(rate)}&method=${encodeURIComponent(method)}&maturityValue=${encodeURIComponent(maturityValue.replace(/,/g, ''))}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
        );
        const response = await request.json();
        if(request.status === 200){
            setTimeout(() => {
                    showRepoDetails();
                }, 500);
            setSuccessMessage(response.message);
            setRepoDetails(false);
        }else if (request.status === 409){
            errorMessage(response.message);
        }else{
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
                    Invest Repo
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
                                    <button onClick={() => investmentDetails(item.repoId, item.investmentValue)} className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors">
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        Invest
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {repoDetails && <div>
                <div className="bg-slate-500 my-4 h-[30px] flex flex-row items-center">
                    <label className="text-white text-lg ml-2 font-serif">
                        Please provide investment details below for Repo ID: {repoId}
                    </label>
                </div>
                <table border="1" className='border border-blue-600 mt-4 ml-2'>
                    <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                        <tr>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Repo ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Value</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>From Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>To Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Interest Rate (%)</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Calculation Method</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Maturity Value</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr border="1" className='border border-blue-600'>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{repoId}</td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                {typeof investmentValue === "number"
                                    ? investmentValue.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                    : investmentValue}
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                <input
                                    type="date"
                                    required
                                    id="small"
                                    readOnly
                                    defaultValue={selectedFromDate}
                                    onChange={(e) => setRepoFromDate(e.target.value)}
                                    className="outline-none block w-[130px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                <input
                                    type="date"
                                    required
                                    id="small"
                                    defaultValue={selectedToDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setRepoToDate(e.target.value)}
                                    className="outline-none block w-[130px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                <input
                                    type="text"
                                    onKeyPress={(e) => {
                                        // Only allow numbers (0-9) and decimal point (.)
                                        if (!/[0-9.]/.test(e.key)) {
                                            e.preventDefault();
                                            return;
                                        }

                                        // Prevent multiple decimal points
                                        if (e.key === '.' && e.target.value.includes('.')) {
                                            e.preventDefault();
                                        }
                                    }}
                                    required
                                    id="small"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="outline-none block w-[70px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                <select
                                    required
                                    value={method}
                                    id="small"
                                    onChange={(e) => setMethod(e.target.value)}
                                    className="outline-none block w-[200px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>- Select Method -</option>
                                    <option value={0}>Actual *364</option>
                                    <option value={1}>Actual *365</option>
                                </select>
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                {maturityValue &&
                                    <label>{maturityValue}</label>
                                }
                            </td>
                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                <button onClick={() => maturityCalculation(investmentValue, repoFromDate, repoToDate, rate, method)} className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                                    Calculate
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {numberOfDays && <label className='ml-2 mt-2 text-md text-green-600 font-medium'>Total Number of days: {numberOfDays}</label>}
                {maturityValue && <div>
                    <button onClick={()=>initiateInvestment(repoId, repoToDate, rate, method, maturityValue)} className="flex items-center mt-1 ml-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                        Initiate Investment
                    </button>
                </div>}
            </div>
            }
        </div>
    )
}
