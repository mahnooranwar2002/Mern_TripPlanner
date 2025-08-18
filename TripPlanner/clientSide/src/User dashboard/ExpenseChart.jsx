import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = () => {
  const user_id = JSON.parse(window.localStorage.getItem("userLogined"));
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = () => {
    axios
      .get(`http://localhost:4000/fetch_expenses/${user_id}`)
      .then((resp) => {
        setExpenses(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []); // Empty dependency array to run only once

  // Transform expense data for the chart
  const prepareChartData = () => {
    return expenses.map((expense) => ({
      x: new Date(expense.expense_date).getTime(), // Using timestamp for X-axis
      y: expense.amount,
      name: expense.trip_name,
      category: expense.category_name,
    }));
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
  <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
    Expense Analysis
  </h3>
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis
        type="number"
        dataKey="x"
        name="Date"
        domain={["auto", "auto"]}
        tickFormatter={(unixTime) =>
          new Date(unixTime).toLocaleDateString()
        }
      />
      <YAxis type="number" dataKey="y" name="Amount" unit="₹" />
      <ZAxis type="number" dataKey="y" range={[60, 400]} name="Amount" />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        formatter={(value, name) => {
          if (name === "x") {
            return [new Date(value).toLocaleDateString(), "Date"];
          }
          if (name === "y") {
            return [`₹${value}`, "Amount"];
          }
          return [value, name];
        }}
        labelFormatter={(label) => {
          const expense = expenses.find((exp) => exp.trip_name === label);
          return `Trip: ${label}\nCategory: ${
            expense?.category_name || "N/A"
          }`;
        }}
      />
      <Legend />
      {Array.from(new Set(expenses.map((exp) => exp.trip_name))).map(
        (tripName, index) => {
          const tripExpenses = prepareChartData().filter(
            (exp) => exp.name === tripName
          );
          const colors = [
            "#8884d8",
            "#82ca9d",
            "#ffc658",
            "#ff8042",
            "#0088fe",
          ];

          return (
            <Scatter
              key={tripName}
              name={tripName}
              data={tripExpenses}
              fill={colors[index % colors.length]}
              line
              shape="circle"
            />
          );
        }
      )}
    </ScatterChart>
  </ResponsiveContainer>
</div>

  );
};

export default ExpenseChart;
