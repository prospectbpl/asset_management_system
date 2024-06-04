import React, { useState, useEffect } from "react";
import axios from "axios";
import EditSiteModal from "./EditSiteModal";

const SiteDesc = ({ site, onClose }) => {

    const [checkInOutHistory, setCheckInOutHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState(null);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState(null);
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);



    useEffect(() => {
        const fetchCheckInOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/history/site/${site.id}`
                );
                setCheckInOutHistory(response.data);
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
        fetchCheckInOutHistory();
    }, [site]);

    // Function to format the date from '2024-02-27T18:30:00.000Z' to '2024-02-27'
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Function to render description or dash based on event type
    const renderDescriptionOrDash = (entry) => {
        if (entry.event_type === 'check_in') {
            return entry.description;
        } else {
            return '-';
        }
    };
    // Function to handle opening edit modal
    const handleEditSite = () => {
        setIsEditModalOpen(true);
    };
    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItemsforcheckincheckouthistory = checkInOutHistory ? checkInOutHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforsitehistory = activeInactiveHistory ? activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9">
                        <p className="title-detail font-bold">
                            Site Name - {site.siteName}
                        </p>
                        <p className="assetdetail">
                            Site Manager - {site.employeeName}
                        </p>
                    </div>
                    <div className="col-md-3">
                        <div className=" p-2 barcode-inner">
                            <div className="assetbarcode d-flex gap-2">
                                <button onClick={onClose} className="btn btn-primary">
                                    Back to Site List
                                </button>
                                <button onClick={handleEditSite} className="btn btn-primary">
                                    Edit Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    Check In Asset
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
                                    <div class="col-md-9 ">
                                        {/* Table for Asset Details */}
                                        <table
                                            class="table table-hover"
                                            cellpadding="0"
                                            cellspacing="0"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Name</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{site.siteName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site ID:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetstatus">
                                                            {site.siteID}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Type:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetserial">{site.siteType}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Project Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetbrand">{site.projectName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Godown:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetpurchasedate">
                                                            {site.godown}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Contact No:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetcost">{site.contactNo}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Manager:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetlocation">{site.employeeName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site Location:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">{site.siteLocation}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Site State:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">{site.stateName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Status:</p>
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
                                                        <p className="mb-0 font-bold"> Date of {activeInactivelastOccurence ? activeInactivelastOccurence.status : 'Loading...'}  :</p>
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
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* check in check out history  */}
                            <div className="tab-pane fade" id="checkin" role="tabpanel" aria-labelledby="checkin-tab">
                                <div className="row">
                                    <div className="col-md-12 ">

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
                                            {Array.from({ length: Math.ceil(checkInOutHistory?.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(checkInOutHistory?.length / itemsPerPage) && 'disabled'}`}>
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
                                                {currentItemsforsitehistory.map((entry) => (
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
            </div>\
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
