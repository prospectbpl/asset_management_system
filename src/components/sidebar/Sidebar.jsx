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
import AddInsuranceModal from "../../pages/AssetMaster/AddAssetInsuranceModal";
import AddMaintenanceData from "../../pages/AssetMaster/AddMaintenanceData";
import AddAsset from "../../pages/AssetMaster/AddAsset";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTransporterModal from "../../pages/AssetMaster/AddTransporterModal";
// list import  

// import { Dashboard } from "@mui/icons-material";

function Sidebar({ handleLogout }) {
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
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const navigate = useNavigate(); // Place the hook outside of the component


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

  const handleListClick = (path) => {
    if (window.location.pathname === path) {
      window.location.reload();
    }
  };

  const [dashboardLogo, setDashboardLogo] = useState([]);

  useEffect(() => {
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

  const handleUpdate=()=>{
    toast.success("successfully uploaded");
  }

  return (
    <div  >
      <div id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <ToastContainer/>
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <ul style={{ width: "50%" }} className={style} id="accordionSidebar">
            {/*  <!-- Sidebar - Brand --> */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="#"
            >
              <div className="sidebar-brand-icon rotate-n-15"></div>
              <div className="sidebar-brand-text mx-3">
                {/* Prospect Digital */}
                <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo.landingPageLogo}`} style={{ width: "120px" }} alt="LOGO" />
              </div>
              <div className="text-center d-none d-md-inline">
                <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={changeStyle}
                ></button>
              </div>
            </a>

            {/*   <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/*  <!-- Nav Item - Dashboard --> */}

            <li className="nav-item active">
              <Link to="/dashboard" className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            {/*  <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/*   <!-- Heading --> */}
            <div className="sidebar-heading">Interface</div>

            {/* <!-- Nav Item - Asset Master --> */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAsset"
                aria-expanded="true" aria-controls="collapseAsset">

                <i className="fas fa-users"></i>
                <span>Asset Master</span>
              </a>
              <div id="collapseAsset" className="collapse" aria-labelledby="headingAsset" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Assets:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetModal}>Add Asset master</a>
                  <Link to="/assetmasterlist" className="collapse-item"><span>Asset Master List</span></Link>
                  <a className="collapse-item" href="#" onClick={handleAddAsset}>Add new Asset</a>
                  <Link to="/assetlist" className="collapse-item" onClick={() => handleListClick("/assetlist")}>
                    <span>Asset List</span>
                  </Link>
                  {/* <Link to="/assetlist" className="collapse-item"><span>Asset List</span></Link> */}
                  <Link to="/assettransfer" className="collapse-item"><span>Asset Transfer</span></Link>
                  {/* <a className="collapse-item" href="#">Transfer Asset</a> */}
                  <h6  className="collapse-header">Asset on Maintenance:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetMaintenanceModal}>Add new Maintenance</a>
                  <Link className="collapse-item" to="/assetMaintenance" ><span>Asset Maintenance</span>
                  </Link>
                  <Link className="collapse-item" to="/finishedmaintenance" ><span>Finished Maintenance</span>
                  </Link>
                  <Link className="collapse-item" to="/UnfinishedMaintenance" ><span>Unfinished Maintenance</span>
                  </Link>
                  <h6  className="collapse-header">Asset on Insurance:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetInsuranceModal}>Add Insurance</a>
                  <Link className="collapse-item" to="/AssetInsurance" >
                    <span>Asset Insurance</span>
                  </Link>
                  <h6  className="collapse-header">Asset Lost:</h6>
                  <a className="collapse-item" onClick={handleAddAssetLost}>
                    Add Asset Lost
                  </a>
                  <Link className="collapse-item" to="/assetlostlist" >
                    <span>Asset Lost List</span>
                  </Link>
                  {/* <a className="collapse-item" href="#">
                    Asset Hold
                  </a> */}
                </div>
              </div>
            </li>
            {/* Nav Item - Total Component */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecomponent"
                aria-expanded="true" aria-controls="collapsecomponent">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Component master</span>
              </a>
              <div id="collapsecomponent" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Component:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddHeadComponent}>Add Head Component</a>
                  <a className="collapse-item" href="#" onClick={handleAddComponentListModal}>Add Component List</a>
                  <Link className="collapse-item" to="/componentlist" >
                    <span>Head Component List</span>
                  </Link>
                  <Link className="collapse-item" to="/fullcomponentList">
                    <span>Full Component List</span>
                  </Link>
                </div>
              </div>
            </li>
            {/* <!-- Nav Item - All Master --> */}
            <li className="nav-item">
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
                  <h6  className="collapse-header">Employees:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee </a>
                  {/* <Link className="collapse-item" to="/Employeelist" >
                    <span>Employee List</span>
                  </Link> */}
                  <Link to="/Employeelist" className="collapse-item" onClick={() => handleListClick("/Employeelist")}>
                    <span>Employee List</span>
                  </Link>
                  <h6  className="collapse-header">Category Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category</a>
                  <Link className="collapse-item" to="/categoryList" >
                    <span>Category List</span>
                  </Link>
                  <h6  className="collapse-header">Vendor Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor </a>
                  <Link to="/vendorlist" className="collapse-item" onClick={() => handleListClick("/vendorlist")}>
                    <span>Vendor List</span>
                  </Link>
                  {/* <Link className="collapse-item" to="/vendorlist">
                    <span>Vendor List</span>
                  </Link> */}
                  <h6  className="collapse-header">Brand Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddBrand}>Add new Brand</a>
                  <Link className="collapse-item" to="/brandlist">
                    <span>Brand List</span>
                  </Link>
                  <h6  className="collapse-header">site Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddSite}>Add new Site </a>
                  {/* <Link className="collapse-item" to="/sitelist">
                    <span>Site List</span>
                  </Link> */}
                  <Link to="/sitelist" className="collapse-item" onClick={() => handleListClick("/sitelist")}>
                    <span>Site List</span>
                  </Link>
                  <h6  className="collapse-header">Transporter Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddTransporterModal}>Add Transporter</a>
                  <Link className="collapse-item" to="/transporterlist">
                    <span>Transporter List</span>
                  </Link>
                  {/* <h6  className="collapse-header">Employee Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee </a>
                  <Link className="collapse-item" to="/Employeelist" >
                    <span>Employee List</span>
                  </Link>
                  <h6  className="collapse-header">Client Master:</h6>
                  <a className="collapse-item" onClick={handleAddClient}>Add new Client </a>
                  <Link className="collapse-item" to="/clientList" >
                    <span>Client List</span>
                  </Link>
                  <h6  className="collapse-header">Component Master:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddHeadComponent}>Add Head Component</a>
                  <a className="collapse-item" href="#" onClick={handleAddComponentListModal}>Add Component List</a>
                  <Link className="collapse-item" to="/componentlist" >
                    <span>Component List</span>
                  </Link>
                  <Link className="collapse-item" to="/fullcomponentList">
                    <span>Full Component List</span>
                  </Link>
                  <h6  className="collapse-header">Asset Insurence:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetInsuranceModal}>Add Insurance</a>
                  <Link className="collapse-item" to="/AssetInsurance" >
                    <span>Asset Insurance</span>
                  </Link>
                  <h6  className="collapse-header">Asset Maintenance:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddAssetMaintenanceModal}>Add new Maintenance</a>
                  <Link className="collapse-item" to="/assetMaintenance" ><span>Asset Maintenance</span>
                  </Link>
                  <Link className="collapse-item" to="/finishedmaintenance" ><span>Finished Maintenance</span>
                  </Link>
                  <Link className="collapse-item" to="/UnfinishedMaintenance" ><span>Unfinished Maintenance</span>
                  </Link> */}
                </div>
              </div>
            </li>
            {/* <!-- Nav Item - Employee --> */}
            {/* <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseEmployee"
                aria-expanded="true" aria-controls="collapseEmployee">

                <i className="fas fa-users"></i>
                <span>Employee</span>
              </a>
              <div id="collapseEmployee" className="collapse" aria-labelledby="headingEmployee" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Employees:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddEmployee} >Add new Employee </a>
                  <Link className="collapse-item" to="/Employeelist" >
                    <span>Employee List</span>
                  </Link>
                </div>
              </div>
            </li> */}
            {/* Nav Item - vendor Master */}
            {/* <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsevendor"
                aria-expanded="true" aria-controls="collapsevendor">
                <i className="fa fa-industry"></i>
                <span>vendor master</span>
              </a>
              <div id="collapsevendor" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">vendors:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddVendor}>Add new vendor </a>
                  <Link className="collapse-item" to="/vendorlist">
                    <span>Vendor List</span>
                  </Link>
                </div>
              </div>
            </li> */}
            {/* <!-- Nav Item - Client Master --> */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseClient"
                aria-expanded="true" aria-controls="collapseClient">
                <i className="fas fa-users"></i>
                <span>Client Master</span>
              </a>
              <div id="collapseClient" className="collapse" aria-labelledby="headingClient" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Clients:</h6>
                  <a className="collapse-item" onClick={handleAddClient}>Add new Client </a>
                  {/* <Link className="collapse-item" to="/clientList" >
                    <span>Client List</span>
                  </Link> */}
                  <Link to="/clientList" className="collapse-item" onClick={() => handleListClick("/clientList")}>
                    <span>Client List</span>
                  </Link>

                </div>
              </div>
            </li>
            {/*  <!-- Nav Item - Site Master --> */}
            {/* <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSite"
                aria-expanded="true" aria-controls="collapseSite">
                <i className="fas fa-users"></i>
                <span>Site Master</span>
              </a>
              <div id="collapseSite" className="collapse" aria-labelledby="headingSite" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Sites:</h6>
                  <a className="collapse-item" onClick={handleAddSite}>Add new Site </a>
                  <Link className="collapse-item" to="/sitelist">
                    <span>Site List</span>
                  </Link>

                </div>
              </div>
            </li> */}
            {/* Nav Item - Brand Master */}
            {/* <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsebrand"
                aria-expanded="true" aria-controls="collapsebrand">
                <i className="fa fa-industry"></i>
                <span>Brand master</span>
              </a>
              <div id="collapsebrand" className="collapse" aria-labelledby="headingvendor" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Brand:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddBrand}>Add new Brand</a>
                  <Link className="collapse-item" to="/brandlist">
                    <span>Brand List</span>
                  </Link>
                </div>
              </div>
            </li> */}
            {/* Nav Item - Category Master */}
            {/* <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsecategory"
                aria-expanded="true" aria-controls="collapsecategory">
                <i className="fa fa-list-alt"></i>
                <span>Category master</span>
              </a>
              <div id="collapsecategory" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Category:</h6>
                  <a className="collapse-item" href="#" onClick={handleAddCategory}>Add new category</a>
                  <Link className="collapse-item" to="/categoryList" >
                    <span>Category List</span>
                  </Link>
                </div>
              </div>
            </li> */}
            {/* Nav Item - Total Setting */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsesetting"
                aria-expanded="true" aria-controls="collapsesetting">
                <i className="fa fa-cog"></i>
                <span>Setting master</span>
              </a>
              <div id="collapsesetting" className="collapse" aria-labelledby="headingcategory" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6  className="collapse-header">Setting:</h6>
                  <Link className="collapse-item" to="/applicationsetting" >
                    <span>Application Setting</span>
                  </Link>
                </div>
              </div>
            </li>
            {/* Nav Item - Total Delete */}
            <li className="nav-item">
              <Link className="nav-link" to="/deletelist" >
                <i className="fa fa-trash"></i>
                <span>Delete List</span>
              </Link>
            </li>
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />
          </ul>
        </div>
      </div>
      {/* Add Modal Tables*/}
      {isModalOpen && <AddDataModal onClose={handleCloseModal} onUpdateAssets={handleUpdate} />}
      {isAssetModalOpen && <AddAsset onClose={handleCloseAssetModal} onUpdate={handleUpdate}/>}
      {isEmployeeModalOpen && <AddEmployeeTable onClose={handleCloseEmployeeModal} onUpdateEmployees={handleUpdate} />}
      {isVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdateVendors={handleUpdate}/>}
      {isCategoryModalOpen && <AddCategory onClose={handleCloseCategoryModal} onUpdateCategories={handleUpdate} />}
      {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} onUpdateClients={handleUpdate} />}
      {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} onUpdateClients={handleUpdate} />}
      {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} onUpdateAssetLosts={handleUpdate} />}
      {isAddBrandModalOpen && <AddBrandModal onClose={handleCloseBrandModal} onUpdateBrands={handleUpdate}/>}
      {isHeadComponentModalOpen && <AddComponent onClose={handleCloseHeadComponentModal} onUpdateComponents={handleUpdate} />}
      {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdateComponents={handleUpdate} />}
      {isAddAssetInsuranceModalOpen && <AddInsuranceModal onClose={handleCloseAssetInsuranceModal} onUpdateInsurances={handleUpdate} />}
      {isAddMaintenanceModalOpen && <AddMaintenanceData onClose={handleCloseMaintenanceModal} onUpdateMaintenances={handleUpdate} />}
      {isAddTransporterModalOpen && <AddTransporterModal onClose={handleCloseTransporterModal} onUpdateTransporters={handleUpdate} />}
    </div>
  );
}

export default Sidebar;
