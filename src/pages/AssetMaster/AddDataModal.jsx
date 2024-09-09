// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "", // Added assetType state
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState(""); // Added assetTagPrefix state

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix(); // Fetch asset tag prefix
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching Sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

// const fetchAssetTagPrefix = async () => { // Fetch asset tag prefix function
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//     setAssetTagPrefix(response.data.assetTagPrefix);
//   } catch (error) {
//     console.error('Error fetching asset tag prefix:', error);
//   }
// };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "name") {
//       const currentYear = new Date().getFullYear();
//       const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`; // Use asset tag prefix

//       setFormData({
//         ...formData,
//         [name]: value,
//         assettag: generatedAssetTag,
//       });
//     } else if (name === "vendorcompanyname") {
//       const selectedVendor = vendors.find(
//         (vendor) => vendor.vendorCompanyName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         vendor_id: selectedVendor ? selectedVendor.id : "",
//       });
//     } else if (name === "categoryName") {
//       const selectedCategory = categories.find(
//         (category) => category.categoryName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         category_id: selectedCategory ? selectedCategory.id : "",
//       });
//     } else if (name === "brand") {
//       const selectedBrand = brands.find(
//         (brand) => brand.brandName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         brand_id: selectedBrand ? selectedBrand.id : "",
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: name === "picture" ? files[0] : value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024; // in KB

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name:formData.name,
//       asset_tag:formData.assettag,
//       vendor_name:formData.vendorcompanyname,
//       brand_name:formData.brand,
//       serial_no:formData.serial,
//       asset_type:formData.assetType,
//       cost:formData.cost,
//       purchase_date:formData.purchaseDate,
//       description:formData.description,
//       category_name:formData.categoryName,
//       picture:formData.picture,
//       rto_name:formData.rtoName,
//       registration:formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/assetdata`,
//         formDataToSend
//       );
//       console.log("Data uploaded successfully:", response.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

//   return (
//     <div
//       id="add"
//       className="modal fade show"
//       role="dialog"
//       style={{ display: "block", paddingRight: "17px" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form
//             action=""
//             id="formadd"
//             encType="multipart/form-data"
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Asset</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="name"
//                     type="text"
//                     id="name"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Name"
//                   />
//                 </div>

//                 <div className="form-group col-md-6">
//                   <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     id="assettag"
//                     className="form-control"
//                     value={formData.assettag}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset tag"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Category<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="categoryName"
//                     id="categoryName"
//                     className="form-control"
//                     value={formData.categoryName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Categories</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="vendorcompanyname"
//                     id="vendorcompanyname"
//                     className="form-control"
//                     value={formData.vendorcompanyname}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Vendor</option>
//                     {vendors.map((vendor) => (
//                       <option key={vendor.id} value={vendor.vendorCompanyName}>
//                         {vendor.vendorCompanyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Brand<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="brand"
//                     id="brand"
//                     className="form-control"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Brand</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.brandName}>
//                         {brand.brandName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="serial"
//                     type="text"
//                     id="serial"
//                     className="form-control"
//                     value={formData.serial}
//                     onChange={handleChange}
//                     required
//                     placeholder="Serial No."
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="assetType"
//                     id="assetType"
//                     className="form-control"
//                     value={formData.assetType}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Asset Type</option>
//                     <option value="Movable">Movable</option>
//                     <option value="Immovable">Immovable</option>
//                     <option value="Digital Asset">Digital Asset</option>
//                     <option value="Fixed Asset">Consumable Asset</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="location"
//                     type="text"
//                     id="location"
//                     className="form-control"
//                     value={formData.location}
//                     onChange={handleChange}
//                     required
//                     placeholder="Location"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="location"
//                     id="location"
//                     className="form-control"
//                     value={formData.siteName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Location</option>
//                     {sites.map((site) => (
//                       <option key={site.id} value={site.siteName}>
//                         {site.siteName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="cost"
//                     type="number"
//                     id="cost"
//                     className="form-control"
//                     value={formData.cost}
//                     onChange={handleChange}
//                     required
//                     placeholder="Cost"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="purchaseDate"
//                     type="date"
//                     id="purchaseDate"
//                     className="form-control"
//                     value={formData.purchaseDate}
//                     onChange={handleChange}
//                     required
//                     placeholder="Purchase Date"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>RTO Name</label>
//                   <input
//                     name="rtoName"
//                     type="text"
//                     id="rtoName"
//                     className="form-control"
//                     value={formData.rtoName}
//                     onChange={handleChange}
//                     placeholder="RTO Name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Registration Number</label>
//                   <input
//                     name="registrationNumber"
//                     type="text"
//                     id="registrationNumber"
//                     className="form-control"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     placeholder="Registration Number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   id="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Asset Image(Max size: 200 KB)<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="picture"
//                   type="file"
//                   id="assetImage"
//                   className="form-control"
//                   onChange={handleImageChange}
//                   placeholder="Asset Image"
//                 />
//                 <small className="text-muted">Maximum file size: 200KB</small>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-default"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "",
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState("");

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching Sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

//   const fetchAssetTagPrefix = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//       setAssetTagPrefix(response.data.assetTagPrefix);
//     } catch (error) {
//       console.error('Error fetching asset tag prefix:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

