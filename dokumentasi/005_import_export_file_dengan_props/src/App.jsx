import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'; // Seperti 'include' atau 'required' di PHP

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  

  return (
    <div>
      <Header judul="Halaman Admin" /> {/* cara pakainya seperti tag HTML biasa*/}

      <main style={{ padding: '20ox' }}>
        <p>Selamat datang di aplikasi React</p>
      </main>
    </div>
  )
}

export default App
