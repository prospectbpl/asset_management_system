import React from "react";

const InsuranceDetails = ({ insuranceDetails, onClose }) => {
    // Function to format the date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };
    return (
        <div className="shadow-sm bg-white rounded">
            <div className="card-body p-4">
                <div className="row px-2">
                    <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
                        <div>
                            <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                                {insuranceDetails.assetName}
                            </h2>
                            <hr className="m-1" />
                            <h6 className="title-detail m-0">
                                Asset Tag : {insuranceDetails.assetTag}
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
                                        <table className="table table-striped table-bordered"
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
                                                        <p class="mb-0 assetlocation">{formatDate(insuranceDetails.startDate)}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">End Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetsupplier">{formatDate(insuranceDetails.endDate)}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p class="mb-0 font-bold">Reneal Date:</p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0 assetupdated">{formatDate(insuranceDetails.renewalDate)}</p>
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
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${insuranceDetails.assetPhoto}`}
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
