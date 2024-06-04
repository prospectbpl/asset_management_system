// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import AddDataModal from '../AssetMaster/AddDataModal'; // Import your AddDataModal component
// import './Componentlist.css';
// import AddEmployeeTable from '../EmployeeMaster/AddEmployeeTable';
// import AddVendor from '../VendorMaster/AddVendor';
// import AddSiteModal from '../SiteMaster/AddSiteModal';
// import AddClientModal from '../ClientMaster/AddClientModal';
// import AssetLost from '../AssetMaster/AssetLost';
// import AddCategory from '../CategoryMaster/AddCategory';
// // Component list 
// import AddComponent from './AddComponent';
// import ComponentDetails from './ComponentDetails'; // Import ComponentDetails component
// import EditComponentModal from './EditComponentModal'; // Import EditComponentModal component




// function ComponentList() {
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
//   const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
//   const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
//   const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
//   // head component list 
//   const [components, setComponents] = useState([]);
//   const [isComponentModalOpen, setIsComponentModalOpen] = useState(false);
//   const [selectedComponent, setSelectedComponent] = useState(null); // State to track selected component
//   const [showComponentDetails, setShowComponentDetails] = useState(false); // State to manage showing component details
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
//   const [editComponentData, setEditComponentData] = useState(null); // State to hold data of component being edited
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(2);


//   const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

//   const changeStyle = () => {
//     if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//       setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
//     }
//     else {
//       setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
//     }
//   };
//   const changeStyle1 = () => {
//     if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
//       setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
//     }
//     else {
//       setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
//     }
//   };

//   // handle 
//   const handleAddAsset = () => {
//     setIsModalOpen(true); // Open the modal when "Add new Asset" button is clicked
//   };

//   // const handleCloseModal = () => {
//   //   setIsModalOpen(false); // Close the modal
//   // };

//   const handleAddEmployee = () => {
//     setIsEmployeeModalOpen(true);
//   };

//   const handleAddVendor = () => {
//     setIsVendorModalOpen(true);
//   };

//   const handleAddCategory = () => {
//     setIsCategoryModalOpen(true);
//   };

//   const handleCloseCategoryModal = () => {
//     setIsCategoryModalOpen(false);
//   };

//   const handleCloseEmployeeModal = () => {
//     setIsEmployeeModalOpen(false);
//   };

//   const handleCloseVendorModal = () => {
//     setIsVendorModalOpen(false);
//   };

//   // clientmodal 

//   const handleAddClient = () => {
//     setIsAddClientModalOpen(true);
//   };

//   const handleCloseClientModal = () => {
//     setIsAddClientModalOpen(false);
//   };

//   // Asset Lost 

//   const handleAddAssetLost = () => {
//     setIsAddAssetLostModalOpen(true);
//   };

//   const handleCloseAssetLostModal = () => {
//     setIsAddAssetLostModalOpen(false);
//   };

//   // site Modal 

//   const handleAddSite = () => {
//     setIsAddSiteModalOpen(true)
//   };

//   const handleCloseSiteModal = () => {
//     setIsAddSiteModalOpen(false);
//   };

//   // Head component List 

//   useEffect(() => {
//     fetchComponents();
//   }, []);

//   const fetchComponents = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);
//       setComponents(response.data);
//     } catch (error) {
//       console.error('Error fetching components:', error);
//     }
//   };

//   const handleUpdateComponentList = () => {
//     fetchComponents();
//   };

//   const handleAddComponent = () => {
//     setIsComponentModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setIsComponentModalOpen(false);
//   };

//   const handleComponentDetails = (component) => {
//     setSelectedComponent(component);
//     setShowComponentDetails(true);
//   };

