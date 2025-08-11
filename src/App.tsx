import React, { useState } from 'react';
import "./App.css";

const USD_TO_IRR = 920_000; // نرخ ثابت دلار
const IRR_TO_USD = 1 / USD_TO_IRR; // نرخ معکوس

// تابع کمکی برای فرمت عدد
const formatNumber = (num: number, fractionDigits: number = 0) => {
  return num.toLocaleString(undefined, { maximumFractionDigits: fractionDigits });
};

function App() {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<"USD" | "IRR">("USD");
  const [toCurrency, setToCurrency] = useState<"USD" | "IRR">("IRR");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convert = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 0) return "";

    if (fromCurrency === "USD" && toCurrency === "IRR") {
      return formatNumber(value * USD_TO_IRR);
    } else if (fromCurrency === "IRR" && toCurrency === "USD") {
      return formatNumber(value * IRR_TO_USD, 2);
    }
    return formatNumber(value);
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

        <div className='fromSection'>
          <p className='fromParagraph'>from</p>
          <h3>{fromCurrency} - {fromCurrency === "USD" ? "US Dollar" : "IR Rial"}</h3>
        </div>

        <button onClick={handleSwap} className='swipIcon'>
          <img src='/images/arrow-icon.png' alt="swap" />
        </button>

        <div className='toSection'>
          <p className='fromParagraph'>to</p>
          <h3>{toCurrency} - {toCurrency === "USD" ? "US Dollar" : "IR Rial"}</h3>
        </div>

        {/* نمایش نتیجه */}
        {amount && (
          <div className="result">
            <h4>{formatNumber(parseFloat(amount))} {fromCurrency} = </h4>
            <h3>{convert()} {toCurrency}</h3>
            <p>
              1 {fromCurrency} ={" "}
              {fromCurrency === "USD"
                ?` ${formatNumber(USD_TO_IRR)} IR Rial`
                :` ${formatNumber(IRR_TO_USD, 6)} US Dollar`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;