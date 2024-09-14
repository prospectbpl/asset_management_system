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

//         let selectedLocationName, selectedLocationId;

//         // Extract selected location name and id based on category
//         if (category === 'Employee') {
//             const [selectedEmployeeName, selectedEmployeeId] = transferTo.split('-');
//             selectedLocationName = selectedEmployeeName;
//             selectedLocationId = selectedEmployeeId;
//         } else if (category === 'Client') {
//             const [selectedClientName, selectedClientId] = transferTo.split('-');
//             selectedLocationName = selectedClientName;
//             selectedLocationId = selectedClientId;
//         } else if (category === 'Site') {
//             const [selectedSiteName, selectedSiteId] = transferTo.split('-');
//             selectedLocationName = selectedSiteName;
//             selectedLocationId = selectedSiteId;
//         }

//         // Prepare updated asset data
//         let updatedAsset = [...assetss]; // Copy existing assets

//         // Find the current and transfer to locations
//         const currentLocation = updatedAsset.find(a => a.location === transferFrom);
//         const toLocation = updatedAsset.find(a => a.location === selectedLocationName);

//         // Update quantities for current and transfer to locations
//         if (currentLocation) {
//             currentLocation.quantity -= quantity;
//         }
//         if (toLocation) {
//             toLocation.quantity += quantity;
//         } else {
//             // If transferTo location doesn't exist, create a new entry
//             updatedAsset.push({
//                 location: selectedLocationName,
//                 quantity: quantity,
//                 assetName: asset.name, // Include asset name
//                 asset_master_id: asset.asset_master_id,
//                 assettag: asset.assettag,
//                 brand: asset.brand,
//                 brand_id: asset.brand_id,
//                 category_id: asset.category_id,
//                 category_name: asset.category_name,
//                 cost: asset.cost,
//                 created_at: asset.created_at,
//                 currentStatus: asset.currentStatus,
//                 description: asset.description,
//                 dimensions_enabled: asset.dimensions_enabled,
//                 height: asset.height,
//                 assetType: asset.assetType,
//                 length: asset.length,
//                 picture: asset.picture,
//                 purchaseDate: asset.purchaseDate,
//                 qrCodeData: asset.qrCodeData,
//                 registrationNumber: asset.registrationNumber,
//                 rtoName: asset.rtoName,
//                 serial: asset.serial,
//                 site_master_id: category === 'Site' ? selectedLocationId : null,
//                 client_master_id: category === 'Client' ? selectedLocationId : null,
//                 employee_master_id: category === 'Employee' ? selectedLocationId : null,
//                 units: asset.units,
//                 vendor_id: asset.vendor_id,
//                 vendorcompanyname: asset.vendorcompanyname,
//                 width: asset.width
//             });
//         }

//         // Prepare transporter history data
//         const transporterHistory = {
//             assetName: asset.name,
//             asset_master_id: asset.asset_master_id,
//             currentquantity: currentQuantity,
//             site_master_id: category === 'Site' ? selectedLocationId : null,
//             client_master_id: category === 'Client' ? selectedLocationId : null,
//             employee_master_id: category === 'Employee' ? selectedLocationId : null,
//             location: selectedLocationName,
//             quantity: quantity,
//             transferDate: transferDate,
//             transferTo: transferTo,
//             transferFrom: transferFrom,
//             selectedTransporterId: selectedTransporter.id,
//             selectedTransporterName: selectedTransporter.name,
//             description: description,
//             vehicleNumber: vehicleNumber,
//         };
//         console.log("currentQuntity", currentQuantity);
//         console.log( "width height",asset);
//         console.log(" updatedAsset", updatedAsset)
//         console.log("transporterHistory", transporterHistory);

