// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddMaintenanceData = ({ onClose, onUpdateMaintenances }) => {
//   const [formData, setFormData] = useState({
//     asset_master_id: "", // Change to asset_master_id
//     assetName: "",
//     employee_id: "",
//     assetTag: "",
//     assetPhoto: "",
//     repairMaintenanceService: "",
//     issueInAsset: "",
//     serviceType: "",
//     employeeName: "",
//     serviceName: "",
//     serviceAddress: "",
//     startDate: "",
//     endDate: "",
//     remarks: "",
//     bill: null,
//     task: "unfinished",
//   });

//   const [assets, setAssets] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
//         setAssets(response.data);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//         setEmployees(response.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     fetchAssets();
//     fetchEmployees();
//   }, []);


//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     if (name === 'serviceType') {
//       setFormData({
//         ...formData,
//         [name]: value,
//         employeeName: "",
//         serviceName: "",
//         serviceAddress: ""
//       });
//     } else if (name === 'employeeName' && formData.serviceType === "In-house") {
//       const selectedEmployee = employees.find((employee) => employee.ename === value);
//       if (selectedEmployee) {
//         setFormData({
//           ...formData,
//           employee_id: selectedEmployee.id,
//           [name]: value
//         });
//       }
//     } else if (name === 'serviceName' && formData.serviceType === "Service Center") {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     } else if (name === 'asset_master_id') { // Change to asset_master_id
//       const selectedAsset = assets.find((asset) => asset.asset_master_id === parseInt(value)); // Change to asset_master_id
//       if (selectedAsset) {
//         setFormData({
//           ...formData,
//           asset_master_id: value, // Change to asset_master_id
//           assetName: selectedAsset.name,
//           assetTag: selectedAsset.assettag,
//           assetPhoto: `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${selectedAsset.picture}`,
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "file" ? e.target.files[0] : value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = [
//       "asset_master_id", // Change to asset_master_id
//       "assetName",
//       "assetTag",
//       "assetPhoto",
//       "repairMaintenanceService",
//       "issueInAsset",
//       "serviceType",
//       "startDate",
//       "endDate",
//       "remarks",
//     ];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }
//     setError("");

//     try {
//       const formDataToSend = new FormData();
//       for (let key in formData) {
//         if (key === 'employeeName' && formData.serviceType === "In-house") {
//           formDataToSend.append('employeeName', formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       }

//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/maintenancedata`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Maintenance data uploaded successfully:", response.data);
//       onClose();
//       onUpdateMaintenances();
//     } catch (error) {
//       console.error("Error uploading maintenance data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

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
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Maintenance Data</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <div style={{ flex: "2", paddingRight: "20px" }}>
//                   <div className="form-group">
//                     <label>Asset<span style={{ color: "red" }}>*</span></label>
//                     <select name="asset_master_id" className="form-control" value={formData.asset_master_id} onChange={handleChange} required>
//                       <option value="">Select Asset</option>
//                       {assets.map((asset) => (
//                         <option key={asset.asset_master_id} value={asset.asset_master_id}>{asset.name}</option> // Change to asset_master_id
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required name="assetTag" type="text" className="form-control" placeholder="Asset Tag" value={formData.assetTag} onChange={handleChange} />
//                   </div>
//                 </div>
//                 <div style={{ flex: "1" }}>
//                   <div className="form-group">
//                     <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
//                     <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
//                       {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Repair/Maintenance/Service<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="repairMaintenanceService"
//                   className="form-control"
//                   value={formData.repairMaintenanceService}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="Repair">Repair</option>
//                   <option value="Maintenance">Maintenance</option>
//                   <option value="Service">Service</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Issue in Asset<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   name="issueInAsset"
//                   className="form-control"
//                   placeholder="Issue In Asset"
//                   value={formData.issueInAsset}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Service Type<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="serviceType"
//                   className="form-control"
//                   value={formData.serviceType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="In-house">In-house</option>
//                   <option value="Service Center">Service Center</option>
//                 </select>
//               </div>
//               {formData.serviceType === "In-house" && (
//                 <div className="form-group">
//                   <label>Employee Name<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="employeeName"
//                     className="form-control"
//                     value={formData.employeeName}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Employee</option>
//                     {employees.map((employee) => (
//                       <option key={employee.id} value={employee.ename}>{employee.ename}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {formData.serviceType === "Service Center" && (
//                 <>
//                   <div className="form-group">
//                     <label>Service Name<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required
//                       name="serviceName"
//                       type="text"
//                       className="form-control"
//                       value={formData.serviceName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Service Center Address<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required
//                       name="serviceAddress"
//                       type="text"
//                       className="form-control"
//                       value={formData.serviceAddress}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="form-group">
//                 <label>Start Date<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   required
//                   name="startDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Date<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   required
//                   name="endDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Remarks<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   name="remarks"
//                   className="form-control"
//                   placeholder="Remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Upload Bill / Optional</label>
//                 <input
//                   required
//                   name="bill"
//                   type="file"
//                   className="form-control-file"
//                   onChange={handleChange}
//                   accept=".jpg,.pdf"
//                 />
//               </div>
//               <small>Max size: 200 KB</small>
//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">Save</button>
//               <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleClose}>Close</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMaintenanceData;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddMaintenanceData = ({ onClose, onUpdateMaintenances }) => {
//   const [formData, setFormData] = useState({
//     asset_master_id: "",
//     assetName: "",
//     employee_id: "",
//     assetTag: "",
//     assetPhoto: "",
//     repairMaintenanceService: "",
//     issueInAsset: "",
//     serviceType: "",
//     employeeName: "",
//     serviceName: "",
//     serviceAddress: "",
//     startDate: "",
//     endDate: "",
//     remarks: "",
//     bill: null,
//     task: "unfinished",
//   });

//   const [assets, setAssets] = useState([]);
//   const [allAssets, setAllAssets] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedAsset, setSelectedAsset] = useState("");
//   const [quantity, setQuantity] = useState(0);
//   const [currentQuantity, setCurrentQuantity] = useState(0);
//   const [transferFrom, setTransferFrom] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
//         setAssets(response.data);
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//         setEmployees(response.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     fetchAssets();
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (selectedAsset) {
//       axios.get(`${process.env.REACT_APP_LOCAL_URL}/allassets/${selectedAsset}`)
//         .then(response => {
//           setAllAssets(response.data);
//           const asset = response.data.find(a => a.asset_master_id === parseInt(selectedAsset));
//           if (asset) {
//             setCurrentQuantity(asset.quantity);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching assets:', error);
//         });
//     }
//   }, [selectedAsset]);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     if (name === 'serviceType') {
//       setFormData({
//         ...formData,
//         [name]: value,
//         employeeName: "",
//         serviceName: "",
//         serviceAddress: ""
//       });
//     } else if (name === 'employeeName' && formData.serviceType === "In-house") {
//       const selectedEmployee = employees.find((employee) => employee.ename === value);
//       if (selectedEmployee) {
//         setFormData({
//           ...formData,
//           employee_id: selectedEmployee.id,
//           [name]: value
//         });
//       }
//     } else if (name === 'serviceName' && formData.serviceType === "Service Center") {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     } else if (name === 'asset_master_id') {
//       const selectedAsset = assets.find((asset) => asset.asset_master_id === parseInt(value));
//       if (selectedAsset) {
//         setFormData({
//           ...formData,
//           asset_master_id: value,
//           assetName: selectedAsset.name,
//           assetTag: selectedAsset.assettag,
//           assetPhoto: `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${selectedAsset.picture}`,
//         });
//         setSelectedAsset(value);
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "file" ? e.target.files[0] : value,
//       });
//     }
//   };

//   useEffect(() => {
//     if (transferFrom && Array.isArray(assets)) {
//       const currentLocation = assets.find(a => a.location === transferFrom);
//       setCurrentQuantity(currentLocation ? currentLocation.quantity : 0);
//       const selectedAsset = assets.find(asset => asset.location === transferFrom);

//       if (selectedAsset) {
//         setFormData({
//           ...formData,
//           Checkout_site_master_id: selectedAsset.site_master_id ?? null,
//           Checkout_client_master_id: selectedAsset.client_master_id ?? null,
//           Checkout_employee_master_id: selectedAsset.employee_master_id ?? null
//         });
//       }
//     }
//   }, [transferFrom, assets]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (quantity >= currentQuantity) {
//       setError('Transfer quantity exceeds available quantity.');
//       return;
//     }

//     const requiredFields = [
//       "asset_master_id",
//       "assetName",
//       "assetTag",
//       "assetPhoto",
//       "repairMaintenanceService",
//       "issueInAsset",
//       "serviceType",
//       "startDate",
//       "endDate",
//       "remarks",
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     setError("");

//     try {
//       const formDataToSend = new FormData();
//       for (let key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }

//       // Append other fields separately
//       formDataToSend.append("transferFrom", transferFrom);
//       formDataToSend.append("quantity", quantity);

//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/maintenancedata`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Maintenance data uploaded successfully:", response.data);
//       onClose();
//       onUpdateMaintenances();
//     } catch (error) {
//       console.error("Error uploading maintenance data:", error);
//       setError("Error uploading maintenance data. Please try again.");
//     }
//   };


//   const handleClose = () => {
//     onClose();
//   };


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
//             autoComplete="off"
//             noValidate="novalidate"
//             onSubmit={handleSubmit}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title">Add Maintenance Data</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}
//             >
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <div style={{ flex: "2", paddingRight: "20px" }}>
//                   <div className="form-group">
//                     <label>Asset<span style={{ color: "red" }}>*</span></label>
//                     <select name="asset_master_id" className="form-control" value={formData.asset_master_id} onChange={handleChange} required>
//                       <option value="">Select Asset</option>
//                       {assets.map((asset) => (
//                         <option key={asset.asset_master_id} value={asset.asset_master_id}>{asset.name}</option> // Change to asset_master_id
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required name="assetTag" type="text" className="form-control" placeholder="Asset Tag" value={formData.assetTag} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="currentLocation">Current Location<span style={{ color: "red" }}>*</span></label>
//                     <select
//                       className="form-control"
//                       id="currentLocation"
//                       value={transferFrom}
//                       onChange={(e) => setTransferFrom(e.target.value)}
//                       required
//                     >
//                       <option value="">Select Current Location</option>
//                       {Array.isArray(allAssets) && allAssets.map((assetItem) => (
//                         <option key={assetItem.location} value={assetItem.location}>{assetItem.location} (Qty. {assetItem.quantity})</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div style={{ flex: "1" }}>
//                   <div className="form-group">
//                     <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
//                     <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
//                       {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Repair/Maintenance/Service<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="repairMaintenanceService"
//                   className="form-control"
//                   value={formData.repairMaintenanceService}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="Repair">Repair</option>
//                   <option value="Maintenance">Maintenance</option>
//                   <option value="Service">Service</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Issue in Asset<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   name="issueInAsset"
//                   className="form-control"
//                   placeholder="Issue In Asset"
//                   value={formData.issueInAsset}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Service Type<span style={{ color: "red" }}>*</span></label>
//                 <select
//                   name="serviceType"
//                   className="form-control"
//                   value={formData.serviceType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="In-house">In-house</option>
//                   <option value="Service Center">Service Center</option>
//                 </select>
//               </div>
//               {formData.serviceType === "In-house" && (
//                 <div className="form-group">
//                   <label>Employee Name<span style={{ color: "red" }}>*</span></label>
//                   <select
//                     name="employeeName"
//                     className="form-control"
//                     value={formData.employeeName}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Employee</option>
//                     {employees.map((employee) => (
//                       <option key={employee.id} value={employee.ename}>{employee.ename}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {formData.serviceType === "Service Center" && (
//                 <>
//                   <div className="form-group">
//                     <label>Service Name<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required
//                       name="serviceName"
//                       type="text"
//                       className="form-control"
//                       value={formData.serviceName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Service Center Address<span style={{ color: "red" }}>*</span></label>
//                     <input
//                       required
//                       name="serviceAddress"
//                       type="text"
//                       className="form-control"
//                       value={formData.serviceAddress}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="form-group">
//                 <label htmlFor="quantity">Quantity<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   className="form-control"
//                   required
//                   placeholder="Quantity"
//                   id="quantity"
//                   name="quantity"
//                   type="number"
//                   min="0"
//                   max={currentQuantity}
//                   value={quantity}
//                   onChange={(e) => {
//                     const value = parseInt(e.target.value, 10);
//                     if (!isNaN(value) && value >= 0 && value <= currentQuantity) {
//                       setQuantity(value);
//                     } else {
//                       // Optionally, you can set an error state or show a message to the user
//                       setError('Please enter a valid quantity between 1 and ' + currentQuantity);
//                     }
//                   }}
//                 />
//               </div>


//               <div className="form-group">
//                 <label>Start Date<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   required
//                   name="startDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Date<span style={{ color: "red" }}>*</span></label>
//                 <input
//                   required
//                   name="endDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Remarks<span style={{ color: "red" }}>*</span></label>
//                 <textarea
//                   name="remarks"
//                   className="form-control"
//                   placeholder="Remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Upload Bill / Optional</label>
//                 <input
//                   required
//                   name="bill"
//                   type="file"
//                   className="form-control-file"
//                   onChange={handleChange}
//                   accept=".jpg,.pdf"
//                 />
//               </div>
//               <small>Max size: 200 KB</small>
//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary" id="save">Save</button>
//               <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleClose}>Close</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMaintenanceData;




import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMaintenanceData = ({ onClose, onUpdateMaintenances }) => {
  const [formData, setFormData] = useState({
    asset_master_id: "",
    assetName: "",
    employee_id: "",
    assetTag: "",
    assetPhoto: "",
    repairMaintenanceService: "",
    issueInAsset: "",
    serviceType: "",
    employeeName: "",
    serviceName: "",
    serviceAddress: "",
    startDate: "",
    endDate: "",
    remarks: "",
    bill: null,
    task: "unfinished",
  });

  const [assets, setAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [transferFrom, setTransferFrom] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchAssets();
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedAsset) {
      axios.get(`${process.env.REACT_APP_LOCAL_URL}/allassets/${selectedAsset}`)
        .then(response => {
          setAllAssets(response.data);
          const asset = response.data.find(a => a.asset_master_id === parseInt(selectedAsset));
          if (asset) {
            setCurrentQuantity(asset.quantity);
          }
        })
        .catch(error => {
          console.error('Error fetching assets:', error);
        });
    }
  }, [selectedAsset]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'serviceType') {
      setFormData({
        ...formData,
        [name]: value,
        employeeName: "",
        serviceName: "",
        serviceAddress: ""
      });
    } else if (name === 'employeeName' && formData.serviceType === "In-house") {
      const selectedEmployee = employees.find((employee) => employee.ename === value);
      if (selectedEmployee) {
        setFormData({
          ...formData,
          employee_id: selectedEmployee.id,
          [name]: value
        });
      }
    } else if (name === 'serviceName' && formData.serviceType === "Service Center") {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (name === 'asset_master_id') {
      const selectedAsset = assets.find((asset) => asset.asset_master_id === parseInt(value));
      if (selectedAsset) {
        setFormData({
          ...formData,
          asset_master_id: value,
          assetName: selectedAsset.name,
          assetTag: selectedAsset.assettag,
          assetPhoto: selectedAsset.picture,
        });
        setSelectedAsset(value);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "file" ? e.target.files[0] : value,
      });
    }
  };

  useEffect(() => {
    if (transferFrom && Array.isArray(assets)) {
      const currentLocation = assets.find(a => a.location === transferFrom);
      setCurrentQuantity(currentLocation ? currentLocation.quantity : 0);
      const selectedAsset = assets.find(asset => asset.location === transferFrom);

      if (selectedAsset) {
        setFormData({
          ...formData,
          Checkout_site_master_id: selectedAsset.site_master_id ?? null,
          Checkout_client_master_id: selectedAsset.client_master_id ?? null,
          Checkout_employee_master_id: selectedAsset.employee_master_id ?? null
        });
      }
    }
  }, [transferFrom, assets]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity <= 0 || quantity >= currentQuantity) {
      setError('Please enter a valid quantity between 0 and ' + currentQuantity);
      return;
    }

    const requiredFields = [
      "asset_master_id",
      "assetName",
      "assetTag",
      "assetPhoto",
      "repairMaintenanceService",
      "issueInAsset",
      "serviceType",
      "startDate",
      "endDate",
      "remarks",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    setError("");

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Append other fields separately
      formDataToSend.append("transferFrom", transferFrom);
      formDataToSend.append("quantity", quantity);

      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/maintenancedata`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Maintenance data uploaded successfully:", response.data);
      onClose();
      onUpdateMaintenances();
    } catch (error) {
      console.error("Error uploading maintenance data:", error);
      setError("Error uploading maintenance data. Please try again.");
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
            autoComplete="off"
            noValidate="novalidate"
            onSubmit={handleSubmit}
          >
            <div className="modal-header">
              <h5 className="modal-title">Add Maintenance Data</h5>
              <button type="button" className="close" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}
            >
              {error && <div className="alert alert-danger">{error}</div>}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", paddingRight: "20px" }}>
                  <div className="form-group">
                    <label>Asset<span style={{ color: "red" }}>*</span></label>
                    <select name="asset_master_id" className="form-control" value={formData.asset_master_id} onChange={handleChange} required>
                      <option value="">Select Asset</option>
                      {assets.map((asset) => (
                        <option key={asset.asset_master_id} value={asset.asset_master_id}>{asset.name}</option> // Change to asset_master_id
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
                    <input
                      required name="assetTag" type="text" className="form-control" placeholder="Asset Tag" value={formData.assetTag} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="currentLocation">Current Location<span style={{ color: "red" }}>*</span></label>
                    <select
                      className="form-control"
                      id="currentLocation"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                      required
                    >
                      <option value="">Select Current Location</option>
                      {Array.isArray(allAssets) && allAssets.map((assetItem) => (
                        <option key={assetItem.location} value={assetItem.location}>{assetItem.location} (Qty. {assetItem.quantity})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ flex: "1" }}>
                  <div className="form-group">
                    <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
                    <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>

                      {formData.assetPhoto &&
                        <img
                          src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${formData.assetPhoto}`}
                          alt="Asset Picture" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Repair/Maintenance/Service<span style={{ color: "red" }}>*</span></label>
                <select
                  name="repairMaintenanceService"
                  className="form-control"
                  value={formData.repairMaintenanceService}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Repair">Repair</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div className="form-group">
                <label>Issue in Asset<span style={{ color: "red" }}>*</span></label>
                <textarea
                  name="issueInAsset"
                  className="form-control"
                  placeholder="Issue In Asset"
                  value={formData.issueInAsset}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Service Type<span style={{ color: "red" }}>*</span></label>
                <select
                  name="serviceType"
                  className="form-control"
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="In-house">In-house</option>
                  <option value="Service Center">Service Center</option>
                </select>
              </div>
              {formData.serviceType === "In-house" && (
                <div className="form-group">
                  <label>Employee Name<span style={{ color: "red" }}>*</span></label>
                  <select
                    name="employeeName"
                    className="form-control"
                    value={formData.employeeName}
                    onChange={handleChange}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.ename}>{employee.ename}</option>
                    ))}
                  </select>
                </div>
              )}
              {formData.serviceType === "Service Center" && (
                <>
                  <div className="form-group">
                    <label>Service Name<span style={{ color: "red" }}>*</span></label>
                    <input
                      required
                      name="serviceName"
                      type="text"
                      className="form-control"
                      value={formData.serviceName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Service Center Address<span style={{ color: "red" }}>*</span></label>
                    <input
                      required
                      name="serviceAddress"
                      type="text"
                      className="form-control"
                      value={formData.serviceAddress}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="form-group">
                <label htmlFor="quantity">Quantity<span style={{ color: "red" }}>*</span></label>
                <input
                  className="form-control"
                  required
                  placeholder="Quantity"
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  max={currentQuantity}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 0 && value <= currentQuantity) {
                      setQuantity(value);
                      setError(""); // Clear error if valid input
                    } else {
                      setError('Please enter a valid quantity between 0 and ' + currentQuantity);
                    }
                  }}
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>


              <div className="form-group">
                <label>Start Date<span style={{ color: "red" }}>*</span></label>
                <input
                  required
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>End Date<span style={{ color: "red" }}>*</span></label>
                <input
                  required
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Remarks<span style={{ color: "red" }}>*</span></label>
                <textarea
                  name="remarks"
                  className="form-control"
                  placeholder="Remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Upload Bill / Optional</label>
                <input
                  required
                  name="bill"
                  type="file"
                  className="form-control-file"
                  onChange={handleChange}
                  accept=".jpg,.pdf"
                />
              </div>
              <small>Max size: 200 KB</small>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" id="save">Save</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleClose}>Close</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};

export default AddMaintenanceData;


