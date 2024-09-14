

import React, { useEffect, useState } from 'react';
import myLogo from '../../images/salary.jpg'; // Updated image reference for advances
import axios from 'axios';

const MaintenanceReportPreview = ({ record, onClose }) => {
    // Correctly access filteredAssets from record.assetData
    const filteredAssets = record.assetData || [];
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

    // State to hold the grand totals
    const [grandTotals, setGrandTotals] = useState({
        totalEmployees: 0,
        totalAmount: 0,
    });

    // Effect to calculate totals whenever filteredAssets changes
    useEffect(() => {
        calculateTotals();
    }, [filteredAssets]);

    // Function to calculate the grand totals
    const calculateTotals = () => {
        const totals = filteredAssets.reduce((acc, record) => {
            if (record.employee_id) {
                acc.totalEmployees += 1;
                acc.totalAmount += record.amount ? parseFloat(record.amount) : 0;
            }
            return acc;
        }, {
            totalEmployees: 0,
            totalAmount: 0,
        });

        setGrandTotals(totals);
    };

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
        <div className="container-fluid">
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
                        <h4 style={{ color: "#3F4D67" }} className='title-detail text-uppercase fw-bolder font-bold m-0'>All Site Report</h4>
                        <div>
                            <h5 style={{ color: "#3F4D67" }} className='title-detail text-uppercase fw-bolder font-bold m-0'>{setting.title || 'Title'}</h5>
                        </div>
                    </div>

                    <div className="card-body">
                        <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Asset Picture</th>
                                    <th>Asset Name</th>
                                    <th>Asset Tag</th>
                                    <th>Service Type</th>
                                    <th>Provider Name</th>
                                    <th>Issue in Asset</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredAssets.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">There is no asset in maintenance.</td>
                                    </tr>
                                ) : (
                                    filteredAssets.map((asset) => (
                                        <tr key={asset.id}>
                                            <td>
                                                <img
                                                    src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${asset.assetPhoto}`}
                                                    style={{ width: "90px" }}
                                                    alt="Asset"
                                                />
                                            </td>
                                            <td>{asset.assetName}</td>
                                            <td>{asset.assetTag}</td>
                                            <td>{asset.serviceType}</td>
                                            <td>
                                                {asset.serviceType === "In-house"
                                                    ? asset.employeeName
                                                    : asset.serviceName || asset.serviceAddress}
                                            </td>
                                            <td>{asset.issueInAsset}</td>
                                        </tr>
                                    ))
                                )}
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

export default MaintenanceReportPreview;
