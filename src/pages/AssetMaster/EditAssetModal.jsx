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


//     const handleVendorChange = (e) => {
//         const selectedVendorId = e.target.value;
//         const selectedVendor = vendors.find(vendor => vendor.id === parseInt(selectedVendorId));
//         setUpdatedAsset(prevAsset => ({
//             ...prevAsset,
//             vendorId: selectedVendorId,
//             vendor_id: selectedVendorId,
//             vendorCompanyName: selectedVendor.vendorCompanyName,
//         }));
//     };

//     const handleBrandChange = (e) => {
//         const selectedBrandName = e.target.value;
//         const selectedBrand = brands.find(brand => brand.brandName === selectedBrandName);
//         setUpdatedAsset(prevAsset => ({
//             ...prevAsset,
//             brand_id: selectedBrand ? selectedBrand.id : "",
//             brand: selectedBrandName,
//         }));
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

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.keys(updatedAsset).forEach((key) => {
//                 formDataToSend.append(key, updatedAsset[key]);
//             });
//             const response = await axios.put(
//                 `${process.env.REACT_APP_LOCAL_URL}/assets/${asset.asset_master_id}`,
//                 formDataToSend
//             );
//             console.log("Asset updated:", response.data);
//             onUpdate();
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
//                                         readOnly
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
//                                             <option key={vendor.id} value={vendor.id}>
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
//                                         readOnly
//                                         placeholder="Serial No."
//                                     />
//                                 </div>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-6">
//                                     <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         name="assetType"
//                                         id="assetType"
//                                         className="form-control"
//                                         value={updatedAsset.assetType}
//                                         onChange={handleChange}
//                                         required
//                                         readOnly
//                                     >
//                                         <option value="">Select Asset Type</option>
//                                         <option value="Movable">Movable</option>
//                                         <option value="Immovable">Immovable</option>
//                                         <option value="Digital Asset">Digital Asset</option>
//                                         <option value="Fixed Asset">Consumable Asset</option>
//                                         {/* Add more asset types here */}
//                                     </select>
//                                 </div>
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
//                             </div>
//                             <div className="form-row">

//                                  {/* <div className="form-group col-md-6">
//                                     <label>Asset Location<span style={{ color: "red" }}>*</span></label>
//                                     <input
//                                         name="location"
//                                         type="text"
//                                         id="location"
//                                         className="form-control"
//                                         value={updatedAsset.location}
//                                         onChange={handleChange}
//                                         required
//                                         readOnly
//                                         placeholder="Location"
//                                     />
//                                 </div> */}
//                                 {/* <div className="form-group col-md-6">
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
//                                 </div> */}
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
//                                         readOnly
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
//                                         readOnly
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
//                                     accept="image/*"
//                                     required
//                                 />
//                                 <small className="form-text text-muted">Maximum file size: 200KB</small>
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

const EditAssetModal = ({ asset, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        assetMaster_id: "",
        assettag: "",
        vendorcompanyname: "",
        vendor_id: "",
        location: "",
        site_id: "",
        brand: "",
        brand_id: "",
        serial: "",
        assetType: "",
        cost: "",
        purchaseDate: "",
        description: "",
        categoryName: "",
        category_id: "",
        picture: null,
        rtoName: "",
        registrationNumber: "",
        dimensions_enabled: "",
        length: "",
        width: "",
        height: "",
        units: "",
        quantity: "",
        takeInsurance: "",
        username: localStorage.getItem('username'),
    });

    useEffect(() => {
        if (asset) {
            setFormData({
                ...asset,
                dimensions_enabled: asset.dimensions_enabled || "no" // Default to "no" if undefined
            });
        }
    }, [asset]);

    const [vendors, setVendors] = useState([]);
    const [assetMaster, setAssetMaster] = useState([]);
    const [sites, setSites] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [qrCodeData, setQRCodeData] = useState(null);
    const [lastAssetId, setLastAssetId] = useState(0);
    const [assetTagPrefix, setAssetTagPrefix] = useState("");

    useEffect(() => {
        fetchVendors();
        fetchBrands();
        fetchCategories();
        fetchLastAssetId();
        fetchSites();
        fetchAssetTagPrefix();
        fetchAssetMaster();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
            setVendors(response.data);
        } catch (error) {
            console.error("Error fetching vendors:", error);
        }
    };

    const fetchAssetMaster = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset/master/dropdown`);
            setAssetMaster(response.data);
        } catch (error) {
            console.error("Error fetching asset masters:", error);
        }
    };

    const fetchSites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
            setSites(response.data);
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
            setBrands(response.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
            const componentCategories = response.data.filter(category => category.categoryType === 'asset');
            setCategories(componentCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchAssetTagPrefix = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
            setAssetTagPrefix(response.data.assetTagPrefix);
        } catch (error) {
            console.error('Error fetching asset tag prefix:', error);
        }
    };

    const fetchLastAssetId = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
            setLastAssetId(response.data.lastAssetId);
        } catch (error) {
            console.error('Error fetching last asset ID:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;

        if (name === "dimensions_enabled") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        } else {
            if (name === "name") {
                const currentYear = new Date().getFullYear();
                const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
                const selectedAsset = assetMaster.find(asset => asset.assetmaster_name === value);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                    assettag: generatedAssetTag,
                    assetMaster_id: selectedAsset ? selectedAsset.id : "",
                    serial: selectedAsset ? selectedAsset.serial_number : "",
                    assetType: selectedAsset ? selectedAsset.asset_type : "",
                    rtoName: selectedAsset ? selectedAsset.rto_name : "",
                    registrationNumber: selectedAsset ? selectedAsset.registration_number : "",
                }));
            } else if (name === "location") {
                const selectedSite = sites.find(site => site.siteName === value);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                    site_id: selectedSite ? selectedSite.id : "",
                }));
            } else if (name === "vendorcompanyname") {
                const selectedVendor = vendors.find(vendor => vendor.vendorCompanyName === value);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                    vendor_id: selectedVendor ? selectedVendor.id : "",
                }));
            } else if (name === "categoryName") {
                const selectedCategory = categories.find(category => category.categoryName === value);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                    category_id: selectedCategory ? selectedCategory.id : "",
                }));
            } else if (name === "brand") {
                const selectedBrand = brands.find(brand => brand.brandName === value);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                    brand_id: selectedBrand ? selectedBrand.id : "",
                }));
            } else if (name === "length" || name === "width" || name === "height") {
                const numValue = /^[0-9\b]+$/;
                if (value === '' || numValue.test(value)) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        [name]: value,
                    }));
                }
            } else {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: value,
                }));
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size / 1024;
            if (fileSize > 200) {
                setError("Maximum file size is 200KB");
            } else {
                setError("");
                setFormData(prevFormData => ({
                    ...prevFormData,
                    picture: file
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "dimensions_enabled") {
                formDataToSend.append("dimensions_enabled", formData[key]);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        const assetInfo = {
            asset_name: formData.name,
            asset_tag: formData.assettag,
            vendor_name: formData.vendorcompanyname,
            brand_name: formData.brand,
            serial_no: formData.serial,
            asset_type: formData.assetType,
            cost: formData.cost,
            purchase_date: formData.purchaseDate,
            description: formData.description,
            category_name: formData.categoryName,
            rto_name: formData.rtoName,
            registration: formData.registrationNumber
        };
        const assetInfoString = JSON.stringify(assetInfo);
        formDataToSend.append('qrCodeData', assetInfoString);

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_LOCAL_URL}/assets/${asset.asset_master_id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Asset updated successfully:", response.data);
            if (onUpdate) onUpdate();
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
            id="add"
            className="modal fade show"
            role="dialog"
            style={{ display: "block", paddingRight: "17px" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form
                        action=""
                        id="formadd"
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
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Asset Name<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="assetName"
                                        type="text"
                                        id="assetName"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled
                                    />

                                </div>

                                <div className="form-group col-md-6">
                                    <label>Asset tag<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="assettag"
                                        type="text"
                                        id="assettag"
                                        className="form-control"
                                        value={formData.assettag}
                                        onChange={handleChange}
                                        required
                                        placeholder="Asset tag"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Dimensions<span style={{ color: "red" }}>*</span></label>
                                    <div className="d-flex align-items-center gap-5">
                                        <div className="form-check" style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="dimensions_yes"
                                                name="dimensions_enabled"
                                                value="yes"
                                                checked={formData.dimensions_enabled === "yes"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="dimensions_yes" className="form-check-label">Yes</label>
                                        </div>
                                        <div className="form-check" style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="dimensions_no"
                                                name="dimensions_enabled"
                                                value="no"
                                                checked={formData.dimensions_enabled === "no"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="dimensions_no" className="form-check-label">No</label>
                                        </div>
                                    </div>
                                    {formData.dimensions_enabled === "yes" && (
                                        <>
                                            <div className="form-group col-md-4">
                                                <label>Length (m)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="length"
                                                    value={formData.length}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Width (m)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Width"
                                                    name="width"
                                                    value={formData.width}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label>Height (m)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="height"
                                                    value={formData.height}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Units</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="units"
                                                    value={formData.units}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            
                                        </>
                                    )}
                                </div>


                                <div className="form-group col-md-6">
                                    <label>Take Insurance<span style={{ color: "red" }}>*</span></label>
                                    <select name="takeInsurance" className="form-control" value={formData.takeInsurance} onChange={handleChange} required>
                                        <option value="" hidden>Take Insurance</option>
                                        <option value="Yes">YES</option>
                                        <option value="No">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Location<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="location"
                                        id="location"
                                        className="form-control"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        disabled
                                        placeholder="Location"
                                    >
                                        <option value="" disabled hidden>Location</option>
                                        {sites.map((site) => (
                                            <option key={site.id} value={site.siteName}>
                                                {site.siteName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Vendor<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="vendorcompanyname"
                                        id="vendorcompanyname"
                                        className="form-control"
                                        value={formData.vendorcompanyname}
                                        onChange={handleChange}
                                        required
                                        placeholder="Vendor"
                                    >
                                        <option value="" disabled hidden>Vendor</option>
                                        {vendors.map((vendor) => (
                                            <option key={vendor.id} value={vendor.vendorCompanyName}>
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
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                        placeholder="Brand"
                                    >
                                        <option value="" disabled hidden>Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.brandName}>
                                                {brand.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Serial<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="serial"
                                        type="text"
                                        id="serial"
                                        className="form-control"
                                        value={formData.serial}
                                        onChange={handleChange}
                                        required
                                        placeholder="Serial"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Asset Type<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="assetType"
                                        type="text"
                                        id="assetType"
                                        className="form-control"
                                        value={formData.assetType}
                                        onChange={handleChange}
                                        required
                                        placeholder="Asset Type"
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>RTO Name<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="rtoName"
                                        type="text"
                                        id="rtoName"
                                        className="form-control"
                                        value={formData.rtoName}
                                        onChange={handleChange}
                                        required
                                        placeholder="RTO Name"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Registration Number<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="registrationNumber"
                                        type="text"
                                        id="registrationNumber"
                                        className="form-control"
                                        value={formData.registrationNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="Registration Number"
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Cost<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="cost"
                                        type="text"
                                        id="cost"
                                        className="form-control"
                                        value={formData.cost}
                                        onChange={handleChange}
                                        required
                                        placeholder="Cost"
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Category Name<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="categoryName"
                                        id="categoryName"
                                        className="form-control"
                                        value={formData.categoryName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Category Name"
                                    >
                                        <option value="" disabled hidden>Category Name</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Description<span style={{ color: "red" }}>*</span></label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Asset Picture<span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="picture"
                                        type="file"
                                        id="picture"
                                        className="form-control"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                <small>Maximum : 200KB</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditAssetModal
