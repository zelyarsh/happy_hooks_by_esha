import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Checkout from "../pages/Checkout";
import CustomOrder from "../pages/CustomOrder";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/custom-order" element={<CustomOrder />} />

        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;