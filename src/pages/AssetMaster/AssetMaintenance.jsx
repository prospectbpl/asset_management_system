import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMaintenanceData from "./AddMaintenanceData";
import EditMaintenanceModal from "./EditMaintenanceModal";
import MaintenanceDetailsModal from "./MaintenanceDetailsModal";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssetMaintenance({ handleLogout, username }) {
  const [maintenance, setMaintenance] = useState([]);
  const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  useEffect(() => {
    fetchMaintenance();
  }, []);
  const fetchMaintenance = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);
      const sortedMaintenance = response.data.sort((a, b) => {
        // Sort by task: 'unfinished' first, then by task: 'finished'
        if (a.task === 'unfinished' && b.task === 'finished') {
          return -1;
        } else if (a.task === 'finished' && b.task === 'unfinished') {
          return 1;
        } else {
          return 0;
        }
      });
      setMaintenance(sortedMaintenance);
    } catch (error) {
      console.error("Error fetching maintenance:", error);
    }
  };



  const handleAddMaintenance = () => {
    setIsAddMaintenanceModalOpen(true);
  };

  const handleCloseMaintenanceModal = () => {
    setIsAddMaintenanceModalOpen(false);
    setIsEditModalOpen(false);
    setShowMaintenanceDetails(false);
  };

  const handleEditMaintenance = (maintenanceItem) => {
    setEditMaintenance(maintenanceItem);
    setIsEditModalOpen(true);
  };

  const handleDeleteMaintenance = async (maintenanceId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/maintenance/${maintenanceId}`);
      setMaintenance((prevMaintenance) => prevMaintenance.filter((maintenanceItem) => maintenanceItem.id !== maintenanceId));
      console.log("Maintenance deleted successfully");
    } catch (error) {
      console.error("Error deleting maintenance:", error);
    }
  };

  const handleUpdateMaintenance = async (updatedMaintenance) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/maintenance/${updatedMaintenance.id}`,
        updatedMaintenance
      );
      setMaintenance((prevMaintenance) =>
        prevMaintenance.map((maintenanceItem) =>
          maintenanceItem.id === updatedMaintenance.id ? updatedMaintenance : maintenanceItem
        )
      );
      setIsEditModalOpen(false);
      console.log("Maintenance updated successfully");
    } catch (error) {
      console.error("Error updating maintenance:", error);
    }
  };

  const handleShowMaintenanceDetails = (maintenanceItem) => {
    setSelectedMaintenance(maintenanceItem);
    setShowMaintenanceDetails(true);
  };

  const handleFinishTask = async (maintenanceId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/maintenance/task/${maintenanceId}`,
        { task: 'finished' }
      );
      setMaintenance((prevMaintenance) =>
        prevMaintenance.map((maintenanceItem) =>
          maintenanceItem.id === maintenanceId ? { ...maintenanceItem, task: 'finished' } : maintenanceItem
        )
      );
      console.log("Task finished successfully");
    } catch (error) {
      console.error("Error finishing task:", error);
    }
  };

  const onUpdateMaintenances = () => {
    toast.success("successfully uploaded");
    fetchMaintenance();
  }

  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = maintenance.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100 bg-white h-100 '>
      <Sidebar />
      <div className='w-100 bg-white'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid bg-white">
          <ToastContainer />
          {showMaintenanceDetails ? (
            <MaintenanceDetailsModal MaintenanceDetailsModal={selectedMaintenance} onClose={handleCloseMaintenanceModal} />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Maintenance List</h6>
                    <div onClick={handleAddMaintenance} className="btn btn-primary">
                      Add Maintenance
                    </div>

                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Asset Picture</th>
                            <th>Asset Name</th>
                            <th>Asset Tag</th>
                            <th>Service Type</th>
                            <th>Provider Name</th>
                            <th>Issue in Asset</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <style>
                            {`.hyperlink:hover {color: blue;}`}
                          </style>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">Thier is No Maintenance.</td>
                            </tr>
                          ) : (
                            currentItems.map((maintenanceItem) => (
                              <tr key={maintenanceItem.id}>
                                <td>
                                  <img
                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${maintenanceItem.assetPhoto}`}
                                    style={{ width: "90px" }} className="asset-image"
                                    alt="Asset"
                                  />
                                </td>
                                <td className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleShowMaintenanceDetails(maintenanceItem)}>{maintenanceItem.assetName}</td>
                                <td>{maintenanceItem.assetTag}</td>
                                <td>{maintenanceItem.serviceType}</td>
                                <td>
                                  {maintenanceItem.serviceType === "In-house"
                                    ? maintenanceItem.employeeName
                                    : maintenanceItem.serviceName || maintenanceItem.serviceAddress}
                                </td>
                                <td>{maintenanceItem.issueInAsset}</td>
                                <td >
                                  <div className="btn-group ">
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
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleShowMaintenanceDetails(maintenanceItem)}
                                      >
                                        <i className="fas fa-info-circle"></i> Details
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => handleEditMaintenance(maintenanceItem)}
                                      >
                                        <i className="fas fa-edit"></i> Edit
                                      </a>

                                      {maintenanceItem.task === 'unfinished' && (
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => handleFinishTask(maintenanceItem.id)}
                                        >
                                          Finish Task
                                        </a>
                                      )}
                                    </div>
                                    <div style={{ marginTop: "10px", marginLeft: "3px", width: '10px', height: '10px', borderRadius: '50%', backgroundColor: maintenanceItem.task === 'finished' ? 'blue' : 'red' }}></div>
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
                      {Array.from({ length: Math.ceil(maintenance.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(maintenance.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAddMaintenanceModalOpen && <AddMaintenanceData onClose={handleCloseMaintenanceModal} onUpdate={onUpdateMaintenances} />}
          {isEditModalOpen && (
            <EditMaintenanceModal
              maintenance={editMaintenance}
              onClose={handleCloseMaintenanceModal}
              onUpdate={handleUpdateMaintenance}
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default AssetMaintenance;
