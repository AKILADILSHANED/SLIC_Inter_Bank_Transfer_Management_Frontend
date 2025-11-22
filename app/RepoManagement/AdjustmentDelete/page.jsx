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
    const [viewSinner, setViewSinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    return (
        <div className="h-[120px] w-full shadow-md">
            <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                <label className="text-white text-lg ml-2 font-serif">
                    Adjustment Delete
                </label>
            </div>

            <form>
                <div className="flex flex-row items-center mt-5">
                    <label
                        htmlFor="small-input"
                        className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
                        Adjustment ID:
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

            <div >

            </div>

            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
        </div>
    )
}
