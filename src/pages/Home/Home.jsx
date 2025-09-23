import { Coincontext } from "../../context/Coincontex";
import "./Home.css";

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { allcoin, currency } = useContext(Coincontext);
  const [displayCoin, setDisplaycoin] = useState([]);
  const[input,setInput]=useState('');
  
  const sortedCoins = [...displayCoin].sort(
  (a, b) => a.market_cap_rank - b.market_cap_rank
);


  const inputHandler = (event)=>{
setInput(event.target.value);
  }

const searchHandler = async(event)=>{
event.preventDefault();
 const coins = await allcoin.filter((item)=>{
 return item.name.toLowerCase().includes(input.toLowerCase());

})
setDisplaycoin(coins);
}



 useEffect(() => {
  const filtered = allcoin.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
  setDisplaycoin(filtered);
}, [input, allcoin]);


  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Market
        </h1>
        <p>
          Welcome to the CryptoGram here you can check and analize all the
          crypot in a fast and easy way{" "}
        </p>
        <form onSubmit={searchHandler}>
          <input  onChange={inputHandler} value={input} type="text" placeholder="search crypto..." required />
          <button type="submit">search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>coins</p>
          <p>price</p>
          <p className="hr-change">24H change</p>
          <p className="market-cap">market cap</p>
        </div>
        {Array.isArray(displayCoin) &&
  displayCoin.slice(0, 15).map((item, index) => (
    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
      <p>{item.market_cap_rank}</p>
      <div>
        <img src={item.image} alt={item.name} width="25" height="25" />
        <span>{item.name + " _ " + item.symbol}</span>
      </div>
      <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
      <p className={item.price_change_percentage_24h>0?"green":"red"}>
        {Math.floor(item.price_change_percentage_24h*100)/100}%</p>
      <p  className="market-cap"> {currency.Symbol}{item.market_cap.toLocaleString()}</p>
    </Link>
))}

      </div>
    </div>
  );
};

export default Home;
