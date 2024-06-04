// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditInsuranceModal = ({ assetInsurance, onClose, onUpdate }) => {
//   const [editedInsurance, setEditedInsurance] = useState({ ...assetInsurance });

//   useEffect(() => {
//     setEditedInsurance({ ...assetInsurance });
//   }, [assetInsurance]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedInsurance({ ...editedInsurance, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send PUT request to update insurance details
//       await axios.put(`${process.env.REACT_APP_LOCAL_URL}/insurance-data/${editedInsurance.id}`, editedInsurance);

//       // Send POST request to add entry to insurance history
//       await axios.put(`${process.env.REACT_APP_LOCAL_URL}/insurance-history/${editedInsurance.asset_master_id}`, editedInsurance);

//       console.log(editedInsurance)
//       onUpdate(editedInsurance);
//       onClose();
//     } catch (error) {
//       console.error("Error updating insurance:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   return (
//     <div className="modal fade show" id="editInsuranceModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Insurance</h5>
//               <button type="button" className="close" onClick={handleClose}>&times;</button>
//             </div>
//             <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
//               <div className="form-group">
//                 <label>Asset Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={editedInsurance.assetName || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Asset Tag</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={editedInsurance.assetTag || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Policy Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={editedInsurance.insuranceCompanyName || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Policy Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={editedInsurance.policyNumber || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Renewal Date</label>
//                 <input
//                   name="renewalDate"
//                   type="date"
//                   className="form-control"
//                   value={editedInsurance.renewalDate || ''}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   name="description"
//                   className="form-control"
//                   value={editedInsurance.description || ''}
//                   onChange={handleChange}
//                 ></textarea>
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
//               <button type="submit" className="btn btn-primary">Save</button>
//               <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditInsuranceModal;

import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests

const EditAssetInsuranceModal = ({ assetInsurance, onClose, onUpdate }) => {
  // State variables for edited insurance data and error message
  const [editedInsurance, setEditedInsurance] = useState({ ...assetInsurance });
  const [error, setError] = useState('');

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setEditedInsurance({ // Update editedInsurance state with the new field value
      ...editedInsurance, // Spread the existing state
      [name]: value // Update the specific field with the new value
    });
  };

  // Function to handle changes in image input field
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from the event
    setEditedInsurance({ // Update editedInsurance state with the selected file for attachments
      ...editedInsurance,
      attachments: file // Assuming `attachments` is the field for the attachment
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formData = new FormData(); // Create a new FormData object for sending data

      // Append relevant fields to the formData object
      formData.append('attachments', editedInsurance.attachments);
      formData.append('contactInformation', editedInsurance.contactInformation);
      formData.append('coverageType', editedInsurance.coverageType);
      formData.append('description', editedInsurance.description);
      formData.append('insuranceCompanyName', editedInsurance.insuranceCompanyName);
      formData.append('otherCoverageType', editedInsurance.otherCoverageType);
      formData.append('policyNumber', editedInsurance.policyNumber);
      formData.append('startDate', editedInsurance.startDate);
      formData.append('endDate', editedInsurance.endDate);
      formData.append('premiumAmount', editedInsurance.premiumAmount);
      formData.append('renewalDate', editedInsurance.renewalDate);

      // Send PUT request to update insurance history
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/insurance-history/${editedInsurance.asset_master_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Send PUT request to update insurance details
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/insurance-data/${editedInsurance.id}`, editedInsurance, {
        headers: {
          'Content-Type': 'application/json' // Set content type to application/json for insurance data
        }
      });

      console.log('Data updated successfully'); // Log success message

      onClose(); // Close the modal
      onUpdate(); // Trigger onUpdate function to update state
      setEditedInsurance(assetInsurance); // Reset form fields after successful submission
    } catch (error) {
      console.error('Error updating insurance:', error); // Log error message
      setError('Error updating insurance. Please try again.'); // Set error state with error message
    }
  };

  // Function to handle modal close
  const handleClose = () => {
    onClose(); // Close the modal
  };

  return (
    <div id="edit" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form action="" id="formedit" autoComplete="off" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Insurance Data</h5>
              <button type="button" className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label>Insurance Company Name  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Company Name" name="insuranceCompanyName" type="text" className="form-control" value={editedInsurance.insuranceCompanyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Policy Number  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Policy No." name="policyNumber" type="text" className="form-control" value={editedInsurance.policyNumber} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Start Date  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Start Date" name="startDate" type="date" className="form-control" value={editedInsurance.startDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>End Date  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="End Date" name="endDate" type="date" className="form-control" value={editedInsurance.endDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Premium Amount  <span style={{ color: "red" }}>*</span></label>
                <input placeholder="Premimum Amount" name="premiumAmount" type="number" className="form-control" value={editedInsurance.premiumAmount} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Coverage Type  <span style={{ color: "red" }}>*</span></label>
                <select name="coverageType" className="form-control" value={editedInsurance.coverageType} onChange={handleChange} required>
                  <option value="" disabled hidden>Select Type</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Liability">Liability</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {/* Show additional fields for "Others" coverage type */}
              {editedInsurance.coverageType === "Others" && (
                <div className="form-group">
                  <label>Other Coverage Type  <span style={{ color: "red" }}>*</span></label>
                  <input placeholder="Others" name="otherCoverageType" type="text" className="form-control" value={editedInsurance.otherCoverageType} onChange={handleChange} required />
                </div>
              )}
              <div className="form-group">
                <label>Description  <span style={{ color: "red" }}>*</span></label>
                <textarea placeholder="Description" name="description" className="form-control" value={editedInsurance.description} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group">
                <label>Contact Information  <span style={{ color: "red" }}>*</span></label>
                <textarea placeholder="Contact Information" name="contactInformation" className="form-control" value={editedInsurance.contactInformation} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group">
                <label>Renewal Date  <span style={{ color: "red" }}>*</span></label>
                <input name="renewalDate" type="date" className="form-control" value={editedInsurance.renewalDate} onChange={handleChange} required />
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

export default EditAssetInsuranceModal;
