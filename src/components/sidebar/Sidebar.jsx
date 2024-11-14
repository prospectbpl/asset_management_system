// import React, { useEffect, useState, } from "react";
// import { Link, useLocation, Route, Routes, useNavigate } from "react-router-dom";
// import "./Sidebar.css";
// import AddDataModal from "../../pages/AssetMaster/AddDataModal";
// import AddEmployeeTable from "../../pages/EmployeeMaster/AddEmployeeTable";
// import AddVendor from "../../pages/VendorMaster/AddVendor";
// import AddCategory from "../../pages/CategoryMaster/AddCategory";
// import AddSiteModal from "../../pages/SiteMaster/AddSiteModal";
// import AddClientModal from "../../pages/ClientMaster/AddClientModal";
// import AssetLost from "../../pages/AssetMaster/AssetLost";
// import axios from "axios";
// import AddBrandModal from "../../pages/BrandMaster/AddBrandModal";
// import AddComponent from "../../pages/ComponentMaster/AddComponent";
// import AddComponentList from "../../pages/ComponentMaster/AddComponentList";
// import AddInsuranceModal from "../../pages/Insurance/AddAssetInsuranceModal";
// import AddMaintenanceData from "../../pages/AssetMaster/AddMaintenanceData";
// import AddAsset from "../../pages/AssetMaster/AddAsset";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddTransporterModal from "../../pages/Transport/AddTransporterModal";
// import logo from '../../images/Logo/logo.png';  //logo
// // list import  

// // import { Dashboard } from "@mui/icons-material";

// function Sidebar({ handleLogout }) {
//   // chenge the sidebar  
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
//   // chenge the sidebar  


//   // Form Modal open 
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
//   const [isAssetModalOpen, setIsAssetModalOpen] = useState(false); // State to manage modal open/close
//   const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
//   const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
//   const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
//   const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
//   const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
//   const [isHeadComponentModalOpen, setIsHeadComponentModalOpen] = useState(false);
//   const [isAddComponentListModalOpen, setIsAddComponentListModalOpen] = useState(false);
//   const [isAddAssetInsuranceModalOpen, setIsAddAssetInsuranceModalOpen] = useState(false);
//   const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
//   const [isAddTransporterModalOpen, setIsAddTransporterModalOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate(); // Place the hook outside of the component


//   // Handle 
//   const handleAddAsset = () => {
//     setIsModalOpen(true); // Open the modal when "Add new Asset" button is clicked
//   };
//   // const handleAddAsset = (event) => {
//   //   event.preventDefault(); // Prevent default behavior of the anchor tag
//   //   navigate("/assetlist"); // Navigate to the asset list page
//   //   setIsModalOpen(true); // Open the modal
//   // };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };
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

//   // Brand  Modal 

//   const handleAddBrand = () => {
//     setIsAddBrandModalOpen(true);
//   };

//   const handleCloseBrandModal = () => {
//     setIsAddBrandModalOpen(false);
//   };

//   // Head Component Modal 

//   const handleAddHeadComponent = () => {
//     setIsHeadComponentModalOpen(true);
//   };

//   const handleCloseHeadComponentModal = () => {
//     setIsHeadComponentModalOpen(false);
//   };

//   // Component List Modal 

//   const handleAddComponentListModal = () => {
//     setIsAddComponentListModalOpen(true);
//   };

//   const handleCloseComponentListModal = () => {
//     setIsAddComponentListModalOpen(false);
//   };

//   // Asset Insurence Modal 

//   const handleAddAssetInsuranceModal = () => {
//     setIsAddAssetInsuranceModalOpen(true);
//   };

//   const handleCloseAssetInsuranceModal = () => {
//     setIsAddAssetInsuranceModalOpen(false);
//   };
//   // Asser Maintenance Modal 

//   const handleAddAssetMaintenanceModal = () => {
//     setIsAddMaintenanceModalOpen(true);
//   };

//   const handleCloseMaintenanceModal = () => {
//     setIsAddMaintenanceModalOpen(false);
//   };
//   // Asser Maintenance Modal 

