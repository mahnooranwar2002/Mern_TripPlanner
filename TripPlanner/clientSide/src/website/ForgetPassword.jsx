import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Header from './Header'
import Footer from './Footer'

const ForgetPassword = () => {
    var [forgetPassword,ForgetpassSet]=useState({
         email: "",
    password_hash: ""
    
    })

  var [error, SetError] = useState({
    email: "",
    password_hash: "",})
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputHandle = (e) => {
    
    ForgetpassSet({ ...forgetPassword, [e.target.name]: e.target.value });
  };
    var forget_pass = async  (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      password_hash: "",
    
    };
  
    if (!forgetPassword.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(forgetPassword.email)) {
      newError.email = "Invalid email address **";
    }
    if (!forgetPassword.password_hash.trim()) {
      newError.password_hash = "password is required  **";
    }
    if (
 
      newError.email ||
      newError.password_hash
    ) {
      SetError(newError);
    } else {

  try {
    const response = await axios.put("http://localhost:4000/forgetPassword", forgetPassword);
    toast.success("Your password has been updated successfully!", {
      position: "top-right",
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data, { position: "top-right" });
      } else {
        toast.error(`An error occurred: ${error.response.status} - ${error.response.data}`, { position: "top-right" });
      }
    } else {
      toast.error("An unknown error occurred", { position: "top-right" });
    }
  
};

}
    }
  return (
<>
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
              <h1 className="mb-3">Forget Password</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Forget Password
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

 <section className="login-register pt-6 pb-6">
  <div className="container">
    <div className="log-main blog-full log-reg w-75 mx-auto">
      <div className="row">
        <div className="col-lg-12 ps-4">
          <h3 className="text-center border-b pb-2">Forget Password</h3>

          <form onSubmit={forget_pass}>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                onChange={inputHandle}
                required
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                name="password_hash"
                className="form-control"
                placeholder="Enter your new password"
                onChange={inputHandle}
                required
              />
              {error.password_hash && (
                <span className="text-danger">{error.password_hash}</span>
              )}
            </div>

            <div className="comment-btn text-center">
              <button type="submit" className="nir-btn">
               Update
              </button>
            </div>
          </form>

          {/* Backend message if needed */}
        

          <ToastContainer />
        </div>
      </div>
    </div>
  </div>
</section>
<Footer></Footer>
</>    
  )
}

export default ForgetPassword
