import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEmployeeTable from "./AddEmployeeTable";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import CreateUser from "./CreateUser";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchBar from "../../components/sidebar/SearchBar";
import ActiveInactiveModal from "./ActiveInactiveModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Employeelist.css"

function Employeelist({ handleLogout, username }) {
  const [employees, setEmployees] = useState([]);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // State for ActiveInactiveModal 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/employees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = () => {
    setIsEmployeeModalOpen(true);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
  };

  const handleEditEmployee = (employee) => {
    setEditEmployeeData(employee);
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    setDeleteEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_URL}/employees/${deleteEmployee.id}`
      );

      const deletedEmployee = { ...deleteEmployee, reason: deleteReason };
      await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/delete_details`,
        deletedEmployee
      );

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== deleteEmployee.id)
      );

      setIsDeleteModalOpen(false);
      console.log("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_URL}/employees/${updatedEmployee.id}`,
        updatedEmployee
      );

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        )
      );

      fetchEmployees();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleUpdateEmployees = () => {
    toast.success('Data uploaded successfully');
    fetchEmployees();
  };

  const handleCreateEmployee = (employee) => {
    setSelectedEmployee(employee); // Set selected employee for creation
    setIsCreateModalOpen(true); // Open create modal
  };

  const handleStatusModalOpen = (employee) => {
    setEditEmployeeData(employee); // Set the selected employee
    setIsStatusModalOpen(true); // Open the modal
  };

  const getToggleClass = (status) => {
    return status === 'active' ? 'toggle active' : 'toggle inactive';
  };



  return (
    <div className='d-flex w-100 h-100 '>
      <Sidebar />
      <div className='w-100 bg-white'>
        <SearchBar username={username} handleLogout={handleLogout} /> {/* Pass username and handleLogout props */}
        <div className="container-fluid bg-white">
          <ToastContainer />
          {showEmployeeDetails ? (
            <EmployeeDetails
              employee={selectedEmployee}
              onClose={() => setShowEmployeeDetails(false)}
            />
          ) : (
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Employee List
                    </h6>
                    <button onClick={handleAddEmployee} className="btn btn-primary">
                      Add New Employee
                    </button>
                  </div>
                  <div className="card-body">
                    <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                      <table className="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead style={{ position: "sticky", top: "0", zIndex: "1", backgroundColor: "#fff" }}>
                          <tr>
                            <th>Employee Picture</th>
                            <th>Employee Name</th>
                            <th>Employee Code</th>
                            <th>Designation</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <style>
                            {`.hyperlink:hover {color: blue;}`}
                          </style>

                          {employees && (
                            <>
                              {currentItems.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">There is No Asset.</td>
                                </tr>
                              ) : (
                                currentItems.map((employee) => (
                                  <tr key={employee.id}>
                                    <td>
                                      <img
                                        src={`${process.env.REACT_APP_LOCAL_URL}/uploads/employees/${employee.epicture}`}
                                        style={{ width: "90px" }}
                                        alt="Employee"
                                      />
                                    </td>
                                    <td className='hyperlink' style={{ cursor: "pointer" }} onClick={() => handleEmployeeDetails(employee)} >{employee.ename}</td>
                                    <td>{employee.ecode}</td>
                                    <td>{employee.edesignation}</td>
                                    <td>
                                      <div className="d-flex align-items-center justify-content-start gap-3">
                                        <div>
                                          <div className="btn-group">
                                            <button
                                              className="btn btn-sm btn-primary dropdown-toggle"
                                              type="button"
                                              data-toggle="dropdown"
                                              aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                                            </button>
                                            <div className="dropdown-menu actionmenu">
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() => handleEmployeeDetails(employee)}
                                              >
                                                <i className="fa fa-file"></i>
                                                <span> Details</span>
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                id="btnedit"
                                                data-toggle="modal"
                                                data-target="#edit"
                                                onClick={() => handleEditEmployee(employee)}
                                              >
                                                <i className="fas fa-edit"></i> Edit
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                id="btncreate"
                                                data-toggle="modal"
                                                data-target="#createEmployee"
                                                onClick={() => handleCreateEmployee(employee)}
                                              >
                                                <i className="fa"></i> Employee Create
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={getToggleClass(employee.status)}
                                          onClick={() => handleStatusModalOpen(employee)}
                                        >
                                          <div
                                            className="ball"
                                            style={{
                                              backgroundColor: employee.status === 'active' ? 'green' : 'red',
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </>
                          )}

                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
                      </li>
                      {Array.from(
                        {
                          length: Math.ceil(employees.length / itemsPerPage),
                        },
                        (_, i) => (
                          <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 && "active"
                              }`}
                          >
                            <a
                              className="page-link"
                              href="#"
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </a>
                          </li>
                        )
                      )}
                      <li
                        className={`page-item ${currentPage ===
                          Math.ceil(employees.length / itemsPerPage) &&
                          "disabled"
                          }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isEditModalOpen && (
            <EditEmployeeModal
              employee={editEmployeeData}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleUpdateEmployees}
            />
          )}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            itemName={deleteEmployee ? deleteEmployee.ename : ""}
            onDelete={handleDeleteConfirmation}
            onClose={() => setIsDeleteModalOpen(false)}
            deleteReason={deleteReason}
            setDeleteReason={setDeleteReason}
          />
          {/* Employee Creation Modal */}
          {isCreateModalOpen && (
            <CreateUser
              employee={selectedEmployee}
              onUpdate={handleUpdateEmployees}
              onClose={() => setIsCreateModalOpen(false)}
            />
          )}
          {isEmployeeModalOpen && <AddEmployeeTable
            onClose={handleCloseEmployeeModal}
            onUpdate={handleUpdateEmployees} />}
          {isStatusModalOpen && (
            <ActiveInactiveModal
              employee={editEmployeeData}
              onClose={() => setIsStatusModalOpen(false)}
              onUpdate={handleUpdateEmployees}
            // Other props as needed
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default Employeelist;