// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddTransferAsset = ({ asset, onClose, onUpdateAssets }) => {
//     // State variables
//     const [transferFrom, setTransferFrom] = useState('');
//     const [transferTo, setTransferTo] = useState('');
//     const [quantity, setQuantity] = useState(0);
//     const [transferDate, setTransferDate] = useState('');
//     const [description, setDescription] = useState('');
//     const [error, setError] = useState('');
//     const [currentQuantity, setCurrentQuantity] = useState(0);
//     const [assetss, setAssetss] = useState([]);
//     const [transporters, setTransporters] = useState([]);
//     const [selectedTransporter, setSelectedTransporter] = useState({ id: '', name: '' });
//     const [vehicleNumber, setVehicleNumber] = useState('');
//     const [category, setCategory] = useState('');
//     const [employees, setEmployees] = useState([]);
//     const [sites, setSites] = useState([]);
//     const [clients, setClients] = useState([]);

//     // Fetch initial data
//     useEffect(() => {
//         // Fetch assets data based on asset_master_id
//         axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${asset.asset_master_id}`)
//             .then(response => {
//                 setAssetss(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching assets:', error);
//             });

//         // Fetch transporters data
//         axios.get(`${process.env.REACT_APP_LOCAL_URL}/transporters`)
//             .then(response => {
//                 setTransporters(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching transporters:', error);
//             });
//     }, [asset]);

//     // Fetch employees, sites, and clients data based on category
//     useEffect(() => {
//         if (category === 'Employee') {
//             // Fetch employees data
//             axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`)
//                 .then(response => {
//                     setEmployees(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching employees:', error);
//                 });
//         } else if (category === 'Site') {
//             // Fetch sites data
//             axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`)
//                 .then(response => {
//                     setSites(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching sites:', error);
//                 });
//         } else if (category === 'Client') {
//             // Fetch clients data
//             axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`)
//                 .then(response => {
//                     setClients(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching clients:', error);
//                 });
//         }
//     }, [category]);

//     // Update current quantity based on transferFrom location
//     useEffect(() => {
//         if (transferFrom && Array.isArray(assetss)) {
//             const currentLocation = assetss.find(a => a.location === transferFrom);
//             setCurrentQuantity(currentLocation ? currentLocation.quantity : 0);
//         }
//     }, [transferFrom, assetss]);

//     // Handle transfer form submission
//     const handleTransfer = (e) => {
//         e.preventDefault();

//         // Validation checks
//         if (!transferFrom || !transferTo || !quantity || !transferDate || !selectedTransporter.id) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         if (quantity > currentQuantity) {
//             setError('Transfer quantity exceeds available quantity.');
//             return;
//         }

//         // Split selected value into siteName and siteID
//         const [selectedSiteName, selectedSiteId] = transferTo.split('-');

//         // Prepare updated asset data
//         let updatedAsset = [...assetss]; // Copy existing assets

//         // Find the current and transfer to locations
//         const currentLocation = updatedAsset.find(a => a.location === transferFrom);
//         const toLocation = updatedAsset.find(a => a.location === selectedSiteName);

//         // Update quantities for current and transfer to locations
//         if (currentLocation) {
//             currentLocation.quantity -= quantity;
//         }
//         if (toLocation) {
//             toLocation.quantity += quantity;
//         } else {
//             // If transferTo location doesn't exist, create a new entry
//             updatedAsset.push({
//                 location: selectedSiteName,
//                 quantity: quantity,
//                 assetName: asset.name, // Include asset name
//                 asset_master_id: asset.asset_master_id,
//                 site_master_id: selectedSiteId,
//                 // Include other asset details as needed
//             });
//         }

//         // Prepare transporter history data
//         const transporterHistory = {
//             assetName: asset.name,
//             asset_master_id: asset.asset_master_id,
//             location: selectedSiteName,
//             quantity: quantity,
//             transferDate: transferDate,
//             transferTo: transferTo,
//             transferFrom: transferFrom,
//             selectedTransporterId: selectedTransporter.id,
//             selectedTransporterName: selectedTransporter.name,
//             description: description,
//             vehicleNumber: vehicleNumber,
//             currentquantity: asset.quantity
//         };

