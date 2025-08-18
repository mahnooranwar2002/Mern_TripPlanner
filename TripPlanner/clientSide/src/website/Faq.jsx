import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const toggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/faq_fetch");
      setFaqs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <>
      <Header />

      {/* Breadcrumb */}
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
              <h1 className="mb-3">Faq</h1>
              <nav aria-label="breadcrumb" className="d-block">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Faq
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="dot-overlay"></div>
      </section>

      {/* FAQ Section */}
      <section className="faq-main pb-6 pt-6">
        <div className="container">
          <div className="section-title mb-6 text-center w-75 mx-auto">
            <h4 className="mb-1 theme1">Faq</h4>
            <h2 className="mb-1">Frequently Asked <span className="theme">Questions</span></h2>
            <p>Find answers to the most common questions below.</p>
          </div>

          <div className="faq-accordian">
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-4">
                <div className="accrodion-grp faq-accrodion">
                  {faqs.length > 0 ? (
                    faqs.map((faq, i) => (
                      <div
                        key={faq.id}
                        className={`accrodion ${activeIndex === i ? "active" : ""}`}
                      >
                        <div
                          className="accrodion-title"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggle(i)}
                        >
                          <h5>{faq.faqQuestion}</h5>
                        </div>
                        {activeIndex === i && (
                          <div className="accrodion-content" style={{ display: 'block' }}>
                            <div className="inner">
                              <p>{faq.faqAnswer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No FAQ found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Faq;
