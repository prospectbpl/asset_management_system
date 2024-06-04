// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import AddVendor from './AddVendor';
// import AddDataModal from '../AssetMaster/AddDataModal';
// import AddEmployeeTable from '../EmployeeMaster/AddEmployeeTable';
// import './Vendorlist.css';
// import axios from 'axios';
// import EditVendor from './EditVendor';
// import VendorDesc from './VendorDesc';
// import AddSiteModal from '../SiteMaster/AddSiteModal';
// import AddClientModal from '../ClientMaster/AddClientModal';
// import AssetLost from '../AssetLost';
// import DeleteConfirmationModal from '../DeleteConfirmationModal'; // Import the new component

// function Vendorlist() {
//     const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//     const changeStyle = () => {
//         if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//         } else {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//         }
//     };

//     const changeStyle1 = () => {
//         if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
//         } else {
//             setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
//         }
//     };

//     const [vendors, setVendors] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//     const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//     const [selectedVendor, setSelectedVendor] = useState(null);
//     const [showDetails, setShowDetails] = useState(false);
//     const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
//     const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);
//     const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
//     // delete history 
//     const [deleteVendor, setDeleteVendor] = useState(null); // State to store data of vendor being deleted
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
//     const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason





//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//             setVendors(response.data);
//         } catch (error) {
//             console.error("Error fetching vendors:", error);
//         }
//     };
//     const handleAddAsset = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleAddEmployee = () => {
//         setIsEmployeeModalOpen(true);
//     };

//     const handleAddVendor = () => {
//         setIsVendorModalOpen(true);
//     };

//     const handleCloseEmployeeModal = () => {
//         setIsEmployeeModalOpen(false);
//     };

//     const handleCloseVendorModal = () => {
//         setIsVendorModalOpen(false);
//     };

//     const handleShowDetails = (vendor) => {
//         // Close the Edit Vendor modal if it's open
//         setSelectedVendor(null);
//         // Open the Details modal
//         setSelectedVendor(vendor);
//         setShowDetails(true);
//     };


//     const handleBackToTable = () => {
//         setSelectedVendor(null);
//         setShowDetails(false);
//     };

//     // clientmodal 

//     const handleAddClient = () => {
//         setIsAddClientModalOpen(true);
//     };

//     const handleCloseClientModal = () => {
//         setIsAddClientModalOpen(false);
//     };

//     // site Modal 

//     const handleAddSite = () => {
//         setIsAddSiteModalOpen(true)
//     };

//     const handleCloseSiteModal = () => {
//         setIsAddSiteModalOpen(false);
//     };

//     // Asset Lost 

//     const handleAddAssetLost = () => {
//         setIsAddAssetLostModalOpen(true);
//     };

//     const handleCloseAssetLostModal = () => {
//         setIsAddAssetLostModalOpen(false);
//     };

//     const handleUpdateVendor = async (updatedVendor) => {
//         try {
//             const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/vendors/${updatedVendor.id}`, updatedVendor);
//             console.log("Vendor updated:", response.data);
//             const updatedVendors = vendors.map(vendor => (vendor.id === updatedVendor.id ? response.data : vendor));
//             fetchVendors()
//             setVendors(updatedVendors);
//         } catch (error) {
//             console.error("Error updating vendor:", error);
//         }
//     };

//     const handleEditVendor = (vendor) => {
//         setSelectedVendor(vendor);
//     };

//     const handleCloseEditModal = () => {
//         setSelectedVendor(null);
//     };

//     // Delete Vendor 
//     // const handleDeleteVendor = async (vendorId) => {
//     //     try {
//     //         await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/vendors/${vendorId}`);
//     //         const updatedVendors = vendors.filter(vendor => vendor.id !== vendorId);
//     //         setVendors(updatedVendors);
//     //     } catch (error) {
//     //         console.error("Error deleting vendor:", error);
//     //     }
//     // };
//     // delete history 
//     const handleDeleteVendor = (vendor) => {
//         setDeleteVendor(vendor);
//         setIsDeleteModalOpen(true);
//     };
//     const handleDeleteConfirmation = async () => {
//         try {
//             // Perform deletion in the database
//             await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/vendors/${deleteVendor.id}`);

//             // Save the deleted data to delete_details table
//             const deletedVendor = { ...deleteVendor, reason: deleteReason };
//             await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedVendor);

