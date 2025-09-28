import ErrorMessage from '@/app/Messages/ErrorMessage/page'
import SUccessMessage from '@/app/Messages/SuccessMessage/page'
import React, { useState } from 'react'
import Spinner from '@/app/Spinner/page';

export default function NewTransfers() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define states;
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [transferSpinner, setTransferSpinner] = useState(false);
    const [isInitiating, setIsInitiating] = useState(false);

    //Define handleInitiateTransfers function;
    const handleInitiateTransfers = async () => {
        setSuccessMessage(false);
        setErrorMessage(false);
        setTransferSpinner(true);
        setIsInitiating(true);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transfers/initiate-transfers`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setSuccessMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setTransferSpinner(false);
            setIsInitiating(false);
        }

    }

    return (
        <div className='mt-4'>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Initiate New Transfers
                </label>
            </div>

            <div className='mt-4'>
                <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                    <div className="flex items-center">
                        <svg className="shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <h3 className="text-lg font-medium">Important Information</h3>
                    </div>
                    <div className="mt-2 mb-4 text-sm">
                        <p className="font-semibold mb-1">Before initiating transfers, please ensure the following requirements are met:</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>
                                <span className="font-medium">Fund Request Approval:</span> Only properly approved Fund Requests will result in funds being transferred. Funds will not be transferred for pending Fund Requests.
                            </li>
                            <li>
                                <span className="font-medium">Accurate Account Balances:</span> Ensure that account balances are correctly entered for all relevant bank accounts. Incorrect balances will lead to inaccurate transfers.
                            </li>
                            <li>
                                <span className="font-medium">Current Repo Details:</span> All Repo details for the current date must be inserted using the "Repo Management" option.
                            </li>
                        </ul>
                    </div>
                    <div className="flex">
                        <button onClick={()=>handleInitiateTransfers()} type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {isInitiating ? (
                                <>
                                    <Spinner size={16} className="mr-2" />
                                    Initiating...
                                </>
                            ) : (
                                <>
                                    <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                    I confirm and Initiate
                                </>
                            )}

                        </button>
                    </div>
                </div>

                {errorMessage && <div><ErrorMessage messageValue={errorMessage}/></div>}
                {successMessage && <div><SUccessMessage messageValue={successMessage}/></div>}

            </div>
        </div>
    )
}
