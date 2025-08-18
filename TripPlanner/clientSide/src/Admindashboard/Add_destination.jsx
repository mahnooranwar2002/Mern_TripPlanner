import React, { useState } from "react";
import Admin_Index from "./Admin_Index";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Add_destination = () => {
  const [imgError, setImgError] = useState("");
  var Islogined = JSON.parse(window.localStorage.getItem("userAdmin"));
  var [destination, Setdestination] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    status: "",
    image_url: "",
    user_id: Islogined,
  });

  const inputHandle = (e) => {
    Setdestination({ ...destination, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      setImgError("Invalid image! Please upload a JPG, JPEG, or PNG file.");
      return;
    }
    setImgError("");
    Setdestination((prev) => ({ ...prev, image: file }));
  };

  var [error, SetError] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    status: "",
    image_url: "",
  });
  function addDestion(e) {
    e.preventDefault();
    var newError = {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      status: "",
      image_url: "",
    };
    if (!destination.name.trim()) {
      newError.name = "The destination is required ** ";
    }
    if (!destination.name.trim()) {
      newError.name = "The destination is required ** ";
    }
    if (
      isNaN(destination.longitude) ||
      destination.longitude <= 0 ||
      !/^\d+(\.\d+)?$/.test(destination.longitude)
    ) {
      newError.longitude =
        "The longitude is required and must be a positive number **";
    }
    if (
      isNaN(destination.latitude) ||
      destination.latitude <= 0 ||
      !/^\d+(\.\d+)?$/.test(destination.latitude)
    ) {
      newError.latitude =
        "The latitude is required and must be a positive number **";
    }
    if (!destination.description.trim()) {
      newError.description = "The description is required ** ";
    }

    if (!destination.status) {
      newError.status = "The status is required ** ";
    }

    if (
      newError.name ||
      newError.longitude ||
      newError.description ||
      newError.latitude
    ) {
      SetError(newError);
    } else {
      axios
        .post(`http://localhost:4000/adddestination`, destination, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          SetError({
            name: "",
            description: "",
            latitude: "",
            longitude: "",
            status: "",
            image_url: "",
          });
          Setdestination({
            name: "",
            description: "",
            latitude: "",
            longitude: "",
            status: "",
            image_url: "",
            user_id: Islogined,
          });
          toast.success("The destination   is added  now !", {
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
  }

  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="form-container">
        <h2 className="form-title">Add New Destination</h2>
        <form className="form-content" onSubmit={addDestion}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Destination Name"
              name="name"
              onChange={inputHandle}
            />
          </div>
          {error.name && <span className="text-danger">{error.name}</span>}

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter longitude"
              name="longitude"
              onChange={inputHandle}
              value={destination.longitude}
            />
          </div>
          {error.longitude && (
            <span className="text-danger">{error.longitude}</span>
          )}
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter latitude "
              name="latitude"
              onChange={inputHandle}
              value={destination.latitude}
            />
          </div>
          {error.latitude && (
            <span className="text-danger">{error.latitude}</span>
          )}
          <div className="form-group">
            <input
              type="file"
              placeholder="Enter Trip Name"
              name="image_url"
              onChange={handleFile}
            />
          </div>
          {imgError && <span className="text-danger">{imgError}</span>}

          <div className="form-group">
            <select name="status" onChange={inputHandle}>
              <option> Select status</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          {error.status && <span className="text-danger">{error.status}</span>}
          <div className="form-group">
            <textarea
              placeholder="Enter description"
              name="description"
              id=""
              onChange={inputHandle}
              value={destination.description}
            ></textarea>
          </div>
          {error.description && (
            <span className="text-danger">{error.description}</span>
          )}
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_destination;
