"use client";
import React, { useState } from "react";
import AddChannel from "./AddChannel/page";
import ChannelDetails from "./ChannelDetails/page";
import RemoveChannel from "./RemoveChannel/page";
import PriorityLevel from "./PriorityLevel/page";
import NewTransferOption from "./NewTransferOption/page";

export default function Administrator() {
  //Define state variables;
  const [channelDropdown, setChannelDropdown] = useState(false);
  const [optionDropdown, setoptionDropdown] = useState(false);

  const [addChannel, setAddChannel] = useState(false);
  const [channelDetails, setChannelDetails] = useState(false);
  const [removeChannel, setRemoveChannel] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState(false);

  const [transferOption,setTransferOption] = useState(false);

  //Define subFunction array;
  const arraySubFunction = [
    setAddChannel,
    setChannelDetails,
    setRemoveChannel,
    setPriorityLevel,
    setTransferOption,
  ];

  //Define handleCancel function;
  const handleCancel = (cancelComponentSetter) => {
    cancelComponentSetter(false);
  };

  //Define handleSubFunction;
  const handleSubFunction = (selectedFunction) => {
    for (let userSelectedFunction of arraySubFunction) {
      userSelectedFunction(false);
    }
    selectedFunction(true);
    setChannelDropdown(false);
    setoptionDropdown(false);
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
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M6 2c-1.10457 0-2 .89543-2 2v4c0 .55228.44772 1 1 1s1-.44772 1-1V4h12v7h-2c-.5523 0-1 .4477-1 1v2h-1c-.5523 0-1 .4477-1 1s.4477 1 1 1h5c.5523 0 1-.4477 1-1V3.85714C20 2.98529 19.3667 2 18.268 2H6Z" />
          <path d="M6 11.5C6 9.567 7.567 8 9.5 8S13 9.567 13 11.5 11.433 15 9.5 15 6 13.433 6 11.5ZM4 20c0-2.2091 1.79086-4 4-4h3c2.2091 0 4 1.7909 4 4 0 1.1046-.8954 2-2 2H6c-1.10457 0-2-.8954-2-2Z" />
        </svg>
        <div>
          <label className="text-white text-xl ml-1">Administrator |</label>
        </div>

        <div
          onMouseEnter={() => setChannelDropdown(true)}
          onMouseLeave={() => setChannelDropdown(false)}
          className="relative inline-block text-left ml-20">
          <div className="flex flex-row items-center">
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
                d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
              />
            </svg>

            <button
              type="button"
              className="inline-flex w-full border-none bg-slate-800 hover:bg-slate-700 justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-white shadow-xs"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true">
              Transfer Channels
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon">
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {channelDropdown && (
            <div
              className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1">
              <div
                onClick={() => handleSubFunction(setAddChannel)}
                className="py-1"
                role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Add New Channel
                </button>
              </div>
              <div
                onClick={() => handleSubFunction(setChannelDetails)}
                className="py-1"
                role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Channel Details
                </button>
              </div>
              <div
                onClick={() => handleSubFunction(setRemoveChannel)}
                className="py-1"
                role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Remove Channel
                </button>
              </div>
              <div 
              onClick={() => handleSubFunction(setPriorityLevel)}
              className="py-1" role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Set Priority Level
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => setoptionDropdown(true)}
          onMouseLeave={() => setoptionDropdown(false)}
          className="relative inline-block text-left ml-2">
          <div className="flex flex-row items-center">
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
                d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
              />
            </svg>

            <button            
              type="button"
              className="inline-flex w-full border-none bg-slate-800 hover:bg-slate-700 justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm text-white shadow-xs"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true">
              Transfer Options
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon">
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {optionDropdown && (
            <div
              className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1">
              <div 
              onClick={() => handleSubFunction(setTransferOption)}
              className="py-1" role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Set New Option
                </button>
              </div>
              <div className="py-1" role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Option De-activate
                </button>
              </div>
              <div className="py-1" role="none">
                <button
                  className="block text-left px-4 py-2 w-56 text-sm text-gray-700 hover:bg-slate-300"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0">
                  Available Options
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center justify-center ml-5">
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

          <div className="text-sm text-white hover:bg-slate-700 w-[110px] h-[32] flex flex-col items-center justify-center rounded-md">
            <button>Delete Account</button>
          </div>
        </div>
      </div>

      {addChannel && (
        <div>
          <AddChannel onCancel={() => handleCancel(setAddChannel)} />
        </div>
      )}

      {channelDetails && (
        <div>
          <ChannelDetails />
        </div>
      )}

      {removeChannel && (
        <div>
          <RemoveChannel onCancel={() => handleCancel(setRemoveChannel)} />
        </div>
      )}

      {priorityLevel && (
        <div>
          <PriorityLevel onCancel={() => handleCancel(setPriorityLevel)} />
        </div>
      )}

      {transferOption && (
        <div>
          <NewTransferOption onCancel={() => handleCancel(setTransferOption)} />
        </div>
      )}
    </div>
  );
}
