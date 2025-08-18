

import Header from './Header';
import Footer from './Footer';
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
function DestinationDetail() {
var [destination, Setdestination] = useState({});
 const { id} = useParams();
 
  var findDes =()=>{
axios.get(`http://localhost:4000/destinationfind/${id}`).then((resp)=>{
   Setdestination(resp.data);
   console.log(resp.data)
})
  }

  const location = useLocation();

  // Parse lat/lng from query params, fallback to default
  const searchParams = new URLSearchParams(location.search);
  const baseLat = parseFloat(searchParams.get("lat")) || 24.8876;
  const baseLng = parseFloat(searchParams.get("lng")) || 67.1521;

  useEffect(() => {
    findDes();
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const mapInstance = L.map("map").setView([baseLat, baseLng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    L.marker([baseLat, baseLng])
      .addTo(mapInstance)
      .bindPopup(`Location: [${baseLat.toFixed(4)}, ${baseLng.toFixed(4)}]`)
      .openPopup();

    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 0);

    // Cleanup on unmount
    return () => {
      mapInstance.remove();
    };
  }, [baseLat, baseLng]);
  var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
var addFavourite=(name)=>{
// alert(name)
if(!user_id){
        toast.error('Please login first!', {
            position: "top-right",
           
        });
        return;
}
else{
    const wishList = {
        name: name,
      
        user_id: user_id
    };

  axios.post("http://localhost:4000/addfavDes",wishList).then((resp)=>{
       toast.error('This destination is added to your favourite ! ', {
            position: "top-right",
           
        });
        return;  
  }).catch((error) => {
            if (error.response) {
              if (error.response.status === 400) {
                toast.error(error.response.data, { position: "top-right" });
              } else {
                alert(error.response.data);
              }
            } else {
              alert("An unknown error occurred");
            }
     
})
}
}

  return (

    <> 
    <Header/>
     <section
        className="breadcrumb-main pb-20 pt-14"
        style={{ backgroundImage: "url('images/bg/bg1.jpg')" }}
      >
        
        <div
          className="section-shape section-shape1 top-ianherit bottom-0"
          style={{ backgroundImage: "url('images/shape8.png')" }}
        ></div>
        <div className="breadcrumb-outer">
          <div className="container">
            <div className="breadcrumb-content text-center">
              <h1 className="mb-3">Destination Details </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                   Destination Details
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      
    <section className="trending pt-6 pb-0 bg-lgrey">
      <div className="container">
        <div className="row">
          {/* Main content */}
        <div className="col-lg-8">
  <div className="single-content">
    <div id="highlight" className="mb-4">
      <div className="single-full-title border-b mb-2 pb-2">
        <div className="single-title d-flex justify-content-between align-items-center flex-wrap">
          <h2 className="mb-1">{destination.name}</h2>
          <button
            className="btn btn-primary mb-2"
            onClick={() => addFavourite(destination.name)}
             style={{
            color: "#fff",
            backgroundColor: "#029e9d",
          }} >
            <FaHeart className="me-2" />
            Add to Favourite
          </button>
        </div>
      </div>

      <div className="description-images mb-4">
        <img
          src={`/images/${destination.image_url}`}
          alt=""
          className="w-100 rounded"
        />
      </div>

      <div className="description mb-2">
        <h4>Description</h4>
        <p>{destination.description}</p>
        <p className="mb-0">
          The passage is attributed to an unknown typesetter in the 15th
          century who is thought to have scrambled parts of Cicero's De Finibus
          Bonorum et Malorum for use in a type specimen book.
        </p>
      </div>
    </div>

    {/* Map */}
    <div id="single-map" className="single-map mb-4">
      <h4>Map</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div
          id="map"
          style={{
            height: "500px",
            width: "800px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        ></div>
      </div>
    </div>

    {/* Reviews */}
    <div id="single-review" className="single-review mb-4">
      <h4>Average Reviews</h4>
      <div className="row d-flex align-items-center">
        <div className="col-lg-4 col-md-4">
          <div className="review-box bg-title text-center py-4 p-2 rounded">
            <h2 className="mb-1 white">
              <span>2.2</span>/5
            </h2>
            <h4 className="white mb-1">"Feel so much worst than thinking"</h4>
            <p className="mb-0 white font-italic">From 40 Reviews</p>
          </div>
        </div>
        <div className="col-lg-8 col-md-8">
          <div className="review-progress">
            {[
              { label: "Cleanliness", value: 40 },
              { label: "Facilities", value: 30 },
              { label: "Value for money", value: 60 },
              { label: "Service", value: 20 },
              { label: "Location", value: 45 },
            ].map((item, index) => (
              <div className="progress-item mb-1" key={index}>
                <p className="mb-0">{item.label}</p>
                <div className="progress rounded">
                  <div
                    className="progress-bar bg-theme"
                    role="progressbar"
                    aria-valuenow={item.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${item.value}%` }}
                  >
                    <span className="sr-only">{item.value}% Complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sidebar-sticky">
              <div className="list-sidebar">
                <div className="author-news mb-4 border-all box-shadow p-5 text-center rounded">
                  <div className="author-news-content">
                    <div className="author-thumb mb-1">
                      <img src="images/team/img2.jpg" alt="author" />
                    </div>
                    <div className="author-content">
                      <h3 className="title mb-1">
                        <a href="#">Relson Dulux</a>
                      </h3>
                      <p className="mb-2">
                        Hello, We’re content writer who is fascinated by content
                        fashion, celebrity and lifestyle. We helps clients bring
                        the right content to the right people.
                      </p>
                      <div className="header-social">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f rounded"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-google-plus-g rounded"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter rounded"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-item mb-4">
                  <h4>All Categories</h4>
                  <ul className="sidebar-category">
                    {[
                      "Travelling",
                      "Tour Position",
                      "Trip Landmark",
                      "Adventurous",
                      "Address and Map",
                      "Booking Requests",
                      "Wildlife Reservation",
                      "Top Destination",
                    ].map((cat, i) => (
                      <li key={i} className={cat === "Adventurous" ? "active" : ""}>
                        <a href="#">{cat}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-item mb-4">
                  <h4>Tags</h4>
                  <ul className="sidebar-tags">
                    {[
                      "Tour",
                      "Rental",
                      "City",
                      "Yatch",
                      "Activity",
                      "Museum",
                      "Beauty",
                      "Classic",
                      "Creative",
                      "Designs",
                      "Featured",
                      "Free Style",
                      "Programs",
                      "Travel",
                    ].map((tag, i) => (
                      <li key={i}>
                        <a href="#">{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-item mb-4">
                  <div className="sidebar-image rounded overflow-hidden">
                    <img
                      src="images/destination/destination4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
       <section
  className="discount-action pt-6"
  style={{
    backgroundImage: 'url(images/section-bg1.png)',
    backgroundPosition: 'center',
  }}
>
  <div
    className="section-shape section-shape1 top-inherit bottom-0"
    style={{
      backgroundImage: 'url(images/shape8.png)',
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
                Explore Your Life, <span className="theme1">Travel Where You Want!</span>
              </a>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
<ToastContainer></ToastContainer>
<Footer/>
       </>
  );
}

export default DestinationDetail;


