
import React, { useState, useEffect } from "react"; import axios from "axios";
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
  const [itemsPerPage, setItemsPerPage] = useState(25);
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
      <div className='w-100 bg-white'>
        <SearchBar username={username} handleLogout={handleLogout} />
        <div className="container-fluid bg-white">
          <ToastContainer />
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
                  <div className="card-body" >
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Asset Picture</th>
                            <th>Asset Name</th>
                            <th>Asset Type</th>
                            <th>Asset Quantity</th>
                            <th>Current Location</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">Thier is No Transfer Asset .</td>
                            </tr>
                          ) : (
                            currentItems.map((asset) => (
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
                            )))}
                        </tbody>
                      </table>
                    </div>

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
              onUpdate={handleUpdateAssets}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetTransferList;
