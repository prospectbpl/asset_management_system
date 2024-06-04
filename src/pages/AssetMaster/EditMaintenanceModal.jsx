// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditMaintenanceModal = ({ maintenance, onClose, onUpdate }) => {
//     const [editedMaintenance, setEditedMaintenance] = useState(maintenance);
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//             setEmployees(response.data);
//         } catch (error) {
//             console.error("Error fetching employees:", error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "employeeName") {
//             const selectedEmployee = employees.find(employee => employee.ename === value);
//             setEditedMaintenance({
//                 ...editedMaintenance,
//                 [name]: value,
//                 employee_id: selectedEmployee.id  // Update employee ID
//             });
//         } else {
//             setEditedMaintenance({
//                 ...editedMaintenance,
//                 [name]: value
//             });
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setEditedMaintenance({
//             ...editedMaintenance,
//             bill: file  // Update bill file
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!editedMaintenance.repairMaintenanceService || !editedMaintenance.issueInAsset || !editedMaintenance.serviceType || !editedMaintenance.startDate || !editedMaintenance.endDate || !editedMaintenance.remarks) {
//             setError('Please fill in all required fields');
//             return;
//         }

//         setError('');

//         const editedMaintenance = new FormData();
//         formData.append('bill', editedMaintenance.bill);  // Append bill file
//         formData.append('repairMaintenanceService', editedMaintenance.repairMaintenanceService);
//         formData.append('issueInAsset', editedMaintenance.issueInAsset);
//         formData.append('serviceType', editedMaintenance.serviceType);
//         formData.append('employee_id', editedMaintenance.employee_id); // Append employee ID
//         if (editedMaintenance.serviceType === "Service Center") {
//             formData.append('serviceName', editedMaintenance.serviceName);
//             formData.append('serviceAddress', editedMaintenance.serviceAddress);
//         }
//         formData.append('startDate', editedMaintenance.startDate);
//         formData.append('endDate', editedMaintenance.endDate);
//         formData.append('remarks', editedMaintenance.remarks);

//         console.log("formData",formData)
//         console.log("editedMaintenance",editedMaintenance)
//         try {
//             const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/maintenances/${editedMaintenance.id}`, formData);
//             console.log('Data updated successfully:', response.data);

//             onClose();
//             onUpdate();
//         } catch (error) {
//             console.error('Error updating maintenance:', error);
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };


//     return (
//         <div id="edit" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Edit Maintenance</h5>
//                             <button type="button" className="close" onClick={handleClose}>&times;</button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//                             {error && <div className="alert alert-danger">{error}</div>}
//                             <div className="form-group">
//                                 <label>Repair/Maintenance/Service<span style={{ color: "red" }}>*</span></label>
//                                 <select
//                                     name="repairMaintenanceService"
//                                     className="form-control"
//                                     value={editedMaintenance.repairMaintenanceService || ''}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="Repair">Repair</option>
//                                     <option value="Maintenance">Maintenance</option>
//                                     <option value="Service">Service</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Issue in Asset<span style={{ color: "red" }}>*</span></label>
//                                 <textarea
//                                     name="issueInAsset"
//                                     className="form-control"
//                                     placeholder="Issue In Asset"
//                                     value={editedMaintenance.issueInAsset || ''}
//                                     onChange={handleChange}
//                                 ></textarea>
//                             </div>
//                             <div className="form-group">
//                                 <label>Service Type<span style={{ color: "red" }}>*</span></label>
//                                 <select
//                                     name="serviceType"
//                                     className="form-control"
//                                     value={editedMaintenance.serviceType || ''}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="In-house">In-house</option>
//                                     <option value="Service Center">Service Center</option>
//                                 </select>
//                             </div>
//                             {editedMaintenance.serviceType === "In-house" && (
//                                 <div className="form-group">
//                                     <label>Employee Name<span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         name="employeeName"
//                                         className="form-control"
//                                         value={editedMaintenance.employeeName || ''}
//                                         onChange={handleChange}
//                                     >
//                                         <option value="">Select Employee</option>
//                                         {employees.map((employee) => (
//                                             <option key={employee.id} value={employee.ename}>
//                                                 {employee.ename}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             )}
//                             {editedMaintenance.serviceType === "Service Center" && (
//                                 <>
//                                     <div className="form-group">
//                                         <label>Service Name<span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             required
//                                             name="serviceName"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedMaintenance.serviceName || ''}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Service Center Address<span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             required
//                                             name="serviceAddress"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedMaintenance.serviceAddress || ''}
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                             <div className="form-group">
//                                 <label>Start Date<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     required
//                                     name="startDate"
//                                     type="date"
//                                     className="form-control"
//                                     value={editedMaintenance.startDate || ''}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>End Date<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     required
//                                     name="endDate"
//                                     type="date"
//                                     className="form-control"
//                                     value={editedMaintenance.endDate || ''}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label>Remarks<span style={{ color: "red" }}>*</span></label>
//                                 <textarea
//                                     name="remarks"
//                                     className="form-control"
//                                     placeholder="Remarks"
//                                     value={editedMaintenance.remarks || ''}
//                                     onChange={handleChange}
//                                 ></textarea>
//                             </div>
//                             <div className="form-group">
//                                 <label>bill</label>
//                                 <input name="bill" type="file" className="form-control" onChange={handleImageChange} />
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary">Save</button>
//                             <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditMaintenanceModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMaintenanceModal = ({ maintenance, onClose, onUpdate }) => {
    const [editedMaintenance, setEditedMaintenance] = useState(maintenance);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "employeeName") {
            const selectedEmployee = employees.find(employee => employee.ename === value);
            if (selectedEmployee) {
                setEditedMaintenance({
                    ...editedMaintenance,
                    [name]: value,
                    employee_id: selectedEmployee.id, // Set employee_id when selecting an employee
                    employeeName: value // Update employeeName as well
                });
            }
        } else {
            setEditedMaintenance({
                ...editedMaintenance,
                [name]: value
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedMaintenance({ ...editedMaintenance, bill: file }); // Set epicture to the file name
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (editedMaintenance.bill) {
                formData.append('bill', editedMaintenance.bill);
            }
            formData.append('repairMaintenanceService', editedMaintenance.repairMaintenanceService);
            formData.append('issueInAsset', editedMaintenance.issueInAsset);
            formData.append('serviceType', editedMaintenance.serviceType);
            formData.append('employee_id', editedMaintenance.employee_id);
            formData.append('employeeName', editedMaintenance.employeeName);
            if (editedMaintenance.serviceType === "Service Center") {
                formData.append('serviceName', editedMaintenance.serviceName);
                formData.append('serviceAddress', editedMaintenance.serviceAddress);
            }
            formData.append('startDate', editedMaintenance.startDate);
            formData.append('endDate', editedMaintenance.endDate);
            formData.append('remarks', editedMaintenance.remarks);
            console.log(formData)
            console.log(editedMaintenance)
            const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/maintenances/${editedMaintenance.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Data updated successfully:', response.data);

            onClose();
            onUpdate();
            setEditedMaintenance(maintenance); // Reset form fields after successful submission
        } catch (error) {
            console.error('Error updating maintenance:', error);
            setError('Error updating maintenance. Please try again.');
        }
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <div id="edit" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Maintenance</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: "2", paddingRight: "20px" }}>
                                    <div className="form-group">
                                        <label>Asset<span style={{ color: "red" }}>*</span></label>
                                        <input name="AssetName" type="text" className="form-control" value={editedMaintenance.assetName} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            required name="assetTag" type="text" className="form-control" placeholder="Asset Tag" value={editedMaintenance.assetTag} onChange={handleChange} readOnly />
                                    </div>
                                </div>
                                <div style={{ flex: "1" }}>
                                    <div className="form-group">
                                        <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
                                        <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                                            {editedMaintenance.assetPhoto && <img src={editedMaintenance.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} readOnly />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Repair/Maintenance/Service<span style={{ color: "red" }}>*</span></label>
                                <select
                                    name="repairMaintenanceService"
                                    className="form-control"
                                    value={editedMaintenance.repairMaintenanceService || ''}
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
                                    value={editedMaintenance.issueInAsset || ''}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Service Type<span style={{ color: "red" }}>*</span></label>
                                <select
                                    name="serviceType"
                                    className="form-control"
                                    value={editedMaintenance.serviceType || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="In-house">In-house</option>
                                    <option value="Service Center">Service Center</option>
                                </select>
                            </div>
                            {editedMaintenance.serviceType === "In-house" && (
                                <div className="form-group">
                                    <label>Employee Name<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        name="employeeName"
                                        className="form-control"
                                        value={editedMaintenance.employeeName || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.ename}>
                                                {employee.ename}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {editedMaintenance.serviceType === "Service Center" && (
                                <>
                                    <div className="form-group">
                                        <label>Service Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            required
                                            name="serviceName"
                                            type="text"
                                            className="form-control"
                                            value={editedMaintenance.serviceName || ''}
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
                                            value={editedMaintenance.serviceAddress || ''}
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
                                    value={editedMaintenance.startDate || ''}
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
                                    value={editedMaintenance.endDate || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Remarks<span style={{ color: "red" }}>*</span></label>
                                <textarea
                                    name="remarks"
                                    className="form-control"
                                    placeholder="Remarks"
                                    value={editedMaintenance.remarks || ''}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Bill upload / optional</label>
                                <input name="bill" type="file" className="form-control" onChange={handleImageChange} />
                                <small>Max size: 200 KB</small>
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

export default EditMaintenanceModal;