// if (name === "name") {
//   const currentYear = new Date().getFullYear();
//   const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
//   setFormData({
//     ...formData,
//     [name]: value,
//     assettag: generatedAssetTag,
//   });
//     } else if (name === "vendorcompanyname") {
//       const selectedVendor = vendors.find(
//         (vendor) => vendor.vendorCompanyName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         vendor_id: selectedVendor ? selectedVendor.id : "",
//       });
//     } else if (name === "categoryName") {
//       const selectedCategory = categories.find(
//         (category) => category.categoryName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         category_id: selectedCategory ? selectedCategory.id : "",
//       });
//     } else if (name === "brand") {
//       const selectedBrand = brands.find(
//         (brand) => brand.brandName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         brand_id: selectedBrand ? selectedBrand.id : "",
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: name === "picture" ? files[0] : value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024;

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name: formData.name,
//       asset_tag: formData.assettag,
//       vendor_name: formData.vendorcompanyname,
//       brand_name: formData.brand,
//       serial_no: formData.serial,
//       asset_type: formData.assetType,
//       cost: formData.cost,
//       purchase_date: formData.purchaseDate,
//       description: formData.description,
//       category_name: formData.categoryName,
//       picture: formData.picture,
//       rto_name: formData.rtoName,
//       registration: formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       formDataToSend.append(key, formData[key]);
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/assetdata`,
//         formDataToSend
//       );
//       console.log("Data uploaded successfully:", response.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

//   return (
//     <div
//       id="add"
//       className="modal fade show"
//       role="dialog"
//       style={{ display: "block", paddingRight: "17px" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form
//             action=""
//             id="formadd"
//             encType="multipart/form-data"
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Asset</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="name"
//                     type="text"
//                     id="name"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Name"
//                   />
//                 </div>

//                 <div className="form-group col-md-6">
//                   <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     id="assettag"
//                     className="form-control"
//                     value={formData.assettag}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset tag"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Quantity<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="quantity"
//                     type="text"
//                     id="quantity"
//                     className="form-control"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     required
//                     placeholder="Quantity"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Dimensions<span style={{ color: "red" }}>*</span></label>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsYes"
//                       value="yes"
//                       checked={formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsYes">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsNo"
//                       value="no"
//                       checked={!formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsNo">
//                       No
//                     </label>
//                   </div>
//                   {formData.dimensions.enabled && (
//                     <div>
//                       <input
//                         name="length"
//                         type="text"
//                         id="length"
//                         className="form-control mt-2"
//                         value={formData.dimensions.length}
//                         onChange={handleChange}
//                         placeholder="Length"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                       <input
//                         name="width"
//                         type="text"
//                         id="width"
//                         className="form-control mt-2"
//                         value={formData.dimensions.width}
//                         onChange={handleChange}
//                         placeholder="Width"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                       <input
//                         name="height"
//                         type="text"
//                         id="height"
//                         className="form-control mt-2"
//                         value={formData.dimensions.height}
//                         onChange={handleChange}
//                         placeholder="Height"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                       <select
//                         name="units"
//                         id="units"
//                         className="form-control mt-2"
//                         value={formData.dimensions.units}
//                         onChange={handleChange}
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the select field when dimensions are enabled
//                       >
//                         <option value="meter">Meter</option>
//                         <option value="cm">Centimeter</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Category<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="categoryName"
//                     id="categoryName"
//                     className="form-control"
//                     value={formData.categoryName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Categories</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="vendorcompanyname"
//                     id="vendorcompanyname"
//                     className="form-control"
//                     value={formData.vendorcompanyname}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Vendor</option>
//                     {vendors.map((vendor) => (
//                       <option key={vendor.id} value={vendor.vendorCompanyName}>
//                         {vendor.vendorCompanyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Brand<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="brand"
//                     id="brand"
//                     className="form-control"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Brand</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.brandName}>
//                         {brand.brandName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="serial"
//                     type="text"
//                     id="serial"
//                     className="form-control"
//                     value={formData.serial}
//                     onChange={handleChange}
//                     required
//                     placeholder="Serial No."
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="assetType"
//                     id="assetType"
//                     className="form-control"
//                     value={formData.assetType}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Select Asset Type</option>
//                     <option value="Movable">Movable</option>
//                     <option value="Immovable">Immovable</option>
//                     <option value="Digital Asset">Digital Asset</option>
//                     <option value="Fixed Asset">Consumable Asset</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="location">Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="location"
//                     id="location"
//                     className="form-control"
//                     value={formData.location} // Changed formData.siteName to formData.location
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Asset Location</option>
//                     {sites.map((site) => (
//                       <option key={site.id} value={site.siteName}>
//                         {site.siteName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="cost"
//                     type="number"
//                     id="cost"
//                     className="form-control"
//                     value={formData.cost}
//                     onChange={handleChange}
//                     required
//                     placeholder="Cost"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="purchaseDate"
//                     type="date"
//                     id="purchaseDate"
//                     className="form-control"
//                     value={formData.purchaseDate}
//                     onChange={handleChange}
//                     required
//                     placeholder="Purchase Date"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>RTO Name</label>
//                   <input
//                     name="rtoName"
//                     type="text"
//                     id="rtoName"
//                     className="form-control"
//                     value={formData.rtoName}
//                     onChange={handleChange}
//                     placeholder="RTO Name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Registration Number</label>
//                   <input
//                     name="registrationNumber"
//                     type="text"
//                     id="registrationNumber"
//                     className="form-control"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     placeholder="Registration Number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   id="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="picture"
//                   type="file"
//                   id="assetImage"
//                   className="form-control"
//                   onChange={handleImageChange}
//                   placeholder="Asset Image"
//                 />
//                 <small className="text-muted">Maximum file size: 200KB</small>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-default"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "",
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: "",
//     dimensions: {
//       enabled: false,
//       length: "",
//       width: "",
//       height: "",
//       units: ""
//     },
//     quantity: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState("");

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching Sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

//   const fetchAssetTagPrefix = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//       setAssetTagPrefix(response.data.assetTagPrefix);
//     } catch (error) {
//       console.error('Error fetching asset tag prefix:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "name") {
//       const currentYear = new Date().getFullYear();
//       const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
//       setFormData({
//         ...formData,
//         [name]: value,
//         assettag: generatedAssetTag,
//       });
//     } else if (name === "vendorcompanyname") {
//       const selectedVendor = vendors.find(
//         (vendor) => vendor.vendorCompanyName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         vendor_id: selectedVendor ? selectedVendor.id : "",
//       });
//     } else if (name === "categoryName") {
//       const selectedCategory = categories.find(
//         (category) => category.categoryName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         category_id: selectedCategory ? selectedCategory.id : "",
//       });
//     } else if (name === "brand") {
//       const selectedBrand = brands.find(
//         (brand) => brand.brandName === value
//       );

//       setFormData({
//         ...formData,
//         [name]: value,
//         brand_id: selectedBrand ? selectedBrand.id : "",
//       });
//     } else if (name === "dimensionsEnabled") {
//       const { checked } = e.target;
//       setFormData({
//         ...formData,
//         dimensions: {
//           ...formData.dimensions,
//           enabled: checked,
//         },
//       });
//     } else if (name === "length" || name === "width" || name === "height") {
//       // Ensure that only numbers are accepted for length, width, and height
//       const numValue = /^[0-9\b]+$/;
//       if (value === '' || numValue.test(value)) {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             [name]: value,
//           },
//         });
//       }
//     } else if (name === "units") {
//       setFormData({
//         ...formData,
//         dimensions: {
//           ...formData.dimensions,
//           units: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: name === "picture" ? files[0] : value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024;

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName", "quantity"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name: formData.name,
//       asset_tag: formData.assettag,
//       vendor_name: formData.vendorcompanyname,
//       brand_name: formData.brand,
//       serial_no: formData.serial,
//       asset_type: formData.assetType,
//       cost: formData.cost,
//       purchase_date: formData.purchaseDate,
//       description: formData.description,
//       category_name: formData.categoryName,
//       picture: formData.picture,
//       rto_name: formData.rtoName,
//       registration: formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "dimensions") {
//         Object.keys(formData.dimensions).forEach((dimKey) => {
//           formDataToSend.append(`dimensions[${dimKey}]`, formData.dimensions[dimKey]);
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       // Upload asset data
//       const assetUploadResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/assetdata`, formDataToSend);
//       console.log("Asset data uploaded successfully:", assetUploadResponse.data);

//       // Send data to transfer history
//       const transferHistoryResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/transfer_history`, {
//         asset_name: formData.name,
//         asset_tag: formData.assettag,
//         to_site: formData.location,
//         quantity_transferred: formData.quantity
//       });
//       console.log("Transfer history data uploaded successfully:", transferHistoryResponse.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };




//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

