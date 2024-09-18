import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import BrandReportPreview from './BrandReportPreview';

function BrandReport({ handleLogout, username }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [assets, setAssets] = useState([]);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});

    // Fetch brands and assets on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
                setBrands(response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
                toast.error('Failed to fetch brands.');
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/branduniquedata`);
                setAssets(response.data);
                setFilteredAssets(response.data); // Initially show all assets
            } catch (error) {
                console.error("Error fetching assets:", error);
                toast.error('Failed to fetch assets.');
            }
        };

        fetchBrands();
        fetchAssets();
    }, []);

    // Filter assets based on selected brand
    useEffect(() => {
        if (selectedBrand) {
            const filtered = assets.filter(asset => asset.brand_id === parseInt(selectedBrand, 10));
            setFilteredAssets(filtered);
        } else {
            setFilteredAssets(assets); // Show all assets when no brand is selected
        }
    }, [selectedBrand, assets]);

    // Handle brand selection change
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
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
        <div className='d-flex w-100% h-100'>
            {showSidebar && <Sidebar />}
            <div className='w-100 bg-white'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid bg-white">
                    <ToastContainer />
                    {showAssetPrint ? (
                        <BrandReportPreview
                            record={selectedRecord}
                            onClose={handleClosePreview}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Asset Brand Report</h6>
                                        <div className='d-flex align-items-center gap-2'>
                                            <label className='pt-2 text-black fw-bolder'>Brand:</label>
                                            <select
                                                id="brandSelect"
                                                value={selectedBrand}
                                                onChange={handleBrandChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Brand</option>
                                                {brands.map(brand => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.brandName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className='btn btn-success' onClick={handleCategoryPrint}>PDF</button>
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
                                                        <th>Quantity</th>
                                                        <th>Location</th>
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
                                                                <td>{asset.totalQuantity}</td>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BrandReport;
