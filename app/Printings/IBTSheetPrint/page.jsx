"use client"
import React, { useState } from 'react'
import Spinner from '../../Spinner/page'
import ErrorMessage from '../../Messages/ErrorMessage/page';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function IBTSheetPrint() {
    //Define base url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    //Define state variables;
    const [sheetDate, setSheetDate] = useState("");
    const [sheetData, setSheetData] = useState([]);
    const [sheetDataTable, setSheetDataTable] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [viewSpinner, setViewSpinner] = useState(false);
    const [downloadSpinner, setDownloadSpinner] = useState(false);
    const [exportSpinner, setExportSpinner] = useState(false);

    //Define getSheetData function;
    const getSheetData = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSheetDataTable(false);
        setViewSpinner(true);
        try {
            const request = await fetch(
                `${baseUrl}/api/v1/printing/printIBTSheet?sheetDate=${sheetDate}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (request.ok) {
                const response = await request.json();
                setSheetDataTable(true);
                setSheetData(response.responseObject);
            } else {
                const response = await request.json();
                setErrorMessage(response.message);
                setSheetDataTable(false);
            }
        } catch (error) {
            setErrorMessage("Un-expected error occurred. Please contact administrator!");
            setSheetDataTable(false);
        } finally {
            setViewSpinner(false);
        }
    }

    //Define download function;
    const downloadPDF = () => {
        setDownloadSpinner(true);

        const tableElement = document.querySelector('.min-w-full.border.border-blue-600');

        if (!tableElement) {
            setErrorMessage("Table not found for download");
            setDownloadSpinner(false);
            return;
        }

        // Create a container div for the entire PDF content
        const pdfContainer = document.createElement('div');
        pdfContainer.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 1000px;
        padding: 20px;
        background: white;
        z-index: -1000;
    `;

        // Create Company Name title
        const companyName = document.createElement('h1');
        companyName.textContent = "Sri Lanka Insurance Corporation General Limited";
        companyName.style.cssText = `
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #000000;
        font-family: Arial, sans-serif;
    `;

        // Create header title
        const headerTitle = document.createElement('h1');
        headerTitle.textContent = `IBT Sheet for ${sheetDate}`;
        headerTitle.style.cssText = `
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #000000;
        font-family: Arial, sans-serif;
    `;

        // Create a wrapper div to center the table
        const tableWrapper = document.createElement('div');
        tableWrapper.style.cssText = `
        display: flex;
        justify-content: center;
        width: 100%;
    `;

        const tableClone = tableElement.cloneNode(true);

        const applyPDFSafeStyles = (element) => {
            element.style.color = '#000000';
            element.style.backgroundColor = '#ffffff';
            element.style.borderColor = '#000000';

            const allElements = element.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.color = '#000000';
                el.style.backgroundColor = el.tagName === 'TH' ? '#f8f9fa' : '#ffffff';
                el.style.borderColor = '#000000';

                el.classList.remove('dark:text-white', 'dark:bg-gray-700', 'dark:border-gray-600',
                    'text-gray-900', 'bg-gray-50', 'border-gray-300',
                    'text-gray-600', 'text-gray-700', 'text-gray-800',
                    'bg-blue-50', 'hover:bg-gray-50');
            });
        };

        applyPDFSafeStyles(tableClone);

        // Assemble the PDF content
        tableWrapper.appendChild(tableClone);
        pdfContainer.appendChild(companyName);
        pdfContainer.appendChild(headerTitle);
        pdfContainer.appendChild(tableWrapper);
        document.body.appendChild(pdfContainer);

        html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            removeContainer: true,
            onclone: (clonedDoc, element) => {

                const allClonedElements = element.querySelectorAll('*');
                allClonedElements.forEach(el => {
                    const computedStyle = window.getComputedStyle(el);
                    if (computedStyle.color) {
                        el.style.color = '#000000';
                    }
                    if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'transparent') {
                        if (el.tagName === 'TH') {
                            el.style.backgroundColor = '#f8f9fa';
                        } else if (el.tagName !== 'H1') {
                            el.style.backgroundColor = '#ffffff';
                        }
                    }
                    if (computedStyle.borderColor) {
                        el.style.borderColor = '#000000';
                    }
                });
            }
        }).then((canvas) => {
            // Clean up
            document.body.removeChild(pdfContainer);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgWidth = 297; // A4 landscape width in mm
            const pageHeight = 210; // A4 landscape height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`IBT-Sheet-${sheetDate}.pdf`);
            setDownloadSpinner(false);
        }).catch((error) => {
            console.error('Error generating PDF:', error);
            setErrorMessage("Failed to generate PDF. Please try again.");
            setDownloadSpinner(false);
            if (document.body.contains(pdfContainer)) {
                document.body.removeChild(pdfContainer);
            }
        });
    };

    //Define exportJv function;
    const exportJv = async () => {
        setExportSpinner(true);
        try {
            const response = await fetch(`${baseUrl}/api/v1/excel-export/je-export/excel?date=${sheetDate}`,
                {
                    method: 'GET',
                    credentials: "include"
                });
            if (!response.ok) {
                throw new Error('Export failed');
            }

            // Create blob from response
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // Add current date to filename
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            a.download = `je_export_${formattedDate}.xlsx`;

            document.body.appendChild(a);
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (error) {
            alert('Failed to export data');
        } finally {
            setExportSpinner(false);
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <div className="bg-red-800 h-[30px] flex flex-row items-center">
                    <label className="text-white ml-3 text-lg font-serif">
                        Print IBT Sheet
                    </label>
                </div>
                <form onSubmit={(e) => getSheetData(e)}>
                    <div className='shadow-md p-4 flex flex-col'>
                        <div className='flex flex-row gap-1'>
                            <div>
                                <label
                                    htmlFor="small"
                                    className="mt-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-3">
                                    Transfer Date:
                                </label>
                            </div>
                            <div>
                                <input
                                    type="date"
                                    onChange={(e) => setSheetDate(e.target.value)}
                                    required
                                    id="small"
                                    className="outline-none block w-[300px] ml-2 p-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                            </div>
                            <div>
                                <button type="submit" className="flex flex-row items-center justify-center gap-1 h-[30px] w-[80px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {viewSpinner && <Spinner size={20} />}
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                {errorMessage && <ErrorMessage messageValue={errorMessage} />}
            </div>

            {/* Data Table Section */}
            {sheetDataTable && (
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            IBT Sheet Data
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table id="ibt-sheet-table" className="min-w-full border border-blue-600 pdf-safe-table">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left">From Bank</th>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left">From Account</th>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left">To Bank</th>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left">To Account</th>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left text-right">Amount</th>
                                    <th className="border border-blue-600 text-sm px-4 py-3 font-semibold text-gray-700 text-left">Channel</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sheetData.map((element) => (
                                    <tr key={element.transferId} className="hover:bg-gray-50 transition duration-150">
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600">{element.fromBank}</td>
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600">{element.fromAccount}</td>
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600">{element.toBank}</td>
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600">{element.toAccount}</td>
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600 text-right">
                                            {typeof element.transferAmount === "number"
                                                ? element.transferAmount.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })
                                                : element.requestAmount}
                                        </td>
                                        <td className="border border-blue-600 text-sm px-4 py-2 text-gray-600">{element.channel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {sheetDataTable && (
                <div className="flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={downloadPDF}
                        disabled={viewSpinner}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-md shadow-sm transition duration-100"
                    >
                        {downloadSpinner ? (
                            <>
                                <Spinner size={20} />
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={exportJv}
                        disabled={viewSpinner}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-md shadow-sm transition duration-100"
                    >
                        {exportSpinner ? (
                            <>
                                <Spinner size={20} />
                                Exporting Excel...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export JV
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
