import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAssetMaster = ({ assetMaster, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        assetName: '',
        serialNumber: '',
        assetType: '',
        rtoName: '',
        registrationNumber: '',
        assetImage: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    console.log("assetMaster", assetMaster);

    // Populate formData when assetMaster is passed as a prop
    useEffect(() => {
        if (assetMaster) {
            setFormData({
                assetName: assetMaster.assetmaster_name || '',
                serialNumber: assetMaster.serial_number || '',
                assetType: assetMaster.asset_type || '',
                rtoName: assetMaster.rto_name || '',
                registrationNumber: assetMaster.registration_number || '',
                assetImage: null, // Reset the image on load, but retain the current one for display
            });
        }
    }, [assetMaster]);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle image upload and file size validation
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size / 1024; // Convert bytes to KB
            if (fileSize > 200) {
                setError('Maximum file size is 200KB');
            } else {
                setError(''); // Clear error when valid
                setFormData({ ...formData, assetImage: file });
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const submissionData = new FormData();
            submissionData.append('assetName', formData.assetName);
            submissionData.append('serialNumber', formData.serialNumber);
            submissionData.append('assetType', formData.assetType);
            submissionData.append('rtoName', formData.rtoName);
            submissionData.append('registrationNumber', formData.registrationNumber);
            submissionData.append('assetImage', formData.assetImage);

            // Make the API call to update the asset
            const response = await axios.put(
                `${process.env.REACT_APP_LOCAL_URL}/asset/master/${assetMaster.id}`,
                submissionData
            );

            console.log('Asset updated successfully:', response.data);
            onUpdate(); // Call the onUpdate prop to refresh the asset list

            setTimeout(() => {
                onClose(); // Close the modal after success
                window.location.reload(); // Optional: Refresh page after 1 second
            }, 1000);
        } catch (error) {
            console.error('Error updating asset:', error);
            setError('Failed to update asset. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div id="EditAssetMaster" className="modal fade show" role="dialog" style={{ display: 'block', paddingRight: '17px' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Asset</h5>
                            <button type="button" className="close" onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>
                                    Asset Name<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="assetName"
                                    value={formData.assetName}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Asset Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Serial Number<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Serial Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Asset Type<span style={{ color: 'red' }}>*</span>
                                </label>
                                <select
                                    name="assetType"
                                    id="assetType"
                                    className="form-control"
                                    value={formData.assetType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Select Type
                                    </option>
                                    <option value="Movable">Movable</option>
                                    <option value="Immovable">Immovable</option>
                                    <option value="Digital Asset">Digital Asset</option>
                                    <option value="Fixed Asset">Fixed Asset</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    RTO Name /<small>Optional</small>
                                </label>
                                <input
                                    name="rtoName"
                                    value={formData.rtoName}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="RTO Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Registration Number /<small>Optional</small>
                                </label>
                                <input
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Registration Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Asset Image<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="assetImage"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                    required
                                />
                                <small className="text-muted">Maximum file size: 200KB</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="saveAsset" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-default" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default EditAssetMaster;
