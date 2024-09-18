// import React, { useState } from "react";
// import axios from "axios";

// const AddClientModal = ({ onClose, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         clientName: "",
//         clientAddress: "",
//         clientMobile: "",
//         clientEmail: "",
//         representativeName: "",
//         designation: "",
//         gstNo: "",
//         bankName: "",
//         accountNo: "",
//         ifscCode: "",
//         bankAddress: "",
//         status: "active",  // Default status is "Active"
//     });

//     const apiUrl = process.env.REACT_APP_LOCAL_URL;
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const requiredFields = ["clientName","clientMobile","clientAddress","clientEmail","representativeName","designation","gstNo","bankName","accountNo","ifscCode","bankAddress"];
//         for (const field of requiredFields) {
//           if (!formData[field]) {
//             setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//             return;
//           }
//         }

//     setError("");


//         try {
//             const response = await axios.post(`${apiUrl}/clientdata`, formData);
//             console.log("Data uploaded successfully:", response.data);

//             // Call the parent function to update clients data and trigger toast notification
//             onUpdate();

//             onClose();
//         } catch (error) {
//             setError('Failed to add client'); // Update error message here
//             console.error("Error uploading data:", error);
//         }
//     };


//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div
//             id="addClientModal"
//             className="modal fade show"
//             role="dialog"
//             style={{ display: "block", paddingRight: "17px" }}
//         >
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form
//                         action=""
//                         id="formAddClient"
//                         autoComplete="off"
//                         noValidate="novalidate"
//                         onSubmit={handleSubmit}
//                     >
//                         <div className="modal-header">
//                             <h5 className="modal-title">Add Client</h5>
//                             <button type="button" className="close" onClick={handleClose}>
//                                 &times;
//                             </button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
//                         {error && <div className="alert alert-danger">{error}</div>}
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     {/* Left Side */}
//                                     <div className="form-group">
//                                         <label>Client Name <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="clientName"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.clientName}
//                                             onChange={handleChange}
//                                             required
//                                             placeholder="Client Name"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Client Address <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="clientAddress"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.clientAddress}
//                                             onChange={handleChange}
//                                             required
//                                             placeholder="Client Address"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Client Mobile <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="clientMobile"
//                                             type="tel"
//                                             className="form-control"
//                                             value={formData.clientMobile}
//                                             onChange={handleChange}
//                                             required
//                                             placeholder="Client Mobile"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Client Email <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="clientEmail"
//                                             type="email"
//                                             className="form-control"
//                                             value={formData.clientEmail}
//                                             onChange={handleChange}
//                                             required
//                                             placeholder="Client Email"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Representative Name <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="representativeName"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.representativeName}
//                                             onChange={handleChange}
//                                             placeholder="Representative Name "
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Designation <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="designation"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.designation}
//                                             onChange={handleChange}
//                                             placeholder="Designation"
//                                         />
//                                     </div>
//                                     {/* Add other left side fields here */}
//                                 </div>
//                                 <div className="col-md-6">
//                                     {/* Right Side */}
//                                     <div className="form-group">
//                                         <label>GST No <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="gstNo"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.gstNo}
//                                             onChange={handleChange}
//                                             placeholder="GST No."
//                                         />
//                                     </div>
//                                     <h4 style={{ margin: "20px 5px" }}>Bank Details - </h4>
//                                     <div className="form-group">
//                                         <label>Bank Name <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="bankName"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.bankName}
//                                             placeholder="Bank Name"
//                                             onChange={(e) =>
//                                                 setFormData({
//                                                     ...formData,
//                                                     bankName: e.target.value,
//                                                 })
//                                             }
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Account No <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="accountNo"
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Account No."
//                                             value={formData.accountNo}
//                                             onChange={(e) =>
//                                                 setFormData({
//                                                     ...formData,
//                                                     accountNo: e.target.value,
//                                                 })
//                                             }
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>IFSC Code <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="ifscCode"
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="IFSC Code"
//                                             value={formData.ifscCode}
//                                             onChange={(e) =>
//                                                 setFormData({
//                                                     ...formData,
//                                                     ifscCode: e.target.value,
//                                                 })
//                                             }
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Bank Address <span style={{ color: "red" }}>*</span></label>
//                                         <input
//                                             name="bankAddress"
//                                             type="text"
//                                             className="form-control"
//                                             value={formData.bankAddress}
//                                             placeholder="Bank Address"
//                                             onChange={(e) =>
//                                                 setFormData({
//                                                     ...formData,
//                                                     bankAddress: e.target.value,
//                                                 })
//                                             }
//                                         />
//                                     </div>

