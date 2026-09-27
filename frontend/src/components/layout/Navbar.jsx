import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import logo from "../../assets/images/logo.png";
import SearchBar from "../search/SearchBar";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Custom Order", path: "/custom-order" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-pink-100 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          {/* Logo */}

          <Link
            to="/"
            className="hover:scale-105 transition"
          >
            <img
              src={logo}
              alt="Happy Hooks By Esha"
              className="h-12 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-2 bg-pink-50 rounded-full p-2">

            {navLinks.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full transition font-medium ${
                    isActive
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-600 hover:bg-white hover:text-pink-500"
                  }`
                }
              >
                {link.name}
              </NavLink>

            ))}

          </div>

          {/* Right Side */}

          <div className="hidden md:flex items-center gap-4">

            <SearchBar />

            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-2">

              {/* Wishlist */}

              <Link
                to="/wishlist"
                className="relative p-3 rounded-xl hover:bg-white transition"
              >

                <FaHeart
                  size={18}
                  className="text-gray-600 hover:text-pink-500"
                />

                {wishlistCount > 0 && (

                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex justify-center items-center">

                    {wishlistCount}

                  </span>

                )}

              </Link>

              {/* Profile */}

              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white transition group"
              >

                <FaUser
                  size={18}
                  className="text-gray-600 group-hover:text-pink-500"
                />

                <span className="hidden xl:block text-sm font-medium text-gray-600 group-hover:text-pink-500">
                  Profile
                </span>

              </Link>

              {/* Cart */}

              <Link
                to="/cart"
                className="relative p-3 rounded-xl hover:bg-white transition"
              >

                <FaShoppingCart
                  size={18}
                  className="text-gray-600 hover:text-pink-500"
                />

                {cartCount > 0 && (

                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex justify-center items-center">

                    {cartCount}

                  </span>

                )}

              </Link>

            </div>

          </div>

          {/* Mobile */}

          <div className="md:hidden flex items-center gap-4">

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >

              {isMobileMenuOpen ? (

                <FaTimes size={22} />

              ) : (

                <FaBars size={22} />

              )}

            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (

        <div className="md:hidden bg-white border-t border-pink-100 px-6 py-6">

          <SearchBar />

          <div className="flex flex-col mt-6 gap-3">

            {navLinks.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-pink-100 text-pink-600"
                      : "hover:bg-pink-50"
                  }`
                }
              >
                {link.name}
              </NavLink>

            ))}

            <hr className="my-3" />

            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-pink-50"
            >
              <span className="flex items-center gap-3">
                <FaHeart />
                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="bg-pink-500 text-white rounded-full px-2 py-1 text-xs">
                  {wishlistCount}
                </span>
              )}

            </Link>

            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50"
            >
              <FaUser />
              Profile
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-between items-center px-4 py-3 rounded-xl hover:bg-pink-50"
            >
              <span className="flex items-center gap-3">
                <FaShoppingCart />
                Cart
              </span>

              {cartCount > 0 && (
                <span className="bg-pink-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartCount}
                </span>
              )}

            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;