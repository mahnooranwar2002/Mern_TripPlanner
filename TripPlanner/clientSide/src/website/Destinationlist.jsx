import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Destinationlist() {
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
      <Header />

      <section
        className="breadcrumb-main pb-20 pt-14"
        style={{ backgroundImage: "url('images/bg/bg1.jpg')" }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{ backgroundImage: "url('images/shape8.png')" }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">Destination List</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Destination List
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
   <section className="trending pb-0 pt-6">
  <div className="container">
    <div className="section-title mb-6 w-50 mx-auto text-center">
<h4 className="mb-1 theme1">Top Destinations</h4>
<h2 className="mb-1">
  Explore <span className="theme">Top Destinations</span>
</h2>
<p>
  Discover stunning locations around the world and start planning your next trip.
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


      <section
        className="discount-action pt-6"
        style={{
          backgroundImage: "url(images/section-bg1.png)",
          backgroundPosition: "center",
        }}
      >
        <div
          className="section-shape section-shape1 top-inherit bottom-0"
          style={{
            backgroundImage: "url(images/shape8.png)",
          }}
        ></div>

        <div className="container">
          <div className="call-banner rounded pt-10 pb-14">
            <div className="call-banner-inner w-75 mx-auto text-center px-5">
              <div className="trend-content-main">
                <div className="trend-content mb-5 pb-2 px-5">
<h5 className="mb-1 theme">Love Where You're Going</h5>
<h2>
  <a href="detail-fullwidth.html">
    Explore Your Life,{" "}
    <span className="theme1">Travel Where You Want!</span>
  </a>
</h2>
<p>
  Discover amazing places, enjoy unique adventures, and create memories for a lifetime.
</p>
                </div>

                <div className="video-button text-center position-relative">
                  <div className="call-button text-center">
                    <button
                      type="button"
                      className="play-btn js-video-button"
                      data-video-id="870769596"
                      data-channel="vimeo"
                    >
                      <i className="fa fa-play bg-blue"></i>
                    </button>
                  </div>
                  <div className="video-figure"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="white-overlay"></div>
      </section>
      <Footer />
    </>
  );
}

export default Destinationlist;
