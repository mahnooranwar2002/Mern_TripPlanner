import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
function ContactSection() {
  var [contactData, SetcontactData] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });

  var [error, SetError] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputHandleLogin = (e) => {
    SetcontactData({ ...contactData, [e.target.name]: e.target.value });
  };
  function Add_contact(e) {
    e.preventDefault();
    var newError = {
      name: "",
      email: "",
      contact_number: "",
      message: "",
    };
    if (!contactData.name.trim()) {
      newError.name = "the name is required **";
    } else if (contactData.name.length < 3) {
      newError.name = "the name is must be long then 3 aphabelt !";
    }
    if (!contactData.email.trim()) {
      newError.email = "the email is required !";
    } else if (!emailRegex.test(contactData.email)) {
      newError.email = "Invalid email address **";
    } 
    if (!contactData.contact_number.trim()) {
      newError.contact_number = " the contact number is required**";
    } else if (
    contactData.contact_number.length < 11 ||
      contactData.contact_number.length > 11
    ) {
      newError.contact_number = "The contact Number must be 11 digit long !";
    } else if (!/^[0-9+()\- ]+$/.test(contactData.contact_number)) {
      newError.contact_number =
        "The contact number should only contain numbers and special characters**";
    }
    if (!contactData.message.trim()) {
      newError.message = " the  mmassage is required**";
    }
    if (newError.name || newError.email || newError.contact_number||newError.message) {
      SetError(newError);
    } else {
      axios.post("http://localhost:4000/addcontact", contactData).then(() => {
        toast.success("Thankyou for contact us we response as soon as possible !", {
          position: "top-right",
        });
        SetError({
          name: "",
          email: "",
          contact_number: "",
          message: "",
        });

        SetcontactData({
          name: "",
          email: "",
          contact_number: "",
          message: "",
        });
      });
    }
  }
  return (
    <>
      <Header />
      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{ backgroundImage: "url('images/bg/bg1.jpg')" }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{ backgroundImage: "url('images/shape8.png')" }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">Contact Us</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
      <section className="contact-main pt-6 pb-60">
        <div className="container">
          <div className="contact-info-main mt-0">
            <div className="row">
              <div className="col-lg-10 col-offset-lg-1 mx-auto">
                <div className="contact-info bg-white">
                  {/* Title */}
                  <div className="contact-info-title text-center mb-4 px-5">
  <h3 className="mb-1">Get in Touch With Us</h3>
  <p className="mb-0">
    Have questions or need help planning your next adventure? Our team is here
    to guide you every step of the way.
  </p>
</div>


                  {/* Info Items */}
                  <div className="contact-info-content row mb-1">
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                        <div className="info-icon mb-2">
                          <i className="fa fa-map-marker-alt theme"></i>
                        </div>
                        <div className="info-content">
                          <h3>Office Location</h3>
                          <p className="m-0">
                            445 Mount Eden Road, Mt Eden Basundhara Chakrapath
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                        <div className="info-icon mb-2">
                          <i className="fa fa-phone theme"></i>
                        </div>
                        <div className="info-content">
                          <h3>Phone Number</h3>
                          <p className="m-0">977-444-666-888</p>
                          <p className="m-0">977-444-222-000</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 mb-4">
                      <div className="info-item bg-lgrey px-4 py-5 border-all text-center rounded">
                        <div className="info-icon mb-2">
                          <i className="fa fa-envelope theme"></i>
                        </div>
                        <div className="info-content ps-4">
                          <h3>Email Address</h3>
                          <p className="m-0">info@realshield.com</p>
                          <p className="m-0">help@realshield.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form + Map */}
                  <div id="contact-form1" className="contact-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="map rounded overflow-hiddenb rounded mb-md-4">
                          <div style={{ width: "100%" }}>
                            <iframe
                              height="500"
                              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+(mangal%20bazar)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                              style={{ border: 0, width: "100%" }}
                              allowFullScreen
                              loading="lazy"
                              title="Google Map"
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div id="contactform-error-msg"></div>

                        <form
                          method="post"
                          onSubmit={Add_contact}
                          name="contactform2"
                          id="contactform2"
                        >
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="name"
                              onChange={inputHandleLogin}
                              className="form-control"
                              id="fullname"
                              placeholder=" Name"
                              value={contactData.name}
                            />
                          </div>
                          {error.name && (
                            <span className="text-danger">{error.name}</span>
                          )}
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="email"
                              onChange={inputHandleLogin}
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              value={contactData.email}
                            />
                          </div>
                          {error.email && (
                            <span className="text-danger">{error.email}</span>
                          )}
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="contact_number"
                              className="form-control"
                              onChange={inputHandleLogin}
                              id="phnumber"
                              placeholder="Phone"
                              value={contactData.contact_number}
                            />
                          </div>
                          {error.contact_number && (
                            <span className="text-danger">
                              {error.contact_number}
                            </span>
                          )}
                          <div className="textarea mb-2">
                            <textarea
                              name="message"
                              placeholder="Enter a message"
                              className="form-control"
                              value={contactData.message}
                              onChange={inputHandleLogin}
                            ></textarea>
                          </div>
                          {error.message && (
                            <span className="text-danger">{error.message}</span>
                          )}

                          <div className="comment-btn text-center">
                            <input
                              type="submit"
                              className="nir-btn"
                              id="submit2"
                              value="Send Message"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* End Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer></ToastContainer>
      <Footer />
    </>
  );
}

export default ContactSection;
