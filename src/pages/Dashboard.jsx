import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../components/sidebar/Sidebar';
import SearchBar from '../components/sidebar/SearchBar';

function Dashboard({ handleLogout, username }) {
    // for Dashboard 
    const [totalAssetCount, setTotalAssetCount] = useState(0);
    const [totalComponentCount, setTotalComponentCount] = useState(0);
    const [totalSiteCount, setTotalSiteCount] = useState(0);
    const [totalMaintenanceCount, setTotalMaintenanceCount] = useState(0);
    const [assets, setAssets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [sites, setSites] = useState([]);
    const [clients, setClients] = useState([]);
    const [fullComponents, setFullComponents] = useState([]);
    const [maintenance, setMaintenance] = useState([]);

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const assetResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);

            const componentResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);

            const siteResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);

            const maintenanceResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);

            console.log('Asset response:', assetResponse.data);
            console.log('Component response:', componentResponse.data);
            console.log('Site response:', siteResponse.data);
            console.log('Maintenance response:', maintenanceResponse.data);

            if (Array.isArray(assetResponse.data)) {
                setTotalAssetCount(assetResponse.data.length);
            } else {
                console.error('Invalid response format for total asset count');
            }

            if (Array.isArray(componentResponse.data)) {
                setTotalComponentCount(componentResponse.data.length);
            } else {
                console.error('Invalid response format for total component count');
            }

            if (Array.isArray(siteResponse.data)) {
                setTotalSiteCount(siteResponse.data.length);
            } else {
                console.error('Invalid response format for total site count');
            }

            if (Array.isArray(maintenanceResponse.data)) {
                setTotalMaintenanceCount(maintenanceResponse.data.length);
            } else {
                console.error('Invalid response format for total maintenance count');
            }
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    // for the dashboard main content 
    useEffect(() => {
        fetchAssets();
        fetchComponents();
        fetchMaintenance();
        fetchEmployees();
        fetchSites();
        fetchClients();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
            setAssets(response.data);
        } catch (error) {
            console.error("Error fetching assets:", error);
        }
    };

    const fetchComponents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents`);
            setFullComponents(response.data);
        } catch (error) {
            console.error('Error fetching fullcomponents:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching fullcomponents:', error);
        }
    };
    const fetchSites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
            setSites(response.data);
        } catch (error) {
            console.error('Error fetching fullcomponents:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching fullcomponents:', error);
        }
    };

    const fetchMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);
            // Filter maintenance items where task is unfinished
            const finishedMaintenance = response.data.filter(item => item.task === "unfinished");
            setMaintenance(finishedMaintenance);
        } catch (error) {
            console.error("Error fetching maintenance:", error);
        }
    };


    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100 bg-white'>
                <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid bg-white">
                    {/* add new Asset Modal is open or Close  */}
                    {/*  <!-- Page Heading --> */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-3">
                        <h3 className="mb-0 text-gray-800">Dashboard</h3>
                    </div>
                    {/*  <!-- Content Row --> */}
                    <div className="row">
                        {/*  <!-- Total Asset Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Asset</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssetCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-arrow-right fa-2x text-success"></i>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-12">
                                            <hr className="my-2" /> {/* Line added here */}
                                            <div className="stats">
                                                <i className="fa fa-angle-double-right text-success"></i>
                                                <span><Link className="text-success" to="/assetlist">More info</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  <!-- Total Component Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Component</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalComponentCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-arrow-right fa-2x text-success"></i>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-12">
                                            <hr className="my-2" /> {/* Line added here */}
                                            <div className="stats">
                                                <i className="fa fa-angle-double-right text-success"></i>
                                                <span><Link className="text-success" to="/fullcomponentList">More info</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  <!-- Total Maintenance Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Maintenance</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalMaintenanceCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-arrow-right fa-2x text-success"></i>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-12">
                                            <hr className="my-2" /> {/* Line added here */}
                                            <div className="stats">
                                                <i className="fa fa-angle-double-right text-success"></i>
                                                <span><Link className="text-success" to="/assetMaintenance">More info</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  <!-- Total Sites Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Sites
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalSiteCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-arrow-right fa-2x text-success"></i>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-12">
                                            <hr className="my-2" /> {/* Line added here */}
                                            <div className="stats">
                                                <i className="fa fa-angle-double-right text-success"></i>
                                                <span><Link className="text-success" to="/sitelist">More info</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Check that how it works */}
                    <div className="row  pb-4">
                        {/*   <!-- Area Chart --> */}
                        <div >
                            <div className="card shadow-sm">
                                {/*  <!-- Card Header - Dropdown --> */}
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
                                </div>
                                <div className="card-body ">
                                    <div style={{ width: "100%" }} className="table-responsive d-flex justify-content-between ">
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Total Assets</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {assets.length > 0 ? (
                                                        assets.map(asset => (
                                                            <tr key={asset.id}>
                                                                <td style={{ width: "100vw" }}>{asset.name}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center text-secondary fw-bold' >No Assets ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Total Components</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fullComponents.length > 0 ? (
                                                        fullComponents.map(component => (
                                                            <tr key={component.id}>
                                                                <td style={{ width: "100vw" }}>{component.componentName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className='text-center text-secondary fw-bold' >No Components ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Under Maintenance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {maintenance.length > 0 ? (
                                                        maintenance.map(maintenanceItem => (
                                                            <tr key={maintenanceItem.id}>
                                                                <td style={{ width: "100vw" }} >{maintenanceItem.assetName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr >
                                                            <td className='text-center text-secondary fw-bold' >No Maintenance ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* check */}
                    <div className="row  pb-4">
                        {/*   <!-- Area Chart --> */}
                        <div>
                            <div className="card shadow-sm mb-4">
                                {/*  <!-- Card Header - Dropdown --> */}
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
                                </div>
                                <div className="card-body">
                                    <div style={{ width: "100%" }} className="table-responsive d-flex justify-content-between ">
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Total Sites</th>
                                                    </tr>
                                                </thead>
                                                <div >
                                                    <tbody>
                                                        {sites.length > 0 ? (
                                                            sites.map(site => (
                                                                <tr key={site.id}>
                                                                    <td style={{ width: "100vw" }}>{site.siteName}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className='text-center text-secondary fw-bold'>No Sites ..</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </div>
                                            </table>
                                        </div>
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Total Employees</th>
                                                    </tr>
                                                </thead>
                                                <div >
                                                    <tbody>
                                                        {employees.length > 0 ? (
                                                            employees.map(employee => (
                                                                <tr key={employee.id}>
                                                                    <td style={{ width: "100vw" }}>{employee.ename}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className='text-center text-secondary fw-bold'>No Employees ..</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </div>
                                            </table>
                                        </div>
                                        <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
                                            <table className="table table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Total Clients</th>
                                                    </tr>
                                                </thead>
                                                <div >
                                                    <tbody>
                                                        {clients.length > 0 ? (
                                                            clients.map(client => (
                                                                <tr key={client.id}>
                                                                    <td style={{ width: "100vw" }}>{client.clientName}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className='text-center text-secondary fw-bold'>No Clients ..</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </div>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    )
}

export default Dashboard;



