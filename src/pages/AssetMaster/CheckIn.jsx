// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CheckIn = ({ asset, onClose, updateAssetStatus,onUpdateAssets }) => {
//   const [checkInBy, setCheckInBy] = useState("");
//   const [checkInDate, setCheckInDate] = useState(new Date());
//   const [category, setCategory] = useState("Employee");
//   const [description, setDescription] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     // Fetch employees
//     axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`)
//       .then(response => {
//         setEmployees(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching employees:", error);
//       });

//     // Fetch sites
//     axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`)
//       .then(response => {
//         setSites(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching sites:", error);
//       });

//     // Fetch clients
//     axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`)
//       .then(response => {
//         setClients(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching clients:", error);
//       });
//   }, []);


//   const handleCheckIn = async (e) => {
//     e.preventDefault();
//     try {
//       let selectedId = ""; // Initialize selected ID
//       let selectedName = ""; // Initialize selected name

//       // Check the selected category
//       switch (category) {
//         case "Employee":
//           // Find the selected employee's ID based on their name
//           if (checkInBy) {
//             const selectedEmployee = employees.find(employee => employee.ename === checkInBy);
//             if (selectedEmployee) {
//               selectedId = selectedEmployee.id; // Set the selected ID
//               selectedName = selectedEmployee.ename; // Set the selected name
//             }
//           }
//           break;
//         case "Site":
//           // Find the selected site's ID based on its name
//           if (checkInBy) {
//             const selectedSite = sites.find(site => site.siteName === checkInBy);
//             if (selectedSite) {
//               selectedId = selectedSite.id; // Set the selected ID
//               selectedName = selectedSite.siteName; // Set the selected name
//             }
//           }
//           break;
//         case "Client":
//           // Find the selected client's ID based on its name
//           if (checkInBy) {
//             const selectedClient = clients.find(client => client.clientName === checkInBy);
//             if (selectedClient) {
//               selectedId = selectedClient.id; // Set the selected ID
//               selectedName = selectedClient.clientName; // Set the selected name
//             }
//           }
//           break;
//         default:
//           break;
//       }

//       // Make a request to check in the asset
//       const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/checkin/${asset.id}`, {
//         checkin_date: checkInDate,
//         [`${category.toLowerCase()}_id`]: selectedId, // Dynamically set the ID field based on category
//         checkin_by: selectedName, // Dynamically set the name field based on category
//         description: description,
//       });
//       console.log(response);

//       // Close the modal and update the asset status if the check-in is successful
//       onClose();
//       updateAssetStatus({ ...asset, currentStatus: 'CheckedIn' });
//       onUpdateAssets();
//     } catch (error) {
//       console.error("Error checking in asset:", error);
//     }
//   };

//   const handleDateChange = (e) => {
//     setCheckInDate(e.target.value);
//   };

//   return (
//     <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Check In</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleCheckIn} id="formcheckin" autoComplete="off" noValidate="novalidate">
//               <div className="form-row">
//                 <div className="form-group col-md-12">
//                   <label htmlFor="checkinassettag">Asset Tag</label>
//                   <input
//                     name="assettag"
//                     type="text"
//                     readOnly
//                     id="checkinassettag"
//                     className="form-control"
//                     required
//                     placeholder="Asset Tag"
//                     value={asset?.assettag || ''}
//                   />
//                 </div>
//                 <div className="form-group col-md-12">
//                   <label htmlFor="checkinname">Asset Name</label>
//                   <input
//                     name="asset"
//                     type="text"
//                     readOnly
//                     id="checkinname"
//                     className="form-control"
//                     required
//                     placeholder="Asset Name"
//                     value={asset?.name || ''}
//                   />
//                 </div>
//               </div>

