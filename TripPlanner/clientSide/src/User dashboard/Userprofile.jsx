import U_index from "./U_index";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Userprofile = () => {
  const [imgError, setImgError] = useState("");
  var Islogined = JSON.parse(window.localStorage.getItem("userLogined"));
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var [reg, UserReg] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    status: null,
    is_admin: null,
  });

  useEffect(() => {
    if (Islogined) {
      axios.get(`http://localhost:4000/userFetch/${Islogined}`).then((resp) => {
        UserReg(resp.data);
        console.log(resp.data);
      });
    }
  }, []);

  const inputHandlereg = (e) => {
    UserReg({ ...reg, [e.target.name]: e.target.value });
  };
  var [error, SetError] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      setImgError("Invalid image! Please upload a JPG, JPEG, or PNG file.");
      return;
    }
    setImgError("");
    UserReg((prev) => ({ ...prev, image: file }));
  };

  var userUpdate = (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      password_hash: "",
      first_name: "",
      last_name: "",
      profile_picture: "",
    };
    if (!reg.first_name.trim()) {
      newError.first_name = "first name is required**";
    } else if (!/^[a-zA-Z]+$/.test(reg.first_name)) {
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
      axios
        .put(`http://localhost:4000/updateuser/${Islogined}`, reg, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          SetError({
            email: "",
            first_name: "",
            last_name: "",
          });
          toast.success("Your account  is updated now !", {
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

  return (
    <div>
      <U_index></U_index>
      <div className="form-container">
        <h2 className="form-title">Update Profile</h2>
        <div className="text-center mb-3">
          {reg.profile_picture ? (
            <img
              src={`/images/${reg.profile_picture}`}
              alt="User"
              width={60}
              height={60}
              className="rounded-circle m-2"
            />
          ) : (
            <img
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
              alt="Default"
              width={60}
              height={60}
            />
          )}
        </div>
        <form className="form-content" onSubmit={userUpdate}>
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
              readOnly
              onChange={inputHandlereg}
            />
          </div>
          {error.email && <span className="text-danger">{error.email}</span>}
          <div class="form-group mb-2">
            <input
              type="file"
              name="profile_picture"
              class="form-control"
              id="password1"
              placeholder="Password"
              onChange={handleFile}
            />
          </div>
          {imgError && <span className="text-danger">{imgError}</span>}

          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userprofile;
