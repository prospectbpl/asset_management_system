import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryType: '', // Default to 'asset'
        categoryImage: null // Initialize categoryImage state
    });
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_LOCAL_URL;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'categoryImage' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Check for empty fields
        for (const key in formData) {
            if (!formData[key]) {
                setError(`Please fill in ${key}`);
                return;
            }
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`${apiUrl}/categories`, formDataToSend);
            console.log('Data uploaded successfully:', response.data);
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay

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
                            <h5 className="modal-title">Add Category</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Category Name<span style={{ color: "red" }}>*</span></label>
                                <input name="categoryName" type="text" className="form-control" required="" placeholder="Category Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryType">Category Type<span style={{ color: "red" }}>*</span></label>
                                <select
                                    id="categoryType"
                                    name="categoryType"
                                    className="form-control"
                                    value={formData.categoryType}
                                    onChange={handleChange}
                                    required // This makes the field required
                                >
                                    <option value="" disabled hidden>Select Category Type</option>
                                    <option value="asset">Asset</option>
                                    <option value="component">Component</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Category Image<span style={{ color: "red" }}>*</span></label>
                                <input name="categoryImage" type="file" className="form-control" onChange={handleChange} />
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

export default AddCategory;
