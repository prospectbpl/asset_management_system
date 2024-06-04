import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssetLost = ({ onClose, onUpdateAssetLosts }) => {
    const [formData, setFormData] = useState({
        asset_master_id: '',
        asset_id: '',
        assetName: '',
        assetTag: '',
        assetPhoto: '',
        lossDate: '',
        lossLocation: '',
        lossType: '',
        lossCircumstances: '',
        responsiblePerson: '',
        contactNo: '',
        bill: null,
        site_master_id: null,
        client_master_id: null,
        employee_master_id: null,
        quantity: null,
        prevquantity: null,
        newquantity: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [assets, setAssets] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUniqueAssets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
                setAssets(response.data);
            } catch (error) {
                console.error("Error fetching unique assets:", error);
            }
        };
        fetchUniqueAssets();
    }, []);

    useEffect(() => {
        const fetchAssetLocation = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching asset locations:", error);
            }
        };
        fetchAssetLocation();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'asset_master_id') {
            const selectedAsset = assets.find(asset => asset.asset_master_id === parseInt(value));
            setSelectedAsset(selectedAsset);
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                asset_id: selectedAsset.asset_id,
                assetName: selectedAsset.name,
                assetTag: selectedAsset.assettag,
                assetPhoto: `${process.env.REACT_APP_LOCAL_URL}/uploads/assets/${selectedAsset.picture}`,
            }));
        } else if (name === 'lossLocation') {
            const [selectedLocation, selectedQuantity] = value.split('-');
            const relatedLocation = locations.find(location => location.location === selectedLocation);

            if (relatedLocation) {
                const selectedAsset = assets.find(asset => asset.asset_master_id === relatedLocation.asset_master_id);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: value,
                    site_master_id: relatedLocation.site_master_id || null,
                    client_master_id: relatedLocation.client_master_id || null,
                    employee_master_id: relatedLocation.employee_master_id || null,
                    quantity: relatedLocation.quantity ? relatedLocation.quantity - parseInt(formData.newquantity) : null,
                    prevquantity: selectedQuantity


                }));
            } else {
                // If related location data is not found, update only the lossLocation field
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value,
                    site_master_id: null,
                    client_master_id: null,
                    employee_master_id: null,
                    quantity: relatedLocation.quantity ? relatedLocation.quantity - parseInt(formData.newquantity) : null,
                    prevquantity: selectedQuantity
                }));
            }
        } else {
            // Handle other form field changes
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };






    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const requiredFields = ["asset_master_id", "lossLocation", "lossDate","newquantity", "lossType", "lossCircumstances", "responsiblePerson", "contactNo"];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                setIsLoading(false); // Stop loading spinner
                return; // Exit the function early if any required field is empty
            }
        }
        setError(""); // Clear any previous error messages if all required fields are filled in


        try {

            console.log("formData", formData)
            console.log(" formData", formData)

            const response = await axios.put(
                `${process.env.REACT_APP_LOCAL_URL}/assets/lost/update/${formData.asset_master_id}`,
                formData
            );

            await axios.post(
                `${process.env.REACT_APP_LOCAL_URL}/lost/history`, formData
            );


            console.log('Lost asset reported successfully:', response.data);
            onUpdateAssetLosts();
            onClose();
        } catch (error) {
            console.error('Error reporting lost asset:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleClose = () => {
        onClose();
    };

    return (
        <div id="assetLostModal" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate="novalidate">
                        <div className="modal-header">
                            <h5 className="modal-title">Report Lost Asset</h5>
                            <button type="button" className="close" onClick={handleClose}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", padding: "20px" }}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ flex: "2", paddingRight: "20px" }}>
                                    <div className="form-group">
                                        <label>Asset<span style={{ color: "red" }}>*</span></label>
                                        <select name="asset_master_id" className="form-control" value={formData.asset_master_id} onChange={handleChange} required>
                                            <option value="">Select Asset</option>
                                            {assets.map((asset) => (
                                                <option key={asset.asset_master_id} value={asset.asset_master_id}>{asset.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
                                        <input name="assetTag" type="text" className="form-control" value={formData.assetTag} placeholder='Asset Tag' onChange={handleChange} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="currentLocation">Current Location<span style={{ color: "red" }}>*</span></label>
                                        <select
                                            className="form-control"
                                            id="currentLocation"
                                            name="lossLocation"
                                            value={formData.lossLocation}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Current Location</option>
                                            {locations.filter(location => location.asset_master_id === (selectedAsset && selectedAsset.asset_master_id)).map(filteredLocation => (
                                                <option key={filteredLocation.location} value={`${filteredLocation.location}-${filteredLocation.quantity}`}>{filteredLocation.location} ({filteredLocation.quantity})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div style={{ flex: "1" }}>                                    
                                    <div className="form-group">
                                        <label>Asset Photo<span style={{ color: "red" }}>*</span></label>
                                        <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
                                            {formData.assetPhoto && <img src={formData.assetPhoto} alt="Asset" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                        <label>Quantity<span style={{ color: "red" }}>*</span></label>
                                        <input name="newquantity" placeholder='How much qunaity Loss' type="number" className="form-control" value={formData.newquantity} onChange={handleChange} />
                                    </div>
                            <div className="form-group">
                                <label>Date of Loss<span style={{ color: "red" }}>*</span></label>
                                <input name="lossDate" type="date" className="form-control" value={formData.lossDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Loss Type<span style={{ color: "red" }}>*</span></label>
                                <select name="lossType" className="form-control" value={formData.lossType} onChange={handleChange} required>
                                    <option value="">Select Loss Type</option>
                                    <option value="Theft">Theft</option>
                                    <option value="Misplacement">Misplacement</option>
                                    <option value="Damage">Damage</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Circumstances of Loss<span style={{ color: "red" }}>*</span></label>
                                <textarea name="lossCircumstances" className="form-control" value={formData.lossCircumstances} onChange={handleChange} placeholder="Circumstances of Loss" rows="3" required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Responsible Person<span style={{ color: "red" }}>*</span></label>
                                <input name="responsiblePerson" type="text" className="form-control" value={formData.responsiblePerson} onChange={handleChange} required placeholder="Responsible Person" />
                            </div>
                            <div className="form-group">
                                <label>Contact No.<span style={{ color: "red" }}>*</span></label>
                                <input name="contactNo" type="text" className="form-control" value={formData.contactNo} onChange={handleChange} required placeholder="Contact No." />
                            </div>
                            {/* <div className="form-group">
                                <label>Upload Bill<span style={{ color: "red" }}>*</span></label>
                                <input name="bill" type="file" className="form-control-file" onChange={handleFileChange} />
                            </div> */}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Report Loss</button>
                            <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default AssetLost;
