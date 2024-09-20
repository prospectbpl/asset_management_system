import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVendor from "./AddVendor";
import VendorDesc from "./VendorDesc";
import EditVendor from './EditVendor';
import DeleteConfirmationModal from "../DeleteConfirmationModal"; // Import the new component
import SearchBar from "../../components/sidebar/SearchBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Vendorlist({ handleLogout, username }) {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showVendorDetails, setShowVendorDetails] = useState(false);
    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editVendor, setEditVendor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [deleteVendor, setDeleteVendor] = useState(null); // State to store data of vendor being deleted
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage delete confirmation modal
    const [deleteReason, setDeleteReason] = useState(""); // State to store deletion reason

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const handleAddVendor = () => {
        setIsAddVendorModalOpen(true);
    };

    const handleCloseVendorModal = () => {
        setIsAddVendorModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setShowVendorDetails(true);
    };

    const handleEditVendorClick = (vendor) => {
        setEditVendor(vendor);
        setSelectedVendor(vendor); // Update selectedVendor state
        setIsEditModalOpen(true);
    };

    const handleEditVendorClose = () => {
        setSelectedVendor(null);
    };

    const handleBackToTable = () => {
        setSelectedVendor(null);
        setShowVendorDetails(false);
    };

    const handleDeleteVendor = (vendor) => {
        setDeleteVendor(vendor);
        setIsDeleteModalOpen(true);
    };

    const handleUpdateVendor = async (updatedVendor) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/vendors/${updatedVendor.id}`, updatedVendor);
            console.log("Vendor updated:", response.data);
            const updatedVendors = vendors.map(vendor => (vendor.id === updatedVendor.id ? response.data : vendor));
            setVendors(updatedVendors);
        } catch (error) {
            console.error("Error updating vendor:", error);
        }
    };

    const handleDeleteConfirmation = async () => {
        try {
            // Perform deletion in the database
            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/vendors/${deleteVendor.id}`);

            // Save the deleted data to delete_details table
            const deletedVendor = { ...deleteVendor, reason: deleteReason };
            await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedVendor);

            // Remove the deleted site from the UI
            setVendors((prevVendors) =>
                prevVendors.filter((vendor) => vendor.id !== deleteVendor.id)
            );
            // Close the delete modal
            setIsDeleteModalOpen(false);

            console.log("Vendor deleted successfully");
        } catch (error) {
            console.error("Error deleting vendor:", error);
        }
    };

    const handleUpdateVendors = () => {
        toast.success("successfully uploaded");
        fetchVendors();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vendors.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='d-flex w-100 bg-white h-100 '>
            <Sidebar />
            <div className='w-100 bg-white'>
                <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid bg-white">
                    <ToastContainer />
                    {!showVendorDetails && (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Vendor List
                                        </h6>
                                        <div onClick={handleAddVendor} className="btn btn-primary">
                                            Add New Vendor
                                        </div>
                                    </div>
                                    <div
                                        className="card-body">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Company Name</th>
                                                        <th>Company Address</th>
                                                        <th>Mobile No.</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <style>
                                                        {`.hyperlink:hover {color: blue;}`}
                                                    </style>
                                                    {currentItems.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Thier is No Vendor .</td>
                                                        </tr>
                                                    ) : (
                                                        currentItems.map((vendor, index) => (
                                                            <tr key={index}>
                                                                <td className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleVendorDetails(vendor)}>{vendor.vendorCompanyName}</td>
                                                                <td>{vendor.vendorAddress}</td>
                                                                <td>{vendor.contactPersonMobile}</td>
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                                                            <a className="dropdown-item" href="#" onClick={() => handleVendorDetails(vendor)}><i className="fa fa-file"></i> Detail</a>
                                                                            <a className="dropdown-item" href="#" onClick={() => handleEditVendorClick(vendor)}><i className="fas fa-edit"></i> Edit</a>
                                                                            {/* <a className="dropdown-item" href="#" onClick={() => handleDeleteVendor(vendor)}><i className="fa fa-trash"></i> Delete</a> */}
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
                                            {Array.from({ length: Math.ceil(vendors.length / itemsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(vendors.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showVendorDetails && selectedVendor && (
                        <VendorDesc
                            vendor={selectedVendor}
                            onClose={handleBackToTable}
                        />
                    )}
                    {selectedVendor && !showVendorDetails && (
                        <EditVendor vendor={selectedVendor} onClose={handleEditVendorClose} onUpdate={handleUpdateVendors} />
                    )}
                    {isAddVendorModalOpen && <AddVendor onClose={handleCloseVendorModal} onUpdate={handleUpdateVendors} />}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        itemName={deleteVendor ? deleteVendor.vendorCompanyName : ""}
                        onDelete={handleDeleteConfirmation}
                        onClose={() => setIsDeleteModalOpen(false)}
                        deleteReason={deleteReason} // Corrected prop name
                        setDeleteReason={setDeleteReason} // Corrected prop name
                    />
                </div>
            </div>
        </div>
    );
}

export default Vendorlist;
