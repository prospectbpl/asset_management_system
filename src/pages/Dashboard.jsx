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
            <div className='w-100'>
                <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid">
                    {/* add new Asset Modal is open or Close  */}
                    {/*  <!-- Page Heading --> */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    </div>
                    {/*  <!-- Content Row --> */}
                    <div className="row">
                        {/*  <!-- Total Asset Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Asset</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssetCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Component</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalComponentCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Maintenance</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalMaintenanceCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                                                Total Sites
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{totalSiteCount}</div> {/* Updated amount */}
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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

                    {/*  <!-- Content Row --> */}

                    <div className="row">

                        {/*   <!-- Area Chart --> */}
                        <div className="" style={{ height: "200px" }}>
                            <div className="card shadow mb-4">
                                {/*  <!-- Card Header - Dropdown --> */}
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
                                </div>
                                {/*  <!-- Card Body --> */}
                                {/*  <!-- Card Body --> */}
                                <div className="card-body">
                                    <div className="table-responsive d-flex">
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Assets</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                {assets.length > 0 ? (
                                                    assets.map(asset => (
                                                        <tr key={asset.id}>
                                                            <td style={{ width: "100vw" }}>{asset.name}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td style={{ width: "100vw" }} colSpan="1">No Assets ..</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Components</th>
                                                </tr>
                                            </thead>
                                            <div style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                <tbody>
                                                    {fullComponents.length > 0 ? (
                                                        fullComponents.map(component => (
                                                            <tr key={component.id}>
                                                                <td style={{ width: "100vw" }}>{component.componentName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ width: "100vw" }} colSpan="1">No Components ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>

                                            </div>
                                        </table>
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }} >
                                            <thead>
                                                <tr>
                                                    <th>Under Maintenance</th>
                                                </tr>
                                            </thead>
                                            <div style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                <tbody >
                                                    {maintenance.length > 0 ? (
                                                        maintenance.map(maintenanceItem => (
                                                            <tr key={maintenanceItem.id}>
                                                                <td style={{ width: "100vw" }} >{maintenanceItem.assetName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr >
                                                            <td style={{ width: "100vw" }} colSpan="1">No Maintenance ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </div>
                                        </table>
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Sites</th>
                                                </tr>
                                            </thead>
                                            <div style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                <tbody>
                                                    {sites.length > 0 ? (
                                                        sites.map(site => (
                                                            <tr key={site.id}>
                                                                <td style={{ width: "100vw" }}>{site.siteName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ width: "100vw" }} colSpan="1">No Sites ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </div>
                                        </table>
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Employees</th>
                                                </tr>
                                            </thead>
                                            <div style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                <tbody>
                                                    {employees.length > 0 ? (
                                                        employees.map(employee => (
                                                            <tr key={employee.id}>
                                                                <td style={{ width: "100vw" }}>{employee.ename}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ width: "100vw" }} colSpan="1">No Employees ..</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </div>
                                        </table>
                                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed", border: "1px solid #ECECEC" }}>
                                            <thead>
                                                <tr>
                                                    <th>Total Clients</th>
                                                </tr>
                                            </thead>
                                            <div style={{ maxHeight: "240px", overflowY: "auto", overflowX: "hidden", display: "block", background: "green" }}>
                                                <tbody>
                                                    {clients.length > 0 ? (
                                                        clients.map(client => (
                                                            <tr key={client.id}>
                                                                <td style={{ width: "100vw" }}>{client.clientName}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ width: "100vw" }} colSpan="1">No Clients ..</td>
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


    )
}

export default Dashboard;



