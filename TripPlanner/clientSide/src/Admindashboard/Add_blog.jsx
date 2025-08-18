
import Admin_Index from './Admin_Index'
import React, { useState } from "react";
import axios from "axios";
const Add_blog = () => {
      const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !content || !img) {
      setMessage("Please fill all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("img", img);

    try {
      const res = await axios.post("http://localhost:1000/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Blog added successfully!");
      setTitle("");
      setAuthor("");
      setContent("");
      setImg(null);
      e.target.reset(); // reset file input
    } catch (error) {
      console.error("Error adding blog:", error);
      setMessage("Error adding blog.");
    }
  };
  return (
    <>
      <Admin_Index></Admin_Index>

    </>
  )
}

export default Add_blog
