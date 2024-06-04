import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import AddAsset from "./AddAsset";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <div className="d-flex w-100% h-100">
      <Sidebar />
      <div className="w-100">
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid">
        <ToastContainer/>
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Asset Master List
                  </h6>
                  <div className="d-flex align-items-center justify-content-center gap-4">
                    <button
                      onClick={handleAssetMaster}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#4E73DF",
                        color: "white",
                        borderRadius: "30px",
                        cursor: "pointer",
                        border: "none",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "red")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#4E73DF")}
                    >
                      Add Asset Master
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Asset Picture</th>
                        <th>Asset Name</th>
                        <th>Asset Type</th>
                        <th>Serial Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map((asset) => (
                        <tr key={asset.id}>
                          <td>
                            <img
                              src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.asset_image}`}
                              style={{ width: "90px" }}
                              alt="Asset"
                            />
                          </td>
                          <td>{asset.assetmaster_name}</td>
                          <td>{asset.asset_type}</td>
                          <td>{asset.serial_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
    </div>
  );
}

export default AssetMasterList;
