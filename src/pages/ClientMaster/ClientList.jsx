import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClientModal from './AddClientModal';
import ClientDesc from './ClientDesc';
import EditClientModal from './EditClientModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import ActiveInactiveModal from '../EmployeeMaster/ActiveInactiveModal';
import "../EmployeeMaster/Employeelist.css";
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css';

function ClientList({ handleLogout, username }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [deleteClient, setDeleteClient] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [isClientAdded, setIsClientAdded] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = () => {
    setIsAddClientModalOpen(true);
  };

  const handleCloseClientModal = () => {
    setIsAddClientModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleClientDetails = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleEditClient = (client) => {
    setEditClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client) => {
    setDeleteClient(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteClient = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/clients/${deleteClient.id}`);
      const deletedClient = { ...deleteClient, reason: deleteReason };
      await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedClient);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== deleteClient.id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting Client:", error);
    }
  };

  const handleUpdateClient = async (updatedClient) => {
    try {
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/clients/${updatedClient.id}`, updatedClient);
      setClients((prevClients) =>
        prevClients.map((client) => (client.id === updatedClient.id ? updatedClient : client))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleUpdateClients = () => {
    toast.success('Data uploaded successfully'); // Display toast notification
    fetchClients()
  };

  return (
    <div className='d-flex w-100 bg-white h-100 '>
      <Sidebar />
      <div className='w-100 bg-white'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid bg-white">
          <ToastContainer />
          {showClientDetails ? (
            <ClientDesc client={selectedClient} onClose={() => setShowClientDetails(false)} />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Client List</h6>
                    <div
                      onClick={handleAddClient}
                      className='btn btn-primary'
                    >
                      Add New Client
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Client Name</th>
                            <th>Client Address</th>
                            <th>Mobile No.</th>
                            <th>Email ID.</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <style>
                            {`.hyperlink:hover {color: blue;}`}
                          </style>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">Thier is No Client.</td>
                            </tr>
                          ) : (
                            currentItems.map((client) => (
                              <tr key={client.id}>
                                <td className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleClientDetails(client)}>{client.clientName}</td>
                                <td>{client.clientAddress}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{client.clientMobile}</td>
                                <td >{client.clientEmail}</td>
                                <td>
                                  <div className="d-flex align-item-center justify-content-start gap-3">
                                    <div className="btn-group">
                                      <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                      </button>
                                      <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleClientDetails(client)}>
                                          <i className="fa fa-file "></i> Detailss
                                        </a>
                                        <a className="dropdown-item" href="#" onClick={() => handleEditClient(client)}>
                                          <i className="fas fa-edit"></i> Edit
                                        </a>
                                        {/* <a className="dropdown-item" href="#" onClick={() => handleDeleteClient(client)}>
                                      <i className="fa fa-trash"></i> Delete
                                    </a> */}
                                      </div>
                                    </div>
                                    {/* <div className={getToggleClass(client.status)} onClick={() => handleStatusModalOpen(client)}>
                                  <div className="ball" style={{ backgroundColor: client.status === 'active' ? 'green' : 'red' }}></div>
                                </div> */}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from({ length: Math.ceil(clients.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(clients.length / itemsPerPage) && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAddClientModalOpen && <AddClientModal onClose={handleCloseClientModal} onUpdate={handleUpdateClients} />}
          {isEditModalOpen && <EditClientModal client={editClient} onClose={handleCloseClientModal} onUpdate={handleUpdateClients} />}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            itemName={deleteClient ? deleteClient.clientName : ""}
            onDelete={confirmDeleteClient}
            onClose={() => setIsDeleteModalOpen(false)}
            deleteReason={deleteReason}
            setDeleteReason={setDeleteReason}
          />
          {isStatusModalOpen && (
            <ActiveInactiveModal
              client={editClient}
              onClose={() => setIsStatusModalOpen(false)}
              onUpdate={handleUpdateClients}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientList;
