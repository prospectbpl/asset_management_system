// import React from "react";

// const MaintenanceDetailsModal = ({ MaintenanceDetailsModal, onClose }) => {
//   // Check if MaintenanceDetailsModal is null or undefined
//   if (!MaintenanceDetailsModal) {
//     return null; // Return null if MaintenanceDetailsModal is not defined
//   }

//   return (
//     <div>
//       <div className="card-body p-4">
//         <div className="row">
//           <div className="col-md-9">
//             <p className="title-detail font-bold">Maintenance Details</p>
//             <p className="assetdetail">
//               <span className="assettype">Asset Name: {MaintenanceDetailsModal.assetName}</span> -{" "}
//               <span className="assetstatus">Asset Tag: {MaintenanceDetailsModal.assetTag}</span>
//             </p>
//           </div>
//           <div className="col-md-3">
//             <div className=" p-2 barcode-inner">
//               <div className="assetbarcode">
//                 <button onClick={onClose} className="btn btn-primary">
//                   Back to Maintenance List
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12 pt-3">
//             <p>Start Date: {MaintenanceDetailsModal.startDate}</p>
//             <p>End Date: {MaintenanceDetailsModal.endDate}</p>
//             <p>Remarks: {MaintenanceDetailsModal.remarks}</p>
//             {/* Add more MaintenanceDetailsModal details as needed */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaintenanceDetailsModal;




import React, { useState, useEffect } from "react";
import axios from "axios";

const MaintenanceDetails = ({ MaintenanceDetailsModal, onClose }) => {
    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {MaintenanceDetailsModal.assetName}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Asset Tag : {MaintenanceDetailsModal.assetTag}
                            </h6>
                        </div>
                        <div>
                            <p className="m-0">
                                <span> Service Type: {MaintenanceDetailsModal.serviceType}</span>
                            </p>
                            <p className="m-0">
                                <span> Service: {MaintenanceDetailsModal.repairMaintenanceService}</span>
                            </p>
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
                        <ul className="nav nav-tabs" id="siteTab" role="tablist">
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
                                    Maintenance Details
                                </a>
                            </li>
                            {/* Add more tabs as needed */}
                        </ul>
                        <div className="tab-content" id="siteTabContent">
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div class="row">
                                    <div class="col-md-9">
                                        {/* Table for Asset Details */}
                                        <table className="table table-bordered m-0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{MaintenanceDetailsModal.assetName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Tag:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetstatus">
                                                            {MaintenanceDetailsModal.assetTag}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Service Provider Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">
                                                            {MaintenanceDetailsModal.serviceType === "In-house"
                                                                ? MaintenanceDetailsModal.employeeName : MaintenanceDetailsModal.serviceName}
                                                        </p>

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Service Type:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetbrand">{MaintenanceDetailsModal.serviceType}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Service:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetpurchasedate">
                                                            {MaintenanceDetailsModal.repairMaintenanceService}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Service Address:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assetserial">
                                                            {MaintenanceDetailsModal.serviceType === "In-house"
                                                                ? "-" : MaintenanceDetailsModal.serviceAddress}
                                                        </p>

                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Start Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetlocation">{new Date(MaintenanceDetailsModal.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">End Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">{new Date(MaintenanceDetailsModal.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Issue in Asset:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetupdated">{new Date(MaintenanceDetailsModal.issueInAsset).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Remark:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetdescription">
                                                            {MaintenanceDetailsModal.remarks}
                                                        </p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Status:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetdescription">
                                                            {MaintenanceDetailsModal.task}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Image Section */}
                                    <div class="col-md-3 pt-2 text-center">
                                        <img
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${MaintenanceDetailsModal.assetPhoto}`}
                                            style={{ width: "200px" }}
                                            alt="Asset"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Add more tab panes for additional sections */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceDetails;
