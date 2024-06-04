// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SitePopUp from "../AssetMaster/SitePopUp";
// import EmployeePopUp from "../AssetMaster/EmployeePopUp"; // Import the EmployeePopUp component
// import ClientPopUp from "../AssetMaster/ClientPopUp"; // Import the ClientPopUp component
// import EditAssetModal from "../AssetMaster/EditAssetModal";

// // Define the AssetDesc component
// const AssetDesc = ({ asset, onClose }) => {
//     // State to store the check-in/check-out history of the asset
//     const [history, setHistory] = useState([]);
//     const [maintenance, setMaintenance] = useState([]);
//     const [insurence, setInsurence] = useState([]);
//     const [insurenceHistory, setInsurenceHistory] = useState([]);
//     const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
//     const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//     const [isClientModalOpen, setIsClientModalOpen] = useState(false);
//     const [selectedAction, setSelectedAction] = useState(null);
//     // State variables for selected site id, employee id, client id, and description
//     const [selectedSiteId, setSelectedSiteId] = useState(null);
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
//     const [selectedClientId, setSelectedClientId] = useState(null);
//     const [selectedDescription, setSelectedDescription] = useState(null);
//     // Edit Asset Modal 
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal


//     // Function to fetch the check-in/check-out history for the asset
//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/checkincheckout/history/${asset.asset_master_id}`);
//             setHistory(response.data);
//         } catch (error) {
//             console.error("Error fetching history:", error);
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     // Function to format the date from '2024-02-29T18:30:00.000Z' to '2024-02-29'
//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit'
//         });
//     };


//     // Function to fetch maintenance details for the asset
//     const fetchMaintenance = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/maintenance/history/${asset.id}`);
//             setMaintenance(response.data);
//         } catch (error) {
//             console.error("Error fetching maintenance details:", error);
//         }
//     };

//     // Fetch maintenance details when the component mounts
//     useEffect(() => {
//         fetchMaintenance();
//     }, []);

//     // Function to fetch insurence details for the asset
//     const fetchInsurence = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurence/history/${asset.id}`);
//             setInsurence(response.data);
//         } catch (error) {
//             console.error("Error fetching Insurence details:", error);
//         }
//     };
//     // Fetch insurence history details when the component mounts
//     useEffect(() => {
//         fetchInsurence();
//     }, []);

//     // Function to fetch insurence history details for the asset
//     const fetchInsurenceHistory = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurenceHistory/history/${asset.id}`);
//             setInsurenceHistory(response.data);
//         } catch (error) {
//             console.error("Error fetching Insurence details:", error);
//         }
//     };

//     // Fetch insurence history details when the component mounts
//     useEffect(() => {
//         fetchInsurenceHistory();
//     }, []);

//     const processFetchedData = (data) => {
//         const groupedData = {};
//         data.forEach((item) => {
//             const assetID = item.asset_id;
//             if (!groupedData[assetID]) {
//                 groupedData[assetID] = { assetName: item.assetName, previousData: [], newData: [] };
//             }
//             if (item.previousData) {
//                 groupedData[assetID].previousData.push(JSON.parse(item.previousData));
//             }
//             if (item.newData) {
//                 groupedData[assetID].newData.push(JSON.parse(item.newData));
//             }
//         });
//         return Object.values(groupedData);
//     };
//     console.log(processFetchedData);



//     // Function to render description or dash based on event type
//     const renderDescriptionOrDash = (event) => {
//         if (event.event_type === 'check_in') {
//             return event.asset_description;
//         } else {
//             return '-';
//         }
//     };

//     // Function to handle opening the modal
//     const siteOpenModal = (action, siteId, employeeId, clientId, description) => {
//         setSelectedAction(action);
//         setSelectedSiteId(siteId);
//         setSelectedEmployeeId(employeeId);
//         setSelectedClientId(clientId);
//         setSelectedDescription(description);

//         if (clientId) {
//             setIsClientModalOpen(true);
//         } else if (employeeId) {
//             setIsEmployeeModalOpen(true);
//         } else if (siteId) {
//             setIsSiteModalOpen(true);
//         }
//     };

//     // Function to handle closing the modal
//     const siteCloseModal = () => {
//         setIsSiteModalOpen(false);
//     };
//     const employeeCloseModal = () => {
//         setIsEmployeeModalOpen(false);
//     };
//     const clientCloseModal = () => {
//         setIsClientModalOpen(false);
//     };

