import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComponentList from './AddComponentList';
import FullComponentDetails from './FullComponentDetails';
import FullEditComponentModal from './FullEditComponentModal';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FullComponentList({ handleLogout, username }) {
  const [fullcomponents, setFullComponents] = useState([]);
  const [selectedFullComponent, setSelectedFullComponent] = useState(null);
  const [showFullComponentDetails, setShowFullComponentDetails] = useState(false);
  const [isAddComponentListModalOpen, setIsAddComponentListModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFullComponent, setEditFullComponent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents`);
      setFullComponents(response.data);
    } catch (error) {
      console.error('Error fetching fullcomponents:', error);
    }
  };

  const handleAddComponentList = () => {
    setIsAddComponentListModalOpen(true);
  };

  const handleCloseComponentListModal = () => {
    setIsAddComponentListModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleFullComponentDetails = (component) => {
    setSelectedFullComponent(component);
    setShowFullComponentDetails(true);
  };

  const handleEditFullComponent = (component) => {
    setEditFullComponent(component);
    setIsEditModalOpen(true); // Open the edit modal when the "Edit" button is clicked
  };

  const handleBackToTable = () => {
    setSelectedFullComponent(null);
    setShowFullComponentDetails(false);
  };

  const handleDeleteComponentList = async (componentId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${componentId}`);
      setFullComponents((prevComponents) =>
        prevComponents.filter((component) => component.id !== componentId)
      );
      console.log("Full Component deleted successfully");
    } catch (error) {
      console.error("Error deleting full component:", error);
    }
  };

  // const handleUpdateComponentList = async (updatedComponent) => {
  //   try {
  //     await axios.put(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${updatedComponent.id}`, updatedComponent);
  //     setFullComponents((prevComponents) =>
  //       prevComponents.map((component) =>
  //         component.id === updatedComponent.id ? updatedComponent : component
  //       )
  //     );
  //     setIsEditModalOpen(false);
  //   } catch (error) {
  //     console.error("Error updating full component:", error);
  //   }
  // };


  const handleUpdateFullComponentList = (() => {
    toast.success("successfully uploaded");
    fetchComponents();
  });

  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fullcomponents.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100 h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid">
          <ToastContainer />
          {showFullComponentDetails ? (
            <FullComponentDetails
              component={selectedFullComponent}
              onClose={handleBackToTable}
            />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Full Component List
                    </h6>
                    <div className="dropdown no-arrow">
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
                        <div className="dropdown-header">Component:</div>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleAddComponentList}
                        >
                          Add New Component
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Component Name</th>
                            <th>Size</th>
                            <th>Category</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((component) => (
                            <tr key={component.id}>
                              <td>{component.componentName}</td>
                              <td>{component.size}</td>
                              <td>{component.category}</td>
                              <td>
                                <div className="btn-group">
                                  <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                  </button>
                                  <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        handleFullComponentDetails(component)
                                      }
                                    >
                                      <i className="fa fa-file "></i>
                                      <span> Details</span>
                                    </a>
                                    <a className="dropdown-item" href="#" onClick={() => handleEditFullComponent(component)}><i className="fas fa-edit"></i> Edit</a>
                                    {/* <a className="dropdown-item" href="#" onClick={() => handleDeleteComponentList(component.id)}><i className="fa fa-trash"></i> Delete</a> */}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from({ length: Math.ceil(fullcomponents.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(fullcomponents.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdateComponents={handleUpdateFullComponentList} />}
          {isEditModalOpen && <FullEditComponentModal component={editFullComponent} onClose={handleCloseComponentListModal} onUpdate={handleUpdateFullComponentList} />}
        </div>
      </div>
    </div>
  );
}

export default FullComponentList;
