// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddMaintenanceData = ({ onClose, onUpdateMaintenances }) => {
//   const [formData, setFormData] = useState({
//     asset_id: "",
//     assetName: "", // Added assetName field
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
//     task: "unfinished", // Added task field with default value "unfinished"
//   });

//   const [assets, setAssets] = useState([]); // State to store asset data
//   const [employees, setEmployees] = useState([]); // State to store employee data
//   const [error, setError] = useState(""); //Error 

//   useEffect(() => {
//     // Fetch assets from the database
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);
//         setAssets(response.data); // Update assets state with fetched asset data
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     // Fetch employees from the database
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//         setEmployees(response.data); // Update employees state with fetched employee data
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
//       // Reset employeeName, serviceName, and serviceAddress if service type changes
//       setFormData({
//         ...formData,
//         [name]: value,
//         employeeName: "", // Reset employeeName
//         serviceName: "", // Reset serviceName
//         serviceAddress: "" // Reset serviceAddress
//       });
//     } else if (name === 'employeeName' && formData.serviceType === "In-house") {
//       // When selecting employeeName in In-house service type, store employee_id in formData
//       const selectedEmployee = employees.find((employee) => employee.ename === value);
//       if (selectedEmployee) {
//         setFormData({
//           ...formData,
//           employee_id: selectedEmployee.id, // Store employee_id
//           [name]: value
//         });
//       }
//     } else if (name === 'serviceName' && formData.serviceType === "Service Center") {
//       // When selecting serviceName in Service Center service type, store it in formData
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     } else if (name === 'asset_id') {
//       // Find the selected asset by its ID
//       const selectedAsset = assets.find((asset) => asset.id === parseInt(value));
//       if (selectedAsset) {
//         // Update the form data with the selected asset details
//         setFormData({
//           ...formData,
//           asset_id: value,
//           assetName: selectedAsset.name,
//           assetTag: selectedAsset.assettag, // Update assetTag field
//           assetPhoto: `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${selectedAsset.picture}`,
//         });
//       }
//     } else {
//       // Set other form data fields
//       setFormData({
//         ...formData,
//         [name]: type === "file" ? e.target.files[0] : value,
//       });
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = [
//       "asset_id",
//       "assetName",
//       "assetTag",
//       "assetPhoto",
//       "repairMaintenanceService",
//       "issueInAsset",
//       "serviceType",
//       "employeeName",
//       "serviceName",
//       "serviceAddress",
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
//           // If service type is In-house, send employee_id instead of employeeName
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
//             "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
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
//                     <label>Asset</label>
//                     <select name="asset_id" className="form-control" value={formData.asset_id} onChange={handleChange} required>
//                       <option value="">Select Asset</option>
//                       {assets.map((asset) => (
//                         <option key={asset.id} value={asset.id}>{asset.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Asset Tag</label>
//                     <input
//                       required name="assetTag" type="text" className="form-control" value={formData.assetTag} onChange={handleChange} />
//                   </div>
//                 </div>
//                 <div style={{ flex: "1" }}>
//                   <div className="form-group">
//                     <label>Asset Photo</label>
//                     <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
//                       {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Repair/Maintenance/Service</label>
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
//                 <label>Issue in Asset</label>
//                 <textarea
//                   name="issueInAsset"
//                   className="form-control"
//                   value={formData.issueInAsset}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Service Type</label>
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
//                   <label>Employee Name</label>
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
//                     <label>Service Name</label>
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
//                     <label>Service Center Address</label>
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
//                 <label>Start Date</label>
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
//                 <label>End Date</label>
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
//                 <label>Remarks</label>
//                 <textarea
//                   name="remarks"
//                   className="form-control"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Upload Bill (Max size: 200 KB) </label>
//                 <input
//                   required
//                   name="bill"
//                   type="file"
//                   className="form-control-file"
//                   onChange={handleChange}
//                   accept=".jpg,.pdf"
//                 />
//               </div>
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
//     asset_id: "",
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
//     } else if (name === 'asset_id') {
//       const selectedAsset = assets.find((asset) => asset.id === parseInt(value));
//       if (selectedAsset) {
//         setFormData({
//           ...formData,
//           asset_id: value,
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
//       "asset_id",
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
//                     <select name="asset_id" className="form-control" value={formData.asset_id} onChange={handleChange} required>
//                       <option value="">Select Asset</option>
//                       {assets.map((asset) => (
//                         <option key={asset.id} value={asset.id}>{asset.name}</option>
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


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMaintenanceData = ({ onClose, onUpdateMaintenances }) => {
  const [formData, setFormData] = useState({
    asset_master_id: "", // Change to asset_master_id
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
  const [employees, setEmployees] = useState([]);
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
    } else if (name === 'asset_master_id') { // Change to asset_master_id
      const selectedAsset = assets.find((asset) => asset.asset_master_id === parseInt(value)); // Change to asset_master_id
      if (selectedAsset) {
        setFormData({
          ...formData,
          asset_master_id: value, // Change to asset_master_id
          assetName: selectedAsset.name,
          assetTag: selectedAsset.assettag,
          assetPhoto: `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${selectedAsset.picture}`,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "file" ? e.target.files[0] : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "asset_master_id", // Change to asset_master_id
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
        if (key === 'employeeName' && formData.serviceType === "In-house") {
          formDataToSend.append('employeeName', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

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
                </div>
                <div style={{ flex: "1" }}>
                  <div className="form-group">
                    <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
                    <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                      {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
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
      </div>
    </div>
  );
};

export default AddMaintenanceData;
