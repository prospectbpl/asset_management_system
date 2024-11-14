// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Dashboard.css';
// import Sidebar from '../components/sidebar/Sidebar';
// import SearchBar from '../components/sidebar/SearchBar';
// import { ThreeDots } from 'react-loader-spinner';  // <-- Correct import for spinner


// function Dashboard({ handleLogout, username }) {
//     // for Dashboard 
//     const [loading, setLoading] = useState(false);
//     const [totalAssetCount, setTotalAssetCount] = useState(0);
//     const [totalComponentCount, setTotalComponentCount] = useState(0);
//     const [totalSiteCount, setTotalSiteCount] = useState(0);
//     const [totalMaintenanceCount, setTotalMaintenanceCount] = useState(0);
//     const [assets, setAssets] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [sites, setSites] = useState([]);
//     const [clients, setClients] = useState([]);
//     const [fullComponents, setFullComponents] = useState([]);
//     const [maintenance, setMaintenance] = useState([]);

//     useEffect(() => {
//         fetchCounts();
//     }, []);

//     const fetchCounts = async () => {
//         try {
//             const assetResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);

//             const componentResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/components`);

//             const siteResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);

//             const maintenanceResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);

//             console.log('Asset response:', assetResponse.data);
//             console.log('Component response:', componentResponse.data);
//             console.log('Site response:', siteResponse.data);
//             console.log('Maintenance response:', maintenanceResponse.data);

//             if (Array.isArray(assetResponse.data)) {
//                 setTotalAssetCount(assetResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total asset count');
//             }

//             if (Array.isArray(componentResponse.data)) {
//                 setTotalComponentCount(componentResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total component count');
//             }

//             if (Array.isArray(siteResponse.data)) {
//                 setTotalSiteCount(siteResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total site count');
//             }

//             if (Array.isArray(maintenanceResponse.data)) {
//                 setTotalMaintenanceCount(maintenanceResponse.data.length);
//             } else {
//                 console.error('Invalid response format for total maintenance count');
//             }
//         } catch (error) {
//             console.error('Error fetching counts:', error);
//         }
//     };

//     // for the dashboard main content 
//     useEffect(() => {
//         fetchAssets();
//         fetchComponents();
//         fetchMaintenance();
//         fetchEmployees();
//         fetchSites();
//         fetchClients();
//     }, []);

//     const fetchAssets = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
//             setAssets(response.data);
//         } catch (error) {
//             console.error("Error fetching assets:", error);
//         }
//     };

//     const fetchComponents = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents`);
//             setFullComponents(response.data);
//         } catch (error) {
//             console.error('Error fetching fullcomponents:', error);
//         }
//     };

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
//             setEmployees(response.data);
//         } catch (error) {
//             console.error('Error fetching fullcomponents:', error);
//         }
//     };
//     const fetchSites = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//             setSites(response.data);
//         } catch (error) {
//             console.error('Error fetching fullcomponents:', error);
//         }
//     };

//     const fetchClients = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`);
//             setClients(response.data);
//         } catch (error) {
//             console.error('Error fetching fullcomponents:', error);
//         }
//     };

//     const fetchMaintenance = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance`);
//             // Filter maintenance items where task is unfinished
//             const finishedMaintenance = response.data.filter(item => item.task === "unfinished");
//             setMaintenance(finishedMaintenance);
//         } catch (error) {
//             console.error("Error fetching maintenance:", error);
//         }
//     };


