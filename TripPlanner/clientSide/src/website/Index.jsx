import React from 'react'
import Header from './Header'
import Footer from './Footer'
import bannerbg from'../assets/images/testimonial.png'; // Path to banner background image
import bannertravel  from'../assets/images/travel.png'; 
import IndexDestination from './IndexDestination';
const Index = () => {
  return (
    <div>
      <Header></Header>
<section
  className="banner pt-10 pb-0 overflow-hidden"
  style={{ backgroundImage: "url(" + bannerbg + ")" }}
>
  <div className="container">
    <div className="banner-in">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4">
          <div className="banner-content text-lg-start text-center">
            <h4 className="theme mb-0">Explore The World</h4>
            <h1>Start Planning Your Dream Trip Today!</h1>
            <p className="mb-4">
              Plan your dream trips with ease, explore new destinations, and enjoy a stress-free travel experience"
            </p>

          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="banner-image">
            <img src={bannertravel} alt="" />
          </div>
        </div>
      </div>

<div className="category-main-inner border-t pt-1">
  <div className="row side-slider">
    <div className="col-lg-3 col-md-6 my-4">
      <div className="category-item box-shadow p-3 py-4 text-center bg-white rounded overflow-hidden">
        <div className="trending-topic-content">
          <img src="images/icons/001-cityscape.png" className="mb-1 d-inline-block" alt="" />
          <h4 className="mb-0"><a href="tour-grid.html">Camping</a></h4>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 my-4">
      <div className="category-item box-shadow p-3 py-4 text-center bg-white rounded overflow-hidden">
        <div className="trending-topic-content">
          <img src="images/icons/004-camping-tent.png" className="mb-1 d-inline-block" alt="" />
          <h4 className="mb-0"><a href="tour-grid.html">Camping</a></h4>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 my-4">
      <div className="category-item box-shadow p-3 py-4 text-center bg-white rounded overflow-hidden">
        <div className="trending-topic-content">
          <img src="images/icons/004-camping-tent.png" className="mb-1 d-inline-block" alt="" />
          <h4 className="mb-0"><a href="tour-grid.html">Camping</a></h4>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 my-4">
      <div className="category-item box-shadow p-3 py-4 text-center bg-white rounded overflow-hidden">
        <div className="trending-topic-content">
          <img src="images/icons/004-camping-tent.png" className="mb-1 d-inline-block" alt="" />
          <h4 className="mb-0"><a href="tour-grid.html">Camping</a></h4>
        </div>
      </div>
    </div>
    {/* ... baaki cards me bhi class -> className karna hoga */}
  </div>
</div>

    </div>
  </div>
</section>

{/* abouts */}
<IndexDestination></IndexDestination>;

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
      <p>Discover amazing trips and adventures, plan with ease, and make every journey unforgettable."
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
                
<h4><a href="about.html">Enjoy Hassle-Free Travel</a></h4>
<p class="mb-0">Leave the planning stress to us and focus on the adventure.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-location-pin theme"></i>
                </div>
<h4><a href="about.html">Discover New Destinations</a></h4>
<p class="mb-0">Explore hidden gems and popular spots around the world.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-directions theme"></i>
                </div>
<h4><a href="about.html">Plan Your Perfect Trip</a></h4>
<p class="mb-0">Organize destinations, dates, and budgets in just a few clicks.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="why-us-item text-center p-4 py-5 border rounded bg-white">
              <div className="why-us-content">
                <div className="why-us-icon">
                  <i className="icon-compass theme"></i>
                </div>
<h4><a href="about.html">Tell Us What You Want To Do</a></h4>
<p class="mb-0">Choose from exciting activities and experiences tailored for your trip.</p>
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

{/* about us  */}
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
      We create unforgettable travel experiences, offering expertly crafted
      tours to breathtaking destinations across the globe. Whether you’re
      seeking adventure, culture, or relaxation, our dedicated team ensures
      every journey is smooth and memorable.
      <br />
      <br />
      With trusted guides, fair prices, and reliable packages, we help you
      explore the world without the stress—so you can focus on making memories.
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
{/* end  */}
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
  Discover new places, embrace adventures, and create unforgettable memories wherever you go.
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
<section className="our-team pb-6">
  <div className="container">
    <div className="section-title mb-6 w-75 mx-auto text-center">
      <h4 className="mb-1 theme1">Tour Guides</h4>
      <h2 className="mb-1">
  Meet Our <span className="theme">Excellent Guides</span>
</h2>
<p>
  Our expert guides ensure every trip is safe, exciting, and filled with amazing experiences.
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

<Footer></Footer>
   </div>
  )
}

export default Index
