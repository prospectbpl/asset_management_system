// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Sidebar from '../../components/sidebar/Sidebar';
// import SearchBar from '../../components/sidebar/SearchBar';
// import VendorAssetReportPreview from './VendorAssetReportPreview';

// function VendorAssetReport({ handleLogout, username }) {
//     const [showSidebar, setShowSidebar] = useState(true);
//     const [showSearchBar, setShowSearchBar] = useState(true);
//     const [showReportPrev] = useState(false);
//     const [vendors, setVendors] = useState([]);
//     const [selectedVendor, setSelectedVendor] = useState('');
//     const [assets, setAssets] = useState([]);
//     const [showAssetPrint, setShowAssetPrint] = useState(false);
//     const [filteredAssets, setFilteredAssets] = useState([]);
//     const [selectedRecord, setSelectedRecord] = useState({});

//     // Fetch vendors on component mount
//     useEffect(() => {
//         const fetchVendors = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//                 setVendors(response.data);
//             } catch (error) {
//                 console.error("Error fetching vendors:", error);
//                 toast.error('Failed to fetch vendors.');
//             }
//         };
//         fetchVendors();
//     }, []);

//     // Fetch assets when the selected vendor changes
//     useEffect(() => {
//         const fetchAssets = async () => {
//             if (selectedVendor) {
//                 try {
//                     const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendoruniquedata/${selectedVendor}`);
//                     setAssets(response.data);
//                     filterAssets(response.data);
//                 } catch (error) {
//                     console.error("Error fetching assets:", error);
//                     toast.error('Failed to fetch assets.');
//                 }
//             } else {
//                 setAssets([]);
//                 setFilteredAssets([]);
//             }
//         };
//         fetchAssets();
//     }, [selectedVendor]);

//     // Filter assets function
//     const filterAssets = (assetsData) => {
//         // Define filtering logic if needed
//         setFilteredAssets(assetsData);
//     };

//     // Handle vendor selection change
//     const handleVendorChange = (event) => {
//         setSelectedVendor(event.target.value);
//     };

//     // Handle print report
//     const handleCategoryPrint = () => {
//         setSelectedRecord({
//             date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
//             status: filteredAssets.length > 0 ? filteredAssets[0].status : '',
//             assetData: filteredAssets,
//         });

//         setShowAssetPrint(true);
//         setShowSidebar(false);
//         setShowSearchBar(false);
//     };

//     // Handle closing the preview
//     const handleClosePreview = () => {
//         setShowSidebar(true);
//         setShowSearchBar(true);
//         setShowAssetPrint(false);
//     };

//     // Function to format date
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
//     };

//     return (
//         <div className='d-flex w-100 h-100'>
//             {showSidebar && <Sidebar />}
//             <div className='w-100'>
//                 {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
//                 <div className="container-fluid">
//                     <ToastContainer />
//                     {showAssetPrint ? (
//                         <VendorAssetReportPreview
//                             record={selectedRecord}
//                             onClose={handleClosePreview}
//                         />
//                     ) : (
//                         <div className="row">
//                             <div className="col-xl-12">
//                                 <div className="card shadow mb-4">
//                                     <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                         <h6 className="m-0 font-weight-bold text-primary">Vendors List</h6>
//                                         <div className='d-flex align-items-center gap-2'>
//                                             <label className='pt-2 text-black fw-bolder'>Vendor:</label>
//                                             <select
//                                                 id="vendorsSelect"
//                                                 value={selectedVendor}
//                                                 onChange={handleVendorChange}
//                                                 className="form-select"
//                                             >
//                                                 <option value="">Select Vendor</option>
//                                                 {vendors.map(vendor => (
//                                                     <option key={vendor.id} value={vendor.id}>
//                                                         {vendor.vendorCompanyName}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <button className='btn btn-success' onClick={handleCategoryPrint}>PDF</button>
//                                         </div>
//                                     </div>
//                                     <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
//                                         <table className="table table-striped table-bordered" style={{ width: "100%" }}>
//                                             <thead>
//                                                 <tr>
//                                                     <th>Asset Picture</th>
//                                                     <th>Asset Name</th>
//                                                     <th>Asset Tag</th>
//                                                     <th>Purchase Date</th>
//                                                     <th>Category</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {filteredAssets.length > 0 ? (
//                                                     filteredAssets.map((asset) => (
//                                                         <tr key={asset.id}>
//                                                             <td>
//                                                                 <img
//                                                                     src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
//                                                                     style={{ width: "90px" }}
//                                                                     alt="Asset"
//                                                                 />
//                                                             </td>
//                                                             <td>{asset.name}</td>
//                                                             <td>{asset.assettag}</td>
//                                                             <td>{formatDate(asset.purchaseDate)}</td>
//                                                             <td>{asset.category_name}</td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="5" className="text-center">No assets found</td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default VendorAssetReport;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Sidebar from '../../components/sidebar/Sidebar';
// import SearchBar from '../../components/sidebar/SearchBar';
// import VendorAssetReportPreview from './VendorAssetReportPreview';

