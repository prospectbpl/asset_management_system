import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import InsuranceReportPreview from "./InsuranceReportPreview";

function InsuranceReport({ handleLogout, username }) {
    const [insurances, setInsurances] = useState([]);
    const [printInsuranceData, setPrintInsuranceData] = useState(null);
    const [showInsurancePrint, setShowInsurancePrint] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(""); // Initialize with empty value for month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize with current year
    const [filteredInsurance, setFilteredInsurance] = useState([]); // State for filtered insurance data
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record

    useEffect(() => {
        fetchInsurance();
    }, []);

    useEffect(() => {
        filterInsurances(); // Call filterInsurances whenever selectedMonth or selectedYear changes
    }, [selectedMonth, selectedYear, insurances]);

    const fetchInsurance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/insurance/report`);
            setInsurances(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching insurances:", error);
        }
    };

    const filterInsurances = () => {
        // Filter the insurances based on selected month and year
        const filtered = insurances.filter(record => {
            const date = new Date(record.startDate);
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth() + 1; // +1 because JS months are 0-based
            return (
                (selectedYear && recordYear === selectedYear) &&
                (!selectedMonth || recordMonth === selectedMonth)
            );
        });
        setFilteredInsurance(filtered);
    };

    const handleInsurancePrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredInsurance.length > 0 ? filteredInsurance[0].status : '',
            insuranceData: filteredInsurance,
            selectedMonth,
            selectedYear
        });

        setShowInsurancePrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    const handleClosePreview = () => {
        setShowSidebar(true); // Set to true to show sidebar
        setShowSearchBar(true);
        setShowInsurancePrint(false);
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className='d-flex w-100% h-100'>
            {showSidebar && <Sidebar />}
            <div className='w-100'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid">
                    <ToastContainer />
                    {/* Conditionally render the insurance list if showInsurancePrint is false */}
                    {showInsurancePrint ? (
                        <InsuranceReportPreview
                            record={selectedRecord}
                            onClose={handleClosePreview}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row gap-4 align-items-center justify-center w-50">
                                            <h6 className="m-0 font-weight-bold text-primary">
                                                Insurance Report List
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center gap-4">
                                            <div className='d-flex align-items-center justify-content-center gap-1'>
                                                <label className='pt-2 text-black fw-bolder'>Filter:</label>
                                                <select
                                                    className="form-control"
                                                    value={selectedMonth}
                                                    onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : "")}
                                                >
                                                    <option value="">Select Month</option>
                                                    {Array.from({ length: 12 }, (_, i) => (
                                                        <option key={i} value={i + 1}>{new Date(2000, i).toLocaleString('default', { month: 'long' })}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    className="form-control"
                                                    value={selectedYear}
                                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                                >
                                                    <option value="">Select Year</option>
                                                    {Array.from({ length: 10 }, (_, i) => (
                                                        <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <button className="btn btn-success" onClick={handleInsurancePrint}>PDF <span> <i className="fa fa-download"></i></span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Asset Picture</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Tag</th>
                                                    <th>company Name</th>
                                                    <th>Policy Number</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                 
                                                </tr>
                                            </thead>
                                            <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
                                                {filteredInsurance.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">Thier is No Insurance .</td>
                                                    </tr>
                                                ) : (
                                                    filteredInsurance.map((insurance) => (
                                                        <tr key={insurance.id}>
                                                            <td>
                                                                <img
                                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${insurance.assetPhoto}`}
                                                                    style={{ width: "90px" }}
                                                                    alt="Asset Picture"
                                                                />
                                                            </td>
                                                            <td>{insurance.assetName}</td>
                                                            <td>{insurance.assetTag}</td>
                                                            <td>{insurance.insuranceCompanyName}</td>
                                                            <td>{insurance.policyNumber}</td>
                                                            <td style={{whiteSpace:"nowrap"}}>{formatDate(insurance.startDate)}</td>
                                                            <td style={{whiteSpace:"nowrap"}}>{formatDate(insurance.endDate)}</td>
                                                            
                                                        </tr>
                                                    )))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InsuranceReport;
