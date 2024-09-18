import React, { useState, useEffect } from "react";
import axios from "axios";

const TransporterDetails = ({ transporter, onClose }) => {
    console.log("ad", transporter)
    const handleCloseModal = () => {
        onClose();
    }

    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {transporter.transporterCompanyName || ""}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Contact Person : {transporter.transporterPersonName || "N/A"}
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        <div className="assetbarcode d-flex flex-column gap-2 align-items-center">
                            <div className=" p-2 barcode-inner d-flex gap-2 align-items-center justify-content-center">
                                <button onClick={onClose} className="btn btn-outline-primary">
                                    <i className="fa fa-arrow-left"></i> Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                                    Brand Details
                                </a>
                            </li>
                            {/* <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="checkin-tab"
                                    data-toggle="tab"
                                    href="#checkin"
                                    role="tab"
                                    aria-controls="checkin"
                                    aria-selected="false"
                                >
                                    View All Assets
                                </a>
                            </li> */}


                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="details" role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered m-0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Company Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0">: {transporter.transporterCompanyName || ""}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Contact Person Name</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {transporter.transporterPersonName || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Contact Number</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {transporter.transporterPersonPhone || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Email</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {transporter.transporterPersonEmail || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">Company Address</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {transporter.transporterCompanyAddress || ""}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 fw-bolder">City </p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 ">: {transporter.transporterCityName || ""}</p>
                                                    </td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* Check-in/out history */}
                            {/* <div className="tab-pane fade" id="checkin" role="tabpanel" aria-labelledby="checkin-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                                <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                                    <tr>
                                                        <th>Asset Name</th>
                                                        <th>Asset Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {assets.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">Thier is No CheckIn Asset .</td>
                                                        </tr>
                                                    ) : (
                                                        assets.map((asset) => (
                                                            <tr key={asset.id}>
                                                                <td>{asset.name}</td>
                                                                <td>{asset.assetType}</td>
                                                            </tr>
                                                        )))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransporterDetails;

