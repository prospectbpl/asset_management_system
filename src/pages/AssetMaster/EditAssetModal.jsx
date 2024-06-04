// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function EditAssetModal({ asset, onUpdate, onClose }) {
//     const [updatedAsset, setUpdatedAsset] = useState({ ...asset });
//     const [vendors, setVendors] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [brands, setBrands] = useState([]);

//     useEffect(() => {
//         fetchVendors();
//         fetchCategories();
//         fetchBrands();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//             setVendors(response.data);
//         } catch (error) {
//             console.error("Error fetching vendors:", error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//             const assetCategories = response.data.filter(category => category.categoryType === 'asset');
//             setCategories(assetCategories);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     const fetchBrands = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//             setBrands(response.data);
//         } catch (error) {
//             console.error('Error fetching brands:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;

//         if (name === "categoryName") {
//             const selectedCategory = categories.find(category => category.categoryName === value);
//             setUpdatedAsset(prevAsset => ({
//                 ...prevAsset,
//                 [name]: value,
//                 category_id: selectedCategory ? selectedCategory.id : "",
//             }));
//         } else {
//             setUpdatedAsset(prevAsset => ({
//                 ...prevAsset,
//                 [name]: name === "picture" ? files[0] : value,
//             }));
//         }
//     };

// const handleVendorChange = (e) => {
//     const selectedVendorId = e.target.value;
//     const selectedVendor = vendors.find(vendor => vendor.id === parseInt(selectedVendorId));
//     setUpdatedAsset(prevAsset => ({
//         ...prevAsset,
//         vendorId: selectedVendorId,
//         vendor_id: selectedVendorId,
//         vendorCompanyName: selectedVendor.vendorCompanyName,
//     }));
// };