// return (
//   <div
//     id="add"
//     className="modal fade show"
//     role="dialog"
//     style={{ display: "block", paddingRight: "17px" }}
//   >
//     <div className="modal-dialog modal-lg">
//       <div className="modal-content">
//         <form
//           action=""
//           id="formadd"
//           encType="multipart/form-data"
//           autoComplete="off"
//           noValidate="novalidate"
//           onSubmit={handleSubmit}
//         >
//           <div className="modal-header">
//             <h5 className="modal-title">Add Asset</h5>
//             <button type="button" className="close" onClick={handleClose}>
//               &times;
//             </button>
//           </div>
//           <div
//             className="modal-body"
//             style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//           >
//             {error && <div className="alert alert-danger">{error}</div>}
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="name"
//                   type="text"
//                   id="name"
//                   className="form-control"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Name"
//                 />
//               </div>

//               <div className="form-group col-md-6">
//                 <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="assettag"
//                   type="text"
//                   id="assettag"
//                   className="form-control"
//                   value={formData.assettag}
//                   onChange={handleChange}
//                   required
//                   placeholder="Asset tag"
//                   disabled
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Quantity<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="quantity"
//                   type="text"
//                   id="quantity"
//                   className="form-control"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   required
//                   placeholder="Quantity"
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label>Dimensions<span style={{ color: "red" }}>*</span></label>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="dimensionsEnabled"
//                     id="dimensionsYes"
//                     value="yes"
//                     checked={formData.dimensions.enabled}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label" htmlFor="dimensionsYes">
//                     Yes
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="dimensionsEnabled"
//                     id="dimensionsNo"
//                     value="no"
//                     checked={!formData.dimensions.enabled}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label" htmlFor="dimensionsNo">
//                     No
//                   </label>
//                 </div>
//                 {formData.dimensions.enabled && (
//                   <div>
//                     <select
//                     required
//                       name="units"
//                       id="units"
//                       className="form-control mt-2"
//                       value={formData.dimensions.units}
//                       onChange={handleChange}
//                     >
//                       <option value="meter">Meter</option>
//                       <option value="cm">Centimeter</option>
//                     </select>
//                     <input
//                     required
//                       name="length"
//                       type="text"
//                       id="length"
//                       className="form-control mt-2"
//                       value={formData.dimensions.length}
//                       onChange={handleChange}
//                       placeholder="Length"
//                       disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                     />
//                     <input
//                     required
//                       name="width"
//                       type="text"
//                       id="width"
//                       className="form-control mt-2"
//                       value={formData.dimensions.width}
//                       onChange={handleChange}
//                       placeholder="Width"
//                       disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                     />
//                     <input
//                     required
//                       name="height"
//                       type="text"
//                       id="height"
//                       className="form-control mt-2"
//                       value={formData.dimensions.height}
//                       onChange={handleChange}
//                       placeholder="Height"
//                       disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Category<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="categoryName"
//                   id="categoryName"
//                   className="form-control"
//                   value={formData.categoryName}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Categories</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.categoryName}>
//                       {category.categoryName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group col-md-6">
//                 <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="vendorcompanyname"
//                   id="vendorcompanyname"
//                   className="form-control"
//                   value={formData.vendorcompanyname}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Vendor</option>
//                   {vendors.map((vendor) => (
//                     <option key={vendor.id} value={vendor.vendorCompanyName}>
//                       {vendor.vendorCompanyName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Brand<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="brand"
//                   id="brand"
//                   className="form-control"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Brand</option>
//                   {brands.map((brand) => (
//                     <option key={brand.id} value={brand.brandName}>
//                       {brand.brandName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group col-md-6">
//                 <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="serial"
//                   type="text"
//                   id="serial"
//                   className="form-control"
//                   value={formData.serial}
//                   onChange={handleChange}
//                   required
//                   placeholder="Serial No."
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="assetType"
//                   id="assetType"
//                   className="form-control"
//                   value={formData.assetType}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Select Asset Type</option>
//                   <option value="Movable">Movable</option>
//                   <option value="Immovable">Immovable</option>
//                   <option value="Digital Asset">Digital Asset</option>
//                   <option value="Fixed Asset">Consumable Asset</option>
//                 </select>
//               </div>
//               <div className="form-group col-md-6">
//                 <label htmlFor="location">Asset Location<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="location"
//                   id="location"
//                   className="form-control"
//                   value={formData.location} // Changed formData.siteName to formData.location
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Asset Location</option>
//                   {sites.map((site) => (
//                     <option key={site.id} value={site.siteName}>
//                       {site.siteName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="cost"
//                   type="number"
//                   id="cost"
//                   className="form-control"
//                   value={formData.cost}
//                   onChange={handleChange}
//                   required
//                   placeholder="Cost"
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="purchaseDate"
//                   type="date"
//                   id="purchaseDate"
//                   className="form-control"
//                   value={formData.purchaseDate}
//                   onChange={handleChange}
//                   required
//                   placeholder="Purchase Date"
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-6">
//                 <label>RTO Name</label>
//                 <input
//                   name="rtoName"
//                   type="text"
//                   id="rtoName"
//                   className="form-control"
//                   value={formData.rtoName}
//                   onChange={handleChange}
//                   placeholder="RTO Name"
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label>Registration Number</label>
//                 <input
//                   name="registrationNumber"
//                   type="text"
//                   id="registrationNumber"
//                   className="form-control"
//                   value={formData.registrationNumber}
//                   onChange={handleChange}
//                   placeholder="Registration Number"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Description<span style={{ color: "red" }}>*</span></label>
//               <textarea
//                 className="form-control"
//                 name="description"
//                 id="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//               ></textarea>
//             </div>
//             <div className="form-group">
//               <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//               <input
//                 name="picture"
//                 type="file"
//                 id="assetImage"
//                 className="form-control"
//                 onChange={handleImageChange}
//                 placeholder="Asset Image"
//               />
//               <small className="text-muted">Maximum file size: 200KB</small>
//             </div>

//           </div>
//           <div className="modal-footer">
//             <button type="submit" className="btn btn-primary" id="save">
//               Save
//             </button>
//             <button
//               type="button"
//               className="btn btn-default"
//               data-dismiss="modal"
//               onClick={handleClose}
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );
// };

// export default AddDataModal;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assetMaster_id: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     site_id: "", // Added site_id to formData state
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "",
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: "",
//     dimensions: {
//       enabled: false,
//       length: "",
//       width: "",
//       height: "",
//       units: ""
//     },
//     quantity: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [assetMaster, setAssetMaster] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState("");

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix();
//     fetchAssetMaster();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchAssetMaster = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset/master`);
//       setAssetMaster(response.data);
//     } catch (error) {
//       console.error("Error fetching asset masters:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