//     return (
//         <div className='d-flex w-100 bg-white h-100 '>
//             <Sidebar />
//             <div className='w-100 bg-white'>
//                 <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
//                 <div className="container-fluid bg-white">
//                     {/* add new Asset Modal is open or Close  */}
//                     {/*  <!-- Page Heading --> */}
//                     <div className="d-sm-flex align-items-center justify-content-between mb-3">
//                         <h3 className="mb-0 text-gray-800">Dashboard</h3>
//                     </div>
//                     {/*  <!-- Content Row --> */}
//                     <div className="row">
//                         {/*  <!-- Total Asset Card Example --> */}
//                         <div className="col-xl-3 col-md-6 mb-4">
//                             <div className="card border-left-success shadow-sm h-100 py-2">
//                                 <div className="card-body">
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col mr-2">
//                                             <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
//                                                 Total Asset</div>
//                                             <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssetCount}</div> {/* Updated amount */}
//                                         </div>
//                                         <div className="col-auto">
//                                             <i className="fa fa-arrow-right fa-2x text-success"></i>
//                                         </div>
//                                     </div>
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col-md-12">
//                                             <hr className="my-2" /> {/* Line added here */}
//                                             <div className="stats">
//                                                 <i className="fa fa-angle-double-right text-success"></i>
//                                                 <span><Link className="text-success" to="/assetlist">More info</Link></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/*  <!-- Total Component Card Example --> */}
//                         <div className="col-xl-3 col-md-6 mb-4">
//                             <div className="card border-left-success shadow-sm h-100 py-2">
//                                 <div className="card-body">
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col mr-2">
//                                             <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
//                                                 Total Component</div>
//                                             <div className="h5 mb-0 font-weight-bold text-gray-800">{totalComponentCount}</div> {/* Updated amount */}
//                                         </div>
//                                         <div className="col-auto">
//                                             <i className="fa fa-arrow-right fa-2x text-success"></i>
//                                         </div>
//                                     </div>
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col-md-12">
//                                             <hr className="my-2" /> {/* Line added here */}
//                                             <div className="stats">
//                                                 <i className="fa fa-angle-double-right text-success"></i>
//                                                 <span><Link className="text-success" to="/fullcomponentList">More info</Link></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/*  <!-- Total Maintenance Card Example --> */}
//                         <div className="col-xl-3 col-md-6 mb-4">
//                             <div className="card border-left-success shadow-sm h-100 py-2">
//                                 <div className="card-body">
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col mr-2">
//                                             <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
//                                                 Total Maintenance</div>
//                                             <div className="h5 mb-0 font-weight-bold text-gray-800">{totalMaintenanceCount}</div> {/* Updated amount */}
//                                         </div>
//                                         <div className="col-auto">
//                                             <i className="fa fa-arrow-right fa-2x text-success"></i>
//                                         </div>
//                                     </div>
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col-md-12">
//                                             <hr className="my-2" /> {/* Line added here */}
//                                             <div className="stats">
//                                                 <i className="fa fa-angle-double-right text-success"></i>
//                                                 <span><Link className="text-success" to="/assetMaintenance">More info</Link></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/*  <!-- Total Sites Card Example --> */}
//                         <div className="col-xl-3 col-md-6 mb-4">
//                             <div className="card border-left-success shadow-sm h-100 py-2">
//                                 <div className="card-body">
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col mr-2">
//                                             <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
//                                                 Total Sites
//                                             </div>
//                                             <div className="h5 mb-0 font-weight-bold text-gray-800">{totalSiteCount}</div> {/* Updated amount */}
//                                         </div>
//                                         <div className="col-auto">
//                                             <i className="fa fa-arrow-right fa-2x text-success"></i>
//                                         </div>
//                                     </div>
//                                     <div className="row no-gutters align-items-center">
//                                         <div className="col-md-12">
//                                             <hr className="my-2" /> {/* Line added here */}
//                                             <div className="stats">
//                                                 <i className="fa fa-angle-double-right text-success"></i>
//                                                 <span><Link className="text-success" to="/sitelist">More info</Link></span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Check that how it works */}
//                     <div className="row  pb-4">
//                         {/*   <!-- Area Chart --> */}
//                         <div >
//                             <div className="card shadow-sm">
//                                 {/*  <!-- Card Header - Dropdown --> */}
//                                 <div
//                                     className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                     <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
//                                 </div>
//                                 <div className="card-body ">
//                                     <div style={{ width: "100%" }} className="table-responsive d-flex justify-content-between ">
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Total Assets</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody >
//                                                     {assets.length > 0 ? (
//                                                         assets.map(asset => (
//                                                             <tr key={asset.id}>
//                                                                 <td style={{ width: "100vw" }}>{asset.name}</td>
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr>
//                                                             <td className='text-center text-secondary fw-bold' >No Assets ..</td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Total Components</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {fullComponents.length > 0 ? (
//                                                         fullComponents.map(component => (
//                                                             <tr key={component.id}>
//                                                                 <td style={{ width: "100vw" }}>{component.componentName}</td>
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr>
//                                                             <td className='text-center text-secondary fw-bold' >No Components ..</td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Under Maintenance</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {maintenance.length > 0 ? (
//                                                         maintenance.map(maintenanceItem => (
//                                                             <tr key={maintenanceItem.id}>
//                                                                 <td style={{ width: "100vw" }} >{maintenanceItem.assetName}</td>
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr >
//                                                             <td className='text-center text-secondary fw-bold' >No Maintenance ..</td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                         </div>



