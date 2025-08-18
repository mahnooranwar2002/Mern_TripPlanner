import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { toast } from "react-toastify";
const Usertable = () => {
  var [user, listuser] = useState([]);
  function userList() {
    axios.get("http://localhost:4000/fetch_user").then((resp) => {
      listuser(resp.data);
    });
  }


  function del_user(id) {
    axios.delete(`http://localhost:4000/deluser/${id}`).then(() => {
      toast.error("The user is deleted now !", {
        position: "top-right",
      });
    });
  }
  var status_user = (id) => {
    axios.put(`http://localhost:4000/statususer/${id}`)
      toast.success("The status user  is updated now !", {
        position: "top-right",
      });
  
  };
    var [query, Setquery] = useState("");
  var search_user = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/search_user/search?q=${query}`
      );
      const data = await resp.json();
      listuser(data);
  
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (query.length === 0) {
          userList();
      return;
    }else{
search_user();
    }
  }); 
  return (
    <div>
      <Admin_Index />
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Users list</h2>
          <div>
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
               value={query}
            onChange={(e) => {
              Setquery(e.target.value);}}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Email</th>

                <th>Status</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.first_name}</td>
                    <td>{cat.last_name}</td>
                    <td>{cat.email}</td>
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
                          status_user(cat._id);
                        }}
                      >
                        Status
                      </button>

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_user(cat._id);
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
    </div>
  );
};

export default Usertable;
