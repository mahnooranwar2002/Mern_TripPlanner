import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FavDestination = () => {
      var [des, ListDes] = useState([]);
  var user_id =  JSON.parse(window.localStorage.getItem("userLogined"));
  var ListDesselist = () => {
    axios.get(`http://localhost:4000/allFavdestination/${user_id}`).then((resp) => {
      ListDes(resp.data);
    
    });
  };

   var [query, Setquery] = useState("");
    var search_des= async () => {
      try {
        const resp = await fetch(
          `http://localhost:4000/search_favdes/${user_id}/search?q=${query}`
        );
        const data = await resp.json();
       ListDes(data);
    
      } catch (error) {
        console.error(error);
      }
    };
     useEffect(() => {
        if (query.length === 0) {
            ListDesselist();
          return;
        }else{
          search_des();
        }
      },[query]);  
      

    var del_des = (id) => {
    axios.delete(`http://localhost:4000/favDesDel/${id}`).then(() => {
      toast.error("The favourite Destination is deleted now !", {
        position: "top-right",
      });
    
    });
  };
  return (
    <div>
       <div>
      <U_index></U_index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Trips</h2>
          <div>
            <input
              type="text"
              placeholder="Search Destination..."
                value={query}
                onChange={(e) => {
                  Setquery(e.target.value);
                }}
              className="search-input"
            />
        
        
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Destination Name</th>
               

     
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {des.length > 0 ? (
                des.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.name}</td>
                    
         <td>
                     

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_des(t._id);
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
                    No Destination found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default FavDestination
