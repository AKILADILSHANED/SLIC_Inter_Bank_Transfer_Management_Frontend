"use client"
import React, { useState } from 'react'

export default function PrintCashFlow() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [cashFlowDate, setCashflowtDate] = useState("");

    // Function to handle print cash flow
    const handlePrintCashFlow = (cashFlowDate) => {
        // Open new tab with cashflow details
        const newTab = window.open(`Printings/DisplayCashFlow?cashFlowDate=${cashFlowDate}`, '_blank');
        // Optional: focus on the new tab
        if (newTab) {
            newTab.focus();
        }
    }

    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Print Cash Flow
                </label>
            </div>
            <div className='shadow-md flex flex-row'>
                <div className='mt-4'>
                    <label
                        htmlFor="small"
                        className="mt-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                        Cash Flow Date:
                    </label>
                </div>
                <div className='mt-4'>
                    <input
                        type="date"
                        onChange={(e) => setCashflowtDate(e.target.value)}
                        required
                        id="small"
                        className="outline-none block w-[300px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div>
                    <button onClick={()=>handlePrintCashFlow(cashFlowDate)} type="submit" className="flex flex-row items-center mt-4 ml-2 justify-center gap-1 h-[30px] w-[80px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Display
                    </button>
                </div>
            </div>
        </div>
    )
}
