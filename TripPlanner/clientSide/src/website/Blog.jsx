import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Blog = () => {
  return (
    <div>
      <Header></Header>
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
              <h1 className="mb-3"> Blog </h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                  Blog
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
               <h4 class="mb-1 theme1">Our Blog</h4>
<h2 class="mb-1">there are our Some  <span class="theme">Blog</span></h2>
<p>Capture stunning moments from our tours and relive the joy of every journey.</p>

            </div>
            <div class="row">
                <div class="col-12">
                    <div class="gallery-item mb-4 rounded overflow-hidden">
                        <div class="gallery-image">
                            <img src="images/trending/trending1.jpg" alt="image"/>
                        </div>
                      
                    </div>
                </div>
              
            
             

            
              

               

             

            
            </div>
        </div>
    </div>
      <Footer></Footer>
    </div>
  )
}

export default Blog
