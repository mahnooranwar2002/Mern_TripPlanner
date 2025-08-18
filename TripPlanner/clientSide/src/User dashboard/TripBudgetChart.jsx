import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import U_index from './U_index';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  // payload[0].payload contains the full data object for the hovered bar
  const trip = payload[0].payload;
  return (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0 0 5px rgba(0,0,0,0.3)"
    }}>
      <strong>{label}</strong>
      <p>
        <strong>Budget:</strong> {trip.budget} {trip.preferred_currency}
      </p>
      <p><strong>Category:</strong> {trip.category_id}</p>
      <p><strong>Categories Budget:</strong></p>
      <ul style={{ margin: 0, paddingLeft: "15px" }}>
        <li>Accommodation: {trip.accommodation} {trip.preferred_currency}</li>
        <li>Food: {trip.food} {trip.preferred_currency}</li>
        <li>Transport: {trip.transport} {trip.preferred_currency}</li>
      </ul>
    </div>
  )
}

function TripBudgetChart() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   var user_id =  JSON.parse(window.localStorage.getItem("userLogined"));; 

  useEffect(() => {
    fetch(`http://localhost:4000/alltrips/${user_id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch trips");
        return res.json();
      })
      .then(data => {
        setTrips(data);
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error: {error}</p>;

  // Pass all needed data for tooltip inside each object
  const data = trips.map(trip => ({
    name: trip.trip_name,
    budget: trip.budget,
    preferred_currency: trip.preferred_currency || "PKR",
    category_id: trip.category_id,
   food: trip.food,
   accommodation:trip.accommodation,
   transport:trip.transport
    
  }));

  return (
    <div
  style={{
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    height: "100%"
  }}
>
  <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
    Trip Budget Tracking
  </h3>
  <ResponsiveContainer width="100%" height={350}>
    <BarChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="budget" fill="#029e9d" name="Total Budget" />
    </BarChart>
  </ResponsiveContainer>
</div>

  );
}

export default TripBudgetChart;
