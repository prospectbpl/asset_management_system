import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSiteModal = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        siteName: "",
        siteID: "",
        siteType: "",
        projectName: "",
        godown: "",
        siteLocation: "",
        employee_id: "",
        employeeName: "",
        contactNo: "",
        stateName: "",
        status: "active" // Added status field with default value "active"
    });
    const [employeeList, setEmployeeList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
                setEmployeeList(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "siteName",
            "siteID",
            "siteType",
            "godown",
            "siteLocation",
            "contactNo",
            "stateName"
        ];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }
        setError("");

        try {
            // Find the selected employee object using the employee name
            const selectedEmployee = employeeList.find(employee => employee.ename === formData.employee_id);
            console.log("SELECTED Employee", selectedEmployee)

            // Check if an employee is selected
            if (!selectedEmployee) {
                console.error('No employee selected.');
                return;
            }

            // Create a payload object including both employee ID, name, and status
            const payload = {
                siteName: formData.siteName,
                siteID: formData.siteID,
                siteType: formData.siteType,
                projectName: formData.projectName,
                godown: formData.godown,
                siteLocation: formData.siteLocation,
                employee_id: selectedEmployee.id, // Set employee ID
                employeeName: selectedEmployee.ename, // Set employee name
                contactNo: formData.contactNo,
                stateName: formData.stateName,
                status: formData.status // Include status in the payload
            };

            // Make the POST request with the payload
            const response = await axios.post(
                `${process.env.REACT_APP_LOCAL_URL}/sites`,
                payload
            );

            console.log("Data uploaded successfully:", response.data);
            onUpdate(); // Update sites list
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const handleClose = () => {
        onClose();
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
                    <form
                        action=""
                        id="formAddSite"
                        autoComplete="off"
                        noValidate="novalidate"
                        onSubmit={handleSubmit}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">Add Site</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Site Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="siteName"
                                            type="text"
                                            className="form-control"
                                            value={formData.siteName}
                                            onChange={handleChange}
                                            placeholder="Enter Site Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Site ID<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="siteID"
                                            type="text"
                                            className="form-control"
                                            value={formData.siteID}
                                            onChange={handleChange}
                                            placeholder="Enter Site ID"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Site Type<span style={{ color: "red" }}>*</span></label>
                                        <select
                                            name="siteType"
                                            className="form-control"
                                            value={formData.siteType}
                                            onChange={handleChange}
                                            placeholder="Select Site Type"
                                            required
                                        >
                                            <option value="" disabled hidden>Select Site Type</option>
                                            <option value="Govt.Project(owned)">Govt.Project(owned)</option>
                                            <option value="Govt Project(sub-Contract)">Govt Project(sub-Contract)</option>
                                            <option value="Private Project(owned)">Private Project(owned)</option>
                                            <option value="Private Project(sub-Contract)">Private Project(sub-Contract)</option>
                                            <option value="Head Office">Head Office</option>
                                            <option value="Branch Office">Branch Office</option>
                                        </select>
                                    </div>
                                    {formData.siteType.includes("Project") && (
                                        <div className="form-group">
                                            <label>Project Name<span style={{ color: "red" }}>*</span></label>
                                            <input
                                                name="projectName"
                                                type="text"
                                                className="form-control"
                                                value={formData.projectName}
                                                onChange={handleChange}
                                                placeholder="Enter Project Name"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label>Godown<span style={{ color: "red" }}>*</span></label>
                                        <select
                                            name="godown"
                                            className="form-control"
                                            value={formData.godown}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled hidden>Select Godown</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Site Manager<span style={{ color: "red" }}>*</span></label>
                                        <select
                                            name="employee_id"
                                            className="form-control"
                                            value={formData.employee_id}
                                            onChange={handleChange}
                                            placeholder="Select Site Manager"
                                            required
                                        >
                                            <option value="" disabled hidden>Select Site Manager</option>
                                            {employeeList.map((employee) => (
                                                <option key={employee.id} value={employee.ename}>
                                                    {employee.ename}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Contact No.<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="contactNo"
                                            type="tel"
                                            className="form-control"
                                            value={formData.contactNo}
                                            onChange={handleChange}
                                            placeholder="Enter Contact No."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Site Location<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="siteLocation"
                                            type="text"
                                            className="form-control"
                                            value={formData.siteLocation}
                                            onChange={handleChange}
                                            placeholder="Enter Site Location"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>State Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="stateName"
                                            type="text"
                                            className="form-control"
                                            value={formData.stateName}
                                            onChange={handleChange}
                                            placeholder="Enter State Name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">
                                Save
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSiteModal;
