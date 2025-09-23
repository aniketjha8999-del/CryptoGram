import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";

const App = () => {
  return (
    <div className="app">
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes change content based on URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:CoinId" element={<Coin />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default App;