//   const handleAddTransporterModal = () => {
//     setIsAddTransporterModalOpen(true);
//   };

//   const handleCloseTransporterModal = () => {
//     setIsAddTransporterModalOpen(false);
//   };

//   // Add Asset Modal 

//   const handleAddAssetModal = () => {
//     setIsAssetModalOpen(true);
//   };

//   const handleCloseAssetModal = () => {
//     setIsAssetModalOpen(false);
//   };

//   const [dashboardLogo, setDashboardLogo] = useState([]);

//   useEffect(() => {
//     const fetchDashboardLogo = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//         setDashboardLogo(response.data);
//       } catch (error) {
//         console.error('Error fetching Dashboard Logo', error);
//       }
//     };

//     fetchDashboardLogo();
//   }, []);

//   const handleListClick = (path) => {
//     if (window.location.pathname === path) {
//       window.location.reload();
//     }
//   };

//   const handleUpdate = () => {
//     toast.success("successfully uploaded");
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       <body style={{ backgroundColor: "#004E9B" }} id="page-top">

//         {/*  <!-- Page Wrapper --> */}
//         <div id="wrapper">

//           {/*  <!-- Sidebar --> */}
//           <ul className={style} id="accordionSidebar">
//             {/*  <!-- Sidebar - Brand --> */}
//             {/* <a className="sidebar-brand d-flex align-items-center justify-content-center w-100" href="#">
//               <div className="sidebar-brand-text text-dark mx-3 w-100">
//                 <div className='logo'>
//                   <img
//                     src={dashboardLogo.landingPageLogo
//                       ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
//                       : <h4>Asset Managment</h4>}
//                     style={{objectFit:"cover",width:"80%",height:"80%"}}
//                     alt="LOGO"
//                   />
//                 </div>

//               </div>
//               <div className="text-center d-none d-md-inline ">
//                 <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
//               </div>
//             </a> */}
//             <a className="sidebar-brand d-flex align-items-center justify-content-center gap-2 px-3 py-1" href="#">
//               <div className="sidebar-brand-text" style={{ width: "100%", height: "100%" }}>
//                 <div className='logoo'>
//                   <img
//                     src={dashboardLogo.landingPageLogo
//                       ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
//                       : logo}
//                     className="img-logo"
//                     alt="LOGO"
//                   />
//                 </div>
//               </div>
//               <div className="text-center d-none d-md-inline">
//                 <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
//               </div>
//             </a>

//             {/*   <!-- Divider --> */}
//             <hr className="sidebar-divider my-0" />

//             {/*  <!-- Nav Item - Dashboard --> */}
//             <li style={{ zIndex: "999" }} className="nav-item active">
//               <Link to="/dashboard" className="nav-link" onClick={() => handleListClick("/dashboard")}>
//                 <i className="fas fa-fw fa-tachometer-alt"></i>
//                 <span>Dashboard</span>
//               </Link>
//             </li>

//             {/*  <!-- Divider --> */}
//             <hr className="sidebar-divider" />

//             {/*   <!-- Heading --> */}
//             <div className="sidebar-heading">Interface</div>

