import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Coincontext } from "../../context/Coincontex";
import Linechart from "../../components/Linechart/Linechart";
import './Coin.css';

const Coin = () => {
  const { CoinId } = useParams();
  const { currency, allcoin } = useContext(Coincontext);

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(30); 
  const fetchCoindata = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${CoinId}`;
    try {
      const response = await fetch(url, {
        headers: { "x-cg-demo-api-key": "CG-mgjmDbC9QzNW4Yt1dFE1neZu" }
      });
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  const fetchHistoricalData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${CoinId}/market_chart?vs_currency=${currency.name}&days=${days}`;
    try {
      const response = await fetch(url, {
        headers: { "x-cg-demo-api-key": "CG-mgjmDbC9QzNW4Yt1dFE1neZu" }
      });
      const data = await response.json();
      setHistoricalData(data.prices); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoindata();
    fetchHistoricalData();
  }, [CoinId, currency, days]);

  const coin = allcoin.find(c => c.id === CoinId);
  if (!coin) return <p>Loading...</p>;

  return (
    <div className="coin-container">
      
      <div className="coin-card">
        <p>RANK : {coin.market_cap_rank}</p>
        <img src={coin.image} alt={coin.name} className="coin-logo" />
        <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
        <p>Price: {currency.Symbol}{coin.current_price.toLocaleString()}</p>
        <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
        <p>Market Cap: {currency.Symbol}{coin.market_cap.toLocaleString()}</p>
      </div>

      
      {coinData && coinData.description && (
        <div className="coin-extra">
          <h3>Description</h3>
          <p dangerouslySetInnerHTML={{ __html: coinData.description.en }} />
        </div>
      )}

      
      <div className="coin-chart">
        <h3>Price Chart</h3>

      
        <div className="timeframe-buttons">
          <button onClick={() => setDays(1)}>1D</button>
          <button onClick={() => setDays(7)}>7D</button>
          <button onClick={() => setDays(30)}>30D</button>
          <button onClick={() => setDays(90)}>90D</button>
          <button onClick={() => setDays(365)}>1Y</button>
        </div>

        <Linechart historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Coin;
