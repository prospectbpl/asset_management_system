// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddDataModal = ({ onClose, onUpdateComponents }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     size: "",
//     categoryName: "",
//     categoryId: "",
//     picture: null
//   });

//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//       const componentCategories = response.data.filter(category => category.categoryType === 'component');
//       setCategories(componentCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Find the selected category and set its ID
//     const selectedCategory = categories.find(category => category.categoryName === value);
//     if (selectedCategory) {
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         categoryId: selectedCategory.id,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       picture: file
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requiredFields = ["name", "size", "categoryName", "picture"];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return;
//       }
//     }

//     setError("");

//     try {
//       // Upload component data
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('size', formData.size);
//       formDataToSend.append('categoryId', formData.categoryId);
//       formDataToSend.append('picture', formData.picture);

//       const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/components`, formDataToSend);
//       console.log("Component data uploaded successfully:", response.data);

//       onClose();
//       onUpdateComponents();
//     } catch (error) {
//       console.error("Error uploading component data:", error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   return (
//     <div className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <form action="" id="formadd" encType="multipart/form-data" autoComplete="off" noValidate="novalidate" onSubmit={handleSubmit}>
//             <div className="modal-header">
//               <h5 className="modal-title">Add Component</h5>
//               <button type="button" className="close" onClick={handleClose}>&times;</button>
//             </div>
//             <div className="modal-body">
//               {error && <div className="alert alert-danger">{error}</div>}
//               <div className="form-group">
//                 <label>Component Name</label>
//                 <input name="name" type="text" className="form-control" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Size</label>
//                 <input name="size" type="text" className="form-control" value={formData.size} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Category</label>
//                 <select
//                   name="categoryName"
//                   id="categoryName"
//                   className="form-control"
//                   value={formData.categoryName}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="" disabled hidden>Categories</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.categoryName}>
//                       {category.categoryName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Component Picture</label>
//                 <input name="picture" type="file" className="form-control" onChange={handleImageChange} />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="submit" className="btn btn-primary">Save</button>
//               <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDataModal;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddComponent = ({ onClose, onUpdateComponents }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    categoryName: "",
    category_id: "",
    picture: null
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
      const componentCategories = response.data.filter(category => category.categoryType === 'component');
      setCategories(componentCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedCategory = categories.find(category => category.categoryName === value);
    setFormData({
      ...formData,
      [name]: value,
      category_id: selectedCategory ? selectedCategory.id : "", // Set category_id based on selected category name
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      picture: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ["name", "size", "categoryName"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    if (!formData.picture) {
      setError("Please upload file");
      return;
    }
  
    setError("");
  
    try {
      // Upload component data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('categoryId', formData.category_id); // Use category_id instead of categoryName
      formDataToSend.append('categoryName', formData.categoryName); // Include category name
      formDataToSend.append('picture', formData.picture);
  
      const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/components`, formDataToSend);
      console.log("Component data uploaded successfully:", response.data);
  
      onClose();
      onUpdateComponents();
    } catch (error) {
      console.error("Error uploading component data:", error);
    }
  };
  

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form action="" id="formadd" encType="multipart/form-data" autoComplete="off" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Component</h5>
              <button type="button" className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label>Component Name</label>
                <input name="name" type="text" placeholder="Enter Component" className="form-control" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Size</label>
                <input name="size" type="text" placeholder="Enter Size" className="form-control" value={formData.size} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                    name="categoryName"
                    id="categoryName"
                    className="form-control"
                    value={formData.categoryName}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label>Component Picture</label>
                <input name="picture" type="file" className="form-control" onChange={handleImageChange} />
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

export default AddComponent;

