import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import MaintenanceReportPreview from "./MaintenanceReportPreview";

function MaintenanceReport({ handleLogout, username }) {
    const [maintenanceAssets, setMaintenanceAssets] = useState([]);
    const [printAssetData, setPrintAssetData] = useState(null);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        fetchMaintenanceAssets();
    }, []);

    useEffect(() => {
        filterAssets();
    }, [selectedMonth, selectedYear, maintenanceAssets]);

    const fetchMaintenanceAssets = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);
            setMaintenanceAssets(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching maintenance assets:", error);
        }
    };

    const filterAssets = () => {
        const filtered = maintenanceAssets.filter(record => {
            const date = new Date(record.startDate);
            const recordYear = date.getFullYear();
            const recordMonth = date.getMonth() + 1;
            return (
                (selectedYear && recordYear === selectedYear) &&
                (!selectedMonth || recordMonth === selectedMonth)
            );
        });
        setFilteredAssets(filtered);
    };

    const handleAssetPrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredAssets.length > 0 ? filteredAssets[0].status : '',
            assetData: filteredAssets,
            selectedMonth,
            selectedYear
        });

        setShowAssetPrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    const handleClosePreview = () => {
        setShowSidebar(true);
        setShowSearchBar(true);
        setShowAssetPrint(false);
    };

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
                    {showAssetPrint ? (
                        <MaintenanceReportPreview
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
                                                Maintenance Report List
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
                                    <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Asset Picture</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Tag</th>
                                                    <th>Service Type</th>
                                                    <th>Provider Name</th>
                                                    <th>Issue in Asset</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
                                                {filteredAssets.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">There is no asset in maintenance.</td>
                                                    </tr>
                                                ) : (
                                                    filteredAssets.map((asset) => (
                                                        <tr key={asset.id}>
                                                            <td>
                                                                <img
                                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.assetPhoto}`}
                                                                    style={{ width: "90px" }}
                                                                    alt="Asset"
                                                                />
                                                            </td>
                                                            <td>{asset.assetName}</td>
                                                            <td>{asset.assetTag}</td>
                                                            <td>{asset.serviceType}</td>
                                                            <td>
                                                                {asset.serviceType === "In-house"
                                                                    ? asset.employeeName
                                                                    : asset.serviceName || asset.serviceAddress}
                                                            </td>
                                                            <td>{asset.issueInAsset}</td>
                                                        </tr>
                                                    ))
                                                )}
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

export default MaintenanceReport;
