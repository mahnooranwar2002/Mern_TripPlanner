import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Admin_Index from "./Admin_Index";
import { toast } from "react-toastify";

const Faqtable = () => {

  const [faqs, setFaqs] = useState([]);
const [query, setQuery] = useState("");

const fetchFaqs = async () => {
  try {
    const response = await axios.get("http://localhost:4000/faq_fetch");
    setFaqs(response.data);
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/faq_del/${id}`);
    toast.error("The Faq is deleted now!", {
      position: "top-right",
    });
  } catch (error) {
    console.error(error);
  }
};

const searchFaqs = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/faq_search/search?q=${query}`);
    setFaqs(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (query.length !== 0) {
    searchFaqs();
  } else {
    fetchFaqs();
  }
},);

  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Faq list</h2>
          <div>
            <input
              type="text"
              placeholder="Search Subject..."
              className="search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
           
            <Link className="btn btn-primary ms-2" to={"/Faq_add"}>
              Add new
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Subject</th>
                <th>Question</th>
                <th>Answer</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length > 0 ? (
                faqs.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.subject}</td>
                    <td>{cat.faqQuestion}</td>
                    <td>{cat.faqAnswer}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/editFaq/${cat._id}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          handleDelete(cat._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Faq found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Faqtable;