//   const fetchAssetTagPrefix = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//       setAssetTagPrefix(response.data.assetTagPrefix);
//     } catch (error) {
//       console.error('Error fetching asset tag prefix:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "name") {
//       const currentYear = new Date().getFullYear();
//       const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
//       const selectedAsset = assetMaster.find(asset => asset.assetmaster_name === value);
//       setFormData({
//         ...formData,
//         [name]: value,
//         assettag: generatedAssetTag,
//         assetMaster_id: selectedAsset ? selectedAsset.id : "",
//       });
//     } else if (name === "location") {
//       const selectedSite = sites.find(site => site.siteName === value);
//       setFormData({
//         ...formData,
//         [name]: value,
//         site_id: selectedSite ? selectedSite.id : "",
//       });
//     } else if (name === "vendorcompanyname") {
//       const selectedVendor = vendors.find(vendor => vendor.vendorCompanyName === value);
//       setFormData({
//         ...formData,
//         [name]: value,
//         vendor_id: selectedVendor ? selectedVendor.id : "",
//       });
//     } else if (name === "categoryName") {
//       const selectedCategory = categories.find(category => category.categoryName === value);
//       setFormData({
//         ...formData,
//         [name]: value,
//         category_id: selectedCategory ? selectedCategory.id : "",
//       });
//     } else if (name === "brand") {
//       const selectedBrand = brands.find(brand => brand.brandName === value);
//       setFormData({
//         ...formData,
//         [name]: value,
//         brand_id: selectedBrand ? selectedBrand.id : "",
//       });
//     } else if (name === "dimensionsEnabled") {
//       const { checked } = e.target;
//       setFormData({
//         ...formData,
//         dimensions: {
//           ...formData.dimensions,
//           enabled: checked,
//         },
//       });
//     } else if (name === "length" || name === "width" || name === "height") {
//       // Ensure that only numbers are accepted for length, width, and height
//       const numValue = /^[0-9\b]+$/;
//       if (value === '' || numValue.test(value)) {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             [name]: value,
//           },
//         });
//       }
//     } else if (name === "units") {
//       setFormData({
//         ...formData,
//         dimensions: {
//           ...formData.dimensions,
//           units: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: name === "picture" ? files[0] : value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024;

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName", "quantity"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name: formData.name,
//       asset_tag: formData.assettag,
//       vendor_name: formData.vendorcompanyname,
//       brand_name: formData.brand,
//       serial_no: formData.serial,
//       asset_type: formData.assetType,
//       cost: formData.cost,
//       purchase_date: formData.purchaseDate,
//       description: formData.description,
//       category_name: formData.categoryName,
//       picture: formData.picture,
//       rto_name: formData.rtoName,
//       registration: formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "dimensions") {
//         Object.keys(formData.dimensions).forEach((dimKey) => {
//           formDataToSend.append(`dimensions[${dimKey}]`, formData.dimensions[dimKey]);
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       // Upload asset data
//       const assetUploadResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/assetdata`, formDataToSend);
//       console.log("Asset data uploaded successfully:", assetUploadResponse.data);

//       // Send data to transfer history
//       const transferHistoryResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/transfer_history`, {
//         asset_name: formData.name,
//         asset_tag: formData.assettag,
//         to_site: formData.location,
//         assetMaster_id: formData.assetMaster_id, // Include assetMaster_id here
//         quantity_transferred: formData.quantity

//       });
//       console.log("Transfer history data uploaded successfully:", transferHistoryResponse.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

//   return (
//     <div
//       id="add"
//       className="modal fade show"
//       role="dialog"
//       style={{ display: "block", paddingRight: "17px" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form
//             action=""
//             id="formadd"
//             encType="multipart/form-data"
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Asset</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-row">
//                  <div className="form-group col-md-6">
//                    <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                    <select
//                      name="name"
//                      id="name"
//                      className="form-control"
//                      value={formData.name} 
//                      onChange={handleChange}
//                      required
//                      placeholder="Asset Name"
//                    >
//                      <option value="" disabled hidden>Asset Name</option>
//                      {assetMaster.map((asset) => (
//                        <option key={asset.id} value={asset.assetmaster_name}>
//                          {asset.assetmaster_name}
//                        </option>
//                      ))}
//                    </select>
//                  </div>

//                  <div className="form-group col-md-6">
//                    <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                    <input
//                      name="assettag"
//                      type="text"
//                      id="assettag"
//                      className="form-control"
//                      value={formData.assettag}
//                      onChange={handleChange}
//                      required
//                      placeholder="Asset tag"
//                      disabled
//                    />
//                  </div>
//                </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Quantity<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="quantity"
//                     type="text"
//                     id="quantity"
//                     className="form-control"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     required
//                     placeholder="Quantity"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Dimensions<span style={{ color: "red" }}>*</span></label>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsYes"
//                       value="yes"
//                       checked={formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsYes">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsNo"
//                       value="no"
//                       checked={!formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsNo">
//                       No
//                     </label>
//                   </div>
//                   {formData.dimensions.enabled && (
//                     <div>
//                       <select
//                         required
//                         name="units"
//                         id="units"
//                         className="form-control mt-2"
//                         value={formData.dimensions.units}
//                         onChange={handleChange}
//                       >
//                         <option value="meter">Meter</option>
//                         <option value="cm">Centimeter</option>
//                       </select>
//                       <input
//                         required
//                         name="length"
//                         type="text"
//                         id="length"
//                         className="form-control mt-2"
//                         value={formData.dimensions.length}
//                         onChange={handleChange}
//                         placeholder="Length"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                       <input
//                         required
//                         name="width"
//                         type="text"
//                         id="width"
//                         className="form-control mt-2"
//                         value={formData.dimensions.width}
//                         onChange={handleChange}
//                         placeholder="Width"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                       <input
//                         required
//                         name="height"
//                         type="text"
//                         id="height"
//                         className="form-control mt-2"
//                         value={formData.dimensions.height}
//                         onChange={handleChange}
//                         placeholder="Height"
//                         disabled={!formData.dimensions.enabled} // Make sure to enable the field when dimensions are enabled
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Category<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="categoryName"
//                     id="categoryName"
//                     className="form-control"
//                     value={formData.categoryName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Categories</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="vendorcompanyname"
//                     id="vendorcompanyname"
//                     className="form-control"
//                     value={formData.vendorcompanyname}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Vendor</option>
//                     {vendors.map((vendor) => (
//                       <option key={vendor.id} value={vendor.vendorCompanyName}>
//                         {vendor.vendorCompanyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Brand<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="brand"
//                     id="brand"
//                     className="form-control"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Brand</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.brandName}>
//                         {brand.brandName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="serial"
//                     type="text"
//                     id="serial"
//                     className="form-control"
//                     value={formData.serial}
//                     onChange={handleChange}
//                     required
//                     placeholder="Serial No."
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="assetType"
//                     id="assetType"
//                     className="form-control"
//                     value={formData.assetType}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Select Asset Type</option>
//                     <option value="Movable">Movable</option>
//                     <option value="Immovable">Immovable</option>
//                     <option value="Digital Asset">Digital Asset</option>
//                     <option value="Fixed Asset">Consumable Asset</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="location">Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="location"
//                     id="location"
//                     className="form-control"
//                     value={formData.location} // Changed formData.siteName to formData.location
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Asset Location</option>
//                     {sites.map((site) => (
//                       <option key={site.id} value={site.siteName}>
//                         {site.siteName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="cost"
//                     type="number"
//                     id="cost"
//                     className="form-control"
//                     value={formData.cost}
//                     onChange={handleChange}
//                     required
//                     placeholder="Cost"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="purchaseDate"
//                     type="date"
//                     id="purchaseDate"
//                     className="form-control"
//                     value={formData.purchaseDate}
//                     onChange={handleChange}
//                     required
//                     placeholder="Purchase Date"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>RTO Name</label>
//                   <input
//                     name="rtoName"
//                     type="text"
//                     id="rtoName"
//                     className="form-control"
//                     value={formData.rtoName}
//                     onChange={handleChange}
//                     placeholder="RTO Name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Registration Number</label>
//                   <input
//                     name="registrationNumber"
//                     type="text"
//                     id="registrationNumber"
//                     className="form-control"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     placeholder="Registration Number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   id="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="picture"
//                   type="file"
//                   id="assetImage"
//                   className="form-control"
//                   onChange={handleImageChange}
//                   placeholder="Asset Image"
//                 />
//                 <small className="text-muted">Maximum file size: 200KB</small>
//               </div>

