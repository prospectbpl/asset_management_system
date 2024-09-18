// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FullEditComponentModal = ({ component, onClose, onUpdateComponents }) => {
//     const [formData, setFormData] = useState({
//         componentName: component.componentName,
//         componentId: component.componentId,
//         componentImage: component.componentImage,
//         category: component.category,
//         categoryId: component.categoryId,
//         unit: component.unit,
//         size: component.size,
//         vendor_name: component.vendor_name,
//         vendor_id: component.vendor_id,
//         purchaseDate: component.purchaseDate,
//     });
//     const apiUrl = process.env.REACT_APP_LOCAL_URL;

//     const [vendors, setVendors] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchVendors();
//     }, []);

//     const fetchVendors = async () => {
//         try {
//             const response = await axios.get(`${apiUrl}/vendors`);
//             setVendors(response.data);
//         } catch (error) {
//             console.error('Error fetching vendors:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         // Update formData only if the value of the vendor_id changes
//         if (name === "vendor_id") {
//             setFormData({
//                 ...formData,
//                 [name]: value,
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         // Check if any changes were made to the vendor_id
//         if (formData.vendor_id !== component.vendor_id) {
//             // If vendor_id was changed, validate the form
//             if (!formData.vendor_id) {
//                 setError("Please select a vendor");
//                 return;
//             }
//         }

//         // Prepare the updated component data to be submitted
//         const updatedComponentData = {
//             ...formData,
//             id: component.id // Include the component id in the data
//         };

//         try {
//             // Update the component data
//             const response = await axios.put(`${apiUrl}/component-list-data/${component.id}`, updatedComponentData);
//             console.log('Data updated successfully:', response.data);

//             // Close the modal and update components
//             onClose();
//             onUpdateComponents();

//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <div id="editComponent" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//             <div className="modal-dialog modal-lg">
//                 <div className="modal-content">
//                     <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Edit Component</h5>
//                             <button type="button" className="close" onClick={handleClose}>&times;</button>
//                         </div>
//                         <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: "20px" }}>
//                             {error && <div className="alert alert-danger">{error}</div>}
//                             <div >
//                                 <div style={{ display: "flex", flexDirection: "row" }}>
//                                     <div style={{ flex: "2", paddingRight: "20px" }}>
//                                         <div className="form-group">
//                                             <label>Component Name<span style={{ color: "red" }}>*</span></label>
//                                             <input name="componentName" type="text" className="form-control" value={formData.componentName} readOnly />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Category<span style={{ color: "red" }}>*</span></label>
//                                             <input name="category" type="text" className="form-control" value={formData.category} readOnly />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Vendor<span style={{ color: "red" }}>*</span></label>
//                                             <select name="vendor_id" className="form-control" value={formData.vendor_id} onChange={handleChange} required>
//                                                 <option value="" disabled hidden>Select a vendor</option>
//                                                 {vendors.map(vendor => (
//                                                     <option key={vendor.id} value={vendor.id}>{vendor.vendorCompanyName}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div style={{ flex: "1" }}>
//                                         <div className="form-group">
//                                             <label>Component Photo<span style={{ color: "red" }}>*</span></label>
//                                             <div style={{ border: "1px solid #ccc", padding: "10px", height: "200px", overflow: "hidden" }}>
//                                                 {formData.componentImage && <img src={`${apiUrl}/uploads/components/${formData.componentImage}`} alt="Component" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Unit<span style={{ color: "red" }}>*</span></label>
//                                     <div className="input-group">
//                                         <select name="unit" className="form-control" value={formData.unit} onChange={handleChange} required>
//                                             <option value="">Select unit</option>
//                                             <option value="Nos">Nos</option>
//                                             <option value="mtr">mtr</option>
//                                             <option value="cm">cm</option>
//                                             <option value="mm">mm</option>
//                                         </select>
//                                         {formData.unit && (
//                                             <input name="size" type="number" className="form-control" placeholder="Enter size" value={formData.size} onChange={handleChange} />
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
//                                     <input name="purchaseDate" type="date" className="form-control" value={formData.purchaseDate} onChange={handleChange} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="submit" className="btn btn-primary">Save</button>
//                             <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FullEditComponentModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditFullComponentModal = ({ component, onClose, onUpdate }) => {
  const [editedComponent, setEditedComponent] = useState(component);
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVendors();
  }, [component]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/vendors`);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vendor_id") {
      const selectedVendor = vendors.find((vendor) => vendor.id === parseInt(value));
      if (selectedVendor) {
        setEditedComponent({
          ...editedComponent,
          vendor_id: value,
          vendor_name: selectedVendor.vendorCompanyName,
        });
      }
    } else {
      setEditedComponent({
        ...editedComponent,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('componentName', editedComponent.componentName);
      formData.append('size', editedComponent.size);
      formData.append('vendor_id', editedComponent.vendor_id);
      formData.append('vendor_name', editedComponent.vendor_name);
      formData.append('unit', editedComponent.unit);
      formData.append('purchaseDate', editedComponent.purchaseDate);
      if (editedComponent.componentImage) {
        formData.append('componentImage', editedComponent.componentImage);
      }
      const response = await axios.put(`${process.env.REACT_APP_LOCAL_URL}/component-list-data/update/${editedComponent.id}`, editedComponent);
      console.log('Data updated successfully:', response.data);
      console.log("formdata", formData);
      console.log("eddit", editedComponent)
      toast.success('Data updated successfully');
      onUpdate();
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000); // 1 second delay
    } catch (error) {
      console.error('Error updating component:', error);
      toast.error('Failed to save data');
      setError('Error updating component. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div id="editComponent" className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            <div className="modal-header">
              <h5 className="modal-title">Edit Component</h5>
              <button type="button" className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', padding: "20px" }}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: "2", paddingRight: "20px" }}>
                    <div className="form-group">
                      <label>Component Name<span style={{ color: "red" }}>*</span></label>
                      <input name="componentName" type="text" className="form-control" value={editedComponent.componentName} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Category<span style={{ color: "red" }}>*</span></label>
                      <input name="category" type="text" className="form-control" value={editedComponent.category} readOnly />
                    </div>
                  </div>
                  <div style={{ flex: "1" }}>
                    <div className="form-group">
                      <label>Component Photo<span style={{ color: "red" }}>*</span></label>
                      {editedComponent.componentImage && <img src={`${process.env.REACT_APP_LOCAL_URL}/uploads/components/${editedComponent.componentImage}`} alt="Component" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} readOnly />}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Vendor<span style={{ color: "red" }}>*</span></label>
                  <select name="vendor_id" className="form-control" value={editedComponent.vendor_id} onChange={handleChange} required>
                    <option value="" disabled hidden>Select a vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.vendorCompanyName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Unit<span style={{ color: "red" }}>*</span></label>
                  <div className="input-group">
                    <select name="unit" className="form-control" value={editedComponent.unit} onChange={handleChange} required>
                      <option value="">Select unit</option>
                      <option value="Nos">Nos</option>
                      <option value="mtr">mtr</option>
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                    </select>
                    {editedComponent.unit && (
                      <input name="size" type="number" className="form-control" placeholder="Enter size" value={editedComponent.size} onChange={handleChange} />
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Purchase Date<span style={{ color: "red" }}>*</span></label>
                  <input name="purchaseDate" type="date" className="form-control" value={editedComponent.purchaseDate} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFullComponentModal;
