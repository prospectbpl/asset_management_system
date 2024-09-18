// BrandAssetsTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BrandAssetsTable({ brand, onClose }) {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/unique/assets`);
            setAssets(response.data.filter(asset => asset.brand_id === brand.id));
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };
    const handleCloseModal=()=>{
        onClose();
    }
    return (
        <div className="container-fluid bg-white">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <div className='d-flex gap-4'>
                                <h6 className="m-0 font-weight-bold text-primary" style={{ cursor: 'pointer' }}>
                                    {brand.brandName} Assets
                                </h6>
                                <h6 className="m-0 font-weight-bold text-primary" onClick={handleCloseModal} style={{ cursor: 'pointer' }}>
                                    Brand List
                                </h6>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Asset Name</th>
                                        <th>Asset Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.map((asset) => (
                                        <tr key={asset.id}>
                                            <td>{asset.name}</td>
                                            <td>{asset.assetType}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandAssetsTable;
