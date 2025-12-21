"use client"
import React from 'react'
import Spinner from '@/app/Spinner/page'
import { useState } from 'react';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';

export default function Voucher() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [viewSpinner, setViewSpinner] = useState(false);
    const [sheetDate, setSheetDate] = useState("");
    const [sheetData, setSheetData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [sheetDataTable, setSheetDataTable] = useState();

    //Define getSheetData function;
    const getSheetData = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSheetDataTable(false);
        setViewSpinner(true);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/printing/getTransferList?transferDate=${sheetDate}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                setSheetDataTable(true);
                setSheetData(response.responseObject);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
                setSheetDataTable(false);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
            setSheetDataTable(false);
        } finally {
            setViewSpinner(false);
        }
    }

    // Function to handle print voucher
    const handlePrintVoucher = (voucherId) => {
        // Open new tab with voucher details
        const newTab = window.open(`/Printings/DisplayVoucher?voucherId=${voucherId}`, '_blank');        
        // Optional: focus on the new tab
        if (newTab) {
            newTab.focus();
        }
    }

    // Function to handle print ibt letter
    const handlePrintLetter = (voucherId) => {
        // Open new tab with voucher details
        const newTab = window.open(`/Printings/DisplayIBTLtter?voucherId=${voucherId}`, '_blank');        
        // Optional: focus on the new tab
        if (newTab) {
            newTab.focus();
        }
    }

    // Function to handle print rtgs letter
    const handlePrintRtgsLetter = (voucherId) => {
        // Open new tab with voucher details
        const newTab = window.open(`/Printings/DisplayRTGSLetter?voucherId=${voucherId}`, '_blank');        
        // Optional: focus on the new tab
        if (newTab) {
            newTab.focus();
        }
    }

    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Print Vouchers
                </label>
            </div>
            <form onSubmit={(e) => getSheetData(e)}>
                <div className='shadow-md p-4 flex flex-col'>
                    <div className='flex flex-row gap-1'>
                        <div>
                            <label
                                htmlFor="small"
                                className="mt-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Transfer Date:
                            </label>
                        </div>
                        <div>
                            <input
                                type="date"
                                onChange={(e) => setSheetDate(e.target.value)}
                                required
                                id="small"
                                className="outline-none block w-[300px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                        <div>
                            <button type="submit" className="flex flex-row items-center justify-center gap-1 h-[30px] w-[80px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {viewSpinner && <Spinner size={20} />}
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div>
                {errorMessage && <ErrorMessage messageValue={errorMessage} />}
            </div>
            <br />
            {/* Data Table Section */}
            {sheetDataTable && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Transfer Data
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table id="ibt-sheet-table" className="min-w-full border border-blue-600 table-fixed">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-24">Voucher No</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-40">From Bank</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-32">From Account</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-40">To Bank</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-32">To Account</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-28">Amount</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-24">Channel</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-32">RTGS Letters</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-32">Letters</th>
                                    <th className="border border-blue-600 text-sm px-2 py-3 font-semibold text-gray-700 text-left whitespace-nowrap w-36">Vouchers</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sheetData.map((element) => (
                                    <tr key={element.transferId} className="hover:bg-gray-50 transition duration-150">
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap truncate">{element.transferId}</td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap truncate">{element.fromBank}</td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap truncate">{element.fromAccount}</td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap truncate">{element.toBank}</td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap truncate">{element.toAccount}</td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 text-right whitespace-nowrap">
                                            {typeof element.transferAmount === "number"
                                                ? element.transferAmount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.requestAmount}
                                        </td>
                                        <td className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap">{element.channel}</td>
                                        
                                        <td onClick={()=>handlePrintRtgsLetter(element.transferId)} className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap">
                                            <button className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs whitespace-nowrap">
                                                Print RTGS Letter
                                            </button>
                                        </td>
                                        <td onClick={()=>handlePrintLetter(element.transferId)} className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap">
                                            <button className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs whitespace-nowrap">
                                                Print Letter
                                            </button>
                                        </td>
                                        <td onClick={() => handlePrintVoucher(element.transferId)} className="border border-blue-600 text-sm px-2 py-2 text-gray-600 whitespace-nowrap">
                                            <button className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-xs whitespace-nowrap">
                                                Print Voucher
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}