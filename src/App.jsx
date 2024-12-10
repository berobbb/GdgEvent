import React from 'react'
import Navbar from './components/Navbar'
import Hero from './Components/Hero'
import MovieList from './Components/MovieList'


export default function App() {
  return (
    <div className=' bg-black'>
       <Navbar/>
       <Hero/>
       <MovieList/>
    </div>
  )
}
