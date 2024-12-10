import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MovieList from "./Components/MovieList";
import Footer from "./Components/Footer";
import CartItems from "./Components/CartItems";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-black text-white">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MovieList />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <CartItems/>
            }
          />
        </Routes>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  );
}
