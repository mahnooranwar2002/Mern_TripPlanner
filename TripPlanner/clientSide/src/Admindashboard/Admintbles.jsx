import "../assets/css/currency.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Admin_Index from "./Admin_Index";

function Admintbles() {
 

  return (
    <>
          <Admin_Index />

  <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>admin list</h2>
         <div>
             <input
            type="text"
            placeholder="Search Categories..."
            className="search-input"
          />
          <Link className="btn btn-primary ms-2" > Add new </Link>
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
              
                  <tr>
                    <td></td>
                    <td></td>

                    <td>
                      
                        <span className="text-success">Activate</span>
                      
                        <span className="text-danger">Deactivate</span>
                      
                    </td>
                    <td>
                      <button
                        className="btn btn-edit btn-success"
                        
                      >
                        Status
                      </button>
                      <Link className="btn btn-edit btn-primary" >Edit</Link>

                      <button
                        className="btn btn-delete btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
            
              
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found
                  </td>
                </tr>
            
            </tbody>
          </table>
        </div>
      </div>        </>

  );
}

export default Admintbles;