//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-default"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assetMaster_id: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     site_id: "", // Added site_id to formData state
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "",
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: "",
//     dimensions: {
//       enabled: "",
//       length: "",
//       width: "",
//       height: "",
//       units: ""
//     },
//     quantity: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [assetMaster, setAssetMaster] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState("");

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix();
//     fetchAssetMaster();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchAssetMaster = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset/master`);
//       setAssetMaster(response.data);
//     } catch (error) {
//       console.error("Error fetching asset masters:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchAssetTagPrefix = async () => { // Fetch asset tag prefix function
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//       setAssetTagPrefix(response.data.assetTagPrefix);
//     } catch (error) {
//       console.error('Error fetching asset tag prefix:', error);
//     }
//   };


//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === "radio") {
//       if (name === "dimensionsEnabled") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             enabled: value === "yes",
//           },
//         });
//       }
//     } else {
//       if (name === "name") {
//         const currentYear = new Date().getFullYear();
//         const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
//         const selectedAsset = assetMaster.find(asset => asset.assetmaster_name === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           assettag: generatedAssetTag,
//           assetMaster_id: selectedAsset ? selectedAsset.id : "",
//           serial: selectedAsset ? selectedAsset.serial : "",
//           assetType: selectedAsset ? selectedAsset.assetType : "",
//           rtoName: selectedAsset ? selectedAsset.rtoName : "",
//           registrationNumber: selectedAsset ? selectedAsset.registrationNumber : "",
//           picture: selectedAsset ? selectedAsset.picture : "",
//         });
//       } else if (name === "location") {
//         const selectedSite = sites.find(site => site.siteName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           site_id: selectedSite ? selectedSite.id : "",
//         });
//       } else if (name === "vendorcompanyname") {
//         const selectedVendor = vendors.find(vendor => vendor.vendorCompanyName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           vendor_id: selectedVendor ? selectedVendor.id : "",
//         });
//       } else if (name === "categoryName") {
//         const selectedCategory = categories.find(category => category.categoryName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           category_id: selectedCategory ? selectedCategory.id : "",
//         });
//       } else if (name === "brand") {
//         const selectedBrand = brands.find(brand => brand.brandName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           brand_id: selectedBrand ? selectedBrand.id : "",
//         });
//       } else if (name === "dimensionsEnabled") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             enabled: checked,
//           },
//         });
//       } else if (name === "length" || name === "width" || name === "height") {
//         // Ensure that only numbers are accepted for length, width, and height
//         const numValue = /^[0-9\b]+$/;
//         if (value === '' || numValue.test(value)) {
//           setFormData({
//             ...formData,
//             dimensions: {
//               ...formData.dimensions,
//               [name]: value,
//             },
//           });
//         }
//       } else if (name === "units") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             units: value,
//           },
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: name === "picture" ? files[0] : value,
//         });
//       }
//     }
//   };


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024;

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName", "quantity"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name: formData.name,
//       asset_tag: formData.assettag,
//       vendor_name: formData.vendorcompanyname,
//       brand_name: formData.brand,
//       serial_no: formData.serial,
//       asset_type: formData.assetType,
//       cost: formData.cost,
//       purchase_date: formData.purchaseDate,
//       description: formData.description,
//       category_name: formData.categoryName,
//       picture: formData.picture,
//       rto_name: formData.rtoName,
//       registration: formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "dimensions") {
//         Object.keys(formData.dimensions).forEach((dimKey) => {
//           formDataToSend.append(`dimensions[${dimKey}]`, formData.dimensions[dimKey]);
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       // Upload asset data
//       const assetUploadResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/assetdata`, formDataToSend);
//       console.log("Asset data uploaded successfully:", assetUploadResponse.data);

//       // Send data to transfer history
//       const transferHistoryResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/transfer_history`, {
//         assetMaster_id: formData.assetMaster_id, // Include assetMaster_id here
//         location: formData.location,
//         quantity: formData.quantity,
//         assetName: formData.name, // Include formData name

//       });
//       console.log("Transfer history data uploaded successfully:", transferHistoryResponse.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

