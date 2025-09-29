"use client"
import React from 'react'
import { useState } from 'react';
import RequestHistory from './RequestHistory/page';
import TransferHistory from './TransferHistory/page';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from 'next/navigation';

export default function Reports() {
    //Define states;
    const [requestHistory, setRequestHistory] = useState(false);
    const [transferHistory, setTransfertHistory] = useState(false);
    const router = useRouter();
    const { hasPermission } = useAuth();

    //Define cancel functionality;
    const handleCancel = (setterCancel) => {
        setterCancel(false);
    };

    //Define an array for setter functions;
    const arraySetters = [
        setRequestHistory,
        setTransfertHistory
    ];

    //Define function for handling each main function user clicks;
    const handleClick = (setterFunction, requiredPermission) => {
        // First, check for permission
        if (requiredPermission && !hasPermission(requiredPermission)) {
            router.push('/AccessDenied'); // Redirect if no permission
            return;
        }
        arraySetters.forEach((setter) => {
            setter(false);
        });
        setterFunction(true);
    };
    return (
        <div>
            <div className="bg-slate-800 w-full h-[45px] flex flex-row items-center">
                <svg className="w-6 h-6 ml-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M3 11h18M3 15h18m-9-4v8m-8 0h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                </svg>

                <div>
                    <label className="text-white text-xl ml-1">Reports |</label>
                </div>

                <div
                    onClick={() => handleClick(setRequestHistory, 'FUNC-030')}
                    className="flex flex-row items-center justify-center ml-[75px]">

                    <div className="text-sm text-white hover:bg-slate-700 w-[150px] h-[32] flex flex-col items-center justify-center rounded-md">
                        <button>Fund Request History</button>
                    </div>
                </div>

                <div
                    onClick={() => handleClick(setTransfertHistory, 'FUNC-031')}
                    className="flex flex-row items-center justify-center ml-[20px]">

                    <div className="text-sm text-white hover:bg-slate-700 w-[150px] h-[32] flex flex-col items-center justify-center rounded-md">
                        <button>Fund Transfer History</button>
                    </div>
                </div>
            </div>

            {requestHistory && (
                <div className="mt-4">
                    <RequestHistory onCancel={() => handleCancel(setRequestHistory)} />
                </div>
            )}

            {transferHistory && (
                <div className="mt-4">
                    <TransferHistory onCancel={() => handleCancel(setTransfertHistory)} />
                </div>
            )}
        </div>
    )
}
