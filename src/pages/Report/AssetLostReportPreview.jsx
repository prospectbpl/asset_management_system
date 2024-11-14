

import React, { useEffect, useState } from 'react';
import myLogo from '../../images/Asset.jpg'; // Updated image reference for advances
import axios from 'axios';

const AssetLostReportPreview = ({ record, onClose }) => {
    // Correctly access filteredAssetLost from record.assetLostData
    const filteredAssetLost = record.assetLostData || [];
    const month = record.selectedMonth;
    const year = record.selectedYear;

    const [setting, setSetting] = useState({});

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/settings`);
                setSetting(response.data);
            } catch (error) {
                console.error('Error fetching settings', error);
            }
        };
        fetchSetting();
    }, []);


    // Function to get month name from number
    const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthNumber - 1]; // monthNumber is 1-based, array is 0-based
    };
    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };


    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container-fluid bg-white">
            <div className="row p-1">
                <div className="modal-content">
                    <div className="modal-header m-0 p-2 d-flex align-items-center justify-content-between px-3">
                        <div>
                            <div style={{ height: "50px", width: "100%" }} className='logo p-1'>
                                <img
                                    src={setting.landingPageLogo
                                        ? `${process.env.REACT_APP_LOCAL_URL}/uploads/settings/${setting.landingPageLogo}`
                                        : myLogo}
                                    style={{ height: "100%", objectFit: "cover" }}
                                    alt="LOGO"
                                />
                            </div>
                        </div>
                        <h4 style={{ color: "#3F4D67" }} className='title-detail text-uppercase fw-bolder font-bold m-0'>Asset Lost Report</h4>
                        <div>
                            <h5 style={{ color: "#3F4D67" }} className='title-detail text-uppercase fw-bolder font-bold m-0'>{setting.title || 'Title'}</h5>
                            <small style={{ color: "#3F4D67" }} className='title-detail text-uppercase fw-bolder font-bold m-0'>Date - {getMonthName(month)} {year}</small>
                        </div>
                    </div>

                    <div className="card-body m-0 p-0" >
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Asset Picture</th>
                                    <th>Asset Name</th>
                                    <th>Asset Tag</th>
                                    <th>Loss Date</th>
                                    <th>Quantity</th>
                                    <th>Loss Type</th>
                                    <th>Location</th>
                                    <th>Responsible Person</th>
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight: "calc(100vh - 130px)", overflowY: "auto" }}>
                                {filteredAssetLost.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">Thier is No Asset Lost Data .</td>
                                    </tr>
                                ) : (
                                    filteredAssetLost.map((assetLost) => (
                                        <tr key={assetLost.id}>
                                            <td>
                                                <img
                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${assetLost.assetPhoto}`}
                                                    style={{ width: "90px" }} className="asset-image"
                                                    alt="Asset"
                                                />
                                            </td>
                                            <td>{assetLost.assetName}</td>
                                            <td>{assetLost.assetTag}</td>
                                            <td className="" style={{ whiteSpace: 'nowrap' }}>{formatDate(assetLost.lossDate)}</td>
                                            <td>{assetLost.newquantity}</td>
                                            <td>{assetLost.lossType}</td>
                                            <td>{assetLost.lossLocation}</td>
                                            <td>{assetLost.responsiblePerson}</td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer p-1 d-flex align-items-center justify-content-between">
                        <div>
                            <small className='p-0 m-0'>Powered By - Asset Management</small>
                        </div>
                        <div className='d-flex gap-2'>
                            <button onClick={handlePrint} className="btn btn-success print-button"><i className="fa fa-download"></i> Print</button>
                            <button onClick={onClose} className="btn btn-danger print-button">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetLostReportPreview;

