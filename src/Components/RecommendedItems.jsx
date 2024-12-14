import React from 'react'

export const RecommendedItems = ({ movies }) => {
    console.log(movies);
    return (
        <div className="p-6 text-white min-h-screen mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Recommended For You</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbId}
              className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
            >
              <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-56 object-contain rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{movie.Title}</h2>
                  <p className="text-gray-400">Rating: {movie.imdbRating}/10</p>
                  
                  {/* Genres Section */}
                  <div className="mt-2 flex flex-wrap gap-2">
                  {movie.Genre.split(", ").map((genre, index) => (
                    <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full mr-1 mb-1 inline-block"
                    >
                        {genre.trim()}
                    </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      onClick={() => addToCart(movie)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
