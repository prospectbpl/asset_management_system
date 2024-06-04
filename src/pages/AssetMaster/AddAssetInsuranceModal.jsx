// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddInsuranceModal = ({ onClose,onUpdateInsurences}) => {
//   const [formData, setFormData] = useState({
//     asset_id: "",
//     assetName: "",
//     assetTag: "",
//     assetPhoto: "",
//     insuranceCompanyName: "",
//     policyNumber: "",
//     startDate: "",
//     endDate: "",
//     premiumAmount: "",
//     coverageType: "",
//     otherCoverageType: "",
//     description: "",
//     contactInformation: "",
//     renewalDate: "",
//     attachments: null,
//   });
//   const [assets, setAssets] = useState([]);
//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   useEffect(() => {
//     // Fetch assets from the database
//     const fetchAssets = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/assets`);
//         // const response = await axios.get("https://demo1server.prospectdigital.in/assets");
//         setAssets(response.data); // Update assets state with fetched asset data
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };
//     fetchAssets();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       // Post insurance data
//       const response = await axios.post(
//         `${apiUrl}/insurance-data`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Post insurance data to insurance history
//       await axios.post(
//         `${apiUrl}/insurance_history/add_data`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Data uploaded successfully:", response.data);
//       onClose();
//       onUpdateInsurences();

//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (name === "asset_id") {
//       // Find the selected asset by its ID
//       const selectedAsset = assets.find((asset) => asset.id === parseInt(value));
//       if (selectedAsset) {
//         // Update the form data with the selected asset details
//         setFormData({
//           ...formData,
//           asset_id: value,
//           assetName: selectedAsset.name,
//           assetTag: selectedAsset.assettag, // Update assetTag field
//           assetPhoto: `${apiUrl}/uploads/assets/${selectedAsset.picture}`,
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "file" ? files[0] : value,
//       });
//     }
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
//               <h5 className="modal-title">Add Insurance Data</h5>
//               <button type="button" className="close" onClick={handleClose}>
//                 &times;
//               </button>
//             </div>
//             <div
//               className="modal-body"
//               style={{
//                 maxHeight: "calc(100vh - 200px)",
//                 overflowY: "auto",
//                 padding: "20px",
//               }}
//             >
//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <div style={{ flex: "2", paddingRight: "20px" }}>
//                   <div className="form-group">
//                     <label>Asset </label>
//                     <select
//                       name="asset_id"
//                       className="form-control"
//                       value={formData.asset_id}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Asset</option>
//                       {assets.map((asset) => (
//                         <option key={asset.id} value={asset.id}>
//                           {asset.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Asset Tag</label>
//                     <input
//                       name="assetTag"
//                       type="text"
//                       className="form-control"
//                       value={formData.assetTag}
//                       onChange={handleChange}
//                     />
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
//                 <label>Insurance Company Name</label>
//                 <input
//                   name="insuranceCompanyName"
//                   type="text"
//                   className="form-control"
//                   value={formData.insuranceCompanyName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Policy Number</label>
//                 <input
//                   name="policyNumber"
//                   type="text"
//                   className="form-control"
//                   value={formData.policyNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Start Date</label>
//                 <input
//                   name="startDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.startDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>End Date</label>
//                 <input
//                   name="endDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.endDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Premium Amount</label>
//                 <input
//                   name="premiumAmount"
//                   type="number"
//                   className="form-control"
//                   value={formData.premiumAmount}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Coverage Type</label>
//                 <select
//                   name="coverageType"
//                   className="form-control"
//                   value={formData.coverageType}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Comprehensive">Comprehensive</option>
//                   <option value="Liability">Liability</option>
//                   <option value="Others">Others</option>
//                 </select>
//               </div>
//               {/* Show additional fields for "Others" coverage type */}
//               {formData.coverageType === "Others" && (
//                 <div className="form-group">
//                   <label>Other Coverage Type</label>
//                   <input
//                     name="otherCoverageType"
//                     type="text"
//                     className="form-control"
//                     value={formData.otherCoverageType}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   name="description"
//                   className="form-control"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Contact Information</label>
//                 <textarea
//                   name="contactInformation"
//                   className="form-control"
//                   value={formData.contactInformation}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Renewal Date</label>
//                 <input
//                   name="renewalDate"
//                   type="date"
//                   className="form-control"
//                   value={formData.renewalDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Attachments</label>
//                 <input
//                   name="attachments"
//                   type="file"
//                   className="form-control-file"
//                   onChange={handleChange}
//                   accept=".jpg,.pdf"
//                   multiple
//                 />
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

