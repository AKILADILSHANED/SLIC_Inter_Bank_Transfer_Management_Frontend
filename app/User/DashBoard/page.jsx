"use client"; // ← Add this at the top
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/app/Spinner/page";
import { Suspense } from "react";

function FullNameComponent() {
  const name = useSearchParams();
  return <div>Welcome {name.get("userFullName")} !</div>;
}

export default function DashBoard() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loaderUserManagement, setLoaderUserManagement] = useState(false);
  const [loaderAccountManagement, setLoaderAccountManagement] = useState(false);
  const [loaderAccountBalances, setLoaderAccountBalances] = useState(false);

  // Create useStates for side panel functions.
  const [userManage, setUserManage] = useState(false);
  const [bankAccount, setBankAccount] = useState(false);
  const [accountBalances, setAccountBalances] = useState(false);
  const [fundRequest, setFundRequest] = useState(false);
  const [transfers, setTransfers] = useState(false);
  const [repoManage, setRepoManage] = useState(false);
  const [reports, setReports] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [settings, setSettings] = useState(false);

  //Get all useState setters in to an array.
  let setFunctionArray = [
    setUserManage,
    setBankAccount,
    setAccountBalances,
    setFundRequest,
    setTransfers,
    setRepoManage,
    setReports,
    setAdmin,
    setSettings,
  ];

  //Implement a single function to handle each function in side panel.
  const handleClickSidePanelFunction = (currentFunction, url, loaderSetter) => {
    loaderSetter(true);
    setTimeout(() => {
      for (let userClickedFunction of setFunctionArray) {
        userClickedFunction(false);
      }
      setUrl(url);
      currentFunction(true);
      loaderSetter(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="bg-blue-900 hover:bg-blue-800 shadow-md mt-1 h-[7.5%] w-full text-white flex flex-row items-center">
        <div className="ml-4">
          <svg
            className="w-6 h-6 text-white dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 6H6m12 4H6m12 4H6m12 4H6"
            />
          </svg>
        </div>
        <div className="ml-2 text-xl">Dash Board</div>
        <div>
          <input
            type="text"
            className="border border-white outline-none px-2 ml-6 rounded-sm w-[300px]"
            placeholder="Search Anything here"
          />
        </div>
        <div className="ml-2">
          <svg
            onClick={() => {
              router.push("./DashBoard");
            }}
            className="w-[27px] h-[27px] text-white dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.3"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <div className="ml-10">
          <svg
            className="w-[27px] h-[27px] text-white dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
        </div>
        <div className="ml-2">
          <svg
            onClick={() => {
              router.push("./UserLogin");
            }}
            className="w-[27px] h-[27px] text-white dark:text-white cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>
        </div>
        <div className="ml-10 text-md flex f;ex-row">
          <svg
            className="w-6 h-6 text-white dark:text-white ml-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
              clipRule="evenodd"
            />
          </svg>
          <Suspense fallback={"Loading User Info..."} className="ml-1">
            <FullNameComponent />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-row w-screen h-screen justify-start">
        <div className="ml-[0.2%] mt-[0.5%] w-[18%] h-[98%] bg-slate-900 shadow-lg flex flex-col items-center">
          <div className="text-white bg-slate-700 h-[6%] w-[95%] mt-2 rounded-md hover:bg-slate-600 flex flex-row items-center">
            <label className="ml-4 text-lg">Menu</label>
          </div>

          <div
            onClick={() =>
              handleClickSidePanelFunction(
                setUserManage,
                "/UserManagement",
                setLoaderUserManagement
              )
            }
            className="cursor-pointer text-slate-400 hover:text-white mt-10 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                clipRule="evenodd"
              />
            </svg>
            <label className="ml-2">Manage Users</label>
            {loaderUserManagement && (
              <div className="ml-2">
                <Spinner size={24}></Spinner>
              </div>
            )}
          </div>

          <div
            onClick={() =>
              handleClickSidePanelFunction(
                setBankAccount,
                "/AccountManagement",
                setLoaderAccountManagement
              )
            }
            className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
              />
            </svg>

            <label className="ml-2">Bank Accounts</label>
            {loaderAccountManagement && (
              <div className="ml-2">
                <Spinner size={24}></Spinner>
              </div>
            )}
          </div>

          <div
            onClick={() =>
              handleClickSidePanelFunction(
                setAccountBalances,
                "/AccountBalances",
                setLoaderAccountBalances
              )
            }
            className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
              />
            </svg>

            <label className="ml-2">Account Balances</label>
            {loaderAccountBalances && (
              <div className="ml-2">
                <Spinner size={24}></Spinner>
              </div>
            )}
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>

            <label className="ml-2">Fund Requests</label>
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
              />
            </svg>

            <label className="ml-2">Transfers</label>
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
              />
            </svg>

            <label className="ml-2">Repo Management</label>
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
              />
            </svg>

            <label className="ml-2">Reports</label>
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M6 2c-1.10457 0-2 .89543-2 2v4c0 .55228.44772 1 1 1s1-.44772 1-1V4h12v7h-2c-.5523 0-1 .4477-1 1v2h-1c-.5523 0-1 .4477-1 1s.4477 1 1 1h5c.5523 0 1-.4477 1-1V3.85714C20 2.98529 19.3667 2 18.268 2H6Z" />
              <path d="M6 11.5C6 9.567 7.567 8 9.5 8S13 9.567 13 11.5 11.433 15 9.5 15 6 13.433 6 11.5ZM4 20c0-2.2091 1.79086-4 4-4h3c2.2091 0 4 1.7909 4 4 0 1.1046-.8954 2-2 2H6c-1.10457 0-2-.8954-2-2Z" />
            </svg>

            <label className="ml-2">Admin</label>
          </div>

          <div className="cursor-pointer text-slate-400 hover:text-white mt-1 rounded-md h-[6%] w-[95%] hover:bg-slate-700 flex flex-row items-center">
            <svg
              className="w-6 h-6 text-white dark:text-white ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <label className="ml-2">Settings</label>
          </div>
        </div>
        <div className="ml-[0.5%] mt-[0.5%] w-[82%] h-[98%] shadow-md">
          {url && <iframe className="w-[100%] h-[100%]" src={url}></iframe>}        
        </div>
      </div>
    </div>
  );
}
