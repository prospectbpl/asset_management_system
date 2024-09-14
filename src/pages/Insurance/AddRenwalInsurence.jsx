import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRenwalInsurence = ({ assetInsurance, onClose, onUpdate }) => {
  const [updateInsurance, setUpdateInsurance] = useState({ ...assetInsurance });

  useEffect(() => {
    setUpdateInsurance({ ...assetInsurance });
  }, [assetInsurance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInsurance({ ...updateInsurance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update insurance details
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/insurance-data/${updateInsurance.id}`, updateInsurance);

      // Save insurance history
      await saveInsuranceHistory(assetInsurance, updateInsurance);

      // Close modal
      onClose();
      // Update parent component
      onUpdate(updateInsurance);

      
    } catch (error) {
      console.error("Error updating insurance:", error);
    }
  };

  const saveInsuranceHistory = async (previousData, newData) => {
    try {
      // Convert previous and new data to the desired format
      const previousDataFormatted = convertToTableFormat(previousData);
      const newDataFormatted = convertToTableFormat(newData);

      // Send formatted data to the backend
      await axios.post(`${process.env.REACT_APP_LOCAL_URL}/insurance_history`, {
        previousData: previousDataFormatted,
        newData: newDataFormatted
      });
    } catch (error) {
      console.error("Error saving insurance history:", error);
    }
  };

  const convertToTableFormat = (data) => {
    return {
      id: data.id,
      asset_master_id: data.asset_master_id,
      assetName: data.assetName,
      assetTag: data.assetTag,
      assetPhoto: data.assetPhoto,
      insuranceCompanyName: data.insuranceCompanyName,
      policyNumber: data.policyNumber,
      startDate: data.startDate,
      endDate: data.endDate,
      premiumAmount: data.premiumAmount,
      coverageType: data.coverageType,
      otherCoverageType: data.otherCoverageType,
      description: data.description,
      contactInformation: data.contactInformation,
      renewalDate: data.renewalDate,
      attachments: data.attachments
    };
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal fade show" id="editInsuranceModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
            <div className="modal-header">
              <h5 className="modal-title">Renewal Insurance</h5>
              <button type="button" className="close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "2", paddingRight: "20px" }}>
                  <div className="form-group">
                    <label>Asset Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={assetInsurance.assetName}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Asset Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      value={assetInsurance.assetTag}
                      readOnly
                    />
                  </div>
                </div>
                <div style={{ flex: "1" }}>
                  <div className="form-group">
                    <label>Asset Photo</label>
                    <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                      {assetInsurance.assetPhoto && <img src={assetInsurance.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Previous Renewal Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={new Date(assetInsurance.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || ''}
                  readOnly
                />
              </div>
              {/* Form for updating insurance details */}
              <div className="form-group">
                <label>New Renewal Date</label>
                <input
                  name="renewalDate"
                  type="date"
                  className="form-control"
                  value={updateInsurance.renewalDate || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Insurance Company Name</label>
                <input
                  name="insuranceCompanyName"
                  type="text"
                  className="form-control"
                  value={updateInsurance.insuranceCompanyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Policy Number</label>
                <input
                  name="policyNumber"
                  type="text"
                  className="form-control"
                  value={updateInsurance.policyNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={updateInsurance.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={updateInsurance.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Premium Amount</label>
                <input
                  name="premiumAmount"
                  type="number"
                  className="form-control"
                  value={updateInsurance.premiumAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Coverage Type</label>
                <select
                  name="coverageType"
                  className="form-control"
                  value={updateInsurance.coverageType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Liability">Liability</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              {/* Show additional fields for "Others" coverage type */}
              {updateInsurance.coverageType === "Others" && (
                <div className="form-group">
                  <label>Other Coverage Type</label>
                  <input
                    name="otherCoverageType"
                    type="text"
                    className="form-control"
                    value={updateInsurance.otherCoverageType}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={updateInsurance.description || ''}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Attachments</label>
                <input
                  name="attachments"
                  type="file"
                  className="form-control-file"
                  onChange={handleChange}
                  accept=".jpg,.pdf"
                  multiple
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRenwalInsurence;