//             // Remove the deleted site from the UI
//             setVendors((prevVendors) =>
//                 prevVendors.filter((vendor) => vendor.id !== deleteVendor.id)
//             );
//             // Close the delete modal
//             setIsDeleteModalOpen(false);

//             console.log("Vendor deleted successfully");
//         } catch (error) {
//             console.error("Error deleting vendor:", error);
//             // Optionally handle error conditions here
//         }
//     };



//     // Function to update assets list after adding a new asset
//     const handleUpdateVendors = () => {
//         const fetchAssets = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//                 setVendors(response.data);
//             } catch (error) {
//                 console.error("Error fetching Vendors:", error);
//             }
//         };

//         fetchAssets();
//     };

//     // Pagination vendor 
//     // Logic to get current items
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = vendors.slice(indexOfFirstItem, indexOfLastItem);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <body id="page-top">
//                 <div id="wrapper">
//                     <ul className={style} id="accordionSidebar">
//                         <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
//                             <div className="sidebar-brand-icon rotate-n-15">
//                             </div>
//                             <div className="sidebar-brand-text mx-3">Prospect Legal</div>
//                             <div className="text-center d-none d-md-inline">
//                                 <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
//                             </div>
//                         </a>
//                         <hr className="sidebar-divider my-0" />
//                         <li className="nav-item active">
//                             <Link to="/dashboard" className="nav-link" href="index.html">
//                                 <i className="fas fa-fw fa-tachometer-alt"></i>
//                                 <span>Dashboard</span></Link>
//                         </li>
//                         <hr className="sidebar-divider" />
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
//                                     <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
//                                     <Link className="collapse-item" to="/assetlist">Total Asset</Link>
//                                     <a className="collapse-item" href="#">Transfer Asset</a>
//                                     <h6 className="collapse-header">Asset on Maintainence:</h6>
//                                     <Link className="collapse-item" to="/assetMaintenance" >Total Maintenance</Link>
//                                     <Link className="collapse-item" to="/finishedmaintenance" >Finished Maintenance</Link>
//                                     <Link className="collapse-item" to="/unfinishedmaintenance" >UnFinished Maintenance</Link>
//                                     <h6 className="collapse-header">Asset on Insurence:</h6>
//                                     <Link className="collapse-item" to="/assetinsurence" >Asset Insurence</Link>
//                                     <h6 className="collapse-header">Asset Lost:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddAssetLost}>Add Asset Lost</a>
//                                     <Link className="collapse-item" to="/assetlostlist" >Asset Lost List</Link>
//                                     <a className="collapse-item" href="#">Asset Hold</a>
//                                 </div>
//                             </div>
//                         </li>

