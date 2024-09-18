// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddComponentList from './AddComponentList';
// import FullComponentDetails from './FullComponentDetails';
// import FullEditComponentModal from './FullEditComponentModal';

// function CategoryComponentList() {
//     const [fullcomponents, setFullComponents] = useState([]);
//     const [selectedFullComponent, setSelectedFullComponent] = useState(null);
//     const [showFullComponentDetails, setShowFullComponentDetails] = useState(false);
//     const [isAddComponentListModalOpen, setIsAddComponentListModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editFullComponent, setEditFullComponent] = useState(null);
//     const [categories, setCategories] = useState([]); // State to hold categories
//     const [selectedCategory, setSelectedCategory] = useState(''); // State to hold selected category ID

//     useEffect(() => {
//         fetchComponents();
//         fetchCategories(); // Fetch categories when the component mounts
//     }, []);

//     const fetchComponents = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents`);
//             setFullComponents(response.data);
//         } catch (error) {
//             console.error('Error fetching fullcomponents:', error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
//             // Assuming the response data is an array of categories
//             const componentCategories = response.data.filter(category => category.categoryType === 'component');
//             setCategories(componentCategories);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     const handleAddComponentList = () => {
//         setIsAddComponentListModalOpen(true);
//     };

//     const handleCloseComponentListModal = () => {
//         setIsAddComponentListModalOpen(false);
//         setIsEditModalOpen(false);
//     };

//     const handleFullComponentDetails = (component) => {
//         setSelectedFullComponent(component);
//         setShowFullComponentDetails(true);
//     };

//     const handleEditFullComponent = (component) => {
//         setEditFullComponent(component);
//         setIsEditModalOpen(true);
//     };

//     const handleBackToTable = () => {
//         setSelectedFullComponent(null);
//         setShowFullComponentDetails(false);
//     };

//     const handleDeleteComponentList = async (componentId) => {
//         try {
//             await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${componentId}`);
//             setFullComponents((prevComponents) =>
//                 prevComponents.filter((component) => component.id !== componentId)
//             );
//             console.log("Full Component deleted successfully");
//         } catch (error) {
//             console.error("Error deleting full component:", error);
//         }
//     };

//     const handleUpdateComponentList = async (updatedComponent) => {
//         try {
//             await axios.put(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${updatedComponent.id}`, updatedComponent);
//             setFullComponents((prevComponents) =>
//                 prevComponents.map((component) =>
//                     component.id === updatedComponent.id ? updatedComponent : component
//                 )
//             );
//             setIsEditModalOpen(false);
//         } catch (error) {
//             console.error("Error updating full component:", error);
//         }
//     };

//     const handleUpdateFullComponenList = (() => {
//         fetchComponents();
//     });

//     // Function to handle category selection
//     const handleCategorySelect = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     // Filter components based on selected category
//     const filteredComponents = selectedCategory
//         ? fullcomponents.filter((component) => component.categoryId === selectedCategory)
//         : fullcomponents;

//     return (
//         <div className="container-fluid bg-white">
//             {showFullComponentDetails ? (
//                 <FullComponentDetails
//                     component={selectedFullComponent}
//                     onClose={handleBackToTable}
//                 />
//             ) : (
//                 <div className="row">
//                     <div className="col-xl-12">
//                         <div className="card shadow mb-4">
//                             <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                                 <h6 className="m-0 font-weight-bold text-primary">
//                                     Category Component List
//                                 </h6>
//                                 <div className='d-flex align-items-center'>
//                                     <label className='me-2 black-font-color'>Filter:</label>
//                                     <select className="form-select black-font-color" onChange={(e) => handleCategorySelect(e.target.value)}>
//                                         <option className='black-font-color' value="">All Categories</option>
//                                         {categories.map((category) => (
//                                             <option key={category.id} value={category.id}>{category.categoryName}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                             </div>
//                             <div className="card-body">
//                                 <table className="table table-striped table-bordered" style={{ width: "100%" }}>
//                                     <thead>
//                                         <tr>
//                                             <th>Component Name</th>
//                                             <th>Size</th>
//                                             <th>Category</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredComponents.map((component) => (
//                                             <tr key={component.id}>
//                                                 <td>{component.componentName}</td>
//                                                 <td>{component.size}</td>
//                                                 <td>{component.category}</td>
//                                                 <td>
//                                                     <div className="btn-group">
//                                                         <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                             <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
//                                                         </button>
//                                                         <div className="dropdown-menu actionmenu" x-placement="bottom-start">
//                                                             <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleFullComponentDetails(component)}>
//                                                                 <i className="fa fa-file "></i>
//                                                                 <span> Details</span>
//                                                             </a>
//                                                             <a className="dropdown-item" href="#" onClick={() => handleEditFullComponent(component)}><i className="fas fa-edit"></i> Edit</a>
//                                                             <a className="dropdown-item" href="#" onClick={() => handleDeleteComponentList(component.id)}><i className="fa fa-trash"></i> Delete</a>
//                                                         </div>
//                                                     </div>


