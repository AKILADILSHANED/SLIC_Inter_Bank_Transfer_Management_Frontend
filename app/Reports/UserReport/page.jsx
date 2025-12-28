"use client"
import React, { useState } from 'react'
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useEffect } from 'react';

export default function UserReport() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [userReport, setUserReport] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingMessage, setloadingMessage] = useState(false);

    //Define getUserData function;
    const getUserData = async () => {
        setUserReport(false);
        setErrorMessage("");
        setloadingMessage(true);
        try {
            const request = await fetch(`${baseUrl}/api/v1/reports/get-user-report`, {
                method: "GET",
                credentials: "include",
            });
            const response = await request.json();
            if (request.status === 200) {
                setUserReport(true);
                setUserDetails(response.responseObject);
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
        getUserData();
    }, []);


    return (
        <div>
            <div className="bg-red-800 h-[30px] flex flex-row items-center">
                <label className="text-white ml-3 text-lg font-serif">
                    Available Users
                </label>
            </div>

            {loadingMessage && <div className='text-green-600 ml-3 mt-2'>
                Report is being generated. Please wait...
            </div>}

            {
                userReport &&
                <div>
                    <table border="1" className='border border-blue-600 mt-4 ml-2'>
                        <thead border="1" className='border border-blue-600 text-sm px-2 py-2'>
                            <tr>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>User ID</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>First Name</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Last Name</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Department</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Section</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Position</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>EPF</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Email</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Status</th>
                                <th border="1" className='border border-blue-600 text-sm px-2 py-2'>Registered By</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                userDetails.map(
                                    (element) => (
                                        <tr key={element.userId} border="1" className='border border-blue-600'>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.userId}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.firstName}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.lastName}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.department}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.section}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.position}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.epf}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.email}</td>
                                            <td border="1" className='border border-blue-600 px-2 py-2 text-sm'>{element.status}</td>
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
