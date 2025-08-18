import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const EditTrip = () => {
  var { id } = useParams();
  var [trip, Settrip] = useState({
    user_id: "",
    trip_name: "",
    start_date: "",
    end_date: "",
    destination: "",
    budget: 0,
    category_id: "",
    // budget info
    status: "",
    accommodation: null,
    food: null,
    transport: null,
  });
  var [triperror, Seterror] = useState({
    trip_name: "",
    start_date: "",
    end_date: "",
    destination: "",
    budget: "",
    category_id: "",
    // budget info
    status: "",
    accommodation: "",
    food: "",
    transport: "",
  });
  var [categories, ListCategory] = useState([]);
  var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
  var categorieslist = () => {
    axios
      .get(`http://localhost:4000/fetchcatebyuser/${user_id}`)
      .then((resp) => {
        ListCategory(resp.data);
        console.log(resp.data);
      });
  };
  useEffect(() => {
    categorieslist();
  }, []);
  const inputHandle = (e) => {
    Settrip({ ...trip, [e.target.name]: e.target.value });
  };
  trip.budget =
    Number(trip.food) + Number(trip.accommodation) + Number(trip.transport);
  var addTrip = (e) => {
    e.preventDefault();
    e.preventDefault();
    var errors = {
      trip_name: "",
      start_date: "",
      end_date: "",
      destination: "",

      category_id: "",
      // budget info
      status: "",
      accommodation: "",
      food: "",
      transport: "",
    };
    if (!trip.category_id.trim()) {
      errors.category_id = "The category of trip is required !**";
    }
    if (!trip.trip_name.trim()) {
      errors.trip_name = "The name of trip is required !**";
    }
    if (!trip.start_date.trim()) {
      errors.start_date = "The start date of trip is required !**";
    }
    if (!trip.end_date.trim()) {
      errors.end_date = "The end date of trip is required !**";
    }
    if (!trip.destination.trim()) {
      errors.destination = "The destination of trip is required !**";
    }
    if (!trip.accommodation) {
      errors.accommodation = "The accommodation amount of trip is required !**";
    }
    if (
      isNaN(trip.accommodation) ||
      trip.accommodation <= 0 ||
      !/^\d+(\.\d+)?$/.test(trip.accommodation)
    ) {
      errors.accommodation =
        "The Amount is required and must be a positive number **";
    }

    if (!trip.food) {
      errors.food = "The Food amount of trip is required !**";
    }
    if (
      isNaN(trip.food) ||
      trip.food <= 0 ||
      !/^\d+(\.\d+)?$/.test(trip.food)
    ) {
      errors.food = "The Amount is required and must be a positive number **";
    }

    if (!trip.transport) {
      errors.transport = "The Transport amount of trip is required !**";
    }
    if (
      isNaN(trip.transport) ||
      trip.transport <= 0 ||
      !/^\d+(\.\d+)?$/.test(trip.transport)
    ) {
      errors.transport =
        "The Amount is required and must be a positive number **";
    }
    if (!trip.status.trim()) {
      errors.status = "The Amount is required and must be a positive number **";
    }
    if (
      errors.trip_name ||
      errors.start_date ||
      errors.end_date ||
      errors.destination ||
      errors.accommodation ||
      errors.food ||
      errors.status ||
      errors.transport
    ) {
      Seterror(errors);
    } else {
      trip.user_id = user_id;
      axios
        .put(`http://localhost:4000/updatetrip/${id}`, trip)
        .then((res) => {
          Seterror({
            trip_name: "",
            start_date: "",
            end_date: "",
            destination: "",
            budget: "",
            category_id: "",
            // budget info

            accommodation: null,
            food: null,
            transport: null,
          });
          toast.success("The Trip is updated now !", {
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
  function findTrip() {
    axios.get(`http://localhost:4000/tripFind/${id}`).then((resp) => {
      Settrip(resp.data);
    });
  }
  useEffect(() => {
    findTrip();
  }, []);

  return (
    <>
      <U_index></U_index>
      <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "800px", width: "100%" }}>
    <h3 className="mb-4 fw-bold">Update Trip</h3>

    <form onSubmit={addTrip} className="row g-3">
      
      {/* Category */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Category</label>
        <select
          className={`form-select ${triperror.category_id ? "is-invalid" : ""}`}
          onChange={inputHandle}
          name="category_id"
          value={trip.category_id}
        >
          <option hidden>{trip.category_id || "Select Category"}</option>
          {categories.map((key, index) => (
            <option key={index} value={key.category_name}>
              {key.category_name}
            </option>
          ))}
        </select>
        {triperror.category_id && (
          <div className="invalid-feedback">{triperror.category_id}</div>
        )}
      </div>

      {/* Trip Name */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Trip Name</label>
        <input
          type="text"
          className={`form-control ${triperror.trip_name ? "is-invalid" : ""}`}
          placeholder="Enter Trip Name"
          name="trip_name"
          onChange={inputHandle}
          value={trip.trip_name}
        />
        {triperror.trip_name && (
          <div className="invalid-feedback">{triperror.trip_name}</div>
        )}
      </div>

      {/* Start Date */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Start Date</label>
        <input
          type="date"
          className={`form-control ${triperror.start_date ? "is-invalid" : ""}`}
          name="start_date"
          min={new Date().toISOString().split("T")[0]}
          onChange={inputHandle}
          value={trip.start_date}
        />
        {triperror.start_date && (
          <div className="invalid-feedback">{triperror.start_date}</div>
        )}
      </div>

      {/* End Date */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">End Date</label>
        <input
          type="date"
          className={`form-control ${triperror.end_date ? "is-invalid" : ""}`}
          name="end_date"
          min={new Date().toISOString().split("T")[0]}
          onChange={inputHandle}
          value={trip.end_date}
        />
        {triperror.end_date && (
          <div className="invalid-feedback">{triperror.end_date}</div>
        )}
      </div>

      {/* Destination */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Destination</label>
        <input
          type="text"
          className={`form-control ${triperror.destination ? "is-invalid" : ""}`}
          placeholder="Enter Destination"
          name="destination"
          onChange={inputHandle}
          value={trip.destination}
        />
        {triperror.destination && (
          <div className="invalid-feedback">{triperror.destination}</div>
        )}
      </div>

      {/* Status */}
      <div className="col-md-6">
        <label className="form-label fw-semibold">Status</label>
        <select
          className={`form-select ${triperror.status ? "is-invalid" : ""}`}
          value={trip.status}
          onChange={inputHandle}
          name="status"
        >
          <option value="Planned">Planned</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {triperror.status && (
          <div className="invalid-feedback">{triperror.status}</div>
        )}
      </div>

      {/* Budget Details */}
      <div className="col-12">
        <h5 className="fw-bold mt-3">Budget Details</h5>
      </div>

      <div className="col-md-4">
        <label className="form-label fw-semibold">Accommodation</label>
        <input
          type="text"
          className={`form-control ${triperror.accommodation ? "is-invalid" : ""}`}
          placeholder="Enter Amount"
          name="accommodation"
          onChange={inputHandle}
          value={trip.accommodation}
        />
        {triperror.accommodation && (
          <div className="invalid-feedback">{triperror.accommodation}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label fw-semibold">Food</label>
        <input
          type="text"
          className={`form-control ${triperror.food ? "is-invalid" : ""}`}
          placeholder="Enter Amount"
          name="food"
          onChange={inputHandle}
          value={trip.food}
        />
        {triperror.food && (
          <div className="invalid-feedback">{triperror.food}</div>
        )}
      </div>

      <div className="col-md-4">
        <label className="form-label fw-semibold">Transport</label>
        <input
          type="text"
          className={`form-control ${triperror.transport ? "is-invalid" : ""}`}
          placeholder="Enter Amount"
          name="transport"
          onChange={inputHandle}
          value={trip.transport}
        />
        {triperror.transport && (
          <div className="invalid-feedback">{triperror.transport}</div>
        )}
      </div>

      {/* Total Budget */}
      <div className="col-12 text-end fw-bold fs-5">
        Total Budget: {trip.budget}
      </div>

      {/* Submit */}
      <div className="col-12">
        <button type="submit" className="submit-btn w-100 fw-semibold">
          Save
        </button>
      </div>

    </form>
  </div>
</div>

    </>
  );
};

export default EditTrip;
