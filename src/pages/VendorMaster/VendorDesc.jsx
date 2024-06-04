import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorDesc = ({ vendor, onClose }) => {
    const [assetData, setAssetData] = useState([]);
    const [loading, setLoading] = useState(true);
    // pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    useEffect(() => {
        const fetchAssetData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_LOCAL_URL}/assetdata_vendor?vendor_id=${vendor.id}`
                );
                setAssetData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching asset data:", error);
                setLoading(false);
            }
        };

        fetchAssetData();

    }, [vendor.id]);

    // Function to format the date in "YYYY-MM-DD" format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // pagination logic
    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const assetofvendor = assetData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div>
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-9 d-flex flex-column gap-3">
                        <h4 className="title-detail font-bold">
                            Vendor Name - {vendor.vendorCompanyName}
                        </h4>
                        <h5 className="assetdetail">
                            <span className="assettype"> Vendor Address: {vendor.vendorAddress}</span>
                        </h5>
                    </div>

                    <div className="col-md-3">
                        <div className="p-2 barcode-inner">
                            <div className="vendor-actions">
                                <button
                                    onClick={onClose}
                                    className="btn btn-primary mr-2"
                                >
                                    Back to Vendor List
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
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="assetlist-tab"
                                    data-toggle="tab"
                                    href="#assetlist"
                                    role="tab"
                                    aria-controls="assetlist"
                                    aria-selected="false"
                                >
                                    Asset list
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
                                        <table className="table table-hover" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Company Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 vendorcompanyname">{vendor.vendorCompanyName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Address:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 vendoraddress">{vendor.vendorAddress}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Company GST No.:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 companygstno">{vendor.companyGSTNo}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Contact Person's Name:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 contactpersonname">{vendor.contactPersonName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Designation:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 contactpersondesignation">{vendor.contactPersonDesignation}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Mobile No.:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 contactpersonmobile">{vendor.contactPersonMobile}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#f2f3f4" width="200">
                                                        <p className="mb-0 font-bold">Email ID:</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 contactpersonemail">{vendor.contactPersonEmail}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="assetlist" role="tabpanel" aria-labelledby="assetlist-tab">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Asset Picture</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Tag</th>
                                                    <th>Brand</th>
                                                    <th>Purchase Date</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assetofvendor.map((entry) => (
                                                    <tr key={entry.asset_id}>
                                                        <td>
                                                            <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${entry.picture}`} style={{ width: "100px" }} alt="Asset" />
                                                        </td>
                                                        <td>{entry.name}</td>
                                                        <td>{entry.assettag}</td>
                                                        <td>{entry.brand}</td>
                                                        <td>{formatDate(entry.purchaseDate)}</td>
                                                        <td>{entry.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                                            </li>
                                            {Array.from({ length: Math.ceil(assetData.length / itemsPerPage) || 1 }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                                                    <a className="page-link" href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === Math.ceil(assetData.length / itemsPerPage) && 'disabled'}`}>
                                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
                                            </li>
                                        </ul>
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


export default VendorDesc;