//         // Update asset data and transporter history in the database
//         axios.all([
//             axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets`, updatedAsset),
//             axios.post(`${process.env.REACT_APP_LOCAL_URL}/transporter_history`, transporterHistory)
//         ])
//             .then(axios.spread((assetsResponse, historyResponse) => {
//                 onUpdateAssets(assetsResponse.data);
//                 onClose();
//             }))
//             .catch(error => {
//                 console.error('Error updating asset data or transporter history:', error);
//                 setError('Failed to transfer asset or update history.');
//             });
//     };

//     // Handle date change
//     const handleDateChange = (e) => {
//         setTransferDate(e.target.value);
//     };


//     return (
//         <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Transfer Asset</h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
//                             <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
//                         <form onSubmit={handleTransfer} id="formtransfer" autoComplete="off">
//                             {error && <div className="alert alert-danger">{error}</div>}
//                             <div className="form-group">
//                                 <label htmlFor="assetName">Asset Name<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     name="assetName"
//                                     type="text"
//                                     readOnly
//                                     id="assetName"
//                                     className="form-control"
//                                     value={asset?.name || ''}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="currentLocation">Current Location<span style={{ color: "red" }}>*</span></label>
//                                 <select
//                                     className="form-control"
//                                     id="currentLocation"
//                                     value={transferFrom}
//                                     onChange={(e) => setTransferFrom(e.target.value)}
//                                     required
//                                 >
//                                     <option value="">Select Current Location</option>
//                                     {Array.isArray(assetss) && assetss.map(assetItem => (
//                                         <option key={assetItem.location} value={assetItem.location}>{assetItem.location} ({assetItem.quantity})</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-row">
//                                 <div className="form-group col-md-12">
//                                     <label htmlFor="category">Transfer from<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         className="form-control"
//                                         id="category"
//                                         value={category}
//                                         onChange={(e) => setCategory(e.target.value)}
//                                     >
//                                         <option value="" disabled hidden>Check In By</option>
//                                         <option value="Employee">Employee</option>
//                                         <option value="Site">Site</option>
//                                         <option value="Client">Client</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {category === 'Employee' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="">Select Employee<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id=""
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Employee</option>
//                                             {Array.isArray(assetss) && assetss.map(assetItem => (
//                                                 <option key={assetItem.location} value={assetItem.location}>{assetItem.location} ({assetItem.quantity})</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             {category === 'Site' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="site">Select Site<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id="site"
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Site</option>
//                                             {Array.isArray(assetss) && assetss.map(assetItem => (
//                                                 <option key={assetItem.location} value={assetItem.location}>{assetItem.location} ({assetItem.quantity})</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             {category === 'Client' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="client">Select Client<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id="client"
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Client</option>
//                                             {Array.isArray(assetss) && assetss.map(assetItem => (
//                                                 <option key={assetItem.location} value={assetItem.location}>{assetItem.location} ({assetItem.quantity})</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="form-row">
//                                 <div className="form-group col-md-12">
//                                     <label htmlFor="category">Transfer to<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         className="form-control"
//                                         id="category"
//                                         value={category}
//                                         onChange={(e) => setCategory(e.target.value)}
//                                     >
//                                         <option value="" disabled hidden>Check In By</option>
//                                         <option value="Employee">Employee</option>
//                                         <option value="Site">Site</option>
//                                         <option value="Client">Client</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {category === 'Employee' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="">Select Employee<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id=""
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Employee</option>
//                                             {employees.map(employee => (
//                                                 <option key={employee.id} value={employee.ename}>{employee.ename}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             {category === 'Site' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="site">Select Site<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id="site"
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Site</option>
//                                             {sites.map(site => (
//                                                 <option key={site.id} value={site.siteName}>{site.siteName}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             {category === 'Client' && (
//                                 <div className="form-row">
//                                     <div className="form-group col-md-12">
//                                         <label htmlFor="client">Select Client<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                         <select
//                                             className="form-control"
//                                             id="client"
//                                             value={}
//                                             onChange={(e) => (e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Client</option>
//                                             {clients.map(client => (
//                                                 <option key={client.id} value={client.clientName}>{client.clientName}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             )}
//                             <div className="form-group">
//                                 <label htmlFor="quantity">Quantity<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     className="form-control"
//                                     required
//                                     placeholder="Quantity"
//                                     id="quantity"
//                                     name="quantity"
//                                     type="number"
//                                     min="1"
//                                     max={currentQuantity}
//                                     value={quantity}
//                                     onChange={(e) => setQuantity(parseInt(e.target.value))}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="transferDate">Transfer Date<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     className="form-control"
//                                     required
//                                     placeholder="Transfer Date"
//                                     id="transferDate"
//                                     name="transferDate"
//                                     type="date"
//                                     value={transferDate}
//                                     onChange={handleDateChange}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="selectedTransporter">Select Transporter<span style={{ color: "red" }}>*</span></label>
//                                 <select
//                                     className="form-control"
//                                     id="selectedTransporter"
//                                     value={selectedTransporter.id}
//                                     onChange={(e) => setSelectedTransporter({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
//                                     required
//                                 >
//                                     <option value="">Select Transporter</option>
//                                     {transporters.map(transporter => (
//                                         <option key={transporter.id} value={transporter.id}>{transporter.transporterCompanyName}</option>
//                                     ))}
//                                 </select>

