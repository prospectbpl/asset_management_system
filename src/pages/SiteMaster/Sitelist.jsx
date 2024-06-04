import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSiteModal from "./AddSiteModal";
import SiteDesc from "./SiteDesc";
import EditSiteModal from "./EditSiteModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal"; // Import the new component
import SearchBar from "../../components/sidebar/SearchBar";
import Sidebar from "../../components/sidebar/Sidebar";
import ActiveInactiveModal from "../EmployeeMaster/ActiveInactiveModal";
import "../EmployeeMaster/Employeelist.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sitelist({ handleLogout, username }) {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showSiteDetails, setShowSiteDetails] = useState(false);
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSite, setEditSite] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteSite, setDeleteSite] = useState(null); // State to store data of site being deleted
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
  const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // State for ActiveInactiveModal

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


  const handleAddSite = () => {
    setIsAddSiteModalOpen(true);
  };

  const handleCloseSiteModal = () => {
    setIsAddSiteModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSiteDetails = (site) => {
    setSelectedSite(site);
    setShowSiteDetails(true);
  };

  const handleEditSite = (site) => {
    setEditSite(site);
    setIsEditModalOpen(true);
  };

  const handleBackToTable = () => {
    setSelectedSite(null);
    setShowSiteDetails(false);
  };

  const handleDeleteSite = (site) => {
    setDeleteSite(site);
    setIsDeleteModalOpen(true);
  };

  const handleStatusModalOpen = (site) => {
    setEditSite(site); // Set the selected employee
    setIsStatusModalOpen(true); // Open the modal
  };

  const confirmDeleteSite = async () => {
    try {
      // Perform deletion in the database
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/sites/${deleteSite.id}`);

      // Save the deleted data to delete_details table
      const deletedSite = { ...deleteSite, reason: deleteReason };
      await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedSite);

      // Remove the deleted site from the UI
      setSites((prevSites) =>
        prevSites.filter((site) => site.id !== deleteSite.id)
      );
      // Close the delete modal
      setIsDeleteModalOpen(false);

      console.log("Site deleted successfully");
    } catch (error) {
      console.error("Error deleting site:", error);
      // Optionally handle error conditions here
    }
  };

  const handleUpdateSite = async (updatedSite) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/sites/${updatedSite.id}`,
        updatedSite
      );
      setSites((prevSites) =>
        prevSites.map((site) =>
          site.id === updatedSite.id ? updatedSite : site
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating site:", error);
    }
  };

  const handleUpdateSites = async () => {
    toast.success("successfully uploaded");
    fetchSites()
  };

  const getToggleClass = (status) => {
    return status === 'active' ? 'toggle active' : 'toggle inactive';
  };


  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sites.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100 h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid">
          <ToastContainer />
          {showSiteDetails ? (
            <SiteDesc site={selectedSite} onClose={handleBackToTable} />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Site List</h6>
                    <div onClick={handleAddSite} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                      Add New Site
                    </div>
                    {/* <div className="dropdown no-arrow">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <div className="dropdown-header">Site:</div>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleAddSite}
                        >
                          Add New Site
                        </a>
                      </div>
                    </div> */}
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Site Name</th>
                          <th>Site Location</th>
                          <th>Site Manager</th>
                          <th>Contact No.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((site) => (
                          <tr key={site.id}>
                            <td>{site.siteName}</td>
                            <td>{site.siteLocation}</td>
                            <td>{site.employeeName}</td>
                            <td>{site.contactNo}</td>
                            <td>
                              <div className="d-flex align-item-center justify-content-start gap-3">
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
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                      onClick={() => handleSiteDetails(site)}
                                    >
                                      <i className="fa fa-file "></i>
                                      <span> Details</span>
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => handleEditSite(site)}
                                    >
                                      <i className="fas fa-edit"></i> Edit
                                    </a>
                                    {/* <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => handleDeleteSite(site)}
                                    >
                                      <i className="fa fa-trash"></i> Delete
                                    </a> */}
                                  </div>
                                </div>
                                <div
                                  className={getToggleClass(site.status)}
                                  onClick={() => handleStatusModalOpen(site)}
                                >
                                  <div
                                    className="ball"
                                    style={{
                                      backgroundColor:
                                        site.status === 'active'
                                          ? 'green'
                                          : 'red',
                                    }}
                                  >
                                  </div>
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
                      {Array.from({ length: Math.ceil(sites.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(sites.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link"
                          href="#"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAddSiteModalOpen && <AddSiteModal onClose={handleCloseSiteModal} onUpdateSites={handleUpdateSites} />}
          {isEditModalOpen && (
            <EditSiteModal
              site={editSite}
              onClose={handleCloseSiteModal}
              onUpdate={handleUpdateSite}
            />
          )}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            itemName={deleteSite ? deleteSite.siteName : ""}
            onDelete={confirmDeleteSite}
            onClose={() => setIsDeleteModalOpen(false)}
            deleteReason={deleteReason}
            setDeleteReason={setDeleteReason}
          />
          {isStatusModalOpen && (
            <ActiveInactiveModal
              site={editSite}
              onClose={() => setIsStatusModalOpen(false)}
              onUpdate={handleUpdateSites}
            // Other props as needed
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default Sitelist;


