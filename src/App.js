
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/ReactToastify.css';
import NavBar from './NavBar'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile'
import Cart from './Cart'
import Checkout from './CheckOut';
import Product from './Product'
import DetailsProduct from './DetailsProduct'
import Payment from './Payment'
import OrderTracking from './OrderTracking'
import Successful from './Successful'
import NotFound from "./NotFound"; // دي لو المسار غلط او مش عندنا   
import Footer from './Footer'
import './App.css';


function App() {

    
    const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  }; 
  return (
  <>
  <NavBar cartCount={cartCount}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/NavBar" component={<NavBar/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/CheckOut" element={<Checkout />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/product/:id" element={<DetailsProduct onAddToCart={handleAddToCart} />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/OrderTracking" element={<OrderTracking />} />
      <Route path="/Successful" element={<Successful />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/Footer" component={<Footer/>} />
    </Routes>
  <Footer/>
  </>
  );
}

export default App;
