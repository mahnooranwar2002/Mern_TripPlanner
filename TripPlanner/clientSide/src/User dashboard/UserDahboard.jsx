import React from "react";
import U_index from "./U_index";
import TripBudgetChart from "./TripBudgetChart";
import ExpenseChart from "./ExpenseChart";

const UserDashboard = () => {
  return (
    <div>
      {/* Top Section */}
      <U_index />

      {/* Charts in one row */}
      <div className="container mt-4 me-5">
        <div className="row">
          <div className="col-md-6">
            <TripBudgetChart />
          </div>
          <div className="col-md-6">
            <ExpenseChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
