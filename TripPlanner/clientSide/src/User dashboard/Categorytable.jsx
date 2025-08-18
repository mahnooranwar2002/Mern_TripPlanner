import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Categorytable = () => {
  var [categories, ListCategory] = useState([]);
  var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
  var categorieslist = () => {
    axios
      .get(`http://localhost:4000/usercategories/${user_id}`)
      .then((resp) => {
        ListCategory(resp.data);
      });
  };
 
  var del_cat = (id) => {
    axios.delete(`http://localhost:4000/delcategory/${id}`).then(() => {
      toast.error("The category is deleted now !", {
        position: "top-right",
      });
    });
  };
  var status_cat = (id) => {
    axios.put(`http://localhost:4000/statuscate/${id}`).then((resp)=>{
        categorieslist();
    })
    toast.success("The category is status updated !", {
      position: "top-right",
    });
  };
  var [query, Setquery] = useState("");
  var search_cate = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/search_cate/${user_id}/search?q=${query}`
      );
      const data = await resp.json();
      ListCategory(data);
  
    } catch (error) {
      console.error(error);
    }
  };


 useEffect(() => {
  if (query.length === 0) {
    categorieslist();
    return;
  }else{
    search_cate();
  }
});  

  return (
    <>
      <U_index></U_index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Categories</h2>
         <div>
             <input
            type="text"
            placeholder="Search Categories..."
            value={query}
            onChange={(e) => {
              Setquery(e.target.value);
            }}
            className="search-input"
          />
          <Link className="btn btn-primary ms-2" to={'/add_category'}> Add new </Link>
         </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Status</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.category_name}</td>

                    <td>
                      {cat.status == 1 ? (
                        <span className="text-success">Activate</span>
                      ) : (
                        <span className="text-danger">Deactivate</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-edit btn-success"
                        onClick={() => {
                          status_cat(cat._id);
                        }}
                      >
                        Status
                      </button>
                      <Link className="btn btn-edit btn-primary" to={`/EditCategories/${cat._id}`}>Edit</Link>

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_cat(cat._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categorytable;
