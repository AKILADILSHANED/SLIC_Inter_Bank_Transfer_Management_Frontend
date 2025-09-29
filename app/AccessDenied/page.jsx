import React from 'react'

export default function AccessDenied() {
    return (
        <div className='flex flex-col items-center justify-center mt-40'>
            <div className='flex flex-row items-center justify-center'>
                <svg className="w-[52px] h-[52px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                </svg>

                <label className='text-4xl text-red-600'>Access Denied!</label>
            </div>
            <div>
                <hr className="w-150 border-t-2 border-black mt-2" />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <label>You do not have permission to access this function.</label>
                <label>Please contact your system administrator to grant authority for this function.</label>
            </div>            
        </div>
    )
}
