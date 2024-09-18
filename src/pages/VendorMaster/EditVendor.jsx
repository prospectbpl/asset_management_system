import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditVendor = ({ vendor, onClose, onUpdate }) => {
    const [editedVendor, setEditedVendor] = useState(vendor);
    const [error, setError] = useState('');


    // Update the local state when the prop 'vendor' changes
    useEffect(() => {
        setEditedVendor(vendor);
    }, [vendor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedVendor({ ...editedVendor, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for empty fields
        for (const key in vendor) {
            if (!vendor[key]) {
                setError(`Please fill in ${key}`);
                return;
            }
        }

        try {
            // Call onUpdate function to update vendor details in the database
            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/vendors/${editedVendor.id}`, editedVendor);
            onUpdate(); // Update the local state with the edited vendor
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay // Close the modal after successful update
        } catch (error) {
            console.error("Error updating vendor:", error);
            // Handle error here, e.g., display an error message to the user
        }
    };

    const handleClose = () => {
        onClose(); // Call the onClose function passed as prop to close the modal
    };

    return (
        <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Vendor</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button> {/* Close button */}
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}> {/* Modal body with scrollbar */}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Vendor Company Name<span style={{ color: "red" }}>*</span></label>
                                <input name="vendorCompanyName" type="text" className="form-control" value={editedVendor.vendorCompanyName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Vendor Address<span style={{ color: "red" }}>*</span></label>
                                <input name="vendorAddress" type="text" className="form-control" value={editedVendor.vendorAddress} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company GST No.<span style={{ color: "red" }}>*</span></label>
                                <input name="companyGSTNo" type="text" className="form-control" value={editedVendor.companyGSTNo} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Name of Contact Person<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonName" type="text" className="form-control" value={editedVendor.contactPersonName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Designation<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonDesignation" type="text" className="form-control" value={editedVendor.contactPersonDesignation} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Mobile No.<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonMobile" type="text" className="form-control" value={editedVendor.contactPersonMobile} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email ID<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonEmail" type="email" className="form-control" value={editedVendor.contactPersonEmail} onChange={handleChange} />
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

export default EditVendor;
