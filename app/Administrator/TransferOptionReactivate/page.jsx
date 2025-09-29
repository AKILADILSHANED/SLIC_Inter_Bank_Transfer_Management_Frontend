"use client"
import React from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page'
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function TransferOptionReactivate() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables
    const [transferOptions, setTransferOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState();
    const [reactivateSpinner, setReactivateSpinner] = useState(false);

    //Define handleFetchOptions function
    const handleFetchOptions = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/transferOption/option-reactivate`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setTransferOptions(response.responseObject);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact the administrator!");
        }
    }

    useEffect(() => {
        handleFetchOptions();
    }, []);

    //Define handleOptionDeactivate function;
    const handleOptionReactivate = async (optionId) => {
        try {
            setReactivateSpinner(true);
            setErrorMessage("");
            setSuccessMessage("");
            const request = await fetch(
                `${baseUrl}/api/v1/transferOption/save-activation?optionId=${optionId}`,
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
                await handleFetchOptions(); //Page will be reloaded;
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setReactivateSpinner(false);
        }
    }

    return (
        <div className="mt-4">
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Re-activate Transfer Options
                </label>
            </div>
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>

            <div className="relative overflow-x-auto">
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
                        {transferOptions.map((element) => (
                            <tr
                                key={element.optionId}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4">{element.optionId}</td>
                                <td className="px-6 py-4">{element.definedDate}</td>
                                <td className="px-6 py-4">{element.fromAccount}</td>
                                <td className="px-6 py-4">{element.toAccount}</td>
                                <td className="px-6 py-4">{element.transferChannel}</td>
                                <td>
                                    <button onClick={() => handleOptionReactivate(element.optionId)} type="button" className="flex gap-1 items-center justify-center w-[110px] h-[30px] text-white bg-green-600 hover:bg-green-800 font-medium rounded-md text-md dark:bg-green-600 dark:hover:bg-green-700">{reactivateSpinner && <Spinner size={20} />}<label>Re-activate</label></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
