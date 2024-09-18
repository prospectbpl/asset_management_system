import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBrandModal = ({ brand, onClose, onUpdate }) => {
    const [editedBrand, setEditedBrand] = useState({ ...brand });
    const [logoFile, setLogoFile] = useState(null);

    useEffect(() => {
        setEditedBrand({ ...brand });
    }, [brand]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBrand({ ...editedBrand, [name]: value });
    };

    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('brandName', editedBrand.brandName);
            formData.append('companyName', editedBrand.companyName);
            formData.append('brandLogo', logoFile);

            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/brands/${editedBrand.id}`, formData);
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error updating brand:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const formData = {
        brandName: editedBrand.brandName || '',
        companyName: editedBrand.companyName || ''
    };

    return (
        <div className="modal fade show" id="editBrandModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Brand</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Brand Logo</label>
                                        <input
                                            name="brandLogo"
                                            type="file"
                                            className="form-control-file"
                                            onChange={handleLogoChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Brand Name</label>
                                        <input
                                            name="brandName"
                                            type="text"
                                            className="form-control"
                                            value={formData.brandName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            name="companyName"
                                            type="text"
                                            className="form-control"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBrandModal;
