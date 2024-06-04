import React, { useState } from 'react';
import axios from 'axios';

const AddTransporterModal = ({ onClose, onUpdateTransporters }) => {
    const [formData, setFormData] = useState({
        transporterCompanyName: '',
        transporterPersonName: '',
        transporterPersonEmail: '',
        transporterPersonPhone: '',
        transporterCompanyAddress: '',
        transporterCityName: ''
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
            "transporterCompanyName",
            "transporterPersonName",
            "transporterPersonPhone",
            "transporterCompanyAddress",
            "transporterCityName"
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
            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/transporterdata`, formData);
            console.log('Data uploaded successfully:', response.data);
            onClose();
            onUpdateTransporters();
        } catch (error) {
            console.error('Error uploading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="add-transporter" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Transporter</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Transporter Company Name<span style={{ color: "red" }}>*</span></label>
                                <input name="transporterCompanyName" type="text" className="form-control" required placeholder="Transporter Company Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Name of Contact Person<span style={{ color: "red" }}>*</span></label>
                                <input name="transporterPersonName" type="text" className="form-control" required placeholder="Name of Contact Person" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email ID (Optional)</label>
                                <input name="transporterPersonEmail" type="email" className="form-control" placeholder="Email ID" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone No.<span style={{ color: "red" }}>*</span></label>
                                <input name="transporterPersonPhone" type="text" className="form-control" required placeholder="Phone No." onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company Address<span style={{ color: "red" }}>*</span></label>
                                <input name="transporterCompanyAddress" type="text" className="form-control" required placeholder="Company Address" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>City Name<span style={{ color: "red" }}>*</span></label>
                                <input name="transporterCityName" type="text" className="form-control" required placeholder="City Name" onChange={handleChange} />
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

export default AddTransporterModal;
