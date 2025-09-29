"use client";
import React, { useEffect, useState } from 'react'
import Spinner from "@/app/Spinner/page";
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function TransferOptionDelete() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define State Variables;
    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [chanelId, setChanelId] = useState("");
    const [fromAccountList, setFromAccountList] = useState([]);
    const [toAccountList, setToAccountList] = useState([]);
    const [chanelList, setChanelList] = useState([]);
    const [transferOption, setTransferOption] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [viewSpinner, setViewSpinner] = useState(false);
    const [optionDetailsTable, setOptionDetailsTable] = useState(false);
    const [deleteSpriner, setDeleteSpriner] = useState(false);

    //Define getFromAccountList function;
    const getFromAccountList = async () => {
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
                    setFromAccountList(response.responseObject);
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
    }

    useEffect(() => {
        getFromAccountList()
    }, []);

    //Define getToAccountList function;
    const getToAccountList = async () => {
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
                    setToAccountList(response.responseObject);
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
    }

    useEffect(() => {
        getToAccountList()
    }, []);

    //Define getChannells function;
    const getChanells = async () => {
        try {
            const request = await fetch(`${baseUrl}/api/v1/channel/define-options`, {
                method: "GET",
                credentials: "include",
            });
            if (request.ok) {
                const response = await request.json();
                if (response.success == false) {
                    setErrorMessage(response.message);
                } else {
                    setChanelList(response.responseObject);
                }
            } else {
                setErrorMessage(
                    "Unable to load Channel Details. Please contact administrator!"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Un-expected error occurred. Please contact administrator!"
            );
        }
    };
    useEffect(() => {
        getChanells();
    }, []);

    //Define displayOptionDetails function;
    const displayOptionDetails = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setViewSpinner(true);
        setTransferOption([]);
        setOptionDetailsTable(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transferOption/displayAvailableOptionsForDelete?fromAccount=${fromAccountId}&toAccount=${toAccountId}&transferChannel=${chanelId}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (!request.ok) {
                const response = await request.json();
                if (response.success == false) {
                    setErrorMessage(response.message);
                    return;
                } else {
                    //Code does not come to this block;
                }
            } else {
                const response = await request.json();
                setTransferOption(response.responseObject)
                setOptionDetailsTable(true);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setViewSpinner(false);
        }
    }

    //Define handleOptionDelete function;
    const handleOptionDelete = async (optionId) => {
        try {
            setDeleteSpriner(true);
            const request = await fetch(
                `${baseUrl}/api/v1/transferOption/delete-option?optionId=${optionId}`,
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
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setDeleteSpriner(false);
        }
    }


    return (
        <div className="mt-4">
            <div className="shadow-md h-[160px]">
                <div className="bg-red-800 h-[30px] flex flex-row items-center">
                    <label className="text-white ml-3 text-lg font-serif">
                        Delete Transfer Option
                    </label>
                </div>
                <form onSubmit={(e) => displayOptionDetails(e)}>
                    <div className="mt-4 flex flex-row gap-2">
                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                From Account No:
                            </label>
                            <select
                                id="small"
                                placeholder="Enter Channel Type"
                                onChange={(e) => setFromAccountId(e.target.value)}
                                required
                                className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""}>-Select Account Number-</option>
                                {fromAccountList.map((element) => (
                                    <option key={element.accountId} value={element.accountId}>
                                        {element.accountNumber}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                To Account No:
                            </label>
                            <select
                                id="small"
                                placeholder="Enter Channel Type"
                                onChange={(e) => setToAccountId(e.target.value)}
                                required
                                className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""}>-Select Account Number-</option>
                                {toAccountList.map((element) => (
                                    <option key={element.accountId} value={element.accountId}>
                                        {element.accountNumber}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="small"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                Channel Type:
                            </label>
                            <select
                                id="small"
                                onChange={(e) => setChanelId(e.target.value)}
                                placeholder="Enter Channel Type"
                                required
                                className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""}>-Select Chanel Type-</option>
                                {chanelList.map((element) => (
                                    <option key={element.channelId} value={element.channelId}>
                                        {element.channelType} ({element.shortKey})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-2 ml-2">
                        <button
                            type="submit"
                            className="flex flex-row gap-1 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                            {viewSpinner && <Spinner size={20} />}
                            <label>View</label>
                        </button>
                    </div>
                </form>
            </div>
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>

            {optionDetailsTable && <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Option ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Defined Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Defined By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From Account
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To Account
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transfer Chanel
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            key={transferOption.optionId}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">{transferOption.optionId}</td>
                            <td className="px-6 py-4">{transferOption.definedDate}</td>
                            <td className="px-6 py-4">{transferOption.definedBy}</td>
                            <td className="px-6 py-4">{transferOption.fromAccount}</td>
                            <td className="px-6 py-4">{transferOption.toAccount}</td>
                            <td className="px-6 py-4">{transferOption.transferChannel}</td>
                            <td>
                                <button onClick={()=>handleOptionDelete(transferOption.optionId)} type="button" className="flex gap-1 items-center justify-center w-[80px] h-[30px] text-white bg-red-600 hover:bg-red-800 font-medium rounded-md text-md dark:bg-red-600 dark:hover:bg-red-700">{deleteSpriner && <Spinner size={20} />}<label>Delete</label></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </div>
    )
}
