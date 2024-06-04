import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddVendor = ({ onClose, onUpdateVendors }) => {
    const [formData, setFormData] = useState({
        vendorCompanyName: '',
        vendorAddress: '',
        companyGSTNo: '',
        contactPersonName: '',
        contactPersonDesignation: '',
        contactPersonMobile: '',
        contactPersonEmail: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const requiredFields = [
            "vendorCompanyName",
            "vendorAddress",
            "contactPersonName",
            "contactPersonDesignation",
            "contactPersonMobile"
            ];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                setIsLoading(false); // Stop loading on error
                return;
            }
        }
        setError("");

        try {
            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/vendordata`, formData);
            console.log('Data uploaded successfully:', response.data);
            toast.success('Successfully logged in');
            onClose();
            onUpdateVendors();
        } catch (error) {
            setError('Invalid email or password');
            console.error('Error uploading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
             <ToastContainer /> {/* Toast container */}
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Vendor</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Vendor Company Name<span style={{ color: "red" }}>*</span></label>
                                <input name="vendorCompanyName" type="text" className="form-control" required placeholder="Vendor Company Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Vendor Address<span style={{ color: "red" }}>*</span></label>
                                <input name="vendorAddress" type="text" className="form-control" required placeholder="Vendor Address" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company GST No (Optional)</label>
                                <input name="companyGSTNo" type="text" className="form-control" required placeholder="Company GST No." onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Name of Contact Person<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonName" type="text" className="form-control" required placeholder="Name of Contact Person" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Designation<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonDesignation" type="text" className="form-control" required placeholder="Designation" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Mobile No.<span style={{ color: "red" }}>*</span></label>
                                <input name="contactPersonMobile" type="text" className="form-control" required placeholder="Mobile No." onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email ID (Optional)</label>
                                <input name="contactPersonEmail" type="email" className="form-control" required placeholder="Email ID" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">Save</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default AddVendor;
