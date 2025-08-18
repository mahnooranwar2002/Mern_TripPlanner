import React from 'react'
import Header from './Header'
import Footer from './Footer'

const About = () => {
  return (
    <>
      <Header/>
       {/* BreadCrumb Starts */}
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
              <h1 className="mb-3">About Us</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>
      {/* BreadCrumb Ends */} 
      
       <section
        className="about-us pt-0"
        style={{ backgroundImage: "url('images/bg/bg-trans.png')" }}
      >
        <div className="container">
          <div className="about-image-box">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-lg-6 mb-4 pe-4">
                <div className="about-image overflow-hidden">
                  <img src="images/travel1.png" alt="" />
                </div>
              </div>
<div className="col-lg-6 mb-4 ps-4">
  <div className="about-content text-center text-lg-start mb-4">
    <h4 className="theme d-inline-block mb-0">Get To Know Us</h4>
    <h2 className="border-b mb-2 pb-1">
      Explore All Tour of the world with us.
    </h2>
    <p className="border-b mb-2 pb-2">
      We specialize in creating unforgettable travel experiences, offering
      personalized tours and adventures that suit every style. Whether you
      dream of mountains, beaches, or cities, our team makes it happen with
      ease and care.
      <br />
      <br />
      With expert guides, fair pricing, and reliable packages, we ensure your
      journey is comfortable, exciting, and truly memorable.
    </p>
    <div className="about-listing">
      <ul className="d-flex justify-content-between">
        <li>
          <i className="icon-location-pin theme"></i> Tour Guide
        </li>
        <li>
          <i className="icon-briefcase theme"></i> Friendly Price
        </li>
        <li>
          <i className="icon-folder theme"></i> Reliable Tour Package
        </li>
      </ul>
    </div>
  </div>
</div>


              <div className="col-lg-12">
                {/* Counter */}
                <div className="counter-main w-75 float-end">
                  <div className="counter p-4 pb-0 box-shadow bg-white rounded">
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <div className="counter-item border-end pe-4">
                          <div className="counter-content">
                            <h2 className="value mb-0 theme">20</h2>
                            <span className="m-0">Years Experiences</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <div className="counter-item border-end pe-4">
                          <div className="counter-content">
                            <h2 className="value mb-0 theme">530</h2>
                            <span className="m-0">Tour Packages</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <div className="counter-item border-end pe-4">
                          <div className="counter-content">
                            <h2 className="value mb-0 theme">850</h2>
                            <span className="m-0">Happy Customers</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                        <div className="counter-item">
                          <div className="counter-content">
                            <h2 className="value mb-0 theme">320</h2>
                            <span className="m-0">Award Winning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Counter */}
              </div>
            </div>
          </div>
        </div>
        <div className="white-overlay"></div>
      </section>

      <section
  className="about-us pb-6 pt-6"
  style={{
    backgroundImage: "url('../assets/images/shape4.png')",
    backgroundPosition: "center"
  }}
>
  <div className="container">
    <div className="section-title mb-6 w-50 mx-auto text-center">
      <h4 className="mb-1 theme1">3 Step of The Perfect Tour</h4>
<h2 className="mb-1">
  Find <span className="theme">Travel Perfection</span>
</h2>
<p>
  Plan your trip, enjoy the journey, and create memories that last forever.
</p>

    </div>

    {/* why us starts */}
    <div className="why-us">
      <div className="why-us-box">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-flag theme"></i>
                </div>
                <h4><a href="about.html">Tell Us What You Want To Do</a></h4>
<p className="mb-0">Choose from exciting travel activities made just for you.</p>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-location-pin theme"></i>
                </div>

<h4><a href="about.html">Share Your Travel Locations</a></h4>
<p className="mb-0">Let us know the destinations you’ve been dreaming about.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-directions theme"></i>
                </div>
<h4><a href="about.html">Select Your Trip Preferences</a></h4>
<p className="mb-0">Pick the style of travel you love—luxury, adventure, or both.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-compass theme"></i>
                </div>
<h4><a href="about.html">We Are Your Trusted Travel Partner</a></h4>
<p className="mb-0">Enjoy stress-free journeys with our expert and reliable service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* why us ends */}
  </div>
  <div className="white-overlay"></div>
</section>

<section className="our-team pb-6">
  <div className="container">
    <div className="section-title mb-6 w-75 mx-auto text-center">
     <h4 className="mb-1 theme1">Tour Guides</h4>
<h2 className="mb-1">
  Meet Our <span className="theme">Excellent Guides</span>
</h2>
<p>
  Our friendly experts make every journey safe, exciting, and truly unforgettable.
</p>

    </div>

    <div className="team-main">
      <div className="row shop-slider">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="team-list rounded">
            <div className="team-image">
              <img src="images/team/img1.jpg" alt="team" />
            </div>
            <div className="team-content text-center p-3 bg-theme">
              <h4 className="mb-0 white">Salmon Thuir</h4>
              <p className="mb-0 white">Senior Agent</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="team-list rounded">
            <div className="team-image">
              <img src="images/team/img2.jpg" alt="team" />
            </div>
            <div className="team-content text-center p-3 bg-theme">
              <h4 className="mb-0 white">Horke Pels</h4>
              <p className="mb-0 white">Head Officer</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="team-list rounded">
            <div className="team-image">
              <img src="images/team/img4.jpg" alt="team" />
            </div>
            <div className="team-content text-center p-3 bg-theme">
              <h4 className="mb-0 white">Solden kalos</h4>
              <p className="mb-0 white">Supervisor</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="team-list rounded">
            <div className="team-image">
              <img src="images/team/img3.jpg" alt="team" />
            </div>
            <div className="team-content text-center p-3 bg-theme">
              <h4 className="mb-0 white">Nelson Bam</h4>
              <p className="mb-0 white">Quality Assurance</p>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  </div>
</section>
{/* <Testimonails/> */}
      {/* about-us ends */}
      <Footer></Footer>
    </>
  )
}

export default About
