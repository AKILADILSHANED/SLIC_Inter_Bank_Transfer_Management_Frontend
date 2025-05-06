"use client";
import React, { useState } from "react";
import Spinner from "@/app/Spinner/page";
import { useEffect } from "react";
import ErrorMessage from "@/app/Messages/ErrorMessage/page";
import SUccessMessage from "@/app/Messages/SuccessMessage/page";

export default function ApproveRequest() {
  //Define base url;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  //Define state variables;
  const [approveSpinner, setApproveSpinner] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestDetails, setRequestDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  //Handle function to load existing available fund request data, when loading this component.
  const loadRequestData = async () => {
    setErrorMessage(false);
    setRequestDetails([]);
    try {
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/getRequestDetails-approve`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (request.ok) {
        const response = await request.json();
        if ((response.success == false)) {
          setErrorMessage(response.message);
        } else {
          setRequestDetails(response.responseObject);
        }
      } else {
        setErrorMessage(
          "No response from server. Please contact administrator!"
        );
      }
    } catch (error) {
      setErrorMessage(
        "Un-expected error occurred. Please contact administrator!"
      );
    }
  }
  useEffect(
    ()=>{      
      loadRequestData();
    },[]
  );

  //Define handleApprove function;
  const handleApprove = async (requestId)=>{
    setApproveSpinner(requestId);
    try{
      const request = await fetch(
        `${baseUrl}/api/v1/fund-request/approve-request?requestId=${encodeURIComponent(requestId)}`,
        {
          method:"PUT",
          credentials:"include"
        }
      );
      if(request.ok){
        const response = await request.json();
        if(response.success == false){
          setErrorMessage(response.message);
        }else{
          await loadRequestData();
          setSuccessMessage(response.message);
        }
      }else{
        setErrorMessage("Un-expected error occurred. Please contact administrator!");
      }
    }catch(error){
      setErrorMessage("Un-expected error occurred. Please contact administrator!");
    }finally{
      setApproveSpinner(null);
    }
  }

  return (
    <div>
      <div className="bg-red-800 h-[30px] flex flex-row items-center mt-4">
        <label className="text-white ml-3 text-lg font-serif">
          List of Fund Request for approval
        </label>
      </div>
      
      <div>{successMessage && <SUccessMessage messageValue={successMessage} />}</div>
      <div>{errorMessage && <ErrorMessage messageValue={errorMessage} />}</div>

      {requestDetails.length > 0 && 
      
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Request ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Account
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3">
                  Request By
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Request Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Request Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Required Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requestDetails.map(element=>(
                <tr key={element.requestId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{element.requestId}</td>
                <td className="px-6 py-4">{element.accountNumber}</td>
                <td className="px-6 py-4">{element.paymentType}</td>
                <td className="px-6 py-4">{element.requestBy}</td>
                <td className="px-6 py-4">
                <p className="block text-sm text-slate-800 text-right">
                      {typeof element.requestAmount === "number"
                        ? element.requestAmount.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : element.requestAmount}
                    </p>
                </td>
                <td className="px-6 py-4">{element.requestDate}</td>
                <td className="px-6 py-4">{element.requiredDate}</td>
                <td className="px-6 py-4">
                  <button type="submit" onClick={()=>handleApprove(element.requestId)} className="bg-green-600 shadow-sm shadow-slate-800 flex flex-row items-center justify-center text-white h-[28px] w-[90px] rounded-md hover:bg-green-700">
                  {approveSpinner === element.requestId && <Spinner size={20}/>}
                    <label className="ml-1">Approve</label>
                  </button>
                </td>
              </tr>
              ))}              
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}
