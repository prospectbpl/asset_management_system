import React, { useState, useEffect } from "react";
import axios from "axios";
import EditClientModal from "./EditClientModal";

const ClientDesc = ({ client, onClose }) => {
    const [checkInHistory, setCheckInHistory] = useState([]);
    const [checkOutHistory, setCheckOutHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState([]);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    useEffect(() => {
        const fetchcheckInHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkinhistory/client/${client.id}`
                );
                setCheckInHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };
        fetchcheckInHistory();
    }, [client]);


    useEffect(() => {
        const fetchcheckOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkouthistory/client/${client.id}`
                );
                setCheckOutHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };
        fetchcheckOutHistory();
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

    const handleEditClient = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItemsforcheckinhistory = checkInHistory.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsforcheckouthistory = checkOutHistory.slice(indexOfFirstItem, indexOfLastItem);
    const currentItemsforclienthistory = activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {client.clientName}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Reprensentative : {client.representativeName}
                            </h6>
                        </div>
                        <div>
                            <p className="m-0">
                                <span> Phone: {client.clientMobile || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span> Emial: {client.clientEmail || "N/A"}</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                            <div className=" p-2 barcode-inner d-flex gap-2 align-items-center justify-content-center">
                                <button onClick={onClose} className="btn btn-outline-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </button>
                                <button onClick={handleEditClient} className="btn btn-outline-primary">
                                    <i className="fa fa-edit"></i>    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
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
                                    CheckIn Asset
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="checkout-tab"
                                    data-toggle="tab"
                                    href="#checkout"
                                    role="tab"
                                    aria-controls="checkout"
                                    aria-selected="false"
                                >
                                    CheckOut Asset
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
                            <div className="tab-pane fade active show" id="details" role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered m-0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Client Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">: {client.clientName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Client Address</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.clientAddress || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Mobile</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.clientMobile || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Email</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.clientEmail || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Representative Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.representativeName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Designation</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.designation || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">GST No</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.gstNo || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Bank Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.bankName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Account No</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.accountNo || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">IFSC Code</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.ifscCode || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Bank Address</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.bankAddress || ""}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h6 style={{ color: "#00509d" }} className="title-detail p-2 m-0 fw-bolder fw-bolder d-block">Bank Details -----</h6>
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Bank Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.bankName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Account No</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.accountNo || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">IFSC Code</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.ifscCode || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Bank Address</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {client.bankAddress || ""}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            {/* Check-in/out history */}
                            <div className="tab-pane fade" id="checkin" role="tabpanel" aria-labelledby="checkin-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped table-bordered">
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
                                                {currentItemsforcheckinhistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">Thier is No CheckIn Asset .</td>
                                                    </tr>
                                                ) : (
                                                    currentItemsforcheckinhistory.map((entry) => (
                                                        <tr key={entry.event_id}>
                                                            <td>{entry.assetName}</td>
                                                            <td>{entry.transferFrom}</td>
                                                            <td>{entry.location}</td>
                                                            <td>{entry.currentQuantity}</td>
                                                            <td>{entry.quantity}</td>
                                                            <td>{formatDate(entry.transferDate)}</td>
                                                            <td>{entry.selectedTransporterName}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(checkInHistory?.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(checkInHistory?.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Check Out  History */}
                            <div className="tab-pane fade" id="checkout" role="tabpanel" aria-labelledby="checkout-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped table-bordered">
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
                                            {currentItemsforcheckouthistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">Thier is No CheckOut Asset .</td>
                                                    </tr>
                                                ) : (
                                                currentItemsforcheckouthistory.map((entry) => (
                                                    <tr key={entry.event_id}>
                                                        <td>{entry.assetName}</td>
                                                        <td>{entry.transferFrom}</td>
                                                        <td>{entry.location}</td>
                                                        <td>{entry.currentQuantity}</td>
                                                        <td>{entry.quantity}</td>
                                                        <td>{formatDate(entry.transferDate)}</td>
                                                        <td>{entry.selectedTransporterName}</td>
                                                    </tr>
                                                 ))
                                                )}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(checkOutHistory?.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(checkOutHistory?.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Employee History Tab Content */}
                            <div className="tab-pane fade" id="site_history" role="tabpanel" aria-labelledby="site-history">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Status</th>
                                                    <th>Reason </th>
                                                    <th>Date of Active/Inactive</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {currentItemsforclienthistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">Thier is No Client History .</td>
                                                    </tr>
                                                ) : (
                                                currentItemsforclienthistory.map((entry) => (
                                                    <tr key={entry.event_id}>
                                                        <td>{entry.status}</td>
                                                        <td>{entry.reason}</td>
                                                        <td>{formatDate(entry.date)}</td>
                                                        <td>{entry.description}</td>
                                                    </tr>
                                                 ))
                                                )}
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
