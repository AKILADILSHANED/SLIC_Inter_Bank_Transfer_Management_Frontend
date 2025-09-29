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
    setModalSuccessMessage("");
    SetModalErrorMessage("");
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
    <div className="bg-[#02255a] min-h-screen flex flex-col lg:flex-row items-center justify-center p-4">
      {/* Background Image - Hidden on mobile, visible on larger screens */}
      <div className="hidden lg:block lg:flex-1 max-w-2xl">
        <Image
          src="/building01.png"
          alt="Building"
          width={600}
          height={400}
          className="w-full h-auto opacity-20 object-cover rounded-lg"
          priority
        />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        {/* Title */}
        <div className="text-white font-serif text-xl md:text-2xl lg:text-3xl text-center mb-8 lg:mb-12 px-4">
          <label className="mt-4 lg:mt-8">
            Daily Inter Bank Transfers Management - SLICGL
          </label>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="border border-white rounded-xl p-6 md:p-8 bg-[#02255a]/80 backdrop-blur-sm w-full">
            {/* Form Title */}
            <div className="flex justify-center mb-6">
              <label className="text-white text-lg md:text-xl font-serif text-center">
                Please provide login credentials
              </label>
            </div>

            {/* Email Input */}
            <div className="flex flex-col mb-4">
              <label className="text-white font-serif text-sm md:text-lg mb-2">
                Login ID:
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-white rounded-sm outline-none bg-slate-200 text-slate-900 placeholder-slate-600 text-sm md:text-base"
                placeholder="Enter E-mail"
                required
                ref={emailRef}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col mb-6">
              <label className="text-white font-serif text-sm md:text-lg mb-2">
                Password:
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-white rounded-sm outline-none bg-slate-200 text-slate-900 placeholder-slate-600 text-sm md:text-base"
                placeholder="Enter Password"
                required
                ref={passwordRef}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 border border-white text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-slate-700 transition-colors duration-200 font-serif text-sm md:text-base"
                disabled={loadingStatus}
              >
                {loadingStatus && <Spinner size={20} />}
                Login
              </button>
              
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="border border-white text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-slate-700 transition-colors duration-200 font-serif text-sm md:text-base"
              >
                Reset
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 text-center">
                <label className="text-red-400 text-sm">{errorMessage}</label>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 lg:mt-8 text-center">
          <label className="text-slate-400 text-xs md:text-sm">
            Solution by Akila Edirisooriya. All Right Reserved &copy; 2025
          </label>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-800 text-white p-4 text-center relative">
              <h3 className="text-xl font-semibold">Reset Password</h3>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 space-y-4">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Email Address
                </label>
                <input
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700 text-sm"
                  placeholder="Your Email Address"
                />
              </div>

              {/* Temporary Password */}
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Temporary Password
                </label>
                <input
                  value={resetTempPassword}
                  onChange={(e) => SetResetTempPassword(e.target.value)}
                  required
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700 text-sm"
                  placeholder="Your Temporary Password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  New Password
                </label>
                <input
                  maxLength={10}
                  value={resetPassword}
                  onChange={(e) => SetResetPassword(e.target.value)}
                  required
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700 text-sm"
                  placeholder="Your New Password"
                />
              </div>

              {/* Re-type Password */}
              <div>
                <label className="block mb-2 text-sm text-slate-600">
                  Re-type Password
                </label>
                <input
                  maxLength={10}
                  value={resetRetypedPassword}
                  onChange={(e) => SetResetRetypedPassword(e.target.value)}
                  required
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 text-slate-700 text-sm"
                  placeholder="Re-type Password"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 pt-0">
              <button
                onClick={handlePasswordReset}
                disabled={modalLoadingStatus}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {modalLoadingStatus && <Spinner size={20} />}
                Change Password
              </button>

              {/* Success/Error Messages */}
              <div className="mt-4 text-center">
                {modalSuccessMessage && (
                  <p className="text-green-600 text-sm">{modalSuccessMessage}</p>
                )}
                {modalErrorMessage && (
                  <p className="text-red-600 text-sm">{modalErrorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
