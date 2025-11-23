"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function Adjustments() {

    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [saveSpinner, setSaveSpinner] = useState(false);
    const [transferSpinner, setTransferSpinner] = useState(false);

    const [newRepo, setNewRepo] = useState(false);
    const [existingRepo, setExistingRepo] = useState(false);
    const [fromRepo, setFromRepo] = useState("");
    const [toRepo, setToRepo] = useState("");
    const [transferValue, setTransferValue] = useState("");
    const [adjustmentType, setAdjustmentType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [repoType, setRepoType] = useState("");
    const [repoValue, setRepoValue] = useState("");
    const [eligibility, setEligibility] = useState("0");
    const [transferChanel, setTransferChanel] = useState("0");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [bankAccountList, setBankAccountList] = useState([]);
    const [fromRepoList, setFromRepoList] = useState([]);
    const [toRepoList, setToRepoList] = useState([]);
    const [transferChanelList, setTransferChanelList] = useState([]);
    const [chanelDropdown, setChanelDropdown] = useState(false);

    //Define adjustmentChange function;
    const adjustmentChange = (adjustmentType, fromRepo) => {
        if (adjustmentType === "1" && fromRepo !== "") {
            setAdjustmentType(adjustmentType);
            setExistingRepo(false);
            setNewRepo(true);
        } else if (adjustmentType === "2") {
            setAdjustmentType(adjustmentType);
            setExistingRepo(true);
            setNewRepo(false);
        } else {
            setAdjustmentType(adjustmentType);
            setExistingRepo(false);
            setNewRepo(false);
        }
    }

    //Define fromRepoChange function;
    const fromRepoChange = (fromRepo, adjustmentType) => {
        if (fromRepo !== "" && adjustmentType === "1") {
            setFromRepo(fromRepo);
            setExistingRepo(false);
            setNewRepo(true);
        } else if (fromRepo !== "" && adjustmentType === "2") {
            setFromRepo(fromRepo);
            setExistingRepo(true);
            setNewRepo(false);
        }
        else {
            setFromRepo(fromRepo);
            setExistingRepo(false);
            setNewRepo(false);
        }
    }

    //Define cancel functionality;
    const handleCancel = (setterCancel) => {
        setterCancel(false);
    };

    //Define getBankAccount function;
    const getBankAccount = async () => {
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
                    setBankAccountList(response.responseObject);
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
    };

    //Define fromrepoList function;
    const fromrepoList = async () => {
        setErrorMessage(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/get-Repo-List`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                setFromRepoList(response.responseObject);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            const response = await request.json();
            setErrorMessage(response.message);
        }
    }

    //Define torepoList function;
    const torepoList = async () => {
        setErrorMessage(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/get-Repo-List`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                setToRepoList(response.responseObject);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            const response = await request.json();
            setErrorMessage(response.message);
        }
    }

    //Define getChannels function;
    const getChannels = async () => {
        setErrorMessage(false);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/channel/getChanel`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                setTransferChanelList(response.responseObject);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            const response = await request.json();
            setErrorMessage(response.message);
        }
    }

    useEffect(() => {
        getBankAccount();
        fromrepoList();
        torepoList();
        getChannels();
    }, []);

    //define handleKeyDown function; This will be restricted typing minus values in the text box;
    const handleKeyDown = (e) => {
        if (e.key === "-") {
            e.preventDefault();
        } else {
            //No code block to be run;
        }
    }

    //Define createNewRepo function;
    const createNewRepo = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setSaveSpinner(true);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/create-new-repo`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            fromRepo: fromRepo,
                            adjustmentType: adjustmentType,
                            repoAccount: accountNumber,
                            repoType: repoType,
                            repoValue: repoValue,
                            eligibility: eligibility,
                            transferChanel: transferChanel
                        }
                    )
                },
            );
            if (request.status === 200) {
                const response = await request.json();
                setSuccessMessage(response.message);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            errorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setSaveSpinner(false);
        }
    }

    //Define existingRepoTransfer function;
    const existingRepoTransfer = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setTransferSpinner(true);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/repo/transfer-repo`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            fromRepo: fromRepo,
                            toRepo: toRepo,
                            repoValue: repoValue,
                            transferChanel: transferChanel
                        }
                    )
                },
                
            );
            if (request.status === 200) {
                const response = await request.json();
                setSuccessMessage(response.message);
            } else if (request.status === 409) {
                const response = await request.json();
                setErrorMessage(response.message);
            }else if(request.status === 500){
                const response = await request.json();
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
        } finally {
            setTransferSpinner(false);
        }
    }

    //Define setUpTransferChannel function;
    const setUpTransferChannel = async (newRepoAccountId, fromRepoId) => {
        setAccountNumber(newRepoAccountId);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/bank-account/checkBankAccountForNewRepo?newRepoAccountId=${encodeURIComponent(newRepoAccountId)}&fromRepoId=${encodeURIComponent(fromRepoId)}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                if (response.responseObject == true) {
                    setChanelDropdown(false);
                } else {
                    setChanelDropdown(true);
                }
                setAccountNumber(newRepoAccountId);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred, while fetching Bank Accounts!");
        }
    }

    //Define setUpTransferChannel function;
    const setUpTransferChannelForExistingRepo = async (toRepo, fromRepoId) => {
        setToRepo(toRepo);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/bank-account/checkBankAccountForExistingRepo?toRepoId=${encodeURIComponent(toRepo)}&fromRepoId=${encodeURIComponent(fromRepoId)}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.status === 200) {
                const response = await request.json();
                if (response.responseObject == true) {
                    setChanelDropdown(false);
                } else {
                    setChanelDropdown(true);
                }
                setToRepo(toRepo);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred, while fetching Bank Accounts!");
        }
    }

    return (
        <div>
            <div className="h-[120px] w-full shadow-md">
                <div className="bg-red-800 my-4 h-[30px] flex flex-row items-center">
                    <label className="text-white text-lg ml-2 font-serif">
                        Repo Adjustments
                    </label>
                </div>
                <form>
                    <div className="flex flex-row items-center mt-5">
                        <label
                            htmlFor="small-input"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
                            Transfer From:
                        </label>
                        <select
                            required
                            placeholder="- Select From Repo ID -"
                            onChange={(e) => fromRepoChange(e.target.value, adjustmentType)}
                            id="small-input"
                            className="block ml-2 w-[300px] p-1 px-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option key={0} value={""}>
                                - Select From Repo -
                            </option>
                            {
                                fromRepoList.map((element) => (
                                    <option key={element.repoId} value={element.repoId}>{element.repoId}</option>
                                ))
                            }
                        </select>

                        <label
                            htmlFor="small-input"
                            className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-5">
                            Adjustment Type:
                        </label>
                        <select
                            type="text"
                            onChange={(e) => adjustmentChange(e.target.value, fromRepo)}
                            required
                            placeholder="Enter REPO ID"
                            id="small-input"
                            className="block ml-2 w-[300px] p-1 px-2 outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option key={0} value={""}>
                                - Select Adjustment Type -
                            </option>
                            <option value={1}>
                                Create New Repo
                            </option>
                            <option value={2}>
                                Transfer to existing Repo
                            </option>
                        </select>
                    </div>
                </form>
            </div>

            {
                newRepo &&
                <div>
                    <form onSubmit={(e) => createNewRepo(e)} className='border-none shadow-md py-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-5'>
                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Bank Account Number:
                                    </label>
                                    <select
                                        id="small"
                                        placeholder="Enter Payment Name"
                                        onChange={(e) => setUpTransferChannel(e.target.value, fromRepo)}
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={""}>- Select Account Number -</option>
                                        {
                                            bankAccountList.map((element) => (
                                                <option key={element.accountId} value={element.accountId}>{element.accountNumber}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Repo Type:
                                    </label>
                                    <select
                                        onChange={(e) => setRepoType(e.target.value)}
                                        id="small"
                                        placeholder="Enter Payment Name"
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={""}>- Select Repo Type -</option>
                                        <option value={1}>PAR</option>
                                        <option value={2}>NON-PAR</option>
                                        <option value={3}>TR</option>
                                        <option value={4}>Excess</option>
                                    </select>
                                </div>

                                {chanelDropdown &&
                                    <div>
                                        <label
                                            htmlFor="small"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                            Chanel:
                                        </label>
                                        <select
                                            onChange={(e) => setTransferChanel(e.target.value)}
                                            id="small"
                                            placeholder="Enter Payment Name"
                                            required
                                            className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value={""}>- Select Transfer Chanel -</option>
                                            {
                                                transferChanelList.map((element) => (
                                                    <option key={element.channelId} value={element.channelId}>{element.channelType}</option>
                                                ))
                                            }
                                        </select>
                                    </div>}
                            </div>
                            <div className='flex flex-row gap-5'>
                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Repo Value:
                                    </label>
                                    <input
                                        onChange={(e) => setRepoValue(e.target.value)}
                                        value={repoValue}
                                        id="small"
                                        type="number"
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter Repo Value"
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>

                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Investment Value:
                                    </label>
                                    <input
                                        value={repoValue}
                                        id="small"
                                        disabled
                                        type="number"
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter Repo Value"
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                            </div>

                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Please confirm whether this REPO is eligible to initiate the fund transfers for other bank accounts,
                                        when existing funds are not enough for daily payments.
                                    </label>
                                    <div className="flex flex-row gap-4 ml-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                onChange={(e) => setEligibility(e.target.value)}
                                                name="transferEligibility"
                                                value={1}
                                                checked={eligibility === "1"}
                                                required
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-900 dark:text-white">Eligible</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                onChange={(e) => setEligibility(e.target.value)}
                                                name="transferEligibility"
                                                value={0}
                                                required
                                                checked={eligibility === "0"}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-900 dark:text-white">Not Eligible</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row gap-1'>
                                <div>
                                    <button
                                        type="submit"
                                        className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                        {saveSpinner && <Spinner size={20} />}
                                        <label>Save</label>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel(setNewRepo)}
                                        className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
                                        <label>Cancel</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            }

            {
                existingRepo &&
                <div>
                    <form onSubmit={(e) => existingRepoTransfer(e)} className='border-none shadow-md py-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-5'>
                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        To Repo:
                                    </label>
                                    <select
                                        id="small"
                                        placeholder="Enter Payment Name"
                                        onChange={(e) => setUpTransferChannelForExistingRepo(e.target.value, fromRepo)}
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={""}>- Select Repo ID -</option>
                                        {
                                            toRepoList.map((element) => (
                                                <option key={element.repoId} value={element.repoId}>{element.repoId}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="small"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                        Repo Value:
                                    </label>
                                    <input
                                        onChange={(e) => setRepoValue(e.target.value)}
                                        value={repoValue}
                                        id="small"
                                        type="number"
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter Repo Value"
                                        required
                                        className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                </div>
                                {chanelDropdown &&
                                    <div>
                                        <label
                                            htmlFor="small"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                            Chanel:
                                        </label>
                                        <select
                                            onChange={(e) => setTransferChanel(e.target.value)}
                                            id="small"
                                            placeholder="Enter Payment Name"
                                            required
                                            className="outline-none block w-[250px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value={""}>- Select Transfer Chanel -</option>
                                            {
                                                transferChanelList.map((element) => (
                                                    <option key={element.channelId} value={element.channelId}>{element.channelType}</option>
                                                ))
                                            }
                                        </select>
                                    </div>}
                            </div>
                            <div className='flex flex-row gap-1'>
                                <div>
                                    <button
                                        type="submit"
                                        className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[80px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                                        {transferSpinner && <Spinner size={20} />}
                                        <label>Transfer</label>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel(setExistingRepo)}
                                        className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
                                        <label>Cancel</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            }
            <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
            <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
        </div>
    )
}
