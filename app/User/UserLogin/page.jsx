"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner/page";

export default function UserLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState(false);
  
  //Handle Login function

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoadingStatus(true);
    try {
      const request = await fetch(
        `http://localhost:8080/api/v1/user/user-login?userEmail=${encodeURIComponent(
          email
        )}&userPassword=${encodeURIComponent(password)}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: email,
            userPassword: password,
          }),
        }
      );
      if (request.ok) {
        const response = await request.json();
        if (response.userAvailability == false) {
          setLoadingStatus(false);
          setErrorMessage(response.userLoginMessage);
        } else {          
          router.push(`/User/DashBoard?userFullName=${encodeURIComponent(response.userFullName)}`);
          setLoadingStatus(false);
        }
      } else {
        setLoadingStatus(false);
        setErrorMessage("Response not received from server. Please contact the administrator!");
      }
    } catch (error) {
      setLoadingStatus(false);
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <div className="text-white font-serif text-3xl items-center justify-center flex">
        <label className="mt-7">
          Daily Inter Bank Transfers Management - SLICGL
        </label>
      </div>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className=" flex flex-col items-center justify-center mt-35">
          <div className="border border-white h-[270px] w-[600px] rounded-xl">
            <div className="flex flex-row justify-center mt-2">
              <label className="text-white text-xl font-serif">
                Please provide login credentials
              </label>
            </div>

            <div className="flex flex-row items-center justify-center text-white mt-15">
              <div className="font-serif text-lg">
                <label>Login ID: </label>
              </div>
              <div className="font-serif text-lg">
                <input
                  type="email"
                  className="ml-2 w-[300px] border border-white rounded-sm outline-none px-2 bg-slate-200 text-slate-900"
                  placeholder="Enter E-mail"
                  required
                  ref={emailRef}
                />
              </div>
            </div>
            <div className="ml-[-5px] flex flex-row items-center justify-center text-white mt-4">
              <div className="font-serif text-lg">
                <label>Password: </label>
              </div>
              <div className="font-serif text-lg">
                <input
                  type="password"
                  className="ml-2 w-[300px] border border-white rounded-sm outline-none px-2  bg-slate-200 text-slate-900"
                  placeholder="Enter Password"
                  required
                  ref={passwordRef}
                />
              </div>
            </div>

            <div className="ml-[-115px] flex flex-row items-center justify-center text-white mt-4">
              <div className="font-serif text-lg">
                <button
                  type="submit"
                  className="border w-[100px] h-[35px] rounded-md hover:bg-slate-700 flex flex-row items-center justify-center px-2 py-1">
                  {loadingStatus && (
                    <div className="mt-1">
                      <Spinner size={25} />
                    </div>
                  )}
                  <div className="px-2">Login</div>
                </button>
              </div>
            </div>
            {errorMessage && (
              <div className="ml-[15px] flex flex-row items-center justify-center text-white mt-2">
                <div className="text-md">
                  <label className="text-red-500">{errorMessage}</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
