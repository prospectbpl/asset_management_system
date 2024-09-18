import React, { useState } from 'react';
import axios from 'axios';

const ActiveInactiveModal = ({ onClose, onUpdate, employee, client, site }) => {
    const [status, setStatus] = useState(employee?.status || client?.status || site?.status || '');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Dynamic reasons based on status
    const reasonOptions = status === 'active' ?
        ['Rejoin', 'Back From Paid Leave', 'Back From Non Paid Leave', 'Back from Holidays', 'Back from Deputation'] :
        ['Left From Job', 'Cessation from Job', 'Retired', 'On Paid Leave', 'Deputation to other Company', 'On Non Paid Leave', 'On Holidays'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const formData = { status, reason, date, description };
        for (const field in formData) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        try {
            if (employee) {
                await axios.put(`${process.env.REACT_APP_LOCAL_URL}/employee_status/${employee.id}`, { status });
            }
            if (client) {
                await axios.put(`${process.env.REACT_APP_LOCAL_URL}/client_status/${client.id}`, { status });
            }
            if (site) {
                await axios.put(`${process.env.REACT_APP_LOCAL_URL}/site_status/${site.id}`, { status });
            }

            const activeInactiveFormData = {
                employeeId: employee?.id,
                clientId: client?.id,
                siteId: site?.id,
                status,
                reason,
                date,
                description
            };

            await axios.post(`${process.env.REACT_APP_LOCAL_URL}/activeinactive`, activeInactiveFormData);

            console.log('Status updated successfully');
            onUpdate();
            setTimeout(() => {
                onClose();
                window.location.reload();
            }, 1000); // 1 second delay
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <div id="statusModal" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Status </h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label>Name :-<span style={{ color: "red" }}>*</span></label>
                                <input name="entityName" type="text" className="form-control" required value={employee?.ename || client?.clientName || site?.siteName} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Status<span style={{ color: "red" }}>*</span></label>
                                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled hidden>Select status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Reason<span style={{ color: "red" }}>*</span></label>
                                <select className="form-control" value={reason} onChange={(e) => setReason(e.target.value)} required>
                                    <option value="" disabled hidden>Select a reason</option>
                                    {reasonOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Date<span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Description<span style={{ color: "red" }}>*</span></label>
                                <textarea className="form-control" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
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

export default ActiveInactiveModal;
