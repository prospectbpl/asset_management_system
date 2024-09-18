import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditClientModal = ({ client, onClose, onUpdate }) => {
    const [editedClient, setEditedClient] = useState({ ...client });
    console.log("Client")
    console.log(client)
    console.log("editedClient")
    console.log(editedClient)

    const [error, setError] = useState("");

    useEffect(() => {
        setEditedClient({ ...client });
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedClient({ ...editedClient, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const key in editedClient) {
            if (!editedClient[key]) {
                setError(`Please fill in ${key}`);
                return;
            }
        }

        try {
            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/clients/${editedClient.id}`, editedClient);
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error updating client:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal fade show" id="editClientModal" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Client</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Client Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientName"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.clientName || ''}
                                            onChange={handleChange}
                                            required
                                            placeholder='Client Name'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Address<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientAddress"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.clientAddress || ''}
                                            onChange={handleChange}
                                            required
                                            placeholder='Client Address'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Mobile<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientMobile"
                                            type="tel"
                                            className="form-control"
                                            value={editedClient.clientMobile || ''}
                                            onChange={handleChange}
                                            required
                                            placeholder='Client Mobile'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Email<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="clientEmail"
                                            type="email"
                                            className="form-control"
                                            value={editedClient.clientEmail || ''}
                                            onChange={handleChange}
                                            required
                                            placeholder='Client Email'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Representative Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="representativeName"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.representativeName || ''}
                                            onChange={handleChange}
                                            placeholder='Representative Name'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Designation<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="designation"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.designation || ''}
                                            onChange={handleChange}
                                            placeholder='Designation'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>GST No<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="gstNo"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.gstNo || ''}
                                            onChange={handleChange}
                                            placeholder='GST No.'
                                        />
                                    </div>
                                    <h4 style={{ margin: "20px 5px" }}>Bank Details - </h4>
                                    <div className="form-group">
                                        <label>Bank Name<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="bankName"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.bankName || ''}
                                            onChange={handleChange}
                                            placeholder='Bank Name'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Account No<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="accountNo"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.accountNo || ''}
                                            onChange={handleChange}
                                            placeholder='Account No.'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>IFSC Code<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="ifscCode"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.ifscCode || ''}
                                            onChange={handleChange}
                                            placeholder='IFSC Code'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bank Address<span style={{ color: "red" }}>*</span></label>
                                        <input
                                            name="bankAddress"
                                            type="text"
                                            className="form-control"
                                            value={editedClient.bankAddress || ''}
                                            onChange={handleChange}
                                            placeholder='Bank Address'
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

export default EditClientModal;
