import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';
import { useEffect } from 'react';

export default function CheckTransfer() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [checkList, setCheckList] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //Define getTransferForChecking function;
    const getTransferForChecking = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transfers/get-check-list`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                setCheckList(response.responseObject);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }

    }
    useEffect(() => {
        getTransferForChecking();
    }, []);

    //Define checkTransfer function;
    const checkTransfer = async (transferId) => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transfers/check-transfer?transferId=${transferId}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                await getTransferForChecking();
                setSuccessMessage(response.message);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }
    }

    return (
        <div className='mt-4'>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Check Transfers
                </label>
            </div>
            {
                errorMessage && <ErrorMessage messageValue={errorMessage} />
            }
            <div>
            </div>
            {
                successMessage && <SUccessMessage messageValue={successMessage} />
            }
            <div>

            </div>
            <div className='shadow-md'>
                {
                    checkList &&
                    <table border="1" className='border border-blue-600 mt-4 ml-2'>
                        <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                            <tr>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Transfer ID</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Transfer Date</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>From Account</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>To Account</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Amount</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                checkList.map(
                                    (element) => (
                                        <tr key={element.transferId} border="1" className='border border-blue-600'>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.transferId}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.transferDate}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.fromAccount}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.toAccount}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm text-right'>
                                                {typeof element.transferAmount === "number"
                                                    ? element.transferAmount.toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })
                                                    : element.transferAmount}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => checkTransfer(element.transferId)}
                                                    className="flex flex-row items-center bg-green-500 hover:bg-green-600 text-white font-medium ml-3 mr-3 py-1 px-3 mt-2 mb-2 rounded-md text-xs transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                                                >
                                                    <svg className="w-6 h-6 mr-1 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    Check
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
