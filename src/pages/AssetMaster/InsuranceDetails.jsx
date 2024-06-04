import React from "react";

const InsuranceDetails = ({ insuranceDetails, onClose }) => {
    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9">
                        <h1 className="title-detail font-bold">
                            Insurance Details
                        </h1>
                        <p className="assetdetail">
                            <span className="assettype">Asset Name: {insuranceDetails.assetName}</span> -{" "}
                            <span className="assetstatus">Asset Tag: {insuranceDetails.assetTag}</span>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <div className=" p-2 barcode-inner">
                            <div className="assetbarcode">
                                <button onClick={onClose} className="btn btn-primary">
                                    Back to Insurance List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    Insurance Details
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
                                    <div class="col-md-9 pt-3">
                                        {/* Table for Asset Details */}
                                        <table
                                            class="table table-hover"
                                            cellpadding="0"
                                            cellspacing="0"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assettype2">{insuranceDetails.assetName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Asset Tag:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetstatus">
                                                            {insuranceDetails.assetTag}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Company Name:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetserial">{insuranceDetails.insuranceCompanyName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Policy Number:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetbrand">{insuranceDetails.policyNumber}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Contact Information:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetpurchasedate">
                                                            {insuranceDetails.contactInformation}
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Coverage:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetcost">{insuranceDetails.coverageType}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Start Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetlocation">{new Date(insuranceDetails.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">End Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">{new Date(insuranceDetails.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Reneal Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetupdated">{new Date(insuranceDetails.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Description:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetdescription">
                                                            {insuranceDetails.description}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Image Section */}
                                    <div class="col-md-3 pt-2 text-center">
                                        <img
                                            src={insuranceDetails.assetPhoto}
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

export default InsuranceDetails;