//             {/* <!-- Nav Item - Asset Master --> */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAsset"
//                 aria-expanded="true" aria-controls="collapseAsset">
//                 <i className="fas fa-users"></i>
//                 <span>Asset Master</span>
//               </a>
//               <div id="collapseAsset" className="collapse" aria-labelledby="headingAsset" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Assets:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAssetModal}>Add Asset master</a>
//                   <Link to="/assetmasterlist" className="collapse-item"><span>Asset Master List</span></Link>
//                   <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
//                   <Link to="/assetlist" className="collapse-item" onClick={() => handleListClick("/assetlist")}>
//                     <span>Asset List</span>
//                   </Link>
//                   {/* <Link to="/assetlist" className="collapse-item"><span>Asset List</span></Link> */}
//                   <Link to="/assettransfer" className="collapse-item"><span>Asset Transfer</span></Link>
//                   {/* <a className="collapse-item" href="#">Transfer Asset</a> */}
//                   <h6 className="collapse-header">Asset on Maintenance:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAssetMaintenanceModal}>Add new Maintenance</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/assetMaintenance")} to="/assetMaintenance" ><span>Asset Maintenance</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/finishedmaintenance")} to="/finishedmaintenance" ><span>Finished Maintenance</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/UnfinishedMaintenance")} to="/UnfinishedMaintenance" ><span>Unfinished Maintenance</span>
//                   </Link>
//                   <h6 className="collapse-header">Asset on Insurance:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAssetInsuranceModal}>Add Insurance</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/AssetInsurance")} to="/AssetInsurance" >
//                     <span>Asset Insurance</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/assetinsurenceexpiry")} to="/assetinsurenceexpiry" >
//                     <span>Insurance Expiry</span>
//                   </Link>
//                   <h6 className="collapse-header">Asset Lost:</h6>
//                   <a className="collapse-item" onClick={handleAddAssetLost}>
//                     Add Asset Lost
//                   </a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/assetlostlist")} to="/assetlostlist" >
//                     <span>Asset Lost List</span>
//                   </Link>
//                   {/* <a className="collapse-item" href="#">
//                     Asset Hold
//                   </a> */}
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total Component */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecomponent"
//                 aria-expanded="true" aria-controls="collapsecomponent">
//                 <i className="fas fa-fw fa-chart-area"></i>
//                 <span>Component master</span>
//               </a>
//               <div id="collapsecomponent" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Component:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddHeadComponent}>Add Head Component</a>
//                   <a className="collapse-item" href="#" onClick={handleAddComponentListModal}>Add Component List</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/componentlist")} to="/componentlist" >
//                     <span>Head Component List</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/fullcomponentList")} to="/fullcomponentList">
//                     <span>Full Component List</span>
//                   </Link>
//                 </div>
//               </div>
//             </li>
//             {/* <!-- Nav Item - All Master --> */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMaster"
//                 aria-expanded="true" aria-controls="collapseMaster">
//                 <i className="fas fa-users"></i>
//                 <span>All Masters</span>
//               </a>
//               <div id="collapseMaster" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   {/* <h6  className="collapse-header">Asset Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
//                   <Link to="/assetlist" className="collapse-item"><span>Asset List</span></Link> */}
//                   <h6 className="collapse-header">Employees:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee </a>
//                   {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/Employeelist" >
//                     <span>Employee List</span>
//                   </Link> */}
//                   <Link to="/Employeelist" className="collapse-item" onClick={() => handleListClick("/Employeelist")}>
//                     <span>Employee List</span>
//                   </Link>
//                   <h6 className="collapse-header">Category Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/categoryList")} to="/categoryList" >
//                     <span>Category List</span>
//                   </Link>
//                   <h6 className="collapse-header">Vendor Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor </a>
//                   <Link to="/vendorlist" className="collapse-item" onClick={() => handleListClick("/vendorlist")}>
//                     <span>Vendor List</span>
//                   </Link>
//                   {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/vendorlist">
//                     <span>Vendor List</span>
//                   </Link> */}
//                   <h6 className="collapse-header">Brand Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddBrand}>Add new Brand</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/brandlist")} to="/brandlist">
//                     <span>Brand List</span>
//                   </Link>
//                   <h6 className="collapse-header">site Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddSite}>Add new Site </a>
//                   {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/sitelist">
//                     <span>Site List</span>
//                   </Link> */}
//                   <Link to="/sitelist" className="collapse-item" onClick={() => handleListClick("/sitelist")}>
//                     <span>Site List</span>
//                   </Link>
//                   <h6 className="collapse-header">Transporter Master:</h6>
//                   <a className="collapse-item" href="#" onClick={handleAddTransporterModal}>Add Transporter</a>
//                   <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/transporterlist">
//                     <span>Transporter List</span>
//                   </Link>
//                 </div>
//               </div>
//             </li>
//             {/* <!-- Nav Item - Client Master --> */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClient"
//                 aria-expanded="true" aria-controls="collapseClient">
//                 <i className="fas fa-users"></i>
//                 <span>Client Master</span>
//               </a>
//               <div id="collapseClient" className="collapse" aria-labelledby="headingClient" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Clients:</h6>
//                   <a className="collapse-item" onClick={handleAddClient}>Add new Client </a>
//                   {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/clientList" >
//                     <span>Client List</span>
//                   </Link> */}
//                   <Link to="/clientList" className="collapse-item" onClick={() => handleListClick("/clientList")}>
//                     <span>Client List</span>
//                   </Link>

