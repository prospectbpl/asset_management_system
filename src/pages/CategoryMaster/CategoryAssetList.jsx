import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditAssetModal from '../AssetMaster/EditAssetModal';
import CategoryComponentList from './CategoryComponentList'; // Import CategoryComponentList
import AssetDesc from '../AssetMaster/AssetDesc';
import '../style1.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryAssetList({ onClose, assetCategory }) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetDetails, setShowAssetDetails] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAssetData, setEditAssetData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchAssets();
    fetchCategories();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets`);
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
      const assetCategories = response.data.filter(category => category.categoryType === 'asset');
      setCategories(assetCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAssetDetails = (asset) => {
    setSelectedAsset(asset);
    setShowAssetDetails(true);
  };

  const handleEditAsset = (asset) => {
    setEditAssetData(asset);
    setIsEditModalOpen(true);
  };

  const handleDeleteAsset = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/assets/${id}`);
      setAssets(assets.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleUpdateAsset = async (updatedAsset) => {
    try {
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/assets/${updatedAsset.id}`, updatedAsset);
      setAssets(assets.map(asset =>
        asset.id === updatedAsset.id ? updatedAsset : asset
      ));
      fetchAssets();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategoryList = () => {
    onClose();
  }
  const handleUpdateAssets =()=>{
    toast.success("successfully uploaded");
    fetchAssets();
  }


  const filteredAssets = selectedCategory
    ? assets.filter((asset) => asset.category_id === parseInt(selectedCategory))
    : assets;

  return (
    <div className="container-fluid">
       <ToastContainer/>
      {showAssetDetails ? (
        <AssetDesc
          asset={selectedAsset}
          onClose={() => setShowAssetDetails(false)}
        />
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <div className='d-flex gap-3'>
                  <div style={{ padding: "5px 10px", backgroundColor: "green", color: "white", borderRadius: "30px", cursor: "pointer" }}>
                    Category Asset List
                  </div>
                  <div onClick={handleBackToCategoryList} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                    Category List
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <label className='me-2 black-font-color'>Filter:</label>
                  <select className="form-select black-font-color" onChange={(e) => handleCategorySelect(e.target.value)}>
                    <option className='black-font-color' value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Asset Name</th>
                      <th>Asset Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id}>
                        <td>{asset.name}</td>
                        <td>{asset.assetType}</td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                            </button>
                            <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                onClick={() =>
                                  handleAssetDetails(asset)
                                }
                              >
                                <i className="fa fa-file "></i>
                                <span> Details</span>
                              </a>
                              <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditAsset(asset)}><i className="fa fa-pencil"></i> Edit</a>
                              {/* <a className="dropdown-item" href="#" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteAsset(asset.id)}><i className="fa fa-trash"></i> Delete</a> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Asset Modal */}
      {isEditModalOpen && (
        <EditAssetModal
          asset={editAssetData}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateAssets}
        />
      )}
    </div>
  );
}

export default CategoryAssetList;
