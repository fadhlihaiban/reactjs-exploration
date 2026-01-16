import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const tambahData = () => {
    if (inputBaru.trim() !== ""){
      setItems([...items, inputBaru]);
      setInputBaru(''); // Kosongkan input setelah tambah
    }
  }

  //useEffect nerupakan "Lifecycle Hook"
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)    //Simpan data ke state
        setLoading(false) // Matikan status loading
      })
      .catch(error => console.error("Gagal ambil data:", error))
  }, []) //Array kosong [] artinya, jalan hanya 1x saat halaman pertama kali dibuka

  if (loading) return <h4>Sedang loading data ...</h4>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Daftar Pengguna (API Terkoneksi)</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {/*id berasal dari data API (unique)*/}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>

      </table>
      

    </div>
  )
}

export default App
