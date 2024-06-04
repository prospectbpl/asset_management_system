import React, { useState, useEffect } from "react";
import axios from "axios";

const SitePopUp = ({ action, siteId, description, onClose }) => {
    const [checkInOutHistory, setCheckInOutHistory] = useState([]);
    const [siteDetails, setSiteDetails] = useState({});
    const [activeSection, setActiveSection] = useState("details");

    useEffect(() => {
        const fetchCheckInOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/checkincheckout/history/site/${siteId}`
                );
                setCheckInOutHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        const fetchSiteDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/particular_sites/${siteId}`
                );
                setSiteDetails(response.data);
            } catch (error) {
                console.error("Error fetching site details:", error);
            }
        };

        fetchCheckInOutHistory();
        fetchSiteDetails();
    }, [siteId]);

    const handleClose = () => {
        onClose();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const renderDescriptionOrDash = (entry) => {
        if (entry.event_type === 'check_in') {
            return entry.description;
        } else {
            return '-';
        }
    };

    return (
        <div
            id="addSiteModal"
            className="modal fade show"
            role="dialog"
            style={{ display: "block", paddingRight: "17px" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Show Site Details</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                        {activeSection === "details" && (
                            <div className="row">
                                <div className="col-md-12 pt-3">
                                    <h5>Site Details</h5>
                                    <p>Site ID: {siteId}</p>
                                    <p>Site Name: {siteDetails.siteName}</p>
                                    <p>Location: {siteDetails.siteLocation}</p>
                                    <p>Manager: {siteDetails.siteManager}</p>
                                    <p>Contact No: {siteDetails.contactNo}</p>
                                </div>
                            </div>
                        )}
                        {activeSection === "history" && (
                            <div className="row">
                                <div className="col-md-12 pt-3">
                                    <h5>Check-in/out History</h5>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Asset Picture</th>
                                                <th>Asset Name</th>
                                                <th>Asset Tag</th>
                                                <th>Date</th>
                                                <th>Event Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {checkInOutHistory.map((entry) => (
                                                <tr key={entry.event_id}>
                                                    <td>
                                                        <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${entry.asset_picture}`} style={{ width: "100px" }} alt="Asset" />
                                                    </td>
                                                    <td>{entry.asset_name}</td>
                                                    <td>{entry.asset_tag}</td>
                                                    <td>{entry.event_type === 'check_in' ? formatDate(entry.checkin_date) || '-' : formatDate(entry.checkout_date) || '-'}</td>
                                                    <td>{entry.event_type}</td>
                                                    <td>{renderDescriptionOrDash(entry)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={() => setActiveSection("details")}
                        >
                            Show Details
                        </button>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={() => setActiveSection("history")}
                        >
                            Show History
                        </button>
                        <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitePopUp;
