import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Triptable = () => {
  var [trips, Listtrips] = useState([]);
  var user_id =  JSON.parse(window.localStorage.getItem("userLogined"));
  var tripselist = () => {
    axios.get(`http://localhost:4000/alltrips/${user_id}`).then((resp) => {
      Listtrips(resp.data);
    
    });
  };
  useEffect(() => {
    tripselist();
  }, []);
  var del_trip = (id) => {
    axios.delete(`http://localhost:4000/deletetrip/${id}`).then(() => {
      toast.error("The Trip is deleted now !", {
        position: "top-right",
      });
      tripselist();
    });
  };
var updateStatus = (id, status) => {
  axios.put(`http://localhost:4000/trip_Status/${id}`, { status: status })
    .then(() => {
      toast.success("Update status is successful.", {
        position: "top-right"
      });
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to update status.", {
        position: "top-right"
      });
    });
};
 function heighestToLow() {
    axios
      .get(`http://localhost:4000/highTolowestAmountbudget/${user_id}`)
      .then((resp) => {
       Listtrips(resp.data);
      });
  }
  function LowtoHeighest() {
    axios
      .get(`http://localhost:4000/lowestTohighAmountbudget/${user_id}`)
      .then((resp) => {
        Listtrips(resp.data);
      });
  }
  return (
    <div>
      <U_index></U_index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Trips</h2>
          <div>
            <input
              type="text"
              placeholder="Search users..."
              //   value={query}
              //   onChange={(e) => {
              //     Setquery(e.target.value);
              //   }}
              className="search-input"
            />
            <Link className="btn btn-primary ms-2" to={"/add_trip"}>
              Add new
            </Link> 
            <button className="btn btn-primary" onClick={() => heighestToLow()}>
              Heighest
            </button>
            <button className="btn btn-primary" onClick={() => LowtoHeighest()}>
              Lowest
            </button>
        
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Trip Name</th>
                <th>Destination</th>

                <th>Budget</th>
                <th>category </th>
  <th>Status </th>
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length > 0 ? (
                trips.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.trip_name}</td>
                    <td>{t.destination}</td>
                 

                    <td>{t.budget}</td>
                    <td>{t.category_id}</td>
                       <td><select 
  className="form-select"
  name="status" 
  onChange={(e) => updateStatus(t._id, e.target.value)}
>
  <option value="">{t.status}</option>
  <option value="Planned">Planned</option>
  <option value="Ongoing">Ongoing</option>
  <option value="Completed">Completed</option>
  <option value="Cancelled">Cancelled</option>
</select>
</td>
                    <td>
                      <Link
                        className="btn btn-edit btn-primary"
                        to={`/tripsEdit/${t._id}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_trip(t._id);
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
                    No trip found
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

export default Triptable;