//   return (
//     <div
//       id="add"
//       className="modal fade show"
//       role="dialog"
//       style={{ display: "block", paddingRight: "17px" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form
//             action=""
//             id="formadd"
//             encType="multipart/form-data"
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Asset</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="name"
//                     id="name"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset Name"
//                   >
//                     <option value="" disabled hidden>Asset Name</option>
//                     {assetMaster.map((asset) => (
//                       <option key={asset.id} value={asset.assetmaster_name}>
//                         {asset.assetmaster_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group col-md-6">
//                   <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     id="assettag"
//                     className="form-control"
//                     value={formData.assettag}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset tag"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Quantity<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="quantity"
//                     type="text"
//                     id="quantity"
//                     className="form-control"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     required
//                     placeholder="Quantity"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Dimensions<span style={{ color: "red"}}>*</span></label>
//                   <div className="form-check" style={{ marginLeft: "5px" }} >
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsYes"
//                       value="yes"
//                       checked={formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsYes">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="form-check " style={{ marginLeft: "5px" }}>
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsNo"
//                       value="no"
//                       checked={!formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsNo">
//                       No
//                     </label>
//                   </div>
//                   {formData.dimensions.enabled && (
//                     <div>
//                       <select
//                         required
//                         name="units"
//                         id="units"
//                         className="form-control mt-2"
//                         value={formData.dimensions.units}
//                         onChange={handleChange}
//                       >
//                         <option value="meter">Meter</option>
//                         <option value="cm">Centimeter</option>
//                       </select>
//                       <input
//                         required
//                         name="length"
//                         type="text"
//                         id="length"
//                         className="form-control mt-2"
//                         value={formData.dimensions.length}
//                         onChange={handleChange}
//                         placeholder="Length"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                       <input
//                         required
//                         name="width"
//                         type="text"
//                         id="width"
//                         className="form-control mt-2"
//                         value={formData.dimensions.width}
//                         onChange={handleChange}
//                         placeholder="Width"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                       <input
//                         required
//                         name="height"
//                         type="text"
//                         id="height"
//                         className="form-control mt-2"
//                         value={formData.dimensions.height}
//                         onChange={handleChange}
//                         placeholder="Height"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Category<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="categoryName"
//                     id="categoryName"
//                     className="form-control"
//                     value={formData.categoryName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Categories</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="vendorcompanyname"
//                     id="vendorcompanyname"
//                     className="form-control"
//                     value={formData.vendorcompanyname}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Vendor</option>
//                     {vendors.map((vendor) => (
//                       <option key={vendor.id} value={vendor.vendorCompanyName}>
//                         {vendor.vendorCompanyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Brand<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="brand"
//                     id="brand"
//                     className="form-control"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Brand</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.brandName}>
//                         {brand.brandName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="serial"
//                     type="text"
//                     id="serial"
//                     className="form-control"
//                     value={formData.serial}
//                     onChange={handleChange}
//                     required
//                     placeholder="Serial No."
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="assetType"
//                     id="assetType"
//                     className="form-control"
//                     value={formData.assetType}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Select Asset Type</option>
//                     <option value="Movable">Movable</option>
//                     <option value="Immovable">Immovable</option>
//                     <option value="Digital Asset">Digital Asset</option>
//                     <option value="Fixed Asset">Consumable Asset</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="location">Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="location"
//                     id="location"
//                     className="form-control"
//                     value={formData.location} // Changed formData.siteName to formData.location
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Asset Location</option>
//                     {sites.map((site) => (
//                       <option key={site.id} value={site.siteName}>
//                         {site.siteName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="cost"
//                     type="number"
//                     id="cost"
//                     className="form-control"
//                     value={formData.cost}
//                     onChange={handleChange}
//                     required
//                     placeholder="Cost"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="purchaseDate"
//                     type="date"
//                     id="purchaseDate"
//                     className="form-control"
//                     value={formData.purchaseDate}
//                     onChange={handleChange}
//                     required
//                     placeholder="Purchase Date"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>RTO Name</label>
//                   <input
//                     name="rtoName"
//                     type="text"
//                     id="rtoName"
//                     className="form-control"
//                     value={formData.rtoName}
//                     onChange={handleChange}
//                     placeholder="RTO Name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Registration Number</label>
//                   <input
//                     name="registrationNumber"
//                     type="text"
//                     id="registrationNumber"
//                     className="form-control"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     placeholder="Registration Number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   id="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="picture"
//                   type="file"
//                   id="assetImage"
//                   className="form-control"
//                   onChange={handleImageChange}
//                   placeholder="Asset Image"
//                 />
//                 <small className="text-muted">Maximum file size: 200KB</small>
//               </div>

//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-default"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateAssets }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     assetMaster_id: "",
//     assettag: "",
//     vendorcompanyname: "",
//     vendor_id: "",
//     location: "",
//     site_id: "",
//     brand: "",
//     brand_id: "",
//     serial: "",
//     assetType: "",
//     cost: "",
//     purchaseDate: "",
//     description: "",
//     categoryName: "",
//     category_id: "",
//     picture: null,
//     rtoName: "",
//     registrationNumber: "",
//     dimensions: {
//       enabled: "",
//       length: "",
//       width: "",
//       height: "",
//       units: ""
//     },
//     quantity: ""
//   });

//   const [vendors, setVendors] = useState([]);
//   const [assetMaster, setAssetMaster] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [qrCodeData, setQRCodeData] = useState(null);
//   const [lastAssetId, setLastAssetId] = useState(0);
//   const [assetTagPrefix, setAssetTagPrefix] = useState("");

//   useEffect(() => {
//     fetchVendors();
//     fetchBrands();
//     fetchCategories();
//     fetchLastAssetId();
//     fetchSites();
//     fetchAssetTagPrefix();
//     fetchAssetMaster();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching vendors:", error);
//     }
//   };

//   const fetchAssetMaster = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/asset/master`);
//       setAssetMaster(response.data);
//     } catch (error) {
//       console.error("Error fetching asset masters:", error);
//     }
//   };

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching sites:", error);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
//       setBrands(response.data);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'asset');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const fetchAssetTagPrefix = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
//       setAssetTagPrefix(response.data.assetTagPrefix);
//     } catch (error) {
//       console.error('Error fetching asset tag prefix:', error);
//     }
//   };

//   const fetchLastAssetId = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/lastAssetId`);
//       setLastAssetId(response.data.lastAssetId);
//     } catch (error) {
//       console.error('Error fetching last asset ID:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === "radio") {
//       if (name === "dimensionsEnabled") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             enabled: value === "yes",
//           },
//         });
//       }
//     } else {
//       if (name === "name") {
//         const currentYear = new Date().getFullYear();
//         const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
//         const selectedAsset = assetMaster.find(asset => asset.assetmaster_name === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           assettag: generatedAssetTag,
//           assetMaster_id: selectedAsset ? selectedAsset.id : "",
//           serial: selectedAsset ? selectedAsset.serial : "",
//           assetType: selectedAsset ? selectedAsset.assetType : "",
//           rtoName: selectedAsset ? selectedAsset.rtoName : "",
//           registrationNumber: selectedAsset ? selectedAsset.registrationNumber : "",
//           picture: selectedAsset ? selectedAsset.picture : "",
//         });
//       } else if (name === "location") {
//         const selectedSite = sites.find(site => site.siteName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           site_id: selectedSite ? selectedSite.id : "",
//         });
//       } else if (name === "vendorcompanyname") {
//         const selectedVendor = vendors.find(vendor => vendor.vendorCompanyName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           vendor_id: selectedVendor ? selectedVendor.id : "",
//         });
//       } else if (name === "categoryName") {
//         const selectedCategory = categories.find(category => category.categoryName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           category_id: selectedCategory ? selectedCategory.id : "",
//         });
//       } else if (name === "brand") {
//         const selectedBrand = brands.find(brand => brand.brandName === value);
//         setFormData({
//           ...formData,
//           [name]: value,
//           brand_id: selectedBrand ? selectedBrand.id : "",
//         });
//       } else if (name === "dimensionsEnabled") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             enabled: checked,
//           },
//         });
//       } else if (name === "length" || name === "width" || name === "height") {
//         const numValue = /^[0-9\b]+$/;
//         if (value === '' || numValue.test(value)) {
//           setFormData({
//             ...formData,
//             dimensions: {
//               ...formData.dimensions,
//               [name]: value,
//             },
//           });
//         }
//       } else if (name === "units") {
//         setFormData({
//           ...formData,
//           dimensions: {
//             ...formData.dimensions,
//             units: value,
//           },
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [name]: name === "picture" ? files[0] : value,
//         });
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const fileSize = file.size / 1024;

//     if (fileSize > 200) {
//       setError("Maximum file size is 200KB");
//     } else {
//       setError("");
//       setFormData({
//         ...formData,
//         picture: file
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName", "quantity"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     if (!formData.picture) {
//       setError("Please upload file");
//       return;
//     }

