import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTransporterModal from "./AddTransporterModal";
// import TransporterDesc from "./TransporterDesc";
// import EditTransporterModal from './EditTransporterModal';
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import SearchBar from "../../components/sidebar/SearchBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TransporterList({ handleLogout, username }) {
    const [transporters, setTransporters] = useState([]);
    const [selectedTransporter, setSelectedTransporter] = useState(null);
    const [showTransporterDetails, setShowTransporterDetails] = useState(false);
    const [isAddTransporterModalOpen, setIsAddTransporterModalOpen] = useState(false);
    // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // const [editTransporter, setEditTransporter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [deleteTransporter, setDeleteTransporter] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteReason, setDeleteReason] = useState("");

    useEffect(() => {
        fetchTransporters();
    }, []);

    const fetchTransporters = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/transporters`);
            setTransporters(response.data);
        } catch (error) {
            console.error("Error fetching transporters:", error);
        }
    };

    const handleAddTransporter = () => {
        setIsAddTransporterModalOpen(true);
    };

    const handleCloseTransporterModal = () => {
        setIsAddTransporterModalOpen(false);
        // setIsEditModalOpen(false);
    };

    const handleTransporterDetails = (transporter) => {
        setSelectedTransporter(transporter);
        setShowTransporterDetails(true);
    };

    // const handleEditTransporterClick = (transporter) => {
    //     setEditTransporter(transporter);
    //     setIsEditModalOpen(true);
    // };

    const handleEditTransporterClose = () => {
        setSelectedTransporter(null);
    };

    const handleBackToTable = () => {
        setSelectedTransporter(null);
        setShowTransporterDetails(false);
    };

    const handleDeleteTransporter = (transporter) => {
        setDeleteTransporter(transporter);
        setIsDeleteModalOpen(true);
    };

    const handleUpdateTransporter = async (updatedTransporter) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/transporters/${updatedTransporter.id}`, updatedTransporter);
            console.log("Transporter updated:", response.data);
            const updatedTransporters = transporters.map(transporter => (transporter.id === updatedTransporter.id ? response.data : transporter));
            setTransporters(updatedTransporters);
        } catch (error) {
            console.error("Error updating transporter:", error);
        }
    };

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/transporters/${deleteTransporter.id}`);

            const deletedTransporter = { ...deleteTransporter, reason: deleteReason };
            await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedTransporter);

            setTransporters((prevTransporters) =>
                prevTransporters.filter((transporter) => transporter.id !== deleteTransporter.id)
            );
            setIsDeleteModalOpen(false);

            console.log("Transporter deleted successfully");
        } catch (error) {
            console.error("Error deleting transporter:", error);
        }
    };

    const handleUpdateTransporters = async () => {
        toast.success("successfully uploaded");
        fetchTransporters();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transporters.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100'>
                <SearchBar username={username} handleLogout={handleLogout} />
                <div className="container-fluid">
                <ToastContainer/>
                    {!showTransporterDetails && (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Transporter List
                                        </h6>
                                        <button onClick={handleAddTransporter} className="btn btn-primary">
                                            Add New Transporter
                                        </button>
                                    </div>
                                    <div
                                        className="card-body"
                                        style={{ height: "calc(100% - 40px)" }}
                                    >
                                        <table
                                            id="data"
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Company Name</th>
                                                    <th>Company Address</th>
                                                    <th>Person Name</th>
                                                    <th>Phone No.</th>
                                                    <th>City</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((transporter, index) => (
                                                    <tr key={index}>
                                                        <td>{transporter.transporterCompanyName}</td>
                                                        <td>{transporter.transporterCompanyAddress}</td>
                                                        <td>{transporter.transporterPersonName}</td>
                                                        <td>{transporter.transporterPersonPhone}</td>
                                                        <td>{transporter.transporterCityName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(transporters.length / itemsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(transporters.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* {showTransporterDetails && selectedTransporter && (
                        <TransporterDesc
                            transporter={selectedTransporter}
                            onClose={handleBackToTable}
                        />
                    )} */}
                    {/* {selectedTransporter && !showTransporterDetails && (
                        <EditTransporterModal transporter={selectedTransporter} onClose={handleEditTransporterClose} onUpdate={handleUpdateTransporter} />
                    )} */}
                    {isAddTransporterModalOpen && <AddTransporterModal onClose={handleCloseTransporterModal} onUpdateTransporters={handleUpdateTransporters} />}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        itemName={deleteTransporter ? deleteTransporter.transporterCompanyName : ""}
                        onDelete={handleDeleteConfirmation}
                        onClose={() => setIsDeleteModalOpen(false)}
                        deleteReason={deleteReason}
                        setDeleteReason={setDeleteReason}
                    />
                </div>
            </div>
        </div>
    );
}

export default TransporterList;
