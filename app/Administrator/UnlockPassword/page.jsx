"use client"
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '@/app/Spinner/page';
import ErrorMessage from '@/app/Messages/ErrorMessage/page';
import SUccessMessage from '@/app/Messages/SuccessMessage/page';

export default function UnlockPassword({ onCancel }) {

  const [userList, setUserList] = useState([]);
  const [unlockSpinner, setUnlockSpinner] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define getUser function;
  const getUser = async () => {
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/user/userList`,
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
          setUserList(response.responseObject);
        }
      } else {
        setErrorMessage(
          "Unable to load Users. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //Define unlockPassword function;
  const unlockPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    setSuccessMessage(false);
    setUnlockSpinner(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/password/unlockPassword?userId=${selectedUser}`,
        {
          method: "PUT",
          credentials: "include"
        }
      );
      if (request.ok) {
        const response = await request.json();
        setSuccessMessage(response.message);
      } else {
        const response = await request.json();
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    } finally {
      setUnlockSpinner(false);
    }
  }


  return (
    <div className='mt-4'>
      <div className='shadow-md h-[170px]'>
        <div className="bg-red-800 h-[30px] flex flex-row items-center">
          <label className="text-white ml-3 text-lg font-serif">
            Unlock User Password
          </label>
        </div>
        <form onSubmit={(e) => unlockPassword(e)}>
          <div className='mt-4'>
            <div className='flex flex-row gap-5'>
              <div>
                <label
                  htmlFor="small"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                  User:
                </label>
                <select
                  id="small"
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                  className="outline-none block w-[400px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value={""}>- Select User -</option>
                  {
                    userList.map((element) => (
                      <option key={element.userId} value={element.userId}>{element.userEpf + " - " + element.userFirstName + " " + element.userLastName}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-row mt-4'>
            <div>
              <button
                type="submit"
                className="border flex flex-row ml-2 gap-0.5 h-[30px] items-center justify-center w-[85px] text-white bg-blue-700 hover:bg-blue-600 rounded-md border-none">
                {unlockSpinner && <Spinner size={20} />}
                <label>Unlock</label>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onCancel()}
                className="border flex flex-row ml-2 h-[30px] items-center justify-center w-[80px] text-white bg-red-700 hover:bg-red-600 rounded-md border-none">
                <label>Cancel</label>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>
        <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
      </div>
    </div>
  )
}
