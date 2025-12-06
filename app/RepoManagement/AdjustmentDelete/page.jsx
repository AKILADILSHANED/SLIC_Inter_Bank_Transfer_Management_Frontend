"use client"
import React from 'react'
import { useState } from 'react';
import Spinner from '@/app/Spinner/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';

export default function AdjustmentDelete() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [adjustmentId, setAdjustmentId] = useState("");
    const [adjustmentDetails, setAdjustmentDetails] = useState([]);
    const [adjustmentDetailsComponent, setAdjustmentDetailsComponent] = useState(false);
    const [viewSinner, setViewSinner] = useState(false);
    const [deleteSinner, setDeleteSinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    //Define handleView function;
    const handleView = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setViewSinner(true);
        setAdjustmentDetailsComponent(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/get-adjustment-details?adjustmentId=${adjustmentId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                setAdjustmentDetails(response.responseObject);
                setAdjustmentDetailsComponent(true);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error + ":Un-expected error occurred. Please contact administrator!");
        } finally {
            setViewSinner(false);
        }
    }

    //Define handleDelete function;
    const handleDelete = async () => {
        setDeleteSinner(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/delete-adjustment?adjustmentId=${adjustmentId}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                setSuccessMessage(response.message);
            } else if (request.status == 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage(error + ":Un-expected error occurred. Please contact administrator!");
        } finally {
            setDeleteSinner(false);
        }
    }

    return (
        <div>
            <div className="h-[120px] w-full shadow-md">
                <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                    <label className="text-white text-lg ml-2 font-serif">
                        Adjustment Delete
                    </label>
                </div>

                <form onSubmit={(e) => handleView(e)}>
                    <div className="flex flex-row items-center mt-5">
                        <label
                            htmlFor="small-input"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
                            Cross Adjustment ID:
                        </label>
                        <input
                            onChange={(e) => setAdjustmentId(e.target.value)}
                            id="small"
                            type="text"
                            placeholder="Enter Adjustment ID"
                            required
                            className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        <div className='flex flex-row gap-1'>
                            <div>
                                <button
                                    type="submit"
                                    className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                    {viewSinner && <Spinner size={20} />}
                                    <label>View</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {adjustmentDetailsComponent &&
                <div className="p-4">
                    <table className="w-full border border-gray-300">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Cross Adjustment ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Adjustment Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Status</th>                                
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {
                                adjustmentDetails.map((element) => (
                                    <tr key={element.adjustmentId}>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{element.adjustmentId}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{element.adjustmentDate}</td>
                                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{element.status}</td>                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button onClick={() => handleDelete()} className="bg-red-600 mt-3 hover:bg-red-700 text-white w-[100px] p-2 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-xs whitespace-nowrap">
                        {deleteSinner && <Spinner size={20} />}
                        <label>Delete</label>
                    </button>
                </div>

            }
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
        </div>
    )
}
