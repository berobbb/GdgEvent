// Importing necessary React hooks and components
import React, { useState, useEffect } from "react";

// Importing custom components for the application
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MovieList from "./Components/MovieList";
import Footer from "./Components/Footer";
import toast from 'react-hot-toast'; // For displaying notification toasts
import CartItems from "./Components/CartItems";
import { BrowserRouter, Routes, Route } from "react-router"; // For handling routing
import { RecommendedItems } from "./Components/RecommendedItems";

export default function App() {
  // State management for cart items
  // Initialize cart from localStorage if exists, otherwise start with an empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // State to store recommended movies
  const [recMovies, setRecMovies] = useState([]);

  // Effect to synchronize cart state with localStorage
  // Runs every time cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a movie to the cart
  const addToCart = async (movie) => {
    // Check if movie is already in the cart
    const movieInCart = cart.find((item) => item.id === movie.id);

    if (movieInCart) {
      // Show error toast if movie is already in cart
      toast.error('Item is already in the cart.');
    } else {
      try {
        // Add movie to cart
        setCart([...cart, movie]);
        // Show success toast
        toast.success('Item added to the cart.');
  
        // Send a request to backend to get movie recommendations
        const response = await fetch('http://127.0.0.1:5000/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: movie.name,  // Send movie name to get recommendations
            top_n: 5,           // Request top 5 recommendations
          }),
        });
  
        // Throw error if response is not ok
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations.');
        }

        // Parse recommended movies from response
        const recommendedMovies = await response.json();
        console.log('Recommended Movies:', recommendedMovies);
        // Update state with recommended movies
        setRecMovies(recommendedMovies);
      } catch (error) {
        // Log and show error if recommendation fetch fails
        console.error('Error while fetching recommendations:', error);
        toast.error('Failed to fetch recommendations.');
      }
    }
  };
  
  // Function to remove a movie from the cart
  const removeFromCart = (movieId) => {
    // Find the movie in the cart
    const movieInCart = cart.find((movie) => movie.id === movieId);
  
    if (movieInCart) {
      // Remove the movie from cart
      setCart(cart.filter((movie) => movie.id !== movieId));
      // Show success toast
      toast.success('Item removed from the cart.');
    } else {
      // Show error toast if movie is not in cart
      toast.error('Item is not in the cart.');
    }
  };

  // Render the application layout and routes
  return (
    <BrowserRouter>
      <div className="bg-black text-white">
        {/* Navbar with cart item count */}
        <Navbar cartCount={cart.length} />
        
        {/* Define application routes */}
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <>
                {/* Hero section */}
                <Hero />
                
                {/* Show recommended items if available */}
                {recMovies.length > 0 && (
                  <RecommendedItems movies={recMovies}/>
                )}
                
                {/* Movie list with add to cart functionality */}
                <MovieList addToCart={addToCart}/>
              </>
            }
          />
          
          {/* Cart route */}
          <Route
            path="/cart"
            element={
              <CartItems cart={cart} removeFromCart={removeFromCart}/>
            }
          />
        </Routes>
        
        {/* Footer component */}
        <Footer/>
      </div>
    </BrowserRouter>
  );
}