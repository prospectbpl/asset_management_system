import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBrandModal from "./AddBrandModal";
import EditBrandModal from "./EditBrandModal";
import BrandAssetsTable from "./BrandAssetsTable"; // Import the BrandAssetsTable component
import defaultBrandLogo from "../../images/brand_images/default.jpg";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BrandDetails from "./BrandDetails";

function BrandList({ handleLogout, username }) {
    const [brands, setBrands] = useState([]);
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand
    const [showBrandDetails, setShowBrandDetails] = useState(false); // State to control brand details view

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem); // Correcting `clients` to `brands`

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const brandsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
            const assetsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);

            const brandsData = brandsResponse.data;
            const assetsData = assetsResponse.data;

            // Map brand IDs to their corresponding assets
            const brandAssetsMap = {};
            assetsData.forEach(asset => {
                const brandId = asset.brand_id;
                if (brandId) {
                    brandAssetsMap[brandId] = (brandAssetsMap[brandId] || 0) + 1;
                }
            });

            // Update brands data with asset counts
            const brandsWithAssets = brandsData.map(brand => ({
                ...brand,
                totalAssets: brandAssetsMap[brand.id] || 0
            }));

            setBrands(brandsWithAssets);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddBrand = () => {
        setIsAddBrandModalOpen(true);
    };

    const handleCloseBrandModal = () => {
        setIsAddBrandModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleBrandDetails = (brand) => {
        setSelectedBrand(brand);
        setShowBrandDetails(true);
    };

    const handleEditBrand = (brand) => {
        setEditBrand(brand);
        setIsEditModalOpen(true);
    };

    const handleUpdateBrands = () => {
        toast.success('Brand updated successfully');
        fetchBrands();
    };

    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100 '>
                <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid bg-white">
                    <ToastContainer />
                    {showBrandDetails ? (
                        <BrandDetails brand={selectedBrand} onClose={() => setShowBrandDetails(false)} />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Brand List</h6>
                                        <div
                                            onClick={handleAddBrand}
                                            className='btn btn-primary'
                                        >
                                            Add New Brand
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Brand Logo</th>
                                                        <th>Brand Name</th>
                                                        <th>Company Name</th>
                                                        <th>Total Assets</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <style>
                                                        {`.hyperlink:hover {color: blue;}`}
                                                    </style>
                                                    {currentItems.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Thier is No Brand  .</td>
                                                        </tr>
                                                    ) : (
                                                        currentItems.map((brand) => (
                                                            <tr key={brand.id}>
                                                                <td>
                                                                    {brand.brandLogo ? (
                                                                        <img
                                                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/brandLogos/${brand.brandLogo}`}
                                                                            alt={brand.brandName}
                                                                            style={{ width: "90px", height: "90px" }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={defaultBrandLogo}
                                                                            alt={brand.brandName}
                                                                            style={{ width: "90px", height: "90px" }}
                                                                        />
                                                                    )}
                                                                </td>
                                                                <td className='hyperlink' onClick={() => handleBrandDetails(brand)} style={{ cursor: 'pointer' }}>
                                                                    {brand.brandName}
                                                                </td>
                                                                <td>{brand.companyName}</td>
                                                                <td>{brand.totalAssets}</td>
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button
                                                                            className="btn btn-sm btn-primary dropdown-toggle"
                                                                            type="button"
                                                                            data-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu actionmenu">
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                onClick={() => handleBrandDetails(brand)}
                                                                            >
                                                                                <i className="fa fa-file"></i> Details
                                                                            </a>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                onClick={() => handleEditBrand(brand)}
                                                                            >
                                                                                <i className="fas fa-edit"></i> Edit
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(brands.length / itemsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(brands.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdate={handleUpdateBrands} />}
                    {isEditModalOpen && <EditBrandModal onClose={handleCloseBrandModal} brand={editBrand} onUpdate={handleUpdateBrands} />}
                </div>
            </div>
        </div>
    );
}

export default BrandList;
