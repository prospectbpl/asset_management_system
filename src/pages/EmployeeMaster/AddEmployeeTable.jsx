import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const AddEmployeeTable = ({ onClose, onUpdateEmployees }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeCode: '',
        employeePhone: '',
        employeeDesignation: '',
        employeeLocation: '',
        employeeEmail: '',
        employeePicture: null,
        status: 'active' // Add status field with default value 'active'
    });
    const [error, setError] = useState("");
    const [qrCodeData, setQRCodeData] = useState(null);

    useEffect(() => {
        console.log('qrCodeData updated:', qrCodeData);
    }, [qrCodeData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'employeePicture' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        for (const key in formData) {
            if (key !== 'employeeLocation' && !formData[key]) {
                setError(`Please fill in ${key}`);
                return;
            }
        }

        if (!formData.employeePicture) {
            setError("Please upload employee picture");
            return;
        }

        const employeeInfo = {
            name: formData.employeeName,
            code: formData.employeeCode,
            designation: formData.employeeDesignation,
            location: formData.employeeLocation,
            email: formData.employeeEmail,
            status: formData.status // Include status in employeeInfo
        };
        const employeeInfoString = JSON.stringify(employeeInfo);
        setQRCodeData(employeeInfoString);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        formDataToSend.append('qrCodeData', employeeInfoString);

        try {
            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/empdata`, formDataToSend);
            console.log('Data uploaded successfully:', response.data);
            onClose();
            onUpdateEmployees();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Employee</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div> {/* Added scrollbar */}
                                <div className="form-group">
                                    <label>Employee Name<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeeName" type="text" className="form-control" required placeholder="Employee Name" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Employee Code<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeeCode" type="text" className="form-control" required placeholder="Employee Code" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Employee Designation<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeeDesignation" type="text" className="form-control" required placeholder="Employee Designation" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Employee Email<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeeEmail" type="email" className="form-control" required placeholder="Employee Email" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Employee Phone No.<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeePhone" type="number" className="form-control" required placeholder="Employee Phone No." onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Employee Picture<span style={{ color: "red" }}>*</span></label>
                                    <input name="employeePicture" type="file" className="form-control" required placeholder="Employee Picture" onChange={handleChange} />
                                    <small>Maximum : 200KB</small>
                                </div>
                                {/* Added status field */}
                                {/* <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div> */}
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

export default AddEmployeeTable;
