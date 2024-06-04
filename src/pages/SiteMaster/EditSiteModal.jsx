// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditSiteModal = ({ site, onClose, onUpdate }) => {
//     const [editedSite, setEditedSite] = useState({ ...site });
//     const [employeeList, setEmployeeList] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         setEditedSite({ ...site });
//     }, [site]);

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//             setEmployeeList(response.data);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedSite({ ...editedSite, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check for empty fields
//         for (const key in editedSite) {
//             if (!editedSite[key]) {
//                 setError(`Please fill in ${key}`);
//                 return;
//             }
//         }

//         try {
//             await axios.put(`${process.env.REACT_APP_LOCAL_URL}/sites/${editedSite.id}`, editedSite);
//             onUpdate(editedSite);
//             onClose();
//         } catch (error) {
//             console.error("Error updating site:", error);
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div className="modal fade show" id="editSiteModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Edit Site</h5>
//                             <button type="button" className="close" onClick={handleClose}>&times;</button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
//                             {error && <div className="alert alert-danger">{error}</div>}
//                             <div className="row">
//                                 <div className="col-md-12">
//                                     {/* Left Side */}
//                                     <div className="form-group">
//                                         <label>Site Name <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="siteName"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedSite.siteName}
//                                             onChange={handleChange}
//                                             placeholder="Enter Site Name"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Site ID <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="siteID"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedSite.siteID}
//                                             onChange={handleChange}
//                                             placeholder="Enter Site ID"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Site Type <span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             name="siteType"
//                                             className="form-control"
//                                             value={editedSite.siteType}
//                                             onChange={handleChange}
//                                             placeholder="Select Site Type"
//                                             required
//                                         >
//                                             <option value="">Select Site Type</option>
//                                             <option value="Govt.Project(owned)">Govt.Project(owned)</option>
//                                             <option value="Govt Project(sub-Contract)">Govt Project(sub-Contract)</option>
//                                             <option value="Private Project(owned)">Private Project(owned)</option>
//                                             <option value="Private Project(sub-Contract)">Private Project(sub-Contract)</option>
//                                         </select>
//                                     </div>
//                                     {editedSite.siteType.includes("Project") && (
//                                         <div className="form-group">
//                                             <label>Project Name <span style={{ color: "red" }}>*</span></label>
//                                             <input
//                                                 name="projectName"
//                                                 type="text"
//                                                 className="form-control"
//                                                 value={editedSite.projectName}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter Project Name"
//                                                 required
//                                             />
//                                         </div>
//                                     )}
//                                     <div className="form-group">
//                                         <label>Godown</label>
//                                         <select
//                                             name="godown"
//                                             className="form-control"
//                                             value={editedSite.godown}
//                                             onChange={handleChange}
//                                         >
//                                             <option value="">Select Godown</option>
//                                             <option value="Yes">Yes</option>
//                                             <option value="No">No</option>
//                                         </select>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Site Location <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="siteLocation"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedSite.siteLocation}
//                                             onChange={handleChange}
//                                             placeholder="Enter Site Location"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Site Manager <span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             name="siteManager"
//                                             className="form-control"
//                                             value={editedSite.siteManager}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Site Manager</option>
//                                             {employeeList.map((employee) => (
//                                                 <option key={employee.id} value={employee.ename}>
//                                                     {employee.ename}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Contact No.</label>
//                                         <input
//                                             name="contactNo"
//                                             type="tel"
//                                             className="form-control"
//                                             value={editedSite.contactNo}
//                                             onChange={handleChange}
//                                             placeholder="Enter Contact No."
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>State Name <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="stateName"
//                                             type="text"
//                                             className="form-control"
//                                             value={editedSite.stateName}
//                                             onChange={handleChange}
//                                             placeholder="Enter State Name"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
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

// export default EditSiteModal;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSiteModal = ({ site, onClose, onUpdate }) => {
    const [editedSite, setEditedSite] = useState({ ...site });
    const [employeeList, setEmployeeList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setEditedSite({ ...site });
    }, [site]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
            setEmployeeList(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSite({ ...editedSite, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        for (const key in editedSite) {
            if (!editedSite[key]) {
                setError(`Please fill in ${key}`);
                return;
            }
        }

        try {
            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/sites/${editedSite.id}`, editedSite);
            onUpdate(editedSite);
            onClose();
        } catch (error) {
            console.error("Error updating site:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal fade show" id="editSiteModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Site</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="row">
                                <div className="col-md-12">
                                    {/* Left Side */}
                                    <div className="form-group">
                                        <label>Site Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="siteName"
                                            type="text"
                                            className="form-control"
                                            value={editedSite.siteName}
                                            onChange={handleChange}
                                            placeholder="Enter Site Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Site ID <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="siteID"
                                            type="text"
                                            className="form-control"
                                            value={editedSite.siteID}
                                            onChange={handleChange}
                                            placeholder="Enter Site ID"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Godown</label>
                                        <select
                                            name="godown"
                                            className="form-control"
                                            value={editedSite.godown}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Godown</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Site Manager <span style={{ color: "red" }}>*</span></label>
                                        <select
                                            name="employee_id"
                                            className="form-control"
                                            value={editedSite.employee_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Site Manager</option>
                                            {employeeList.map((employee) => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.ename}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Contact No.</label>
                                        <input
                                            name="contactNo"
                                            type="tel"
                                            className="form-control"
                                            value={editedSite.contactNo}
                                            onChange={handleChange}
                                            placeholder="Enter Contact No."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>State Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="stateName"
                                            type="text"
                                            className="form-control"
                                            value={editedSite.stateName}
                                            onChange={handleChange}
                                            placeholder="Enter State Name"
                                            required
                                        />
                                    </div>
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

export default EditSiteModal;
