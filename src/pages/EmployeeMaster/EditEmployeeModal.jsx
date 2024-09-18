import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployeeModal = ({ employee, onClose, onUpdate }) => {
    const [editedEmployee, setEditedEmployee] = useState(employee);
    const [error, setError] = useState('');

    // Update the local state when the prop 'employee' changes
    useEffect(() => {
        setEditedEmployee(employee);
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setEditedEmployee({ ...editedEmployee, epicture: file }); // Set epicture to the file name
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('ename', editedEmployee.ename);
            formData.append('ecode', editedEmployee.ecode);
            formData.append('edesignation', editedEmployee.edesignation);
            formData.append('eemail', editedEmployee.eemail);
            formData.append('elocation', editedEmployee.elocation);
            formData.append('epicture', editedEmployee.epicture);

            // Call onUpdate function to update employee details in the database
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/employees/${editedEmployee.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpdate() // Update the local state with the edited employee data returned from the server
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error updating employee:", error);
            // Handle error here, e.g., display an error message to the user
        }
    };

    const handleClose = () => {
        onClose(); // Call the onClose function passed as prop to close the modal
    };

    return (
        <div className="modal fade show" id="editEmployeeModal" tabIndex="-1" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Employee</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <div className="form-group">
                                <label>Employee Name <span style={{ color: "red" }}>*</span></label>
                                <input name="ename" type="text" className="form-control" value={editedEmployee.ename} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Employee Code <span style={{ color: "red" }}>*</span></label>
                                <input name="ecode" type="text" className="form-control" required placeholder="Employee Code" value={editedEmployee.ecode} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Employee Designation <span style={{ color: "red" }}>*</span></label>
                                <input name="edesignation" type="text" className="form-control" required placeholder="Employee Designation" value={editedEmployee.edesignation} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Employee Email <span style={{ color: "red" }}>*</span></label>
                                <input name="eemail" type="email" className="form-control" required placeholder="Employee Email" value={editedEmployee.eemail} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Employee Picture <span style={{ color: "red" }}>*</span></label>
                                <input name="epicture" type="file" className="form-control" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">Save</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