//   const handleEditComponent = (component) => {
//     setEditComponentData(component);
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteComponent = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/components/${id}`);
//       setComponents(components.filter((component) => component.id !== id));
//     } catch (error) {
//       console.error("Error deleting component:", error);
//     }
//   };

//   const handleUpdateComponent = async (updatedComponent) => {
//     try {

//       await axios.put(`${process.env.REACT_APP_LOCAL_URL}/components/${updatedComponent.id}`, updatedComponent);
//       setComponents(components.map(component =>
//         component.id === updatedComponent.id ? updatedComponent : component
//       ));
//       fetchComponents();
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating component:", error);
//     }
//   };

//   // Logic to get current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);


//   return (
//     <div>
//       <body id="page-top">

//         {/*  <!-- Page Wrapper --> */}
//         <div id="wrapper">

//           {/*  <!-- Sidebar --> */}
//           <ul className={style} id="accordionSidebar">

//             {/*  <!-- Sidebar - Brand --> */}
//             <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
//               <div className="sidebar-brand-icon rotate-n-15">
//               </div>
//               <div className="sidebar-brand-text mx-3">Prospect Legal</div>
//               <div className="text-center d-none d-md-inline">
//                 <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
//               </div>
//             </a>

//             {/*   <!-- Divider --> */}
//             <hr className="sidebar-divider my-0" />

//             {/*  <!-- Nav Item - ComponentList --> */}
//             <li className="nav-item active">
//               <Link to="/dashboard" className="nav-link" href="index.html">
//                 <i className="fas fa-fw fa-tachometer-alt"></i>
//                 <span>ComponentList</span></Link>
//             </li>

//             {/*  <!-- Divider --> */}
//             <hr className="sidebar-divider" />

//             {/*   <!-- Heading --> */}
//             <div className="sidebar-heading">
//               Interface
//             </div>

//             {/*  <!-- Nav Item - Pages Collapse Menu --> */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
//                 aria-expanded="true" aria-controls="collapseTwo">
//                 <i className="fas fa-fw fa-cog"></i>
//                 <span>Asset Master</span>
//               </a>
//               <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Assets</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
//                   <Link className="collapse-item" to="/assetlist">Total Asset</Link>
//                   <a className="collapse-item" href="#">Transfer Asset</a>
//                   <h6 className="collapse-header">Asset on Maintainence:</h6>
//                   <Link className="collapse-item" to="/assetMaintenance" >Total Maintenance</Link>
//                   <Link className="collapse-item" to="/finishedmaintenance" >Finished Maintenance</Link>
//                   <Link className="collapse-item" to="/unfinishedmaintenance" >UnFinished Maintenance</Link>
//                   <h6 className="collapse-header">Asset on Insurence:</h6>
//                   <Link className="collapse-item" to="/assetinsurence" >Asset Insurence</Link>
//                   <h6 className="collapse-header">Asset Lost:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAssetLost}>Add Asset Lost</a>
//                   <Link className="collapse-item" to="/assetlostlist" >Asset Lost List</Link>
//                   <a className="collapse-item" href="#">Asset Hold</a>
//                 </div>
//               </div>
//             </li>



//             {/* <!-- Nav Item - Employee --> */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEmployee"
//                 aria-expanded="true" aria-controls="collapseEmployee">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>Employee</span>
//               </a>
//               <div id="collapseEmployee" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Employees:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee</a>
//                   <Link className="collapse-item" to="/employelist">Total Employee</Link>
//                   <a className="collapse-item" href="#">Transfer Employee</a>
//                   <a className="collapse-item" href="#">Employee on Maintainence</a>
//                   <a className="collapse-item" href="#">Employee Insurence</a>
//                   <a className="collapse-item" href="#">Employee Lost</a>
//                   <a className="collapse-item" href="#">Employee Hold</a>
//                 </div>
//               </div>
//             </li>
//             {/*  <!-- Nav Item - Site Master --> */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSite"
//                 aria-expanded="true" aria-controls="collapseSite">
//                 <i className="fas fa-fw fa-table"></i>
//                 <span>Site Master</span>
//               </a>
//               <div id="collapseSite" className="collapse" aria-labelledby="headingSite" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Sites:</h6>
//                   <a className="collapse-item" onClick={handleAddSite}>Add new Site</a>
//                   <Link className="collapse-item" to="/sitelist">Total Sites</Link>
//                   <a className="collapse-item" href="#">Update Site Details</a>
//                   <a className="collapse-item" href="#">Delete Site</a>
//                   <a className="collapse-item" href="#">Site Status</a>
//                   <a className="collapse-item" href="#">Site Reports</a>
//                 </div>
//               </div>
//             </li>

//             {/* <!-- Nav Item - Client Master --> */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClient"
//                 aria-expanded="true" aria-controls="collapseClient">
//                 <i className="fas fa-fw fa-users"></i>
//                 <span>Client Master</span>
//               </a>
//               <div id="collapseClient" className="collapse" aria-labelledby="headingClient" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Clients:</h6>
//                   <a className="collapse-item" onClick={handleAddClient}>Add new Client</a>
//                   <Link className="collapse-item" to="/clientlist">Total Clients</Link>
//                   <a className="collapse-item" href="#">Update Client Details</a>
//                   <a className="collapse-item" href="#">Delete Client</a>
//                   <a className="collapse-item" href="#">Client Status</a>
//                   <a className="collapse-item" href="#">Client Reports</a>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - vendor Master */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsevendor"
//                 aria-expanded="true" aria-controls="collapsevendor">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>vendor master</span>
//               </a>
//               <div id="collapsevendor" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">vendors:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor</a>
//                   <Link className="collapse-item" to="/vendorlist" >Total vendor</Link>
//                   <a className="collapse-item" href="#">Transfer vendor</a>
//                   <a className="collapse-item" href="#">vendor on Maintainence</a>
//                   <a className="collapse-item" href="#">vendor Insurence</a>
//                   <a className="collapse-item" href="#">vendor Lost</a>
//                   <a className="collapse-item" href="#">vendor Hold</a>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Category Master */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecategory"
//                 aria-expanded="true" aria-controls="collapsecategory">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>Category master</span>
//               </a>
//               <div id="collapsecategory" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Category:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category</a>
//                   <Link className="collapse-item" to="/categorylist" >Total Category</Link>
//                   <a className="collapse-item" href="#">Transfer category</a>
//                   <a className="collapse-item" href="#">category on Maintainence</a>
//                   <a className="collapse-item" href="#">category Insurence</a>
//                   <a className="collapse-item" href="#">category Lost</a>
//                   <a className="collapse-item" href="#">category Hold</a>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total Component */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecomponent"
//                 aria-expanded="true" aria-controls="collapsecomponent">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>Component master</span>
//               </a>
//               <div id="collapsecomponent" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Component:</h6>
//                   <Link className="collapse-item" to="/componentlist" >Total head component</Link>
//                   <Link className="collapse-item" to="/fullcomponentlist">Total Component</Link>
//                   <a className="collapse-item" href="#">Transfer category</a>
//                   <a className="collapse-item" href="#">category on Maintainence</a>
//                   <a className="collapse-item" href="#">category Insurence</a>
//                   <a className="collapse-item" href="#">category Lost</a>
//                   <a className="collapse-item" href="#">category Hold</a>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total history */}
//             <li className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsedelete"
//                 aria-expanded="true" aria-controls="collapsedelete">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>Master</span>
//               </a>
//               <div id="collapsedelete" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Delete:</h6>
//                   <Link className="collapse-item" to="/deletelist" >Delete</Link>
//                   <Link className="collapse-item" to="/brandlist" >Brand</Link>
//                 </div>
//               </div>
//             </li>
//             {/* <!-- Divider --> */}
//             <hr className="sidebar-divider d-none d-md-block" />
//           </ul>
//           {/*  <!-- End of Sidebar --> */}

//           {/*  <!-- Content Wrapper --> */}
//           <div id="content-wrapper" className="d-flex flex-column">

//             {/*  <!-- Main Content --> */}
//             <div id="content">

//               {/*  <!-- Topbar --> */}
//               <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

//                 {/*  <!-- Sidebar Toggle (Topbar) --> */}
//                 <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
//                   <i className="fa fa-bars"></i>
//                 </button>

//                 {/*  <!-- Topbar Search --> */}
//                 <form
//                   className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
//                   <div className="input-group">
//                     <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
//                       aria-label="Search" aria-describedby="basic-addon2" />
//                     <div className="input-group-append">
//                       <button className="btn btn-primary" type="button">
//                         <i className="fas fa-search fa-sm"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {/*  <!-- Topbar Navbar --> */}
//                 <ul className="navbar-nav ml-auto">

//                   {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
//                   <li className="nav-item dropdown no-arrow d-sm-none">
//                     <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
//                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                       <i className="fas fa-search fa-fw"></i>
//                     </a>
//                     {/*   <!-- Dropdown - Messages --> */}
//                     <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
//                       aria-labelledby="searchDropdown">
//                       <form className="form-inline mr-auto w-100 navbar-search">
//                         <div className="input-group">
//                           <input type="text" className="form-control bg-light border-0 small"
//                             placeholder="Search for..." aria-label="Search"
//                             aria-describedby="basic-addon2" />
//                           <div className="input-group-append">
//                             <button className="btn btn-primary" type="button">
//                               <i className="fas fa-search fa-sm"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </li>
//                   <div className="topbar-divider d-none d-sm-block"></div>
//                   {/* <!-- Nav Item - User Information --> */}
//                   <li className="nav-item dropdown no-arrow">

//                     <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
//                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                       <span className="mr-2 d-none d-lg-inline text-gray-600 small">Aditya Shrivastava</span>
//                       <img className="img-profile rounded-circle"
//                         src="img/undraw_profile.svg" />
//                     </a>

//                     {/*  <!-- Dropdown - User Information --> */}
//                     <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
//                       aria-labelledby="userDropdown">
//                       <Link
//                         to="/profile"

//                         id="userDropdown"
//                         role="button"
//                         data-toggle="dropdown"
//                         aria-haspopup="true"
//                         aria-expanded="false"
//                       >
//                         <a className="dropdown-item" href="#">
//                           <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
//                           Profile
//                         </a>
//                       </Link>
//                       <a className="dropdown-item" href="#">
//                         <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
//                         Settings
//                       </a>
//                       <a className="dropdown-item" href="#">
//                         <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
//                         Activity Log
//                       </a>
//                       <div className="dropdown-divider"></div>
//                       <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
//                         <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
//                         Logout
//                       </a>
//                     </div>
//                   </li>
//                 </ul>
//               </nav>
//               {/*  <!-- End of Topbar --> */}

//               {/* <!-- Begin Page Content --> */}
//               <div className="container-fluid">
//                 {showComponentDetails ? (
//                   <ComponentDetails
//                     component={selectedComponent}
//                     onClose={() => setShowComponentDetails(false)}
//                   />
//                 ) : (
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="card shadow mb-4">
//                         <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                           <h6 className="m-0 font-weight-bold text-primary">
//                             Head Component List
//                           </h6>
//                           <div className="dropdown no-arrow">
//                             <a
//                               className="dropdown-toggle"
//                               href="#"
//                               role="button"
//                               id="dropdownMenuLink"
//                               data-toggle="dropdown"
//                               aria-haspopup="true"
//                               aria-expanded="false"
//                             >
//                               <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
//                             </a>
//                             <div
//                               className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//                               aria-labelledby="dropdownMenuLink"
//                             >
//                               <div className="dropdown-header"> Head Component :</div>
//                               <a
//                                 className="dropdown-item"
//                                 href="#"
//                                 onClick={handleAddComponent}
//                               >
//                                 Add New Component
//                               </a>
//                             </div>
//                             {isComponentModalOpen && (
//                               <AddComponent onClose={handleCloseModal} />
//                             )}
//                           </div>
//                         </div>
//                         <div className="card-body">
//                           <table
//                             className="table table-striped table-bordered"
//                             style={{ width: "100%" }}
//                           >
//                             <thead>
//                               <tr>
//                                 <th>Component Name</th>
//                                 <th>Size</th>
//                                 <th>Category</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {currentItems.map((component) => (
//                                 <tr key={component.id}>
//                                   <td>{component.componentName}</td>
//                                   <td>{component.size}</td>
//                                   <td>{component.category}</td>
//                                   <td>
//                                     <div className="btn-group">
//                                       <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                         <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                       </button>
//                                       <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                         <a
//                                           className="dropdown-item"
//                                           href="#"
//                                           onClick={() =>
//                                             handleComponentDetails(component)
//                                           }
//                                         >
//                                           <i className="fa fa-file "></i>
//                                           <span> Details</span>
//                                         </a>
//                                         <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditComponent(component)}><i className="fa fa-pencil"></i> Edit</a>
//                                         <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteComponent(component.id)}><i className="fa fa-trash"></i> Delete</a>
//                                       </div>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                           {/* Pagination */}
//                           <ul className="pagination">
//                             <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
//                               <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
//                             </li>
//                             {Array.from({ length: Math.ceil(components.length / itemsPerPage) }, (_, i) => (
//                               <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                                 <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                               </li>
//                             ))}
//                             <li className={`page-item ${currentPage === Math.ceil(components.length / itemsPerPage) && 'disabled'}`}>
//                               <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {/* Edit Component Modal */}
//                 {isEditModalOpen && (
//                   <EditComponentModal
//                     component={editComponentData}
//                     onClose={() => setIsEditModalOpen(false)}
//                     onUpdate={handleUpdateComponent}
//                   />
//                 )}
//                 {isComponentModalOpen && (<AddComponent onClose={handleCloseModal} onUpdateComponents={handleUpdateComponentList} />)}
//               </div>
//             </div>
//           </div>
//         </div>
//         <a className="scroll-to-top rounded" href="#page-top">
//           <i className="fas fa-angle-up"></i>
//         </a>

//         {/*  <!-- Logout Modal--> */}
//         <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
//           aria-hidden="true">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
//                 <button className="close" type="button" data-dismiss="modal" aria-label="Close">
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
//                 <a className="btn btn-primary" href="login.html">Logout</a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Add Modal Tables*/}
//         {isModalOpen && <AddDataModal onClose={handleCloseModal} />}
//         {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} />}
//         {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} />}
//         {isCategoryModalOpen && <AddCategory onClose={handleCloseCategoryModal} />}
//         {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} />}
//         {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} />}
//         {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} />}
//       </body>
//     </div>
//   )
// }

// export default ComponentList;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddComponent from './AddComponent';
// import ComponentDetails from './ComponentDetails'; // Import ComponentDetails component
// import EditComponentModal from './EditComponentModal'; // Import EditComponentModal component
// import SearchBar from '../../components/sidebar/SearchBar';
// import Sidebar from '../../components/sidebar/Sidebar';

// function ComponentList({ handleLogout, username }) {
//   const [components, setComponents] = useState([]);
//   const [isComponentModalOpen, setIsComponentModalOpen] = useState(false);
//   const [selectedComponent, setSelectedComponent] = useState(null); // State to track selected component
//   const [showComponentDetails, setShowComponentDetails] = useState(false); // State to manage showing component details
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
//   const [editComponentData, setEditComponentData] = useState(null); // State to hold data of component being edited
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(2);

//   useEffect(() => {
//     fetchComponents();
//   }, []);

//   const fetchComponents = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);
//       setComponents(response.data);
//     } catch (error) {
//       console.error('Error fetching components:', error);
//     }
//   };

//   const handleUpdateComponentList = () => {
//     fetchComponents();
//   };

//   const handleAddComponent = () => {
//     setIsComponentModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsComponentModalOpen(false);
//   };

//   const handleComponentDetails = (component) => {
//     setSelectedComponent(component);
//     setShowComponentDetails(true);
//   };

//   const handleEditComponent = (component) => {
//     setEditComponentData(component);
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteComponent = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/components/${id}`);
//       setComponents(components.filter((component) => component.id !== id));
//     } catch (error) {
//       console.error("Error deleting component:", error);
//     }
//   };

