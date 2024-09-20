import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import AddAsset from "./AddAsset";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditAssetMaster from "./EditAssetMaster";

function AssetMasterList({ handleLogout, username }) {
  // State for storing assets
  const [assets, setAssets] = useState([]);
  // State for storing sites
  const [sites, setSites] = useState([]);
  // State for selected site
  const [selectedSite, setSelectedSite] = useState("");
  // State for managing Add Asset Modal
  const [assetMaster, setAddAssetMaster] = useState(null);
  const [assetMasterModalOpen, setAssetMasterModalOpen] = useState(false);
  // Edit Asset Master List 
  const [selectedEditAsset, setAddselectedEditAsset] = useState(null);
  const [editAssetModalOpen, setEditAssetModalOpen] = useState(false);

  useEffect(() => {
    // Fetch assets and sites data on component mount
    fetchAssets();
    fetchSites();
  }, []);

  // Function to fetch assets data
  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset/master`);
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Function to fetch sites data
  const fetchSites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  // Filter assets based on selected site
  const filteredAssets = selectedSite
    ? assets.filter((asset) => asset.site_master_id === selectedSite)
    : assets;

  // Open Add Asset Modal
  const handleAssetMaster = () => {
    setAddAssetMaster(null);
    setAssetMasterModalOpen(true);
  };

  // Close Add Asset Modal
  const handleCloseAssetMaster = () => {
    setAssetMasterModalOpen(false);
  };

  // Function to update assets after adding a new asset
  const handleUpdateAssets = () => {
    toast.success("successfully uploaded");
    fetchAssets();
    handleCloseAssetMaster();
  };

  const handleEditAsset = (asset) => {
    setAddselectedEditAsset(asset);
    setEditAssetModalOpen(true);
  };

  const handleCloseEditAsset = () => {
    setEditAssetModalOpen(false);
  };

  return (
    <div className="d-flex w-100% h-100 bg-white">
      <Sidebar />
      <div className="w-100">
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid">
          <ToastContainer />
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow-sm mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Asset Master List
                  </h6>
                  <div className="d-flex align-items-center justify-content-center gap-4">
                    <button className="btn btn-primary" onClick={handleAssetMaster}>
                      Add Asset Master
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                      <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                        <tr>
                          <th>Asset Picture</th>
                          <th>Asset Name</th>
                          <th>Asset Type</th>
                          <th>Registration No.</th>
                          <th>RTO No.</th>
                          <th>Serial Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <style>
                          {`.hyperlink:hover {color: blue;}`}
                        </style>
                        {filteredAssets.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">Thier is No Asset.</td>
                          </tr>
                        ) : (
                          filteredAssets.map((asset) => (
                            <tr key={asset.id}>
                              <td>
                                <img
                                  src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.asset_image}`}
                                  className="asset-image"
                                  alt="Asset"
                                />
                              </td>
                              <td>{asset.assetmaster_name || "N/A"}</td>
                              <td>{asset.asset_type || "N/A"}</td>
                              <td>{asset.registration_number || "N/A"}</td>
                              <td>{asset.rto_name || "N/A"}</td>
                              <td>{asset.serial_number || "N/A"}</td>
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
                                      onClick={() => handleEditAsset(asset)}
                                    >
                                      <i className="fas fa-edit"></i> Edit
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Quantity Asset Modal */}
      {assetMasterModalOpen && (
        <AddAsset
          asset={assetMaster}
          onUpdate={handleUpdateAssets}
          onClose={handleCloseAssetMaster}
        />
      )}
      {editAssetModalOpen && <EditAssetMaster onClose={handleCloseEditAsset} assetMaster={selectedEditAsset} onUpdate={handleUpdateAssets} />}

    </div>
  );
}

export default AssetMasterList;
