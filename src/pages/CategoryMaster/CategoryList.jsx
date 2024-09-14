import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from './AddCategory';
import CategoryDetails from './CategoryDetails';
import EditCategoryModal from './EditCategoryModal';
import CategoryComponentList from './CategoryComponentList';
import CategoryAssetList from './CategoryAssetList';
import '../style1.css';
import Sidebar from '../../components/sidebar/Sidebar';
import SearchBar from '../../components/sidebar/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryList({ handleLogout, username }) {
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [showComponentList, setShowComponentList] = useState(false);
  const [showAssetList, setShowAssetList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleUpdateCategoryList = () => {
    toast.success("successfully uploaded");
    fetchCategories();
  };

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
    setShowComponentList(false);
    setShowAssetList(false);
  };

  const handleEditCategory = (category) => {
    setEditCategoryData(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_LOCAL_URL}/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      await axios.put(`${process.env.REACT_APP_LOCAL_URL}/categories/${updatedCategory.id}`, updatedCategory);
      setCategories(categories.map(category =>
        category.id === updatedCategory.id ? updatedCategory : category
      ));
      fetchCategories();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleShowComponentList = () => {
    setShowComponentList(true);
  };

  const handleShowAssetList = () => {
    setShowAssetList(true);
  };
  const handlecategory = () => {
    toast.success("successfully uploaded");
  }

  // Logic to get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex w-100 h-100 '>
      <Sidebar />
      <div className='w-100'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid">
          <ToastContainer />
          {showCategoryDetails ? (
            <CategoryDetails
              category={selectedCategory}
              onClose={() => setShowCategoryDetails(false)}
            />
          ) : showComponentList ? (
            <CategoryComponentList onClose={handleCloseModal} />
          ) : showAssetList ? (
            <CategoryAssetList onClose={handleCloseModal} />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <div className='d-flex gap-4'>
                      <div style={{ padding: "5px 10px", backgroundColor: "green", color: "white", borderRadius: "30px", cursor: "pointer" }}>
                        Category List
                      </div>
                      <div onClick={handleShowAssetList} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                        Asset Category List
                      </div>
                      <div onClick={handleShowComponentList} style={{ padding: "5px 10px", backgroundColor: "#4E73DF", color: "white", borderRadius: "30px", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.backgroundColor = 'red'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4E73DF'}>
                        Component Category List
                      </div>
                    </div>
                    <button onClick={handleAddCategory} className='btn btn-primary'>
                      Add New Category
                    </button>
                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Category Name</th>
                            <th>Category Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((category) => (
                            <tr key={category.id}>
                              <td>{category.categoryName}</td>
                              <td>{category.categoryType}</td>
                              <td>
                                <div className="btn-group">
                                  <button className="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                  </button>
                                  <div className="dropdown-menu actionmenu" x-placement="bottom-start">
                                    <button className="dropdown-item" id="btnedit" customdata="386" data-toggle="modal" data-target="#edit" onClick={() => handleEditCategory(category)}><i className="fas fa-edit"></i> Edit</button>
                                    {/* <button className="dropdown-item" id="btnedit" customdata="386" data-toggle="modal" data-target="#delete" onClick={() => handleDeleteCategory(category.id)}><i className="fa fa-trash"></i> Delete</button> */}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                      </li>
                      {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                          <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === Math.ceil(categories.length / itemsPerPage) && 'disabled'}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isEditModalOpen && (
            <EditCategoryModal
              category={editCategoryData}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleUpdateCategory}
            />
          )}
          {isCategoryModalOpen && (<AddCategory onClose={handleCloseModal} onUpdateCategories={handleUpdateCategoryList} />)}
        </div>
      </div>
    </div>

  );
}

export default CategoryList;
