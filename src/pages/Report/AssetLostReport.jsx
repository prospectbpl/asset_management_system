import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import AssetLostReportPreview from "./AssetLostReportPreview";

function AssetLostReport({ handleLogout, username }) {
    const [assetLosts, setAssetLosts] = useState([]); // Renamed to assetLosts
    // For Print the Details  
    const [printAssetLostData, setPrintAssetLostData] = useState(null); // Renamed to printAssetLostData
    const [showAssetLostPrint, setShowAssetLostPrint] = useState(false); // Renamed to showAssetLostPrint
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    // filter with date 
    const [selectedMonth, setSelectedMonth] = useState(""); // Initialize with empty value for month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize with current year
    const [filteredAssetLost, setFilteredAssetLost] = useState([]); // Renamed to filteredAssetLost
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record

    useEffect(() => {
        fetchAssetLost(); // Updated function call
    }, []);

    useEffect(() => {
        filterAssetLosts(); // Updated function call
    }, [selectedMonth, selectedYear, assetLosts]);

    const fetchAssetLost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/lost`); // Updated URL to fetch asset lost data
            setAssetLosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching asset losts:", error);
        }
    };

    const filterAssetLosts = () => {
        // Filter the asset lost records based on selected month and year
        const filtered = assetLosts.filter(record => {
            const date = new Date(record.lossDate);
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth() + 1; // +1 because JS months are 0-based
            return (
                (selectedYear && recordYear === selectedYear) &&
                (!selectedMonth || recordMonth === selectedMonth)
            );
        });
        setFilteredAssetLost(filtered);
    };

    const handleAssetLostPrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredAssetLost.length > 0 ? filteredAssetLost[0].status : '',
            assetLostData: filteredAssetLost,
            selectedMonth,
            selectedYear
        });

        setShowAssetLostPrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    const handleClosePreview = () => {
        setShowSidebar(true);
        setShowSearchBar(true);
        setShowAssetLostPrint(false);
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
                    {/* Conditionally render the asset lost list if showAssetLostPrint is false */}
                    {showAssetLostPrint ? (
                        <AssetLostReportPreview
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
                                                Asset Lost Report
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
                                                <button className="btn btn-success" onClick={handleAssetLostPrint}>PDF <span> <i className="fa fa-download"></i></span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body" >
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Asset Picture</th>
                                                        <th>Asset Name</th>
                                                        <th>Asset Tag</th>
                                                        <th>Loss Date</th>
                                                        <th>Quantity</th>
                                                        <th>Loss Type</th>
                                                        <th>Location</th>
                                                        <th>Responsible Person</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {filteredAssetLost.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="8" className="text-center">Thier is No Asset Lost Data .</td>
                                                        </tr>
                                                    ) : (
                                                        filteredAssetLost.map((assetLost) => (
                                                            <tr key={assetLost.id}>
                                                                <td>
                                                                    <img
                                                                        src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${assetLost.assetPhoto}`}
                                                                        style={{ width: "90px" }}
                                                                        alt="Asset"
                                                                    />
                                                                </td>
                                                                <td>{assetLost.assetName}</td>
                                                                <td>{assetLost.assetTag}</td>
                                                                <td className="" style={{ whiteSpace: 'nowrap' }}>{formatDate(assetLost.lossDate)}</td>
                                                                <td>{assetLost.newquantity}</td>
                                                                <td>{assetLost.lossType}</td>
                                                                <td>{assetLost.lossLocation}</td>
                                                                <td>{assetLost.responsiblePerson}</td>
                                                            </tr>
                                                        )))}
                                                </tbody>
                                            </table>
                                        </div>

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

export default AssetLostReport;
