import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index'
import axios from 'axios';
function AdminDashboard() {
  var [destination, listdestination] = useState([]);
  function destinationList() {
    axios.get("http://localhost:4000/destinations").then((resp) => {
      listdestination(resp.data);
    });
  }
     var [cont, listcont] = useState([]);
  function fetchCon() {
    axios.get("http://localhost:4000/contacts").then((resp) => {
      listcont(resp.data);
    });
  }
    const [faqs, setFaqs] = useState([]);
const fetchFaqs = async () => {
  try {
    const response = await axios.get("http://localhost:4000/faq_fetch");
    setFaqs(response.data);
  } catch (error) {
    console.error(error);
  }
};

var [user, listuser] = useState([]);
  function userList() {
    axios.get("http://localhost:4000/fetch_user").then((resp) => {
      listuser(resp.data);
    });
  }
  useEffect(()=>{
    destinationList();
    fetchCon();
    fetchFaqs();
    userList();
  })

  return (
    <>
      <Admin_Index></Admin_Index>
       
        {/* <div className="form-container">
          Destination: {cont.length}
          <br/>
          User:{user.length}
            <br/>
          contact:{cont.length}
            <br/>
            Faq:{faqs.length}
         </div> */}
<div className="container my-5 me-5">
  <div className="row g-4">

    {/* Destinations */}
    <div className="col-6">
      <div className="card h-100 border-0 shadow-lg rounded-4 p-4 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold text-muted mb-0">Destinations</h6>
          <i className="fas fa-map-marked-alt text-danger fs-3"></i>
        </div>
        <h2 className="fw-bold text-danger mb-0">{destination.length}</h2>
      </div>
    </div>

    {/* Users */}
    <div className="col-6">
      <div className="card h-100 border-0 shadow-lg rounded-4 p-4 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold text-muted mb-0">Users</h6>
          <i className="fas fa-users text-primary fs-3"></i>
        </div>
        <h2 className="fw-bold text-primary mb-0">{user.length}</h2>
      </div>
    </div>

    {/* Contacts */}
    <div className="col-6">
      <div className="card h-100 border-0 shadow-lg rounded-4 p-4 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold text-muted mb-0">Contacts</h6>
          <i className="fas fa-address-book text-success fs-3"></i>
        </div>
        <h2 className="fw-bold text-success mb-0">{cont.length}</h2>
      </div>
    </div>

    {/* FAQs */}
    <div className="col-6">
      <div className="card h-100 border-0 shadow-lg rounded-4 p-4 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold text-muted mb-0">FAQs</h6>
          <i className="fas fa-question-circle text-warning fs-3"></i>
        </div>
        <h2 className="fw-bold text-warning mb-0">{faqs.length}</h2>
      </div>
    </div>

  </div>
</div>


    </>  )
}

export default AdminDashboard



