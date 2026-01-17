import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'; // Seperti 'include' atau 'required' di PHP

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' ;

//1. Buat Kompnen Halaman Sederhana
const Home = () => <h2>Ini Halaman Home</h2>;
const About = () => <h2>Ini Halaman About</h2>;


function App() {

  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        {/* Link ini pengganti <a href='...'> di HTML/PHP */}
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