// function VendorAssetReport({ handleLogout, username }) {
//     const [showSidebar, setShowSidebar] = useState(true);
//     const [showSearchBar, setShowSearchBar] = useState(true);
//     const [showReportPrev] = useState(false);
//     const [vendors, setVendors] = useState([]);
//     const [selectedVendor, setSelectedVendor] = useState('');
//     const [assets, setAssets] = useState([]);
//     const [showAssetPrint, setShowAssetPrint] = useState(false);
//     const [filteredAssets, setFilteredAssets] = useState([]);
//     const [selectedRecord, setSelectedRecord] = useState({});
    
//     // Fetch vendors on component mount
//     useEffect(() => {
//         const fetchVendors = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
//                 setVendors(response.data);
//             } catch (error) {
//                 console.error("Error fetching vendors:", error);
//                 toast.error('Failed to fetch vendors.');
//             }
//         };
//         fetchVendors();
//     }, []);

//     // Fetch assets when the selected vendor changes
//     const fetchAsset = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assetuniquedata`);
//             setAssets(response.data);
//             console.log(response.data)
//         } catch (error) {
//             console.error("Error fetching assets:", error);
//         }
//     };


//     // Filter assets function
//     const filterAssets = (assetsData) => {
//         // Define filtering logic if needed
//         setFilteredAssets(assetsData);
//     };

//     // Handle vendor selection change
//     const handleVendorChange = (event) => {
//         setSelectedVendor(event.target.value);
//     };

//     // Handle print report
//     const handleCategoryPrint = () => {
//         setSelectedRecord({
//             date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
//             status: filteredAssets.length > 0 ? filteredAssets[0].status : '',
//             assetData: filteredAssets,
//         });

//         setShowAssetPrint(true);
//         setShowSidebar(false);
//         setShowSearchBar(false);
//     };

//     // Handle closing the preview
//     const handleClosePreview = () => {
//         setShowSidebar(true);
//         setShowSearchBar(true);
//         setShowAssetPrint(false);
//     };

//     // Function to format date
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
//     };

//     return (
//         <div className='d-flex w-100 h-100'>
//             {showSidebar && <Sidebar />}
//             <div className='w-100'>
//                 {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
//                 <div className="container-fluid">
//                     <ToastContainer />
//                     {showAssetPrint ? (
//                         <VendorAssetReportPreview
//                             record={selectedRecord}
//                             onClose={handleClosePreview}
//                         />
//                     ) : (
//                         <div className="row">
//                             <div className="col-xl-12">
//                                 <div className="card shadow mb-4">
//                                     <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                         <h6 className="m-0 font-weight-bold text-primary">Vendors List</h6>
//                                         <div className='d-flex align-items-center gap-2'>
//                                             <label className='pt-2 text-black fw-bolder'>Vendor:</label>
//                                             <select
//                                                 id="vendorsSelect"
//                                                 value={selectedVendor}
//                                                 onChange={handleVendorChange}
//                                                 className="form-select"
//                                             >
//                                                 <option value="">Select Vendor</option>
//                                                 {vendors.map(vendor => (
//                                                     <option key={vendor.id} value={vendor.id}>
//                                                         {vendor.vendorCompanyName}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <button className='btn btn-success' onClick={handleCategoryPrint}>PDF</button>
//                                         </div>
//                                     </div>
//                                     <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
//                                         <table className="table table-striped table-bordered" style={{ width: "100%" }}>
//                                             <thead>
//                                                 <tr>
//                                                     <th>Asset Picture</th>
//                                                     <th>Asset Name</th>
//                                                     <th>Asset Tag</th>
//                                                     <th>Purchase Date</th>
//                                                     <th>Category</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {filteredAssets.length > 0 ? (
//                                                     filteredAssets.map((asset) => (
//                                                         <tr key={asset.id}>
//                                                             <td>
//                                                                 <img
//                                                                     src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
//                                                                     style={{ width: "90px" }}
//                                                                     alt="Asset"
//                                                                 />
//                                                             </td>
//                                                             <td>{asset.name}</td>
//                                                             <td>{asset.assettag}</td>
//                                                             <td>{formatDate(asset.purchaseDate)}</td>
//                                                             <td>{asset.category_name}</td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="5" className="text-center">No assets found</td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default VendorAssetReport;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import VendorAssetReportPreview from './VendorAssetReportPreview';

