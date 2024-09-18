import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import the FaEdit icon from Font Awesome
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ handleLogout, username }) => {
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        designation: '',
        email: '',
        phone: '',
        address: '',
        picture: null, // Added picture field to formData
    });

    const [profilePicture, setProfilePicture] = useState("img/undraw_profile.svg");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/profile/data`);
            const data = response.data;
            if (data) {
                setFormData(data);
                setProfilePicture(data.picture ? `${process.env.REACT_APP_LOCAL_URL}/uploads/profile/${data.picture}` : "img/undraw_profile.svg");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1024;

        if (fileSize > 200) {
            console.log("Maximum file size is 200KB");
        } else {
            setProfilePicture(URL.createObjectURL(file)); // Set profile picture preview
            setFormData({
                ...formData,
                picture: file,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/profile/upload`, formDataToSend);

            if (response.status === 200) {
                toast.success('Form data saved successfully!');
                console.log('Form data saved successfully!');
                // You can redirect or show a success message here
            } else {
                toast.error('Failed to save form data.')
                console.error('Failed to save form data.');
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };


    return (

        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100 bg-white'>
                <SearchBar username={username} handleLogout={handleLogout} />
                <div className="container-fluid mt-5 ">
                <ToastContainer /> {/* Toast container */}
                    <div className="row" style={{ width: "100%" }}>
                        <div className="col-lg-4" >
                            <div className="card mb-4" style={{boxShadow:"1px 1px 5px black"}}>
                                <div className="card-body text-center">
                                    <label htmlFor="profile-picture">
                                        <img src={profilePicture} alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: '180px', height: "190px", cursor: 'pointer' }} />
                                        <input type="file" id="profile-picture" style={{ display: 'none' }} onChange={handleProfilePictureChange} />
                                    </label>
                                    <FaEdit onChange={handleProfilePictureChange} style={{ position: 'absolute', top: '190px', right: '90px', cursor: 'pointer' }} />
                                    <h4 className="my-3">{formData.fullName}</h4>
                                    <p className="text-muted mb-2">{formData.designation}</p>
                                    <p className="text-muted mb-2">{formData.email}</p>
                                    <p className="text-muted mb-5">{formData.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <input type="hidden" name="id" value={formData.id} autoComplete="off" />
                            <form onSubmit={handleSubmit}>
                                <div className="card mb-1" style={{boxShadow:"1px 1px 5px black"}}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name : -</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="fullName" placeholder='Full Name' value={formData.fullName} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Designation : -</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="designation" placeholder='Designation' value={formData.designation} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email : -</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="email" className="form-control" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone : -</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="phone" placeholder='Phone No.' value={formData.phone} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address : -</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" name="address" placeholder='Address' value={formData.address} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <hr />
                                        {/* Other form inputs */}
                                    </div>
                                </div>
                                <div className="d-flex mt-3">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button type="button" className="btn btn-outline-danger ms-1" onClick={() => setFormData({
                                        fullName: '',
                                        designation: '',
                                        email: '',
                                        phone: '',
                                        address: '',
                                        picture: null, // Reset picture field
                                    })}>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
