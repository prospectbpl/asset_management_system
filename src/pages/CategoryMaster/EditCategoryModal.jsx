import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCategoryModal = ({ category, onClose, onUpdateCategory }) => {
    const [editedCategory, setEditedCategory] = useState(category);
    const [error, setError] = useState('');

    useEffect(() => {
        setEditedCategory(category);
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCategory({ ...editedCategory, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedCategory({ ...editedCategory, categoryImage: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editedCategory.categoryName) {
            setError('Please fill in Category Name');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('categoryName', editedCategory.categoryName);
            formData.append('categoryType', editedCategory.categoryType); // Add category type to formData
            if (editedCategory.categoryImage) {
                formData.append('categoryImage', editedCategory.categoryImage);
            }

            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/categories/${editedCategory.id}`, formData);
            console.log('Data updated successfully:', response.data);
            onClose();
            onUpdateCategory();

        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal fade show" id="editCategoryModal" tabIndex="-1" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Category</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Category Name <span style={{ color: "red" }}>*</span></label>
                                <input name="categoryName" type="text" className="form-control" required placeholder="Category Name" value={editedCategory.categoryName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Category Type</label>
                                <select name="categoryType" className="form-control" value={editedCategory.categoryType} onChange={handleChange}>
                                    <option value="asset">Asset</option>
                                    <option value="component">Component</option>
                                </select>
                            </div>
                            {/* Add other fields here */}
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

export default EditCategoryModal;
