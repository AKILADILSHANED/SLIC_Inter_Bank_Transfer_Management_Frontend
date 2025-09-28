import React from 'react'
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useState } from 'react';


export default function TransferHistory({ onCancel }) {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [loadedChanel, setLoadedChanel] = useState([]);
    const [loadedFromAccount, setLoadedFromAccount] = useState([]);
    const [loadedToAccount, setLoadedToAccount] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [historyTable, setHistoryTable] = useState(false);
    const [viewSpinner, setViewSpinner] = useState(false);

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [chanel, setChanel] = useState("");
    const [fromAccount, setfromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [historyData, setHistoryData] = useState([]);


    //Define loadChanel function;
    const loadChanel = async () => {
        try {
            const request = await fetch(`${baseUrl}/api/v1/channel/getChanel`, {
                method: "GET",
                credentials: "include",
            });
            if (request.ok) {
                const response = await request.json();
                setLoadedChanel(response.responseObject);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }
    };
    useEffect(() => {
        loadChanel();
    }, []);

    //Define loadFromAccount function;
    const loadFromAccount = async () => {
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
                    setLoadedFromAccount(response.responseObject);
                }
            } else {
                setErrorMessage("Unabel to fetch From Bank Account list!");
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred! Please contact administrator!");
        }
    };
    useEffect(() => {
        loadFromAccount();
    }, []);


    //Define loadToAccount function;
    const loadToAccount = async () => {
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
                    setLoadedToAccount(response.responseObject);
                }
            } else {
                setErrorMessage("Unabel to fetch From Bank Account list!");
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred! Please contact administrator!");
        }
    };
    useEffect(() => {
        loadToAccount();
    }, []);



    //Define handleGetTransferHistory function;

    const handleGetTransferHistory = async (e) => {
        e.preventDefault()
        try {
            setErrorMessage("");
            setViewSpinner(true);
            setHistoryTable(false);

            const request = await fetch(
                `${baseUrl}/api/v1/reports/transferHistory?fromDate=${fromDate}&toDate=${toDate}&fromAccount=${fromAccount}&toAccount=${toAccount}&chanel=${chanel}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setHistoryData(response.responseObject)
                setHistoryTable(true);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact the administrator!");
        } finally {
            setViewSpinner(false);
        }

    }

    return (
        <div className='mt-4'>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Fund Transfer History
                </label>
            </div>
            <form onSubmit={(e) => handleGetTransferHistory(e)} className='border-none shadow-md py-5'>
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
                                    From Account:
                                </label>
                                <select
                                    id="small"
                                    placeholder="Enter Payment Name"
                                    onChange={(e) => setfromAccount(e.target.value)}
                                    value={fromAccount}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option key={0} value={""}>
                                        - All Accounts -
                                    </option>
                                    {
                                        loadedFromAccount.map(
                                            (element) => (
                                                <option key={element.accountId} value={element.accountNumber}>
                                                    {element.accountNumber}
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
                                To Account:
                            </label>
                            <select
                                id="small"
                                placeholder="Enter Payment Name"
                                onChange={(e) => setToAccount(e.target.value)}
                                value={toAccount}
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option key={0} value={""}>
                                    - All Accounts -
                                </option>
                                {
                                    loadedToAccount.map(
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
                                    Chanel Type:

                                </label>
                                <select
                                    id="small"
                                    placeholder="Enter Payment Name"
                                    onChange={(e) => setChanel(e.target.value)}
                                    value={chanel}
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option key={0} value={""}>
                                        - All Chanels -
                                    </option>
                                    {
                                        loadedChanel.map(
                                            (element) => (
                                                <option key={element.channelId} value={element.channelType}>
                                                    {element.channelType}
                                                </option>
                                            )
                                        )}
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
                        <div className='flex flex-row gap-2'>
                            <div>
                                <button onClick={onCancel} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {errorMessage && <ErrorMessage messageValue={errorMessage} />}

            {historyTable && <div>
                <table border="1" className='border border-blue-600 mt-4 ml-2'>
                    <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                        <tr>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Transfer ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Transfer Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Transfer Amount</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Chanel</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>From Account</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>To Account</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>From Repo</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>To Repo</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Initiated By</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Approve Status</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            historyData.map(
                                (element) => (
                                    <tr key={element.transferId} border="1" className='border border-blue-600'>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.transferId}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.transferDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                            {typeof element.transferAmount === "number"
                                                ? element.transferAmount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.requestAmount}
                                        </td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.chanel}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.fromAccount}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.toAccount}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.fromRepo}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.toRepo}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.initiatedBy}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.approveStatus}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}