//               {/* Other form fields */}
//               <div className="form-row">
//                 <div className="form-group col-md-12">
//                   <label htmlFor="category">Check In By</label>
//                   <select
//                     className="form-control"
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     <option value="Employee">Employee</option>
//                     <option value="Site">Site</option>
//                     <option value="Client">Client</option>
//                   </select>
//                 </div>
//               </div>
//               {/* Employee dropdown */}
//               {category === "Employee" && (
//                 <div className="form-row">
//                   <div className="form-group col-md-12">
//                     <label htmlFor="checkinby">Employee</label>
//                     <select
//                       className="form-control"
//                       id="checkinby"
//                       value={checkInBy}
//                       onChange={(e) => setCheckInBy(e.target.value)}
//                     >
//                       <option value="">Select Employee</option>
//                       {employees.map(employee => (
//                         <option key={employee.id} value={employee.ename}>{employee.ename}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}
//               {/* Site dropdown */}
//               {category === "Site" && (
//                 <div className="form-row">
//                   <div className="form-group col-md-12">
//                     <label htmlFor="site">Select Site</label>
//                     <select
//                       className="form-control"
//                       id="site"
//                       value={checkInBy}
//                       onChange={(e) => setCheckInBy(e.target.value)}
//                     >
//                       <option value="">Select Site</option>
//                       {sites.map(site => (
//                         <option key={site.id} value={site.siteName}>{site.siteName}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}
//               {/* Client dropdown */}
//               {category === "Client" && (
//                 <div className="form-row">
//                   <div className="form-group col-md-12">
//                     <label htmlFor="client">Select Client</label>
//                     <select
//                       className="form-control"
//                       id="client"
//                       value={checkInBy}
//                       onChange={(e) => setCheckInBy(e.target.value)}
//                     >
//                       <option value="">Select Client</option>
//                       {clients.map(client => (
//                         <option key={client.id} value={client.clientName}>{client.clientName}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}
//               <div className="form-row">
//                 <div className="form-group col-md-12 mb-0">
//                   <label htmlFor="checkindate" className="control-label">Check In Date</label>
//                   <div className="input-group mb-0">
//                     <input
//                       className="form-control setdate hasDatepicker"
//                       required
//                       placeholder="Check In Date"
//                       id="checkindate"
//                       name="checkindate"
//                       type="date"
//                       value={checkInDate}
//                       onChange={handleDateChange}
//                     />
//                     <span className="input-group-addon border-1" id="date"><i className=""></i></span>
//                   </div>
//                   <label className="error" htmlFor="checkindate"></label>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-md-12 mb-0">
//                   <label htmlFor="description" className="control-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     id="description"
//                     name="description"
//                     placeholder="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="submit" className="btn btn-primary" id="savecheckin">Check In</button>
//                 <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckIn;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckIn = ({ asset, onClose, updateAssetStatus, onUpdateAssets }) => {
  const [checkInBy, setCheckInBy] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Employee');
  const [description, setDescription] = useState('');
  const [employees, setEmployees] = useState([]);
  const [sites, setSites] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesResponse, sitesResponse, clientsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_LOCAL_URL}/checkin/employees`),
          axios.get(`${process.env.REACT_APP_LOCAL_URL}/checkin/sites`),
          axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`)
        ]);

        setEmployees(employeesResponse.data);
        setSites(sitesResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckIn = async (e) => {
    e.preventDefault();

    const requiredFields = ['checkInBy', 'checkInDate', 'description'];
    for (const field of requiredFields) {
      if (!eval(field)) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    setError('');

    let selectedId = '';
    let selectedName = '';

    switch (category) {
      case 'Employee':
        const selectedEmployee = employees.find(employee => employee.ename === checkInBy);
        if (selectedEmployee) {
          selectedId = selectedEmployee.id;
          selectedName = selectedEmployee.ename;
        }
        break;
      case 'Site':
        const selectedSite = sites.find(site => site.siteName === checkInBy);
        if (selectedSite) {
          selectedId = selectedSite.id;
          selectedName = selectedSite.siteName;
        }
        break;
      case 'Client':
        const selectedClient = clients.find(client => client.clientName === checkInBy);
        if (selectedClient) {
          selectedId = selectedClient.id;
          selectedName = selectedClient.clientName;
        }
        break;
      default:
        break;
    }

    try {
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/checkin/${asset.id}`, {
        checkin_date: checkInDate,
        [`${category.toLowerCase()}_id`]: selectedId,
        checkin_by: selectedName,
        description: description,
      });

      onClose();
      updateAssetStatus({ ...asset, currentStatus: 'CheckedIn' });
      onUpdateAssets();
    } catch (error) {
      console.error('Error checking in asset:', error);
    }
  };

  const handleDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Check In</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
            <form onSubmit={handleCheckIn} id="formcheckin" autoComplete="off">
              {error && <div className="alert alert-danger">{error}</div>}
              <div style={{height: '350px', overflowY: 'scroll' ,overflowX:"hidden" }}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="checkinassettag">Asset Tag<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="assettag"
                    type="text"
                    readOnly
                    id="checkinassettag"
                    className="form-control"
                    required
                    placeholder="Asset Tag"
                    value={asset?.assettag || ''}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="checkinname">Asset Name<span style={{ color: "red" }}>*</span></label>
                  <input
                    name="asset"
                    type="text"
                    readOnly
                    id="checkinname"
                    className="form-control"
                    required
                    placeholder="Asset Name"
                    value={asset?.name || ''}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="category">Check In By<span style={{ color: "red" }}>*</span></label>
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled hidden>Check In By</option>
                    <option value="Employee">Employee</option>
                    <option value="Site">Site</option>
                    <option value="Client">Client</option>
                  </select>
                </div>
              </div>

              {category === 'Employee' && (
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="checkinby">Select Employee<span style={{ color: "red" }}>*</span></label>
                    <select
                      className="form-control"
                      id="checkinby"
                      value={checkInBy}
                      onChange={(e) => setCheckInBy(e.target.value)}
                    >
                      <option value="" disabled hidden>Select Employee</option>
                      {employees.map(employee => (
                        <option key={employee.id} value={employee.ename}>{employee.ename}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {category === 'Site' && (
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="site">Select Site<span style={{ color: "red" }}>*</span></label>
                    <select
                      className="form-control"
                      id="site"
                      value={checkInBy}
                      onChange={(e) => setCheckInBy(e.target.value)}
                    >
                      <option value="" disabled hidden>Select Site</option>
                      {sites.map(site => (
                        <option key={site.id} value={site.siteName}>{site.siteName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {category === 'Client' && (
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="client">Select Client<span style={{ color: "red" }}>*</span></label>
                    <select
                      className="form-control"
                      id="client"
                      value={checkInBy}
                      onChange={(e) => setCheckInBy(e.target.value)}
                    >
                      <option value="" disabled hidden>Select Client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.clientName}>{client.clientName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="form-row">
                <div className="form-group col-md-12 mb-0">
                  <label htmlFor="checkindate">Check In Date<span style={{ color: "red" }}>*</span></label>
                  <input
                    className="form-control"
                    required
                    placeholder="Check In Date"
                    id="checkindate"
                    name="checkindate"
                    type="date"
                    value={checkInDate}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12 mb-0">
                  <label htmlFor="description">Description<span style={{ color: "red" }}>*</span></label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" id="savecheckin">
                  Check In
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;

