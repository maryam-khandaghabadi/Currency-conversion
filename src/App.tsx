import React, { useState } from 'react';
import "./App.css";

const USD_TO_IRR = 920_000; // نرخ ثابت دلار
const IRR_TO_USD = 1 / USD_TO_IRR; // نرخ معکوس

function App() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<"USD" | "IRR">("USD");
  const [toCurrency, setToCurrency] = useState<"USD" | "IRR">("IRR");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convert = () => {
    const value = parseFloat(amount);
    if (isNaN(value)) return "";
    if (fromCurrency === "USD" && toCurrency === "IRR") {
      return (value * USD_TO_IRR).toLocaleString();
    } else if (fromCurrency === "IRR" && toCurrency === "USD") {
      return (value * IRR_TO_USD).toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return value.toLocaleString();
  };

  return (
    <div>
      <div className='bodyBackGround'></div>
      <div className='container'>
        <h2 className='title'>Convert {fromCurrency} to {toCurrency}</h2>

        <input
          className='amountInput'
          type="number"
          value={amount}
          onChange={handleChange}
          placeholder="Please enter the amount."
        />

        <div>
          <p>from</p>
          <h3>{fromCurrency} - {fromCurrency === "USD" ? "US Dollar" : "IR Rial"}</h3>
        </div>

        <button onClick={handleSwap}>
          <img src='/images/arrow-icon.png' alt="swap" />
        </button>

        <div>
          <p>to</p>
          <h3>{toCurrency} - {toCurrency === "USD" ? "US Dollar" : "IR Rial"}</h3>
        </div>

        {/* نمایش نتیجه */}
        {amount && (
          <div className="result">
            <p>Result:</p>
            <h3>{convert()} {toCurrency}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