function VendorAssetReport({ handleLogout, username }) {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('');
    const [assets, setAssets] = useState([]);
    const [showAssetPrint, setShowAssetPrint] = useState(false);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});

    // Fetch vendors and assets on component mount
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
                setVendors(response.data);
            } catch (error) {
                console.error("Error fetching vendors:", error);
                toast.error('Failed to fetch vendors.');
            }
        };

        const fetchAssets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assetuniquedata`);
                setAssets(response.data);
                setFilteredAssets(response.data); // Initially show all assets
            } catch (error) {
                console.error("Error fetching assets:", error);
                toast.error('Failed to fetch assets.');
            }
        };

        fetchVendors();
        fetchAssets();
    }, []);

    // Filter assets based on selected vendor
    useEffect(() => {
        if (selectedVendor) {
            const filtered = assets.filter(asset => asset.vendor_id === parseInt(selectedVendor, 10));
            setFilteredAssets(filtered);
        } else {
            setFilteredAssets(assets); // Show all assets when no vendor is selected
        }
    }, [selectedVendor, assets]);

    // Handle vendor selection change
    const handleVendorChange = (event) => {
        setSelectedVendor(event.target.value);
    };

    // Handle print report
    const handleCategoryPrint = () => {
        setSelectedRecord({
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            status: filteredAssets.length > 0 ? filteredAssets[0].status : '',
            assetData: filteredAssets,
        });

        setShowAssetPrint(true);
        setShowSidebar(false);
        setShowSearchBar(false);
    };

    // Handle closing the preview
    const handleClosePreview = () => {
        setShowSidebar(true);
        setShowSearchBar(true);
        setShowAssetPrint(false);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className='d-flex w-100 h-100'>
            {showSidebar && <Sidebar />}
            <div className='w-100'>
                {showSearchBar && <SearchBar className="searchbarr" username={username} handleLogout={handleLogout} />}
                <div className="container-fluid">
                    <ToastContainer />
                    {showAssetPrint ? (
                        <VendorAssetReportPreview
                            record={selectedRecord}
                            onClose={handleClosePreview}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Vendors List</h6>
                                        <div className='d-flex align-items-center gap-2'>
                                            <label className='pt-2 text-black fw-bolder'>Vendor:</label>
                                            <select
                                                id="vendorsSelect"
                                                value={selectedVendor}
                                                onChange={handleVendorChange}
                                                className="form-select"
                                            >
                                                <option value="">Select Vendor</option>
                                                {vendors.map(vendor => (
                                                    <option key={vendor.id} value={vendor.id}>
                                                        {vendor.vendorCompanyName}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className='btn btn-success' onClick={handleCategoryPrint}>PDF</button>
                                        </div>
                                    </div>
                                    <div className="card-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Asset Picture</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Tag</th>
                                                    <th>Purchase Date</th>
                                                    <th>Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAssets.length > 0 ? (
                                                    filteredAssets.map((asset) => (
                                                        <tr key={asset.id}>
                                                            <td>
                                                                <img
                                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                                                    style={{ width: "90px" }}
                                                                    alt="Asset"
                                                                />
                                                            </td>
                                                            <td>{asset.name}</td>
                                                            <td>{asset.assettag}</td>
                                                            <td>{formatDate(asset.purchaseDate)}</td>
                                                            <td>{asset.category_name}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No assets found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VendorAssetReport;
