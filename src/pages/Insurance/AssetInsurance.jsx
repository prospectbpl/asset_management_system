import React, { useState, useEffect } from "react";
import axios from "axios";
// Asset Insurence 
import AddAssetInsuranceModal from "./AddAssetInsuranceModal";
import InsuranceDetails from "./InsuranceDetails";
import RenewalInsurance from "./RenewalInsurance";
import '../style1.css';
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import EditAssetInsuranceModal from "./EditAssetInsuranceModal";

function AssetInsurance({ handleLogout, username }) {
  // Asset Insurence 
  const [assetInsurances, setAssetInsurances] = useState([]);
  const [isAddAssetInsuranceModalOpen, setIsAddAssetInsuranceModalOpen] = useState(false);
  const [isEditAssetInsuranceModalOpen, setIsEditAssetInsuranceModalOpen] = useState(false);
  const [editAssetInsurance, setEditAssetInsurance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [showRenewalList, setShowRenewalList] = useState(false); // Added state to control visibility of RenewalInsurance modal
  const [renewalInsurances, setRenewalInsurances] = useState([]); // State to store renewal insurances

  // Asset Insurence 
  useEffect(() => {
    fetchAssetInsurances();
  }, []);

  const fetchAssetInsurances = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset-insurances`);
      setAssetInsurances(response.data);
      updateRenewalInsurances(response.data); // Update renewal insurances when asset insurances are fetched
    } catch (error) {
      console.error("Error fetching asset insurances:", error);
    }
  };

  const updateRenewalInsurances = (assetInsurances) => {
    const currentDate = new Date();
    const renewalAssets = assetInsurances.filter(assetInsurance => {
      const renewalDate = new Date(assetInsurance.renewalDate);
      const timeDiff = renewalDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff <= 15;
    });
    setRenewalInsurances(renewalAssets);
  };

  const handleAddAssetInsurance = () => {
    setIsAddAssetInsuranceModalOpen(true);
  };

  const handleCloseAssetInsuranceModal = () => {
    setIsAddAssetInsuranceModalOpen(false);
    setIsEditAssetInsuranceModalOpen(false);
    setShowInsuranceDetails(false);
    setShowRenewalList(false); // Close RenewalInsurance modal when closing any other modal
  };

  const handleEditAssetInsurance = (assetInsurance) => {
    setEditAssetInsurance(assetInsurance);
    setIsEditAssetInsuranceModalOpen(true);
  };

  const handleShowInsuranceDetails = (insuranceItem) => {
    setSelectedInsurance(insuranceItem);
    setShowInsuranceDetails(true);
  };

  const handleDeleteAssetInsurance = async (assetInsuranceId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/asset-insurances/${assetInsuranceId}`);
      setAssetInsurances(prevAssetInsurances => prevAssetInsurances.filter(assetInsurance => assetInsurance.asset_master_id !== assetInsuranceId)); // Change id to asset_master_id
      console.log("Asset insurance deleted successfully");
      updateRenewalInsurances(assetInsurances.filter(asset => asset.asset_master_id !== assetInsuranceId)); // Change id to asset_master_id
    } catch (error) {
      console.error("Error deleting asset insurance:", error);
    }
  };

  const handleUpdateAssetInsurance = async (updatedAssetInsurance) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/asset-insurances/${updatedAssetInsurance.id}`,
        updatedAssetInsurance
      );
      setAssetInsurances(prevAssetInsurances =>
        prevAssetInsurances.map(assetInsurance =>
          assetInsurance.id === updatedAssetInsurance.id ? updatedAssetInsurance : assetInsurance
        )
      );
      setIsEditAssetInsuranceModalOpen(false);
      updateRenewalInsurances(assetInsurances.map(asset => (asset.id === updatedAssetInsurance.id ? updatedAssetInsurance : asset)));
    } catch (error) {
      console.error("Error updating asset insurance:", error);
    }
  };

  const handleUpdateAssetInsurances = () => {
    toast.success("successfully uploaded");
    fetchAssetInsurances();
  }

  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assetInsurances.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} `;
  };
  return (
    <div className='d-flex w-100 bg-white h-100 '>
      <Sidebar />
      <div className='w-100 bg-white'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid bg-white">
          <ToastContainer />
          {showInsuranceDetails ? (
            <InsuranceDetails insuranceDetails={selectedInsurance} onClose={handleCloseAssetInsuranceModal} />
          ) : showRenewalList ? (
            <RenewalInsurance renewalInsurances={renewalInsurances} onClose={handleCloseAssetInsuranceModal} />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex gap-4">
                      <div className="m-0 font-weight-bold text-primary ">Asset Insurance List</div>
                      <Link className="m-0 font-weight-bold text-primary" onClick={() => setShowRenewalList(true)} >
                        Renewal Insurance List
                      </Link>
                    </div>
                    <button onClick={handleAddAssetInsurance} className="btn btn-primary">
                      Add New Insurance
                    </button>
                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Asset Picture</th>
                            <th>Asset Name</th>
                            <th>Asset Tag</th>
                            <th>Insurance Company</th>
                            <th>Policy Number</th>
                            <th>End Date</th>
                            <th>Renewal Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <style>
                            {`.hyperlink:hover {color: blue;}`}
                          </style>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">Thier is No Asset in Insurance.</td>
                            </tr>
                          ) : (
                            currentItems.map((assetInsurance) => (
                              <tr key={assetInsurance.asset_master_id}> {/* Change key to asset_master_id */}
                                <td>
                                  <img
                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${assetInsurance.assetPhoto}`}
                                    style={{ width: "90px" }} className="asset-image"
                                    alt="Asset"
                                  />
                                </td>
                                <td  className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleShowInsuranceDetails(assetInsurance)}>{assetInsurance.assetName}</td>
                                <td>{assetInsurance.assetTag}</td>
                                <td>{assetInsurance.insuranceCompanyName}</td>
                                <td>{assetInsurance.policyNumber}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDate(assetInsurance.endDate)}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDate(assetInsurance.renewalDate)}</td>

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
                                        onClick={() => handleShowInsuranceDetails(assetInsurance)}
                                      >
                                        <i className="fas fa-info-circle"></i> Details
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleEditAssetInsurance(assetInsurance)}
                                      >
                                        <i className="fas fa-edit"></i> Edit
                                      </a>
                                      {/* <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDeleteAssetInsurance(assetInsurance.asset_master_id)}
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </a> */}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from({ length: Math.ceil(assetInsurances.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(assetInsurances.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAddAssetInsuranceModalOpen && (
            <AddAssetInsuranceModal onClose={handleCloseAssetInsuranceModal} onUpdate={handleUpdateAssetInsurances} />
          )}

          {isEditAssetInsuranceModalOpen && (
            <EditAssetInsuranceModal
              assetInsurance={editAssetInsurance}
              onClose={handleCloseAssetInsuranceModal}
              onUpdate={handleUpdateAssetInsurances}
            />
          )}

        </div>
      </div>
    </div>

  )
}

export default AssetInsurance;


