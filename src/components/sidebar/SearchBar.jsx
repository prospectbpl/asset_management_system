import React, { useEffect, useState, } from "react";
import { Link, Route, Routes, useNavigate, useLocation, } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";

const SearchBar = ({ username, handleLogout }) => {
  const navigate = useNavigate

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  const [profilePicture, setProfilePicture] = useState("img/undraw_profile.svg");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/profile/data`);
      const data = response.data;
      if (data) {
        setProfilePicture(data.picture ? `${process.env.REACT_APP_LOCAL_URL}/uploads/profile/${data.picture}` : "img/undraw_profile.svg");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-white">
      <div id="content-wrapper" className="d-flex flex-column">
        {/*  <!-- Main Content --> */}
        <div id="content">
          <div id="content-wrapper" className="d-flex flex-column">

            {/*  <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <h3 className="pt-1 fw-bolder text-center w-100">Asset Managment</h3>
              {/*  <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                {/*  <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw"></i>
                  </a>
                  {/*   <!-- Dropdown - Messages --> */}
                  <div
                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <div className="topbar-divider d-none d-sm-block"></div>
                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">

                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{username}</span>
                    <img src={profilePicture} alt="avatar"
                      className="img-profile rounded-circle" />
                  </a>
                  {/*  <!-- Dropdown - User Information --> */}
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown">
                    <Link
                      to="/profile"

                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {/* <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </Link> */}
                    </Link>
                    <Link className="dropdown-item" to="/applicationsetting" >
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </Link>
                    {/* <a className="dropdown-item" href="#">
                          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                          Activity Log
                        </a> */}
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/*  <!-- Logout Modal--> */}
      <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <Link className="btn btn-primary" to="/" onClick={handleLogout} >Logout</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SearchBar
