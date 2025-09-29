"use client"
import React from 'react'
import Spinner from '@/app/Spinner/page'
import { useState } from 'react';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function ReverseTransfers() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [viewSpinner, setViewSpinner] = useState(false);
    const [reverseSpinner, setReverseSpinner] = useState(false);
    const [transferDataTable, settransferDataTable] = useState(false);
    const [transferData, setTransferData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [transferDate, setTransferDate] = useState("");

    //Define viewTransferData function;
    const viewTransferData = async (e) => {
        e.preventDefault();
        setSuccessMessage(false);
        setErrorMessage(false);
        try {
            setViewSpinner(true)
            setErrorMessage("");
            settransferDataTable(false);

            const request = await fetch(
                `${baseUrl}/api/v1/transfers/reverse-transfers?transferDate=${encodeURIComponent(transferDate)}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                settransferDataTable(true);
                setTransferData(response.responseObject);
            }

        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setViewSpinner(false)
        }
    }

    //Define handleReverseTransfer function;
    const handleReverseTransfer = async (transferId) => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transfers/update-reversal?transferId=${transferId}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setSuccessMessage(response.message);
                settransferDataTable(false);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }
    }

    //Define handleReverseAllTransfers function;
    const handleReverseAllTransfers = async (e, transferDate) => {
        e.preventDefault(false);
        setErrorMessage("")
        setSuccessMessage("");
        try {
            setReverseSpinner(true);
            const request = await fetch(
                `${baseUrl}/api/v1/transfers/reverse-all?transferDate=${transferDate}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setSuccessMessage(response.message);
                settransferDataTable(false);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        }finally{
            setReverseSpinner(false);
        }
    }

    return (
        <div className='mt-4'>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Reverse Transfers
                </label>
            </div>

            <div className='shadow-md h-[80px]'>
                <form>
                    <div className='mt-6 flex flex-row'>
                        <label
                            htmlFor="small"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                            Transfer Date:
                        </label>
                        <input
                            onChange={(e) => setTransferDate(e.target.value)}
                            id="small"
                            type="date"
                            value={transferDate}
                            placeholder="Enter Transfer ID"
                            required
                            className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        <div>
                            <button
                                onClick={(e) => viewTransferData(e)}
                                type="button"
                                className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                {viewSpinner && <Spinner size={20} />}
                                <label>Search</label>
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={(e) => handleReverseAllTransfers(e, transferDate)}
                                type="submit"
                                className="border shadow-md flex flex-row ml-2 gap-0.5 h-[30px] text-sm items-center justify-center w-[120px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
                                {reverseSpinner && <Spinner size={20} />}
                                <label>Reverse All</label>
                            </button>
                        </div>
                    </div>
                </form>

            </div>

            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>

            {
                transferDataTable &&

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Transfer ID
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    From Account
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    To Account
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Channel
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    From Repo
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    To Repo
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Initiated By
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transferData.map((element) => (
                                    <tr key={element.transferId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {element.transferId}
                                        </th>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.fromAccount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.toAccount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {typeof element.transferAmount === "number"
                                                ? element.transferAmount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.balanceAmount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.channel}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.fromRepo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.toRepo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.initiatedBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                                            <button onClick={() => handleReverseTransfer(element.transferId)} type="button" className="text-red-700 shadow-md h-[30px] w-[80px] hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-md text-md  text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">Reverse</button>
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
