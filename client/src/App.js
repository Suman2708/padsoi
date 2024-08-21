import React from 'react'
import Navbar from './components/header/Navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Signin from './components/signup/Signin';
import Signup from './components/signup/Signup';
import { Routes,Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import Checkout from "./components/Stripecheckout/Checkout"
import '../src/App.css';
import PaymentSuccess from './PaymentSuccess';
const App = () => {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, [])

  return (
    <div>
    {data ?(<><Navbar />
      <Newnav />
      <Routes>
        <Route path='/' element={<Maincomp />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/productone/:id' element={<Cart />} />
        <Route path='/buynow' element={<Buynow />} />
        <Route path='/stripe' element={<Checkout />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
      </Routes>
     
      <Footer /></>):(
        <div className="circle">
            <CircularProgress />
            <h2> Loading....</h2>
          </div>)}
      
    </div>
  )
}

export default App