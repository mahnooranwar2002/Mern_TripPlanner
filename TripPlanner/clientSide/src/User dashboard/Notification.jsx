import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Notification = () => {
  var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
  var [noti, setNoti] = useState([]);
  var notilist = () => {
    axios
      .get(`http://localhost:4000/getNotification/${user_id}`)
      .then((resp) => {
        setNoti(resp.data);
     
      });
  };
  useEffect(()=>{
    notilist();
  },[])
  var del_noti = (id) => {
    axios.delete(`http://localhost:4000/NotifiDel/${id}`).then(() => {
      toast.error("The Notification is deleted now !", {
        position: "top-right",
      });
      setNoti(noti.filter((n) => n._id !== id));
    });
  };
  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:4000/notifications/${id}/read`);
      setNoti(noti.map((n) => n._id === id ? { ...n, read: true } : n));
    } catch {
      alert("Failed to mark notification as read.");
    }
  };
  return (
    <div>
      <U_index></U_index>
      <div className="form-container">
        <div class="container py-5">
          <h2 class="mb-4 text-center">Your Notifications</h2>

         
          <div id="notificationsList">
            {noti.length !== 0 ?(
              noti.map((n)=>(
                <div class="notification"  onClick={() => markAsRead(n._id)}>
                  <div className="d-flex justify-content-between">
                    <strong>New Notification</strong> 
                    <button className="btn btn-danger" onClick={(e) => {e.stopPropagation(); del_noti(n._id)}}>Delete</button> 
                  </div>
                  <div>{n.message}</div>
                </div>
              ))
            ):(
              <p> There is no notification yet </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
