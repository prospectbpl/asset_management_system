import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDataModal from "./AddDataModal";
import EditAssetModal from "./EditAssetModal"; // Import EditAssetModal component
import "./Assetlist.css";
import DeleteConfirmationModal from '../DeleteConfirmationModal'; // Import the new component
import AssetDesc from "./AssetDesc";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import AddTransferAsset from "./AddTransferAsset";
import AddQuantity from "./AddQuantity";
import { debounce } from "lodash"; // Import debounce function



function Assetlist({ handleLogout, username }) {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [assets, setAssets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Asset modal
  const [editedAsset, setEditedAsset] = useState(null); // State to hold edited asset data
  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Delete History 
  const [deleteAsset, setDeleteAsset] = useState(null); // State to store data of client being deleted
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
  const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason
  // transfer Asset 
  const [addTransferAssetEditAsset, setaddTransferAssetEditAsset] = useState(null); // State for asset being edited for check in
  const [addTransferAsset, setAddTransferAsset] = useState(false); // State for CheckIn modal
  // State to store the selected site
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  // Add Quantity  
  const [addQuantity, setAddQuantity] = useState(null); // State to store data of client being deleted
  const [addQuantityModalOpen, setAddQuantityModalOpen] = useState(false); // State to manage delete confirmation modal
  // search term 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const apiUrl = process.env.REACT_APP_LOCAL_URL;

  useEffect(() => {
    fetchAssets();
  }, []);
  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets/searchbar?search=${searchTerm}`);
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const debouncedFetchAssets = debounce(fetchAssets, 300);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedFetchAssets();
  };

  // asset current stauts details 

  const handleAddAsset = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAssetDetails = (asset) => {
    setSelectedAsset(asset);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedAsset(null);
  };


  const handleDeleteAsset = (asset) => {
    setDeleteAsset(asset);
    setIsDeleteModalOpen(true);
  };
  const handleAddQuntity = (asset) => {
    setAddQuantity(asset);
    setAddQuantityModalOpen(true);
  };

  const handleCloseAddQuantity = () => {
    setAddQuantityModalOpen(false);
    setAddQuantity(null);
  };

  const confirmDelete = async () => {
    try {
      // Perform deletion in the database
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/assets/${deleteAsset.id}`);
      // Save the deleted data to delete_details table
      const deletedAsset = { ...deleteAsset, reason: deleteReason };
      await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedAsset);

      // Remove the deleted client from the UI
      setAssets((prevAssets) =>
        prevAssets.filter((Asset) => Asset.id !== deleteAsset.id)
      );
      // Close the delete modal
      setIsDeleteModalOpen(false);

    } catch (error) {
      console.error("Error deleting Asset:", error);
      // Optionally handle error conditions here
    }
  };

  // Edit asset modal
  const handleEditAsset = (asset) => {
    setEditedAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleCloseEditAsset = () => {
    setIsEditModalOpen(false);
    setEditedAsset(null);
  };

  // Function to handle opening the modal for Add Transfer Asser
  const handleOpenTransferAssetModal = (asset) => {
    setaddTransferAssetEditAsset(asset);
    setAddTransferAsset(true);
  };

  // Function to handle closing the modal for checking in an asset
  const handleCloseTransferAssetModal = () => {
    setAddTransferAsset(false);
    setaddTransferAssetEditAsset(null);
  };

  // Function to update assets list after adding a new asset
  const handleUpdateAssets = () => {
    toast.success('Data uploaded successfully')
    fetchAssets();
  };

  // Function to handle updating asset details
  const handleUpdateAsset = async (updatedAsset) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAsset.id}`, updatedAsset);
      console.log("Asset updated:", response.data);

      // Update the assets state with the updated asset
      const updatedAssets = assets.map(asset => (asset.id === updatedAsset.id ? response.data : asset));
      fetchAssets();
      setAssets(updatedAssets);
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };


  const filteredAssets = selectedSite
    ? assets.filter(asset => asset.site_master_id === selectedSite)
    : assets;


  console.log("filteredAssets", filteredAssets)
  console.log("assets", assets)

  const handleDownloadExcel = async () => {
    try {
      // Make a GET request to the backend endpoint for downloading assets as Excel
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/download-assets-excel/assets`, {
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


  // pagination logic
  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100% h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid">
        <ToastContainer/>
          {/* Conditionally render the asset list if showDetails is false */}
          {!showDetails && (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between "  >
                    <div className=" d-flex flex-row gap-4 align-items-center justify-center w-50" >
                      <h6 className="m-0 font-weight-bold text-primary">
                        Asset List
                      </h6>
                      <div className="input-group " style={{ width: '50%'}}>
                        <input
                          type="text"
                          className="form-control bg-gray-300 border-0 small"
                          placeholder="Search for assets..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                          onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-4">
                      <button onClick={handleAddAsset} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                        Add Asset
                      </button>
                      <div className='d-flex align-items-center'>
                        <button className="btn btn-success w-md m-b-5" onClick={handleDownloadExcel} style={{ padding: "5px 10px", borderRadius: "30px" }}>Excel <span><i className="fa fa-download" ></i></span></button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}  >
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
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {/* Table body */}
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
                            <td>{asset.totalQuantity}</td>
                            <td>{asset.vendorcompanyname}</td>
                            <td>{asset.category_name}</td>
                            {/* <td>
                              <ul style={{ listStyleType: "none" }}>
                                <li key={asset.id}>
                                  {getLatestEventText(getLatestEvent(asset.id))}
                                </li>
                              </ul>
                            </td> */}
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
                                    onClick={() => handleAddQuntity(asset)}
                                  >
                                    <i className="fa fa-plus"></i> Add Quantity
                                  </a>

                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleOpenTransferAssetModal(asset)}
                                  >
                                    <i className="fa fa-share"></i>Transfer Asset
                                  </a>

                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleAssetDetails(asset)}
                                  >
                                    <i className="fa fa-file "></i>
                                    <span> Details</span>
                                  </a>
                                  {/* <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleEditAsset(asset)}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </a> */}
                                  {/* <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDeleteAsset(asset)}
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

          {/* Conditionally render the asset details if showDetails is true */}

          {showDetails && selectedAsset && (
            <AssetDesc
              asset={selectedAsset}
              onClose={handleCloseDetails}
            />
          )}
          {isModalOpen && <AddDataModal onClose={handleCloseModal} onUpdateAssets={handleUpdateAssets} />}

          {/* Edit Asset Modal */}
          {isEditModalOpen && (
            <EditAssetModal
              asset={editedAsset}
              onUpdate={handleUpdateAsset}
              onClose={handleCloseEditAsset}
            />
          )}
          {/* Add Quantity Asset Modal */}
          {addQuantityModalOpen && (
            <AddQuantity
              asset={addQuantity}
              onUpdate={handleUpdateAssets}
              onClose={handleCloseAddQuantity}
            />
          )}
          {/* assetlist Completed */}

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            itemName={deleteAsset ? deleteAsset.name : ""}
            onDelete={confirmDelete}
            onClose={() => setIsDeleteModalOpen(false)}
            deleteReason={deleteReason}
            setDeleteReason={setDeleteReason}
          />
          {/* Check in Modal */}
          {addTransferAsset && (
            <AddTransferAsset
              asset={addTransferAssetEditAsset}
              onClose={handleCloseTransferAssetModal}
              onUpdateAssets={handleUpdateAssets} // Pass the callback function
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Assetlist;