//     // Function to handle opening the edit modal
//     const handleEditAsset = () => {
//         setIsEditModalOpen(true);
//     };

//     // Function to handle closing the edit modal
//     const handleCloseEditModal = () => {
//         setIsEditModalOpen(false);
//     };

//     return (
//         <div>
//             <div className="card-body p-4">
//                 {/* Asset Details Section */}
//                 <div className="row">
//                     <div className="col-md-9 d-flex flex-column gap-3">
//                         {/* Asset Name and Tag */}
//                         <input type="hidden" value="1" name="id" id="id" />
//                         <h4 className="title-detail font-bold">
//                             <span className="assetname">Asset Name - {asset.name}</span>
//                         </h4>
//                         {/* Asset Type and Status */}
//                         <h5 className="assetdetail">
//                             <span className="assettag">Asset Tag - {asset.assettag} </span>
//                             <span className="assetstatus"> {asset.currentStatus} </span>
//                         </h5>
//                     </div>

//                     {/* Back Button Section */}
//                     <div className="col-md-3">
//                         <div className=" p-2 barcode-inner">
//                             <div className="assetbarcode d-flex gap-2">
//                                 <button onClick={onClose} className="btn btn-primary">
//                                     Back to Asset List
//                                 </button>
//                                 <button onClick={handleEditAsset} className="btn btn-primary"> {/* Add onClick handler to open the edit modal */}
//                                     Edit Asset
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs Section */}
//                 <div className="row pt-4">
//                     <div className="col-md-12">
//                         <ul className="nav nav-tabs" id="myTab" role="tablist">
//                             {/* Details Tab */}
//                             <li className="nav-item">
//                                 <a
//                                     className="nav-link active show"
//                                     id="details-tab"
//                                     data-toggle="tab"
//                                     href="#details"
//                                     role="tab"
//                                     aria-controls="details"
//                                     aria-selected="true"
//                                 >
//                                     Details
//                                 </a>
//                             </li>
//                             {/* History Tab */}
//                             <li className="nav-item">
//                                 <a
//                                     className="nav-link"
//                                     id="history-tab"
//                                     data-toggle="tab"
//                                     href="#history"
//                                     role="tab"
//                                     aria-controls="history"
//                                     aria-selected="false"
//                                 >
//                                     History
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a
//                                     className="nav-link"
//                                     id="maintenance-tab"
//                                     data-toggle="tab"
//                                     href="#maintenance"
//                                     role="tab"
//                                     aria-controls="maintenance"
//                                     aria-selected="false"
//                                 >
//                                     Maintenance
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a
//                                     className="nav-link"
//                                     id="insurence-tab"
//                                     data-toggle="tab"
//                                     href="#insurence"
//                                     role="tab"
//                                     aria-controls="insurence"
//                                     aria-selected="false"
//                                 >
//                                     Insurence
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a
//                                     className="nav-link"
//                                     id="insurenceHistory-tab"
//                                     data-toggle="tab"
//                                     href="#insurenceHistory"
//                                     role="tab"
//                                     aria-controls="insurenceHistory"
//                                     aria-selected="false"
//                                 >
//                                     Insurence history
//                                 </a>
//                             </li>
//                         </ul>

//                         {/* Tab Content Section */}
//                         <div className="tab-content" id="myTabContent">
//                             {/* Details Tab Content */}
//                             <div
//                                 className="tab-pane fade active show"
//                                 id="details"
//                                 role="tabpanel"
//                                 aria-labelledby="details-tab"
//                             >
//                                 {/* Asset Details */}
//                                 <div class="row">
//                                     <div class="col-md-9 ">
//                                         {/* Table for Asset Details */}
//                                         <table
//                                             class="table table-hover"
//                                             cellpadding="0"
//                                             cellspacing="0"
//                                         >
//                                             <tbody>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Asset Name:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assettype2">{asset.name}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Asset Tag:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assettype2">{asset.assettag}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Type:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assettype2">{asset.assetType}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Status:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetstatus">
//                                                             {asset.currentStatus}
//                                                         </p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Serial:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetserial">{asset.serial}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Brand:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetbrand">{asset.brand}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Purchase date:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetpurchasedate">
//                                                         {formatDate(asset.purchaseDate)}
//                                                         </p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Cost:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetcost">{asset.cost}</p>
//                                                     </td>
//                                                 </tr>

