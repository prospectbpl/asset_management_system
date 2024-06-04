// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CheckOut = ({ asset, onClose, updateAssetStatus }) => {
//   const [checkOutTo, setCheckOutTo] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState(new Date());
//   const [history, setHistory] = useState([]);

//   // Fetching the history of the asset
//   const fetchHistory = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/checkincheckout/history/${asset.id}`);
//       setHistory(response.data);
//     } catch (error) {
//       console.error("Error fetching history:", error);
//     }
//   };

//   // Fetch history when the component mounts
//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   useEffect(() => {
//     console.log("History:", history);
//     if (history.length > 0) {
//       const lastCheckIn = history
//         .filter(event => event.event_type === 'check_in')
//         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]; // Get the latest check-in event
//       console.log("Last Check-In Event:", lastCheckIn);
//       if (lastCheckIn) {
//         setCheckOutTo(lastCheckIn.checkin_by);
//       }
//     }
//   }, [history]);
  
// const handleCheckOut = async (e) => {
//   e.preventDefault();
//   try {
//     // Find the latest check-in event
//     const lastCheckIn = history.find(event => event.event_type === 'check_in');
    
//     // Extract the employee ID, site ID, and vendor ID from the latest check-in event
//     const employeeID = lastCheckIn ? lastCheckIn.employee_id : asset.employee_id;
//     const siteId = lastCheckIn ? lastCheckIn.site_id : asset.site_id;

//     // Send the checkout request to the backend with checkout date, checkout to, and checkout to ID
//     const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/checkout/${asset.id}`, {
//       checkout_date: checkOutDate,
//       checkout_to: checkOutTo,
//       employee_id: employeeID, // Include the ID of the person checking out
//       site_id: siteId, // Include the site ID
//       vendor_id: vendorId // Include the vendor ID
//     });
//     console.log(response);

//     // Close the modal and update the asset status in the parent component
//     onClose();
//     updateAssetStatus({ ...asset, currentStatus: 'CheckedOut' });
//   } catch (error) {
//     console.error("Error checking out asset:", error);
//   }
// };



//   const handleDateChange = (e) => {
//     setCheckOutDate(e.target.value);
//   };

//   return (
//     <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Check Out</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleCheckOut} id="formcheckout" autoComplete="off" noValidate="novalidate">
//               <div className="form-row">
//                 <div className="form-group col-md-12">
//                   <label htmlFor="checkoutassettag">Asset Tag<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     readOnly
//                     id="checkoutassettag"
//                     className="form-control"
//                     required
//                     placeholder="Asset Tag"
//                     value={asset?.assettag || ''}
//                   />
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label htmlFor="checkoutname">Asset Name<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="asset"
//                     type="text"
//                     readOnly
//                     id="checkoutname"
//                     className="form-control"
//                     required
//                     placeholder="Asset Name"
//                     value={asset?.name || ''}
//                   />
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label htmlFor="checkoutfrom">Check Out From<span style={{ color: "red" }}>*</span></label>
//                   <input
//                     name="checkoutfrom"
//                     type="text"
//                     readOnly
//                     id="checkoutfrom"
//                     className="form-control"
//                     required
//                     placeholder="Check Out From"
//                     value={checkOutTo} // Display the name of the last person who checked in
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-12 mb-0">
//                   <label htmlFor="checkoutdate" className="control-label">Check Out Date<span style={{ color: "red" }}>*</span></label>
//                   <div className="input-group mb-0">
//                     <input
//                       className="form-control setdate hasDatepicker"
//                       required
//                       placeholder="Check Out Date"
//                       id="checkoutdate"
//                       name="checkoutdate"
//                       type="date"
//                       value={checkOutDate}
//                       onChange={handleDateChange}
//                     />
//                     <span className="input-group-addon border-1" id="date"><i className=""></i></span>
//                   </div>
//                   <label className="error" htmlFor="checkoutdate"><span style={{ color: "red" }}>*</span></label>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="submit" className="btn btn-primary" id="savecheckout">Check Out</button>
//                 <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckOut;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckOut = ({ asset, onClose, updateAssetStatus, onUpdateAssets}) => {
  const [checkOutTo, setCheckOutTo] = useState("");
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [history, setHistory] = useState([]);

  // Fetching the history of the asset
  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/checkincheckout/history/${asset.id}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Fetch history when the component mounts
  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    console.log("History:", history);
    if (history.length > 0) {
      const lastCheckIn = history
        .filter(event => event.event_type === 'check_in')
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]; // Get the latest check-in event
      console.log("Last Check-In Event:", lastCheckIn);
      if (lastCheckIn) {
        setCheckOutTo(lastCheckIn.checkin_by);
      }
    }
  }, [history]);
  
  const handleCheckOut = async (e) => {
    e.preventDefault();


    try {
      // Find the latest check-in event
      const lastCheckIn = history.find(event => event.event_type === 'check_in');
      
      // Extract the employee ID, site ID, and client ID from the latest check-in event
      const employeeID = lastCheckIn ? lastCheckIn.employee_id : null;
      const siteID = lastCheckIn ? lastCheckIn.site_id : null;
      const clientID = lastCheckIn ? lastCheckIn.client_id : null;

      // Send the checkout request to the backend with checkout date, checkout to, and IDs
      const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/checkout/${asset.id}`, {
        checkout_date: checkOutDate,
        checkout_to: checkOutTo,
        employee_id: employeeID, // Include the ID of the person checking out
        site_id: siteID, // Include the site ID
        client_id: clientID // Include the client ID
      });
      console.log(response);

      // Close the modal and update the asset status in the parent component
      onClose();
      updateAssetStatus({ ...asset, currentStatus: 'CheckedOut' });
      onUpdateAssets();
    } catch (error) {
      console.error("Error checking out asset:", error);
    }
  };

  const handleDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Check Out</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding:"20px" }}>
            <form onSubmit={handleCheckOut} id="formcheckout" autoComplete="off" noValidate="novalidate">
              <div style={{height: '320px', overflowY: 'scroll', overflowX:"hidden"}} >
              <div className="form-row">
                <div></div>
                <div className="form-group col-md-12" >
                  <label htmlFor="checkoutassettag">Asset Tag<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="assettag"
                    type="text"
                    readOnly
                    id="checkoutassettag"
                    className="form-control"
                    required
                    placeholder="Asset Tag"
                    value={asset?.assettag || ''}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="checkoutname">Asset Name<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="asset"
                    type="text"
                    readOnly
                    id="checkoutname"
                    className="form-control"
                    required
                    placeholder="Asset Name"
                    value={asset?.name || ''}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="checkoutfrom">Check Out From<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="checkoutfrom"
                    type="text"
                    readOnly
                    id="checkoutfrom"
                    className="form-control"
                    required
                    placeholder="Check Out From"
                    value={checkOutTo} // Display the name of the last person who checked in
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12 mb-0">
                  <label htmlFor="checkoutdate" className="control-label">Check Out Date<span style={{ color: "red" }}>*</span></label>
                  <div className="input-group mb-0">
                    <input
                      className="form-control setdate hasDatepicker"
                      required
                      placeholder="Check Out Date"
                      id="checkoutdate"
                      name="checkoutdate"
                      type="date"
                      value={checkOutDate}
                      onChange={handleDateChange}
                    />
                    <span className="input-group-addon border-1" id="date"><i className=""></i></span>
                  </div>
                </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" id="savecheckout">Check Out</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
