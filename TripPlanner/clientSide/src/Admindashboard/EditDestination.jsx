
import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const EditDestination = () => {
    var {id}=useParams()
       const [imgError, setImgError] = useState("");
  var [destination, Setdestination] = useState({ });

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
 
  var findDes =()=>{
axios.get(`http://localhost:4000/destinationfind/${id}`).then((resp)=>{
   Setdestination(resp.data);
})
  }
  useEffect(()=>{
    findDes();
    console.log(id)
  },[id])
  function addDestion(e){
e.preventDefault();
var newError= {
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    status: "",
    image_url: "",    
}
if(!destination.name.trim()){
    newError.name="The destination is required ** "

}
if(!destination.name.trim()){
    newError.name="The destination is required ** "
}
if (
  isNaN(destination.longitude) ||
  destination.longitude <= 0 ||
  !/^\d+(\.\d+)?$/.test(destination.longitude)
) {
  newError.longitude = "The longitude is required and must be a positive number **";
}
if (
  isNaN(destination.latitude) ||
  destination.latitude <= 0 ||
  !/^\d+(\.\d+)?$/.test(destination.latitude)
) {
  newError.latitude = "The latitude is required and must be a positive number **";
}
if(!destination.description.trim()){
    newError.description="The description is required ** "
}

if(!destination.status){
    newError.status="The status is required ** "
}

if(newError.name ||  newError.longitude || newError.description|| newError.latitude){
    SetError(newError)
}
else{
   axios.put(`http://localhost:4000/updatedestination/${id}`, destination, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
   }).then(() => {
                SetError({
                  email: "",
                  first_name: "",
                  last_name: "",
                });
                toast.success("The destination   is updated  now !", {
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
              })

            }
    

        }



  return (
    <div>
      <Admin_Index></Admin_Index>
  <div className="form-container p-4 border rounded shadow-sm bg-white">
  <h2 className="form-title mb-4">Update Destination</h2>
  <img
    src={`/images/${destination.image_url}`}
    alt=""
    className="img-fluid mb-4 rounded"
    style={{ maxHeight: "400px", objectFit: "cover" }}
  />

  <form className="form-content" onSubmit={addDestion}>
    {/* Destination Name */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Destination Name</label>
      <div className="col-sm-9">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Destination Name"
          name="name"
          value={destination.name}
          onChange={inputHandle}
        />
        {error.name && <span className="text-danger">{error.name}</span>}
      </div>
    </div>

    {/* Longitude */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Longitude</label>
      <div className="col-sm-9">
        <input
          type="text"
          className="form-control"
          placeholder="Enter longitude"
          name="longitude"
          value={destination.longitude}
          onChange={inputHandle}
        />
        {error.longitude && <span className="text-danger">{error.longitude}</span>}
      </div>
    </div>

    {/* Latitude */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Latitude</label>
      <div className="col-sm-9">
        <input
          type="text"
          className="form-control"
          placeholder="Enter latitude"
          name="latitude"
          value={destination.latitude}
          onChange={inputHandle}
        />
        {error.latitude && <span className="text-danger">{error.latitude}</span>}
      </div>
    </div>

    {/* Image */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Image</label>
      <div className="col-sm-9">
        <input
          type="file"
          className="form-control"
          name="image_url"
          onChange={handleFile}
        />
        {imgError && <span className="text-danger">{imgError}</span>}
      </div>
    </div>

    {/* Status */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Status</label>
      <div className="col-sm-9">
        <select
          className="form-select"
          name="status"
          onChange={inputHandle}
        >
          <option>Select status</option>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        {error.status && <span className="text-danger">{error.status}</span>}
      </div>
    </div>

    {/* Description */}
    <div className="row mb-3 align-items-center">
      <label className="col-sm-3 col-form-label">Description</label>
      <div className="col-sm-9">
        <textarea
          className="form-control"
          name="description"
          value={destination.description}
          onChange={inputHandle}
        ></textarea>
        {error.description && <span className="text-danger">{error.description}</span>}
      </div>
    </div>

    {/* Submit Button */}
    <div className="text-end">
      <button type="submit" className="btn btn-primary px-4">
        Save
      </button>
    </div>
  </form>
</div>

    </div>
  )
}

export default EditDestination
