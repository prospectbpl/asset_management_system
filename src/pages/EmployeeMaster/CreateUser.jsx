import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ onClose, employee, onUpdateEmployees }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(employee ? employee.ename : '');
    const [email, setEmail] = useState(employee ? employee.eemail : '');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            // Check if user creation is successful
            if (response.ok) {
                onClose(); // Close the modal after successful signup
                onUpdateEmployees();
                // Optionally, you can navigate to a different page after successful signup
                // navigate('/dashboard');
            } else {
                // Handle error messages or display them to the user
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Employee Signup</h5>
                            <button type="button" className="close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Username (Employee Name)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email (Employee Email)</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Signup</button>
                            <button type="button" className="btn btn-default" onClick={onClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
