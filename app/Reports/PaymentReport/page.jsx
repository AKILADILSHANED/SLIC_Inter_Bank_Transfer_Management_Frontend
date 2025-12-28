"use client"
import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';

export default function PaymentReport() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [paymentReport, setPaymentReport] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingMessage, setloadingMessage] = useState(false);

    //Define getAccountData function;
    const getPaymentData = async () => {
        setPaymentReport(false);
        setErrorMessage("");
        setloadingMessage(true);
        try {
            const request = await fetch(`${baseUrl}/api/v1/reports/get-payment-report`, {
                method: "GET",
                credentials: "include",
            });
            const response = await request.json();
            if (request.status === 200) {
                setPaymentReport(true);
                setPaymentDetails(response.responseObject);
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
        getPaymentData();
    }, []);


    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Available Payments
                </label>
            </div>

            {loadingMessage && <div className='text-green-600 ml-3 mt-2'>
                Report is being generated. Please wait...
            </div>}

            {
                paymentReport &&
                <div>
                    <table border="1" className='border border-blue-600 mt-4 ml-2'>
                        <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                            <tr>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Payment ID</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Payment Type</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Registered Date</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Registered By</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Status</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Deleted By</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                paymentDetails.map(
                                    (element) => (
                                        <tr key={element.paymentId} border="1" className='border border-blue-600'>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.paymentId}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.paymentType}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.registeredDate}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.registeredBy}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.status}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.deletedBy}</td>
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
