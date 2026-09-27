import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../components/admin/layout/AdminLayout";
import AdminRoute from "../components/auth/AdminRoute";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import SubCategories from "../pages/admin/SubCategories";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Reviews from "../pages/admin/Reviews";
import NewArrivals from "../pages/admin/NewArrivals";
import Homepage from "../pages/admin/Homepage";
import MediaLibraryPage from "../pages/admin/MediaLibrary";
import Settings from "../pages/admin/Settings";
import Analytics from "../pages/admin/Analytics";

function AdminRoutes() {
  return (
    <Routes>

      {/* Admin Login */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>

          {/* /admin → /admin/dashboard */}
          <Route
            path="/admin"
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/admin/categories"
            element={<Categories />}
          />

          <Route
            path="/admin/subcategories"
            element={<SubCategories />}
          />

          <Route
            path="/admin/products"
            element={<Products />}
          />

          <Route
            path="/admin/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="/admin/orders"
            element={<Orders />}
          />

          <Route
            path="/admin/customers"
            element={<Customers />}
          />

          <Route
            path="/admin/reviews"
            element={<Reviews />}
          />

          <Route
            path="/admin/new-arrivals"
            element={<NewArrivals />}
          />

          <Route
            path="/admin/homepage"
            element={<Homepage />}
          />

          <Route
            path="/admin/media"
            element={<MediaLibraryPage />}
          />

          <Route
            path="/admin/analytics"
            element={<Analytics />}
          />

          <Route
            path="/admin/settings"
            element={<Settings />}
          />

        </Route>
      </Route>

    </Routes>
  );
}

export default AdminRoutes;