

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import AppContext from "../../../context/AppContext";

const AdminNavbar = ({ toggleSidebar }) => {

       const  { handleAdminLogout}= useContext(AppContext)
  const navigate = useNavigate();

  const handleLogout = async() => {
 
       await   handleAdminLogout()
       
           navigate("/login");
       
            
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-2 px-md-3 shadow-sm sticky-top">
      {/* LEFT */}
      <div className="d-flex align-items-center gap-2 gap-md-3">
        {/* Sidebar toggle (mobile only) */}
        <button
          className="btn btn-outline-light d-md-none"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <Link
          to="/admin/dashboard"
          className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0"
        >
          <FaUserShield />
          <span className="d-none d-sm-inline">Admin Panel</span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center gap-2 gap-md-3">

        {/* Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-outline-light btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Admin
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
            <li>
              <Link className="dropdown-item" to="/admin/dashboard">
                 Dashboard
              </Link>
            </li>

            <li>
              <Link  to="/admin/users" className="dropdown-item">
                Users
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="/admin/orders">
                Orders
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="/admin/products">
                Products
              </Link>
            </li>

            <li>
              <Link className="dropdown-item fw-semibold" to="/admin/addproduct">
                ➕ Add Product
              </Link>
            </li>
          </ul>
        </div>

        {/* Welcome text (hide on small screens) */}
        <span className="text-light d-none d-md-block">
          Welcome, <strong>Admin</strong>
        </span>

        {/* Logout */}
          <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          <FaSignOutAlt className="me-1" />
          <span className="d-none d-sm-inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
