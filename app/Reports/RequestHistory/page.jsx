"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';

export default function RequestHistory({ onCancel }) {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [loadedPayments, setLoadedPayments] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [historyTable, setHistoryTable] = useState(false);
    const [viewSpinner, setViewSpinner] = useState(false);

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [paymentType, setPaymentType] = useState(1);
    const [historyData, setHistoryData] = useState([]);


    //Define loadPayments function;
    const loadPaymentList = async () => {
        try {
            const request = await fetch(`${baseUrl}/api/v1/payment/getPaymentList`, {
                method: "GET",
                credentials: "include",
            });
            if (request.ok) {
                const response = await request.json();
                if (response.success == false) {
                    setErrorMessage(response.message);
                } else {
                    setLoadedPayments(response.responseObject);
                }
            } else {
                setLoadedPayments("No response from server!");
            }
        } catch (error) {
            setLoadedPayments("Un-expected error occurred. Please contact administrator!");
        }
    };
    useEffect(() => {
        loadPaymentList();
    }, []);


    //Define handleGetRequestHistory function;

    const handleGetRequestHistory = async (e) => {
        e.preventDefault()
        try {
            setErrorMessage("");
            setViewSpinner(true);
            setHistoryTable(false);
            const request = await fetch(
                `${baseUrl}/api/v1/reports/fundRequestHistory?fromDate=${fromDate}&toDate=${toDate}&paymentId=${paymentType}`,
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
                    Fund Request History
                </label>
            </div>
            <form onSubmit={(e) => handleGetRequestHistory(e)} className='border-none shadow-md py-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    From Required Date:
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
                                To Required Date:
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
                        <div className='flex flex-row gap-5'>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="mb-2 flex flex-row text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Payment Type:

                                </label>
                                <select
                                    id="small"
                                    placeholder="Enter Payment Name"
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    value={paymentType}
                                    required
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option key={0} value={1}>
                                        - All Payments -
                                    </option>
                                    {
                                        loadedPayments.map(
                                            (element) => (
                                                <option key={element.paymentId} value={element.paymentId}>
                                                    {element.paymentType}
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
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Request ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Request Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Required Date</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Amount</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account Number</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Payment Type</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Approve Status</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Request User</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            historyData.map(
                                (element) => (
                                    <tr key={element.requestId} border="1" className='border border-blue-600'>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.requestId}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.requestDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.requiredDate}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                            {typeof element.requestAmount === "number"
                                                ? element.requestAmount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.requestAmount}
                                        </td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.accountNumber}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.paymentType}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.approveStatus}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.requestBy}</td>
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