//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total Setting */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsesetting"
//                 aria-expanded="true" aria-controls="collapsesetting">
//                 <i className="fa fa-cog"></i>
//                 <span>Setting master</span>
//               </a>
//               <div id="collapsesetting" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Setting:</h6>
//                   <Link className="collapse-item" onClick={() => handleListClick("/applicationsetting")} to="/applicationsetting" >
//                     <span>Application Setting</span>
//                   </Link>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total Setting */}
//             <li style={{ zIndex: "999" }} className="nav-item">
//               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReport"
//                 aria-expanded="true" aria-controls="collapseReport">
//                 <i className="fa fa-cog"></i>
//                 <span>Report Master</span>
//               </a>
//               <div id="collapseReport" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
//                 <div className="bg-white py-2 collapse-inner rounded">
//                   <h6 className="collapse-header">Report:</h6>
//                   <Link className="collapse-item" onClick={() => handleListClick("/allassetreport")} to="/allassetreport" >
//                     <span>All Asset Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/categoryreport")} to="/categoryreport" >
//                     <span>Category Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/vendorreport")} to="/vendorreport" >
//                     <span>Vendor Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/sitereport")} to="/sitereport" >
//                     <span>Site Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/employeereport")} to="/employeereport" >
//                     <span>Employee Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/clientreport")} to="/clientreport" >
//                     <span>Client Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/assetlostreport")} to="/assetlostreport" >
//                     <span>Asset Lost Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/insurancereport")} to="/insurancereport" >
//                     <span>Insurance Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/insuranceexpiryreport")} to="/insuranceexpiryreport" >
//                     <span>Insurance Expiry Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/maintenancereport")} to="/maintenancereport" >
//                     <span>Maintenance Report</span>
//                   </Link>
//                   <Link className="collapse-item" onClick={() => handleListClick("/brandreport")} to="/brandreport" >
//                     <span>Brand Report</span>
//                   </Link>
//                 </div>
//               </div>
//             </li>
//             {/* Nav Item - Total Delete */}
//             {/* <li style={{ zIndex: "999" }} className="nav-item">
//               <Link className="nav-link" to="/deletelist" onClick={() => handleListClick("/deletelist")}>
//                 <i className="fa fa-trash"></i>
//                 <span>Delete List</span>
//               </Link>
//             </li> */}
//             {/* <!-- Divider --> */}
//             <hr className="sidebar-divider d-none d-md-block" />
//           </ul>
//           <button style={{ border: "2px solid black", position: "absolute", left: "30px", top: "10px", zIndex: "999" }} id="sidebarToggleTop" className="btn btn-link d-md-none" onClick={changeStyle}>
//             <i className="fa fa-bars"></i>
//           </button>
//         </div>
//       </body>
//       {/* Add Modal Tables*/}
//       {isModalOpen && <AddDataModal onClose={handleCloseModal} onUpdate={handleUpdate} />}
//       {isAssetModalOpen && <AddAsset onClose={handleCloseAssetModal} onUpdate={handleUpdate} />}
//       {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} onUpdate={handleUpdate} />}
//       {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdate={handleUpdate} />}
//       {isCategoryModalOpen && <AddCategory onClose={handleCloseCategoryModal} onUpdate={handleUpdate} />}
//       {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} onUpdate={handleUpdate} />}
//       {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} onUpdate={handleUpdate} />}
//       {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} onUpdate={handleUpdate} />}
//       {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdate={handleUpdate} />}
//       {isHeadComponentModalOpen && <AddComponent onClose={handleCloseHeadComponentModal} onUpdate={handleUpdate} />}
//       {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdate={handleUpdate} />}
//       {isAddAssetInsuranceModalOpen && <AddInsuranceModal onClose={handleCloseAssetInsuranceModal} onUpdate={handleUpdate} />}
//       {isAddMaintenanceModalOpen && <AddMaintenanceData onClose={handleCloseMaintenanceModal} onUpdate={handleUpdate} />}
//       {isAddTransporterModalOpen && <AddTransporterModal onClose={handleCloseTransporterModal} onUpdate={handleUpdate} />}
//     </div>
//   );
// }