//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEmployee"
//                                 aria-expanded="true" aria-controls="collapseEmployee">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Employee</span>
//                             </a>
//                             <div id="collapseEmployee" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Employees:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee</a>
//                                     <Link className="collapse-item" to="/employelist">Total Employee</Link>
//                                     <a className="collapse-item" href="#">Transfer Employee</a>
//                                     <a className="collapse-item" href="#">Employee on Maintenance</a>
//                                     <a className="collapse-item" href="#">Employee Insurence</a>
//                                     <a className="collapse-item" href="#">Employee Lost</a>
//                                     <a className="collapse-item" href="#">Employee Hold</a>
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
//                                     <a className="collapse-item" onClick={handleAddSite}>Add new Site</a>
//                                     <Link className="collapse-item" to="/sitelist">Total Sites</Link>
//                                     <a className="collapse-item" href="#">Update Site Details</a>
//                                     <a className="collapse-item" href="#">Delete Site</a>
//                                     <a className="collapse-item" href="#">Site Status</a>
//                                     <a className="collapse-item" href="#">Site Reports</a>
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
//                                     <a className="collapse-item" onClick={handleAddClient}>Add new Client</a>
//                                     <Link className="collapse-item" to="/clientlist">Total Clients</Link>
//                                     <a className="collapse-item" href="#">Update Client Details</a>
//                                     <a className="collapse-item" href="#">Delete Client</a>
//                                     <a className="collapse-item" href="#">Client Status</a>
//                                     <a className="collapse-item" href="#">Client Reports</a>
//                                 </div>
//                             </div>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsevendor"
//                                 aria-expanded="true" aria-controls="collapsevendor">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>vendor master</span>
//                             </a>
//                             <div id="collapsevendor" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">vendors:</h6>
//                                     <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor</a>
//                                     <Link className="collapse-item" to="/vendorlist" >Total vendor</Link>
//                                     <a className="collapse-item" href="#">Transfer vendor</a>
//                                     <a className="collapse-item" href="#">vendor on Maintainence</a>
//                                     <a className="collapse-item" href="#">vendor Insurence</a>
//                                     <a className="collapse-item" href="#">vendor Lost</a>
//                                     <a className="collapse-item" href="#">vendor Hold</a>
//                                 </div>
//                             </div>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/componentlist">
//                                 <i className="fas fa-fw fa-table"></i>
//                                 <span>Total Component</span>
//                             </Link>
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
//                                     <Link className="collapse-item" to="/deletelist" >Delete</Link>
//                                     <Link className="collapse-item" to="/brandlist" >Brand</Link>
//                                 </div>
//                             </div>
//                         </li>
//                         {/* Nav Item - Total Maintenace  */}
//                         <li className="nav-item">
//                             <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsemaintenance"
//                                 aria-expanded="true" aria-controls="collapsemaintenance">
//                                 <i className="fas fa-fw fa-chart-area"></i>
//                                 <span>Maintenance</span>
//                             </a>
//                             <div id="collapsemaintenance" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
//                                 <div className="bg-white py-2 collapse-inner rounded">
//                                     <h6 className="collapse-header">Maintenance :</h6>
//                                     {/* <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor</a> */}
//                                     <Link className="collapse-item" to="/assetMaintenance" >Total Maintenance</Link>
//                                     <Link className="collapse-item" to="/finishedmaintenance" >Finished Maintenance</Link>
//                                     <Link className="collapse-item" to="/unfinishedmaintenance" >UnFinished Maintenance</Link>
//                                     {/* <a className="collapse-item" href="#">vendor Lost</a>
//                                     <a className="collapse-item" href="#">vendor Hold</a> */}
//                                 </div>
//                             </div>
//                         </li>
//                         <hr className="sidebar-divider d-none d-md-block" />
//                     </ul>
//                     <div id="content-wrapper" className="d-flex flex-column">
//                         <div id="content">
//                             <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
//                                 <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
//                                     <i className="fa fa-bars"></i>
//                                 </button>
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
//                                 <ul className="navbar-nav ml-auto">
//                                     <li className="nav-item dropdown no-arrow d-sm-none">
//                                         <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
//                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             <i className="fas fa-search fa-fw"></i>
//                                         </a>
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
//                                     <li className="nav-item dropdown no-arrow">
//                                         <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
//                                             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             <span className="mr-2 d-none d-lg-inline text-gray-600 small">Aditya Shrivastava</span>
//                                             <img className="img-profile rounded-circle"
//                                                 src="img/undraw_profile.svg" />
//                                         </a>
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
//                             <div className="container-fluid">
//                                 {!showDetails && (
//                                     <div className="row">
//                                         <div className="col-xl-12">
//                                             <div className="card shadow mb-4">
//                                                 <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                                     <h6 className="m-0 font-weight-bold text-primary">
//                                                         Vendor List
//                                                     </h6>
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
//                                                             <div className="dropdown-header">Vendors:</div>
//                                                             <a
//                                                                 className="dropdown-item"
//                                                                 href="#"
//                                                                 onClick={handleAddVendor}
//                                                             >
//                                                                 Add Vendor
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div
//                                                     className="card-body"
//                                                     style={{ height: "calc(100% - 40px)" }}
//                                                 >
//                                                     <table
//                                                         id="data"
//                                                         className="table table-striped table-bordered"
//                                                         style={{ width: "100%" }}
//                                                     >
//                                                         <thead>
//                                                             <tr>
//                                                                 <th>Company Name</th>
//                                                                 <th>Company Address</th>
//                                                                 <th>Mobile No.</th>
//                                                                 <th>Action</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {currentItems.map((vendor, index) => (
//                                                                 <tr key={index}>
//                                                                     <td>{vendor.vendorCompanyName}</td>
//                                                                     <td>{vendor.vendorAddress}</td>
//                                                                     <td>{vendor.contactPersonMobile}</td>
//                                                                     <td>
//                                                                         <div className="btn-group">
//                                                                             <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                                                 <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                                                             </button>
//                                                                             <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                                                                 {/* <div className="dropdown-divider"></div> */}
//                                                                                 <a className="dropdown-item" href="#" id="btndetail" customdata="386" onClick={() => handleShowDetails(vendor)}><i className="fa fa-file"></i> Detail</a>
//                                                                                 <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditVendor(vendor)}><i className="fas fa-edit"></i> Edit</a>
//                                                                                 <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteVendor(vendor)}><i className="fa fa-trash"></i> Delete</a>
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
//                                                         {Array.from({ length: Math.ceil(vendors.length / itemsPerPage) }, (_, i) => (
//                                                             <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                                                                 <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                                                             </li>
//                                                         ))}
//                                                         <li className={`page-item ${currentPage === Math.ceil(vendors.length / itemsPerPage) && 'disabled'}`}>
//                                                             <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {showDetails && selectedVendor && (
//                                     <VendorDesc
//                                         vendor={selectedVendor}
//                                         onClose={handleBackToTable}
//                                     />
//                                 )}
//                                 {selectedVendor && !showDetails && (
//                                     <EditVendor vendor={selectedVendor} onClose={handleCloseEditModal} onUpdate={handleUpdateVendor} />
//                                 )}
//                                 {isModalOpen && <AddDataModal onClose={handleCloseModal} />}
//                                 {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} />}
//                                 {/* Add Modal */}
//                                 {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdateVendors={handleUpdateVendors} />}
//                                 {/* {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} />} */}
//                                 {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} />}
//                                 {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} />}
//                                 {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} />}
//                                 <DeleteConfirmationModal
//                                     isOpen={isDeleteModalOpen}
//                                     itemName={deleteVendor ? deleteVendor.vendorCompanyName : ""}
//                                     onDelete={handleDeleteConfirmation}
//                                     onClose={() => setIsDeleteModalOpen(false)}
//                                     deleteReason={deleteReason} // Corrected prop name
//                                     setDeleteReason={setDeleteReason} // Corrected prop name
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </body>
//         </div>
//     );
// }

