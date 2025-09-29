"use client"
import React, { useState, useEffect } from 'react';

export default function DashBoard() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [transactionDetails, setTransactionDetails] = useState({
        totalTransfers: 0,
        approvedTransfers: 0,
        rejectedTransfers: 0,
        onlineTransfers: 0,
        ibtTransfers: 0,
        rtgsTransfers: 0,
        chequeTransfers: 0,
        pendingTransfers: 0 // Added missing property
    });
    const [isClient, setIsClient] = useState(false);
    const [forecastDetails, setForecastDetails] = useState([]);
    const [balanceDetails, setBalanceDetails] = useState([]);
    const [forecastDetailsTable, setForecastDetailsTable] = useState(false);
    const [balanceDetailsTable, setBalanceDetailsTable] = useState(false);
    const [errorMessageForecast, setErrorMessageForecast] = useState("");
    const [errorMessageBalance, setErrorMessageBalance] = useState("");
    const [totalForecastAmount, setTotalForecastAmount] = useState(0);
    const [animate, setAnimate] = useState(false);

    //Define getTransactionDetails function;
    const getTransactionDetails = async () => {
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/dash-board/get-Transaction-Details`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!request.ok) {
                alert("Unable to load Transaction Summary Data.");
            } else {
                const response = await request.json();
                setTransactionDetails(response.responseObject);
            }
        } catch (error) {
            alert("Unable to load Transaction Summary Data.");
        }
    }
    useEffect(() => {
        getTransactionDetails();
    }, []);

    //Define getForecastDetails function;
    const getForecastDetails = async () => {
        setErrorMessageForecast("");
        setForecastDetailsTable(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/dash-board/get-Forecasting-Details`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessageForecast(response.message);
            } else {
                const response = await request.json();
                setForecastDetailsTable(true);
                setForecastDetails(response.responseObject);
                // Calculate and set the total amount here
                const total = response.responseObject.reduce((sum, item) => sum + item.amount, 0);
                setTotalForecastAmount(total);
            }
        } catch (error) {
            setErrorMessageForecast("Unable to load Forecast Data.");
        }
    }
    useEffect(() => {
        getForecastDetails();
    }, []);

    //Define getBalanceDetails function;
    const getBalanceDetails = async () => {
        setErrorMessageBalance("");
        setBalanceDetailsTable(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/dash-board/get-Balance-Details`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!request.ok) {
                const response = await request.json();
                setErrorMessageBalance(response.message);
            } else {
                const response = await request.json();
                setBalanceDetailsTable(true);
                setBalanceDetails(response.responseObject);
            }
        } catch (error) {
            setErrorMessageBalance("Unable to load Balance Details.");
        }
    }
    useEffect(() => {
        getBalanceDetails();
    }, []);

    useEffect(() => {
        setIsClient(true);
        setAnimate(true);
    }, []);

    function TimeDisplay() {
        const [currentTime, setCurrentTime] = useState(new Date());

        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);

            return () => clearInterval(timer);
        }, []);

        return (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className='text-white'>Time: {currentTime.toLocaleTimeString()}</div>
                <div className='text-white'>Date: {currentTime.toLocaleDateString()}</div>
            </div>
        );
    }

    return (
        <div className={animate ? 'fade-in' : ''}>
            {/* Alert Banner */}
            <div className="p-3 mb-2 flex flex-col sm:flex-row items-center justify-between bg-red-700 text-white rounded-lg">
                <div className="flex items-center mb-2 sm:mb-0">
                    <div className='font-bold text-sm mr-2'>Messages:</div>
                    <div className="overflow-hidden">
                        <div className="whitespace-nowrap animate-marquee text-red-200 text-sm">
                            No message to display.
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    {isClient && <TimeDisplay/>}
                </div>
            </div>

            {/* First Row - Transaction Summary and Forecasting */}
            <div className='flex flex-col lg:flex-row gap-3 p-2'>
                {/* Transaction Summary Card */}
                <div className='w-full lg:w-1/3'>
                    <div className="bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full">
                        <h5 className="text-lg font-bold text-red-600 tracking-tight underline dark:text-white mb-4">
                            Transaction Summary
                        </h5>
                        
                        <div className="space-y-3">
                            {/* Total Transfers */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Total Transfers:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.totalTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Approved */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Approved:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.approvedTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.approvedTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Pending */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Pending:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.pendingTransfers || 0}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * (transactionDetails.pendingTransfers || 0)).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Reversed */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Reversed:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.rejectedTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.rejectedTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Online */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Online:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.onlineTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.onlineTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* IBT */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">IBT:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.ibtTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.ibtTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* RTGS */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">RTGS:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.rtgsTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.rtgsTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Cheque */}
                            <div className='flex justify-between items-center'>
                                <label className="text-sm text-blue-600 font-medium">Cheque:</label>
                                <div className='flex gap-2'>
                                    <span className="bg-green-300 text-green-800 text-xs font-medium px-3 py-1 rounded-sm dark:bg-green-900 dark:text-green-300 min-w-[50px] text-center">
                                        {transactionDetails.chequeTransfers}
                                    </span>
                                    <span className="bg-blue-800 text-white text-xs font-medium px-3 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 min-w-[50px] text-center">
                                        {transactionDetails.totalTransfers > 0 ? 
                                            (100 / transactionDetails.totalTransfers * transactionDetails.chequeTransfers).toFixed(0) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className='mt-4 pt-3 border-t border-gray-200'>
                            <label className='text-xs text-slate-500'>
                                Last Updated on: {isClient && new Date().toLocaleDateString()}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Forecasting Card */}
                <div className='w-full lg:w-2/3'>
                    <div className="bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full">
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4'>
                            <h5 className="text-lg font-bold text-red-600 tracking-tight underline dark:text-white">
                                Forecasting Fund Request Details
                            </h5>
                            <div className='bg-green-800 text-white px-4 py-2 rounded text-sm w-full sm:w-auto text-center'>
                                Total Forecasted Amount: {" Rs." + totalForecastAmount.toLocaleString(undefined, { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </div>
                        </div>
                        
                        {forecastDetailsTable && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-xs sm:text-sm bg-white shadow-md rounded-xl">
                                    <thead>
                                        <tr className="bg-blue-100 text-gray-700">
                                            <th className="py-3 px-2 sm:px-4 text-left">Payment</th>
                                            <th className="py-3 px-2 sm:px-4 text-left">Account</th>
                                            <th className="py-3 px-2 sm:px-4 text-left">Amount</th>
                                            <th className="py-3 px-2 sm:px-4 text-left hidden sm:table-cell">Required Date</th>
                                            <th className="py-3 px-2 sm:px-4 text-left hidden md:table-cell">Request By</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-900">
                                        {forecastDetails.map((element, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-2 sm:px-4">{element.paymentType}</td>
                                                <td className="py-3 px-2 sm:px-4">{element.bankAccount}</td>
                                                <td className="py-3 px-2 sm:px-4">
                                                    {typeof element.amount === "number"
                                                        ? element.amount.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.amount}
                                                </td>
                                                <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">{element.date}</td>
                                                <td className="py-3 px-2 sm:px-4 hidden md:table-cell">{element.requestedBy}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {errorMessageForecast && (
                            <div className='mt-3'>
                                <label className='text-sm text-red-600'>{errorMessageForecast}</label>
                            </div>
                        )}
                        
                        <div className='mt-4 pt-3 border-t border-gray-200'>
                            <label className='text-xs text-slate-500'>
                                Last Updated on: {isClient && new Date().toLocaleDateString()}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row - Balance Summary and Bank Links */}
            <div className='flex flex-col lg:flex-row gap-3 p-2 mt-3'>
                {/* Balance Summary Card */}
                <div className='w-full lg:w-2/3'>
                    <div className="bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full">
                        <h5 className="text-lg font-bold text-red-600 tracking-tight underline dark:text-white mb-4">
                            Account Balance Summary
                        </h5>
                        
                        {balanceDetailsTable && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-xs sm:text-sm bg-white shadow-md rounded-xl">
                                    <thead>
                                        <tr className="bg-blue-100 text-gray-700">
                                            <th className="py-3 px-2 sm:px-4 text-left">Account Number</th>
                                            <th className="py-3 px-2 sm:px-4 text-left">Original Balance</th>
                                            <th className="py-3 px-2 sm:px-4 text-left">Final Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-900">
                                        {balanceDetails.map((element, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-2 sm:px-4">{element.accountNumber}</td>
                                                <td className="py-3 px-2 sm:px-4">
                                                    {typeof element.originalBalance === "number"
                                                        ? element.originalBalance.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.originalBalance}
                                                </td>
                                                <td className="py-3 px-2 sm:px-4">
                                                    {typeof element.finalBalance === "number"
                                                        ? element.finalBalance.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.finalBalance}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                        {errorMessageBalance && (
                            <div className='mt-3'>
                                <label className='text-sm text-red-600'>{errorMessageBalance}</label>
                            </div>
                        )}
                        
                        <div className='mt-4 pt-3 border-t border-gray-200'>
                            <label className='text-xs text-slate-500'>
                                Last Updated on: {isClient && new Date().toLocaleDateString()}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Bank Links Card */}
                <div className='w-full lg:w-1/3'>
                    <div className="bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full">
                        <h5 className="text-lg font-bold text-red-600 tracking-tight underline dark:text-white mb-4">
                            Useful Bank Links
                        </h5>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs bg-white rounded-lg">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-3 py-2 text-left text-gray-600 font-medium">Bank</th>
                                        <th className="px-3 py-2 text-left text-gray-600 font-medium">Link</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { name: "Commercial Bank Digital", url: "https://www.combankdigital.com/#/login" },
                                        { name: "Commercial Bank Online", url: "https://www.commercialbk.com/online/2/2/22001.aspx" },
                                        { name: "People's Bank", url: "https://www.digital.peoplesbank.lk/sde.cib.web/IC7Aen6rwhPuCBkeEBEyTg#1" },
                                        { name: "Bank of Ceylon", url: "https://online.boc.lk/T001/channel.jsp" },
                                        { name: "Sampath Vishwa", url: "https://online.boc.lk/T001/channel.jsp" },
                                        { name: "Hatton National Bank", url: "https://hnbtxb.com/bib-webapp/app/auth/login" },
                                        { name: "Nations Trust Bank", url: "https://hnbtxb.com/bib-webapp/app/auth/login" },
                                        { name: "Seylan Bank", url: "https://www.seylanbank.lk/corporate/login" },
                                        { name: "Pan Asia Bank", url: "https://online.pabcbank.com/business/login" },
                                        { name: "DFCC Bank", url: "https://iconnect.dfcc.lk/iCashProGUI/?_gl=1*1fb53du*_ga*NDIyMDYxOTc3LjE3NTUwMjAxMTk.*_ga_NKW2NZ9CFC*czE3NTUwMjAxMTgkbzEkZzEkdDE3NTUwMjAxMjAkajU4JGwwJGgw#!/login" }
                                    ].map((bank, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-3 py-2 text-gray-800 font-medium whitespace-nowrap">
                                                {bank.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                <a 
                                                    href={bank.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline text-xs"
                                                >
                                                    Go to site
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