//                                     {/* Add other right side fields here */}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary" id="save">
//                                 Save
//                             </button>
//                             <button
//                                 type="button"
//                                 className="btn btn-default"
//                                 data-dismiss="modal"
//                                 onClick={handleClose}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddClientModal;


import React, { useState } from "react";
import axios from "axios";

const AddClientModal = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        clientName: "",
        clientAddress: "",
        clientMobile: "",
        clientEmail: "",
        representativeName: "",
        designation: "",
        gstNo: "",
        bankName: "",
        accountNo: "",
        ifscCode: "",
        bankAddress: "",
        status: "active",  // Default status is "Active"
    });

    const apiUrl = process.env.REACT_APP_LOCAL_URL;
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ["clientName", "clientMobile", "clientAddress", "clientEmail", "representativeName", "designation", "gstNo", "bankName", "accountNo", "ifscCode", "bankAddress"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        setError("");

        try {
            const response = await axios.post(`${apiUrl}/clientdata`, formData);
            console.log("Data uploaded successfully:", response.data);

            // Call the parent function to update clients data and trigger toast notification
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            setError('Failed to add client'); // Update error message here
            console.error("Error uploading data:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            id="addClientModal"
            className="modal fade show"
            role="dialog"
            style={{ display: "block", paddingRight: "17px" }}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form
                        action=""
                        id="formAddClient"
                        autoComplete="off"
                        noValidate="novalidate"
                        onSubmit={handleSubmit}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">Add Client</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="row">
                                <div className="col-md-6">
                                    {/* Left Side */}
                                    <div className="form-group">
                                        <label>Client Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientName"
                                            type="text"
                                            className="form-control"
                                            value={formData.clientName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Client Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Address <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientAddress"
                                            type="text"
                                            className="form-control"
                                            value={formData.clientAddress}
                                            onChange={handleChange}
                                            required
                                            placeholder="Client Address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Mobile <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientMobile"
                                            type="tel"
                                            className="form-control"
                                            value={formData.clientMobile}
                                            onChange={handleChange}
                                            required
                                            placeholder="Client Mobile"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Email <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientEmail"
                                            type="email"
                                            className="form-control"
                                            value={formData.clientEmail}
                                            onChange={handleChange}
                                            required
                                            placeholder="Client Email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Representative Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="representativeName"
                                            type="text"
                                            className="form-control"
                                            value={formData.representativeName}
                                            onChange={handleChange}
                                            placeholder="Representative Name "
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Designation <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="designation"
                                            type="text"
                                            className="form-control"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            placeholder="Designation"
                                        />
                                    </div>
                                    {/* Add other left side fields here */}
                                </div>
                                <div className="col-md-6">
                                    {/* Right Side */}
                                    <div className="form-group">
                                        <label>GST No <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="gstNo"
                                            type="text"
                                            className="form-control"
                                            value={formData.gstNo}
                                            onChange={handleChange}
                                            placeholder="GST No."
                                        />
                                    </div>
                                    <h4 style={{ margin: "20px 5px" }}>Bank Details - </h4>
                                    <div className="form-group">
                                        <label>Bank Name <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="bankName"
                                            type="text"
                                            className="form-control"
                                            value={formData.bankName}
                                            placeholder="Bank Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Account No <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="accountNo"
                                            type="text"
                                            className="form-control"
                                            placeholder="Account No."
                                            value={formData.accountNo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>IFSC Code <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="ifscCode"
                                            type="text"
                                            className="form-control"
                                            placeholder="IFSC Code"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bank Address <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="bankAddress"
                                            type="text"
                                            className="form-control"
                                            value={formData.bankAddress}
                                            placeholder="Bank Address"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Add other right side fields here */}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" id="save">
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClientModal;