//   const handleUpdateComponent = async (updatedComponent) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_LOCAL_URL}/components/${updatedComponent.id}`, updatedComponent);
//       setComponents(components.map(component =>
//         component.id === updatedComponent.id ? updatedComponent : component
//       ));
//       fetchComponents();
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating component:", error);
//     }
//   };

//   // Logic to get current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className='d-flex w-100 h-100 '>
//       <Sidebar />
//       <div className='w-100'>
//         <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
//         <div className="container-fluid">
//           {showComponentDetails ? (
//             <ComponentDetails
//               component={selectedComponent}
//               onClose={() => setShowComponentDetails(false)}
//             />
//           ) : (
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="card shadow mb-4">
//                   <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                     <h6 className="m-0 font-weight-bold text-primary">
//                       Head Component List
//                     </h6>
//                     <div onClick={handleAddComponent} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
//                       Add Head Component
//                     </div>

//                     {/* <div className="dropdown no-arrow">
//                       <a
//                         className="dropdown-toggle"
//                         href="#"
//                         role="button"
//                         id="dropdownMenuLink"
//                         data-toggle="dropdown"
//                         aria-haspopup="true"
//                         aria-expanded="false"
//                       >
//                         <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
//                       </a>
//                       <div
//                         className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//                         aria-labelledby="dropdownMenuLink"
//                       >
//                         <div className="dropdown-header"> Head Component :</div>
//                         <a
//                           className="dropdown-item"
//                           href="#"
//                           onClick={handleAddComponent}
//                         >
//                           Add New Component
//                         </a>
//                       </div>
//                       {isComponentModalOpen && (
//                         <AddComponent onClose={handleCloseModal} />
//                       )}
//                     </div> */}
//                   </div>
//                   <div className="card-body">
//                     <table
//                       className="table table-striped table-bordered"
//                       style={{ width: "100%" }}
//                     >
//                       <thead>
//                         <tr>
//                           <th>Component Name</th>
//                           <th>Size</th>
//                           <th>Category</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentItems.map((component) => (
//                           <tr key={component.id}>
//                             <td>{component.componentName}</td>
//                             <td>{component.size}</td>
//                             <td>{component.category}</td>
//                             <td>
//                               <div className="btn-group">
//                                 <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                   <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                 </button>
//                                 <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() =>
//                                       handleComponentDetails(component)
//                                     }
//                                   >
//                                     <i className="fa fa-file "></i>
//                                     <span> Details</span>
//                                   </a>
//                                   <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditComponent(component)}><i className="fa fa-pencil"></i> Edit</a>
//                                   <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteComponent(component.id)}><i className="fa fa-trash"></i> Delete</a>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     {/* Pagination */}
//                     <ul className="pagination">
//                       <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
//                         <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
//                       </li>
//                       {Array.from({ length: Math.ceil(components.length / itemsPerPage) }, (_, i) => (
//                         <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                           <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                         </li>
//                       ))}
//                       <li className={`page-item ${currentPage === Math.ceil(components.length / itemsPerPage) && 'disabled'}`}>
//                         <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* Edit Component Modal */}
//           {isEditModalOpen && (
//             <EditComponentModal
//               component={editComponentData}
//               onClose={() => setIsEditModalOpen(false)}
//               onUpdate={handleUpdateComponent}
//             />
//           )}
//           {isComponentModalOpen && (<AddComponent onClose={handleCloseModal} onUpdateComponents={handleUpdateComponentList} />)}
//         </div>
//       </div>
//     </div>

