"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner/page";
import Image from "next/image";
import { useAuth } from '@/app/context/AuthContext';

export default function UserLogin() {

  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // States for password change
  const [resetEmail, setResetEmail] = useState("");
  const [resetTempPassword, SetResetTempPassword] = useState("");
  const [resetPassword, SetResetPassword] = useState("");
  const [resetRetypedPassword, SetResetRetypedPassword] = useState("");
  const [modalSuccessMessage, setModalSuccessMessage] = useState("");
  const [modalErrorMessage, SetModalErrorMessage] = useState("");
  const [modalLoadingStatus, setModalLoadingStatus] = useState(false);
  const { login } = useAuth();

  //Handle Login function

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoadingStatus(true);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/user/user-login`,
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
        if (response.success == false) {
          setErrorMessage(response.message);
        } else {
          login(response.responseObject); 
          router.push(`/User/DashBoard?userFullName=${encodeURIComponent(response.responseObject.userTitle + " " + response.responseObject.userFirstName + " " + response.responseObject.userLastName + ".")}`);
        }
      } else {
        setErrorMessage("Response not received from server. Please contact the administrator!");
      }
    } catch (error) {
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    } finally {
      setLoadingStatus(false);
    }
  };

  //Handle Password Reset function
  const handlePasswordReset = async () => {
    setModalSuccessMessage(false);
    SetModalErrorMessage(false);
    setModalLoadingStatus(true);
    if (resetPassword != resetRetypedPassword) {
      SetModalErrorMessage("New Password and Re-typed password should be same!");
      setModalLoadingStatus(false);
    } else {
      try {
        const request = await fetch(
          `${baseUrl}/api/v1/user/password-reset`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userEmail: resetEmail,
              temporaryPassword: resetTempPassword,
              changedPassword: resetPassword
            }),
          }
        );
        if (!request.ok) {
          const response = await request.json();
          SetModalErrorMessage(response.message);
          return;
        } else {
          const response = await request.json();
          setModalSuccessMessage(response.message);
          return;
        }
      } catch (error) {
        SetModalErrorMessage("Un-expected error occurred. Please contact administrator!");
      } finally {
        setModalLoadingStatus(false);
      }
    }

  }


  return (
    <div className="bg-[#02255a] w-full min-h-screen flex flex-row">
      <div>
        <Image
          src="/building01.png"
          alt="Building"
          width={500}
          height={300}
          className="scale-100 float-left mt-[70px] border opacity-20"
        />
      </div>
      <div className="min-h-screen flex flex-col">
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

              <div className="gap-2 flex flex-row items-center justify-center text-white mt-4">
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
                <div className="font-serif text-lg">
                  <div>
                    <button
                      data-dialog-target="sign-in-modal"
                      onClick={() => setShowModal(true)}
                      className="border w-[100px] h-[35px] rounded-md hover:bg-slate-700 flex flex-row items-center justify-center px-2 py-1">
                      Reset
                    </button>
                    {showModal &&
                      <div
                        data-dialog-backdrop="sign-in-modal"
                        data-dialog-backdrop-close="true"
                        // Add an onClick handler to the backdrop to close the modal            
                        // Conditionally apply classes based on the `showModal` state
                        className={`pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"
                          }`}
                      >
                        <div
                          data-dialog="sign-in-modal"
                          className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
                        >
                          <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-slate-700 transition-colors"
                            aria-label="Close modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>

                          <div className="relative flex flex-col bg-white">
                            <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
                              <h3 className="text-2xl">
                                Reset Password
                              </h3>
                            </div>
                            <div className="flex flex-col gap-4 p-6">
                              <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600">
                                  Email Address
                                </label>
                                <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required type="email" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Email Address" />
                              </div>

                              <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600">
                                  Temporary Password
                                </label>
                                <input value={resetTempPassword} onChange={(e) => SetResetTempPassword(e.target.value)} required type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your Temporary Password" />
                              </div>

                              <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600">
                                  New Password
                                </label>
                                <input maxLength={10} value={resetPassword} onChange={(e) => SetResetPassword(e.target.value)} required type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Your New Password" />
                              </div>

                              <div className="w-full max-w-sm min-w-[200px]">
                                <label className="block mb-2 text-sm text-slate-600">
                                  Re-type Password
                                </label>
                                <input maxLength={10} value={resetRetypedPassword} onChange={(e) => SetResetRetypedPassword(e.target.value)} required type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Re-type Password" />
                              </div>
                            </div>
                            <div className="p-6 pt-0">
                              <button onClick={() => handlePasswordReset()} className="w-full flex items-center justify-center gap-1 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                {modalLoadingStatus && (
                                  <div className="mt-1">
                                    <Spinner size={25} />
                                  </div>
                                )}
                                Change Password
                              </button>
                            </div>
                            {modalSuccessMessage && <div className="ml-[25px]"><label className="text-sm text-green-500">{modalSuccessMessage}</label></div>}
                            {modalErrorMessage && <div className="ml-[25px]"><label className="text-sm text-red-500">{modalErrorMessage}</label></div>}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
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
        <div className="text-slate-500 text-sm ml-9"><label>Solution by Akila Edirisooriya. All Right Reserved &copy; 2025</label></div>
      </div>      
    </div>
  );
}
