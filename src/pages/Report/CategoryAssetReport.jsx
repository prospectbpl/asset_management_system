import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import CategoryAssetReportPreview from './CategoryAssetReportPreview';

function CategoryAssetReport({ handleLogout, username }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [showReportPrev] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [assets, setAssets] = useState([]);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
                const assetCategories = response.data.filter(category => category.categoryType === 'asset');
                setCategories(assetCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    // Fetch assets when the selected category changes
    useEffect(() => {
        const fetchAssets = async () => {
            if (selectedCategory) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categoryuniquedata/${selectedCategory}`);
                    setAssets(response.data);
                    filterAssets(response.data);
                } catch (error) {
                    console.error("Error fetching assets:", error);
                    toast.error('Failed to fetch assets.');
                }
            } else {
                setAssets([]);
                setFilteredAssets([]);
            }
        };
        fetchAssets();
    }, [selectedCategory]);

    // Filter assets function
    const filterAssets = (assetsData) => {
        // Define filtering logic if needed
        setFilteredAssets(assetsData);
    };

    // Handle category selection change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

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

    const handleClosePreview = () => {
        setShowSidebar(true); // Set to true to show sidebar
        setShowSearchBar(true);
        setShowAssetPrint(false);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className='d-flex w-100 bg-white h-100'>
            {showSidebar && <Sidebar />}
            <div className='w-100 bg-white'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid bg-white">
                    <ToastContainer />
                    {showAssetPrint ? (
                        <CategoryAssetReportPreview
                            record={selectedRecord}
                            onClose={handleClosePreview}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Asset Category Report</h6>
                                        <div className='d-flex align-items-center gap-2'>
                                            <label className='pt-2 text-black fw-bolder'>Category:</label>
                                            <select
                                                id="categoriesSelect"
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.categoryName}
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
                                                        <th>Purchase Date</th>
                                                        <th>Category</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredAssets.length > 0 ? (
                                                        filteredAssets.map((asset) => (
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

export default CategoryAssetReport;
