import React, { useEffect, useState } from "react";
import U_index from "./U_index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const Expensetable = () => {
  var [expensess, ListExpenses] = useState([]);
 
  var user_id = JSON.parse(window.localStorage.getItem("userLogined"));
  var expenselist = () => {
    axios
      .get(`http://localhost:4000/fetch_expenses/${user_id}`)
      .then((resp) => {
        ListExpenses(resp.data);
      
      });
  };
 


   var del_expense = (id) => {
    axios.delete(`http://localhost:4000/expense_del/${id}`).then(() => {
      toast.error("The Expense is deleted now !", {
        position: "top-right",
      });
      expenselist();
    });
  };
  function heighestToLow() {
    axios
      .get(`http://localhost:4000/highTolowestAmountExpense/${user_id}`)
      .then((resp) => {
        ListExpenses(resp.data);
      });
  }
  function LowtoHeighest() {
    axios
      .get(`http://localhost:4000/lowestTohighAmountExpense/${user_id}`)
      .then((resp) => {
        ListExpenses(resp.data);
      });
  }

   var [query, Setquery] = useState("");
    var search_expense = async () => {
      try {
        const resp = await fetch(
          `http://localhost:4000/search_expense/${user_id}/search?q=${query}`
        );
        const data = await resp.json();
        ListExpenses(data);
    
      } catch (error) {
        console.error(error);
      }
    };

   useEffect(() => {
    if (query.length === 0) {
      expenselist();
      return;
    }else{
      search_expense();
    }
  },[query]);  
  
  const generatePDF = () => {
  const doc = new jsPDF();

  doc.text("User Expenses Report", 14, 10);

  const tableColumn = ["Trip Name", "Amount", "Category", "Date", "Notes"];
  const tableRows = expensess.map((exp) => [
    exp.trip_name,
    exp.amount,
    exp.category_name,
    new Date(exp.expense_date).toLocaleDateString(),
    exp.notes,
  ]);

  // Call directly via imported function
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("expenses.pdf");
};
  return (
    <>
      <U_index></U_index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Expenses</h2>
          <div>
            <input
              type="text"
              placeholder="Search expenses..."
              value={query}
              onChange={(e) => {
                Setquery(e.target.value);
              }}
              className="search-input"
            />
            <Link className="btn btn-primary ms-2" to={"/add_expense"}>
             
              Add new
            </Link>
            <button className="btn btn-primary" onClick={() => heighestToLow()}>
              Heighest
            </button>
            <button className="btn btn-primary" onClick={() => LowtoHeighest()}>
              Lowest
            </button>
               <button
        onClick={generatePDF}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Download PDF
      </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Trip Name</th>
                <th>Amount</th>
                <th>category </th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensess.length > 0 ? (
                expensess.map((ex, index) => (
                  <tr key={ex.id}>
                    <td>{index + 1}</td>
                    <td>{ex.trip_name}</td>

                    <td>{ex.amount}</td>
                    <td>{ex.category_name}</td>
                    <td>
                      <Link
                        className="btn btn-edit btn-primary"
                        to={`/Editexpense/${ex._id}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          del_expense(ex._id);
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
                    No Expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Expensetable;
