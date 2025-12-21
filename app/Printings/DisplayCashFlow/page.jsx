"use client"
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import { useSearchParams } from 'next/navigation'

export default function DisplayCashFlow() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const searchParams = useSearchParams();
    const [cashFlowComponent, setCashFlowComponent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [cashFlowData, setCashFlowData] = useState([]);
    const cashFlowDate = searchParams.get('cashFlowDate');

    // Get current date in dd/mm/yyyy format
    const getCurrentDateFormatted = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //Define fetchOpeningRepoData function;
    const fetchOpeningRepoData = async () => {
        if (!cashFlowDate) {
            setError("No Transfer ID provided");
            setLoading(false);
            return;
        }
        try {
            setCashFlowComponent(false);
            setError("");
            const request = await fetch(
                `${baseUrl}/api/v1/repo/get-repo-opening-balances?repoDate=${cashFlowData}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                setCashFlowComponent(true);
                setCashFlowData(response.responseObject);
            } else {
                const response = await request.json();
                setError(response.message);
            }
        } catch (error) {
            console.log(error);
            setError("Unexpected error occurred. Please contact administrator!");
        } finally {
            setLoading(false);
        }
    }
    useEffect(
        () => {
            fetchOpeningRepoData();
        }, []
    );
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-2xl font-bold'>Sri Lanka Insurance Corporation General Ltd</span>
                <span className='font-bold'>Fund Position - General Fund</span>
                <span className='font-bold'>As at: {getCurrentDateFormatted()}</span>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} className='border px-2 py-2 border-solid'>
                                Remark
                            </th>
                            <th colSpan={2} className='border px-2 py-2 border-solid'>
                                {getCurrentDateFormatted()}
                            </th>
                        </tr>
                        <tr>
                            <th className="border px-2 py-2">Amount (Rs.)</th>
                            <th className="border px-2 py-2">Amount (Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-2">
                                <span className='font-bold underline'>CASH IN FLOW</span>
                                <div className='underline ml-5'>Opening Repo Balances</div>
                                <div className='underline ml-5'>Bank Account Collections</div>
                            </td>
                            <td className="border px-2 py-2"></td>
                            <td className="border px-2 py-2"></td>
                        </tr>

                        <tr>
                            <td className="border px-2 py-2">
                                <span className='font-bold underline'>CASH OUT FLOW</span>
                                <div className='underline ml-5'>Payments</div>
                            </td>
                            <td className="border px-2 py-2"></td>
                            <td className="border px-2 py-2"></td>
                        </tr>

                        <tr>
                            <td className="border px-2 py-2">
                                <div>Net Cash Flow</div>
                            </td>
                            <td className="border px-2 py-2"></td>
                            <td className="border px-2 py-2"></td>
                        </tr>

                        <tr>
                            <td className="border px-2 py-2">
                                <span className='underline font-bold'>Repo Investments</span>
                            </td>
                            <td className="border px-2 py-2"></td>
                            <td className="border px-2 py-2"></td>
                        </tr>

                        <tr>
                            <td className="border px-2 py-2">
                                <span>Remaining Funds</span>
                            </td>
                            <td className="border px-2 py-2"></td>
                            <td className="border px-2 py-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {error && <div className="p-4 text-red-600">{error}</div>}
            {loading && <div className="p-4">Cash Flow is being generated....</div>}
        </div>
    )
}