//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Location:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetlocation">{asset.location}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Vendor Name:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetsupplier">{asset.vendorcompanyname}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Created at:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetupdated">{formatDate(asset.created_at)}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">RTO Name:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetupdated">{asset.rtoName}</p>
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Registration Number:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetupdated">{asset.registrationNumber}</p>
//                                                     </td>
//                                                 </tr>

//                                                 <tr>
//                                                     <td bgcolor="#f2f3f4" width="200">
//                                                         <p class="mb-0 font-bold">Description:</p>
//                                                     </td>
//                                                     <td>
//                                                         <p class="mb-0 assetdescription">
//                                                             {asset.description}
//                                                         </p>
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     {/* Image Section */}
//                                     <div class="col-md-3 pt-2 text-center">
//                                         <img
//                                             src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
//                                             style={{ width: "200px" }}
//                                             alt="Asset"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* History Tab Content */}
//                             <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Asset Name</th>
//                                             <th>Date</th>
//                                             <th>Event Type</th>
//                                             <th>Employee</th>
//                                             <th>Description</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {history.map((event) => (
//                                             <tr key={event.event_id}>
//                                                 <td>{asset.name}</td>
//                                                 <td>{event.event_type === 'check_in' ? formatDate(event.checkin_date) || '-' : formatDate(event.checkout_date) || '-'}</td>
//                                                 <td>{event.event_type} </td>
//                                                 <td>{event.event_type === 'check_in' ? event.checkin_by || '-' : event.checkout_to || '-'} {<span onClick={() => siteOpenModal(event.event_type, event.site_id, event.employee_id, event.client_id, event.asset_description)}>...</span>}</td>
//                                                 <td>{renderDescriptionOrDash(event)}</td>
//                                                 <td>
//                                                     <button onClick={() => siteOpenModal(event.event_type, event.site_id, event.employee_id, event.client_id, event.asset_description)}>...</button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Maintenance Tab Content */}
//                             <div className="tab-pane fade" id="maintenance" role="tabpanel" aria-labelledby="maintenance-tab">
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Asset photo</th>
//                                             <th>Asset Name</th>
//                                             <th>Asset Tag</th>
//                                             <th>Service Type</th>
//                                             <th>Provider Name</th>
//                                             <th>Start Date</th>
//                                             <th>End Date</th>
//                                             <th>Remark</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {maintenance.map((event) => (
//                                             <tr key={event.event_id}>
//                                                 <td> <img
//                                                     src={event.assetPhoto}
//                                                     style={{ width: "90px" }}
//                                                     alt="Asset"
//                                                 /></td>
//                                                 <td>{event.assetName}</td>
//                                                 <td>{event.assetTag}</td>
//                                                 <td>{event.serviceType}</td>
//                                                 <td>
//                                                     {event.serviceType === "In-house"
//                                                         ? event.employeeName
//                                                         : event.serviceName || event.serviceAddress}
//                                                 </td>
//                                                 <td>{new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
//                                                 <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

//                                                 <td>{event.remarks}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Insurence Tab Content */}
//                             <div className="tab-pane fade" id="insurence" role="tabpanel" aria-labelledby="insurence-tab">
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Asset Picture</th>
//                                             <th>Asset Name</th>
//                                             <th>Asset Tag</th>
//                                             <th>Insurence Company</th>
//                                             <th>Policy Number</th>
//                                             <th>End Date</th>
//                                             <th>Renewal Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {insurence.map((event) => (
//                                             <tr key={event.event_id}>
//                                                 <td><img
//                                                     src={event.assetPhoto}
//                                                     style={{ width: "90px" }}
//                                                     alt="Asset"
//                                                 />
//                                                 </td>
//                                                 <td>{event.assetName}</td>
//                                                 <td>{event.assetTag}</td>
//                                                 <td>{event.insuranceCompanyName}</td>
//                                                 <td>{event.policyNumber}</td>
//                                                 <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
//                                                 <td>{new Date(event.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>


