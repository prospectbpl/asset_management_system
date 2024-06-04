import React, { useState, useEffect } from "react";
import axios from "axios";
import FullEditComponentModal from "./FullEditComponentModal";

const FullComponentDetails = ({ component, onClose }) => {
    const [category, setCategory] = useState('');
    const [vendorName, setVendorName] = useState('');
    console.log(component)


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9 d-flex flex-column gap-3">
                        <h4 className="title-detail font-bold">
                            Component Name - {component.componentName}
                        </h4>
                        <p className="assetdetail">
                            <span className="assettype">Category - {component.category}</span>       
                        </p>
                    </div>

                    <div className="col-md-3">
                        <div className=" p-2 barcode-inner">
                            <div className="assetbarcode d-flex gap-2">
                                <button onClick={onClose} className="btn btn-primary">
                                    Back to Component List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    Details
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade active show"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <div className="row">
                                    <div className="col-md-9 ">
                                        <table className="table table-hover" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Component Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{component.componentName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Category :</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{component.category}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Vendor :</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{component.vendor_name}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Unit :</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{component.unit}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Size :</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{component.size}</p>
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Purchase Date:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 assettype2">{formatDate(component.purchaseDate)}</p>
                                                    </td>
                                                </tr>
                                                {/* Add more table rows for other component details */}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-3 pt-2 text-center">
                                        <img
                                            src={`${process.env.REACT_APP_LOCAL_URL}/uploads/components/${component.componentImage}`}
                                            style={{ width: "200px" }}
                                            alt="Component"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullComponentDetails;