// export default Vendorlist;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddVendor from "./AddVendor";
// import VendorDesc from "./VendorDesc";
// import EditVendor from './EditVendor';
// import DeleteConfirmationModal from "../DeleteConfirmationModal"; // Import the new component
// import SearchBar from "../../components/sidebar/SearchBar";
// import Sidebar from "../../components/sidebar/Sidebar";

// function Vendorlist({ handleLogout, username }) {
//     const [vendors, setVendors] = useState([]);
//     const [selectedVendor, setSelectedVendor] = useState(null);
//     const [showVendorDetails, setShowVendorDetails] = useState(false);
//     const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editVendor, setEditVendor] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);
//     const [deleteVendor, setDeleteVendor] = useState(null); // State to store data of vendor being deleted
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
//     const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//             setVendors(response.data);
//         } catch (error) {
//             console.error("Error fetching vendors:", error);
//         }
//     };

//     const handleAddVendor = () => {
//         setIsAddVendorModalOpen(true);
//     };

//     const handleCloseVendorModal = () => {
//         setIsAddVendorModalOpen(false);
//         setIsEditModalOpen(false);
//     };

//     const handleVendorDetails = (vendor) => {
//         setSelectedVendor(vendor);
//         setShowVendorDetails(true);
//     };

//     const handleEditVendorClick = (vendor) => {
//         setEditVendor(vendor);
//         setIsEditModalOpen(true);
//     };

//     const handleEditVendorClose = () => {
//         setSelectedVendor(null);
//     };

//     const handleBackToTable = () => {
//         setSelectedVendor(null);
//         setShowVendorDetails(false);
//     };

//     const handleDeleteVendor = (vendor) => {
//         setDeleteVendor(vendor);
//         setIsDeleteModalOpen(true);
//     };

//     const handleUpdateVendor = async (updatedVendor) => {
//         try {
//             const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/vendors/${updatedVendor.id}`, updatedVendor);
//             console.log("Vendor updated:", response.data);
//             const updatedVendors = vendors.map(vendor => (vendor.id === updatedVendor.id ? response.data : vendor));
//             setVendors(updatedVendors);
//         } catch (error) {
//             console.error("Error updating vendor:", error);
//         }
//     };

//     const handleDeleteConfirmation = async () => {
//         try {
//             // Perform deletion in the database
//             await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/vendors/${deleteVendor.id}`);

//             // Save the deleted data to delete_details table
//             const deletedVendor = { ...deleteVendor, reason: deleteReason };
//             await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedVendor);