//     setError("");

//     const assetInfo = {
//       asset_name: formData.name,
//       asset_tag: formData.assettag,
//       vendor_name: formData.vendorcompanyname,
//       brand_name: formData.brand,
//       serial_no: formData.serial,
//       asset_type: formData.assetType,
//       cost: formData.cost,
//       purchase_date: formData.purchaseDate,
//       description: formData.description,
//       category_name: formData.categoryName,
//       picture: formData.picture,
//       rto_name: formData.rtoName,
//       registration: formData.registrationNumber
//     };
//     const assetInfoString = JSON.stringify(assetInfo);
//     setQRCodeData(assetInfoString);

//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "dimensions") {
//         Object.keys(formData.dimensions).forEach((dimKey) => {
//           formDataToSend.append(`dimensions[${dimKey}]`, formData.dimensions[dimKey]);
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     formDataToSend.append('qrCodeData', assetInfoString);
//     try {
//       const assetUploadResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/assetdata`, formDataToSend);
//       console.log("Asset data uploaded successfully:", assetUploadResponse.data);

//       const transferHistoryResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/transfer_history`, {
//         assetMaster_id: formData.assetMaster_id,
//         location: formData.location,
//         quantity: formData.quantity,
//         assetName: formData.name,
//       });
//       console.log("Transfer history data uploaded successfully:", transferHistoryResponse.data);

