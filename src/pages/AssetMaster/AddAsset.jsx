// import React, { useState } from 'react';
// import axios from 'axios';

// const AddAsset = ({ onClose, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         assetName: "", // Default logo
//         serialNumber: '',
//         assetType: '',
//         rtoName: '',
//         registrationNumber: '',
//         assetType: '',
//         assetImage: null,
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
        
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         const fileSize = file.size / 1024;

//         if (fileSize > 200) {
//             setError("Maximum file size is 200KB");
//         } else {
//             setError("");
//             setAssetImage(file);
//         }
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setIsLoading(true);
//         const requiredFields = ["assetName", "serialNumber", "assetType", "assetImage"];
//         for (const field of requiredFields) {
//             if (!eval(field)) {
//                 setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//                 setIsLoading(false);
//                 return;
//             }
//         }

//         setError("");

//         try {
//             const formData = new FormData();
//             formData.append('assetName', assetName);
//             formData.append('serialNumber', serialNumber);
//             formData.append('assetType', assetType);
//             formData.append('rtoName', rtoName);
//             formData.append('registrationNumber', registrationNumber);
//             formData.append('assetImage', assetImage);

//             const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/asset/master`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Asset added successfully:', response.data);
//             onUpdate();
//             setTimeout(() => {
//                 onClose();
//                 window.location.reload();
//             }, 1000); // 1 second delay
//         } catch (error) {
//             console.error('Error adding asset:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div id="addAsset" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Add Asset</h5>
//                             <button type="button" className="close" onClick={handleClose}>&times;</button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//                             {error && <div className="alert alert-danger">{error}</div>}
//                             <div className="form-group">
//                                 <label>Asset Name<span style={{ color: "red" }}>*</span></label>
//                                 <input name="assetName" value={assetName} onChange={handleChange} type="text" className="form-control" required placeholder="Asset Name" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Serial Number<span style={{ color: "red" }}>*</span></label>
//                                 <input name="serialNumber" value={serialNumber} onChange={handleChange} type="text" className="form-control" required placeholder="Serial Number" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Asset Type<span style={{ color: "red" }}>*</span></label>
//                                 <select
//                                     name="assetType"
//                                     id="assetType"
//                                     className="form-control"
//                                     value={assetType}
//                                     onChange={handleChange}
//                                     required

//                                 >
//                                     <option value="" disabled hidden>Select Type</option>
//                                     <option value="Movable">Movable</option>
//                                     <option value="Immovable">Immovable</option>
//                                     <option value="Digital Asset">Digital Asset</option>
//                                     <option value="Fixed Asset">Fixed Asset</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>RTO Name /<small>Optional</small></label>
//                                 <input name="rtoName" value={rtoName} onChange={handleChange} type="text" className="form-control" placeholder="RTO Name" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Registration Number  /<small>Optional</small></label>
//                                 <input name="registrationNumber" value={registrationNumber} onChange={handleChange} type="text" className="form-control" placeholder="Registration Number" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Asset Image<span style={{ color: "red" }}>*</span></label>
//                                 <input name="assetImage" type="file" className="form-control" onChange={handleImageChange} required />
//                                 <small className="text-muted">Maximum file size: 200KB</small>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary" id="saveAsset">Save</button>
//                             <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             {isLoading && <div className="loader">Loading...</div>}
//         </div>
//     );
// };

// export default AddAsset;



import React, { useState } from 'react';
import axios from 'axios';

const AddAsset = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        assetName: '',
        serialNumber: '',
        assetType: '',
        rtoName: '',
        registrationNumber: '',
        assetImage: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size / 1024; // File size in KB
            if (fileSize > 200) {
                setError('Maximum file size is 200KB');
            } else {
                setError('');
                setFormData({ ...formData, assetImage: file });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Check if required fields are filled
        const { assetName, serialNumber, assetType, assetImage } = formData;
        if (!assetName || !serialNumber || !assetType || !assetImage) {
            setError('Please fill in all required fields.');
            setIsLoading(false);
            return;
        }

        try {
            const submissionData = new FormData();
            submissionData.append('assetName', formData.assetName);
            submissionData.append('serialNumber', formData.serialNumber);
            submissionData.append('assetType', formData.assetType);
            submissionData.append('rtoName', formData.rtoName);
            submissionData.append('registrationNumber', formData.registrationNumber);
            submissionData.append('assetImage', formData.assetImage);

            const response = await axios.post(
                `${process.env.REACT_APP_LOCAL_URL}/asset/master`,
                submissionData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Asset added successfully:', response.data);
            onUpdate(); // Update asset list
            setTimeout(() => {
                onClose(); // Close modal
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error('Error adding asset:', error);
            setError('Failed to add asset. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="addAsset" className="modal fade show" role="dialog" style={{ display: 'block', paddingRight: '17px' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate>
                        <div className="modal-header">
                            <h5 className="modal-title">Add Asset</h5>
                            <button type="button" className="close" onClick={onClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>
                                    Asset Name<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="assetName"
                                    value={formData.assetName}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Asset Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Serial Number<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Serial Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Asset Type<span style={{ color: 'red' }}>*</span>
                                </label>
                                <select
                                    name="assetType"
                                    id="assetType"
                                    className="form-control"
                                    value={formData.assetType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled hidden>
                                        Select Type
                                    </option>
                                    <option value="Movable">Movable</option>
                                    <option value="Immovable">Immovable</option>
                                    <option value="Digital Asset">Digital Asset</option>
                                    <option value="Fixed Asset">Fixed Asset</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    RTO Name /<small>Optional</small>
                                </label>
                                <input
                                    name="rtoName"
                                    value={formData.rtoName}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="RTO Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Registration Number /<small>Optional</small>
                                </label>
                                <input
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Registration Number"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Asset Image<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    name="assetImage"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                    required
                                />
                                <small className="text-muted">Maximum file size: 200KB</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="saveAsset" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-default" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default AddAsset;
