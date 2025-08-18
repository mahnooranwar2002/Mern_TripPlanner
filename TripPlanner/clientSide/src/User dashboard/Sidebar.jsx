import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaCog } from "react-icons/fa";
import { CiCalculator2 } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { BiGridAlt,BiTrip } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaHeart } from "react-icons/fa6";
const Sidebar = ({ isOpen }) => {

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <h2 className="brand">{isOpen ? "Nexus Admin" : "NA"}</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/userDahbard" className="menu-link">
            <FaTachometerAlt className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/categories" className="menu-link">
            <BiGridAlt  className="menu-icon" />
            {isOpen && <span>Categories</span>}
          </Link>
        </li>
        
        
        <li>
          <Link to="/trips" className="menu-link">
            <BiTrip className="menu-icon" />
            {isOpen && <span>Trips Details   </span>}
          </Link>
        </li>
    <li>
          <Link to="/expenses" className="menu-link">
            <CiCalculator2 className="menu-icon" />
            {isOpen && <span>Expense</span>}
          </Link>
        </li>
    <li>
          <Link to="/currency" className="menu-link">
            <FaCalculator className="menu-icon" />
            {isOpen && <span>Currency</span>}
          </Link>
            <Link to="/favDes" className="menu-link">
            <FaHeart  className="menu-icon" />
            {isOpen && <span>Favourite Destination</span>}
          </Link>
          <Link to="/" className="menu-link">
            <CgWebsite className="menu-icon" />
            {isOpen && <span>Back to Webiste</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
