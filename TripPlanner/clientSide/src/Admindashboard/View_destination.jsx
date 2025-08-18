import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const View_destination = () => {
      var [destination, Setdestination] = useState({ });
      var {id}=useParams()
      var findDes =()=>{
axios.get(`http://localhost:4000/destinationfind/${id}`).then((resp)=>{
   Setdestination(resp.data);
})
  }
  useEffect(()=>{
    findDes();
  },[id])
  return (

    <>
          <Admin_Index />
  
<div className="container my-5 d-flex justify-content-center">
  <div
    className="card shadow-lg border-0"
    style={{
      maxWidth: "800px",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "#fff"
    }}
  >
    {/* Image Section */}
    <img
      src={`/images/${destination.image_url}`}
      alt={destination.name}
      style={{
        width: "100%",
        height: "400px",
        objectFit: "cover"
      }}
    />

    {/* Details Section */}
    <div className="card-body p-5">
      <h2 className="fw-bold mb-3 text-center">{destination.name}</h2>

      <div className="d-flex justify-content-center gap-4 mb-3">
        <span className="badge bg-primary fs-6">
          Longitude: {destination.longitude}
        </span>
        <span className="badge bg-info text-dark fs-6">
          Latitude: {destination.latitude}
        </span>
      </div>

      <p className="text-muted fs-5 text-center mb-4">
        {destination.description}
      </p>

      <div className="text-center">
        <span
          className={`badge px-4 py-2 fs-5 ${
            destination.status === 1 ? "bg-success" : "bg-danger"
          }`}
        >
          {destination.status === 1 ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  </div>
</div>

  </>
  )
}

export default View_destination
