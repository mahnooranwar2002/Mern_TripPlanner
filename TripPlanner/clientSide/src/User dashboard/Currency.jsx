// import "../assets/css/currency.css";
// import React, { useEffect, useState } from "react";
// import U_index from "./U_index";
// import axios from "axios";

// function Currency() {
//   const [currencies, setCurrencies] = useState([]);
//   const [from, setFrom] = useState("USD");
//   const [to, setTo] = useState("PKR");
//   const [amount, setAmount] = useState("");
//   const [rate, setRate] = useState(0);
//   const [converted, setConverted] = useState(null);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/currencies")
//       .then(res => setCurrencies(res.data))
//       .catch(err => console.error(err));

//     axios.get("http://localhost:4000/api/history")
//       .then(res => setHistory(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const convertCurrency = async () => {
//     if (!amount || isNaN(amount)) {
//       alert("Enter a valid amount");
//       return;
//     }
//     const res = await axios.get("http://localhost:4000/api/convert", {
//       params: { from, to, amount }
//     });
//     setRate(res.data.rate);
//     setConverted(res.data.convertedAmount);
//     setHistory(prev => [res.data, ...prev]);
//   };

//   return (
//     <>
//           <U_index></U_index>

//     <div className="currency-container">
//       <div className="currency-card">
//         <h2 className="title">💱 Currency Converter</h2>

//         <div className="form-group">
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <select value={from} onChange={(e) => setFrom(e.target.value)}>
//             {currencies.map(c => (
//               <option key={c} value={c}>{c}</option>
//             ))}
//           </select>

//           <button className="swap-btn" onClick={() => {
//             const temp = from;
//             setFrom(to);
//             setTo(temp);
//           }}>⇄</button>

//           <select value={to} onChange={(e) => setTo(e.target.value)}>
//             {currencies.map(c => (
//               <option key={c} value={c}>{c}</option>
//             ))}
//           </select>
//         </div>

//         <button className="convert-btn" onClick={convertCurrency}>
//           Convert
//         </button>

//         {converted && (
//           <div className="result">
//             <p>{amount} {from} = <strong>{converted} {to}</strong></p>
//             <small>Exchange Rate: {rate}</small>
//           </div>
//         )}

//         <h3>📜 Conversion History</h3>
//         <ul className="history-list">
//           {history.map((h, i) => (
//             <li key={i}>
//               {h.amount} {h.from} → {h.convertedAmount} {h.to} (Rate: {h.rate})
//             </li>
//           ))}
//         </ul>
//       </div>

//     </div>
//         </>

//   );
// }

// export default Currency;

import React, { useEffect, useState } from "react";
import axios from "axios";
import U_index from "./U_index";


function Currency() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [converted, setConverted] = useState(null);
  const [history, setHistory] = useState([]);

  // Currency.jsx
const userId = JSON.parse(localStorage.getItem("userLogined"));


useEffect(() => {
    axios.get("http://localhost:4000/api/currencies")
      .then(res => setCurrencies(res.data))
      .catch(err => console.error(err));

  axios.get(`http://localhost:4000/api/history`, {
    params: { userId }
  })
    .then(res => setHistory(res.data))
    .catch(err => console.error(err));
}, []);

const convertCurrency = async () => {
  if (!amount || isNaN(amount)) {
    alert("Enter a valid amount");
    return;
  }
  const res = await axios.get("http://localhost:4000/api/convert", {
    params: { from, to, amount, userId }
  });
  setRate(res.data.rate);
  setConverted(res.data.convertedAmount);
  setHistory(prev => [res.data, ...prev]);
};

  return (
    // <div style={{ padding: 20 }}>
    //   <h2>Currency Converter</h2>

    //   <input
    //     type="number"
    //     placeholder="Amount"
    //     value={amount}
    //     onChange={(e) => setAmount(e.target.value)}
    //   />

    //      <button onClick={convertCurrency}>Convert</button>

    //   <br/>

    //   <select value={from} onChange={(e) => setFrom(e.target.value)}>
    //     {currencies.map(c => (
    //       <option key={c} value={c}>{c}</option>
    //     ))}
    //   </select>

    //   <button onClick={() => { const temp = from; setFrom(to); setTo(temp); }}>
    //     Swap
    //   </button>

    //   <select value={to} onChange={(e) => setTo(e.target.value)}>
    //     {currencies.map(c => (
    //       <option key={c} value={c}>{c}</option>
    //     ))}
    //   </select>

   

    //   {converted && (
    //     <p>
    //       {amount} {from} = {converted} {to} <br />
    //      Exchange Rate: {rate}
    //     </p>
    //   )}

    //   <h3>Conversion History</h3>
    //   <ul>
    //     {history.map((h, i) => (
    //       <li key={i}>
    //         {h.amount} {h.from} → {h.convertedAmount} {h.to} (Rate: {h.rate})
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
          <U_index></U_index>

      <div className="currency-container">
        <div className="currency-card">
          <h3 className="title">💱 Currency Converter</h3>

          <div className="form-group">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              className="swap-btn"
              onClick={() => {
                const temp = from;
                setFrom(to);
                setTo(temp);
              }}
            >
              ⇄
            </button>

            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button className="convert-btn" onClick={convertCurrency}>
            Convert
          </button>

          {converted && (
            <div className="result">
              <p>
                {amount} {from} ={" "}
                <strong>
                  {converted} {to}
                </strong>
              </p>
              <small>Exchange Rate: {rate}</small>
            </div>
          )}

          <h3>📜 Conversion History</h3>
          <ul className="history-list">
            {history.map((h, i) => (
              <li key={i}>
                {h.amount} {h.from} → {h.convertedAmount} {h.to} (Rate: {h.rate}
                )
              </li>
            ))}
          </ul>
        </div>
      </div>
  </>
);
}

export default Currency;