// export default AddInsuranceModal;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddInsuranceModal = ({ onClose, onUpdateInsurances }) => {
  const [formData, setFormData] = useState({
    asset_master_id: "",
    assetName: "",
    assetTag: "",
    assetPhoto: "",
    insuranceCompanyName: "",
    policyNumber: "",
    startDate: "",
    endDate: "",
    premiumAmount: "",
    coverageType: "",
    otherCoverageType: "",
    description: "",
    contactInformation: "",
    renewalDate: "",
    attachments: null,
  });
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_LOCAL_URL;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(`${apiUrl}/unique/assets`);
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    fetchAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "asset_master_id",
      "insuranceCompanyName",
      "policyNumber",
      "startDate",
      "endDate",
      "premiumAmount",
      "coverageType",
      "description",
      "contactInformation",
      "renewalDate",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    setError("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${apiUrl}/insurance-data`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await axios.post(
        `${apiUrl}/insurance_history/add_data`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data uploaded successfully:", response.data);
      onClose();
      onUpdateInsurances();

    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "asset_master_id") {
        const selectedAsset = assets.find((asset) => asset.asset_master_id === parseInt(value));
        if (selectedAsset) {
            setFormData({
                ...formData,
                asset_master_id: value,
                assetName: selectedAsset.name,
                assetTag: selectedAsset.assettag,
                assetPhoto: `${apiUrl}/uploads/assets/${selectedAsset.picture}`,
            });
        }
    } else {
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
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
        attachments: file
      });
    }
  };

  return (
    <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form action="" id="formadd" autoComplete="off" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Insurance Data</h5>
              <button type="button" className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", paddingRight: "20px" }}>
                  <div className="form-group">
                    <label>Asset  <span style={{ color: "red" }}>*</span></label>
                    <select
                      name="asset_master_id"
                      className="form-control"
                      value={formData.asset_master_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Asset</option>
                      {assets.map((asset) => (
                        <option key={asset.asset_master_id} value={asset.asset_master_id}>{asset.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Asset Tag <span style={{ color: "red" }}>*</span></label>
                    <input placeholder="Asset Tag" name="assetTag" type="text" className="form-control" value={formData.assetTag} onChange={handleChange} />
                  </div>
                </div>
                <div style={{ flex: "1" }}>
                  <div className="form-group">
                    <label>Asset Photo <span style={{ color: "red" }}>*</span></label>
                    <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                      {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Insurance Company Name  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Company Name" name="insuranceCompanyName" type="text" className="form-control" value={formData.insuranceCompanyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Policy Number  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Policy No." name="policyNumber" type="text" className="form-control" value={formData.policyNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Start Date  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Start Date" name="startDate" type="date" className="form-control" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>End Date  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="End Date" name="endDate" type="date" className="form-control" value={formData.endDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Premium Amount  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Premimum Amount" name="premiumAmount" type="number" className="form-control" value={formData.premiumAmount} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Coverage Type  <span style={{ color: "red" }}>*</span></label>
                <select name="coverageType" className="form-control" value={formData.coverageType} onChange={handleChange} required>
                  <option value="" disabled hidden>Select Type</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Liability">Liability</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {/* Show additional fields for "Others" coverage type */}
              {formData.coverageType === "Others" && (
                <div className="form-group">
                  <label>Other Coverage Type  <span style={{ color: "red" }}>*</span></label>
                  <input placeholder="Others" name="otherCoverageType" type="text" className="form-control" value={formData.otherCoverageType} onChange={handleChange} required />
                </div>
              )}
              <div className="form-group">
                <label>Description  <span style={{ color: "red" }}>*</span></label>
                <textarea placeholder="Description" name="description" className="form-control" value={formData.description} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group">
                <label>Contact Information  <span style={{ color: "red" }}>*</span></label>
                <textarea placeholder="Contact Information" name="contactInformation" className="form-control" value={formData.contactInformation} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group">
                <label>Renewal Date  <span style={{ color: "red" }}>*</span></label>
                <input name="renewalDate" type="date" className="form-control" value={formData.renewalDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Attachments / (optional)</label>
                <input name="attachments" type="file" className="form-control-file" onChange={handleImageChange} accept=".jpg,.pdf" multiple />
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

export default AddInsuranceModal;

