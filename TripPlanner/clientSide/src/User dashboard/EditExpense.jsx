

import React, { useEffect, useState } from 'react'
import U_index from './U_index'
import axios from 'axios';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
const EditExpense = () => {
      var {id}=useParams()
       var [categories, ListCategory] = useState([]);
      var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
      var categorieslist = () => {
        axios
          .get(`http://localhost:4000/fetchcatebyuser/${user_id}`)
          .then((resp) => {
            ListCategory(resp.data);
            console.log(resp.data);
          });
      };
  function findCategory(){
    axios.get(`http://localhost:4000/expense_find/${id}`).then((resp)=>{
       SetExpense(resp.data)
    })
  }
   var [trips, ListTrip] = useState([]);
     var triplist = () => {
        axios
          .get(`http://localhost:4000/alltrips/${user_id}`)
          .then((resp) => {
           ListTrip(resp.data);
            console.log(resp.data);
          });
      };
useEffect(()=>{
    categorieslist();
    findCategory();  triplist();
},[])

var [expense,SetExpense]=useState({user_id:"",trip_name:"",amount:"",category:"" ,expense_date:"",notes:""});
var [expense_Error,SetExpenseError]=useState({trip_name:"",amount:"",category_name:"" ,expense_date:"",notes:""});
  const inputHandle = (e) => {
    SetExpense({ ...expense, [e.target.name]: e.target.value });
  };

  var addExpense=(e)=>{
    e.preventDefault();

  var errors = { trip_name:"",amount:"",category:"" ,expense_date:"",notes:"" };
    if(!expense.category_name.trim()){
        errors.category_name="The category is required! **";
    }



if (
  isNaN(expense.amount) ||
  expense.amount <= 0 ||
  !/^\d+(\.\d+)?$/.test(expense.amount)
) {
  errors.amount = "The Amount is required and must be a positive number **";
}

    if(!expense.expense_date.trim()){
        errors.expense_date="The expense date is required! **";
    }

if(!expense.notes.trim()){
        errors.notes="The note date is required! **";
    }
    if(errors.category||errors.amount||errors.expense_date||errors.notes){
        SetExpenseError(errors)
    }
    else{
            
     expense.trip_name="Ac";
     expense.user_id=user_id;
       axios.put(`http://localhost:4000/expenseUpdate/${id}`,expense).then((res)=>{
          toast.success("The expense is updated now !", {
                position: "top-right",
              });
              return;
            }
          ).catch((error) => {
            if (error.response) {
              if (error.response.status === 400) {
                toast.error(error.response.data, { position: "top-right" });
              } else {
                alert(error.response.data);
              }
            } else {
              alert("An unknown error occurred");
            }
          });
       }
    }

    return (
    <div>
      <U_index></U_index>
          {/* <div className="form-container">
        <h2 className="form-title">Update Expense</h2>
        <form onSubmit={addExpense} className="form-content">
                  <div className="form-group">
                <label>Trips</label>
                <select onChange={inputHandle} name='trip_name'>
                       <option value="">{expense.trip_name}</option>
       {
        trips.map((key)=>(

            <option value={key.trip_name}>{key.trip_name}</option>
        
        
        ))
       }  
       </select>
         {expense_Error.trip_name && (
            <span className="text-danger">{expense_Error.trip_name}</span>
          )}
       </div>
            <label>Category</label>
              <div className="form-group">
                <select onChange={inputHandle} name='category_name'>
                       <option value="">{expense.category_name}</option>
       {
        categories.map((key)=>(

            <option value={key.category_name}>{key.category_name}</option>
        
        
        ))
       }  
       </select>
         {expense_Error.category && (
            <span className="text-danger">{expense_Error.category}</span>
          )}
       </div>
       <div className="form-group">
            <label>Amount </label>
            <input
              type="text"
              placeholder="Enter Amount"
              name="amount"
              onChange={inputHandle}
              value={expense.amount}
            />
          </div>
       {expense_Error.amount && (
            <span className="text-danger">{expense_Error.amount}</span>
          )}
        
         
          <div className="form-group">
            <label>Expense Date </label>
            <input
              type="date"
              placeholder="Enter Amount"
              name="expense_date"
              onChange={inputHandle}
              value={expense.expense_date}
               min={new Date().toISOString().split('T')[0]} 
            />
                 {expense_Error.expense_date && (
            <span className="text-danger">{expense_Error.expense_date}</span>
          )}
          </div>
      <div className="form-group">
            <label>Notes </label>
        
            <textarea name="notes"  id="" onChange={inputHandle} value={expense.notes}>{expense.notes}</textarea>
          </div>
   
        {expense_Error.notes && (
            <span className="text-danger">{expense_Error.notes}</span>
          )}
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div> */}

      <div>
  <U_index />

  <div className="container my-5 d-flex justify-content-center">
    <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "700px", width: "100%" }}>
      <h3 className="mb-4 fw-bold">Update Expense</h3>

      <form onSubmit={addExpense} className="row g-3">
        
        {/* Trips */}
        <div className="col-12">
          <label className="form-label fw-semibold">Trips</label>
          <select
            className={`form-select ${expense_Error.trip_name ? "is-invalid" : ""}`}
            onChange={inputHandle}
            name="trip_name"
            value={expense.trip_name}
          >
            <option value="">{expense.trip_name || "Select a Trip"}</option>
            {trips.map((key, index) => (
              <option key={index} value={key.trip_name}>
                {key.trip_name}
              </option>
            ))}
          </select>
          {expense_Error.trip_name && (
            <div className="invalid-feedback">{expense_Error.trip_name}</div>
          )}
        </div>

        {/* Category */}
        <div className="col-12">
          <label className="form-label fw-semibold">Category</label>
          <select
            className={`form-select ${expense_Error.category ? "is-invalid" : ""}`}
            onChange={inputHandle}
            name="category_name"
            value={expense.category_name}
          >
            <option value="">{expense.category_name || "Select a Category"}</option>
            {categories.map((key, index) => (
              <option key={index} value={key.category_name}>
                {key.category_name}
              </option>
            ))}
          </select>
          {expense_Error.category && (
            <div className="invalid-feedback">{expense_Error.category}</div>
          )}
        </div>

        {/* Amount */}
        <div className="col-12">
          <label className="form-label fw-semibold">Amount</label>
          <input
            type="text"
            className={`form-control ${expense_Error.amount ? "is-invalid" : ""}`}
            placeholder="Enter Amount"
            name="amount"
            onChange={inputHandle}
            value={expense.amount}
          />
          {expense_Error.amount && (
            <div className="invalid-feedback">{expense_Error.amount}</div>
          )}
        </div>

        {/* Expense Date */}
        <div className="col-12">
          <label className="form-label fw-semibold">Expense Date</label>
          <input
            type="date"
            className={`form-control ${expense_Error.expense_date ? "is-invalid" : ""}`}
            name="expense_date"
            onChange={inputHandle}
            value={expense.expense_date}
            min={new Date().toISOString().split("T")[0]}
          />
          {expense_Error.expense_date && (
            <div className="invalid-feedback">{expense_Error.expense_date}</div>
          )}
        </div>

        {/* Notes */}
        <div className="col-12">
          <label className="form-label fw-semibold">Notes</label>
          <textarea
            className={`form-control ${expense_Error.notes ? "is-invalid" : ""}`}
            name="notes"
            rows="3"
            onChange={inputHandle}
            value={expense.notes}
          ></textarea>
          {expense_Error.notes && (
            <div className="invalid-feedback">{expense_Error.notes}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="submit-btn w-100 fw-semibold">
            Save
          </button>
        </div>

      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default EditExpense
