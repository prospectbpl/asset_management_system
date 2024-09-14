import React, { useState, useEffect } from "react";
import axios from "axios";
import EditSiteModal from "./EditSiteModal";

const SiteDesc = ({ site, onClose }) => {

    const [checkInHistory, setCheckInHistory] = useState([]);
    const [checkOutHistory, setCheckOutHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState(null);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState(null);
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);



    useEffect(() => {
        const fetchCheckInHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkinhistory/site/${site.id}`
                );
                setCheckInHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        const fetchCheckOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkouthistory/site/${site.id}`
                );
                setCheckOutHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        const fetchActiveInactiveDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_site/${site.id}`
                );
                // Assuming the response contains the required data
                // Adjust this based on the actual structure of your response
                setActiveInactiveHistory(response.data);
            } catch (error) {
                console.error("Error fetching active/inactive details:", error);
            }
        };

        const fetchActiveInactiveLastDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_site_last/${site.id}`
                );
                // Assuming the response contains the required data
                // Adjust this based on the actual structure of your response
                setActiveInactivelastOccurence(response.data);
            } catch (error) {
                console.error("Error fetching active/inactive details:", error);
            }
        };

        fetchActiveInactiveLastDetails();
        fetchActiveInactiveDetails();
        fetchCheckInHistory();
        fetchCheckOutHistory();
    }, [site]);

    // Function to format the date from '2024-02-27T18:30:00.000Z' to '2024-02-27'
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Function to handle opening edit modal
    const handleEditSite = () => {
        setIsEditModalOpen(true);
    };
    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItemsforcheckinhistory = checkInHistory ? checkInHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforcheckouthistory = checkOutHistory ? checkOutHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforsitehistory = activeInactiveHistory ? activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {site.siteName}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Site Id : {site.siteID}
                            </h6>
                        </div>
                        <div>
                            <p className="m-0">
                                <span> Type: {site.siteType || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span> Site Manager: {site.employeeName || "N/A"}</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                            <div className=" p-2 barcode-inner d-flex gap-2 align-items-center justify-content-center">
                                <button onClick={onClose} className="btn btn-outline-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </button>
                                <button onClick={handleEditSite} className="btn btn-outline-primary">
                                    <i className="fa fa-edit"></i>    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" id="siteTab" role="tablist">
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
                                    Site Details
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
                                    site History
                                </a>
                            </li>
                            {/* Add more tabs as needed */}
                        </ul>
                        <div className="tab-content" id="siteTabContent">
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div class="row">
                                    <div class="col-md-12 ">
                                        {/* Table for Asset Details */}
                                        <table className="table table-bordered"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Name</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">: {site.siteName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site ID</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetstatus">
                                                            : {site.siteID}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Type</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetserial">: {site.siteType}</p>
                                                    </td>
                                                </tr>

                                                {!(site.siteType === 'Branch Office' || site.siteType === 'Head Office') && (
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 font-bold">Project Name</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0 assetbrand">: {site.projectName || "N/A"}</p>
                                                        </td>
                                                    </tr>
                                                )}

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Godown</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetpurchasedate">
                                                            : {site.godown}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Contact No</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetcost">: {site.contactNo}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Manager</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetlocation">: {site.employeeName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Location</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">: {site.siteLocation}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site State</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">: {site.stateName}</p>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Status</p>
                                                    </td>
                                                    <td>
                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 assetserial">{activeInactivelastOccurence.status}</p>
                                                        ) : (
                                                            <p className="mb-0 assetserial">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold"> Date of {activeInactivelastOccurence ? activeInactivelastOccurence.status : 'Loading...'}  </p>
                                                    </td>
                                                    <td>

                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 assetserial">{formatDate(activeInactivelastOccurence.date)}</p>
                                                        ) : (
                                                            <p className="mb-0 assetserial">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Reason for {activeInactivelastOccurence ? activeInactivelastOccurence.status : 'Loading...'} </p>
                                                    </td>
                                                    <td>
                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 assetserial">{activeInactivelastOccurence.reason}</p>
                                                        ) : (
                                                            <p className="mb-0 assetserial">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* check in history  */}
                            <div className="tab-pane fade" id="checkin" role="tabpanel" aria-labelledby="checkin-tab">
                                <div className="row">
                                    <div className="col-md-12 ">

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
                            {/* check out history  */}
                            <div className="tab-pane fade" id="checkout" role="tabpanel" aria-labelledby="checkout-tab">
                                <div className="row">
                                    <div className="col-md-12 ">
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

                            {/* Add more tab panes for additional sections */}
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
                                                {currentItemsforsitehistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">Thier is No CheckIn Asset .</td>
                                                    </tr>
                                                ) : (
                                                    currentItemsforsitehistory.map((entry) => (
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
            {isEditModalOpen && (
                <EditSiteModal
                    site={site}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default SiteDesc;
