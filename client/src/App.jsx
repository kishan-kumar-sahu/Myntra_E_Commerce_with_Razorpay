import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";

import ProductDetails from "./components/product/ProductDetails";
import Navebar from "./components/Navebar";
import SearchProduct from "./components/product/SearchProduct";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryProduct from "./components/product/CategoryProduct";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import OrderConformation from "./components/OrderConformation";
import TrackOrderPage from "./components/TrackOrderPage";
import MyOrder from "./components/MyOrder";
import AdminDashboard from "./components/Admin Side/pages/AdminDashboard";

import AdminNavbar from "./components/Admin Side/pages/AdminNavbar";

import NavbarUserAndAdmin from "./components/NavbarUserAndAdmin";

import Orders from "./components/Admin Side/pages/Orders";

import Products from "./components/Admin Side/pages/Products";

import Users from "./components/Admin Side/pages/Users";

import AddProduct from "./components/Admin Side/pages/AddProduct";
import AdminStatusUpdate from "./components/Admin Side/pages/AdminStatusUpdate";
import View from "./components/Admin Side/pages/View";
import ProductEdit from "./components/Admin Side/pages/ProductEdit";

import CancilMyOrder from "./components/CancelMyOrder";
import CancelMyOrder from "./components/CancelMyOrder";
import EditProfile from "./components/user/EditProfile";
import Allwishlist from "./components/Allwishlist";
import EditAddress from "./components/EditAddress";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarUserAndAdmin />

        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/search/:item" element={<SearchProduct />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/category/:categoryName" element={<CategoryProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/edit/profile"
            element={<EditProfile></EditProfile>}
          ></Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="/address" element={<Address />} />
          <Route
            path="/edit/address"
            element={<EditAddress></EditAddress>}
          ></Route>

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orderconfirmation" element={<OrderConformation />} />

          <Route path="/trackorder/:orderId" element={<TrackOrderPage />} />

          <Route path="/myorder/:orderId" element={<MyOrder />} />
          
          <Route path="/myorder" element={<MyOrder />} />



          {/* this section is use for admin panel */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<Products />} />

          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/addproduct" element={<AddProduct />} />

          <Route
            path="/adminStatusUpdate/:orderId"
            element={<AdminStatusUpdate />}
          />

          <Route path="/adminView/:orderId" element={<View />} />

          {/*   edit product   */}

          <Route path="/productEdit/:id" element={<ProductEdit />} />

          {/*   wishlist */}

          <Route path="/wishlist" element={<Allwishlist></Allwishlist>}></Route>

          {/* cancil my order */}

          <Route
            path="/tracking/cancelOrder/:orderId"
            element={<CancelMyOrder />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
