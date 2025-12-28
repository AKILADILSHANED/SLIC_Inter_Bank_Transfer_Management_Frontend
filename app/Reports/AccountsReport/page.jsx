"use client"
import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';

export default function AccountsReport() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [accountReport, setAccountReport] = useState(false);
    const [accountDetails, setAccountDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingMessage, setloadingMessage] = useState(false);

    //Define getAccountData function;
    const getAccountData = async () => {
        setAccountReport(false);
        setErrorMessage("");
        setloadingMessage(true);
        try {
            const request = await fetch(`${baseUrl}/api/v1/reports/get-account-report`, {
                method: "GET",
                credentials: "include",
            });
            const response = await request.json();
            if (request.status === 200) {
                setAccountReport(true);
                setAccountDetails(response.responseObject);
            } else if (request.status === 409) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setloadingMessage(false);
        }
    }
    useEffect(() => {
        getAccountData();
    }, []);


    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Available Bank Accounts
                </label>
            </div>

            {loadingMessage && <div className='text-green-600 ml-3 mt-2'>
                Report is being generated. Please wait...
            </div>}

            {
                accountReport &&
                <div>
                    <table border="1" className='border border-blue-600 mt-4 ml-2'>
                        <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                            <tr>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account ID</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Bank</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Branch</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account Number</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Currency</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>GL Code</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Account Type</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Status</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Deleted By</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Registered Date</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Registered By</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                accountDetails.map(
                                    (element) => (
                                        <tr key={element.accountId} border="1" className='border border-blue-600'>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.accountId}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.bankName}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.bankBranch}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.bankAccount}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.currency}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.glCode}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.accountType}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.status}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.deletedBy}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.registeredDate}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.registeredBy}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            }

            {
                errorMessage && <ErrorMessage messageValue={errorMessage} />
            }
        </div>
    )
}
