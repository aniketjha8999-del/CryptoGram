import { createContext, useEffect, useState } from "react";


export const Coincontext =createContext();

const CoincontextPovider = (props)=>{
   const [allcoin,setAllcoin]=useState([]);
   const [currency,setCurrency]=useState({
      name:"USD",
      Symbol:"$",
   });

   const fetchAllcoin = async ()=>{
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`;
const options = {
  method: 'GET',
  headers: {'x-cg-demo-api-key': 'CG-mgjmDbC9QzNW4Yt1dFE1neZu'},
  body: undefined
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  setAllcoin(data);
} catch (error) {
  console.error(error);
}
   };


   useEffect(() => {
     fetchAllcoin();

     const interval = setInterval(()=>{
      fetchAllcoin();
     },5000); // yaha se update ka timing change karna

     return ()=>clearInterval(interval);
    
   },[currency] );
   
   const contextValue ={
      allcoin,
      currency,
      setCurrency,
   };
   return (
      <Coincontext.Provider value={contextValue}>
         {props.children}
      </Coincontext.Provider>
   );
};

export default CoincontextPovider;
