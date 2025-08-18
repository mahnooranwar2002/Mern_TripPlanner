import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    var {id}=useParams()
      var [category, SetCategory] = useState({ category_name: "" , user_id: "",status:null });
  var [categoryError, SetCategoryError] = useState({ category_name: "" });

  const inputHandle = (e) => {
    SetCategory({ ...category, [e.target.name]: e.target.value });
  };
  function findCategory(){
    axios.get(`http://localhost:4000/find_categories/${id}`).then((resp)=>{
        SetCategory(resp.data)
    })
  }
useEffect(()=>{
    findCategory();
},[])
  
  function editCategory(e) {
    e.preventDefault();
    var errors = {
      category_name: "",
      status: null,
      
    };
    if (!category.category_name.trim()) {
      errors.category_name = "The name is required**";
    }
  if (category.category_name.trim().length < 3) {
  errors.category_name = "The name length must be at least 3 characters**";
}
if (!isNaN(category.category_name)) {
  errors.category_name = "The name must be a string, not a number**";
}
   if (!category.status) {
      errors.status = "The status is required**";
    }
    if (errors.category_name|| errors.status) {
      SetCategoryError(errors);
    } else {
      category.user_id =JSON.parse(window.localStorage.getItem("userLogined"));
    axios.put(`http://localhost:4000/updatecategory/${id}`, category).then(() => {
  SetCategoryError({category_name:""});

      toast.success("The category is Update now !", {
        position: "top-right",
      });
      return;
    }
  ).catch((error) => {
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
   <>
      <U_index></U_index>
      <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h3 className="mb-4 fw-bold ">Update Category</h3>
        
        <form onSubmit={editCategory} className="row g-3">

          {/* Category Name */}
          <div className="col-12">
            <label className="form-label fw-semibold">Category Name</label>
            <input
              type="text"
              className={`form-control ${categoryError.category_name ? "is-invalid" : ""}`}
              placeholder="Enter category name"
              name="category_name"
              onChange={inputHandle}
              value={category.category_name}
            />
            {categoryError.category_name && (
              <div className="invalid-feedback">{categoryError.category_name}</div>
            )}
          </div>

          {/* Status */}
          <div className="col-12">
            <label className="form-label fw-semibold">Status</label>
            <select
              className={`form-select ${categoryError.status ? "is-invalid" : ""}`}
              name="status"
              onChange={inputHandle}
              value={category.status}
            >
              <option value="">Select status</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            {categoryError.status && (
              <div className="invalid-feedback">{categoryError.status}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="submit-btn w-100 fw-semibold">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
 </>
  )
}

export default EditCategory


