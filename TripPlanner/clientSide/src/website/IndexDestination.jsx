import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function IndexDestination() {
  var navigate= useNavigate()
  var [destinations, Listdsestinations] = useState([]);
  var destinationslist = () => {
    axios.get(`http://localhost:4000/destinationsfetch`).then((resp) => {
      Listdsestinations(resp.data);
    });
  };
  useEffect(() => {
    destinationslist();
  }, []);
  const handleViewLocation = (_id,latitude, longitude) => {
    navigate(`/destinationdata/${_id}?&lat=${latitude}&lng=${longitude}`);
  };



  return (
    <>
    
   <section className="trending pb-0 pt-6">
  <div className="container">
    <div className="section-title mb-6 w-50 mx-auto text-center">
      <h4 className="mb-1 theme1">Top Destinations</h4>
      <h2 className="mb-1">
        Explore <span className="theme">Top Destinations</span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>

    <div className="row align-items-center">
      {destinations.length === 0 ? (
        <h4>There is no destination added!</h4>
      ) : (
        destinations.map((d) => (
          <div key={d._id} className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="trend-item1">
              <div className="trend-image position-relative rounded">
                <img
                  src={`images/${d.image_url}`} // image_url backend se
                  alt={`${d.name}`}  
                />
                <div className="trend-content d-flex align-items-center justify-content-between position-absolute bottom-0 p-4 w-100 z-index">
                  <div className="trend-content-title">
                    <h5 className="mb-0">
                      <a href="#" className="theme1">{d.description  || "Unknown Country"}</a>
                    </h5>
                    <h3 className="mb-0 white">{d.name}</h3>
                  </div>
                  <span className="white bg-theme p-1 px-2 rounded"  onClick={() => handleViewLocation(d._id, d.latitude, d.longitude)}>
                   View Location
                  </span>
                </div>
                <div className="color-overlay"></div>
              </div>
            </div>
         
          </div>
        ))
      )}
    </div>
  </div>
</section>



    </>
  );
}

export default IndexDestination;
