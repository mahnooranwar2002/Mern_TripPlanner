import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactTable = () => {
    const [query, setQuery] = useState("");
      var [cont, listcont] = useState([]);
  function fetchCon() {
    axios.get("http://localhost:4000/contacts").then((resp) => {
      listcont(resp.data);
    });
  }


    function delCon(id) {
    axios.delete(`http://localhost:4000/delcon/${id}`).then(() => {
      toast.error("The destination is deleted now !", {
        position: "top-right",
      });
    });
  }
  const searchContact = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/search_contact/search?q=${query}`);
    listcont(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (query.length !== 0) {
    searchContact();
  } else {
    fetchCon();
  }
}, [query]);
  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Contact list</h2>
          <div>
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
                 value={query}
              onChange={(e) => {
                setQuery(e.target.value);}}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th> Name</th>
                <th> Email</th>
                <th> Phone</th>
                <th> Message</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
               {cont.length > 0 ? (
                cont.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                   <td>{cat.email}</td>
                  <td>{cat.contact_number}</td>
                  <td>{cat.message}</td>
                  
                    <td>
                    

              <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          delCon(cat._id);
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
                    No message found
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

export default ContactTable;
