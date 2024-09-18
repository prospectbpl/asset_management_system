import React, { useState, useEffect } from "react";
import axios from "axios";

const AssetLostDesc = ({ assetLost, onClose }) => {
  const handleDownload = async (fileUrl, fileName, fileType) => {
    console.log(fileUrl);
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/download/${fileUrl}`, {
        responseType: 'blob' // Ensure response is treated as binary data
      });

      // Determine the file extension based on the file type
      const extension = fileType === 'image' ? 'jpg' : 'pdf';
      const finalFileName = `${fileName}.${extension}`;

      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', finalFileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <div className="shadow-sm bg-white rounded">
      <div className="card-body p-4">
        <div className="row px-2">
          <div className="col-md-9 bg-light border rounded shadow-sm d-flex justify-content-between  py-3">
            <div>
              <h2 style={{ color: "#00509d" }} className="title-detail fw-bolder fw-bolder m-0">
                {assetLost.assetName || ""}
              </h2>
              <hr className="m-1" />
              <h6 className="title-detail m-0">
                Asset Tag : {assetLost.assetTag || "N/A"}
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
                  assetLost Details
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade active show" id="details" role="tabpanel"
                aria-labelledby="details-tab"
              >
                <div className="row">
                  <div className="col-md-9">
                    <table className="table table-bordered m-0">
                      <tbody>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Asset Name</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.assetName || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Asset Photo</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.assetPhoto || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Asset Tag</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.assetTag || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Bill</p>
                          </td>
                          <td>
                            {assetLost.bill ? (
                              <div>
                                : <a href="#" onClick={() => handleDownload(assetLost.bill, 'lostbill.pdf')}>
                                  Download Lost Bill
                                </a>
                              </div>
                            ) : (
                              <p className="mb-0">: N/A</p>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Contact No</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.contactNo || "N/A"}</p>
                          </td>
                        </tr>

                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Loss Circumstances</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.lossCircumstances || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Loss Date</p>
                          </td>
                          <td>
                            <p className="mb-0">: {new Date(assetLost.lossDate).toLocaleDateString() || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Loss Location</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.lossLocation || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Loss Type</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.lossType || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Previous Quantity</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.prevquantity || "N/A"}</p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">New Quantity</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.newquantity || "N/A"}</p>
                          </td>
                        </tr>

                        <tr>
                          <td bgcolor="#f2f3f4" width="200">
                            <p className="mb-0 fw-bolder">Responsible Person</p>
                          </td>
                          <td>
                            <p className="mb-0">: {assetLost.responsiblePerson || "N/A"}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-3 pt-2 text-center">
                    <img
                      src={`${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${assetLost.assetPhoto}`}
                      style={{ width: "200px" }}
                      alt="assetLost"
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

export default AssetLostDesc;

