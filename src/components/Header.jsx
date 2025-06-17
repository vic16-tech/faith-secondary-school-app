import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiBookOpen,
  FiAward,
  FiLogIn,
  FiUserPlus,
  FiShield
} from "react-icons/fi";
import '../index.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-serif w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900 hover:scale-105 transition duration-300"
          title="Faith Secondary"
        >
          <div className="bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 p-2 rounded-full shadow-lg">
            <FiShield size={22} className="text-white" />
          </div>
          <span className="font-bold tracking-tight text-base xs:text-lg font-gro hidden xs:inline">
            FSS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-800 text-sm font-medium font-inter">
          <Link to="/" className="hover:text-indigo-700 transition">Home</Link>
          <Link to="/AboutFaith" className="hover:text-indigo-700 transition">About</Link>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-1 hover:text-indigo-700 transition">
              Academics <FiChevronDown size={14} />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-md w-48 z-50"
                >
                  <Link to="/admission" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm">
                    <FiBookOpen /> Admissions
                  </Link>
                  <Link to="/results" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm">
                    <FiAward /> Results
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* Auth Buttons */}
          <div className="ml-4 flex space-x-2">
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-800 rounded hover:bg-gray-100 text-sm"
            >
              <FiLogIn size={14} /> Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 px-3 py-1.5 border border-indigo-700 text-indigo-700 rounded hover:bg-indigo-50 text-sm"
            >
              <FiUserPlus size={14} /> Register
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-gray-900">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 text-gray-800 font-inter w-full"
          >
            <Link to="/" onClick={toggleMobileMenu} className="block">Home</Link>
            <Link to="/about" onClick={toggleMobileMenu} className="block">About</Link>
            <Link to="/admission" onClick={toggleMobileMenu} className="flex items-center gap-2">
              <FiBookOpen /> Admissions
            </Link>
            <Link to="/results" onClick={toggleMobileMenu} className="flex items-center gap-2">
              <FiAward /> Results
            </Link>
            <Link to="/contact" onClick={toggleMobileMenu} className="block">Contact</Link>
            <Link to="/login" onClick={toggleMobileMenu} className="flex items-center gap-2">
              <FiLogIn /> Login
            </Link>
            <Link to="/register" onClick={toggleMobileMenu} className="flex items-center gap-2">
              <FiUserPlus /> Register
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
