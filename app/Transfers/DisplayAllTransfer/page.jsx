"use client"
import React from 'react'
import Spinner from '@/app/Spinner/page'
import { useState } from 'react';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';


export default function DisplayAllTransfer() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [viewSpinner, setViewSpinner] = useState(false);
    const [transferDataTable, settransferDataTable] = useState(false);
    const [transferData, setTransferData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [transferDate, setTransferDate] = useState("");

    //Define viewTransferData function;
    const viewTransferData = async (e) => {
        e.preventDefault();
        try {
            setViewSpinner(true)
            setErrorMessage("");
            settransferDataTable(false);

            const request = await fetch(
                `${baseUrl}/api/v1/transfers/get-all-transfers?transferDate=${encodeURIComponent(transferDate)}`,
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

    return (
        <div className='mt-4'>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Display All Transfers
                </label>
            </div>

            <div className='shadow-md h-[60px]'>
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
                                type="submit"
                                className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                {viewSpinner && <Spinner size={20} />}
                                <label>Search</label>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>

            {
                transferDataTable && (
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
                                        Initiated Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Checked Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Checked By
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Checked Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Approve Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Approved By
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Approved Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Is Reversed
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Reversed By
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Cross Adjustment ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transferData.map((element) => (
                                    <tr
                                        key={element.transferId}
                                        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 ${element.isReversed === 'Reversed' ? 'text-red-300 dark:text-red-100' : ''
                                            }`}
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.initiatedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.checkedStatus}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.checkedBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.checkedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.approveStatus}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.approvedBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.approveDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.isReversed}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.reversedBy}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {element.crossAdjustment}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}
