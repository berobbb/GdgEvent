import React from 'react';

export default function MovieList() {
    const movies = [
      {
        id: 1,
        name: "Inception",
        rating: 8.8,
        image: "/images/Inception.png",
      },
      {
        id: 2,
        name: "The Dark Knight",
        rating: 9.0,
        image: "/images/Dark.png",
      },
      {
        id: 3,
        name: "Interstellar",
        rating: 8.6,
        image: "/images/Interstellar.png",
      },
      {
        id: 4,
        name: "Titanic",
        rating: 7.8,
        image: "/images/titanic.png",
      },
    ];
  
    return (
      <div className="p-6  text-white min-h-screen mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Movie List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
            >
              
              <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{movie.name}</h2>
                  <p className="text-gray-400">Rating: {movie.rating}/10</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }