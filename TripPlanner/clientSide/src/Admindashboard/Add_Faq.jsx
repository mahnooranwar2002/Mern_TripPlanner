import axios from "axios";
import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const Add_Faq = () => {
  const [subject, setSubject] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [user_id,setiuser ]= useState("");
    var Islogined = JSON.parse(window.localStorage.getItem("userAdmin"));
  var [error, SetError] = useState({
  subject: "",
      faqQuestion: "",
      faqAnswer: "",
     
    });
  const handleSubmit = async (e) => {
 
    e.preventDefault();
    var newError = {
      subject: "",
      faqQuestion: "",
      faqAnswer: "",
    };

    if(!subject.trim()){
        newError.subject="The subject is required **";
    }
    if(!faqQuestion.trim()){
        newError.faqQuestion="The Faq Question is required **";
    }if(!faqAnswer.trim()){
        newError.faqAnswer="The Faq Answer  is required **";
    }
    if(newError.subject||newError.faqAnswer||newError.faqQuestion){
        SetError(newError);
    }
    else{
 try {
      const response = await axios.post("http://localhost:4000/add_faq", {
        subject,
        faqQuestion,
        faqAnswer,
        user_id:Islogined,
      }).then(()=>{
        
    
      setSubject("");
      setFaqQuestion("");
      setFaqAnswer("");
           toast.success("The Faq   is added  now !", {
                          position: "top-right",
                        });
                        return;
      });
      SetError({
          subject: "",
      faqQuestion: "",
      faqAnswer: "",
      });


    } catch (error) {
      setMessage("Error: " + error.response?.data?.error || error.message);
    }
  };
    }



  return (
    <div>
      <Admin_Index></Admin_Index>
     <div className="container my-5 d-flex justify-content-center">
  <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
    <h2 className="mb-4 text-center">Add New FAQ</h2>

    <form onSubmit={handleSubmit}>
      {/* Faq Subject */}
      <div className="mb-3">
        <label className="form-label">FAQ Subject</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {error.subject && <div className="text-danger mt-1">{error.subject}</div>}
      </div>

      {/* Faq Question */}
      <div className="mb-3">
        <label className="form-label">FAQ Question</label>
        <textarea
          className="form-control"
          placeholder="Enter Question"
          name="faqQuestion"
          value={faqQuestion}
          onChange={(e) => setFaqQuestion(e.target.value)}
          rows="3"
        ></textarea>
        {error.faqQuestion && <div className="text-danger mt-1">{error.faqQuestion}</div>}
      </div>

      {/* Faq Answer */}
      <div className="mb-3">
        <label className="form-label">FAQ Answer</label>
        <textarea
          className="form-control"
          placeholder="Enter Answer"
          name="faqAnswer"
          value={faqAnswer}
          onChange={(e) => setFaqAnswer(e.target.value)}
          rows="4"
        ></textarea>
        {error.faqAnswer && <div className="text-danger mt-1">{error.faqAnswer}</div>}
      </div>

      {/* Submit Button */}
      <div className="text-end">
        <button type="submit" className="btn btn-primary px-4">
          Save
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  );
};

export default Add_Faq;
