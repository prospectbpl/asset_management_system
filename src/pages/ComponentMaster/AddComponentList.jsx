import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddComponentList = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        componentName: '',
        componentId: '',
        componentImage: '',
        category: '',
        categoryId: '',
        unit: '',
        size: '',
        vendor_name: '',
        vendorId: '',
        purchaseDate: '',
    });
    const apiUrl = process.env.REACT_APP_LOCAL_URL;

    const [categories, setCategories] = useState([]);
    const [components, setComponents] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchComponents();
        fetchVendors();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/categories`);
            const componentCategories = response.data.filter(category => category.categoryType === 'component');
            setCategories(componentCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchComponents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/components`);
            setComponents(response.data);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    };

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${apiUrl}/vendors`);
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'componentId') {
            const selectedComponent = components.find((component) => component.id === parseInt(value));
            if (selectedComponent) {
                setFormData({
                    ...formData,
                    componentId: value,
                    componentName: selectedComponent.componentName,
                    componentImage: selectedComponent.componentImage,
                    category: selectedComponent.category,
                    categoryId: selectedComponent.category_ID, // Set the categoryId
                });
            }
        } else if (name === 'vendorId') {
            const selectedVendor = vendors.find((vendor) => vendor.id === parseInt(value));
            if (selectedVendor) {
                setFormData({
                    ...formData,
                    vendorId: value,
                    vendor_name: selectedVendor.vendorCompanyName, // Set the vendor_name
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const requiredFields = ["componentId", "vendorId", "unit", "size", "purchaseDate"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        try {
            const response = await axios.post(`${apiUrl}/component-list-data`, formData);
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
        <div id="addComponent" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Component</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: "20px" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div >
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ flex: "2", paddingRight: "20px" }}>
                                        <div className="form-group">
                                            <label>Component Name<span style={{ color: "red" }}>*</span></label>
                                            <select name="componentId" className="form-control" value={formData.componentId} onChange={handleChange} required>
                                                <option value="">Select a component</option>
                                                {components.map(component => (
                                                    <option key={component.id} value={component.id}>{component.componentName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Category<span style={{ color: "red" }}>*</span></label>
                                            <input name="category" type="text" className="form-control" readOnly value={formData.category} />
                                        </div>
                                        <div className="form-group">
                                            <label>Vendor<span style={{ color: "red" }}>*</span></label>
                                            <select name="vendorId" className="form-control" value={formData.vendorId} onChange={handleChange} required>
                                                <option value="">Select a vendor</option>
                                                {vendors.map(vendor => (
                                                    <option key={vendor.id} value={vendor.id}>{vendor.vendorCompanyName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ flex: "1" }}>
                                        <div className="form-group">
                                            <label>Component Photo<span style={{ color: "red" }}>*</span></label>
                                            <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                                                {formData.componentImage && <img src={`${apiUrl}/uploads/components/${formData.componentImage}`} alt="Component" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Unit<span style={{ color: "red" }}>*</span></label>
                                    <div className="input-group">
                                        <select name="unit" className="form-control" onChange={handleChange} required>
                                            <option value="">Select unit</option>
                                            <option value="Nos">Nos</option>
                                            <option value="mtr">mtr</option>
                                            <option value="cm">cm</option>
                                            <option value="mm">mm</option>
                                        </select>
                                        {formData.unit && (
                                            <input name="size" type="number" className="form-control" placeholder="Enter size" onChange={handleChange} />
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
                                    <input name="purchaseDate" type="date" className="form-control" onChange={handleChange} />
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

export default AddComponentList;
