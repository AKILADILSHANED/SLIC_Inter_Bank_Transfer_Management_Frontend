"use client"
import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';

export default function RepoReport() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [repoReport, setRepoReport] = useState(false);
    const [repoDetails, setRepoDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const [loadedAccounts, setLoadedAccount] = useState([]);
    const [viewSpinner, setViewSpinner] = useState(false);


    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [repoType, setRepoType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [investStatus, setInvestStatus] = useState("");
    const [deleteStatus, setDeleteStatus] = useState("");

    //Define getRepoData function;
    const getRepoData = async (e) => {
        e.preventDefault()
        setRepoReport(false);
        setErrorMessage("");
        setViewSpinner(true);
        try {
            const request = await fetch(`${baseUrl}/api/v1/reports/get-repo-report?fromDate=${fromDate}&toDate=${toDate}&repoType=${repoType}&accountNumber=${accountNumber}&investStatus=${investStatus}&deleteStatus=${deleteStatus}`, {
                method: "GET",
                credentials: "include",
            });
            const response = await request.json();
            if (request.status === 200) {
                setRepoReport(true);
                setRepoDetails(response.responseObject);
            } else if (request.status === 409) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setViewSpinner(false);
        }
    }

    //Define loadAccounts function;
    const loadAccounts = async () => {
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
                    setLoadedAccount(response.responseObject);
                }
            } else {
                setErrorMessage("Unabel to fetch From Bank Account list!");
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred! Please contact administrator!");
        }
    };

    useEffect(() => {
        loadAccounts();
    }, []);

    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Repos
                </label>
            </div>

            {errorMessage && <ErrorMessage messageValue={errorMessage} />}

            <form onSubmit={(e) => getRepoData(e)} className='border-none shadow-md py-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    From Date:
                                </label>
                                <input
                                    type="date"
                                    required
                                    onChange={(e) => setFromDate(e.target.value)}
                                    id="small"
                                    placeholder="Select From Date"
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                To Date:
                            </label>
                            <input
                                type="date"
                                required
                                onChange={(e) => setToDate(e.target.value)}
                                id="small"
                                placeholder="Select To Date"
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Repo Type:
                                </label>
                                <select
                                    id="small"
                                    placeholder="Select Repo Type"
                                    onChange={(e) => setRepoType(e.target.value)}
                                    value={repoType}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>
                                        - All -
                                    </option>

                                    <option value={"1"}>
                                        Par
                                    </option>

                                    <option value={"2"}>
                                        Non-Par
                                    </option>

                                    <option value={"3"}>
                                        TR
                                    </option>

                                    <option value={"4"}>
                                        Excess
                                    </option>

                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Bank Account
                            </label>
                            <select
                                id="small"
                                placeholder="Enter Payment Name"
                                onChange={(e) => setAccountNumber(e.target.value)}
                                value={accountNumber}
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option key={0} value={""}>
                                    - All Accounts -
                                </option>
                                {
                                    loadedAccounts.map(
                                        (element) => (
                                            <option key={element.accountId} value={element.accountNumber}>
                                                {element.accountNumber}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                    </div>


                    <div className='flex flex-row gap-5'>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Investment Status:
                                </label>
                                <select
                                    id="small"
                                    placeholder="Select Investment Status"
                                    onChange={(e) => setInvestStatus(e.target.value)}
                                    value={investStatus}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>
                                        - All -
                                    </option>

                                    <option value={"1"}>
                                        Invested
                                    </option>

                                    <option value={"0"}>
                                        Not-Invested
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Delete Status:
                                </label>
                                <select
                                    id="small"
                                    placeholder="Select Delete Status"
                                    onChange={(e) => setDeleteStatus(e.target.value)}
                                    value={deleteStatus}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>
                                        - All -
                                    </option>

                                    <option value={"0"}>
                                        Active
                                    </option>

                                    <option value={"1"}>
                                        Deleted
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                    <div className='flex flex-row gap-1'>
                        <div className='gap-5 ml-2'>
                            <div>
                                <button type="submit" className="gap-1 w-[60px] h-[32px] items-center justify-center flex flex-row className='flex flex-row'px-4 py-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {viewSpinner && <Spinner size={20} />}
                                    <label>View</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {
                repoReport &&
                <table border="1" className='border border-blue-600 mt-4 ml-2'>
                    <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                        <tr>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Repo ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Created Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Invested Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Maturity Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account Number</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Opening Balance</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Maturity Value</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Repo Type</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Interest Rate</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Investment Status</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Method</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Delete Status</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Deleted By</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Enter By</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            repoDetails.map(
                                (element) => (
                                    <tr key={element.repoId} border="1" className='border border-blue-600'>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.repoId}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.createdDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.investedDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.maturityDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.account}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                            {typeof element.openingBalance === "number"
                                                ? element.openingBalance.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.openingBalance}
                                        </td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                            {typeof element.maturityValue === "number"
                                                ? element.maturityValue.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.maturityValue}
                                        </td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.repoType}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.interestRate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.investmentStatus}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.calculationMethod}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.deleteStatus}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.deletedBy}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.enterBy}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