//             // Remove the deleted site from the UI
//             setVendors((prevVendors) =>
//                 prevVendors.filter((vendor) => vendor.id !== deleteVendor.id)
//             );
//             // Close the delete modal
//             setIsDeleteModalOpen(false);

//             console.log("Vendor deleted successfully");
//         } catch (error) {
//             console.error("Error deleting vendor:", error);
//             // Optionally handle error conditions here
//         }
//     };

//     const handleUpdateVendors = async () => {
//         fetchVendors();
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = vendors.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className='d-flex w-100 h-100 '>
//             <Sidebar />
//             <div className='w-100'>
//             <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
//                 <div className="container-fluid">
//                     {!showVendorDetails && (
//                         <div className="row">
//                             <div className="col-xl-12">
//                                 <div className="card shadow mb-4">
//                                     <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                         <h6 className="m-0 font-weight-bold text-primary">
//                                             Vendor List
//                                         </h6>
//                                         <div onClick={handleAddVendor} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
//                                             Add New Vendor
//                                         </div>
//                                         {/* <div className="dropdown no-arrow">
//                                             <a
//                                                 className="dropdown-toggle"
//                                                 href="#"
//                                                 role="button"
//                                                 id="dropdownMenuLink"
//                                                 data-toggle="dropdown"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                             >
//                                                 <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
//                                             </a>
//                                             <div
//                                                 className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//                                                 aria-labelledby="dropdownMenuLink"
//                                             >
//                                                 <div className="dropdown-header">Vendors:</div>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="#"
//                                                     onClick={handleAddVendor}
//                                                 >
//                                                     Add Vendor
//                                                 </a>
//                                             </div>
//                                         </div> */}
//                                     </div>
//                                     <div
//                                         className="card-body"
//                                         style={{ height: "calc(100% - 40px)" }}
//                                     >
//                                         <table
//                                             id="data"
//                                             className="table table-striped table-bordered"
//                                             style={{ width: "100%" }}
//                                         >
//                                             <thead>
//                                                 <tr>
//                                                     <th>Company Name</th>
//                                                     <th>Company Address</th>
//                                                     <th>Mobile No.</th>
//                                                     <th>Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {currentItems.map((vendor, index) => (
//                                                     <tr key={index}>
//                                                         <td>{vendor.vendorCompanyName}</td>
//                                                         <td>{vendor.vendorAddress}</td>
//                                                         <td>{vendor.contactPersonMobile}</td>
//                                                         <td>
//                                                             <div className="btn-group">
//                                                                 <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                                     <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                                                 </button>
//                                                                 <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                                                     <a className="dropdown-item" href="#" onClick={() => handleVendorDetails(vendor)}><i className="fa fa-file"></i> Detail</a>
//                                                                     <a className="dropdown-item" href="#" onClick={() => handleEditVendorClick(vendor)}><i className="fas fa-edit"></i> Edit</a>
//                                                                     <a className="dropdown-item" href="#" onClick={() => handleDeleteVendor(vendor)}><i className="fa fa-trash"></i> Delete</a>
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                         <ul className="pagination">
//                                             <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
//                                                 <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
//                                             </li>
//                                             {Array.from({ length: Math.ceil(vendors.length / itemsPerPage) }, (_, i) => (
//                                                 <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                                                     <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                                                 </li>
//                                             ))}
//                                             <li className={`page-item ${currentPage === Math.ceil(vendors.length / itemsPerPage) && 'disabled'}`}>
//                                                 <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {showVendorDetails && selectedVendor && (
//                         <VendorDesc
//                             vendor={selectedVendor}
//                             onClose={handleBackToTable}
//                         />
//                     )}
//                     {selectedVendor && !showVendorDetails && (
//                         <EditVendor vendor={selectedVendor} onClose={handleEditVendorClose} onUpdate={handleUpdateVendor} />
//                     )}
//                     {isAddVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdateVendors={handleUpdateVendors} />}
//                     <DeleteConfirmationModal
//                         isOpen={isDeleteModalOpen}
//                         itemName={deleteVendor ? deleteVendor.vendorCompanyName : ""}
//                         onDelete={handleDeleteConfirmation}
//                         onClose={() => setIsDeleteModalOpen(false)}
//                         deleteReason={deleteReason} // Corrected prop name
//                         setDeleteReason={setDeleteReason} // Corrected prop name
//                     />
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default Vendorlist;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVendor from "./AddVendor";
import VendorDesc from "./VendorDesc";
import EditVendor from './EditVendor';
import DeleteConfirmationModal from "../DeleteConfirmationModal"; // Import the new component
import SearchBar from "../../components/sidebar/SearchBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Vendorlist({ handleLogout, username }) {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showVendorDetails, setShowVendorDetails] = useState(false);
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editVendor, setEditVendor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [deleteVendor, setDeleteVendor] = useState(null); // State to store data of vendor being deleted
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
    const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const handleAddVendor = () => {
        setIsAddVendorModalOpen(true);
    };

    const handleCloseVendorModal = () => {
        setIsAddVendorModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setShowVendorDetails(true);
    };

    const handleEditVendorClick = (vendor) => {
        setEditVendor(vendor);
        setSelectedVendor(vendor); // Update selectedVendor state
        setIsEditModalOpen(true);
    };

    const handleEditVendorClose = () => {
        setSelectedVendor(null);
    };

    const handleBackToTable = () => {
        setSelectedVendor(null);
        setShowVendorDetails(false);
    };

    const handleDeleteVendor = (vendor) => {
        setDeleteVendor(vendor);
        setIsDeleteModalOpen(true);
    };

    const handleUpdateVendor = async (updatedVendor) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/vendors/${updatedVendor.id}`, updatedVendor);
            console.log("Vendor updated:", response.data);
            const updatedVendors = vendors.map(vendor => (vendor.id === updatedVendor.id ? response.data : vendor));
            setVendors(updatedVendors);
        } catch (error) {
            console.error("Error updating vendor:", error);
        }
    };

    const handleDeleteConfirmation = async () => {
        try {
            // Perform deletion in the database
            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/vendors/${deleteVendor.id}`);

            // Save the deleted data to delete_details table
            const deletedVendor = { ...deleteVendor, reason: deleteReason };
            await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedVendor);

            // Remove the deleted site from the UI
            setVendors((prevVendors) =>
                prevVendors.filter((vendor) => vendor.id !== deleteVendor.id)
            );
            // Close the delete modal
            setIsDeleteModalOpen(false);

            console.log("Vendor deleted successfully");
        } catch (error) {
            console.error("Error deleting vendor:", error);
        }
    };

    const handleUpdateVendors =() => {
        toast.success("successfully uploaded");
        fetchVendors();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vendors.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100'>
            <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid">
                <ToastContainer/>
                    {!showVendorDetails && (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Vendor List
                                        </h6>
                                        <div onClick={handleAddVendor} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                                            Add New Vendor
                                        </div>
                                    </div>
                                    <div
                                        className="card-body"
                                        style={{ height: "calc(100% - 40px)" }}
                                    >
                                        <table
                                            id="data"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Company Name</th>
                                                    <th>Company Address</th>
                                                    <th>Mobile No.</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((vendor, index) => (
                                                    <tr key={index}>
                                                        <td>{vendor.vendorCompanyName}</td>
                                                        <td>{vendor.vendorAddress}</td>
                                                        <td>{vendor.contactPersonMobile}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                                                    <a className="dropdown-item" href="#" onClick={() => handleVendorDetails(vendor)}><i className="fa fa-file"></i> Detail</a>
                                                                    <a className="dropdown-item" href="#" onClick={() => handleEditVendorClick(vendor)}><i className="fas fa-edit"></i> Edit</a>
                                                                    {/* <a className="dropdown-item" href="#" onClick={() => handleDeleteVendor(vendor)}><i className="fa fa-trash"></i> Delete</a> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(vendors.length / itemsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(vendors.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showVendorDetails && selectedVendor && (
                        <VendorDesc
                            vendor={selectedVendor}
                            onClose={handleBackToTable}
                        />
                    )}
                    {selectedVendor && !showVendorDetails && (
                        <EditVendor vendor={selectedVendor} onClose={handleEditVendorClose} onUpdate={handleUpdateVendor} />
                    )}
                    {isAddVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdateVendors={handleUpdateVendors} />}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        itemName={deleteVendor ? deleteVendor.vendorCompanyName : ""}
                        onDelete={handleDeleteConfirmation}
                        onClose={() => setIsDeleteModalOpen(false)}
                        deleteReason={deleteReason} // Corrected prop name
                        setDeleteReason={setDeleteReason} // Corrected prop name
                    />
                </div>
            </div>
        </div>
    );
}

export default Vendorlist;
