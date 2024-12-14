import React from 'react'

// RecommendedItems Component: Displays a grid of recommended movies
export const RecommendedItems = ({ movies }) => {
    // Log the movies array to console for debugging purposes
    console.log(movies);

    return (
        <div className="p-6 text-white min-h-screen mt-10">
            {/* Page title for recommended movies */}
            <h1 className="text-3xl font-bold text-center mb-6">Recommended For You</h1>
            
            {/* Responsive grid layout for movie cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Map through the movies array to render individual movie cards */}
                {movies.map((movie) => (
                    <div
                        // Use imdbId as the unique key for each movie card
                        key={movie.imdbId}
                        // Styling for interactive hover effect
                        className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
                    >
                        {/* Movie card container with styling */}
                        <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                            {/* Movie poster image */}
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-56 object-contain rounded-t-lg"
                            />
                            
                            {/* Movie details section */}
                            <div className="p-4">
                                {/* Movie title */}
                                <h2 className="text-lg font-semibold">{movie.Title}</h2>
                                
                                {/* Movie rating */}
                                <p className="text-gray-400">Rating: {movie.imdbRating}/10</p>
                                
                                {/* Genres display */}
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {/* Split genre string and create genre tags */}
                                    {movie.Genre.split(", ").map((genre, index) => (
                                        <span 
                                            key={index} 
                                            // Styling for individual genre tags
                                            className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full mr-1 mb-1 inline-block"
                                        >
                                            {/* Trim any extra whitespace from genre */}
                                            {genre.trim()}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Add to Cart section */}
                                <div className="mt-4 flex justify-between items-center">
                                    <button 
                                        // Note: addToCart function is not defined in this component
                                        // Assumes it will be passed as a prop or defined in a parent component
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