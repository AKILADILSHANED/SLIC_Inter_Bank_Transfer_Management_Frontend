"use client"
import React, { useEffect } from 'react'
import Spinner from '@/app/Spinner/page';
import { useState } from 'react';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function CreateNewRepo({ onCancel }) {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [saveSpinner, setSaveSpinner] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [bankAccountList, setBankAccountList] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");
    const [repoType, setRepoType] = useState("");
    const [repoValue, setRepoValue] = useState("");
    const [eligibility, setEligibility] = useState("0");

    //Define getBankAccount function;
    const getBankAccount = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/bank-account/getBankAccounts`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (request.ok) {
                const response = await request.json();
                if (response.success == false) {
                    setErrorMessage(response.message);
                } else {
                    setBankAccountList(response.responseObject);
                }
            } else {
                setErrorMessage(
                    "Unable to load Account Numbers. Please contact administrator!"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Un-expected error occurred. Please contact administrator!"
            );
        }
    };

    useEffect(() => {
        getBankAccount();
    }, []);

    //define handleKeyDown function; This will be restricted typing minus values in the text box;
    const handleKeyDown = (e) => {
        if (e.key === "-") {
            e.preventDefault();
        } else {
            //No code block to be run;
        }
    }

    //Define handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaveSpinner(true);
            setErrorMessage(false);
            setSuccessMessage(false);

            const request = await fetch(
                `${baseUrl}/api/v1/repo/create-new-repo`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(
                        {
                            accountID: accountNumber,
                            repoType: repoType,
                            repoValue: repoValue,
                            eligibility: eligibility
                        }
                    )
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
            setSaveSpinner(false);
        }
    }

    return (
        <div className="mt-4">
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Create New REPO Investment
                </label>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='border-none shadow-md py-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Bank Account Number:
                            </label>
                            <select
                                id="small"
                                placeholder="Enter Payment Name"
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""}>- Select Account Number -</option>
                                {
                                    bankAccountList.map((element) => (
                                        <option key={element.accountId} value={element.accountId}>{element.accountNumber}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Repo Type:
                            </label>
                            <select
                                onChange={(e) => setRepoType(e.target.value)}
                                id="small"
                                placeholder="Enter Payment Name"
                                required
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""}>- Select Repo Type -</option>
                                <option value={1}>PAR</option>
                                <option value={2}>NON-PAR</option>
                                <option value={3}>TR</option>
                                <option value={4}>Excess</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Repo Value:
                            </label>
                            <input
                                onChange={(e) => setRepoValue(e.target.value)}
                                value={repoValue}
                                id="small"
                                type="number"
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Repo Value"
                                required
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>

                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Investment Value:
                            </label>
                            <input
                                value={repoValue}
                                id="small"
                                disabled
                                type="number"
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Repo Value"
                                required
                                className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Please confirm whether this REPO is eligible to initiate the fund transfers for other bank accounts,
                                when existing funds are not enough for daily payments.
                            </label>
                            <div className="flex flex-row gap-4 ml-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        onChange={(e) => setEligibility(e.target.value)}
                                        name="transferEligibility"
                                        value={1}
                                        checked={eligibility === "1"}
                                        required
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">Eligible</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        onChange={(e) => setEligibility(e.target.value)}
                                        name="transferEligibility"
                                        value={0}
                                        required
                                        checked={eligibility === "0"}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">Not Eligible</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row gap-1'>
                        <div>
                            <button
                                type="submit"
                                className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                {saveSpinner && <Spinner size={20} />}
                                <label>Save</label>
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => onCancel()}
                                className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
                                <label>Cancel</label>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
        </div>
    )
}
