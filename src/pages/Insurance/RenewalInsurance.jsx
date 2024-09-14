import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAssetInsuranceModal from "./AddAssetInsuranceModal";
import AddRenwalInsurence from "./AddRenwalInsurence";
import InsuranceDetails from "./InsuranceDetails";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../style1.css';

function RenewalInsurance({ renewalInsurances, onClose }) {
  const [assetInsurances, setAssetInsurances] = useState([]);
  const [isAddAssetInsuranceModalOpen, setIsAddAssetInsuranceModalOpen] = useState(false);
  const [isEditAssetInsuranceModalOpen, setIsEditAssetInsuranceModalOpen] = useState(false);
  const [editAssetInsurance, setEditAssetInsurance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  useEffect(() => {
    fetchAssetInsurances();
  }, []);
  const fetchAssetInsurances = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset-insurances`);
      setAssetInsurances(response.data);
    } catch (error) {
      console.error("Error fetching asset insurances:", error);
    }
  };



  const handleAddAssetInsurance = () => {
    setIsAddAssetInsuranceModalOpen(true);
  };

  const handleCloseAssetInsuranceModal = () => {
    setIsAddAssetInsuranceModalOpen(false);
    setIsEditAssetInsuranceModalOpen(false);
    setShowInsuranceDetails(false);
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
      setAssetInsurances((prevAssetInsurances) => prevAssetInsurances.filter((assetInsurance) => assetInsurance.id !== assetInsuranceId));
      console.log("Asset insurance deleted successfully");
    } catch (error) {
      console.error("Error deleting asset insurance:", error);
    }
  };

  const handleUpdateAssetInsurance = () => {
    toast.success("successfully uploaded");
    fetchAssetInsurances();
  }

  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assetInsurances.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBackToInsurance = () => {
    onClose(); // Call the onClose function passed from the parent component
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer />
      {showInsuranceDetails ? (
        <InsuranceDetails insuranceDetails={selectedInsurance} onClose={handleCloseAssetInsuranceModal} />
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <div className='d-flex gap-4'>
                  <div className="m-0 font-weight-bold text-primary" >
                    Renewal Insurance List
                  </div>
                  <Link onClick={handleBackToInsurance} className="m-0 font-weight-bold text-primary">
                    Asset Insurance List
                  </Link>

                </div>
                <button onClick={handleAddAssetInsurance} className="btn btn-primary"> Add New Insurance </button>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
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

                    {renewalInsurances.map((assetInsurance) => (
                      <tr key={assetInsurance.id}>
                        <td><img
                          src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${assetInsurance.assetPhoto}`}
                          style={{ width: "90px" }}
                          alt="Asset"
                        />
                        </td>
                        <td>{assetInsurance.assetName}</td>
                        <td>{assetInsurance.assetTag}</td>
                        <td>{assetInsurance.insuranceCompanyName}</td>
                        <td>{assetInsurance.policyNumber}</td>
                        <td style={{whiteSpace:"nowrap"}}>{formatDate(assetInsurance.endDate)}</td>
                        <td style={{whiteSpace:"nowrap"}}>{formatDate(assetInsurance.renewalDate)}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-primary dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i
                                className="fa fa-ellipsis-h"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <div
                              className="dropdown-menu actionmenu"
                              x-placement="bottom-start"
                            >
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  handleShowInsuranceDetails(assetInsurance)
                                }
                              >
                                <i className="fas fa-info-circle"></i>{" "}
                                Details
                              </button>
                              <button
                                className="dropdown-item"
                                onClick={() => handleEditAssetInsurance(assetInsurance)}
                              >
                                <i className="fas fa-edit"></i> Renewed
                              </button>
                              {/* <button
                                    className="dropdown-item"
                                    onClick={() => handleDeleteAssetInsurance(assetInsurance.id)}
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </button> */}
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
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                  </li>
                  {Array.from({ length: Math.ceil(assetInsurances.length / itemsPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                      <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(assetInsurances.length / itemsPerPage) && 'disabled'}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddAssetInsuranceModalOpen && (
        <AddAssetInsuranceModal onClose={handleCloseAssetInsuranceModal} onUpdate={handleUpdateAssetInsurance} />
      )}

      {isEditAssetInsuranceModalOpen && (
        <AddRenwalInsurence
          assetInsurance={editAssetInsurance}
          onClose={handleCloseAssetInsuranceModal}
          onUpdate={handleUpdateAssetInsurance}
        />
      )}
    </div>

  );
}

export default RenewalInsurance;
