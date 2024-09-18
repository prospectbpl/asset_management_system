import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditTransport = ({ transporter, onClose, onUpdate }) => {
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

    // Populate form with transporter data on component mount/update
    useEffect(() => {
        if (transporter) {
            setFormData({
                ...transporter
            });
        }
    }, [transporter]);

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

        // Validate required fields
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

        setError(""); // Clear any previous errors

        try {
            // Submit updated data
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/transporterdata/update/${transporter.id}`, formData);
            console.log('Data updated successfully:', response.data);
            onUpdate();  // Trigger the update function to refresh data
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error('Error updating data:', error);
            setError('An error occurred while updating the transporter details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="edit-transporter" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Transporter</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Transporter Company Name<span style={{ color: "red" }}>*</span></label>
                                <input value={formData.transporterCompanyName} name="transporterCompanyName" type="text" className="form-control" required placeholder="Transporter Company Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Name of Contact Person<span style={{ color: "red" }}>*</span></label>
                                <input value={formData.transporterPersonName} name="transporterPersonName" type="text" className="form-control" required placeholder="Name of Contact Person" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email ID (Optional)</label>
                                <input value={formData.transporterPersonEmail} name="transporterPersonEmail" type="email" className="form-control" placeholder="Email ID" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone No.<span style={{ color: "red" }}>*</span></label>
                                <input value={formData.transporterPersonPhone} name="transporterPersonPhone" type="text" className="form-control" required placeholder="Phone No." onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company Address<span style={{ color: "red" }}>*</span></label>
                                <input value={formData.transporterCompanyAddress} name="transporterCompanyAddress" type="text" className="form-control" required placeholder="Company Address" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>City Name<span style={{ color: "red" }}>*</span></label>
                                <input value={formData.transporterCityName} name="transporterCityName" type="text" className="form-control" required placeholder="City Name" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">Save Changes</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default EditTransport;
