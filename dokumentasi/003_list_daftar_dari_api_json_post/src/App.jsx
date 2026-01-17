import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(hasil => {
        setData(hasil.slice(0, 10)) //Ambil 10 data agar tidak kepanjangan
        setLoading(false) // Matikan status loading
      })
      .catch(error => console.error("Gagal ambil data:", error))
  }, []) //Array kosong [] artinya, jalan hanya 1x saat halaman pertama kali dibuka

  if (loading) return <h4>Sedang loading data ...</h4>

  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Postingan</h2>
      <ul>
        {data.map((item) => (
          /* "key" harus ada di elemen paling atas hasil looping */
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
      

    </div>
  )
}

export default App
