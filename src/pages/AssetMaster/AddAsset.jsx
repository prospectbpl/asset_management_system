import React, { useState } from 'react';
import axios from 'axios';

const AddAsset = ({ onClose, onUpdate }) => {
    const [assetName, setAssetName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [assetType, setAssetType] = useState('');
    const [rtoName, setRTOName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [assetImage, setAssetImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'assetName':
                setAssetName(value);
                break;
            case 'serialNumber':
                setSerialNumber(value);
                break;
            case 'assetType':
                setAssetType(value);
                break;
            case 'rtoName':
                setRTOName(value);
                break;
            case 'registrationNumber':
                setRegistrationNumber(value);
                break;
            default:
                break;
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1024;

        if (fileSize > 200) {
            setError("Maximum file size is 200KB");
        } else {
            setError("");
            setAssetImage(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const requiredFields = ["assetName", "serialNumber", "assetType", "assetImage"];
        for (const field of requiredFields) {
          if (!eval(field)) {
            setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            setIsLoading(false);
            return;
          }
        }
    
        setError("");

        try {
            const formData = new FormData();
            formData.append('assetName', assetName);
            formData.append('serialNumber', serialNumber);
            formData.append('assetType', assetType);
            formData.append('rtoName', rtoName);
            formData.append('registrationNumber', registrationNumber);
            formData.append('assetImage', assetImage);

            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/asset/master`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Asset added successfully:', response.data);
            onClose();
            onUpdate();
        } catch (error) {
            console.error('Error adding asset:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="addAsset" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Asset</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Asset Name<span style={{ color: "red" }}>*</span></label>
                                <input name="assetName" value={assetName} onChange={handleChange} type="text" className="form-control" required placeholder="Asset Name" />
                            </div>
                            <div className="form-group">
                                <label>Serial Number<span style={{ color: "red" }}>*</span></label>
                                <input name="serialNumber" value={serialNumber} onChange={handleChange} type="text" className="form-control" required placeholder="Serial Number" />
                            </div>
                            <div className="form-group">
                                <label>Asset Type<span style={{ color: "red" }}>*</span></label>
                                <select
                                    name="assetType"
                                    id="assetType"
                                    className="form-control"
                                    value={assetType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>Select Asset Type</option>
                                    <option value="Movable">Movable</option>
                                    <option value="Immovable">Immovable</option>
                                    <option value="Digital Asset">Digital Asset</option>
                                    <option value="Fixed Asset">Fixed Asset</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>RTO Name /<small>Optional</small></label>
                                <input name="rtoName" value={rtoName} onChange={handleChange} type="text" className="form-control" placeholder="RTO Name" />
                            </div>
                            <div className="form-group">
                                <label>Registration Number  /<small>Optional</small></label>
                                <input name="registrationNumber" value={registrationNumber} onChange={handleChange} type="text" className="form-control" placeholder="Registration Number" />
                            </div>
                            <div className="form-group">
                                <label>Asset Image<span style={{ color: "red" }}>*</span></label>
                                <input name="assetImage" type="file" className="form-control" onChange={handleImageChange} required />
                                <small className="text-muted">Maximum file size: 200KB</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="saveAsset">Save</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default AddAsset;


