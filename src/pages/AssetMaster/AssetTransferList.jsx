// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AddDataModal from "./AddDataModal";
// import CheckIn from "./CheckIn"; // Import CheckIn component
// import CheckOut from "./CheckOut"; // Import CheckOut component
// import EditAssetModal from "./EditAssetModal"; // Import EditAssetModal component
// import DeleteConfirmationModal from '../DeleteConfirmationModal'; // Import the new component
// import AssetDesc from "./AssetDesc";
// import Sidebar from "../../components/sidebar/Sidebar";
// import SearchBar from "../../components/sidebar/SearchBar";
// import AddTransferAsset from "./AddTransferAsset";


// function AssetTransferList({ handleLogout, username }) {
//   const [style, setStyle] = useState(
//     "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//   );
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [assets, setAssets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
//   const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false); // State for CheckIn modal
//   const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false); // State for CheckOut modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Asset modal
//   const [editedAsset, setEditedAsset] = useState(null); // State to hold edited asset data
//   const [checkInEditAsset, setCheckInEditAsset] = useState(null); // State for asset being edited for check in
//   const [checkOutEditAsset, setCheckOutEditAsset] = useState(null); // State for asset being edited for check out
//   const [assetHistory, setAssetHistory] = useState({}); // Define a state to store asset history
//   // pagination 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   // Delete History 
//   const [deleteAsset, setDeleteAsset] = useState(null); // State to store data of client being deleted
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
//   const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason
//   // transfer Asset 
//   const [addTransferAssetEditAsset, setaddTransferAssetEditAsset] = useState(null); // State for asset being edited for check in
//   const [addTransferAsset, setAddTransferAsset] = useState(false); // State for CheckIn modal
//   // State to store the selected site
//   const [sites, setSites] = useState([]);
//   const [selectedSite, setSelectedSite] = useState('');

//   useEffect(() => {
//     fetchSites();
//   }, []);

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching sites:", error);
//     }
//   };

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   // asset current stauts details    
//   const getAssetHistory = async (assetId) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${assetId}/history`);
//       // const response = await axios.get(`https://demo1server.prospectdigital.in/assets/${assetId}/history`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching asset history:", error);
//       return [];
//     }
//   };

//   // Function to get the latest event for an asset
//   const getLatestEvent = (assetId) => {
//     const history = assetHistory[assetId];
//     if (!history || history.length === 0) {
//       return null;
//     }
//     return history[history.length - 1];
//   };

//   // Function to get the display text for the latest event
//   const getLatestEventText = (event) => {
//     if (!event) {
//       return "No events";
//     }
//     return event.event_type === "check_in"
//       ? `Checked In to ${event.checkin_by}`
//       // : `Checked from ${event.checkout_to}`;
//       : `Checked from Prospect legal`;
//   };

//   useEffect(() => {
//     fetchAssets();
//   }, []);
//   // Fetch assets and their history
//   const fetchAssets = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);
//       setAssets(response.data);

//       console.log(apiUrl);
//       // Fetch and store history for each asset
//       const historyPromises = response.data.map(async (asset) => {
//         const history = await getAssetHistory(asset.id);
//         setAssetHistory(prevHistory => ({
//           ...prevHistory,
//           [asset.id]: history
//         }));
//       });

//       // Wait for all history fetches to complete
//       await Promise.all(historyPromises);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//     }
//   };
//   // asset current stauts details 
//   const changeStyle = () => {
//     setStyle((prevStyle) =>
//       prevStyle.includes("toggled")
//         ? prevStyle.replace(" toggled", "")
//         : `${prevStyle} toggled`
//     );
//   };

//   const handleAddAsset = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAssetDetails = (asset) => {
//     setSelectedAsset(asset);
//     setShowDetails(true);
//   };

//   const handleCloseDetails = () => {
//     setShowDetails(false);
//     setSelectedAsset(null);
//   };


//   const handleDeleteAsset = (asset) => {
//     setDeleteAsset(asset);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       // Perform deletion in the database
//       await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/assets/${deleteAsset.id}`);
//       // Save the deleted data to delete_details table
//       const deletedAsset = { ...deleteAsset, reason: deleteReason };
//       await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedAsset);

//       // Remove the deleted client from the UI
//       setAssets((prevAssets) =>
//         prevAssets.filter((Asset) => Asset.id !== deleteAsset.id)
//       );
//       // Close the delete modal
//       setIsDeleteModalOpen(false);

//     } catch (error) {
//       console.error("Error deleting Asset:", error);
//       // Optionally handle error conditions here
//     }
//   };

//   // Edit asset modal
//   const handleEditAsset = (asset) => {
//     setEditedAsset(asset);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditAsset = () => {
//     setIsEditModalOpen(false);
//     setEditedAsset(null);
//   };

//   // Function to handle opening the modal for checking in an asset
//   const handleOpenCheckInModal = (asset) => {
//     setCheckInEditAsset(asset);
//     setIsCheckInModalOpen(true);
//   };

//   // Function to handle closing the modal for checking in an asset
//   const handleCloseCheckInModal = () => {
//     setIsCheckInModalOpen(false);
//     setCheckInEditAsset(null);
//   };

//   // Function to handle opening the modal for Add Transfer Asser
//   const handleOpenTransferAssetModal = (asset) => {
//     setaddTransferAssetEditAsset(asset);
//     setAddTransferAsset(true);
//   };

//   // Function to handle closing the modal for checking in an asset
//   const handleCloseTransferAssetModal = () => {
//     setAddTransferAsset(false);
//     setaddTransferAssetEditAsset(null);
//   };

//   // Function to handle opening the modal for checking out an asset
//   const handleOpenCheckOutModal = (asset) => {
//     setCheckOutEditAsset(asset);
//     setIsCheckOutModalOpen(true);
//   };

//   // Function to handle closing the modal for checking out an asset
//   const handleCloseCheckOutModal = () => {
//     setCheckOutEditAsset(null);
//     setIsCheckOutModalOpen(false);
//   };


//   // Function to handle updating asset details for both check in and check out
//   const handleUpdateAssetStatus = async (updatedAssetStatus) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAssetStatus.id}`,
//         updatedAssetStatus
//       );
//       console.log("Asset updated:", response.data);
//       // Update the assets state with the updated asset
//       const updatedAssets = assets.map((asset) =>
//         asset.id === updatedAssetStatus.id ? response.data : asset
//       );
//       fetchAssets();
//       setAssets(updatedAssets);
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   // Function to update assets list after adding a new asset
//   const handleUpdateAssets = () => {
//     fetchAssets();
//   };

//   // Function to handle updating asset details
//   const handleUpdateAsset = async (updatedAsset) => {
//     try {
//       const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAsset.id}`, updatedAsset);
//       console.log("Asset updated:", response.data);

//       // Update the assets state with the updated asset
//       const updatedAssets = assets.map(asset => (asset.id === updatedAsset.id ? response.data : asset));
//       fetchAssets();
//       setAssets(updatedAssets);
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   const handleSiteChange = (event) => {
//     const selectedValue = event.target.value;
//     const intValue = parseInt(selectedValue, 10); // Convert string to integer with base 10
//     console.log("Selected Site:", typeof(intValue), intValue);
//     setSelectedSite(intValue);
//   };


//   const filteredAssets = selectedSite 
//     ? assets.filter(asset => asset.site_master_id=== selectedSite)
//     : assets;


//     console.log("filteredAssets",filteredAssets )
//     console.log("assets",assets)

//     const handleDownloadExcel = async () => {
//       try {
//         // Make a GET request to the backend endpoint for downloading assets as Excel
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/download-assets-excel/asset-transfer`, {
//           responseType: 'blob' // Set response type to blob to handle binary data
//         });
  
//         // Create a URL for the blob
//         const url = window.URL.createObjectURL(new Blob([response.data]));
  
//         // Create a link element and trigger a click event to start the download
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'assets.xlsx');
//         document.body.appendChild(link);
//         link.click();
  
//         // Remove the link from the DOM
//         document.body.removeChild(link);
//       } catch (error) {
//         console.error('Error downloading assets as Excel:', error);
//         // Handle error if needed
//       }
//     };

    
//   // pagination logic
//   // Logic to get current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className='d-flex w-100% h-100 '>
//       <Sidebar />
//       <div className='w-100'>
//         <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
//         <div className="container-fluid">
//           {/* Conditionally render the asset list if showDetails is false */}
//           {!showDetails && (
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="card shadow mb-4">
//                   <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                     <h6 className="m-0 font-weight-bold text-primary">
//                       Asset Transfer List
//                     </h6>
//                     <div className="d-flex align-items-center justify-content-center gap-4">
//                     <button className="btn btn-success w-md m-b-5" onClick={handleDownloadExcel}>Excel <span><i className="fa fa-download" ></i></span></button>
//                       <div className='d-flex align-items-center'>
//                         <label className='me-2 black-font-color p-top-2' style={{paddingTop:"8px"}}>Filter:</label>
//                         <select
//                           className="form-select black-font-color"
//                           value={selectedSite}
//                           onChange={handleSiteChange}
//                         >
//                           <option value="">All Site</option>
//                           {sites.map((site) => (
//                             <option key={site.id} value={site.id}>
//                               {site.siteName}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}  >
//                     <table
//                       className="table table-striped table-bordered"
//                       style={{ width: "100%" }}
//                     >
//                       <thead>
//                         <tr>
//                           <th>Asset Picture</th>
//                           <th>Asset Name</th>
//                           <th>Asset Type</th>
//                           <th>Asset Quantity</th>
//                           <th>Current Location</th>
//                           <th>Current Status</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       {/* Table body */}
//                       <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
//                         {currentItems.map((asset) => (
//                           <tr key={asset.id}>
//                             <td>
//                               <img
//                                 src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
//                                 style={{ width: "90px" }}
//                                 alt="Asset"
//                               />
//                             </td>
//                             <td>{asset.name}</td>
//                             <td>{asset.assetType}</td>
//                             <td>{asset.quantity}</td>
//                             <td>{asset.location}</td>
//                             <td>
//                               <ul style={{ listStyleType: "none" }}>
//                                 <li key={asset.id}>
//                                   {getLatestEventText(getLatestEvent(asset.id))}
//                                 </li>
//                               </ul>
//                             </td>
//                             <td>
//                               <div className="btn-group">
//                                 <button
//                                   className="btn btn-sm btn-primary dropdown-toggle"
//                                   type="button"
//                                   data-toggle="dropdown"
//                                   aria-haspopup="true"
//                                   aria-expanded="false"
//                                 >
//                                   <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                 </button>
//                                 <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                   {asset.currentStatus === "CheckedIn" ? (
//                                     <a
//                                       className="dropdown-item"
//                                       href="#"
//                                       onClick={() => handleOpenCheckOutModal(asset)}
//                                     >
//                                       <i className="fa fa-check"></i> Check Out
//                                     </a>
//                                   ) : (
//                                     <a
//                                       className="dropdown-item"
//                                       href="#"
//                                       onClick={() => handleOpenCheckInModal(asset)}
//                                     >
//                                       <i className="fa fa-check"></i> Check In
//                                     </a>
//                                   )}

//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleOpenTransferAssetModal(asset)}
//                                   >
//                                     <i className="fa fa-check"></i>Transfer Asset
//                                   </a>
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
//                       {Array.from({ length: Math.ceil(filteredAssets.length / itemsPerPage) }, (_, i) => (
//                         <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
//                           <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
//                         </li>
//                       ))}
//                       <li className={`page-item ${currentPage === Math.ceil(filteredAssets.length / itemsPerPage) && 'disabled'}`}>
//                         <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Conditionally render the asset details if showDetails is true */}

//           {showDetails && selectedAsset && (
//             <AssetDesc
//               asset={selectedAsset}
//               onClose={handleCloseDetails}
//             />
//           )}
//           {isModalOpen && <AddDataModal onClose={handleCloseModal} onUpdateAssets={handleUpdateAssets} />}

//           {/* Check in Modal */}
//           {isCheckInModalOpen && (
//             <CheckIn
//               asset={checkInEditAsset}
//               onClose={handleCloseCheckInModal}
//               updateAssetStatus={handleUpdateAssetStatus}
//               onUpdateAssets={handleUpdateAssets} // Pass the callback function
//             />
//           )}

//           {/* Check out Modal */}
//           {isCheckOutModalOpen && (
//             <CheckOut
//               asset={checkOutEditAsset}
//               onClose={handleCloseCheckOutModal}
//               updateAssetStatus={handleUpdateAssetStatus} // Pass the updateAssetStatus function
//             />
//           )}
//           {/* Edit Asset Modal */}
//           {isEditModalOpen && (
//             <EditAssetModal
//               asset={editedAsset}
//               onUpdate={handleUpdateAsset}
//               onClose={handleCloseEditAsset}
//             />
//           )}
//           {/* AssetTransferList Completed */}

//           <DeleteConfirmationModal
//             isOpen={isDeleteModalOpen}
//             itemName={deleteAsset ? deleteAsset.name : ""}
//             onDelete={confirmDelete}
//             onClose={() => setIsDeleteModalOpen(false)}
//             deleteReason={deleteReason}
//             setDeleteReason={setDeleteReason}
//           />
//           {/* Check in Modal */}
//           {addTransferAsset && (
//             <AddTransferAsset
//               asset={addTransferAssetEditAsset}
//               onClose={handleCloseTransferAssetModal}
//               onUpdateAssets={handleUpdateAssets} // Pass the callback function
//             />
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AssetTransferList;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import AddTransferAsset from "./AddTransferAsset";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssetTransferList({ handleLogout, username }) {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [addTransferAssetEditAsset, setAddTransferAssetEditAsset] = useState(null);
  const [addTransferAsset, setAddTransferAsset] = useState(false);
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    fetchSites();
    fetchClients();
    fetchEmployees();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [selectedSite, selectedClient, selectedEmployee]);

  const fetchAssets = async () => {
    try {
      // Construct the URL based on selected filters
      let url = `${process.env.REACT_APP_LOCAL_URL}/assets?`;
      if (selectedSite) {
        url += `site=${selectedSite}&`;
      }
      if (selectedClient) {
        url += `client=${selectedClient}&`;
      }
      if (selectedEmployee) {
        url += `employee=${selectedEmployee}&`;
      }

      const response = await axios.get(url);
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
    // Reset selected client and employee
    setSelectedClient('');
    setSelectedEmployee('');
  };
  
  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
    // Reset selected site and employee
    setSelectedSite('');
    setSelectedEmployee('');
  };
  
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    // Reset selected site and client
    setSelectedSite('');
    setSelectedClient('');
  };
  
  const filteredAssets = assets.filter((asset) => {
    let isMatched = true;
  
    if (selectedSite && parseInt(asset.site_master_id) !== parseInt(selectedSite)) {
      isMatched = false;
    }
  
    if (selectedClient && parseInt(asset.client_master_id) !== parseInt(selectedClient)) {
      isMatched = false;
    }
  
    if (selectedEmployee && parseInt(asset.employee_master_id) !== parseInt(selectedEmployee)) {
      isMatched = false;
    }
  
    return isMatched;
  });
  

  const handleDownloadExcel = async () => {
    try {
      // Make a GET request to the backend endpoint for downloading assets as Excel
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/download-assets-excel/asset-transfer`, {
        responseType: 'blob' // Set response type to blob to handle binary data
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger a click event to start the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'assets.xlsx');
      document.body.appendChild(link);
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading assets as Excel:', error);
      // Handle error if needed
    }
  };

  const handleOpenTransferAssetModal = (asset) => {
    // Function implementation
    setAddTransferAssetEditAsset(asset);
    setAddTransferAsset(true);
  };

  const handleCloseTransferAssetModal = () => {
    // Function implementation
    setAddTransferAsset(false);
    setAddTransferAssetEditAsset(null);
  };

  const handleUpdateAssets = () => {
    toast.success("successfully uploaded");
    // Function implementation
    fetchAssets();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100% h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid">
        <ToastContainer/>
          {!showDetails && (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Asset Transfer List
                    </h6>
                    <div className="d-flex align-items-center justify-content-center gap-4">
                      <button className="btn btn-success w-md m-b-5" onClick={handleDownloadExcel}>
                        Excel <span><i className="fa fa-download"></i></span>
                      </button>
                      <div className='d-flex align-items-center'>
                        <label className='me-2 black-font-color p-top-2' style={{ paddingTop: "8px" }}>Filter:</label>
                        <select
                          className="form-select black-font-color"
                          value={selectedSite}
                          onChange={handleSiteChange}
                        >
                          <option value="">All Site</option>
                          {sites.map((site) => (
                            <option key={site.id} value={site.id}>
                              {site.siteName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='d-flex align-items-center'>
                        <label className='me-2 black-font-color p-top-2' style={{ paddingTop: "8px" }}>Client:</label>
                        <select
                          className="form-select black-font-color"
                          value={selectedClient}
                          onChange={handleClientChange}
                        >
                          <option value="">All Clients</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.clientName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='d-flex align-items-center'>
                        <label className='me-2 black-font-color p-top-2' style={{ paddingTop: "8px" }}>Employee:</label>
                        <select
                          className="form-select black-font-color"
                          value={selectedEmployee}
                          onChange={handleEmployeeChange}
                        >
                          <option value="">All Employees</option>
                          {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.ename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                    <table
                      className="table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Asset Picture</th>
                          <th>Asset Name</th>
                          <th>Asset Type</th>
                          <th>Asset Quantity</th>
                          <th>Current Location</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
                        {currentItems.map((asset) => (
                          <tr key={asset.id}>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                style={{ width: "90px" }}
                                alt="Asset"
                              />
                            </td>
                            <td>{asset.name}</td>
                            <td>{asset.assetType}</td>
                            <td>{asset.quantity}</td>
                            <td>{asset.location}</td>
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
                                <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleOpenTransferAssetModal(asset)}
                                  >
                                    <i className="fa fa-check"></i>Transfer Asset
                                  </a>
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
                      {Array.from({ length: Math.ceil(filteredAssets.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(filteredAssets.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {addTransferAsset && (
            <AddTransferAsset
              asset={addTransferAssetEditAsset}
              onClose={handleCloseTransferAssetModal}
              onUpdateAssets={handleUpdateAssets}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetTransferList;
