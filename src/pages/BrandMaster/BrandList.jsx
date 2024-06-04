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

function BrandList({ handleLogout, username }) {
    const [brands, setBrands] = useState([]);
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBrand, setEditBrand] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand

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
        setSelectedBrand(null); // Reset selectedBrand when closing the modal
    };

    const handleEditBrand = (brand) => {
        setEditBrand(brand);
        setIsEditModalOpen(true);
    };

    const handleBrandAssetsClick = (brand) => {
        setSelectedBrand(brand); // Set the selected brand when its action button is clicked
    };

    const handleUpdateBrand = async (updatedBrand) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_LOCAL_URL}/brands/${updatedBrand.id}`,
                updatedBrand
            );
            setBrands((prevBrands) =>
                prevBrands.map((brand) =>
                    brand.id === updatedBrand.id ? updatedBrand : brand
                )
            );
            setIsEditModalOpen(false);
            fetchBrands();
        } catch (error) {
            console.error("Error updating brand:", error);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/brands/${brandId}`);
            setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== brandId));
            console.log("Brand deleted successfully");
        } catch (error) {
            console.error("Error deleting brand:", error);
        }
    };
    const handleupdate =() =>{
        toast.success("successfully uploaded");
        fetchBrands();

    }

    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
            <div className='w-100'>
                <SearchBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            {!selectedBrand && (
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Brand List</h6>
                                        <div onClick={handleAddBrand} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                                            Add New Brand
                                        </div>
                                        {/* <div className="dropdown no-arrow">
                                                <a
                                                    className="dropdown-toggle"
                                                    href="#"
                                                    role="button"
                                                    id="dropdownMenuLink"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div
                                                    className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                                    aria-labelledby="dropdownMenuLink"
                                                >
                                                    <div className="dropdown-header">Brand:</div>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={handleAddBrand}
                                                    >
                                                        Add New Brand
                                                    </a>
                                                </div>
                                            </div> */}
                                    </div>
                                    <div className="card-body">
                                        <table
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Brand Logo</th>
                                                    <th>Brand Name</th>
                                                    <th>Company Name</th>
                                                    <th>Total Assets</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((brand) => (
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
                                                        <td onClick={() => handleBrandAssetsClick(brand)} style={{ cursor: 'pointer' }} >{brand.brandName}</td>
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
                                                                    <i
                                                                        className="fa fa-ellipsis-h"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </button>
                                                                <div
                                                                    className="dropdown-menu actionmenu"
                                                                    x-placement="bottom-start"
                                                                >
                                                                    {/* <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            onClick={() => handleEditBrand(brand)}
                                                                        >
                                                                            <i className="fas fa-edit"></i> Edit
                                                                        </a> */}
                                                                    {/* <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        onClick={() => handleDeleteBrand(brand.id)}
                                                                    >
                                                                        <i className="fa fa-trash"></i> Delete
                                                                    </a> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                            )}
                        </div>
                    </div>
                    {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdateBrands={handleupdate}  />}
                    {isEditModalOpen && (
                        <EditBrandModal
                            brand={editBrand}
                            onClose={handleCloseBrandModal}
                            onUpdate={handleUpdateBrand}
                        />
                    )}
                    {/* Render BrandAssetsTable if a brand is selected */}
                    {selectedBrand && (
                        <div className="row">
                            <div className="col-xl-12">
                                <BrandAssetsTable brand={selectedBrand} onClose={handleCloseBrandModal} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default BrandList;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../Dashboard.css';
// // Brandlist
// import AddBrandModal from "./AddBrandModal";
// import EditBrandModal from "./EditBrandModal";
// import BrandAssetsTable from "./BrandAssetsTable"; // Import the BrandAssetsTable component
// import defaultBrandLogo from "../../images/brand_images/default.jpg";
// import AddDataModal from '../AssetMaster/AddDataModal';
// import AddEmployeeTable from '../EmployeeMaster/AddEmployeeTable';
// import AddVendor from '../VendorMaster/AddVendor';
// import AddCategory from '../CategoryMaster/AddCategory';
// import AddSiteModal from '../SiteMaster/AddSiteModal';
// import AddClientModal from '../ClientMaster/AddClientModal';
// import AssetLost from '../AssetMaster/AssetLost';


// function BrandList() {
//     const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
//     const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//     const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//     const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//     const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
//     const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
//     const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
//     // for BrandList
//     const [totalAssetCount, setTotalAssetCount] = useState(0);
//     const [totalComponentCount, setTotalComponentCount] = useState(0);
//     const [totalSiteCount, setTotalSiteCount] = useState(0);
//     const [totalMaintenanceCount, setTotalMaintenanceCount] = useState(0);
//     // Brand list
//     const [brands, setBrands] = useState([]);
//     const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editBrand, setEditBrand] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand
//     useEffect(() => {
//         fetchBrands();
//     }, []);

//     const fetchBrands = async () => {
//         try {
//             const brandsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//             const assetsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);

//             const brandsData = brandsResponse.data;
//             const assetsData = assetsResponse.data;

//             // Map brand IDs to their corresponding assets
//             const brandAssetsMap = {};
//             assetsData.forEach(asset => {
//                 const brandId = asset.brand_id;
//                 if (brandId) {
//                     brandAssetsMap[brandId] = (brandAssetsMap[brandId] || 0) + 1;
//                 }
//             });

//             // Update brands data with asset counts
//             const brandsWithAssets = brandsData.map(brand => ({
//                 ...brand,
//                 totalAssets: brandAssetsMap[brand.id] || 0
//             }));

//             setBrands(brandsWithAssets);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const handleAddBrand = () => {
//         setIsAddBrandModalOpen(true);
//     };

//     const handleCloseBrandModal = () => {
//         setIsAddBrandModalOpen(false);
//         setIsEditModalOpen(false);
//         setSelectedBrand(null); // Reset selectedBrand when closing the modal
//     };

//     const handleEditBrand = (brand) => {
//         setEditBrand(brand);
//         setIsEditModalOpen(true);
//     };

//     const handleBrandAssetsClick = (brand) => {
//         setSelectedBrand(brand); // Set the selected brand when its action button is clicked
//     };

//     const handleUpdateBrand = async (updatedBrand) => {
//         try {
//             await axios.put(
//                 `${process.env.REACT_APP_LOCAL_URL}/brands/${updatedBrand.id}`,
//                 updatedBrand
//             );
//             setBrands((prevBrands) =>
//                 prevBrands.map((brand) =>
//                     brand.id === updatedBrand.id ? updatedBrand : brand
//                 )
//             );
//             setIsEditModalOpen(false);
//             fetchBrands();
//         } catch (error) {
//             console.error("Error updating brand:", error);
//         }
//     };

//     const handleDeleteBrand = async (brandId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/brands/${brandId}`);
//             setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== brandId));
//             console.log("Brand deleted successfully");
//         } catch (error) {
//             console.error("Error deleting brand:", error);
//         }
//     };

//     // Logic to get current items
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);


//     useEffect(() => {
//         fetchCounts();
//     }, []);

//     const fetchCounts = async () => {
//         try {
//             const assetResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);

//             const componentResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);

//             const siteResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);

//             const maintenanceResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);

//             console.log('Asset response:', assetResponse.data);
//             console.log('Component response:', componentResponse.data);
//             console.log('Site response:', siteResponse.data);
//             console.log('Maintenance response:', maintenanceResponse.data);

//             if (Array.isArray(assetResponse.data)) {
//                 setTotalAssetCount(assetResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total asset count');
//             }

//             if (Array.isArray(componentResponse.data)) {
//                 setTotalComponentCount(componentResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total component count');
//             }

//             if (Array.isArray(siteResponse.data)) {
//                 setTotalSiteCount(siteResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total site count');
//             }

//             if (Array.isArray(maintenanceResponse.data)) {
//                 setTotalMaintenanceCount(maintenanceResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total maintenance count');
//             }
//         } catch (error) {
//             console.error('Error fetching counts:', error);
//         }
//     };
//     const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//     const changeStyle = () => {
//         if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//         }
//         else {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
//         }
//     };
//     const changeStyle1 = () => {
//         if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
//         }
//         else {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
//         }
//     };

//     // handle
//     const handleAddAsset = () => {
//         setIsModalOpen(true); // Open the modal when "Add new Asset" button is clicked
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false); // Close the modal
//     };
//     const handleAddEmployee = () => {
//         setIsEmployeeModalOpen(true);
//     };

//     const handleAddVendor = () => {
//         setIsVendorModalOpen(true);
//     };

//     const handleAddCategory = () => {
//         setIsCategoryModalOpen(true);
//     };

//     const handleCloseCategoryModal = () => {
//         setIsCategoryModalOpen(false);
//     };

//     const handleCloseEmployeeModal = () => {
//         setIsEmployeeModalOpen(false);
//     };

//     const handleCloseVendorModal = () => {
//         setIsVendorModalOpen(false);
//     };

//     // clientmodal

//     const handleAddClient = () => {
//         setIsAddClientModalOpen(true);
//     };

//     const handleCloseClientModal = () => {
//         setIsAddClientModalOpen(false);
//     };

//     // Asset Lost

//     const handleAddAssetLost = () => {
//         setIsAddAssetLostModalOpen(true);
//     };

//     const handleCloseAssetLostModal = () => {
//         setIsAddAssetLostModalOpen(false);
//     };

//     // site Modal

//     const handleAddSite = () => {
//         setIsAddSiteModalOpen(true)
//     };

//     const handleCloseSiteModal = () => {
//         setIsAddSiteModalOpen(false);
//     };

//     return (
//         <div>
//             <body id="page-top">

//                 {/*  <!-- Page Wrapper --> */}
//                 <div id="wrapper">

//                     {/*  <!-- Sidebar --> */}
//                     <ul className={style} id="accordionSidebar">

//                         {/*  <!-- Sidebar - Brand --> */}
//                         <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
//                             <div className="sidebar-brand-icon rotate-n-15">
//                             </div>
//                             <div className="sidebar-brand-text mx-3">Prospect Legal</div>
//                             <div className="text-center d-none d-md-inline">
//                                 <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
//                             </div>
//                         </a>

//                         {/*   <!-- Divider --> */}
//                         <hr className="sidebar-divider my-0" />

//                         {/*  <!-- Nav Item - BrandList --> */}
//                         <li className="nav-item active">
//                             <Link to="/dashboard" className="nav-link" href="index.html">
//                                 <i className="fas fa-fw fa-tachometer-alt"></i>
//                                 <span>BrandList</span></Link>
//                         </li>

//                         {/*  <!-- Divider --> */}
//                         <hr className="sidebar-divider" />

//                         {/*   <!-- Heading --> */}
//                         <div className="sidebar-heading">
//                             Interface
//                         </div>

//                         {/*  <!-- Nav Item - Pages Collapse Menu --> */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
//                                 aria-expanded="true" aria-controls="collapseTwo">
//                                 <i className="fas fa-fw fa-cog"></i>
//                                 <span>Asset Master</span>
//                             </a>
//                             <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Assets</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/assetlist">Total Asset <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Transfer Asset <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <h6 className="collapse-header">Asset on Maintainence:</h6>
//                                     <Link className="collapse-item" to="/assetMaintenance" >Total Maintenance <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <Link className="collapse-item" to="/finishedmaintenance" >Finished Maintenance <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <Link className="collapse-item" to="/unfinishedmaintenance" >UnFinished Maintenance <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <h6 className="collapse-header">Asset on Insurence:</h6>
//                                     <Link className="collapse-item" to="/assetinsurence" >Asset Insurence <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <h6 className="collapse-header">Asset Lost:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddAssetLost}>Add Asset Lost <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/assetlostlist" >Asset Lost List <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Asset Hold <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* <!-- Nav Item - Employee --> */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEmployee"
//                                 aria-expanded="true" aria-controls="collapseEmployee">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Employee</span>
//                             </a>
//                             <div id="collapseEmployee" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Employees:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/employelist">Total Employee <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Transfer Employee <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Employee on Maintainence <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Employee Insurence <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Employee Lost <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Employee Hold <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/*  <!-- Nav Item - Site Master --> */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSite"
//                                 aria-expanded="true" aria-controls="collapseSite">
//                                 <i className="fas fa-fw fa-table"></i>
//                                 <span>Site Master</span>
//                             </a>
//                             <div id="collapseSite" className="collapse" aria-labelledby="headingSite" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Sites:</h6>
//                                     <a className="collapse-item" onClick={handleAddSite}>Add new Site <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/sitelist">Total Sites <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Update Site Details<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Delete Site<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Site Status<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Site Reports<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>

//                         {/* <!-- Nav Item - Client Master --> */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClient"
//                                 aria-expanded="true" aria-controls="collapseClient">
//                                 <i className="fas fa-fw fa-users"></i>
//                                 <span>Client Master</span>
//                             </a>
//                             <div id="collapseClient" className="collapse" aria-labelledby="headingClient" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Clients:</h6>
//                                     <a className="collapse-item" onClick={handleAddClient}>Add new Client <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/clientlist">Total Clients <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Update Client Details <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Delete Client <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Client Status <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">Client Reports <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* Nav Item - vendor Master */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsevendor"
//                                 aria-expanded="true" aria-controls="collapsevendor">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>vendor master</span>
//                             </a>
//                             <div id="collapsevendor" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">vendors:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/vendorlist" >Total vendor <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Transfer vendor <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">vendor on Maintainence <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">vendor Insurence <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">vendor Lost <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">vendor Hold <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* Nav Item - Category Master */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecategory"
//                                 aria-expanded="true" aria-controls="collapsecategory">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Category master</span>
//                             </a>
//                             <div id="collapsecategory" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Category:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></a>
//                                     <Link className="collapse-item" to="/categorylist" >Total Category <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Transfer category<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category on Maintainence<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Insurence<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Lost<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Hold<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* Nav Item - Total Component */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecomponent"
//                                 aria-expanded="true" aria-controls="collapsecomponent">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Component master</span>
//                             </a>
//                             <div id="collapsecomponent" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Component:</h6>
//                                     <Link className="collapse-item" to="/componentlist" >Total head component<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <Link className="collapse-item" to="/fullcomponentlist">Total Component<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <a className="collapse-item" href="#">Transfer category<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category on Maintainence<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Insurence<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Lost<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                     <a className="collapse-item" href="#">category Hold<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red' }}>` `</span></a>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* Nav Item - Total history */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsedelete"
//                                 aria-expanded="true" aria-controls="collapsedelete">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Master</span>
//                             </a>
//                             <div id="collapsedelete" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Delete:</h6>
//                                     <Link className="collapse-item" to="/deletelist" >Delete<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                     <Link className="collapse-item" to="/brandlist" >Brand<span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'green' }}>` `</span></Link>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* <!-- Divider --> */}
//                         <hr className="sidebar-divider d-none d-md-block" />
//                     </ul>
//                     {/*  <!-- End of Sidebar --> */}

//                     {/*  <!-- Content Wrapper --> */}
//                     <div id="content-wrapper" className="d-flex flex-column">

//                         {/*  <!-- Main Content --> */}
//                         <div id="content">

//                             {/*  <!-- Topbar --> */}
//                             <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

//                                 {/*  <!-- Sidebar Toggle (Topbar) --> */}
//                                 <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
//                                     <i className="fa fa-bars"></i>
//                                 </button>

//                                 {/*  <!-- Topbar Search --> */}
//                                 <form
//                                     className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
//                                     <div className="input-group">
//                                         <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
//                                             aria-label="Search" aria-describedby="basic-addon2" />
//                                         <div className="input-group-append">
//                                             <button className="btn btn-primary" type="button">
//                                                 <i className="fas fa-search fa-sm"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </form>

//                                 {/*  <!-- Topbar Navbar --> */}
//                                 <ul className="navbar-nav ml-auto">

//                                     {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
//                                     <li className="nav-item dropdown no-arrow d-sm-none">
//                                         <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
//                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             <i className="fas fa-search fa-fw"></i>
//                                         </a>
//                                         {/*   <!-- Dropdown - Messages --> */}
//                                         <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
//                                             aria-labelledby="searchDropdown">
//                                             <form className="form-inline mr-auto w-100 navbar-search">
//                                                 <div className="input-group">
//                                                     <input type="text" className="form-control bg-light border-0 small"
//                                                         placeholder="Search for..." aria-label="Search"
//                                                         aria-describedby="basic-addon2" />
//                                                     <div className="input-group-append">
//                                                         <button className="btn btn-primary" type="button">
//                                                             <i className="fas fa-search fa-sm"></i>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </li>
//                                     <div className="topbar-divider d-none d-sm-block"></div>
//                                     {/* <!-- Nav Item - User Information --> */}
//                                     <li className="nav-item dropdown no-arrow">

//                                         <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
//                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             <span className="mr-2 d-none d-lg-inline text-gray-600 small">Aditya Shrivastava</span>
//                                             <img className="img-profile rounded-circle"
//                                                 src="img/undraw_profile.svg" />
//                                         </a>

//                                         {/*  <!-- Dropdown - User Information --> */}
//                                         <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
//                                             aria-labelledby="userDropdown">
//                                             <Link
//                                                 to="/profile"

//                                                 id="userDropdown"
//                                                 role="button"
//                                                 data-toggle="dropdown"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                             >
//                                                 <a className="dropdown-item" href="#">
//                                                     <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
//                                                     Profile
//                                                 </a>
//                                             </Link>
//                                             <a className="dropdown-item" href="#">
//                                                 <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
//                                                 Settings
//                                             </a>
//                                             <a className="dropdown-item" href="#">
//                                                 <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
//                                                 Activity Log
//                                             </a>
//                                             <div className="dropdown-divider"></div>
//                                             <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
//                                                 <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
//                                                 Logout
//                                             </a>
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </nav>
//                             {/*  <!-- End of Topbar --> */}

//                             {/* <!-- Begin Page Content --> */}
//                             <div className="container-fluid">
//                                 <div className="row">
//                                     <div className="col-xl-12">
//                                         {!selectedBrand && (
//                                             <div className="card shadow mb-4">
//                                                 <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                                     <h6 className="m-0 font-weight-bold text-primary">Brand List</h6>
//                                                     <div className="dropdown no-arrow">
//                                                         <a
//                                                             className="dropdown-toggle"
//                                                             href="#"
//                                                             role="button"
//                                                             id="dropdownMenuLink"
//                                                             data-toggle="dropdown"
//                                                             aria-haspopup="true"
//                                                             aria-expanded="false"
//                                                         >
//                                                             <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
//                                                         </a>
//                                                         <div
//                                                             className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//                                                             aria-labelledby="dropdownMenuLink"
//                                                         >
//                                                             <div className="dropdown-header">Brand:</div>
//                                                             <a
//                                                                 className="dropdown-item"
//                                                                 href="#"
//                                                                 onClick={handleAddBrand}
//                                                             >
//                                                                 Add New Brand
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="card-body">
//                                                     <table
//                                                         className="table table-striped table-bordered"
//                                                         style={{ width: "100%" }}
//                                                     >
//                                                         <thead>
//                                                             <tr>
//                                                                 <th>Brand Logo</th>
//                                                                 <th>Brand Name</th>
//                                                                 <th>Company Name</th>
//                                                                 <th>Total Assets</th>
//                                                                 <th>Action</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {currentItems.map((brand) => (
//                                                                 <tr key={brand.id}>
//                                                                     <td>
//                                                                         {brand.brandLogo ? (
//                                                                             <img
//                                                                                 src={`${process.env.REACT_APP_LOCAL_URL}/uploads/brandLogos/${brand.brandLogo}`}
//                                                                                 alt={brand.brandName}
//                                                                                 style={{ width: "90px", height: "90px" }}
//                                                                             />
//                                                                         ) : (
//                                                                             <img
//                                                                                 src={defaultBrandLogo}
//                                                                                 alt={brand.brandName}
//                                                                                 style={{ width: "90px", height: "90px" }}
//                                                                             />
//                                                                         )}
//                                                                     </td>
//                                                                     <td onClick={() => handleBrandAssetsClick(brand)} style={{ cursor: 'pointer' }} >{brand.brandName}</td>
//                                                                     <td>{brand.companyName}</td>
//                                                                     <td>{brand.totalAssets}</td>
//                                                                     <td>
//                                                                         <div className="btn-group">
//                                                                             <button
//                                                                                 className="btn btn-sm btn-primary dropdown-toggle"
//                                                                                 type="button"
//                                                                                 data-toggle="dropdown"
//                                                                                 aria-haspopup="true"
//                                                                                 aria-expanded="false"
//                                                                             >
//                                                                                 <i
//                                                                                     className="fa fa-ellipsis-h"
//                                                                                     aria-hidden="true"
//                                                                                 ></i>
//                                                                             </button>
//                                                                             <div
//                                                                                 className="dropdown-menu actionmenu"
//                                                                                 x-placement="bottom-start"
//                                                                             >
//                                                                                 <a
//                                                                                     className="dropdown-item"
//                                                                                     href="#"
//                                                                                     onClick={() => handleEditBrand(brand)}
//                                                                                 >
//                                                                                     <i className="fas fa-edit"></i> Edit
//                                                                                 </a>
//                                                                                 <a
//                                                                                     className="dropdown-item"
//                                                                                     href="#"
//                                                                                     onClick={() => handleDeleteBrand(brand.id)}
//                                                                                 >
//                                                                                     <i className="fa fa-trash"></i> Delete
//                                                                                 </a>
//                                                                             </div>
//                                                                         </div>
//                                                                     </td>
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </table>
//                                                     {/* Pagination */}
//                                                     <ul className="pagination">
//                                                         <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
//                                                             <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
//                                                         </li>
//                                                         {Array.from({ length: Math.ceil(brands.length / itemsPerPage) }, (_, i) => (
//                                                             <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                                                                 <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                                                             </li>
//                                                         ))}
//                                                         <li className={`page-item ${currentPage === Math.ceil(brands.length / itemsPerPage) && 'disabled'}`}>
//                                                             <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdateBrands={fetchBrands} />}
//                                 {isEditModalOpen && (
//                                     <EditBrandModal
//                                         brand={editBrand}
//                                         onClose={handleCloseBrandModal}
//                                         onUpdate={handleUpdateBrand}
//                                     />
//                                 )}
//                                 {/* Render BrandAssetsTable if a brand is selected */}
//                                 {selectedBrand && (
//                                     <div className="row">
//                                         <div className="col-xl-12">
//                                             <BrandAssetsTable brand={selectedBrand} onClose={handleCloseBrandModal} />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <a className="scroll-to-top rounded" href="#page-top">
//                     <i className="fas fa-angle-up"></i>
//                 </a>

//                 {/*  <!-- Logout Modal--> */}
//                 <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//                     aria-hidden="true">
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
//                                 <button className="close" type="button" data-dismiss="modal" aria-label="Close">
//                                     <span aria-hidden="true">×</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
//                             <div className="modal-footer">
//                                 <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
//                                 <a className="btn btn-primary" href="login.html">Logout</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Add Modal Tables*/}
//                 {isModalOpen && <AddDataModal onClose={handleCloseModal} />}
//                 {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} />}
//                 {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} />}
//                 {isCategoryModalOpen && <AddCategory onClose={handleCloseCategoryModal} />}
//                 {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} />}
//                 {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} />}
//                 {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} />}
//             </body>
//         </div>
//     )
// }

// export default BrandList;