//                             {/* Insurence History Tab Content */}
//                             <div className="tab-pane fade" id="insurenceHistory" role="tabpanel" aria-labelledby="insurenceHistory-tab">
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Asset Picture</th>
//                                             <th>Asset Name</th>
//                                             <th>Asset Tag</th>
//                                             <th>Insurence Company</th>
//                                             <th>Policy Number</th>
//                                             <th>End Date</th>
//                                             <th>Renewal Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {insurenceHistory.map((event) => (
//                                             <tr key={event.event_id}>
//                                                 <td><img
//                                                     src={event.assetPhoto}
//                                                     style={{ width: "90px" }}
//                                                     alt="Asset"
//                                                 />
//                                                 </td>
//                                                 <td>{event.assetName}</td>
//                                                 <td>{event.assetTag}</td>
//                                                 <td>{event.insuranceCompanyName}</td>
//                                                 <td>{event.policyNumber}</td>
//                                                 <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
//                                                 <td>{new Date(event.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>


//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* SitePopUp modal */}
//             {isSiteModalOpen && (
//                 <SitePopUp
//                     action={selectedAction}
//                     siteId={selectedSiteId}
//                     description={selectedDescription}
//                     onClose={siteCloseModal}
//                 />
//             )}

//             {/* EmployeePopUp modal */}
//             {isEmployeeModalOpen && (
//                 <EmployeePopUp
//                     action={selectedAction}
//                     employeeId={selectedEmployeeId}
//                     description={selectedDescription}
//                     onClose={employeeCloseModal}
//                 />
//             )}

//             {/* ClientPopUp modal */}
//             {isClientModalOpen && (
//                 <ClientPopUp
//                     action={selectedAction}
//                     clientId={selectedClientId}
//                     description={selectedDescription}
//                     onClose={clientCloseModal}
//                 />
//             )}
//             {/* Edit Asset Modal */}
//             {isEditModalOpen && (
//                 <EditAssetModal
//                     asset={asset}
//                     onClose={setIsEditModalOpen}
//                 />
//             )}
//         </div>
//     );
// };

// export default AssetDesc;


import React, { useState, useEffect } from "react";
import axios from "axios";
import SitePopUp from "./SitePopUp";
import EmployeePopUp from "./EmployeePopUp"; // Import the EmployeePopUp component
import ClientPopUp from "./ClientPopUp"; // Import the ClientPopUp component
import EditAssetModal from "./EditAssetModal";
import QRCode from "qrcode.react";

