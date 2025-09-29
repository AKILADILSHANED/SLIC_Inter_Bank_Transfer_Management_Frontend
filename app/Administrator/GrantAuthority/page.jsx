"use client"
import React, { useState } from 'react'
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function GrantAuthority({ onCancel }) {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [selectedUser, setSelectedUser] = useState();
    const [selectedModule, setSelectedModule] = useState();
    const [searchSpinner, setSearchSpinner] = useState(false);
    const [grantSpinner, setGrantSpinner] = useState(false);
    const [userList, setUserList] = useState([]);
    const [moduleList, setModuleList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [availableFunctionList, setAvailableFunctionList] = useState([]);
    const [functionTable, setFunctionTable] = useState(false);

    //Define getUser function;
    const getUser = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/user/userList`,
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
                    setUserList(response.responseObject);
                }
            } else {
                setErrorMessage(
                    "Unable to load Users. Please contact administrator!"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Un-expected error occurred. Please contact administrator!"
            );
        }
    };
    useEffect(() => {
        getUser();
    }, []);


    //Define getModules function;
    const getModules = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/module/getModuleList`,
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
                    setModuleList(response.responseObject);
                }
            } else {
                setErrorMessage(
                    "Unable to load Modules. Please contact administrator!"
                );
            }
        } catch (error) {
            setErrorMessage(
                "Un-expected error occurred. Please contact administrator!"
            );
        }
    };
    useEffect(() => {
        getModules();
    }, []);


    //Define getAllSubFunctions function;
    const getAllSubFunctions = async (e) => {
        e.preventDefault();
        try {
            setSearchSpinner(true);
            setErrorMessage(false);
            setSuccessMessage(false);
            setFunctionTable(false);
            const request = await fetch(
                `${baseUrl}/api/v1/module/getFunctionsForGrant?userId=${selectedUser}&moduleId=${selectedModule}`,
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
                setAvailableFunctionList(response.responseObject)
                setFunctionTable(true);
            }
        } catch (Error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setSearchSpinner(false);
        }
    }

    //Define functionGranting function;
    const functionGranting = async (userId, functionId) => {
        try {
            setGrantSpinner(true);
            setErrorMessage(false);
            setSuccessMessage(false);
            setFunctionTable(false);
            const request = await fetch(
                `${baseUrl}/api/v1/userFunction/grantFunction`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: userId,
                        functionId: functionId,
                    }),
                },
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessage(response.message);
            } else {
                const response = await request.json();
                setSuccessMessage(response.message)
                setFunctionTable(false);
            }
        } catch (Error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setGrantSpinner(false);
        }
    }

    return (
        <div className='mt-4'>
            <div className='shadow-md h-[170px]'>
                <div className="bg-red-800 h-[30px] flex flex-row items-center">
                    <label className="text-white ml-3 text-lg font-serif">
                        Grant Authority for Users
                    </label>
                </div>
                <form onSubmit={(e) => getAllSubFunctions(e)}>
                    <div className='mt-4'>
                        <div className='flex flex-row gap-5'>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    User:
                                </label>
                                <select
                                    id="small"
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                    required
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>- Select User -</option>
                                    {
                                        userList.map((element) => (
                                            <option key={element.userId} value={element.userId}>{element.userEpf + " - " + element.userFirstName + " " + element.userLastName}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="small"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Module:
                                </label>
                                <select
                                    onChange={(e) => setSelectedModule(e.target.value)}
                                    id="small"
                                    required
                                    className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={""}>- Select Module -</option>
                                    {
                                        moduleList.map((element) => (
                                            <option key={element.moduleId} value={element.moduleId}>{element.moduleId + " - " + element.moduleName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <div>
                            <button
                                type="submit"
                                className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[85px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                {searchSpinner && <Spinner size={20} />}
                                <label>Search</label>
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
                </form>
            </div>
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>

            <div>
                {functionTable && <table border="1" className='border border-blue-600 mt-4 ml-2'>
                    <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                        <tr>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Function ID</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Module</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Function</th>
                            <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            availableFunctionList.map(
                                (element) => (
                                    <tr key={element.functionId} border="1" className='border border-blue-600'>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.functionId}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.moduleName}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.functionName}</td>
                                        <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>
                                            <button
                                                onClick={() => functionGranting(selectedUser, element.functionId)}
                                                type="button"
                                                className="border flex flex-row ml-2 gap-0.5 h-[25px] items-center justify-center w-[135px] text-white bg-green-700 hover:bg-green-600 rounded-md border-none">
                                                {grantSpinner && <Spinner size={20} />}
                                                <label>Grant Function</label>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
