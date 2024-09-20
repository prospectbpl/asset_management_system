import React, { useState, useEffect } from "react";
import axios from "axios";
import EditAssetModal from "./EditAssetModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from "qrcode.react";

// Define the AssetDesc component
const AssetDesc = ({ asset, onClose }) => {
    // State to store the check-in/check-out history of the asset
    const [history, setHistory] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [insurence, setInsurence] = useState([]);
    const [assetDetails, setAssetDetails] = useState([]);
    const [insurenceHistory, setInsurenceHistory] = useState([]);
    const [assetLost, setAssetLost] = useState([]);
    // State variables for selected site id, employee id, client id, and description
    // Edit Asset Modal 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage opening/closing edit modal
    const [showQRCode, setShowQRCode] = useState(false); // State to manage showing/hiding QR code
    // Asset Transfer 
    const [transferAsset, setTransferAsset] = useState([]);
    const [transferHistory, setTransferHistory] = useState([]);
    // Asset Maintenance 
    const [unfinished, setunfinished] = useState([])
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    // purchase_history
    const [purchasehistory, setpurchasehistory] = useState([])
    console.log(asset)
    useEffect(() => {
        fetchunfinishedMaintenance();
    }, [asset]);
    const fetchunfinishedMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance/${asset.asset_master_id}`);
            // Filter maintenance items where task is finished
            const finishedMaintenance = response.data.filter(item => item.task === "unfinished");
            setunfinished(finishedMaintenance);
        } catch (error) {
            console.error("Error fetching maintenance:", error);
        }
    };

    // Function to fetch the check-in/check-out history for the asset
    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/purchase_history/${asset.asset_master_id}`);
            setpurchasehistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    // Fetch history when the component mounts
    useEffect(() => {
        fetchHistory();
    }, [asset]);
    const fetchAssetDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/asset_details/${asset.asset_master_id}`);
            setAssetDetails(response.data);
            console.log("aser", assetDetails);
        } catch (error) {
            console.error("Error fetching asset details:", error);
        }
    };

    useEffect(() => {
        fetchAssetDetails();
    }, [asset]);


    // Function to fetch maintenance details for the asset
    const fetchMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/maintenance/history/${asset.asset_master_id}`);
            setMaintenance(response.data);
        } catch (error) {
            console.error("Error fetching maintenance details:", error);
        }
    };

    // Fetch maintenance details when the component mounts
    useEffect(() => {
        fetchMaintenance();
    }, []);

    // Function to fetch insurence details for the asset
    const fetchInsurence = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurence/history/${asset.asset_master_id}`);
            setInsurence(response.data);
        } catch (error) {
            console.error("Error fetching Insurence details:", error);
        }
    };
    // Fetch insurence history details when the component mounts
    useEffect(() => {
        fetchInsurence();
    }, []);

    // Function to fetch insurence history details for the asset
    const fetchInsurenceHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurenceHistory/history/${asset.asset_master_id}`);
            setInsurenceHistory(response.data);
        } catch (error) {
            console.error("Error fetching Insurence details:", error);
        }
    };
    // Fetch insurence history details when the component mounts
    useEffect(() => {
        fetchInsurenceHistory();
    }, []);

    // Function to fetch insurence history details for the asset
    const fetchAssetsLost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/assetlost/${asset.asset_master_id}`);
            setAssetLost(response.data);

        } catch (error) {
            console.error("Error fetching Assets Lost:", error);
        }
    };

    useEffect(() => {
        console.log("akjsdn", assetLost)
        fetchAssetsLost();
    }, [asset.asset_master_id]);

    const processFetchedData = (data) => {
        const groupedData = {};
        data.forEach((item) => {
            const assetID = item.asset_id;
            if (!groupedData[assetID]) {
                groupedData[assetID] = { assetName: item.assetName, previousData: [], newData: [] };
            }
            if (item.previousData) {
                groupedData[assetID].previousData.push(JSON.parse(item.previousData));
            }
            if (item.newData) {
                groupedData[assetID].newData.push(JSON.parse(item.newData));
            }
        });
        return Object.values(groupedData);
    };
    console.log(processFetchedData);

    // Function to handle opening the edit modal
    const handleEditAsset = () => {
        setIsEditModalOpen(true);
    };

    // Function to handle closing the edit modal
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
    };

    // Fetch transporter history when the component mounts or when the asset changes
    useEffect(() => {
        fetchTransferHistory();
    }, [asset]);

    // Function to fetch transporter history for the asset
    const fetchTransferHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/transporter_history/${asset.asset_master_id}`);
            setTransferHistory(response.data);
        } catch (error) {
            console.error("Error fetching transporter history:", error);
        }
    };


    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const assettransferhistory = transferHistory.slice(indexOfFirstItem, indexOfLastItem);
    const assetInsurenceHistory = insurenceHistory.slice(indexOfFirstItem, indexOfLastItem);
    const maintenanceHistory = maintenance.slice(indexOfFirstItem, indexOfLastItem);
    const assetlosthistory = assetLost.slice(indexOfFirstItem, indexOfLastItem);
    const purchase_history = history.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} `;
    };

    const handleAssetUpdate = () => {
        toast.success('Data uploaded successfully')
    }

    return (
        <div className="shadow-sm bg-white rounded mb-4">
            <ToastContainer />
            <div className="card-body p-4">
                {/* Asset Details Section */}
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex gap-2 justify-content-between  py-3" style={{ width: "100%" }}>
                        <div style={{ width: "80%" }}>
                            <h2 className="title-detail fw-bolder fw-bolder m-0 asset-title">
                                {asset.name}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Asset Tag: {asset.assettag}
                            </h6>
                        </div>
                        <div style={{ width: "30%" }}>
                            <p className="m-0">
                                <span> Type: {asset.assetType || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span> Serial: {asset.serial || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span>Category: {asset.category_name || "N/A"}</span>
                            </p>
                            <p className="m-0">
                                <span>Purchase Date: {formatDate(asset.purchaseDate) || "N/A"}</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                            <div className="qr-code">
                                {showQRCode && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 1 }} onClick={toggleQRCode}></div>
                                )}
                                <QRCode value={asset.qrCodeData} size={showQRCode ? 250 : 60} onClick={toggleQRCode} />
                            </div>
                            <div className=" p-2 barcode-inner d-flex gap-2 align-items-center justify-content-center">
                                <button onClick={onClose} className="btn btn-outline-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </button>
                                <button onClick={handleEditAsset} className="btn btn-outline-primary">
                                    <i className="fa fa-edit"></i>    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                {/* Tabs Section */}
                <div className="row ">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {/* Details Tab */}
                            <li className="nav-item">
                                <a
                                    className="nav-link active show"
                                    id="details-tab"
                                    data-toggle="tab"
                                    href="#details"
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected="true"
                                >
                                    Details
                                </a>
                            </li>
                            {/* History Tab */}
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="history-tab"
                                    data-toggle="tab"
                                    href="#history"
                                    role="tab"
                                    aria-controls="history"
                                    aria-selected="false"
                                >
                                    Purchase History
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="maintenance-tab"
                                    data-toggle="tab"
                                    href="#maintenance"
                                    role="tab"
                                    aria-controls="maintenance"
                                    aria-selected="false"
                                >
                                    Maintenance
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="insurence-tab"
                                    data-toggle="tab"
                                    href="#insurence"
                                    role="tab"
                                    aria-controls="insurence"
                                    aria-selected="false"
                                >
                                    Insurence
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="insurenceHistory-tab"
                                    data-toggle="tab"
                                    href="#insurenceHistory"
                                    role="tab"
                                    aria-controls="insurenceHistory"
                                    aria-selected="false"
                                >
                                    Insurence history
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="transferAsset-tab"
                                    data-toggle="tab"
                                    href="#transferAsset"
                                    role="tab"
                                    aria-controls="transferAsset"
                                    aria-selected="false"
                                >
                                    Transfer Asset
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="lostAsset-tab"
                                    data-toggle="tab"
                                    href="#lostAsset"
                                    role="tab"
                                    aria-controls="lostAsset"
                                    aria-selected="false"
                                >
                                    Lost Assets
                                </a>
                            </li>
                        </ul>
                        {/* Tab Content Section */}
                        <div className="tab-content" id="myTabContent">
                            {/* Details Tab Content */}
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                {/* Asset Details */}
                                <div class="row ">
                                    <div class="col-md-9">
                                        {/* Table for Asset Details */}
                                        <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Asset Name</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.name}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Asset Tag</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.assettag}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Type</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.assetType}</p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Serial</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.serial}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">RTO Name</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.rtoName}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Registration Number</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.registrationNumber}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder">Vendor Company</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.vendorcompanyname}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder text-black">Category Name</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.category_name}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder text-black">Category Name</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.category_name}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder text-black">Cost</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.cost}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder text-black">Purchase Date</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {formatDate(asset.purchaseDate)}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="200">
                                                            <p class="mb-0 fw-bolder text-black">Description</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.description}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td bgcolor="#f2f3f4" width="200">
                                                            <p class="mb-0 fw-bolder">Insurance</p>
                                                        </td>
                                                        <td>
                                                            <p class="mb-0">: {asset.takeInsurance}</p>
                                                        </td>
                                                    </tr>
                                                    <h6 className=' m-0 text-primary fw-bolder p-2'>Asset Location wise ----</h6>
                                                    {assetDetails.map((assetDetail, index) => (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td bgcolor="#f2f3f4" width="200">
                                                                    <p className="mb-0 fw-bolder">Location</p>
                                                                </td>
                                                                <td bgcolor="#f2f3f4" >
                                                                    <p className="mb-0">: {assetDetail.location}</p>
                                                                    <p>&nbsp; Quantity :{assetDetail.quantity}</p>

                                                                </td>
                                                            </tr>

                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Image Section */}
                                    <div class="col-md-3 pt-2 text-center">
                                        <img
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.picture}`}
                                            style={{ width: "200px" }}
                                            alt="Asset"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* History Tab Content */}
                            {/* History Tab Content */}
                            <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Asset Name</th>
                                                <th>AssetTag</th>
                                                <th>Quantity</th>
                                                <th>Purchase Date</th>
                                                <th>Cost</th>
                                                <th>Vendor</th>
                                                {/* <th>Category</th> */}
                                                <th>Brand</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchasehistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Purchase History.</td>
                                                </tr>
                                            ) : (
                                                purchasehistory.map((event) => (
                                                    <tr key={event.id}>
                                                        <td>{event.name}</td>
                                                        <td>{event.assettag}</td>
                                                        <td>{event.quantity}</td>
                                                        <td>{formatDate(event.purchaseDate)}</td>
                                                        <td>{event.cost}</td>
                                                        <td>{event.vendorcompanyname}</td>
                                                        {/* <td>{event.category_name}</td> */}
                                                        <td>{event.brand}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(purchasehistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(purchasehistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>


                            {/* Maintenance Tab Content */}
                            <div className="tab-pane fade" id="maintenance" role="tabpanel" aria-labelledby="maintenance-tab">
                                <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Asset photo</th>
                                                <th>Asset Name</th>
                                                <th>Asset Tag</th>
                                                <th>Service Type</th>
                                                <th>Provider Name</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {maintenanceHistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">No Maintenencance Details.</td>
                                                </tr>
                                            ) : (
                                                maintenanceHistory.map((event) => (
                                                    <tr key={event.event_id}>
                                                        <td>
                                                            <img
                                                                src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${event.assetPhoto}`}
                                                                style={{ width: "90px" }} className="asset-image"
                                                                alt="Asset"
                                                            />
                                                        </td>
                                                        <td>{event.assetName}</td>
                                                        <td>{event.assetTag}</td>
                                                        <td>{event.serviceType}</td>
                                                        <td>
                                                            {event.serviceType === "In-house"
                                                                ? event.employeeName
                                                                : event.serviceName || event.serviceAddress}
                                                        </td>
                                                        <td>{formatDate(event.startDate)}</td>
                                                        <td>{formatDate(event.endDate)}</td>
                                                        <td>{event.remarks}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>

                                    </table>
                                </div>

                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(maintenance.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(maintenance.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Insurence Tab Content */}
                            <div className="tab-pane fade" id="insurence" role="tabpanel" aria-labelledby="insurence-tab">
                                <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Asset Picture</th>
                                                <th>Asset Name</th>
                                                <th>Asset Tag</th>
                                                <th>Insurence Company</th>
                                                <th>Policy Number</th>
                                                <th>End Date</th>
                                                <th>Renewal Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {insurence.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Insurance Details.</td>
                                                </tr>
                                            ) : (
                                                insurence.map((event) => (
                                                    <tr key={event.event_id}>
                                                        <td>
                                                            <img
                                                                src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${event.assetPhoto}`}
                                                                style={{ width: "90px" }} className="asset-image"
                                                                alt="Asset"
                                                            />
                                                        </td>
                                                        <td>{event.assetName}</td>
                                                        <td>{event.assetTag}</td>
                                                        <td>{event.insuranceCompanyName}</td>
                                                        <td>{event.policyNumber}</td>
                                                        <td>{formatDate(event.endDate)}</td>
                                                        <td>{formatDate(event.renewalDate)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>

                                    </table>
                                </div>

                            </div>


                            {/* Insurence History Tab Content */}
                            <div className="tab-pane fade" id="insurenceHistory" role="tabpanel" aria-labelledby="insurenceHistory-tab">
                                <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Asset Picture</th>
                                                <th>Asset Name</th>
                                                <th>Asset Tag</th>
                                                <th>Insurence Company</th>
                                                <th>Policy Number</th>
                                                <th>End Date</th>
                                                <th>Renewal Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assetInsurenceHistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No Asset Insurance .</td>
                                                </tr>
                                            ) : (
                                                assetInsurenceHistory.map((event) => (
                                                    <tr key={event.event_id}>
                                                        <td>
                                                            <img
                                                                src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${event.assetPhoto}`}
                                                                style={{ width: "90px" }} className="asset-image"
                                                                alt="Asset"
                                                            />
                                                        </td>
                                                        <td>{event.assetName}</td>
                                                        <td>{event.assetTag}</td>
                                                        <td>{event.insuranceCompanyName}</td>
                                                        <td>{event.policyNumber}</td>
                                                        <td>{formatDate(event.endDate)}</td>
                                                        <td>{formatDate(event.renewalDate)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>

                                    </table>
                                </div>

                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(insurenceHistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(insurenceHistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Transfer Asset Tab Content */}
                            <div className="tab-pane fade" id="transferAsset" role="tabpanel" aria-labelledby="transferAsset-tab">
                                <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Asset Name</th>
                                                <th>current Quantity</th>
                                                <th>Transfer From</th>
                                                <th>Transfer To</th>
                                                <th>Transferred Quantity </th>
                                                <th>Transfer Date</th>
                                                <th>Transfer Via</th>
                                                <th>Description</th>
                                                {/* Add more columns as needed */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assettransferhistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">No Transfer History.</td>
                                                </tr>
                                            ) : (
                                                assettransferhistory.map((transfer) => (
                                                    <tr key={transfer.id}>
                                                        <td>{transfer.assetName}</td>
                                                        <td>{transfer.currentQuantity}</td>
                                                        <td>{transfer.transferFrom}</td>
                                                        <td>{transfer.location}</td>
                                                        <td>{transfer.quantity}</td>
                                                        <td>{formatDate(transfer.transferDate)}</td>
                                                        <td>{transfer.selectedTransporterName}</td>
                                                        <td>{transfer.description}</td>
                                                        {/* Render more columns as needed */}
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>

                                    </table>
                                </div>

                                {/* Pagination */}
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                    </li>
                                    {Array.from({ length: Math.ceil(transferHistory.length / itemsPerPage) || 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(transferHistory.length / itemsPerPage) && 'disabled'}`}>
                                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                    </li>
                                </ul>
                            </div>
                            {/* lost Asset Tab Content */}
                            <div className="tab-pane fade" id="lostAsset" role="tabpanel" aria-labelledby="lostAsset-tab">
                                <div>
                                    <div className='col-md-12 p-0' style={{ maxHeight: "450px", overflowY: "auto" }}>
                                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                            <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                <tr>
                                                    <th>Asset Name</th>
                                                    <th>Loss Date</th>
                                                    <th>Loss Location</th>
                                                    <th>Loss Type</th>
                                                    <th>Loss Quantity </th>
                                                    <th>Responsible Person</th>
                                                    <th>Contact No.</th>
                                                    <th>Circumstances</th>
                                                    {/* Add more columns as needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assetlosthistory.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="8" className="text-center">No Los History.</td>
                                                    </tr>
                                                ) : (
                                                    assetlosthistory.map((lost) => (
                                                        <tr key={lost.id}>
                                                            <td>{lost.assetName}</td>
                                                            <td>{formatDate(lost.lossDate)}</td>
                                                            <td>{lost.lossLocation}</td>
                                                            <td>{lost.lossType}</td>
                                                            <td>{lost.newquantity}</td>
                                                            <td>{lost.responsiblePerson}</td>
                                                            <td>{lost.contactNo}</td>
                                                            <td>{lost.lossCircumstances}</td>
                                                            {/* Render more columns as needed */}
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>

                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                        </li>
                                        {Array.from({ length: Math.ceil(assetLost.length / itemsPerPage) || 1 }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil(assetLost.length / itemsPerPage) && 'disabled'}`}>
                                            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Asset Modal */}
            {isEditModalOpen && (
                <EditAssetModal
                    asset={asset}
                    onUpdate={handleAssetUpdate}
                    onClose={setIsEditModalOpen}
                />
            )}
        </div>
    );
};

export default AssetDesc;

