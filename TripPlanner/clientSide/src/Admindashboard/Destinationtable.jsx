import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const Destinationtable = () => {
  var [destination, listdestination] = useState([]);
  function destinationList() {
    axios.get("http://localhost:4000/destinations").then((resp) => {
      listdestination(resp.data);
    });
  }

  
  function del_des(id) {
    axios.delete(`http://localhost:4000/deletedestination/${id}`).then(() => {
      toast.error("The destination is deleted now !", {
        position: "top-right",
      });
    });
  }
  var status_des = (id) => {
    axios.put(`http://localhost:4000/statusDestination/${id}`)
      toast.success("The status destination  is updated now !", {
        position: "top-right",
      });
  
  };
   var [query, Setquery] = useState("");
  var search_des = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/search_des/search?q=${query}`
      );
      const data = await resp.json();
      listdestination(data);
  
    } catch (error) {
      console.error(error);
    }
  };
 
    useEffect(() => {
      if (query.length === 0) {
            destinationList();
        return;
      }else{
  search_des();
      }
    }); 

  return (
    <>
    <Admin_Index></Admin_Index>
        <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Destination list</h2>
          <div>
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
               value={query}
            onChange={(e) => {
              Setquery(e.target.value);}}
            />
            <Link to={"/add_destination"} className='btn btn-primary mt-1'>Add New</Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th> Destination Name</th>
                <th> Image</th>
                <th> Longitude</th>
   <th> Latitude</th>

                <th>Status</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destination.length > 0 ? (
                destination.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      <img  width={100} src={`/images/${cat.image_url}`} alt="" />
                    </td>
                    
                    <td>{cat.longitude}</td>

                    <td>{cat.latitude}</td>
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
                           status_des(cat._id);
                        }}
                      >
                        Status
                      </button>
<Link className='btn btn-primary' to={`/editDestination/${cat._id}`}>Edit</Link>
<Link className='btn btn-info text-white' to={`/ViewDestination/${cat._id}`}>View</Link>
                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_des(cat._id);
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
    </>
  )
}

export default Destinationtable
