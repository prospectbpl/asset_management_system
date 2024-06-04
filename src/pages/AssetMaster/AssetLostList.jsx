import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDataModal from './AddDataModal'; // Import your AddDataModal component
import './AssetLostList.css';
import AssetLost from './AssetLost';
import AssetLostDesc from './AssetLostDesc'; // Import AssetLostDesc component
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AssetLostList({ handleLogout, username }) {
    // assetlost 
    const [assetLosts, setAssetLosts] = useState([]);
    const [selectedAssetLost, setSelectedAssetLost] = useState(null);
    const [showAssetLostDetails, setShowAssetLostDetails] = useState(false);
    const [isAddAssetLostModalOpen, setIsAddAssetLostModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage edit modal
    const [editAssetLost, setEditAssetLost] = useState(null); // State to store data of asset lost being edited

    // assetlost function 

    useEffect(() => {
        fetchAssetLosts();
    }, []);

    const fetchAssetLosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/lost`);
            setAssetLosts(response.data);
        } catch (error) {
            console.error('Error fetching lost assets:', error);
        }
    };

    const handleAddAssetLost = () => {
        setIsAddAssetLostModalOpen(true);
    };

    const handleCloseAssetLostModal = () => {
        setIsAddAssetLostModalOpen(false);
        setIsEditModalOpen(false); // Close edit modal when adding or closing modal
    };

    const handleAssetLostDetails = (assetLost) => {
        setSelectedAssetLost(assetLost);
        setShowAssetLostDetails(true);
    };

    const handleEditAssetLost = (assetLost) => {
        setEditAssetLost(assetLost); // Set the asset lost to be edited
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleBackToTable = () => {
        setSelectedAssetLost(null);
        setShowAssetLostDetails(false);
    };

    const handleDeleteAssetLost = async (assetLostId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/assets/lost/${assetLostId}`);
            setAssetLosts((prevAssetLosts) =>
                prevAssetLosts.filter((assetLost) => assetLost.id !== assetLostId)
            );
            console.log("Asset lost deleted successfully");
        } catch (error) {
            console.error("Error deleting asset lost:", error);
        }
    };

    const handleUpdateAssetLost = async (updatedAssetLost) => {
        try {
            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/lost/${updatedAssetLost.id}`, updatedAssetLost);
            setAssetLosts((prevAssetLosts) =>
                prevAssetLosts.map((assetLost) =>
                    assetLost.id === updatedAssetLost.id ? updatedAssetLost : assetLost
                )
            );
            fetchAssetLosts();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating asset lost:", error);
        }
    };

    // Function to update client list after adding a new asset
    const handleUpdateAssetLosts = () => {
        toast.success("successfully uploaded");
        fetchAssetLosts();
    };
    
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };


    return (
        <div className='d-flex w-100 h-100 '>
            <Sidebar />
            <div className='w-100'>
                <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
                <div className="container-fluid">
                <ToastContainer/>
                    {showAssetLostDetails ? (
                        <AssetLostDesc
                            assetLost={selectedAssetLost}
                            onClose={handleBackToTable}
                        />
                    ) : (
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">
                                            Asset Lost List
                                        </h6>
                                        <button onClick={handleAddAssetLost} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                                            Report Lost Asset
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <table
                                            className="table table-striped table-bordered"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Asset Name</th>
                                                    <th>Loss Date</th>
                                                    <th>Loss Location</th>
                                                    <th>prev quantity</th>
                                                    <th>loss quantity</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assetLosts.map((assetLost) => (
                                                    <tr key={assetLost.id}>
                                                        <td>{assetLost.assetName}</td>
                                                        <td>{formatDate(assetLost.lossDate)}</td>
                                                        {/* <td>{assetLost.lossDate}</td> */}
                                                        <td>{assetLost.lossLocation}</td>
                                                        <td>{assetLost.prevquantity}</td>
                                                        <td>{assetLost.newquantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isAddAssetLostModalOpen && <AssetLost onClose={handleCloseAssetLostModal} onUpdateAssetLosts={handleUpdateAssetLosts} />}
                    {/* {isEditModalOpen && <EditAssetLostModal assetLost={editAssetLost} onClose={handleCloseAssetLostModal} onUpdate={handleUpdateAssetLost} />} Pass onUpdate function */}
                </div>
            </div>
        </div>

    )
}

export default AssetLostList;






