//         // Update asset data and transporter history in the database
//         axios.all([
//             axios.put(`${process.env.REACT_APP_LOCAL_URL}/transferassets`, updatedAsset),
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
//                                     <label htmlFor="category">Transfer To<span style={{ color: "red" }}>*</span><span style={{ color: "red" }}>*</span></label>
//                                     <select
//                                         className="form-control"
//                                         id="category"
//                                         value={category}
//                                         onChange={(e) => setCategory(e.target.value)}
//                                     >
//                                         <option value="" disabled hidden>Transfer To</option>
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
//                                             value={transferTo}
//                                             onChange={(e) => setTransferTo(e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Employee</option>
//                                             {employees.map(employee => (
//                                                 <option key={employee.id} value={`${employee.ename}-${employee.id}`}>{employee.ename}{employee.id}</option>
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
//                                             value={transferTo}
//                                             onChange={(e) => setTransferTo(e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Site</option>
//                                             {sites.map(site => (
//                                                 <option key={site.id} value={`${site.siteName}-${site.id}`}>{site.siteName} {site.id}</option>
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
//                                             value={transferTo}
//                                             onChange={(e) => setTransferTo(e.target.value)}
//                                         >
//                                             <option value="" disabled hidden>Select Client</option>
//                                             {clients.map(client => (
//                                                 <option key={client.id} value={`${client.clientName}-${client.id}`}>{client.clientName}{client.id}</option>
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
    const [assets, setAssets] = useState([]);
    const [transporters, setTransporters] = useState([]);
    const [selectedTransporter, setSelectedTransporter] = useState({ id: '', name: '' });
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [category, setCategory] = useState('');
    const [employees, setEmployees] = useState([]);
    const [sites, setSites] = useState([]);
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        Checkout_site_master_id: null,
        Checkout_client_master_id: null,
        Checkout_employee_master_id: null
    });
    
   
    
    

    // Fetch initial data
    useEffect(() => {
        // Fetch assets data based on asset_master_id
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${asset.asset_master_id}`)
            .then(response => {
                setAssets(response.data);
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

    useEffect(() => {
        console.log("formData", formData);
    }, [transferFrom])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (category === 'Employee') {
                    const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/employees`);
                    const filteredEmployees = response.data.filter(employee =>
                        formData.Checkout_employee_master_id !== employee.id
                    );
                    setEmployees(filteredEmployees);
                } else if (category === 'Site') {
                    const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
                    const filteredSites = response.data.filter(site =>
                        formData.Checkout_site_master_id !== site.id
                    );
                    setSites(filteredSites);
                } else if (category === 'Client') {
                    const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/clients`);
                    const filteredClients = response.data.filter(client =>
                        formData.Checkout_client_master_id !== client.id
                    );
                    setClients(filteredClients);
                }
            } catch (error) {
                console.error(`Error fetching ${category.toLowerCase()}s:`, error);
            }
        };

        fetchData();
    }, [category, formData]);

    // Update current quantity based on transferFrom location
    useEffect(() => {
        if (transferFrom && Array.isArray(assets)) {
            const currentLocation = assets.find(a => a.location === transferFrom);
            setCurrentQuantity(currentLocation ? currentLocation.quantity : 0);
            const selectedAsset = assets.find(asset => asset.location === transferFrom);

            if (selectedAsset) {
                setFormData({
                    ...formData,
                    Checkout_site_master_id: selectedAsset.site_master_id ?? null,
                    Checkout_client_master_id: selectedAsset.client_master_id ?? null,
                    Checkout_employee_master_id: selectedAsset.employee_master_id ?? null
                });
            }
        }
    }, [transferFrom, assets]);

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
        let updatedAsset = [...assets]; // Copy existing assets

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
                width: asset.width,
                takeInsurance: asset.takeInsurance,
                username: asset.username,
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
            Checkout_client_master_id: formData.Checkout_client_master_id,
            Checkout_employee_master_id: formData.Checkout_employee_master_id,
            Checkout_site_master_id: formData.Checkout_site_master_id
        };

        // Update asset data and transporter history in the database
        axios.all([
            axios.put(`${process.env.REACT_APP_LOCAL_URL}/transferassets`, updatedAsset),
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
                                    {Array.isArray(assets) && assets.map(assetItem => (
                                        <option key={assetItem.location} value={assetItem.location}>{assetItem.location} (Qty. {assetItem.quantity})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="category">Transfer To<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        className="form-control"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Transfer To</option>
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
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value, 10);
                                        if (!isNaN(value) && value >= 1 && value <= currentQuantity) {
                                            setQuantity(value);
                                        } else {
                                            // Optionally, you can set an error state or show a message to the user
                                            setError('Please enter a valid quantity between 1 and ' + currentQuantity);
                                        }
                                    }}
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





