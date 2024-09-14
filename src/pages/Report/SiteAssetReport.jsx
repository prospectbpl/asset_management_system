import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import SiteAssetReportPreview from './SiteAssetReportPreview';

function SiteAssetReport({ handleLogout, username }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState('');
    const [assets, setAssets] = useState([]);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});

    // Fetch sites and assets on component mount
    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
                setSites(response.data);
            } catch (error) {
                console.error("Error fetching sites:", error);
                toast.error('Failed to fetch sites.');
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/siteuniquedata`);
                setAssets(response.data);
                setFilteredAssets(response.data); // Initially show all assets
            } catch (error) {
                console.error("Error fetching assets:", error);
                toast.error('Failed to fetch assets.');
            }
        };

        fetchSites();
        fetchAssets();
    }, []);

    // Filter assets based on selected site
    useEffect(() => {
        if (selectedSite) {
            const filtered = assets.filter(asset => asset.site_master_id === parseInt(selectedSite, 10));
            setFilteredAssets(filtered);
        } else {
            setFilteredAssets(assets); // Show all assets when no site is selected
        }
    }, [selectedSite, assets]);

    // Handle site selection change
    const handleSiteChange = (event) => {
        setSelectedSite(event.target.value);
    };

    // Handle print report
    const handleCategoryPrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredAssets.length > 0 ? filteredAssets[0].status : '',
            assetData: filteredAssets,
        });

        setShowAssetPrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    // Handle closing the preview
    const handleClosePreview = () => {
        setShowSidebar(true);
        setShowSearchBar(true);
        setShowAssetPrint(false);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className='d-flex w-100 h-100'>
            {showSidebar && <Sidebar />}
            <div className='w-100'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid">
                    <ToastContainer />
                    {showAssetPrint ? (
                        <SiteAssetReportPreview
                            record={selectedRecord}
                            onClose={handleClosePreview}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Sites List</h6>
                                        <div className='d-flex align-items-center gap-2'>
                                            <label className='pt-2 text-black fw-bolder'>Site:</label>
                                            <select
                                                id="sitesSelect"
                                                value={selectedSite}
                                                onChange={handleSiteChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Site</option>
                                                {sites.map(site => (
                                                    <option key={site.id} value={site.id}>
                                                        {site.siteName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className='btn btn-success' onClick={handleCategoryPrint}>PDF</button>
                                        </div>
                                    </div>
                                    <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Asset Picture</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Tag</th>
                                                    <th>Quantity</th>
                                                    <th>Site Location</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAssets.length > 0 ? (
                                                    filteredAssets.map((asset) => (
                                                        <tr key={asset.id}>
                                                            <td>
                                                                <img
                                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                                                    style={{ width: "90px" }}
                                                                    alt="Asset"
                                                                />
                                                            </td>
                                                            <td>{asset.name}</td>
                                                            <td>{asset.assettag}</td>
                                                            <td>{asset.quantity}</td>
                                                            <td>{asset.location}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No assets found</td>
                                                    </tr>
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

export default SiteAssetReport;