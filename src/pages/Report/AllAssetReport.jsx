import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import { debounce } from "lodash"; // Import debounce function
import AllAssetReportPreview from "./AllAssetReportPreview";

function AllAssetReport({ handleLogout, username }) {
    const [assets, setAssets] = useState([]);
    // For Print the Details  
    const [printAssetData, setPrintAssetData] = useState(null);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    // filter with date 
    const [selectedMonth, setSelectedMonth] = useState(""); // Initialize with empty value for month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize with current year
    const [filteredAsset, setFilteredAsset] = useState([]); // State for filtered asset data
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record
    useEffect(() => {
        fetchAsset();
    }, []);

    useEffect(() => {
        filterAssets(); // Call filterAssets whenever selectedMonth or selectedYear changes
    }, [selectedMonth, selectedYear, assets]);

    const fetchAsset = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assetuniquedata`);
            setAssets(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching assets:", error);
        }
    };

    const filterAssets = () => {
        // Filter the assets based on selected month and year
        const filtered = assets.filter(record => {
            const date = new Date(record.purchaseDate);
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth() + 1; // +1 because JS months are 0-based
            return (
                (selectedYear && recordYear === selectedYear) &&
                (!selectedMonth || recordMonth === selectedMonth)
            );
        });
        setFilteredAsset(filtered);
    };

    const handleAssetPrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredAsset.length > 0 ? filteredAsset[0].status : '',
            assetData: filteredAsset,
            selectedMonth,
            selectedYear
        });

        setShowAssetPrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    const handleClosePreview = () => {
        setShowSidebar(true); // Set to true to show sidebar
        setShowSearchBar(true);
        setShowAssetPrint(false);
    };

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className='d-flex w-100% h-100 bg-white'>
            {showSidebar && <Sidebar />}
            <div className='w-100 bg-white'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid bg-white">
                    <ToastContainer />
                    {/* Conditionally render the asset list if showAssetPrint is false */}
                    {showAssetPrint ? (
                        <AllAssetReportPreview
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
                                                Asset Report List
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
                                                <button className="btn btn-success" onClick={handleAssetPrint}>PDF <span> <i className="fa fa-download"></i></span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Asset Picture</th>
                                                        <th>Asset Name</th>
                                                        <th>Asset Tag</th>
                                                        <th>Purchase Date</th>
                                                        <th>Category</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
                                                    {filteredAsset.map((asset) => (
                                                        <tr key={asset.id}>
                                                            <td>
                                                                <img
                                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                                                    style={{ width: "90px" }} className="asset-image"
                                                                    alt="Asset"
                                                                />
                                                            </td>
                                                            <td>{asset.name}</td>
                                                            <td>{asset.assettag}</td>
                                                            <td>{formatDate(asset.purchaseDate)}</td>
                                                            <td>{asset.category_name}</td>
                                                        </tr>
                                                    ))}
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

export default AllAssetReport;