//       onClose();
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   useEffect(() => {
//     console.log("Form data:", formData);
//   }, [formData]);

//   return (
//     <div
//       id="add"
//       className="modal fade show"
//       role="dialog"
//       style={{ display: "block", paddingRight: "17px" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form
//             action=""
//             id="formadd"
//             encType="multipart/form-data"
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Asset</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="name"
//                     id="name"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset Name"
//                   >
//                     <option value="" disabled hidden>Asset Name</option>
//                     {assetMaster.map((asset) => (
//                       <option key={asset.id} value={asset.assetmaster_name}>
//                         {asset.assetmaster_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group col-md-6">
//                   <label>Asset tag<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     id="assettag"
//                     className="form-control"
//                     value={formData.assettag}
//                     onChange={handleChange}
//                     required
//                     placeholder="Asset tag"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Quantity<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="quantity"
//                     type="text"
//                     id="quantity"
//                     className="form-control"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     required
//                     placeholder="Quantity"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Dimensions<span style={{ color: "red"}}>*</span></label>
//                   <div className="form-check" style={{ marginLeft: "5px" }} >
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsYes"
//                       value="yes"
//                       checked={formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsYes">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="form-check " style={{ marginLeft: "5px" }}>
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="dimensionsEnabled"
//                       id="dimensionsNo"
//                       value="no"
//                       checked={!formData.dimensions.enabled}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="dimensionsNo">
//                       No
//                     </label>
//                   </div>
//                   {formData.dimensions.enabled && (
//                     <div>
//                       <select
//                         required
//                         name="units"
//                         id="units"
//                         className="form-control mt-2"
//                         value={formData.dimensions.units}
//                         onChange={handleChange}
//                       >
//                         <option value="meter">Meter</option>
//                         <option value="cm">Centimeter</option>
//                       </select>
//                       <input
//                         required
//                         name="length"
//                         type="text"
//                         id="length"
//                         className="form-control mt-2"
//                         value={formData.dimensions.length}
//                         onChange={handleChange}
//                         placeholder="Length"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                       <input
//                         required
//                         name="width"
//                         type="text"
//                         id="width"
//                         className="form-control mt-2"
//                         value={formData.dimensions.width}
//                         onChange={handleChange}
//                         placeholder="Width"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                       <input
//                         required
//                         name="height"
//                         type="text"
//                         id="height"
//                         className="form-control mt-2"
//                         value={formData.dimensions.height}
//                         onChange={handleChange}
//                         placeholder="Height"
//                         disabled={!formData.dimensions.enabled}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Category<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="categoryName"
//                     id="categoryName"
//                     className="form-control"
//                     value={formData.categoryName}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Categories</option>
//                     {categories.map((category) => (
//                       <option key={category.id} value={category.categoryName}>
//                         {category.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="vendorcompanyname"
//                     id="vendorcompanyname"
//                     className="form-control"
//                     value={formData.vendorcompanyname}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Vendor</option>
//                     {vendors.map((vendor) => (
//                       <option key={vendor.id} value={vendor.vendorCompanyName}>
//                         {vendor.vendorCompanyName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Brand<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="brand"
//                     id="brand"
//                     className="form-control"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Brand</option>
//                     {brands.map((brand) => (
//                       <option key={brand.id} value={brand.brandName}>
//                         {brand.brandName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Serial No<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="serial"
//                     type="text"
//                     id="serial"
//                     className="form-control"
//                     value={formData.serial}
//                     onChange={handleChange}
//                     required
//                     placeholder="Serial No."
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="assetType"
//                     id="assetType"
//                     className="form-control"
//                     value={formData.assetType}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Select Asset Type</option>
//                     <option value="Movable">Movable</option>
//                     <option value="Immovable">Immovable</option>
//                     <option value="Digital Asset">Digital Asset</option>
//                     <option value="Fixed Asset">Consumable Asset</option>
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="location">Asset Location<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="location"
//                     id="location"
//                     className="form-control"
//                     value={formData.location} // Changed formData.siteName to formData.location
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="" disabled hidden>Asset Location</option>
//                     {sites.map((site) => (
//                       <option key={site.id} value={site.siteName}>
//                         {site.siteName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>Asset cost<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="cost"
//                     type="number"
//                     id="cost"
//                     className="form-control"
//                     value={formData.cost}
//                     onChange={handleChange}
//                     required
//                     placeholder="Cost"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="purchaseDate"
//                     type="date"
//                     id="purchaseDate"
//                     className="form-control"
//                     value={formData.purchaseDate}
//                     onChange={handleChange}
//                     required
//                     placeholder="Purchase Date"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-6">
//                   <label>RTO Name</label>
//                   <input
//                     name="rtoName"
//                     type="text"
//                     id="rtoName"
//                     className="form-control"
//                     value={formData.rtoName}
//                     onChange={handleChange}
//                     placeholder="RTO Name"
//                   />
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Registration Number</label>
//                   <input
//                     name="registrationNumber"
//                     type="text"
//                     id="registrationNumber"
//                     className="form-control"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     placeholder="Registration Number"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   className="form-control"
//                   name="description"
//                   id="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   name="picture"
//                   type="file"
//                   id="assetImage"
//                   className="form-control"
//                   onChange={handleImageChange}
//                   placeholder="Asset Image"
//                 />
//                 <small className="text-muted">Maximum file size: 200KB</small>
//               </div>

//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-default"
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Close
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDataModal = ({ onClose, onUpdateAssets }) => {
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
    dimensions: {
      enabled: "",
      length: "",
      width: "",
      height: "",
      units: ""
    },
    quantity: ""
  });

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

    if (type === "radio") {
      if (name === "dimensionsEnabled") {
        setFormData({
          ...formData,
          dimensions: {
            ...formData.dimensions,
            enabled: value === "yes",
          },
        });
      }
    } else {
      if (name === "name") {
        const currentYear = new Date().getFullYear();
        const generatedAssetTag = `${assetTagPrefix}${currentYear}${(lastAssetId + 1).toString().padStart(3, '0')}`;
        const selectedAsset = assetMaster.find(asset => asset.assetmaster_name === value);
        setFormData({
          ...formData,
          [name]: value,
          assettag: generatedAssetTag,
          assetMaster_id: selectedAsset ? selectedAsset.id : "",
          serial: selectedAsset ? selectedAsset.serial_number : "",
          assetType: selectedAsset ? selectedAsset.asset_type : "",
          rtoName: selectedAsset ? selectedAsset.rto_name : "",
          registrationNumber: selectedAsset ? selectedAsset.registration_number : "",
        });
      } else if (name === "location") {
        const selectedSite = sites.find(site => site.siteName === value);
        setFormData({
          ...formData,
          [name]: value,
          site_id: selectedSite ? selectedSite.id : "",
        });
      } else if (name === "vendorcompanyname") {
        const selectedVendor = vendors.find(vendor => vendor.vendorCompanyName === value);
        setFormData({
          ...formData,
          [name]: value,
          vendor_id: selectedVendor ? selectedVendor.id : "",
        });
      } else if (name === "categoryName") {
        const selectedCategory = categories.find(category => category.categoryName === value);
        setFormData({
          ...formData,
          [name]: value,
          category_id: selectedCategory ? selectedCategory.id : "",
        });
      } else if (name === "brand") {
        const selectedBrand = brands.find(brand => brand.brandName === value);
        setFormData({
          ...formData,
          [name]: value,
          brand_id: selectedBrand ? selectedBrand.id : "",
        });
      } else if (name === "dimensionsEnabled") {
        setFormData({
          ...formData,
          dimensions: {
            ...formData.dimensions,
            enabled: checked,
          },
        });
      } else if (name === "length" || name === "width" || name === "height") {
        const numValue = /^[0-9\b]+$/;
        if (value === '' || numValue.test(value)) {
          setFormData({
            ...formData,
            dimensions: {
              ...formData.dimensions,
              [name]: value,
            },
          });
        }
      } else if (name === "units") {
        setFormData({
          ...formData,
          dimensions: {
            ...formData.dimensions,
            units: value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: name === "picture" ? files[0] : value,
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileSize = file.size / 1024;

    if (fileSize > 200) {
      setError("Maximum file size is 200KB");
    } else {
      setError("");
      setFormData({
        ...formData,
        picture: file
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "assettag", "vendorcompanyname", "location", "brand", "serial", "assetType", "cost", "purchaseDate", "categoryName", "quantity"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    if (!formData.picture) {
      setError("Please upload file");
      return;
    }

    setError("");

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
      picture: formData.picture,
      rto_name: formData.rtoName,
      registration: formData.registrationNumber
    };
    const assetInfoString = JSON.stringify(assetInfo);
    setQRCodeData(assetInfoString);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "dimensions") {
        Object.keys(formData.dimensions).forEach((dimKey) => {
          formDataToSend.append(`dimensions[${dimKey}]`, formData.dimensions[dimKey]);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append('qrCodeData', assetInfoString);
    try {
      const assetUploadResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/assetdata`, formDataToSend);
      console.log("Asset data uploaded successfully:", assetUploadResponse.data);

      const transferHistoryResponse = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/purchase-history`, {
        formDataToSend,
        assetType: formData.assetType,
        asset_master_id: formData.assetMaster_id,
        assettag: formData.assettag,
        brand: formData.brand,
        brand_id: formData.brand_id,
        category_id: formData.category_id,
        category_name: formData.categoryName,
        cost: formData.cost,
        description: formData.description,
        // height:formData.dimensions[height],
        // length:formData.dimensions[length],
        location: formData.location,
        name: formData.name,
        purchaseDate: formData.purchaseDate,
        qrCodeData: formData.qrCodeData,
        addQuantity: formData.quantity,
        registrationNumber: formData.registrationNumber,
        rtoName: formData.rtoName,
        serial: formData.serial,
        site_master_id: formData.site_id,
        // units:formData.dimensions[units],
        vendor_id: formData.vendor_id,
        vendorcompanyname: formData.vendorcompanyname,
        // width:formData.dimensions[width]
      });
      console.log("Transfer history data uploaded successfully:", transferHistoryResponse.data);

      onClose();
      onUpdateAssets();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

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
              <h5 className="modal-title">Add Asset</h5>
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
                  <select
                    name="name"
                    id="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Asset Name"
                  >
                    <option value="" disabled hidden>Asset Name</option>
                    {assetMaster.map((asset) => (
                      <option key={asset.id} value={asset.assetmaster_name}>
                        {asset.assetmaster_name}
                      </option>
                    ))}
                  </select>
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
                  <label>Quantity<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="quantity"
                    type="text"
                    id="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="Quantity"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Dimensions<span style={{ color: "red" }}>*</span></label>
                  <div className="form-check" style={{ marginLeft: "5px" }} >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dimensionsEnabled"
                      id="dimensionsYes"
                      value="yes"
                      checked={formData.dimensions.enabled}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="dimensionsYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check " style={{ marginLeft: "5px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dimensionsEnabled"
                      id="dimensionsNo"
                      value="no"
                      checked={!formData.dimensions.enabled}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="dimensionsNo">
                      No
                    </label>
                  </div>
                  {formData.dimensions.enabled && (
                    <div>
                      <select
                        required
                        name="units"
                        id="units"
                        className="form-control mt-2"
                        value={formData.dimensions.units}
                        onChange={handleChange}
                      >
                        <option value="meter">Meter</option>
                        <option value="cm">Centimeter</option>
                      </select>
                      <input
                        required
                        name="length"
                        type="text"
                        id="length"
                        className="form-control mt-2"
                        value={formData.dimensions.length}
                        onChange={handleChange}
                        placeholder="Length"
                        disabled={!formData.dimensions.enabled}
                      />
                      <input
                        required
                        name="width"
                        type="text"
                        id="width"
                        className="form-control mt-2"
                        value={formData.dimensions.width}
                        onChange={handleChange}
                        placeholder="Width"
                        disabled={!formData.dimensions.enabled}
                      />
                      <input
                        required
                        name="height"
                        type="text"
                        id="height"
                        className="form-control mt-2"
                        value={formData.dimensions.height}
                        onChange={handleChange}
                        placeholder="Height"
                        disabled={!formData.dimensions.enabled}
                      />
                    </div>
                  )}
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
                <div className="form-group col-md-6">
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
                <div className="form-group col-md-6">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="purchaseDate"
                    type="date"
                    id="purchaseDate"
                    className="form-control"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    required
                    placeholder="Purchase Date"
                  />
                </div>
                <div className="form-group col-md-6">
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
  );
};

export default AddDataModal;
