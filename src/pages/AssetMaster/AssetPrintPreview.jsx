
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import "./AssetPrintPreview.css"
import assetImage from '../../images/default.jpg';

function AssetPintPreview({ record, onClose }) {
    console.log("record", record);
    const [setting, setSetting] = useState({});

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);

                setSetting(response.data);
            } catch (error) {
                console.error('Error fetching Dashboard Logo', error);
            }
        };
        fetchSetting();
    }, []);

    const handlePrint = () => {
        window.print();
    };
    // Helper function to format the date

    // for Taking the asset description 
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





    useEffect(() => {
        fetchunfinishedMaintenance();
    }, [record]);
    const fetchunfinishedMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/maintenance/${record.asset_master_id}`);
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
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/purchase_history/${record.asset_master_id}`);
            setpurchasehistory(response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    // Fetch history when the component mounts
    useEffect(() => {
        fetchHistory();
    }, [record]);
    const fetchAssetDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/asset_details/${record.asset_master_id}`);
            setAssetDetails(response.data);
            console.log("aser", assetDetails);
        } catch (error) {
            console.error("Error fetching asset details:", error);
        }
    };

    useEffect(() => {
        fetchAssetDetails();
    }, [record]);


    // Function to fetch maintenance details for the asset
    const fetchMaintenance = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/maintenance/history/${record.asset_master_id}`);
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
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurence/history/${record.asset_master_id}`);
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
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/insurenceHistory/history/${record.asset_master_id}`);
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
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/assetlost/${record.asset_master_id}`);
            setAssetLost(response.data);

        } catch (error) {
            console.error("Error fetching Assets Lost:", error);
        }
    };

    useEffect(() => {
        console.log("akjsdn", assetLost)
        fetchAssetsLost();
    }, [record.asset_master_id]);

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
    }, [record]);

    // Function to fetch transporter history for the asset
    const fetchTransferHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/transporter_history/${record.asset_master_id}`);
            setTransferHistory(response.data);
        } catch (error) {
            console.error("Error fetching transporter history:", error);
        }
    };


    // for Taking the asset description 




    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className="container-fluid p-1" >
            <div className="row py-3 px-0 bg-white rounded shadow-sm ">
                <div className="d-flex gap-1 m-1 ">
                    <div style={{ width: "80%", border: "1px dotted #D3D4D6", borderRadius: "20px", boxShadow: "1px 1px 4px black" }} className=' d-flex align-items-center  justify-content-start gap-2 p-2'>
                        <div className=' d-flex align-items-center justify-content-center ' style={{ width: "20%" }}>
                            <div style={{ height: "70%", width: "70%", maxWidth: "250px", backgroundColor: "white" }} className='d-flex align-items-center justify-content-center'>
                                <img
                                    src={record.picture
                                        ? `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${record.picture}`
                                        : assetImage}
                                    className='w-100 h-100'
                                    alt="Employee"
                                />

                            </div>
                        </div>
                        <div style={{ width: "80%" }} >
                            <div className="col-md-9 d-flex  justify-content-between px-3">
                                <div>
                                    <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">
                                        {record.name}
                                    </h4>
                                    <hr className="m-1" />
                                    <h6 className="title-detail m-0">
                                        Asset Tag: {record.assettag}
                                    </h6>
                                </div>
                                <div>
                                    <p className="m-0">
                                        <span> Type: {record.assetType || "N/A"}</span>
                                    </p>
                                    <p className="m-0">
                                        <span> Serial: {record.serial || "N/A"}</span>
                                    </p>
                                    <p className="m-0">
                                        <span>Category: {record.category_name || "N/A"}</span>
                                    </p>
                                    <p className="m-0">
                                        <span>Purchase Date: {formatDate(record.purchaseDate) || "N/A"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ width: "20%" }} className=' d-flex align-item-center justify-content-center  p-2'>
                        <div className=' d-flex flex-column align-items-center justify-content-center '>
                            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }} className='logo p-1 '>
                                <img
                                    src={setting.landingPageLogo
                                        ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${setting.landingPageLogo}`
                                        : <h4>Asset Managment</h4>}
                                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                    alt="LOGO"
                                />
                                {/* <img className='w-100 h-auto' src={`${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${setting.landingPageLogo}`} alt="LOGO" /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* for Showing the Details On the ui */}

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Basic Details</h4>
                        <hr />
                        <div>
                            {/* Table for Asset Details */}
                            <div className='d-flex align-items-center justify-content-between' style={{width:"100%"}}>
                                <div style={{width:"50%"}}>
                                    <table
                                        class=""
                                        cellpadding="3"
                                        cellspacing="3"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Asset Name</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Asset Tag</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.assettag}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Type</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.assetType}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Serial</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.serial}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">RTO Name</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.rtoName}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Registration Number</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.registrationNumber}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{width:"50%"}}>
                                    <table
                                        class=""
                                        cellpadding="3"
                                        cellspacing="3"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Vendor Company</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.vendorcompanyname}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Category Name</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.category_name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Category Name</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.category_name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Cost</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.cost}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Purchase Date</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {formatDate(record.purchaseDate)}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="200">
                                                    <p class="mb-0 fw-bolder text-black">Description</p>
                                                </td>
                                                <td>
                                                    <p class="mb-0">: {record.description}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <h4 style={{ color: "#7C0000" }} className="title-detail fw-bolder py-2 fw-bolder m-0">Asset Location wise ----</h4>
                                <hr />
                                {assetDetails.map((assetDetail, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td width="200">
                                                <p className="mb-0 fw-bolder text-black">Location</p>
                                            </td>
                                            <td  >
                                                <p className="mb-0">: {assetDetail.location}</p>
                                                <p>&nbsp; Quantity :{assetDetail.quantity}</p>

                                            </td>
                                        </tr>

                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Purchase History</h4>
                        <hr />
                        <table className="table table-striped table-bordered">
                            <thead>
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
                                        <td colSpan="7" className="text-center">Their is No Purchase History.</td>
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

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Maintenance</h4>
                        <hr />
                        <table className="table table-striped table-bordered">
                            <thead>
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
                                {maintenance.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">Their is No Maintenance.</td>
                                    </tr>
                                ) : (
                                    maintenance.map((event) => (
                                        <tr key={event.event_id}>
                                            <td>
                                                <img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
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

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Insurence </h4>
                        <hr />
                        <table className="table table-striped table-bordered">
                            <thead>
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
                                        <td colSpan="7" className="text-center">Their is No Insurence Present.</td>
                                    </tr>
                                ) : (
                                    insurence.map((event) => (
                                        <tr key={event.event_id}>
                                            <td>
                                                <img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
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

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Insurenance History</h4>
                        <hr />
                        <table className="table table-striped table-bordered">
                            <thead>
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
                                {insurenceHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">Their is No Insurenance History.</td>
                                    </tr>
                                ) : (
                                    insurenceHistory.map((event) => (
                                        <tr key={event.event_id}>
                                            <td>
                                                <img
                                                    src={event.assetPhoto}
                                                    style={{ width: "90px" }}
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

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Transfer History</h4>
                        <hr />
                        <table className="table table-bordered">
                            <thead>
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
                                {transferHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">Their is No Transfer History.</td>
                                    </tr>
                                ) : (
                                    transferHistory.map((transfer) => (
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

                    <hr style={{ boxSizing: "border-box" }} />
                    <div style={{ boxShadow: "3px 3px 4px black" }} class="rounded border p-2">
                        <h4 style={{ color: "#7C0000" }} className="title-detail p-2 fw-bolder fw-bolder m-0">Lost Asset</h4>
                        <hr />
                        <table className="table table-bordered">
                            <thead>
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
                                {assetLost.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">Their is No Lost Asset.</td>
                                    </tr>
                                ) : (
                                    assetLost.map((lost) => (
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

                </div>

                <div className="modal-footer">
                    <button onClick={handlePrint} className="btn btn-success print-button"><i className="fa fa-download"></i> Print</button>
                    <button onClick={onClose} className="btn btn-danger print-button">Close</button>
                </div>
            </div>

        </div>

    );
}

export default AssetPintPreview;