//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* check */}
//                     <div className="row  pb-4">
//                         {/*   <!-- Area Chart --> */}
//                         <div>
//                             <div className="card shadow-sm mb-4">
//                                 {/*  <!-- Card Header - Dropdown --> */}
//                                 <div
//                                     className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                     <h6 className="m-0 font-weight-bold text-primary">Overview</h6>
//                                 </div>
//                                 <div className="card-body">
//                                     <div style={{ width: "100%" }} className="table-responsive d-flex justify-content-between ">
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Total Sites</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <div >
//                                                     <tbody>
//                                                         {sites.length > 0 ? (
//                                                             sites.map(site => (
//                                                                 <tr key={site.id}>
//                                                                     <td style={{ width: "100vw" }}>{site.siteName}</td>
//                                                                 </tr>
//                                                             ))
//                                                         ) : (
//                                                             <tr>
//                                                                 <td className='text-center text-secondary fw-bold'>No Sites ..</td>
//                                                             </tr>
//                                                         )}
//                                                     </tbody>
//                                                 </div>
//                                             </table>
//                                         </div>
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Total Employees</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <div >
//                                                     <tbody>
//                                                         {employees.length > 0 ? (
//                                                             employees.map(employee => (
//                                                                 <tr key={employee.id}>
//                                                                     <td style={{ width: "100vw" }}>{employee.ename}</td>
//                                                                 </tr>
//                                                             ))
//                                                         ) : (
//                                                             <tr>
//                                                                 <td className='text-center text-secondary fw-bold'>No Employees ..</td>
//                                                             </tr>
//                                                         )}
//                                                     </tbody>
//                                                 </div>
//                                             </table>
//                                         </div>
//                                         <div style={{ maxHeight: "450px", overflowY: "auto", width: "33.3%", borderTop: "1px solid #E3E6F0" }}>
//                                             <table className="table table-bordered" style={{ width: "100%" }}>
//                                                 <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
//                                                     <tr>
//                                                         <th>Total Clients</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <div >
//                                                     <tbody>
//                                                         {clients.length > 0 ? (
//                                                             clients.map(client => (
//                                                                 <tr key={client.id}>
//                                                                     <td style={{ width: "100vw" }}>{client.clientName}</td>
//                                                                 </tr>
//                                                             ))
//                                                         ) : (
//                                                             <tr>
//                                                                 <td className='text-center text-secondary fw-bold'>No Clients ..</td>
//                                                             </tr>
//                                                         )}
//                                                     </tbody>
//                                                 </div>
//                                             </table>
//                                         </div>

//                                     </div>
//                                 </div>

//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </div>


//     )
// }

// export default Dashboard;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../components/sidebar/Sidebar';
import SearchBar from '../components/sidebar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';  // <-- Correct import for spinner


