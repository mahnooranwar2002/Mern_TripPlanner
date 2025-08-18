import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../website/Header";
import Footer from "../website/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginorRegister = () => {
  var [loginedUser, Setuserlogined] = useState({
    email: "",
    password_hash: "",
  });


  var navigate = useNavigate();
  var [reg, UserReg] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    status: null,
    is_admin: null,
  });

  var [error, SetError] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
  });

  const inputHandlereg = (e) => {
    UserReg({ ...reg, [e.target.name]: e.target.value });
  };
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var registerUser = (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      password_hash: "",
      first_name: "",
      last_name: "",
    };
    if (!reg.first_name.trim()) {
      newError.first_name = "first name is required**";
    } 
    if (!/^[a-zA-Z]+$/.test(reg.first_name)) {
      newError.first_name = "First name should only contain letters**";
    }
    if (!reg.last_name.trim()) {
      newError.last_name = "Last name is required  **";
    } else if (!/^[a-zA-Z]+$/.test(reg.last_name)) {
      newError.last_name = "Last name should only contain letters**";
    }
    if (!reg.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(reg.email)) {
      newError.email = "Invalid email address **";
    }
    if (!reg.password_hash.trim()) {
      newError.password_hash = "password is required  **";
    }
    if (
      newError.first_name ||
      newError.last_name ||
      newError.email ||
      newError.password_hash
    ) {
      SetError(newError);
    } else {
      reg.profile_picture = "";
      reg.is_admin = 0;
      reg.status = 1;
      axios
        .post("http://localhost:4000/add_user", reg)
        .then(() => {
          UserReg({
            email: "",
            password_hash: "",
            first_name: "",
            last_name: "",
            profile_picture: "",
            status: null,
            is_admin: null,
          });
          SetError({
            email: "",
            password_hash: "",
            first_name: "",
            last_name: "",
          });
          toast.success("Your account  is created now !", {
            position: "top-right",
          });
          return;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data, { position: "top-right" });
            } else {
              alert(error.response.data);
            }
          } else {
            alert("An unknown error occurred");
          }
        });
    }
  };
  const inputHandleLogin = (e) => {
    Setuserlogined({ ...loginedUser, [e.target.name]: e.target.value });
  };
  var [errorlogined, SetErrorlogined] = useState({
    email: "",
    password_hash: "",
  });
  var logined = (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      password_hash: "",
    };
    if (!loginedUser.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(loginedUser.email)) {
      newError.email = "Invalid email address **";
    }
    if (!loginedUser.password_hash.trim()) {
      newError.password_hash = "password is required  **";
    }
    if (newError.email || newError.password_hash) {
      SetErrorlogined(newError);
    } else {
 axios.post("http://localhost:4000/logined", loginedUser)
  .then((resp) => {
    if (resp.data.userData.status == 1) {
      if (resp.data.userData.is_admin == 0) {
        window.localStorage.setItem("loginedIn", true);
        localStorage.setItem(
          "userLogined",
          JSON.stringify(resp.data.userData._id)
        );
        navigate("/");
      } else if (resp.data.userData.is_admin == 1) {
        window.localStorage.setItem("loginedAdminIn", true);
        localStorage.setItem(
          "userAdmin",
          JSON.stringify(resp.data.userData._id)
        );
        navigate("/admindashboard");
      }
    } else {
      toast.error("The account is deactivated by Admin", {
        position: "top-right",
      });
      return;
    }
  })
  .catch(() => {
    toast.error("Wrong email or password!", {
      position: "top-right",
    });
    return;
  });

    }
  };

  return (
    <div>
      <Header></Header>
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
              <h1 className="mb-3"> Login register </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Login register
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
      <section class="login-register pt-6 pb-6">
        <div class="container">
          <div class="log-main blog-full log-reg w-75 mx-auto">
            <div class="row">
              <div class="col-lg-6 pe-4">
                <h3 class="text-center border-b pb-2">Login</h3>
                <form method="post" onSubmit={logined}>
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      id="fullname"
                      placeholder=" Email Address"
                      onChange={inputHandleLogin}
                      value={loginedUser.email}
                    />
                  </div>
                  {errorlogined.email && (
                    <span className="text-danger">{errorlogined.email}</span>
                  )}
                  <div class="form-group mb-2">
                    <input
                      type="password"
                      name="password_hash"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      onChange={inputHandleLogin}
                      value={loginedUser.password_hash}
                    />
                  </div>
                  {errorlogined.password_hash && (
                    <span className="text-danger">
                      {errorlogined.password_hash}
                    </span>
                  )}
                      <div className="text-center">
  <Link 
    to="/forgetpassword" 
    className="text-decoration-none text-primary"
  >
    Forget Password
  </Link>
</div>

                  <div class="comment-btn mb-2 pb-2 text-center border-b py-2">
                    <input
                      type="submit"
                      class="nir-btn"
                      id="submit1"
                      value="Login"
                    />
                  </div>
                </form>
                {/* <div class="log-reg-button d-sm-flex align-items-center justify-content-between">
                            <button type="submit" class="btn btn-fb w-50 me-1">
                                <i class="fab fa-facebook"></i> Login with Facebook
                            </button>
                            <button type="submit" class="btn btn-google w-50 ms-1">
                                <i class="fab fa-google"></i> Login with Google
                            </button>
                        </div> */}
              </div>
              <div class="col-lg-6 ps-4">
                <h3 class="text-center border-b pb-2">Register</h3>

                <form
                  onSubmit={registerUser}
                  name="contactform2"
                  id="contactform2"
                >
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      name="first_name"
                      class="form-control"
                      id="1"
                      placeholder="First Name"
                      value={reg.first_name}
                      onChange={inputHandlereg}
                    />
                  </div>
                  {error.first_name && (
                    <span className="text-danger">{error.first_name}</span>
                  )}
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      name="last_name"
                      class="form-control"
                      id="email1"
                      placeholder="last Name "
                      value={reg.last_name}
                      onChange={inputHandlereg}
                    />
                  </div>
                  {error.last_name && (
                    <span className="text-danger">{error.last_name}</span>
                  )}
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      id="email1"
                      placeholder="Enter Email  "
                      value={reg.email}
                      onChange={inputHandlereg}
                    />
                  </div>
                  {error.email && (
                    <span className="text-danger">{error.email}</span>
                  )}
                  <div class="form-group mb-2">
                    <input
                      type="password"
                      name="password_hash"
                      class="form-control"
                      id="password1"
                      placeholder="Password"
                      value={reg.password_hash}
                      onChange={inputHandlereg}
                    />
                  </div>
                  {error.password_hash && (
                    <span className="text-danger">{error.password_hash}</span>
                  )}
                  <div class="form-group mb-2 d-flex"></div>
                  <div class="comment-btn mb-2 pb-2 text-center border-b">
                    <input
                      type="submit"
                      class="nir-btn"
                      id="submit3"
                      value="Register"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer></ToastContainer>
      <Footer></Footer>
    </div>
  );
};

export default LoginorRegister;