// const handleBrandChange = (e) => {
//     const selectedBrandName = e.target.value;
//     const selectedBrand = brands.find(brand => brand.brandName === selectedBrandName);
//     setUpdatedAsset(prevAsset => ({
//         ...prevAsset,
//         brand_id: selectedBrand ? selectedBrand.id : "",
//         brand: selectedBrandName,
//     }));
// };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.keys(updatedAsset).forEach((key) => {
//                 formDataToSend.append(key, updatedAsset[key]);
//             });
//             const response = await axios.put(
//                 `${process.env.REACT_APP_LOCAL_URL}/assets/${asset.id}`,
//                 formDataToSend
//             );
//             console.log("Asset updated:", response.data);
//             onUpdate(updatedAsset);
//             onClose();
//         } catch (error) {
//             console.error("Error updating asset:", error);
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div
//             id="edit"
//             className="modal fade show"
//             role="dialog"
//             style={{ display: "block", paddingRight: "17px" }}
//         >
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form
//                         action=""
//                         id="formedit"
//                         encType="multipart/form-data"
//                         autoComplete="off"
//                         noValidate="novalidate"
//                         onSubmit={handleSubmit}
//                     >
//                         <div className="modal-header">
//                             <h5 className="modal-title">Edit Asset</h5>
//                             <button type="button" className="close" onClick={handleClose}>
//                                 &times;
//                             </button>
//                         </div>
//                         <div
//                             className="modal-body"
//                             style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//                         >
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="name"
//                                         type="text"
//                                         id="name"
//                                         className="form-control"
//                                         value={updatedAsset.name}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Name"
//                                     />
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="assettag"
//                                         type="text"
//                                         id="assettag"
//                                         className="form-control"
//                                         value={updatedAsset.assettag}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Asset Tag"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Category<span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         name="categoryName"
//                                         id="categoryName"
//                                         className="form-control"
//                                         value={updatedAsset.categoryName}
//                                         onChange={handleChange}
//                                         required
//                                     >
//                                         <option value="">Select Category</option>
//                                         {categories.map((category) => (
//                                             <option key={category.id} value={category.categoryName}>
//                                                 {category.categoryName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         name="vendorId"
//                                         id="vendorId"
//                                         className="form-control"
//                                         value={updatedAsset.vendorId}
//                                         onChange={handleVendorChange}
//                                         required
//                                     >
//                                         <option value="">Select Vendor</option>
//                                         {vendors.map((vendor) => (
//                                             <option key={vendor.id} value={vendor.vendorCompanyName}>
//                                                 {vendor.vendorCompanyName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Brand<span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         name="brand"
//                                         id="brand"
//                                         className="form-control"
//                                         value={updatedAsset.brand}
//                                         onChange={handleBrandChange}
//                                         required
//                                     >
//                                         <option value="">Select Brand</option>
//                                         {brands.map((brand) => (
//                                             <option key={brand.id} value={brand.brandName}>
//                                                 {brand.brandName}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="serial"
//                                         type="text"
//                                         id="serial"
//                                         className="form-control"
//                                         value={updatedAsset.serial}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Serial No."
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="assetType"
//                                         type="text"
//                                         id="assetType"
//                                         className="form-control"
//                                         value={updatedAsset.assetType}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Type"
//                                     />
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Location<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="location"
//                                         type="text"
//                                         id="location"
//                                         className="form-control"
//                                         value={updatedAsset.location}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Location"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Cost<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="cost"
//                                         type="text"
//                                         id="cost"
//                                         className="form-control"
//                                         value={updatedAsset.cost}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Cost"
//                                     />
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="purchaseDate"
//                                         type="date"
//                                         id="purchaseDate"
//                                         className="form-control"
//                                         value={updatedAsset.purchaseDate}
//                                         onChange={handleChange}
//                                         required
//                                         placeholder="Purchase Date"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>RTO Name</label>
//                                     <input
//                                         name="rtoName"
//                                         type="text"
//                                         id="rtoName"
//                                         className="form-control"
//                                         value={updatedAsset.rtoName}
//                                         onChange={handleChange}
//                                         placeholder="RTO Name"
//                                     />
//                                 </div>
//                                 <div className="form-group col-md-6">
//                                     <label>Registration Number</label>
//                                     <input
//                                         name="registrationNumber"
//                                         type="text"
//                                         id="registrationNumber"
//                                         className="form-control"
//                                         value={updatedAsset.registrationNumber}
//                                         onChange={handleChange}
//                                         placeholder="Registration Number"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-group">
//                                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                                 <textarea
//                                     className="form-control"
//                                     name="description"
//                                     id="description"
//                                     value={updatedAsset.description}
//                                     onChange={handleChange}
//                                     placeholder="Description"
//                                 ></textarea>
//                             </div>
//                             <div className="form-group">
//                                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     name="picture"
//                                     type="file"
//                                     id="assetImage"
//                                     className="form-control"
//                                     onChange={handleChange}
//                                     placeholder="Asset Image"
//                                 />
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary" id="update">
//                                 Update
//                             </button>
//                             <button
//                                 type="button"
//                                 className="btn btn-default"
//                                 data-dismiss="modal"
//                                 onClick={handleClose}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditAssetModal;

import React, { useState, useEffect } from "react";
import axios from "axios";

