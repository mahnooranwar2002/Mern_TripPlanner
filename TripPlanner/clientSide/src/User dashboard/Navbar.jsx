import React, { useState } from 'react';
import { FaBars, FaEllipsisV } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between">
      <FaBars className="d-md-none" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
      <div className="profile-area position-relative">
        <FaEllipsisV className="profile-icon" onClick={() => setShowMenu(!showMenu)} />
        {showMenu && (
          <ul className="profile-menu shadow">
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        )}
      </div>
    </nav>
    
  );
};

export default Navbar;
