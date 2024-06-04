// import React, { useState } from 'react';
// import axios from 'axios';

// const AddBrandModal = ({ onClose, onUpdateBrands }) => {
//     const [formData, setFormData] = useState({
//         brandLogo: null, // Default logo
//         brandName: '',
//         companyName: ''
//     });
//     const [errors, setErrors] = useState({
//         brandName: '',
//         companyName: ''
//     });
//     const [generalError, setGeneralError] = useState('');
//     const apiUrl = process.env.REACT_APP_LOCAL_URL;

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'brandLogo') {
//             const logo = files[0];
//             setFormData({
//                 ...formData,
//                 [name]: logo
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check for missing fields
//         const { brandName, companyName } = formData;
//         if (!brandName || !companyName) {
//             setErrors({
//                 brandName: brandName ? '' : 'Brand Name is required',
//                 companyName: companyName ? '' : 'Company Name is required'
//             });
//             return;
//         }

//         const formDataToSend = new FormData();
//         Object.keys(formData).forEach(key => {
//             if (key === 'brandLogo' && formData[key] === null) {
//                 return; // Skip appending brandLogo if it's null
//             }
//             formDataToSend.append(key, formData[key]);
//         });

//         try {
//             const response = await axios.post(`${apiUrl}/add_brands`, formDataToSend);
//             console.log('Data uploaded successfully:', response.data);
//             onClose();
//             onUpdateBrands();
//         } catch (error) {
//             console.error('Error uploading data:', error);
//             setGeneralError('An error occurred while saving the brand. Please try again later.');
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate="novalidate">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Add Brand</h5>
//                             <button type="button" className="close" onClick={handleClose}>&times;</button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
//                             {generalError && <div className="alert alert-danger">{generalError}</div>}
//                             <div className="form-group">
//                                 <label>Brand Logo</label>
//                                 <input name="brandLogo" type="file" className="form-control" onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <label>Brand Name</label>
//                                 <input name="brandName" type="text" className={`form-control ${errors.brandName && 'is-invalid'}`} required="" placeholder="Brand Name" onChange={handleChange} />
//                                 {errors.brandName && <div className="invalid-feedback">{errors.brandName}</div>}
//                             </div>
//                             <div className="form-group">
//                                 <label>Company Name</label>
//                                 <input name="companyName" type="text" className={`form-control ${errors.companyName && 'is-invalid'}`} required="" placeholder="Company Name" onChange={handleChange} />
//                                 {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary" id="save">Save</button>
//                             <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddBrandModal;
import React, { useState } from 'react';
import axios from 'axios';

const AddBrandModal = ({ onClose, onUpdateBrands }) => {
    const [formData, setFormData] = useState({
        brandLogo: null, // Default logo
        brandName: '',
        companyName: ''
    });

    const [error, setError] = useState("");
    const apiUrl = process.env.REACT_APP_LOCAL_URL;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'brandLogo') {
            const logo = files[0];
            setFormData({
                ...formData,
                [name]: logo
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["brandName", "companyName", "brandLogo"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        setError("");

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'brandLogo' && formData[key] === null) {
                return; // Skip appending brandLogo if it's null
            }
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post(`${apiUrl}/add_brands`, formDataToSend);
            console.log('Data uploaded successfully:', response.data);
            onClose();
            onUpdateBrands();
        } catch (error) {
            console.error('Error uploading data:', error);
            setError('An error occurred while saving the brand. Please try again later.');
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate>
                        <div className="modal-header">
                            <h5 className="modal-title">Add Brand</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding:"20px" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Brand Logo <span style={{ color: "red" }}>*</span></label>
                                <input name="brandLogo" type="file" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Brand Name <span style={{ color: "red" }}>*</span></label>
                                <input name="brandName" type="text" className="form-control" required placeholder="Brand Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company Name <span style={{ color: "red" }}>*</span></label>
                                <input name="companyName" type="text" className="form-control" required placeholder="Company Name" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">Save</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBrandModal;
