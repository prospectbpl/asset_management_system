import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditComponentModal = ({ component, onClose, onUpdate }) => {
    const [editedComponent, setEditedComponent] = useState(component);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setEditedComponent(component);
        fetchCategories();
    }, [component]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
            const componentCategories = response.data.filter(category => category.categoryType === 'component');
            setCategories(componentCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            // Find the selected category object
            const selectedCategory = categories.find(category => category.categoryName === value);
            // Update both category and category_ID in the state
            setEditedComponent({
                ...editedComponent,
                [name]: value,
                category_ID: selectedCategory ? selectedCategory.id : editedComponent.category_ID || 0, // Set category_ID based on selected category, or use existing category ID
            });
        } else {
            // For other fields, directly update the state
            setEditedComponent({
                ...editedComponent,
                [name]: value
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedComponent({ ...editedComponent, componentImage: file }); // Update componentImage only when a new image is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editedComponent.componentName || !editedComponent.size || !editedComponent.category) {
            setError('Please fill in all required fields');
            return;
        }

        setError('');

        try {
            const formData = new FormData();
            formData.append('name', editedComponent.componentName);
            formData.append('size', editedComponent.size);
            formData.append('categoryId', editedComponent.category_ID);
            formData.append('categoryName', editedComponent.category);
            if (editedComponent.componentImage) {
                formData.append('picture', editedComponent.componentImage);
            } else {
                // If no new image is selected, include the existing image name
                formData.append('existingPicture', editedComponent.componentImage);
            }
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/components/${editedComponent.id}`, formData);
            console.log('Data updated successfully:', response.data);
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay

        } catch (error) {
            console.error('Error updating component:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal fade show" id="editComponentModal" tabIndex="-1" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Component</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Component Name <span style={{ color: "red" }}>*</span></label>
                                <input name="componentName" type="text" className="form-control" required placeholder="Component Name" value={editedComponent.componentName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Size <span style={{ color: "red" }}>*</span></label>
                                <input name="size" type="text" className="form-control" required placeholder="Size" value={editedComponent.size} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Category <span style={{ color: "red" }}>*</span></label>
                                <select name="category" className="form-control" value={editedComponent.category} onChange={handleChange} required>
                                    <option value="" disabled hidden>Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Component Image</label>
                                <input name="picture" type="file" className="form-control" onChange={handleImageChange} />
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

export default EditComponentModal;



