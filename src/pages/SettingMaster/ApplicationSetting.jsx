import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../../components/sidebar/SearchBar';
import Sidebar from '../../components/sidebar/Sidebar';

const ApplicationSetting = ({ handleLogout, username }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        address: '',
        email: '',
        phone: '',
        assetTagPrefix: ''
    });
    const [favicon, setFavicon] = useState('');
    const [landingPageLogo, setLandingPageLogo] = useState('');
    const [dashboardLogo, setDashboardLogo] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
            const data = response.data;
            if (data) {
                setFormData(data);
                setFavicon(data.favicon ? data.favicon : ''); // Handle null favicon 
                setLandingPageLogo(data.landingPageLogo ? data.landingPageLogo : ''); // Handle null landingPageLogo value
                setDashboardLogo(data.dashboardLogo ? data.dashboardLogo : ''); // Handle null dashboardLogo value
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        setFavicon(file);
    }

    const handleLandingPageLogoChange = (e) => {
        const file = e.target.files[0];
        setLandingPageLogo(file);
    }

    const handleDashboardLogoChange = (e) => {
        const file = e.target.files[0];
        setDashboardLogo(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Append other form data fields
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        // Append image files if they exist
        if (favicon) formDataToSend.append('favicon', favicon);
        if (landingPageLogo) formDataToSend.append('landingPageLogo', landingPageLogo);
        if (dashboardLogo) formDataToSend.append('dashboardLogo', dashboardLogo);

        try {
            const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/settings/upload`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchData();
            toast.success('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data');
        }
    };


    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100'>
                <SearchBar username={username} handleLogout={handleLogout} />
                <div className="container-fluid">
                    <ToastContainer /> {/* Toast container */}
                    <div className="se-pre-con" style={{ display: 'none' }}></div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="panel panel-bd">
                                <div className="panel-heading">
                                    <div className="panel-title">
                                        <h4>Asset Settings</h4>
                                    </div>
                                </div>
                                <div className="panel-body"  style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto", overflowX:"hidden" }}>
                                    <form onSubmit={handleSubmit} className="form-inner" encType="multipart/form-data" acceptCharset="utf-8">
                                        <input type="hidden" name="id" value={formData.id} autoComplete="off" />
                                        <div className="form-group row">
                                            <label htmlFor="title" className="col-xs-3 col-form-label">Application Title <span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9">
                                                <input name="title" type="text" className="form-control" id="title" placeholder="Application Title" value={formData.title} onChange={handleInputChange} autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="address" className="col-xs-3 col-form-label">Address<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9">
                                                <input name="address" type="text" className="form-control" id="address" placeholder="Address" value={formData.address} onChange={handleInputChange} autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-xs-3 col-form-label">Email Address<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9">
                                                <input name="email" type="text" className="form-control" id="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-xs-3 col-form-label">Phone<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9">
                                                <input name="phone" type="number" className="form-control" id="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="assetTagPrefix" className="col-xs-3 col-form-label">Asset Tag Prefix (Max 6 characters)<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9">
                                                <input name="assetTagPrefix" type="text" className="form-control" id="assetTagPrefix" placeholder="Asset Tag Prefix" maxLength="6" value={formData.assetTagPrefix} onChange={handleInputChange} autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xs-3 col-form-label">Favicon<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9  d-flex">
                                                <div className="me-2" style={{ width: "90px" }}>
                                                    <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${favicon}`} alt="Favicon" className="img-thumbnail" />
                                                </div>

                                                {/* <img src={favicon} alt="Favicon" className="img-thumbnail" /> */}
                                                <input type="file" name="favicon" id="favicon" autoComplete="off" onChange={handleFaviconChange} />
                                                <input type="hidden" name="old_favicon" value="" autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xs-3 col-form-label">Landing Page Logo<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9  d-flex">
                                                <div className="me-2" style={{ width: "120px" }}>
                                                    <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${landingPageLogo}`} alt="Picture" className="img-thumbnail" />
                                                </div>

                                                {/* <img src={landingPageLogo} alt="Picture" className="img-thumbnail" /> */}
                                                <input type="file" name="landingPageLogo" id="landingPageLogo" autoComplete="off" onChange={handleLandingPageLogoChange} />
                                                <input type="hidden" name="old_landingPageLogo" value="" autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xs-3 col-form-label">Dashboard Logo<span style={{ color: "red"}}>*</span></label>
                                            <div className="col-xs-9  d-flex">
                                                <div className="me-2" style={{ width: "120px" }}>
                                                    <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${dashboardLogo}`} alt="Picture" className="img-thumbnail" />
                                                </div>
                                                {/* <img src={ dashboardLogo} alt="Picture" className="img-thumbnail" /> */}
                                                <input type="file" name="dashboardLogo" id="dashboardLogo" autoComplete="off" onChange={handleDashboardLogoChange} />
                                                <input type="hidden" name="old_dashboardLogo" value="" autoComplete="off" />
                                            </div>
                                        </div>
                                        <div className="form-group form-group-margin text-left">
                                            <button type="submit" className="btn btn-success w-md m-b-5" autoComplete="off">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationSetting;
