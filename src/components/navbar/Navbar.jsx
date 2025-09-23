import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png';
import { Coincontext } from '../../context/Coincontex';
import { Link, Links } from 'react-router-dom';



const Navbar = () => {

  const {setCurrency}=useContext(Coincontext)

  const currencyHandler =(event)=>{
switch(event.target.value){
  case "usd":{
    setCurrency({name:"usd",Symbol:"$"})
    break;
  }
  case "euro":{
    setCurrency({
      name:"eur",Symbol:"€"
    })
    break;
  }

  case "inr":{
    setCurrency({
      name:"inr",Symbol: "₹"
    })
    break;
  }
  default:{
    setCurrency({
      name:"usd",Symbol:"$"
    })
  }
} 
  }
  return (
    <div className='navbar'>
      <Link to={`/`}>
       <img className='logo' src={logo} alt="CryotoGram" /><h5>CryotoGram</h5>
      </Link>
     
    
      <ul className='ul'>
        <Link to={`/`}> <li>Home</li></Link>
        
          <li>Feature</li>
           <li>Pricing</li>
            <li>Blog</li>
      </ul>
      
      <div className="nav-right">
         <select onChange={currencyHandler}>
            <option value="usd">USD</option>
             <option value="euro">EURO</option>
              <option value="inr">INR</option>
              
         </select>

         <button>Sign up <i className="fa-solid fa-right-to-bracket"></i> </button>
      </div>
      
    </div>
  )
}

export default Navbar;
