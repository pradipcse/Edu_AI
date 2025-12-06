// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi"; // AI icon
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            {/* Rotating Icon */}
            <GiArtificialIntelligence className="text-indigo-600 text-3xl animate-spin-slow" />
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              EduAI
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About Us", "Services", "Dashboard"].map((item, i) => (
              <Link
                key={i}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "")}`}
                className="text-gray-700 font-medium relative group transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth/Profile */}
          <div className="flex items-center space-x-4 relative">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 border border-indigo-500 text-indigo-500 font-semibold rounded-lg hover:bg-indigo-50 hover:scale-105 transition transform duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:scale-105 transition-transform duration-200"
                >
                  <FaUserCircle className="text-3xl text-indigo-600 hover:text-purple-500 transition-colors duration-300" />
                  <span className="hidden md:block font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-lg py-2 z-50 animate-slide-down">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extra CSS Animations */}
      <style>{`
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.2s ease-out forwards; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
      `}</style>
    </nav>
  );
}
