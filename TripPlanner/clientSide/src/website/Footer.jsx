import React from "react";
import "../assets/css/style.css"; // Apka CSS import
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  var navigate = useNavigate();
  return (
    <>
      {/* footer starts */}
      <footer
        className="pt-20 pb-4"
        style={{ backgroundImage: "url('images/background_pattern.png')" }}
      >
        <div
          className="section-shape top-0"
          style={{ backgroundImage: "url('images/shape8.png')" }}
        ></div>

      

        <div className="footer-upper pb-4">
          <div className="container">
            <div className="row">
              {/* About */}
             <div className="col-lg-4 col-md-6 col-sm-12 mb-4 pe-4">
  <div className="footer-about">
    <img src="images/logo-white.png" alt="Trip Planner Logo" />
    <p className="mt-3 mb-3 white">
      Plan your dream journey with us — from destinations to itineraries, we
      make travel simple, exciting, and unforgettable. Your next adventure
      starts here!
    </p>
    <ul>
      <li className="white">
        <strong>Phone:</strong> +47-252-254-2542
      </li>
      <li className="white">
        <strong>Location:</strong> Collins Street, Sydney, Australia
      </li>
      <li className="white">
        <strong>Email:</strong> support@tripplanner.com
      </li>
      <li className="white">
        <strong>Website:</strong> www.tripplanner.com
      </li>
    </ul>
  </div>
</div>


              {/* Quick Links */}
            {/* Quick Links - same as header */}
<div className="col-lg-2 col-md-6 col-sm-12 mb-4">
  <div className="footer-links">
    <h3 className="white">Quick Links</h3>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/Destinationlist">Destinations</Link></li>
      <li><Link to="/forgetpassword">ForgetPassword</Link></li>
      <li><Link to="/Gallery">Gallery</Link></li>
      <li><Link to="/ContactUs">Contact Us</Link></li>
      <li><Link to="/Faq">Faq</Link></li>
    </ul>
  </div>
</div>


              

              {/* Newsletter */}
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="footer-links">
                  <h3 className="white">Newsletter</h3>
                  <div className="newsletter-form">
                    <p className="mb-3">
  Join our family of <strong>200,000+ happy readers</strong> worldwide and get
  exclusive news, special offers, and travel inspiration delivered straight to
  your inbox.
</p>

                    <form
                      action="#"
                      method="get"
                      acceptCharset="utf-8"
                      className="border-0 d-flex align-items-center"
                    >
                      <input type="text" placeholder="Email Address" />
                      <button className="nir-btn ms-2">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="footer-payment">
          <div className="container">
            <div className="row footer-pay align-items-center justify-content-between text-lg-start text-center">
              <div className="col-lg-8 footer-payment-nav mb-4">
                <ul>
                  <li className="me-2">We Support:</li>
                  <li className="me-2">
                    <i className="fab fa-cc-mastercard fs-4"></i>
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-paypal fs-4"></i>
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-stripe fs-4"></i>
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-visa fs-4"></i>
                  </li>
                  <li className="me-2">
                    <i className="fab fa-cc-discover fs-4"></i>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 footer-payment-nav mb-4">
                <ul className="d-flex align-items-center">
                  <li className="me-2 w-75">
                    <select className="niceSelect rounded">
                      <option>English</option>
                      <option>Chinese</option>
                      <option>Russian</option>
                      <option>Japanese</option>
                      <option>Korean</option>
                    </select>
                  </li>
                  <li className="w-25">
                    <select className="niceSelect rounded">
                      <option>$ USD</option>
                      <option>$ AUD</option>
                      <option>$ YEN</option>
                      <option>$ IN</option>
                      <option>$ NP</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        <div id="particles-js"></div>
      </footer>
      {/* footer ends */}
    </>
  );
}

export default Footer;
