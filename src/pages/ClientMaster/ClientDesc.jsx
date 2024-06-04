import React, { useState, useEffect } from "react";
import axios from "axios";
import EditClientModal from "./EditClientModal";

const ClientDesc = ({ client, onClose }) => {
    const [clientHistory, setClientHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState([]);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchclientHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/history/client/${client.id}`
                );
                setClientHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        fetchclientHistory();
    }, [client]);


    useEffect(() => {
        const fetchActiveInactiveDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_site/${client.id}`
                );
                setActiveInactiveHistory(response.data);
            } catch (error) {
                console.error("Error fetching active/inactive details:", error);
            }
        };

        const fetchActiveInactiveLastDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_site_last/${client.id}`
                );
                setActiveInactivelastOccurence(response.data);
            } catch (error) {
                console.error("Error fetching active/inactive details:", error);
            }
        };

        fetchActiveInactiveLastDetails();
        fetchActiveInactiveDetails();
    }, [client]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const renderDescriptionOrDash = (entry) => {
        return entry.event_type === 'check_in' ? entry.description : '-';
    };

    const handleEditClient = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItemsforcheckincheckouthistory = clientHistory.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const currentItemsforclienthistory = activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9 d-flex flex-column gap-3">
                        <h4 className="title-detail font-bold">
                            Client Name - {client.clientName}
                        </h4>
                        <h5 className="assetdetail">
                            <span className="assettype"> Client Address: {client.clientAddress}</span>
                        </h5>
                    </div>
                    <div className="col-md-3">
                        <div className=" p-2 barcode-inner">
                            <div className="assetbarcode d-flex flex-column gap-3">
                                <button onClick={onClose} className="btn btn-primary">
                                    Back to Client List
                                </button>
                                <button onClick={handleEditClient} className="btn btn-primary"> {/* Add onClick handler to open the edit modal */}
                                    Edit Client
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a
                                    className="nav-link active show"
                                    id="details-tab"
                                    data-toggle="tab"
                                    href="#details"
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected="true"
                                >
                                    Client Details
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="checkin-tab"
                                    data-toggle="tab"
                                    href="#checkin"
                                    role="tab"
                                    aria-controls="checkin"
                                    aria-selected="false"
                                >
                                    Transfer Asset
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="site-history"
                                    data-toggle="tab"
                                    href="#site_history"
                                    role="tab"
                                    aria-controls="site_history"
                                    aria-selected="false"
                                >
                                    client History
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-hover" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Client Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{client.clientName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Client Address:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{client.clientAddress || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Mobile:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{client.clientMobile || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Email:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{client.clientEmail || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Representative Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{client.representativeName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Designation:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{client.designation || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">GST No:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{client.gstNo || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Bank Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{client.bankName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Account No:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{client.accountNo || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">IFSC Code:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{client.ifscCode || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Bank Address:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{client.bankAddress || ""}</p>
                                                    </td>
                                                </tr>
                                                {/* Add other client details here */}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            {/* Check-in/out history */}
                            <div className="tab-pane fade" id="checkin" role="tabpanel" aria-labelledby="checkin-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Asset Name</th>
                                                    <th>Transfer From</th>
                                                    <th>Transfer TO</th>
                                                    <th>Total Quantity</th>
                                                    <th>Transfer Quantity</th>
                                                    <th>Transfer Date</th>
                                                    <th>Transporter Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItemsforcheckincheckouthistory.map((entry) => (
                                                    <tr key={entry.event_id}>
                                                        <td>{entry.assetName}</td>
                                                        <td>{entry.transferFrom}</td>
                                                        <td>{entry.location}</td>
                                                        <td>{entry.currentQuantity}</td>
                                                        <td>{entry.quantity}</td>
                                                        <td>{formatDate(entry.transferDate)}</td>
                                                        <td>{entry.selectedTransporterName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(clientHistory?.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(clientHistory?.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Add more tab panes for additional sections */}
                            {/* Employee History Tab Content */}
                            <div className="tab-pane fade" id="site_history" role="tabpanel" aria-labelledby="site-history">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Status</th>
                                                    <th>Reason </th>
                                                    <th>Date of Active/Inactive</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItemsforclienthistory.map((entry) => (
                                                    <tr key={entry.event_id}>
                                                        <td>{entry.status}</td>
                                                        <td>{entry.reason}</td>
                                                        <td>{formatDate(entry.date)}</td>
                                                        <td>{entry.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(activeInactiveHistory?.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(activeInactiveHistory?.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {isEditModalOpen && <EditClientModal
                client={client}
                onClose={handleCloseEditModal}
            />} {/* Pass onUpdate function */}
        </div>
    );
};

export default ClientDesc;
