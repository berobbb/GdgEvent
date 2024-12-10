import React, { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MovieList from "./Components/MovieList";
import Footer from "./Components/Footer";
import toast from 'react-hot-toast';
import CartItems from "./Components/CartItems";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // sync state
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie) => {
    const movieInCart = cart.find((item) => item.id === movie.id);
  
    if (movieInCart) {
      toast.error('Item is already in the cart.');
    } else {
      setCart([...cart, movie]);
      toast.success('Item added to the cart.');
    }
  };
  
  const removeFromCart = (movieId) => {
    const movieInCart = cart.find((movie) => movie.id === movieId);
  
    if (movieInCart) {
      setCart(cart.filter((movie) => movie.id !== movieId));
      toast.success('Item removed from the cart.');
    } else {
      toast.error('Item is not in the cart.');
    }
  };


  return (
    <BrowserRouter>
      <div className="bg-black text-white">
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MovieList addToCart={addToCart}/>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <CartItems cart={cart} removeFromCart={removeFromCart}/>
            }
          />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