function Dashboard({ handleLogout, username }) {
    // for Dashboard 
    const [loading, setLoading] = useState(false);
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


<div className='d-flex w-100 h-100 bg-white '>
    <Sidebar />
    <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid px-3">
            <ToastContainer />
            <div className=' bg-white rounded p-3 shadow'>
                <div style={{ borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="d-sm-flex align-items-center justify-content-between shadow-sm mb-4 p-3 ">
                    <h3 style={{ color: "white" }} className="title-detail fw-bolder font-bold m-0">
                        Dashboard
                    </h3>
                </div>
                {/* Content Row */}
                <div className="row px-3 mb-3">
                    <div style={{ width: "100%" }} className='p-0 d-flex align-items-center justify-content-between'>
                        <div style={{ width: "22%", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", borderRadius: "20px" }} className=' p-3'>
                            <div className="row no-gutters align-items-center">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase mb-2 d-flex align-items-center justify-content-between" style={{ fontSize: '1rem' }}>
                                        <i className="fa-solid fa-users"></i>
                                        <span><Link className='text-white' to="/assetlist"><i style={{ rotate: "45deg" }} className=" fa-solid fa-circle-arrow-up"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="nunito text-white" >
                                        Total Asset
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='mt-2'>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* Correct usage of spinner */}
                                        <ThreeDots
                                            color="#00BFFF"
                                            height={80}
                                            width={80}
                                        />
                                    </div>
                                ) : (
                                    <h3 style={{ fontSize: "2vw" }} className="text-end text-white fw-bolder m-0">
                                       {totalAssetCount}
                                    </h3>)} {/* Updated amount */}
                            </div>
                        </div>
                        <div style={{ width: "22%", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", borderRadius: "20px" }} className=' p-3'>
                            <div className="row no-gutters align-items-center">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase mb-2 d-flex align-items-center justify-content-between" style={{ fontSize: '1rem' }}>
                                        <i class="fa-solid fa-diagram-project"></i>
                                        <span><Link className='text-white' to="/fullcomponentList"><i style={{ rotate: "45deg" }} className=" fa-solid fa-circle-arrow-up"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="nunito text-white" >
                                        Total Component
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='mt-2'>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* Correct usage of spinner */}
                                        <ThreeDots
                                            color="#00BFFF"
                                            height={80}
                                            width={80}
                                        />
                                    </div>
                                ) : (
                                    <h3 style={{ fontSize: "2vw" }} className="text-end text-white fw-bolder m-0">
                                       {totalComponentCount}
                                    </h3>)} {/* Updated amount */}
                            </div>
                        </div>
                        <div style={{ width: "22%", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", borderRadius: "20px" }} className=' p-3'>
                            <div className="row no-gutters align-items-center">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase mb-2 d-flex align-items-center justify-content-between" style={{ fontSize: '1rem' }}>
                                        <i class="fa-solid fa-diagram-project"></i>
                                        <span><Link className='text-white' to="/assetMaintenance"><i style={{ rotate: "45deg" }} className=" fa-solid fa-circle-arrow-up"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="nunito text-white" >
                                        Total Maintenance
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='mt-2'>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* Correct usage of spinner */}
                                        <ThreeDots
                                            color="#00BFFF"
                                            height={80}
                                            width={80}
                                        />
                                    </div>
                                ) : (
                                    <h3 style={{ fontSize: "2vw" }} className="text-end text-white fw-bolder m-0">
                                       {totalMaintenanceCount}
                                    </h3>)} {/* Updated amount */}
                            </div>
                        </div>
                        <div style={{ width: "22%", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", borderRadius: "20px" }} className=' p-3'>
                            <div className="row no-gutters align-items-center">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase mb-2 d-flex align-items-center justify-content-between" style={{ fontSize: '1rem' }}>
                                        <i class="fa-solid fa-diagram-project"></i>
                                        <span><Link className='text-white' to="/sitelist"><i style={{ rotate: "45deg" }} className=" fa-solid fa-circle-arrow-up"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="nunito text-white" >
                                        Total Sites
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='mt-2'>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        {/* Correct usage of spinner */}
                                        <ThreeDots
                                            color="#00BFFF"
                                            height={80}
                                            width={80}
                                        />
                                    </div>
                                ) : (
                                    <h3 style={{ fontSize: "2vw" }} className="text-end text-white fw-bolder m-0">
                                       {totalSiteCount}
                                    </h3>)} {/* Updated amount */}
                            </div>
                        </div>

                    </div>
                </div>

                {/* content row   */}
                <div className="row px-3 mb-3">
                    <div style={{ width: "100%" }} className='p-0 d-flex justify-content-between'>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Total Assets
                                        </div>
                                        <span><Link className='text-white' to="/assetlist"><i class="fa-solid fa-bell"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    // className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : assets.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Asset Found </p>
                                    ) : (
                                        assets.map((asset, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {asset.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Total Components
                                        </div>
                                        <span><Link className='text-white' to="/componentlist"><i class="fa-solid fa-bell"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    //  className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : fullComponents.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Components</p>
                                    ) : (
                                        fullComponents.map((component, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {component.componentName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Under Maintenance
                                        </div>
                                        <span><Link className='text-white' to="/unfinishedmaintenance"><i class="fa-solid fa-bell"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    //  className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : maintenance.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Components</p>
                                    ) : (
                                        maintenance.map((maintenanceItem, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {maintenanceItem.assetName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* content row   */}
                <div className="row px-3 mb-3">
                    <div style={{ width: "100%" }} className='p-0 d-flex justify-content-between'>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Total Sites
                                        </div>
                                        <span><Link className='text-white' to="/sitelist"><i class="fa-solid fa-bell"></i></Link></span>

                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    // className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : sites.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Asset Found </p>
                                    ) : (
                                        sites.map((site, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {site.siteName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Total Employees
                                        </div>
                                        <span><Link className='text-white' to="/employeelist"><i class="fa-solid fa-bell"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    //  className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : employees.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Components</p>
                                    ) : (
                                        employees.map((employee, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {employee.ename}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "33%", borderRadius: "20px", border: "1px solid #0077b6" }} className='overflow-hidden'>
                            <div style={{ background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)", }} className="row no-gutters align-items-center px-4 py-2">
                                <div className="col">
                                    <div className="text-xs font-weight-bold text-white text-uppercase d-flex align-items-center justify-content-between" style={{ fontSize: '1.5rem' }}>
                                        <div className="nunito text-white" >
                                            Total Clients
                                        </div>
                                        <span><Link className='text-white' to="/clientlist"><i class="fa-solid fa-bell"></i></Link></span>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0 p-0' />
                            <div className='p-1'>
                                <div
                                    //  className='forresponsive'
                                    style={{ height: "270px", overflowY: "auto", overflowX: "hidden" }}
                                >
                                    {loading ? (
                                        <div className="d-flex justify-content-center align-items-center">
                                            {/* Correct usage of spinner */}
                                            <ThreeDots
                                                color="#00BFFF"
                                                height={80}
                                                width={80}
                                            />
                                        </div>
                                    ) : clients.length === 0 ? (
                                        <p className="nunito text-black text-center text-muted">No Components</p>
                                    ) : (
                                        clients.map((client, index) => (
                                            <div key={index}
                                                style={{ border: "1px solid #35A9D0", borderRadius: "10px", background: "rgb(33,131,128)", background: "linear-gradient(9deg, rgb(40 135 167) 19%, #35A9D0 93%)" }}
                                                className="p-1 m-1 text-white"
                                            >
                                                <div className="d-flex align-items-start p-1 ">
                                                    <div className='w-100'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className=''>
                                                                <p className=" nunito m-0 p-0">
                                                                    {client.clientName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
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




















































