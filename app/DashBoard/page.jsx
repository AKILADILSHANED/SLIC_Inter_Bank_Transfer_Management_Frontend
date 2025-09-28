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
        chequeTransfers: 0
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
            <>
                <div className='ml-5 text-white'>Time: {currentTime.toLocaleTimeString()}</div>
                <div className='ml-10 text-white'>Date: {currentTime.toLocaleDateString()}</div>
            </>
        );

    }
    return (
        <div className={animate ? 'fade-in' : ''}>
            <div>
                <div
                    className="p-4 mb-1 flex flex-row items-center h-[40px] text-sm text-black rounded-lg bg-red-700 overflow-hidden hover:[&_.animate-marquee]:animation-pause"
                    role="alert"
                >
                    <div className='text-white font-bold'>Messages:</div>
                    <div className="flex items-center">
                        <div className="ml-2 overflow-hidden">
                            <div className="whitespace-nowrap animate-marquee text-red-500">
                                No message to display.
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row ml-[480px]'>{isClient && <TimeDisplay/>}</div>
                </div>
            </div>

            <div className='flex mt-2 flex-row gap-1 ml-2 shadow-lg rounded-lg'>
                <div className='mt-1 px-3 py-3'>
                    <div className="block max-w-sm p-2 bg-whit rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div>
                            <h5 className="text-1xl font-bold text-red-600 tracking-tight underline dark:text-white">Transaction Summary</h5>
                        </div>
                        <div className='mt-2 ml-1 text-sm text-blue-500'>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Total Transfers:</label>
                                </div>
                                <div className='ml-6 w-[50px] flex-none'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.totalTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.totalTransfers).toFixed(0)}%</span></div>

                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Approved:</label>
                                </div>
                                <div className='ml-[56px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.approvedTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.approvedTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Pending:</label>
                                </div>
                                <div className='ml-[64px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.pendingTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.pendingTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Reversed:</label>
                                </div>
                                <div className='ml-[56px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.rejectedTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.rejectedTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Online:</label>
                                </div>
                                <div className='ml-[75px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.onlineTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.onlineTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>IBT:</label>
                                </div>
                                <div className='ml-[95px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.ibtTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.ibtTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>RTGS:</label>
                                </div>
                                <div className='ml-[77px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.rtgsTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.rtgsTransfers).toFixed(0)}%</span></div>
                            </div>
                            <div className='flex flex-row'>
                                <div>
                                    <label>Cheque:</label>
                                </div>
                                <div className='ml-[66.5px] w-[50px] mt-1'><span className="bg-green-300 block w-full text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">{transactionDetails.chequeTransfers}</span></div>
                                <div className='ml-6 w-[50px] flex-none mt-1'><span className="bg-blue-800 block w-full text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{(100 / transactionDetails.totalTransfers * transactionDetails.chequeTransfers).toFixed(0)}%</span></div>
                            </div>
                        </div>
                        <div><label className='text-sm ml-1 text-slate-400'>Last Updated on:{isClient && new Date().toLocaleDateString()}</label></div>
                    </div>
                </div>

                <div className='mt-1 w-full mr-2 px-3 py-3'>
                    <div className="block  p-2 bg-white  rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='flex flex-row gap-5'>
                            <h5 className="text-1xl font-bold text-red-600 tracking-tight underline dark:text-white">Forecasting Fund Request Details</h5>
                            <div className='bg-green-900 text-white w-[390px] h-[30px]'><label className='ml-4'>Total Forecasted Amount:{" Rs." + totalForecastAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</label></div>
                        </div>
                        {forecastDetailsTable && <div className="overflow-x-auto">
                            <table className="min-w-full text-sm bg-white shadow-md rounded-xl">
                                <thead>
                                    <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4 text-left">Payment</th>
                                        <th className="py-3 px-4 text-left">Account</th>
                                        <th className="py-3 px-4 text-left">Amount</th>
                                        <th className="py-3 px-4 text-left">Required Date</th>
                                        <th className="py-3 px-4 text-left">Request By</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {
                                        forecastDetails.map(
                                            (element, index) => (
                                                <tr key={index} className="border-b border-blue-gray-200">
                                                    <td className="py-3 px-4">{element.paymentType}</td>
                                                    <td className="py-3 px-4">{element.bankAccount}</td>
                                                    <td className="py-3 px-4">{typeof element.amount === "number"
                                                        ? element.amount.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.amount}</td>
                                                    <td className="py-3 px-4">{element.date}</td>
                                                    <td className="py-3 px-4">{element.requestedBy}</td>
                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>}
                        {errorMessageForecast && <div><label className='text-sm text-red-700 mt-4 ml-2'>{errorMessageForecast}</label></div>}
                        <div><label className='text-sm ml-1 text-slate-400'>Last Updated on:{isClient && new Date().toLocaleDateString()}</label></div>
                    </div>
                </div>
            </div>

            <div className='flex mt-2 flex-row gap-1 ml-2 shadow-lg rounded-lg'>

                <div className='mt-1 w-full mr-2 px-3 py-3'>
                    <div className="block  p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='flex flex-row gap-5'>
                            <h5 className="text-1xl font-bold text-red-600 tracking-tight underline dark:text-white">Account Balance Summary</h5>

                        </div>
                        {balanceDetailsTable && <div className="overflow-x-auto">
                            <table className="min-w-full text-sm bg-white shadow-md rounded-xl">
                                <thead>
                                    <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4 text-left">Account Number</th>
                                        <th className="py-3 px-4 text-left">Original Balance</th>
                                        <th className="py-3 px-4 text-left">Final Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {
                                        balanceDetails.map(
                                            (element, index) => (
                                                <tr key={index} className="border-b border-blue-gray-200">
                                                    <td className="py-3 px-4">{element.accountNumber}</td>
                                                    <td className="py-3 px-4">{typeof element.originalBalance === "number"
                                                        ? element.originalBalance.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.originalBalance}</td>
                                                    <td className="py-3 px-4">{typeof element.finalBalance === "number"
                                                        ? element.finalBalance.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })
                                                        : element.finalBalance}</td>
                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>}
                        {errorMessageBalance && <div><label className='text-sm text-red-700 mt-4 ml-2'>{errorMessageBalance}</label></div>}
                        <div><label className='text-sm ml-1 text-slate-400'>Last Updated on:{isClient && new Date().toLocaleDateString()}</label></div>
                    </div>
                </div>

                <div className='mt-1 px-3 py-3'>
                    <div className="block max-w-sm p-2 bg-white  rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div>
                            <h5 className="text-1xl font-bold text-red-600 tracking-tight underline dark:text-white">Use full Bank Links</h5>
                        </div>
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Bank</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Link</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Commercial Bank Digital</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://www.combankdigital.com/#/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Commercial Bank Online</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://www.commercialbk.com/online/2/2/22001.aspx" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">People's Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://www.digital.peoplesbank.lk/sde.cib.web/IC7Aen6rwhPuCBkeEBEyTg#1" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Bank of Ceylon</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://online.boc.lk/T001/channel.jsp" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Sampath Vishwa</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://online.boc.lk/T001/channel.jsp" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Hatton National Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://hnbtxb.com/bib-webapp/app/auth/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Nations Trust Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://hnbtxb.com/bib-webapp/app/auth/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Seylan Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://www.seylanbank.lk/corporate/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Pan Asia Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://online.pabcbank.com/business/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">DFCC Bank</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 dark:text-neutral-200"><a href="https://iconnect.dfcc.lk/iCashProGUI/?_gl=1*1fb53du*_ga*NDIyMDYxOTc3LjE3NTUwMjAxMTk.*_ga_NKW2NZ9CFC*czE3NTUwMjAxMTgkbzEkZzEkdDE3NTUwMjAxMjAkajU4JGwwJGgw#!/login" target="_blank" rel="noopener noreferrer">
                                                        Go to site
                                                    </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

