import React, { useState, useEffect } from "react";
import axios from "axios";

const AddQuantity = ({ asset, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...asset });
  const [vendors, setVendors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sites, setSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const vendorsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
      const brandsResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/brands`);
      const sitesResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/sites`);
      const categoriesResponse = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);

      setVendors(vendorsResponse.data);
      setBrands(brandsResponse.data);
      setSites(sitesResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const assetQuantity = asset.quantity === null || isNaN(parseInt(asset.quantity)) ? 0 : parseInt(asset.quantity);

        const updatedQuantity = assetQuantity + parseInt(formData.newquantity);
        const addQuantity = formData.newquantity;
        const category_name = formData.categoryName;
      
        console.log(updatedQuantity)
        console.log("quantity", assetQuantity)
        console.log("newquantity", formData.newquantity)
        console.log("formData", category_name)
      const payload = {
        ...formData,
        quantity: updatedQuantity,
        addQuantity,
        category_name,        
      };

      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/assets/addquantity/${asset.asset_master_id}`,
        payload
      );

      await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/purchase-history`,
        payload
      );

      console.log("Updated data:", response.data);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Error updating data");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div id="add" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form action="" id="formadd" encType="multipart/form-data" autoComplete="off" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Quantity</h5>
              <button type="button" className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Asset Name<span style={{ color: "red" }}>*</span></label>
                  <input name="name" id="name" className="form-control" value={formData.name} onChange={handleChange} required readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label>Asset Tag<span style={{ color: "red" }}>*</span></label>
                  <input name="assettag" type="text" id="assettag" className="form-control" value={formData.assettag} onChange={handleChange} required disabled />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Existing Quantity</label>
                  <input type="text" className="form-control" value={asset.quantity} readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label>Add Quantity<span style={{ color: "red" }}>*</span></label>
                  <input name="newquantity" type="text" id="newquantity" className="form-control" placeholder="Add Quantity" value={formData.newquantity} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Location<span style={{ color: "red" }}>*</span></label>
                  <select name="location" id="location" className="form-control" value={formData.location} onChange={handleChange} required readOnly>
                    <option value="" disabled hidden>Location</option>
                    {sites.map((site) => (
                      <option key={site.id} value={site.siteName}>{site.siteName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Vendor<span style={{ color: "red" }}>*</span></label>
                  <select name="vendorcompanyname" id="vendorcompanyname" className="form-control" value={formData.vendorcompanyname} onChange={handleChange} required >
                    <option value="" disabled hidden>Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.vendorCompanyName}>{vendor.vendorCompanyName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Brand<span style={{ color: "red" }}>*</span></label>
                  <select name="brand" id="brand" className="form-control" value={formData.brand} onChange={handleChange} required>
                    <option value="" disabled hidden>Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Cost<span style={{ color: "red" }}>*</span></label>
                  <input name="cost" type="text" id="cost" className="form-control" value={formData.cost} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
                  <input name="purchaseDate" type="date" id="purchaseDate" className="form-control" value={formData.purchaseDate} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label>Category Name<span style={{ color: "red" }}>*</span></label>
                  <select name="categoryName" id="categoryName" className="form-control" value={formData.categoryName} onChange={handleChange} required>
                    <option value="" disabled hidden>Category Name</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Description</label>
                  <textarea name="description" id="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuantity;
