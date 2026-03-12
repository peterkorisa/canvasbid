import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm w-full fixed top-0 left-0 z-50">

      {/* Left Section */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/artworks">Artworks</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Canvas Bid
        </Link>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/artworks">Artworks</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Right Buttons */}
      <div className="navbar-end gap-2">
        <Link to="/login" className="btn btn-outline">Login</Link>
        <Link to="/register" className="btn btn-primary text-white">Register</Link>
      </div>

    </div>
  )
}

export default Navbar