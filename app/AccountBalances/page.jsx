"use client";
import React from "react";
import { useState } from "react";
import EnterBalance from "./BalanceEnter/page";

export default function page() {
  //Define states;
  const [newBalanceEnter, setNewBalanceEnter] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(false);
  const [updateBalance, setUpdateBalance] = useState(false);
  const [deleteBalance, setDeleteBalance] = useState(false);

  //Define cancel functionality;
  const handleCancel = (setterCancel) => {
    setterCancel(false);
  };

  //Define an array for setter functions;
  const arraySetters = [
    setNewBalanceEnter,
    setDisplayBalance,
    setUpdateBalance,
    setDeleteBalance,
  ];

  //Define function for handling each main function user clicks;
  const handleClick = (setterFunction) => {
    arraySetters.forEach((setter) => {
      setter(false);
    });
    setterFunction(true);
  };

  return (
    <div>
      <div className="bg-slate-800 w-full h-[45px] flex flex-row items-center">
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
        <div>
          <label className="text-white text-xl ml-1">Account Balances |</label>
        </div>

        <div
          onClick={() => handleClick(setNewBalanceEnter)}
          className="flex flex-row items-center justify-center ml-[100px]">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[140px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Enter New Balance</button>
          </div>
        </div>

        <div
          onClick={() => handleClick(setDisplayBalance)}
          className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[120px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Display Balance</button>
          </div>
        </div>

        <div
          onClick={() => handleClick(setUpdateBalance)}
          className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[120px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Update Balance</button>
          </div>
        </div>

        <div
          onClick={() => handleClick(setDeleteBalance)}
          className="flex flex-row items-center justify-center ml-5">
          <svg
            className="w-6 h-6 text-white dark:text-white"
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
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>

          <div className="text-sm text-white hover:bg-slate-700 w-[120px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Delete Balance</button>
          </div>
        </div>
      </div>

      {newBalanceEnter && (
        <div className="mt-4">
          <EnterBalance onCancel={() => handleCancel(setAccountRegister)} />
        </div>
      )}

      {/*accountSearch && (
        <div>
          <SearchAccount onCancel={() => handleCancel(setAccountSearch)} />
        </div>
      )}

      {accountUpdate && (
        <div>
          <UpdateAccount onCancel={() => handleCancel(setAccountUpdate)} />
        </div>
      )}

      {accountDelete && (
        <div>
          <DeleteAccount onCancel={() => handleCancel(setAccountDelete)} />
        </div>
      )*/}
    </div>
  );
}
