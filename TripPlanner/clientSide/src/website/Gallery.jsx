import React from 'react'
import Header from './Header'
import Footer from './Footer'
function Gallery() {
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
              <h1 className="mb-3"> Gallery </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                  Gallery
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

        <div class="gallery pt-6 pb-0">
        <div class="container">
            <div class="section-title mb-6 text-center w-75 mx-auto">
               <h4 class="mb-1 theme1">Our Gallery</h4>
<h2 class="mb-1">Some Beautiful <span class="theme">Snapshoots</span></h2>
<p>Capture stunning moments from our tours and relive the joy of every journey.</p>

            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="gallery-item mb-4 rounded overflow-hidden">
                        <div class="gallery-image">
                            <img src="images/trending/trending1.jpg" alt="image"/>
                        </div>
                        <div class="gallery-content">
                            <h5 class="white text-center position-absolute bottom-0 pb-4 left-50 mb-0 w-100">Barcelona - Spain</h5>
                            <ul className=' p-5'>
                                <li className='m-2'><a href="images/trending/trending1.jpg"  data-lightbox="gallery" data-title="Title"><i class="fa fa-eye"></i></a></li>
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
              
            
             

            
              

               

             

            
            </div>
        </div>
    </div>
    <Footer />
  </>
  )
}

export default Gallery