//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdateComponents={handleUpdateFullComponenList} />}
//             {isEditModalOpen && <FullEditComponentModal component={editFullComponent} onClose={handleCloseComponentListModal} onUpdate={handleUpdateComponentList} />}
//         </div>
//     );
// }

// export default CategoryComponentList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComponentList from '../ComponentMaster/AddComponentList';
import FullComponentDetails from '../ComponentMaster/FullComponentDetails';
import FullEditComponentModal from '../ComponentMaster/FullEditComponentModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style1.css';

function CategoryComponentList({ onClose, ComponentCategory }) {
    const [fullcomponents, setFullComponents] = useState([]);
    const [selectedFullComponent, setSelectedFullComponent] = useState(null);
    const [showFullComponentDetails, setShowFullComponentDetails] = useState(false);
    const [isAddComponentListModalOpen, setIsAddComponentListModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFullComponent, setEditFullComponent] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchComponents();
        fetchCategories();
    }, []);

    const fetchComponents = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents`);
            setFullComponents(response.data);
        } catch (error) {
            console.error('Error fetching fullcomponents:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
            const componentCategories = response.data.filter(category => category.categoryType === 'component');
            setCategories(componentCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddComponentList = () => {
        setIsAddComponentListModalOpen(true);
    };

    const handleCloseComponentListModal = () => {
        setIsAddComponentListModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleFullComponentDetails = (component) => {
        setSelectedFullComponent(component);
        setShowFullComponentDetails(true);
    };

    const handleEditFullComponent = (component) => {
        setEditFullComponent(component);
        setIsEditModalOpen(true);
    };

    const handleBackToTable = () => {
        setSelectedFullComponent(null);
        setShowFullComponentDetails(false);
    };

    const handleDeleteComponentList = async (componentId) => {
        try {

            await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${componentId}`);
            setFullComponents((prevComponents) =>
                prevComponents.filter((component) => component.id !== componentId)
            );
            console.log("Full Component deleted successfully");
        } catch (error) {
            console.error("Error deleting full component:", error);
        }
    };

    const handleUpdateComponentList = async (updatedComponent) => {
        try {
            await axios.put(`${process.env.REACT_APP_LOCAL_URL}/fullcomponents/${updatedComponent.id}`, updatedComponent);
            setFullComponents((prevComponents) =>
                prevComponents.map((component) =>
                    component.id === updatedComponent.id ? updatedComponent : component
                )
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating full component:", error);
        }
    };

    const handleUpdateFullComponentList = () => {
        toast.success("successfully uploaded");
        fetchComponents();
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleBackToCategoryList = () => {
        onClose();
    }

    const filteredComponents = selectedCategory
        ? fullcomponents.filter((component) => component.category_id === parseInt(selectedCategory))
        : fullcomponents;

    return (
        <div className="container-fluid bg-white">
            <ToastContainer />
            {showFullComponentDetails ? (
                <FullComponentDetails
                    component={selectedFullComponent}
                    onClose={handleBackToTable}
                />
            ) : (
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <div className='d-flex gap-3'>
                                    <div style={{ padding: "5px 10px", backgroundColor: "green", color: "white", borderRadius: "30px", cursor: "pointer" }}>
                                        Category Component List
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
                                <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                                            <tr>
                                                <th>Component Name</th>
                                                <th>Size</th>
                                                <th>Category</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <style>
                                                {`.hyperlink:hover {color: blue;}`}
                                            </style>
                                            {filteredComponents.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="text-center">Thier is No Category Component.</td>
                                                </tr>
                                            ) : (filteredComponents.map((component) => (
                                                <tr key={component.id}>
                                                    <td className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleFullComponentDetails(component)} >{component.componentName}</td>
                                                    <td>{component.size}</td>
                                                    <td>{component.category}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                                            </button>
                                                            <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                                                <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleFullComponentDetails(component)}>
                                                                    <i className="fa fa-file "></i>
                                                                    <span> Details</span>
                                                                </a>
                                                                <a className="dropdown-item" href="#" onClick={() => handleEditFullComponent(component)}><i className="fas fa-edit"></i> Edit</a>
                                                                {/* <a className="dropdown-item" href="#" onClick={() => handleDeleteComponentList(component.id)}><i className="fa fa-trash"></i> Delete</a> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isAddComponentListModalOpen && <AddComponentList onClose={handleCloseComponentListModal} onUpdate={handleUpdateFullComponentList} />}
            {isEditModalOpen && <FullEditComponentModal component={editFullComponent} onClose={handleCloseComponentListModal} onUpdate={handleUpdateComponentList} />}
        </div>
    );
}

export default CategoryComponentList;
