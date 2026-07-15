

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
   import { IoMdLogOut } from "react-icons/io";

const Navebar = () => {

  const {
    isLoggedIn,
    logout,
    userCart,
    userOrder,
    theme,
    toggleTheme
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [searchItem, setSearchItem] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [latestOrders, setLatestOrders] = useState({});

  useEffect(() => {
    if (userOrder?.length) {
      setLatestOrders(userOrder[0]);
    }
  }, [userOrder]);

  const submithandlerButton = (e) => {
    e.preventDefault();

    if (!searchItem.trim()) return;

    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const closeNavbar = () => setMenuOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar sticky-top px-3 shadow-sm"
        style={{
          height: "70px",
          zIndex: 9999,
          background: theme === "dark" ? "#1f1f1f" : "#ffffff",
          transition: "0.3s ease"
        }}
      >

        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT */}
          <div className="d-flex align-items-center gap-3">

            {/* MENU BUTTON */}
            <button
              className="btn border-0 d-lg-none"
              onClick={() => setMenuOpen(true)}
            >
              <HiOutlineMenuAlt3
                size={30}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </button>

            {/* LOGO */}
            <Link to="/" onClick={closeNavbar}>
              <img
                   
                 
                   
               
                 
                 src="logo_image/logo.png"
                style={{ width: "100px"  ,  borderRadius: "6px"  }}
                alt="logo"
              />
            </Link>

          </div>

          {/* DESKTOP MENU */}
          <div className="d-none d-lg-flex gap-4 fw-semibold">

            <Link to="/" style={{ color: theme === "dark" ? "#fff" : "#000", textDecoration: "none" }}>
              Products
            </Link>

            <Link to="/category/mobile" style={{ color: theme === "dark" ? "#fff" : "#000", textDecoration: "none" }}>
              Mobile
            </Link>

            <Link to="/category/laptop" style={{ color: theme === "dark" ? "#fff" : "#000", textDecoration: "none" }}>
              Laptop
            </Link>

            <Link to="/category/watch" style={{ color: theme === "dark" ? "#fff" : "#000", textDecoration: "none" }}>
              Watch
            </Link>

            <Link to="/category/headphone" style={{ color: theme === "dark" ? "#fff" : "#000", textDecoration: "none" }}>
              Headphone
            </Link>

          </div>

          {/* SEARCH */}
          <form
            className="d-none d-md-flex position-relative"
            onSubmit={submithandlerButton}
            style={{ width: "35%" }}
          >

            <CiSearch
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
                color: "gray"
              }}
            />

            <input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search products..."
              className="form-control border-0"
              style={{
                paddingLeft: "40px",
                height: "42px",
                borderRadius: "8px",
                background: theme === "dark" ? "#2a2a2a" : "#f5f5f6",
                color: theme === "dark" ? "#fff" : "#000"
              }}
            />
          </form>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-3">

            {/* THEME BUTTON */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm "
              style={{
                       fontsize: "16px",
                // border: "1px solid gray",
                color: theme === "dark" ? "#fff" : "#000"
              }}
            >
              {theme === "light" ? <MdDarkMode  size={25}/> : <CiLight size={25}/>}
            </button>

            {/* CART */}

            {/* <Link to="/cart" style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              <FaShoppingCart size={22} />

              {userCart?.items?.length > 0 && (
                <span
                  className="position-absolute bg-danger text-white rounded-circle"
                  style={{
                    top: "-8px",
                    right: "-10px",
                    fontSize: "10px",
                    padding: "2px 5px"
                  }}
                >
                  {userCart?.items?.reduce((t, i) => t + i.qty, 0)}
                </span>
              )}
            </Link> */}

             <Link
              to="/cart"
              className="position-relative text-dark"
                
            >
              <FaShoppingCart size={23}  style={{ color: theme === "dark" ? "#fff" : "#000" }}/>

              {userCart?.items?.length > 0 && (
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  style={{
                    top: "-10px",
                    right: "-12px",
                    fontSize: "10px"
                  }}
                >
                  {userCart?.items?.reduce(
                    (total, item) =>
                      total + item.qty,
                    0
                  )}
                </span>
              )}
            </Link>

            {/* AUTH */}
            {!isLoggedIn ? (
              <div className="d-none d-md-flex gap-2">

                <Link to="/login" className="btn btn-dark btn-sm">
                  Login
                </Link>

                <Link to="/register" className="btn btn-dark btn-sm">
                  Register
                </Link>

              </div>
            ) : (
              <div className="dropdown">

                <span
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ color: theme === "dark" ? "#fff" : "#000" }}
                >
                  👤 Profile
                </span>

                <ul className="dropdown-menu dropdown-menu-end shadow">

                  <li><Link className="dropdown-item" to="/profile">👨‍💼 Profile</Link></li>

                  <li>
                    <Link className="dropdown-item" to={`/myorder/${latestOrders.orderId}`}>
                    📦 My Orders
                    </Link>
                  </li>
                    <li>
                   <Link
                      className="dropdown-item d-flex align-items-center gap-2"
                      to={`/trackorder/${latestOrders.orderId}`}
                    >
                      <FaLocationDot />
                      Track Order
                    </Link>
                  </li>

                  <li><Link className="dropdown-item" to="/wishlist">❤️ Wishlist</Link></li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                    <IoMdLogOut   size={25}/> Logout
                    </button>
                  </li>

                </ul>
              </div>
            )}

          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? "0" : "-100%",
          width: "280px",
          height: "100vh",
          background: theme === "dark" ? "#1f1f1f" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          zIndex: 10000,
          transition: "0.3s ease",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)"
        }}
      >

        {/* CLOSE */}
        <div className="d-flex justify-content-between p-3 border-bottom">

          <img
            src="logo_image/logo.png"
            style={{ width: "120px" }}
            alt="logo"
          />

          <button className="btn border-0" onClick={() => setMenuOpen(false)}>
            <IoClose size={28} />
          </button>

        </div>

        {/* LINKS */}
        <div className="d-flex flex-column p-3 gap-3">

          <Link onClick={closeNavbar} to="/" style={{ color: theme === "dark" ? "#fff" : "#000" }}>Products</Link>
          <Link onClick={closeNavbar} to="/category/mobile" style={{ color: theme === "dark" ? "#fff" : "#000" }}>Mobile</Link>
          <Link onClick={closeNavbar} to="/category/laptop" style={{ color: theme === "dark" ? "#fff" : "#000" }}>Laptop</Link>
          <Link onClick={closeNavbar} to="/category/watch" style={{ color: theme === "dark" ? "#fff" : "#000" }}>Watch</Link>
          <Link onClick={closeNavbar} to="/category/headphone" style={{ color: theme === "dark" ? "#fff" : "#000" }}>Headphone</Link>

        </div>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999
          }}
        />
      )}
    </>
  );
};

export default Navebar;