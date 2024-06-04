import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeDetails = ({ employee, onClose }) => {
    const [checkInOutHistory, setCheckInOutHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
    const [siteDetails, setSiteDetails] = useState(null);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState(null);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState(null);
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    useEffect(() => {
        const fetchCheckInOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/history/employee/${employee.id}`
                );
                setCheckInOutHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        const fetchSiteDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/sites/${employee.id}`
                );
                setSiteDetails(response.data);
            } catch (error) {
                console.error("Error fetching site details:", error);
            }
        };

        const fetchActiveInactiveDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_employee/${employee.id}`
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
                    `${process.env.REACT_APP_LOCAL_URL}/active_inactive_employee_last/${employee.id}`
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
        fetchSiteDetails();
    }, [employee]);

    console.log(siteDetails);
    // Function to format the date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Function to render description or dash based on event type
    const renderDescriptionOrDash = (entry) => {
        return entry.event_type === 'check_in' ? entry.description : '-';
    };

    // Function to handle opening edit modal
    const handleEditEmployee = () => {
        setIsEditModalOpen(true);
    };

    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItemsforcheckincheckouthistory = checkInOutHistory ? checkInOutHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforemployeehistory = activeInactiveHistory ? activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9 d-flex flex-column gap-3">
                        <h4 className="title-detail font-bold">
                            Employee Name - {employee.ename}
                        </h4>
                        <p className="assetdetail">
                            <span className="assettype"> Designation - {employee.edesignation}</span> -{" "}
                        </p>
                    </div>

                    <div className="col-md-3">
                        <div className=" p-2 barcode-inner">
                            <div className="assetbarcode d-flex gap-2">
                                <button onClick={onClose} className="btn btn-primary">
                                    Back to Employee List
                                </button>
                                <button onClick={handleEditEmployee} className="btn btn-primary">
                                    Edit Employee
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
                                    Details
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
                                    id="employee-history"
                                    data-toggle="tab"
                                    href="#employee_history"
                                    role="tab"
                                    aria-controls="employee_history"
                                    aria-selected="false"
                                >
                                    Employee History
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
                                    <div className="col-md-9 ">
                                        <table className="table table-hover" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Employee Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{employee.ename}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Employee Code:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetstatus">{employee.ecode}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Designation:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{employee.edesignation}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Email:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">{employee.eemail}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Location:</p>
                                                    </td>
                                                    <td>
                                                        {siteDetails ? (
                                                            <p className="mb-0 assetbrand">{siteDetails.siteName}</p>
                                                        ) : (
                                                            <p className="mb-0 assetbrand"> - </p>
                                                        )}
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
                                    <div className="col-md-3 pt-2 text-center">
                                        <img
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/employees/${employee.epicture}`}
                                            style={{ width: "200px" }}
                                            alt="Asset"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* History Tab Content */}
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
                            {/* Employee History Tab Content */}
                            <div className="tab-pane fade" id="employee_history" role="tabpanel" aria-labelledby="employee-history">
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
                                                {currentItemsforemployeehistory.map((entry) => (
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
            {isEditModalOpen && (
                <EditEmployeeModal
                    employee={employee}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeDetails;