//   );
// }

// export default ComponentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComponent from './AddComponent';
import EditComponentModal from './EditComponentModal';
import SearchBar from '../../components/sidebar/SearchBar';
import Sidebar from '../../components/sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ComponentList({ handleLogout, username }) {
  const [components, setComponents] = useState([]);
  const [isComponentModalOpen, setIsComponentModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showComponentDetails, setShowComponentDetails] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editComponentData, setEditComponentData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);
      setComponents(response.data);
    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  const handleUpdateComponentList = () => {
    fetchComponents();
  };

  const handleAddComponent = () => {
    setIsComponentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsComponentModalOpen(false);
  };

  const handleComponentDetails = (component) => {
    setSelectedComponent(component);
    setShowComponentDetails(true);
  };

  const handleEditComponent = (component) => {
    setEditComponentData(component);
    setIsEditModalOpen(true);
  };

  const handleDeleteComponent = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/components/${id}`);
      setComponents(components.filter((component) => component.id !== id));
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  };

  const handleUpdateComponent = async (updatedComponent) => {
    try {
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/components/${updatedComponent.id}`, updatedComponent);
      setComponents(components.map(component =>
        component.id === updatedComponent.id ? updatedComponent : component
      ));
      fetchComponents();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };
  const handleOnAddComponent=()=>{
    toast.success("successfully uploaded");
    fetchComponents()
  }
  const handleEditUpdateComponent=()=>{
    fetchComponents()
  }


  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100 h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid">
        <ToastContainer/>
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Head Component List
                  </h6>
                  <div onClick={handleAddComponent} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                    Add Head Component
                  </div>
                </div>
                <div className="card-body">
                  <table
                    className="table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Component Image</th>
                        <th>Component Name</th>
                        <th>Size</th>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((component) => (
                        <tr key={component.id}>
                          <td>
                                  <img
                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/components/${component.componentImage}`}
                                    style={{ width: "90px" }}
                                    alt="component"
                                  />
                                </td>
                          <td>{component.componentName}</td>
                          <td>{component.size}</td>
                          <td>{component.category}</td>
                          <td>
                            <div className="btn-group">
                              <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                              </button>
                              <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    handleComponentDetails(component)
                                  }
                                >
                                  <i className="fa fa-file "></i>
                                  <span> Details</span>
                                </a>
                                <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditComponent(component)}><i className="fa fa-pencil"></i> Edit</a>
                                {/* <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteComponent(component.id)}><i className="fa fa-trash"></i> Delete</a> */}
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
                    {Array.from({ length: Math.ceil(components.length / itemsPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(components.length / itemsPerPage) && 'disabled'}`}>
                      <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Edit Component Modal */}
          {isEditModalOpen && (
            <EditComponentModal
              component={editComponentData}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleEditUpdateComponent}
            />
          )}
          {isComponentModalOpen && (
            <AddComponent onClose={handleCloseModal} onUpdateComponents={handleOnAddComponent} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ComponentList;
