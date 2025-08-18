import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../assets/css/style.css";
import axios from "axios";
const Header = () => {
  var navigate = useNavigate();
  var Islogined = JSON.parse(window.localStorage.getItem("userLogined"));
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
    <header className="main_header_area">
      <div className="header-content py-1 bg-theme"></div>

      {/* Navigation Bar */}
      <div className="header_menu" id="header_menu">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-flex d-flex  align-items-center justify-content-between w-100 pb-3 pt-3">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  <img src="images/logo.png" alt="logo" />
                </Link>
              </div>

              {/* Nav Links */}
              <div
                className="navbar-collapse1 d-flex align-items-center"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav" id="responsive-menu">
                  <li className="dropdown submenu ">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>

                  {/* Destinations Dropdown */}
                  <li className="submenu dropdown">
                    <Link to="/Destinationlist">
                      Destinations{" "}
                      <i className="icon-arrow-down" aria-hidden="true"></i>
                    </Link>
                  </li>
                 
                  {/* Contact */}
                  <li>
                    <Link to="/Gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/ContactUs">Contact Us</Link>
                  </li>

                  <li>
                    <Link to="/Faq">Faq </Link>
                  </li>
                  {/* User Profile Dropdown */}
                  {Islogined ? (
                    <span>
                      <li className="submenu dropdown">
                        <Link to="#">
                          {user.first_name}
                          <i className="icon-arrow-down" aria-hidden="true"></i>
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            {/* <Link to="/tour-list">Tour List</Link> */}
                          </li>
                          <li>
                            <Link to="/userDahbard"> Control Panel </Link>
                          </li>
                          <li>
                            <li>
                              <Link onClick={() => logout()}>Logout</Link>
                            </li>
                          </li>
                        </ul>
                      </li>
                    </span>
                  ) : (
                    <li >
                      <Link to="/loginregister" className="">
                        Join
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Right Buttons */}
              {/* <div className="register-login d-flex align-items-center">
                
                <Link to="/Booking" className="nir-btn white">Book Now</Link>
              </div> */}
              {/* <div className="register-login d-flex align-items-center">
                
                <Link to="/Destinationlist" className="nir-btn white">Book Now</Link>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
