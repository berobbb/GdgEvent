import React from "react";

export default function CartItems({ cart, removeFromCart }) {
  return (
    <div className="p-6 text-white min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((movie) => (
            <div
            key={movie.id}
            className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
          >
            <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-56 object-contain rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.name}</h2>
                <p className="text-gray-400">Rating: {movie.rating}/10</p>
                
                {/* Genres Section */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button 
                    onClick={() => removeFromCart(movie.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Your cart is empty!</p>
      )}
    </div>
  );
}