//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="vehicleNumber">Vehicle Number (Optional)<span style={{ color: "red" }}>*</span></label>
//                                 <input
//                                     className="form-control"
//                                     placeholder="Vehicle Number"
//                                     id="vehicleNumber"
//                                     name="vehicleNumber"
//                                     type="text"
//                                     value={vehicleNumber}
//                                     onChange={(e) => setVehicleNumber(e.target.value)}
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="description">Description<span style={{ color: "red" }}>*</span></label>
//                                 <textarea
//                                     className="form-control"
//                                     id="description"
//                                     name="description"
//                                     placeholder="Description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 ></textarea>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="submit" className="btn btn-primary" id="savetransfer">
//                                     Transfer
//                                 </button>
//                                 <button type="button" className="btn btn-secondary" onClick={onClose}>
//                                     Close
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddTransferAsset;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransferAsset = ({ asset, onClose, onUpdateAssets }) => {
    // State variables
    const [transferFrom, setTransferFrom] = useState('');
    const [transferTo, setTransferTo] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [transferDate, setTransferDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [assetss, setAssetss] = useState([]);
    const [transporters, setTransporters] = useState([]);
    const [selectedTransporter, setSelectedTransporter] = useState({ id: '', name: '' });
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [category, setCategory] = useState('');
    const [employees, setEmployees] = useState([]);
    const [sites, setSites] = useState([]);
    const [clients, setClients] = useState([]);

    // Fetch initial data
    useEffect(() => {
        // Fetch assets data based on asset_master_id
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${asset.asset_master_id}`)
            .then(response => {
                setAssetss(response.data);
            })
            .catch(error => {
                console.error('Error fetching assets:', error);
            });

        // Fetch transporters data
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/transporters`)
            .then(response => {
                setTransporters(response.data);
            })
            .catch(error => {
                console.error('Error fetching transporters:', error);
            });
    }, [asset]);

    // Fetch employees, sites, and clients data based on category
    useEffect(() => {
        if (category === 'Employee') {
            // Fetch employees data
            axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`)
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error('Error fetching employees:', error);
                });
        } else if (category === 'Site') {
            // Fetch sites data
            axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`)
                .then(response => {
                    setSites(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sites:', error);
                });
        } else if (category === 'Client') {
            // Fetch clients data
            axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`)
                .then(response => {
                    setClients(response.data);
                })
                .catch(error => {
                    console.error('Error fetching clients:', error);
                });
        }
    }, [category]);

    // Update current quantity based on transferFrom location
    useEffect(() => {
        if (transferFrom && Array.isArray(assetss)) {
            const currentLocation = assetss.find(a => a.location === transferFrom);
            setCurrentQuantity(currentLocation ? currentLocation.quantity : 0);
        }
    }, [transferFrom, assetss]);

    const handleTransfer = (e) => {
        e.preventDefault();

        // Validation checks
        if (!transferFrom || !transferTo || !quantity || !transferDate || !selectedTransporter.id) {
            setError('Please fill in all fields.');
            return;
        }

        if (quantity > currentQuantity) {
            setError('Transfer quantity exceeds available quantity.');
            return;
        }

        let selectedLocationName, selectedLocationId;

        // Extract selected location name and id based on category
        if (category === 'Employee') {
            const [selectedEmployeeName, selectedEmployeeId] = transferTo.split('-');
            selectedLocationName = selectedEmployeeName;
            selectedLocationId = selectedEmployeeId;
        } else if (category === 'Client') {
            const [selectedClientName, selectedClientId] = transferTo.split('-');
            selectedLocationName = selectedClientName;
            selectedLocationId = selectedClientId;
        } else if (category === 'Site') {
            const [selectedSiteName, selectedSiteId] = transferTo.split('-');
            selectedLocationName = selectedSiteName;
            selectedLocationId = selectedSiteId;
        }

        // Prepare updated asset data
        let updatedAsset = [...assetss]; // Copy existing assets

        // Find the current and transfer to locations
        const currentLocation = updatedAsset.find(a => a.location === transferFrom);
        const toLocation = updatedAsset.find(a => a.location === selectedLocationName);

        // Update quantities for current and transfer to locations
        if (currentLocation) {
            currentLocation.quantity -= quantity;
        }
        if (toLocation) {
            toLocation.quantity += quantity;
        } else {
            // If transferTo location doesn't exist, create a new entry
            updatedAsset.push({
                location: selectedLocationName,
                quantity: quantity,
                assetName: asset.name, // Include asset name
                asset_master_id: asset.asset_master_id,
                assettag: asset.assettag,
                brand: asset.brand,
                brand_id: asset.brand_id,
                category_id: asset.category_id,
                category_name: asset.category_name,
                cost: asset.cost,
                created_at: asset.created_at,
                currentStatus: asset.currentStatus,
                description: asset.description,
                dimensions_enabled: asset.dimensions_enabled,
                height: asset.height,
                assetType: asset.assetType,
                length: asset.length,
                picture: asset.picture,
                purchaseDate: asset.purchaseDate,
                qrCodeData: asset.qrCodeData,
                registrationNumber: asset.registrationNumber,
                rtoName: asset.rtoName,
                serial: asset.serial,
                site_master_id: category === 'Site' ? selectedLocationId : null,
                client_master_id: category === 'Client' ? selectedLocationId : null,
                employee_master_id: category === 'Employee' ? selectedLocationId : null,
                units: asset.units,
                vendor_id: asset.vendor_id,
                vendorcompanyname: asset.vendorcompanyname,
                width: asset.width
            });
        }

        // Prepare transporter history data
        const transporterHistory = {
            assetName: asset.name,
            asset_master_id: asset.asset_master_id,
            currentquantity: currentQuantity,
            site_master_id: category === 'Site' ? selectedLocationId : null,
            client_master_id: category === 'Client' ? selectedLocationId : null,
            employee_master_id: category === 'Employee' ? selectedLocationId : null,
            location: selectedLocationName,
            quantity: quantity,
            transferDate: transferDate,
            transferTo: transferTo,
            transferFrom: transferFrom,
            selectedTransporterId: selectedTransporter.id,
            selectedTransporterName: selectedTransporter.name,
            description: description,
            vehicleNumber: vehicleNumber,
        };
        console.log("currentQuntity", currentQuantity);
        console.log( "width height",asset);
        console.log(" updatedAsset", updatedAsset)
        console.log("transporterHistory", transporterHistory);

        // Update asset data and transporter history in the database
        axios.all([
            axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets`, updatedAsset),
            axios.post(`${process.env.REACT_APP_LOCAL_URL}/transporter_history`, transporterHistory)
        ])
            .then(axios.spread((assetsResponse, historyResponse) => {
                onUpdateAssets(assetsResponse.data);
                onClose();
            }))
            .catch(error => {
                console.error('Error updating asset data or transporter history:', error);
                setError('Failed to transfer asset or update history.');
            });
    };

    // Handle date change
    const handleDateChange = (e) => {
        setTransferDate(e.target.value);
    };


    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Transfer Asset</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                        <form onSubmit={handleTransfer} id="formtransfer" autoComplete="off">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <label htmlFor="assetName">Asset Name<span style={{ color: "red" }}>*</span></label>
                                <input
                                    name="assetName"
                                    type="text"
                                    readOnly
                                    id="assetName"
                                    className="form-control"
                                    value={asset?.name || ''}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currentLocation">Current Location<span style={{ color: "red" }}>*</span></label>
                                <select
                                    className="form-control"
                                    id="currentLocation"
                                    value={transferFrom}
                                    onChange={(e) => setTransferFrom(e.target.value)}
                                    required
                                >
                                    <option value="">Select Current Location</option>
                                    {Array.isArray(assetss) && assetss.map(assetItem => (
                                        <option key={assetItem.location} value={assetItem.location}>{assetItem.location} ({assetItem.quantity})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="category">Transfer from<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Transfer From</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Site">Site</option>
                                        <option value="Client">Client</option>
                                    </select>
                                </div>
                            </div>

                            {category === 'Employee' && (
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="">Select Employee<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
                                        <select
                                            className="form-control"
                                            id=""
                                            value={transferTo}
                                            onChange={(e) => setTransferTo(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select Employee</option>
                                            {employees.map(employee => (
                                                <option key={employee.id} value={`${employee.ename}-${employee.id}`}>{employee.ename}{employee.id}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                            {category === 'Site' && (
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="site">Select Site<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
                                        <select
                                            className="form-control"
                                            id="site"
                                            value={transferTo}
                                            onChange={(e) => setTransferTo(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select Site</option>
                                            {sites.map(site => (
                                                <option key={site.id} value={`${site.siteName}-${site.id}`}>{site.siteName} {site.id}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                            {category === 'Client' && (
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="client">Select Client<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
                                        <select
                                            className="form-control"
                                            id="client"
                                            value={transferTo}
                                            onChange={(e) => setTransferTo(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select Client</option>
                                            {clients.map(client => (
                                                <option key={client.id} value={`${client.clientName}-${client.id}`}>{client.clientName}{client.id}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity<span style={{ color: "red" }}>*</span></label>
                                <input
                                    className="form-control"
                                    required
                                    placeholder="Quantity"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="1"
                                    max={currentQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="transferDate">Transfer Date<span style={{ color: "red" }}>*</span></label>
                                <input
                                    className="form-control"
                                    required
                                    placeholder="Transfer Date"
                                    id="transferDate"
                                    name="transferDate"
                                    type="date"
                                    value={transferDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectedTransporter">Select Transporter<span style={{ color: "red" }}>*</span></label>
                                <select
                                    className="form-control"
                                    id="selectedTransporter"
                                    value={selectedTransporter.id}
                                    onChange={(e) => setSelectedTransporter({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
                                    required
                                >
                                    <option value="">Select Transporter</option>
                                    {transporters.map(transporter => (
                                        <option key={transporter.id} value={transporter.id}>{transporter.transporterCompanyName}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group">
                                <label htmlFor="vehicleNumber">Vehicle Number (Optional)<span style={{ color: "red" }}>*</span></label>
                                <input
                                    className="form-control"
                                    placeholder="Vehicle Number"
                                    id="vehicleNumber"
                                    name="vehicleNumber"
                                    type="text"
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
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
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" id="savetransfer">
                                    Transfer
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

export default AddTransferAsset;





























//   }, []);

//   const fetchSites = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
//       setSites(response.data);
//     } catch (error) {
//       console.error("Error fetching sites:", error);
//     }
//   };

//   const apiUrl = process.env.REACT_APP_LOCAL_URL;

//   // asset current stauts details    
//   const getAssetHistory = async (assetId) => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${assetId}/history`);
//       // const response = await axios.get(`https://demo1server.prospectdigital.in/assets/${assetId}/history`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching asset history:", error);
//       return [];
//     }
//   };

//   // Function to get the latest event for an asset
//   const getLatestEvent = (assetId) => {
//     const history = assetHistory[assetId];
//     if (!history || history.length === 0) {
//       return null;
//     }
//     return history[history.length - 1];
//   };

//   // Function to get the display text for the latest event
//   const getLatestEventText = (event) => {
//     if (!event) {
//       return "No events";
//     }
//     return event.event_type === "check_in"
//       ? `Checked In to ${event.checkin_by}`
//       // : `Checked from ${event.checkout_to}`;
//       : `Checked from Prospect legal`;
//   };

//   useEffect(() => {
//     fetchAssets();
//   }, []);
//   // Fetch assets and their history
//   const fetchAssets = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);
//       setAssets(response.data);

//       console.log(apiUrl);
//       // Fetch and store history for each asset
//       const historyPromises = response.data.map(async (asset) => {
//         const history = await getAssetHistory(asset.id);
//         setAssetHistory(prevHistory => ({
//           ...prevHistory,
//           [asset.id]: history
//         }));
//       });

//       // Wait for all history fetches to complete
//       await Promise.all(historyPromises);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//     }
//   };
//   // asset current stauts details 
//   const changeStyle = () => {
//     setStyle((prevStyle) =>
//       prevStyle.includes("toggled")
//         ? prevStyle.replace(" toggled", "")
//         : `${prevStyle} toggled`
//     );
//   };

//   const handleAddAsset = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAssetDetails = (asset) => {
//     setSelectedAsset(asset);
//     setShowDetails(true);
//   };

//   const handleCloseDetails = () => {
//     setShowDetails(false);
//     setSelectedAsset(null);
//   };


//   const handleDeleteAsset = (asset) => {
//     setDeleteAsset(asset);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       // Perform deletion in the database
//       await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/assets/${deleteAsset.id}`);
//       // Save the deleted data to delete_details table
//       const deletedAsset = { ...deleteAsset, reason: deleteReason };
//       await axios.post(`${process.env.REACT_APP_LOCAL_URL}/delete_details`, deletedAsset);

//       // Remove the deleted client from the UI
//       setAssets((prevAssets) =>
//         prevAssets.filter((Asset) => Asset.id !== deleteAsset.id)
//       );
//       // Close the delete modal
//       setIsDeleteModalOpen(false);

//     } catch (error) {
//       console.error("Error deleting Asset:", error);
//       // Optionally handle error conditions here
//     }
//   };

//   // Edit asset modal
//   const handleEditAsset = (asset) => {
//     setEditedAsset(asset);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditAsset = () => {
//     setIsEditModalOpen(false);
//     setEditedAsset(null);
//   };

//   // Function to handle opening the modal for checking in an asset
//   const handleOpenCheckInModal = (asset) => {
//     setCheckInEditAsset(asset);
//     setIsCheckInModalOpen(true);
//   };

//   // Function to handle closing the modal for checking in an asset
//   const handleCloseCheckInModal = () => {
//     setIsCheckInModalOpen(false);
//     setCheckInEditAsset(null);
//   };

//   // Function to handle opening the modal for Add Transfer Asser
//   const handleOpenTransferAssetModal = (asset) => {
    // setaddTransferAssetEditAsset(asset);
    // setAddTransferAsset(true);
//   };

//   // Function to handle closing the modal for checking in an asset
//   const handleCloseTransferAssetModal = () => {
    // setAddTransferAsset(false);
    // setaddTransferAssetEditAsset(null);
//   };

//   // Function to handle opening the modal for checking out an asset
//   const handleOpenCheckOutModal = (asset) => {
//     setCheckOutEditAsset(asset);
//     setIsCheckOutModalOpen(true);
//   };

//   // Function to handle closing the modal for checking out an asset
//   const handleCloseCheckOutModal = () => {
//     setCheckOutEditAsset(null);
//     setIsCheckOutModalOpen(false);
//   };


//   // Function to handle updating asset details for both check in and check out
//   const handleUpdateAssetStatus = async (updatedAssetStatus) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAssetStatus.id}`,
//         updatedAssetStatus
//       );
//       console.log("Asset updated:", response.data);
//       // Update the assets state with the updated asset
//       const updatedAssets = assets.map((asset) =>
//         asset.id === updatedAssetStatus.id ? response.data : asset
//       );
//       fetchAssets();
//       setAssets(updatedAssets);
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   // Function to update assets list after adding a new asset
//   const handleUpdateAssets = () => {
//     fetchAssets();
//   };

//   // Function to handle updating asset details
//   const handleUpdateAsset = async (updatedAsset) => {
//     try {
//       const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAsset.id}`, updatedAsset);
//       console.log("Asset updated:", response.data);

//       // Update the assets state with the updated asset
//       const updatedAssets = assets.map(asset => (asset.id === updatedAsset.id ? response.data : asset));
//       fetchAssets();
//       setAssets(updatedAssets);
//     } catch (error) {
//       console.error("Error updating asset:", error);
//     }
//   };

//   const handleSiteChange = (event) => {
//     const selectedValue = event.target.value;
//     const intValue = parseInt(selectedValue, 10); // Convert string to integer with base 10
//     console.log("Selected Site:", typeof(intValue), intValue);
//     setSelectedSite(intValue);
//   };


//   const filteredAssets = selectedSite 
//     ? assets.filter(asset => asset.site_master_id=== selectedSite)
//     : assets;


//     console.log("filteredAssets",filteredAssets )
//     console.log("assets",assets)

    // const handleDownloadExcel = async () => {
    //   try {
    //     // Make a GET request to the backend endpoint for downloading assets as Excel
    //     const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/download-assets-excel/asset-transfer`, {
    //       responseType: 'blob' // Set response type to blob to handle binary data
    //     });
  
    //     // Create a URL for the blob
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
  
    //     // Create a link element and trigger a click event to start the download
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'assets.xlsx');
    //     document.body.appendChild(link);
    //     link.click();
  
    //     // Remove the link from the DOM
    //     document.body.removeChild(link);
    //   } catch (error) {
    //     console.error('Error downloading assets as Excel:', error);
    //     // Handle error if needed
    //   }
    // };

    