// Define the AssetDesc component
const AssetDesc = ({ asset, onClose }) => {
    // State to store the check-in/check-out history of the asset
    const [history, setHistory] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [insurence, setInsurence] = useState([]);
    const [assetDetails, setAssetDetails] = useState([]);
    const [insurenceHistory, setInsurenceHistory] = useState([]);
    const [assetLost, setAssetLost] = useState([]);
    // State variables for selected site id, employee id, client id, and description
    // Edit Asset Modal 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
    const [showQRCode, setShowQRCode] = useState(false); // State to manage showing/hiding QR code
    // Asset Transfer 
    const [transferAsset, setTransferAsset] = useState([]);
    const [transferHistory, setTransferHistory] = useState([]);
    // Asset Maintenance 
    const [unfinished, setunfinished] = useState([])
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    // purchase_history
    const [purchasehistory, setpurchasehistory] = useState([])
    console.log(asset)





    useEffect(() => {
        fetchunfinishedMaintenance();
    }, [asset]);
    const fetchunfinishedMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance/${asset.asset_master_id}`);
            // Filter maintenance items where task is finished
            const finishedMaintenance = response.data.filter(item => item.task === "unfinished");
            setunfinished(finishedMaintenance);
        } catch (error) {
            console.error("Error fetching maintenance:", error);
        }
    };

    // Function to fetch the check-in/check-out history for the asset
    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/purchase_history/${asset.asset_master_id}`);
            setpurchasehistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    // Fetch history when the component mounts
    useEffect(() => {
        fetchHistory();
    }, [asset]);
    const fetchAssetDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/asset_details/${asset.asset_master_id}`);
            setAssetDetails(response.data);
            console.log("aser", assetDetails);
        } catch (error) {
            console.error("Error fetching asset details:", error);
        }
    };

    useEffect(() => {
        fetchAssetDetails();
    }, [asset]);


    // Function to fetch maintenance details for the asset
    const fetchMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/maintenance/history/${asset.asset_master_id}`);
            setMaintenance(response.data);
        } catch (error) {
            console.error("Error fetching maintenance details:", error);
        }
    };

    // Fetch maintenance details when the component mounts
    useEffect(() => {
        fetchMaintenance();
    }, []);

    // Function to fetch insurence details for the asset
    const fetchInsurence = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurence/history/${asset.asset_master_id}`);
            setInsurence(response.data);
        } catch (error) {
            console.error("Error fetching Insurence details:", error);
        }
    };
    // Fetch insurence history details when the component mounts
    useEffect(() => {
        fetchInsurence();
    }, []);

    // Function to fetch insurence history details for the asset
    const fetchInsurenceHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurenceHistory/history/${asset.asset_master_id}`);
            setInsurenceHistory(response.data);
        } catch (error) {
            console.error("Error fetching Insurence details:", error);
        }
    };
    // Fetch insurence history details when the component mounts
    useEffect(() => {
        fetchInsurenceHistory();
    }, []);

    // Function to fetch insurence history details for the asset
    const fetchAssetsLost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/assetlost/${asset.asset_master_id}`);
            setAssetLost(response.data);

        } catch (error) {
            console.error("Error fetching Assets Lost:", error);
        }
    };

    useEffect(() => {
        console.log("akjsdn", assetLost)
        fetchAssetsLost();
    }, [asset.asset_master_id]);

    const processFetchedData = (data) => {
        const groupedData = {};
        data.forEach((item) => {
            const assetID = item.asset_id;
            if (!groupedData[assetID]) {
                groupedData[assetID] = { assetName: item.assetName, previousData: [], newData: [] };
            }
            if (item.previousData) {
                groupedData[assetID].previousData.push(JSON.parse(item.previousData));
            }
            if (item.newData) {
                groupedData[assetID].newData.push(JSON.parse(item.newData));
            }
        });
        return Object.values(groupedData);
    };
    console.log(processFetchedData);

    // Function to handle opening the edit modal
    const handleEditAsset = () => {
        setIsEditModalOpen(true);
    };

    // Function to handle closing the edit modal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    // Fetch transporter history when the component mounts or when the asset changes
    useEffect(() => {
        fetchTransferHistory();
    }, [asset]);

    // Function to fetch transporter history for the asset
    const fetchTransferHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/transporter_history/${asset.asset_master_id}`);
            setTransferHistory(response.data);
        } catch (error) {
            console.error("Error fetching transporter history:", error);
        }
    };


    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const assettransferhistory = transferHistory.slice(indexOfFirstItem, indexOfLastItem);
    const assetInsurenceHistory = insurenceHistory.slice(indexOfFirstItem, indexOfLastItem);
    const maintenanceHistory = maintenance.slice(indexOfFirstItem, indexOfLastItem);
    const assetlosthistory = assetLost.slice(indexOfFirstItem, indexOfLastItem);
    const purchase_history = history.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <div className="card-body p-4">
                {/* Asset Details Section */}
                <div className="row">
                    <div className="col-md-9 d-flex flex-column gap-3">
                        {/* Asset Name and Tag */}
                        <input type="hidden" value="1" name="id" id="id" />
                        <h4 className="title-detail font-bold">
                            <span className="assetname">Asset Name - {asset.name}</span>
                        </h4>
                        {/* Asset Type and Status */}
                        <h5 className="assetdetail">
                            <span className="assettag">Asset Tag - {asset.assettag} </span>
                            <span className="assetstatus"> {asset.currentStatus} </span>
                        </h5>
                        <h6>Maintenance:{unfinished.length > 0 ? (
                            unfinished.map((item, index) => (
                                <p key={index}>Under Maintenance</p>
                            ))
                        ) : (
                            <p>Maintenance Due</p>
                        )}
                        </h6>
                    </div>

                    {/* Back Button Section */}
                    <div className="col-md-3">
                        <div className="p-2 barcode-inner">
                            <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                                <div className="qr-code">
                                    {showQRCode && (
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 1 }} onClick={toggleQRCode}></div>
                                    )}
                                    <QRCode value={asset.qrCodeData} size={showQRCode ? 250 : 60} onClick={toggleQRCode} />
                                </div>
                                <div className="buttons-container d-flex gap-2">
                                    <button onClick={onClose} className="btn btn-sm btn-primary">
                                        Back to Asset List
                                    </button>
                                    <button onClick={handleEditAsset} className="btn btn-sm btn-primary">
                                        Edit Asset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="row pt-4">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {/* Details Tab */}
                            <li className="nav-item">
                                <a
                                    className="nav-link active show"
                                    id="details-tab"
                                    data-toggle="tab"
                                    href="#details"
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected="true"
                                >
                                    Details
                                </a>
                            </li>
                            {/* History Tab */}
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="history-tab"
                                    data-toggle="tab"
                                    href="#history"
                                    role="tab"
                                    aria-controls="history"
                                    aria-selected="false"
                                >
                                    Purchase History
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="maintenance-tab"
                                    data-toggle="tab"
                                    href="#maintenance"
                                    role="tab"
                                    aria-controls="maintenance"
                                    aria-selected="false"
                                >
                                    Maintenance
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="insurence-tab"
                                    data-toggle="tab"
                                    href="#insurence"
                                    role="tab"
                                    aria-controls="insurence"
                                    aria-selected="false"
                                >
                                    Insurence
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="insurenceHistory-tab"
                                    data-toggle="tab"
                                    href="#insurenceHistory"
                                    role="tab"
                                    aria-controls="insurenceHistory"
                                    aria-selected="false"
                                >
                                    Insurence history
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="transferAsset-tab"
                                    data-toggle="tab"
                                    href="#transferAsset"
                                    role="tab"
                                    aria-controls="transferAsset"
                                    aria-selected="false"
                                >
                                    Transfer Asset
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="lostAsset-tab"
                                    data-toggle="tab"
                                    href="#lostAsset"
                                    role="tab"
                                    aria-controls="lostAsset"
                                    aria-selected="false"
                                >
                                    Lost Assets
                                </a>
                            </li>
                        </ul>

                        {/* Tab Content Section */}
                        <div className="tab-content" id="myTabContent">
                            {/* Details Tab Content */}
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                {/* Asset Details */}
                                <div class="row">
                                    <div class="col-md-9 ">
                                        {/* Table for Asset Details */}
                                        <table
                                            class="table table-hover"
                                            cellpadding="0"
                                            cellspacing="0"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{asset.name}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Tag:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{asset.assettag}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Type:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{asset.assetType}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Serial:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetserial">{asset.serial}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">RTO Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetupdated">{asset.rtoName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Registration Number:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetupdated">{asset.registrationNumber}</p>
                                                    </td>
                                                </tr>

                                                <h4 style={{ width: "100%", color: "black", fontSize: "20px", fontWeight: "700", margin: "3px" }}>Total Asset Location wise :-</h4>

                                                {assetDetails.map((assetDetail, index) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <td bgcolor="#f2f3f4" width="200">
                                                                <p className="mb-0 font-bold">Location: {assetDetail.location} </p>
                                                            </td>
                                                            <td className="d-flex">
                                                                <p className="mb-0 font-bold"><span>Quantity: {assetDetail.quantity}</span></p>
                                                            </td>
                                                        </tr>

                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Image Section */}
                                    <div class="col-md-3 pt-2 text-center">
                                        <img
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                            style={{ width: "200px" }}
                                            alt="Asset"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* History Tab Content */}
                            {/* History Tab Content */}
                            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Asset Name</th>
                                            <th>AssetTag</th>
                                            <th>Quantity</th>
                                            <th>Purchase Date</th>
                                            <th>Cost</th>
                                            <th>Vendor</th>
                                            {/* <th>Category</th> */}
                                            <th>Brand</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchasehistory.map((event) => (
                                            <tr key={event.id}>
                                                <td>{event.name}</td>
                                                <td>{event.assettag}</td>
                                                <td>{event.quantity}</td>
                                                <td>{new Date(event.purchaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{event.cost}</td>
                                                <td>{event.vendorcompanyname}</td>
                                                {/* <td>{event.category_name}</td> */}
                                                <td>{event.brand}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(purchasehistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(purchasehistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>


                            {/* Maintenance Tab Content */}
                            <div className="tab-pane fade" id="maintenance" role="tabpanel" aria-labelledby="maintenance-tab">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Asset photo</th>
                                            <th>Asset Name</th>
                                            <th>Asset Tag</th>
                                            <th>Service Type</th>
                                            <th>Provider Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {maintenanceHistory.map((event) => (
                                            <tr key={event.event_id}>
                                                <td> <img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
                                                    alt="Asset"
                                                /></td>
                                                <td>{event.assetName}</td>
                                                <td>{event.assetTag}</td>
                                                <td>{event.serviceType}</td>
                                                <td>
                                                    {event.serviceType === "In-house"
                                                        ? event.employeeName
                                                        : event.serviceName || event.serviceAddress}
                                                </td>
                                                <td>{new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

                                                <td>{event.remarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(maintenance.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(maintenance.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Insurence Tab Content */}
                            <div className="tab-pane fade" id="insurence" role="tabpanel" aria-labelledby="insurence-tab">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Asset Picture</th>
                                            <th>Asset Name</th>
                                            <th>Asset Tag</th>
                                            <th>Insurence Company</th>
                                            <th>Policy Number</th>
                                            <th>End Date</th>
                                            <th>Renewal Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {insurence.map((event) => (
                                            <tr key={event.event_id}>
                                                <td><img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
                                                    alt="Asset"
                                                />
                                                </td>
                                                <td>{event.assetName}</td>
                                                <td>{event.assetTag}</td>
                                                <td>{event.insuranceCompanyName}</td>
                                                <td>{event.policyNumber}</td>
                                                <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{new Date(event.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            {/* Insurence History Tab Content */}
                            <div className="tab-pane fade" id="insurenceHistory" role="tabpanel" aria-labelledby="insurenceHistory-tab">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Asset Picture</th>
                                            <th>Asset Name</th>
                                            <th>Asset Tag</th>
                                            <th>Insurence Company</th>
                                            <th>Policy Number</th>
                                            <th>End Date</th>
                                            <th>Renewal Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assetInsurenceHistory.map((event) => (
                                            <tr key={event.event_id}>
                                                <td><img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
                                                    alt="Asset"
                                                />
                                                </td>
                                                <td>{event.assetName}</td>
                                                <td>{event.assetTag}</td>
                                                <td>{event.insuranceCompanyName}</td>
                                                <td>{event.policyNumber}</td>
                                                <td>{new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{new Date(event.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(insurenceHistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(insurenceHistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Transfer Asset Tab Content */}
                            <div className="tab-pane fade" id="transferAsset" role="tabpanel" aria-labelledby="transferAsset-tab">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Asset Name</th>
                                            <th>current Quantity</th>
                                            <th>Transfer From</th>
                                            <th>Transfer To</th>
                                            <th>Transferred Quantity </th>
                                            <th>Transfer Date</th>
                                            <th>Transfer Via</th>
                                            <th>Description</th>
                                            {/* Add more columns as needed */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assettransferhistory.map(transfer => (
                                            <tr key={transfer.id}>
                                                <td>{transfer.assetName}</td>
                                                <td>{transfer.currentQuantity}</td>
                                                <td>{transfer.transferFrom}</td>
                                                <td>{transfer.location}</td>
                                                <td>{transfer.quantity}</td>
                                                <td>{new Date(transfer.transferDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{transfer.selectedTransporterName}</td>
                                                <td>{transfer.description}</td>
                                                {/* Render more columns as needed */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(transferHistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(transferHistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>
                            {/* lost Asset Tab Content */}
                            <div className="tab-pane fade" id="lostAsset" role="tabpanel" aria-labelledby="lostAsset-tab">

                                <div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Asset Name</th>
                                                <th>Loss Date</th>
                                                <th>Loss Location</th>
                                                <th>Loss Type</th>
                                                <th>Loss Quantity </th>
                                                <th>Responsible Person</th>
                                                <th>Contact No.</th>
                                                <th>Circumstances</th>
                                                {/* Add more columns as needed */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assetlosthistory.map(lost => (
                                                <tr key={lost.id}>
                                                    <td>{lost.assetName}</td>
                                                    <td>{new Date(lost.lossDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                    <td>{lost.lossLocation}</td>
                                                    <td>{lost.lossType}</td>
                                                    <td>{lost.newquantity}</td>
                                                    <td>{lost.responsiblePerson}</td>
                                                    <td>{lost.contactNo}</td>
                                                    <td>{lost.lossCircumstances}</td>
                                                    {/* Render more columns as needed */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Pagination */}
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                        </li>
                                        {Array.from({ length: Math.ceil(assetLost.length / itemsPerPage) || 1 }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil(assetLost.length / itemsPerPage) && 'disabled'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Asset Modal */}
            {isEditModalOpen && (
                <EditAssetModal
                    asset={asset}
                    onClose={setIsEditModalOpen}
                />
            )}
        </div>
    );
};

export default AssetDesc;