// export default Sidebar;





















































































import React, { useEffect, useState, } from "react";
import { Link, useLocation, Route, Routes, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import AddDataModal from "../../pages/AssetMaster/AddDataModal";
import AddEmployeeTable from "../../pages/EmployeeMaster/AddEmployeeTable";
import AddVendor from "../../pages/VendorMaster/AddVendor";
import AddCategory from "../../pages/CategoryMaster/AddCategory";
import AddSiteModal from "../../pages/SiteMaster/AddSiteModal";
import AddClientModal from "../../pages/ClientMaster/AddClientModal";
import AssetLost from "../../pages/AssetMaster/AssetLost";
import axios from "axios";
import AddBrandModal from "../../pages/BrandMaster/AddBrandModal";
import AddComponent from "../../pages/ComponentMaster/AddComponent";
import AddComponentList from "../../pages/ComponentMaster/AddComponentList";
import AddInsuranceModal from "../../pages/Insurance/AddAssetInsuranceModal";
import AddMaintenanceData from "../../pages/AssetMaster/AddMaintenanceData";
import AddAsset from "../../pages/AssetMaster/AddAsset";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTransporterModal from "../../pages/Transport/AddTransporterModal";
import logo from '../../images/Logo/logo.png';  //logo
// list import  
import myLogo from '../../images/Asset.jpg';
import footerLogo from '../../images/AssetTrans.png';



function Sidebar() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  // Add Request Leave 
  const [dashboardLogo, setDashboardLogo] = useState([]);
  // Form Modal open 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false); // State to manage modal open/close
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isHeadComponentModalOpen, setIsHeadComponentModalOpen] = useState(false);
  const [isAddComponentListModalOpen, setIsAddComponentListModalOpen] = useState(false);
  const [isAddAssetInsuranceModalOpen, setIsAddAssetInsuranceModalOpen] = useState(false);
  const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
  const [isAddTransporterModalOpen, setIsAddTransporterModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Place the hook outside of the component

  useEffect(() => {
    // Check screen size and set initial sidebar state
    if (window.innerWidth <= 768) {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }

    const fetchDashboardLogo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
        setDashboardLogo(response.data);
      } catch (error) {
        console.error('Error fetching Dashboard Logo', error);
      }
    };

    fetchDashboardLogo();
  }, []);

  const changeStyle = () => {
    if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  // Handle Update 
  const handleUpdate = () => {
    toast.success("successfully uploaded");
    // window.location.reload();
  };

  const handleListClick = (path) => {
    if (window.location.pathname === path) {
      window.location.reload();
    }
  };

  // Handle 
  const handleAddAsset = () => {
    setIsModalOpen(true); // Open the modal when "Add new Asset" button is clicked
  };
  // const handleAddAsset = (event) => {
  //   event.preventDefault(); // Prevent default behavior of the anchor tag
  //   navigate("/assetlist"); // Navigate to the asset list page
  //   setIsModalOpen(true); // Open the modal
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleAddEmployee = () => {
    setIsEmployeeModalOpen(true);
  };

  const handleAddVendor = () => {
    setIsVendorModalOpen(true);
  };

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
  };

  const handleCloseVendorModal = () => {
    setIsVendorModalOpen(false);
  };

  // clientmodal 

  const handleAddClient = () => {
    setIsAddClientModalOpen(true);
  };

  const handleCloseClientModal = () => {
    setIsAddClientModalOpen(false);
  };

  // Asset Lost 

  const handleAddAssetLost = () => {
    setIsAddAssetLostModalOpen(true);
  };

  const handleCloseAssetLostModal = () => {
    setIsAddAssetLostModalOpen(false);
  };

  // site Modal 

  const handleAddSite = () => {
    setIsAddSiteModalOpen(true)
  };

  const handleCloseSiteModal = () => {
    setIsAddSiteModalOpen(false);
  };

  // Brand  Modal 

  const handleAddBrand = () => {
    setIsAddBrandModalOpen(true);
  };

  const handleCloseBrandModal = () => {
    setIsAddBrandModalOpen(false);
  };

  // Head Component Modal 

  const handleAddHeadComponent = () => {
    setIsHeadComponentModalOpen(true);
  };

  const handleCloseHeadComponentModal = () => {
    setIsHeadComponentModalOpen(false);
  };

  // Component List Modal 

  const handleAddComponentListModal = () => {
    setIsAddComponentListModalOpen(true);
  };

  const handleCloseComponentListModal = () => {
    setIsAddComponentListModalOpen(false);
  };

  // Asset Insurence Modal 

  const handleAddAssetInsuranceModal = () => {
    setIsAddAssetInsuranceModalOpen(true);
  };

  const handleCloseAssetInsuranceModal = () => {
    setIsAddAssetInsuranceModalOpen(false);
  };
  // Asser Maintenance Modal 

  const handleAddAssetMaintenanceModal = () => {
    setIsAddMaintenanceModalOpen(true);
  };

  const handleCloseMaintenanceModal = () => {
    setIsAddMaintenanceModalOpen(false);
  };
  // Asser Maintenance Modal 

  const handleAddTransporterModal = () => {
    setIsAddTransporterModalOpen(true);
  };

  const handleCloseTransporterModal = () => {
    setIsAddTransporterModalOpen(false);
  };

  // Add Asset Modal 

  const handleAddAssetModal = () => {
    setIsAssetModalOpen(true);
  };

  const handleCloseAssetModal = () => {
    setIsAssetModalOpen(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <body style={{ }} className={style} id="accordionSidebar">
        {/*  <!-- Sidebar --> */}
        <div style={{ height: "100%" }} className="d-flex flex-column">
          <ul className="p-0">
            {/*  <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center gap-2 px-3 py-1" href="#">
              <div className="sidebar-brand-text" style={{ width: "100%", height: "100%" }}>
                <div className='logoo'>
                  <img
                    src={dashboardLogo.landingPageLogo
                      ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`
                      : myLogo}
                    className="img-logo"
                  />
                </div>
              </div>
              <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
              </div>
            </a>
            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />
            {/*  <!-- Nav Item - Dashboard --> */}
            <li style={{ zIndex: "999" }} className="nav-item active">
              <Link to="/dashboard" className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Heading --> */}
            {/*  <!-- Nav Item - Pages Collapse Menu --> */}
              {/* <!-- Nav Item - Asset Master --> */}
              <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAsset"
                aria-expanded="true" aria-controls="collapseAsset">
                <i className="fas fa-users"></i>
                <span>Asset Master</span>
              </a>
              <div id="collapseAsset" className="collapse" aria-labelledby="headingAsset" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Assets:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetModal}>Add Asset master</a>
                  <Link to="/assetmasterlist" className="collapse-item"><span>Asset Master List</span></Link>
                  <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
                  <Link to="/assetlist" className="collapse-item" onClick={() => handleListClick("/assetlist")}>
                    <span>Asset List</span>
                  </Link>
                  {/* <Link to="/assetlist" className="collapse-item"><span>Asset List</span></Link> */}
                  <Link to="/assettransfer" className="collapse-item"><span>Asset Transfer</span></Link>
                  {/* <a className="collapse-item" href="#">Transfer Asset</a> */}
                  <h6 className="collapse-header">Asset on Maintenance:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetMaintenanceModal}>Add new Maintenance</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/assetMaintenance")} to="/assetMaintenance" ><span>Asset Maintenance</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/finishedmaintenance")} to="/finishedmaintenance" ><span>Finished Maintenance</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/UnfinishedMaintenance")} to="/UnfinishedMaintenance" ><span>Unfinished Maintenance</span>
                  </Link>
                  <h6 className="collapse-header">Asset on Insurance:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetInsuranceModal}>Add Insurance</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/AssetInsurance")} to="/AssetInsurance" >
                    <span>Asset Insurance</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/assetinsurenceexpiry")} to="/assetinsurenceexpiry" >
                    <span>Insurance Expiry</span>
                  </Link>
                  <h6 className="collapse-header">Asset Lost:</h6>
                  <a className="collapse-item" onClick={handleAddAssetLost}>
                    Add Asset Lost
                  </a>
                  <Link className="collapse-item" onClick={() => handleListClick("/assetlostlist")} to="/assetlostlist" >
                    <span>Asset Lost List</span>
                  </Link>
                  {/* <a className="collapse-item" href="#">
                    Asset Hold
                  </a> */}
                </div>
              </div>
            </li>
            {/* Nav Item - Total Component */}
            <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecomponent"
                aria-expanded="true" aria-controls="collapsecomponent">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Component master</span>
              </a>
              <div id="collapsecomponent" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Component:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddHeadComponent}>Add Head Component</a>
                  <a className="collapse-item" href="#" onClick={handleAddComponentListModal}>Add Component List</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/componentlist")} to="/componentlist" >
                    <span>Head Component List</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/fullcomponentList")} to="/fullcomponentList">
                    <span>Full Component List</span>
                  </Link>
                </div>
              </div>
            </li>
            {/* <!-- Nav Item - All Master --> */}
            <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMaster"
                aria-expanded="true" aria-controls="collapseMaster">
                <i className="fas fa-users"></i>
                <span>All Masters</span>
              </a>
              <div id="collapseMaster" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  {/* <h6  className="collapse-header">Asset Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
                  <Link to="/assetlist" className="collapse-item"><span>Asset List</span></Link> */}
                  <h6 className="collapse-header">Employees:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee </a>
                  {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/Employeelist" >
                    <span>Employee List</span>
                  </Link> */}
                  <Link to="/Employeelist" className="collapse-item" onClick={() => handleListClick("/Employeelist")}>
                    <span>Employee List</span>
                  </Link>
                  <h6 className="collapse-header">Category Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/categoryList")} to="/categoryList" >
                    <span>Category List</span>
                  </Link>
                  <h6 className="collapse-header">Vendor Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor </a>
                  <Link to="/vendorlist" className="collapse-item" onClick={() => handleListClick("/vendorlist")}>
                    <span>Vendor List</span>
                  </Link>
                  {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/vendorlist">
                    <span>Vendor List</span>
                  </Link> */}
                  <h6 className="collapse-header">Brand Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddBrand}>Add new Brand</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/brandlist")} to="/brandlist">
                    <span>Brand List</span>
                  </Link>
                  <h6 className="collapse-header">site Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddSite}>Add new Site </a>
                  {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/sitelist">
                    <span>Site List</span>
                  </Link> */}
                  <Link to="/sitelist" className="collapse-item" onClick={() => handleListClick("/sitelist")}>
                    <span>Site List</span>
                  </Link>
                  <h6 className="collapse-header">Transporter Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddTransporterModal}>Add Transporter</a>
                  <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/transporterlist">
                    <span>Transporter List</span>
                  </Link>
                </div>
              </div>
            </li>
            {/* <!-- Nav Item - Client Master --> */}
            <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClient"
                aria-expanded="true" aria-controls="collapseClient">
                <i className="fas fa-users"></i>
                <span>Client Master</span>
              </a>
              <div id="collapseClient" className="collapse" aria-labelledby="headingClient" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Clients:</h6>
                  <a className="collapse-item" onClick={handleAddClient}>Add new Client </a>
                  {/* <Link className="collapse-item" onClick={() => handleListClick("/requestleavelist")} to="/clientList" >
                    <span>Client List</span>
                  </Link> */}
                  <Link to="/clientList" className="collapse-item" onClick={() => handleListClick("/clientList")}>
                    <span>Client List</span>
                  </Link>

                </div>
              </div>
            </li>
            {/* Nav Item - Total Setting */}
            <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsesetting"
                aria-expanded="true" aria-controls="collapsesetting">
                <i className="fa fa-cog"></i>
                <span>Setting master</span>
              </a>
              <div id="collapsesetting" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Setting:</h6>
                  <Link className="collapse-item" onClick={() => handleListClick("/applicationsetting")} to="/applicationsetting" >
                    <span>Application Setting</span>
                  </Link>
                </div>
              </div>
            </li>
            {/* Nav Item - Total Setting */}
            <li style={{ zIndex: "999" }} className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReport"
                aria-expanded="true" aria-controls="collapseReport">
                <i className="fa fa-cog"></i>
                <span>Report Master</span>
              </a>
              <div id="collapseReport" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Report:</h6>
                  <Link className="collapse-item" onClick={() => handleListClick("/allassetreport")} to="/allassetreport" >
                    <span>All Asset Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/categoryreport")} to="/categoryreport" >
                    <span>Category Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/vendorreport")} to="/vendorreport" >
                    <span>Vendor Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/sitereport")} to="/sitereport" >
                    <span>Site Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/employeereport")} to="/employeereport" >
                    <span>Employee Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/clientreport")} to="/clientreport" >
                    <span>Client Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/assetlostreport")} to="/assetlostreport" >
                    <span>Asset Lost Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/insurancereport")} to="/insurancereport" >
                    <span>Insurance Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/insuranceexpiryreport")} to="/insuranceexpiryreport" >
                    <span>Insurance Expiry Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/maintenancereport")} to="/maintenancereport" >
                    <span>Maintenance Report</span>
                  </Link>
                  <Link className="collapse-item" onClick={() => handleListClick("/brandreport")} to="/brandreport" >
                    <span>Brand Report</span>
                  </Link>
                </div>
              </div>
            </li>


            <hr className="sidebar-divider d-none d-md-block" />
          </ul>
        </div>
        <div className="footer p-1 d-flex align-items-center justify-content-center flex-column">
          <div className='sidebar-footer'>
            <img
              src={footerLogo}
              className="img-logo"
            />
          </div>
          <p style={{ fontSize: "10px" }} className="text-center m-0 p-0 text-white">Version 1.0 &copy; Developed by Prospect Digital</p>
        </div>
        <button style={{ border: "2px solid black", position: "absolute", left: "30px", top: "10px", zIndex: "999" }} id="sidebarToggleTop" className="btn btn-link d-md-none" onClick={changeStyle}>
          <i className="fa fa-bars"></i>
        </button>
      </body>
      {/* Add Modal Tables*/}
      {isModalOpen && <AddDataModal onClose={handleCloseModal} onUpdate={handleUpdate} />}
      {isAssetModalOpen && <AddAsset onClose={handleCloseAssetModal} onUpdate={handleUpdate} />}
      {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} onUpdate={handleUpdate} />}
      {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdate={handleUpdate} />}
      {isCategoryModalOpen && <AddCategory onClose={handleCloseCategoryModal} onUpdate={handleUpdate} />}
      {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} onUpdate={handleUpdate} />}
      {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} onUpdate={handleUpdate} />}
      {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} onUpdate={handleUpdate} />}
      {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdate={handleUpdate} />}
      {isHeadComponentModalOpen && <AddComponent onClose={handleCloseHeadComponentModal} onUpdate={handleUpdate} />}
      {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdate={handleUpdate} />}
      {isAddAssetInsuranceModalOpen && <AddInsuranceModal onClose={handleCloseAssetInsuranceModal} onUpdate={handleUpdate} />}
      {isAddMaintenanceModalOpen && <AddMaintenanceData onClose={handleCloseMaintenanceModal} onUpdate={handleUpdate} />}
      {isAddTransporterModalOpen && <AddTransporterModal onClose={handleCloseTransporterModal} onUpdate={handleUpdate} />}
    </div>
  )
}

export default Sidebar;



