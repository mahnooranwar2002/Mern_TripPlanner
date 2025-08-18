import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
const Headerdashboard = ({ toggleSidebar }) => {
  var navigate = useNavigate();
  var Islogined = JSON.parse(window.localStorage.getItem("userAdmin"));

  var [user, Setuserdata] = useState({});
  useEffect(() => {
    if (Islogined) {
      axios.get(`http://localhost:4000/userFetch/${Islogined}`).then((resp) => {
        Setuserdata(resp.data);
      });
    }
  }, []);

  var logout = () => {
    window.localStorage.removeItem("userLogined");
    window.localStorage.setItem("loginedIn", false);
    navigate("/");
  };
  return (
    <div className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <FaBars size={22} className="toggle-icon" onClick={toggleSidebar} />
        <h3 className="topbar-title">Admin Panel</h3>
      </div>

      {/* Right - Bootstrap Dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle d-flex align-items-center"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Link to={"/noti"}>
            <FiBell className="text-black fs-6" />
          </Link>
          {user.profile_picture ? (
            <img
              src={`/images/${user.profile_picture}`}
              alt="User"
              width={30}
              height={30}
              className="rounded-circle m-2"
            />
          ) : (
            <img
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
              alt="Default"
              width={30}
              height={30}
            />
          )}

          <span className="profile-name">{user.first_name}</span>
        </button>

        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="profileDropdown"
        >
          <li>
            <Link className="dropdown-item " to={"/Admin_profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item " to={"/Admin_noti"}>
              Notifaction
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item text-danger" href="#" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Headerdashboard;
