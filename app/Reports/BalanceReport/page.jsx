"use client"
import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';

export default function BalanceReport() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [balanceReport, setBalanceReport] = useState(false);
    const [balanceDetails, setBalanceDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadedAccounts, setLoadedAccount] = useState([]);
    const [loadedBanks, setLoadedBanks] = useState([]);
    const [viewSpinner, setViewSpinner] = useState(false);


    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [bankName, setBankName] = useState("");
    const [account, setAccount] = useState("");
    const [status, setStatus] = useState("");

    //Define getBalanceData function;
    const getBalanceData = async (e) => {
        e.preventDefault()
        setBalanceReport(false);
        setErrorMessage("");
        setViewSpinner(true);
        try {
            const request = await fetch(`${baseUrl}/api/v1/reports/get-balance-report?fromDate=${fromDate}&toDate=${toDate}&bankName=${bankName}&account=${account}&status=${status}`, {
                method: "GET",
                credentials: "include",
            });
            const response = await request.json();
            if (request.status === 200) {
                setBalanceReport(true);
                setBalanceDetails(response.responseObject);
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

    //Define loadBanks function;
    const loadBanks = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/bank/bank-list`,
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
                    setLoadedBanks(response.responseObject);
                }
            } else {
                setErrorMessage("Unabel to fetch Bank list!");
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred! Please contact administrator!");
        }
    };


    useEffect(() => {
        loadAccounts();
        loadBanks();
    }, []);


    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Account Balances
                </label>
            </div>
            {errorMessage && <ErrorMessage messageValue={errorMessage} />}


            <form onSubmit={(e) => getBalanceData(e)} className='border-none shadow-md py-5'>
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
                                    placeholder="Enter Request Amount"
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
                                placeholder="Enter Request Amount"
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Bank:
                                </label>
                                <select
                                    id="small"
                                    placeholder="Enter Payment Name"
                                    onChange={(e) => setBankName(e.target.value)}
                                    value={bankName}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option key={0} value={""}>
                                        - All Banks -
                                    </option>
                                    {
                                        loadedBanks.map(
                                            (element) => (
                                                <option key={element.bankId} value={element.bankName}>
                                                    {element.bankName}
                                                </option>
                                            )
                                        )}

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
                                onChange={(e) => setAccount(e.target.value)}
                                value={account}
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
                        <div className='flex flex-row gap-5'>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="mb-2 flex flex-row text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Status:

                                </label>
                                <select
                                    id="small"
                                    placeholder="Enter Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
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
                balanceReport &&
                <table border="1" className='border border-blue-600 mt-4 ml-2'>
                    <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                        <tr>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Balance ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Balance Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Bank</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Branch</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account Number</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Balance</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Status</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Deleted By</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Enter By</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            balanceDetails.map(
                                (element) => (
                                    <tr key={element.balanceId} border="1" className='border border-blue-600'>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.balanceId}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.balanceDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.bank}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.branch}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.account}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                            {typeof element.amount === "number"
                                                ? element.amount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.amount}
                                        </td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.status}</td>
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
