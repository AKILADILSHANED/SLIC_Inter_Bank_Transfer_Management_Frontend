import React from 'react'
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useState } from 'react';

export default function RepoAdjustments({ onCancel }) {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables
    const [textRepoId, setTextRepoId] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [adjustmentData, setAdjustmentData] = useState([]);
    const [adjustmentDataTable, setAdjustmentDataTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //Define getAdjustmentsData function;
    const getAdjustmentsData = async (e) => {
        e.preventDefault();
        setSpinner(true);
        setErrorMessage("");
        setAdjustmentDataTable(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/get-adjustments?repoId=${encodeURIComponent(textRepoId)}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                setAdjustmentData(response.responseObject);
                setAdjustmentDataTable(true);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setSpinner(false);
        }
    }

    return (
        <div>
            <div className="h-[120px] w-full shadow-md">
                <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                    <label className="text-white text-lg ml-2 font-serif">
                        Display Repo Adjustments
                    </label>
                </div>
                <form onSubmit={(e) => getAdjustmentsData(e)}>
                    <div className="flex flex-row items-center mt-5">
                        <label
                            htmlFor="small-input"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
                            Repo Id:
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setTextRepoId(e.target.value)}
                            value={textRepoId.toUpperCase()}
                            required
                            placeholder="Enter REPO ID"
                            id="small-input"
                            className="block ml-2 w-[450px] p-1 px-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            type='submit' className="ml-2 w-[100px] bg-blue-800 text-white hover:bg-blue-700 shadow-md rounded-4xl h-[35px] flex flex-row items-center justify-center">
                            {spinner && (
                                <div className="mr-1">
                                    <Spinner size={20}></Spinner>
                                </div>
                            )}
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {errorMessage && (
                <div className="mt-4">
                    <ErrorMessage messageValue={errorMessage} />
                </div>
            )}

            {adjustmentDataTable &&
                <div className='block text-lg font-semibold text-gray-800 mb-1 ml-4 mt-4'>
                    <label className='ml-2'>
                        REPO Adjustments for REPO Account {adjustmentData[0].repoId} - ({adjustmentData[0].bankAccount})
                    </label>
                    <div className="max-w-4xl mt-2  bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                <tr className="bg-blue-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Opening Balance</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                                        {(() => {
                                            const value = adjustmentData[0]?.openingBalance || 0;
                                            const formattedValue = new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(Math.abs(value));

                                            return value < 0 ? `(${formattedValue})` : formattedValue;
                                        })()}
                                    </td>
                                </tr>

                                {
                                    adjustmentData.map(
                                        (element) => (
                                            <tr key={element.adjustmentId} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{element.adjustmentId}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{element.remark}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${(element.adjustmentAmount || 0) < 0 ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {(() => {
                                                        const value = element.adjustmentAmount || 0;
                                                        const absValue = Math.abs(value);
                                                        const formatted = new Intl.NumberFormat('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        }).format(absValue);

                                                        return value < 0 ? `(${formatted})` : formatted;
                                                    })()}
                                                </td>
                                            </tr>
                                        )
                                    )

                                }

                                <tr className="bg-purple-50 border-t-2 border-purple-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Closing Balance</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-800 text-right">
                                        {(() => {
                                            const value = adjustmentData[0]?.closingBalance || 0;
                                            const absValue = Math.abs(value);
                                            const formatted = new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(absValue);

                                            return value < 0 ? `(${formatted})` : formatted;
                                        })()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}
