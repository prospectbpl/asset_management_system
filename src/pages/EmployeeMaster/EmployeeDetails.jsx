import React, { useState, useEffect } from "react";
import axios from "axios";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeDetails = ({ employee, onClose }) => {
    const [checkInHistory, setCheckInHistory] = useState([]);
    const [checkOutHistory, setCheckOutHistory] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
    const [siteDetails, setSiteDetails] = useState(null);
    const [activeInactiveHistory, setActiveInactiveHistory] = useState(null);
    const [activeInactivelastOccurence, setActiveInactivelastOccurence] = useState(null);
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);


    useEffect(() => {
        const fetchCheckInHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkinhistory/employee/${employee.id}`
                );
                setCheckInHistory(response.data);
            } catch (error) {
                console.error("Error fetching check-in/out history:", error);
            }
        };

        const fetchCheckOutHistory = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/api/asset/checkouthistory/employee/${employee.id}`
                );
                setCheckOutHistory(response.data);
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
        fetchCheckOutHistory();
        fetchCheckInHistory();
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
    const currentItemsforcheckinhistory = checkInHistory ? checkInHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforcheckOuthistory = checkOutHistory ? checkOutHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const currentItemsforemployeehistory = activeInactiveHistory ? activeInactiveHistory.slice(indexOfFirstItem, indexOfLastItem) : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {employee.ename}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Employee Id : {employee.ecode}
                            </h6>
                        </div>
                        <div>
                            <p className="m-0">
                                <span> Phone: {employee.employeePhone || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span> Emial: {employee.eemail || "N/A"}</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                            <div className=" p-2 barcode-inner d-flex gap-2 align-items-center justify-content-center">
                                <button onClick={onClose} className="btn btn-outline-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </button>
                                <button onClick={handleEditEmployee} className="btn btn-outline-primary">
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
                                        <table className="table table-striped table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Employee Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {employee.ename}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Employee Code</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {employee.ecode}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Designation</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {employee.edesignation}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Email</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {employee.eemail}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Phone No.</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {employee.employeePhone}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Location</p>
                                                    </td>
                                                    <td>
                                                        {siteDetails ? (
                                                            <p className="mb-0 assetbrand">: {siteDetails.siteName}</p>
                                                        ) : (
                                                            <p className="mb-0 assetbrand"> - </p>
                                                        )}
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Status</p>
                                                    </td>
                                                    <td>
                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 ">: {activeInactivelastOccurence.status}</p>
                                                        ) : (
                                                            <p className="mb-0 ">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold"> Date of {activeInactivelastOccurence ? activeInactivelastOccurence.status : 'Loading...'}  </p>
                                                    </td>
                                                    <td>

                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 ">: {formatDate(activeInactivelastOccurence.date)}</p>
                                                        ) : (
                                                            <p className="mb-0 ">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Reason for {activeInactivelastOccurence ? activeInactivelastOccurence.status : 'Loading...'} </p>
                                                    </td>
                                                    <td>
                                                        {activeInactivelastOccurence ? (
                                                            <p className="mb-0 ">: {activeInactivelastOccurence.reason}</p>
                                                        ) : (
                                                            <p className="mb-0 ">Loading...</p>
                                                        )}
                                                    </td>
                                                </tr> */}

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
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
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
                                        </div>

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

                            {/* History Tab Content */}
                            <div className="tab-pane fade" id="checkout" role="tabpanel" aria-labelledby="checkout-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
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
                                                    {currentItemsforcheckOuthistory.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Thier is No CheckOut Asset .</td>
                                                        </tr>
                                                    ) : (
                                                        currentItemsforcheckOuthistory.map((entry) => (
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
                                        </div>

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
                            <div className="tab-pane fade" id="employee_history" role="tabpanel" aria-labelledby="employee-history">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Status</th>
                                                        <th>Reason </th>
                                                        <th>Date of Active/Inactive</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItemsforemployeehistory.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Thier is No ActiveInactive Details .</td>
                                                        </tr>
                                                    ) : (
                                                        currentItemsforemployeehistory.map((entry) => (
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
                                        </div>

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