function EditAssetModal({ asset, onUpdate, onClose }) {
    const [updatedAsset, setUpdatedAsset] = useState({ ...asset });
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchVendors();
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
            const assetCategories = response.data.filter(category => category.categoryType === 'asset');
            setCategories(assetCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };


    const handleVendorChange = (e) => {
        const selectedVendorId = e.target.value;
        const selectedVendor = vendors.find(vendor => vendor.id === parseInt(selectedVendorId));
        setUpdatedAsset(prevAsset => ({
            ...prevAsset,
            vendorId: selectedVendorId,
            vendor_id: selectedVendorId,
            vendorCompanyName: selectedVendor.vendorCompanyName,
        }));
    };

    const handleBrandChange = (e) => {
        const selectedBrandName = e.target.value;
        const selectedBrand = brands.find(brand => brand.brandName === selectedBrandName);
        setUpdatedAsset(prevAsset => ({
            ...prevAsset,
            brand_id: selectedBrand ? selectedBrand.id : "",
            brand: selectedBrandName,
        }));
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "categoryName") {
            const selectedCategory = categories.find(category => category.categoryName === value);
            setUpdatedAsset(prevAsset => ({
                ...prevAsset,
                [name]: value,
                category_id: selectedCategory ? selectedCategory.id : "",
            }));
        } else {
            setUpdatedAsset(prevAsset => ({
                ...prevAsset,
                [name]: name === "picture" ? files[0] : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(updatedAsset).forEach((key) => {
                formDataToSend.append(key, updatedAsset[key]);
            });
            const response = await axios.put(
                `${process.env.REACT_APP_LOCAL_URL}/assets/${asset.id}`,
                formDataToSend
            );
            console.log("Asset updated:", response.data);
            onUpdate(updatedAsset);
            onClose();
        } catch (error) {
            console.error("Error updating asset:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            id="edit"
            className="modal fade show"
            role="dialog"
            style={{ display: "block", paddingRight: "17px" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form
                        action=""
                        id="formedit"
                        encType="multipart/form-data"
                        autoComplete="off"
                        noValidate="novalidate"
                        onSubmit={handleSubmit}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Asset</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                &times;
                            </button>
                        </div>
                        <div
                            className="modal-body"
                            style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Asset Name<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="name"
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={updatedAsset.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="assettag"
                                        type="text"
                                        id="assettag"
                                        className="form-control"
                                        value={updatedAsset.assettag}
                                        onChange={handleChange}
                                        required
                                        placeholder="Asset Tag"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Category<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="categoryName"
                                        id="categoryName"
                                        className="form-control"
                                        value={updatedAsset.categoryName}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Vendor<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="vendorId"
                                        id="vendorId"
                                        className="form-control"
                                        value={updatedAsset.vendorId}
                                        onChange={handleVendorChange}
                                        required
                                    >
                                        <option value="">Select Vendor</option>
                                        {vendors.map((vendor) => (
                                            <option key={vendor.id} value={vendor.id}>
                                                {vendor.vendorCompanyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Brand<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="brand"
                                        id="brand"
                                        className="form-control"
                                        value={updatedAsset.brand}
                                        onChange={handleBrandChange}
                                        required
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.brandName}>
                                                {brand.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Serial No<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="serial"
                                        type="text"
                                        id="serial"
                                        className="form-control"
                                        value={updatedAsset.serial}
                                        onChange={handleChange}
                                        required
                                        placeholder="Serial No."
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Asset Type<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="assetType"
                                        id="assetType"
                                        className="form-control"
                                        value={updatedAsset.assetType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Asset Type</option>
                                        <option value="Movable">Movable</option>
                                        <option value="Immovable">Immovable</option>
                                        <option value="Digital Asset">Digital Asset</option>
                                        <option value="Fixed Asset">Consumable Asset</option>
                                        {/* Add more asset types here */}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Asset Location<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="location"
                                        type="text"
                                        id="location"
                                        className="form-control"
                                        value={updatedAsset.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="Location"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Asset Cost<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="cost"
                                        type="text"
                                        id="cost"
                                        className="form-control"
                                        value={updatedAsset.cost}
                                        onChange={handleChange}
                                        required
                                        placeholder="Cost"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="purchaseDate"
                                        type="date"
                                        id="purchaseDate"
                                        className="form-control"
                                        value={updatedAsset.purchaseDate}
                                        onChange={handleChange}
                                        required
                                        placeholder="Purchase Date"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>RTO Name</label>
                                    <input
                                        name="rtoName"
                                        type="text"
                                        id="rtoName"
                                        className="form-control"
                                        value={updatedAsset.rtoName}
                                        onChange={handleChange}
                                        placeholder="RTO Name"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Registration Number</label>
                                    <input
                                        name="registrationNumber"
                                        type="text"
                                        id="registrationNumber"
                                        className="form-control"
                                        value={updatedAsset.registrationNumber}
                                        onChange={handleChange}
                                        placeholder="Registration Number"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description<span style={{ color: "red" }}>*</span></label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    value={updatedAsset.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Asset Image<span style={{ color: "red" }}>*</span></label>
                                <input
                                    name="picture"
                                    type="file"
                                    id="assetImage"
                                    className="form-control"
                                    onChange={handleChange}
                                    accept="image/*"
                                    required
                                />
                                <small className="form-text text-muted">Maximum file size: 200KB</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="update">
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAssetModal;
