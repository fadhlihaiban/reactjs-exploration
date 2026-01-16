import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  //1. State menyimpan list
  const [items, setItems] = useState(['Belajar React','Beli Kopi']);
  
  //2. State menangkap input dari form (seperti $_POST)
  const [inputBaru, setInputBaru] = useState('');

  const tambahData = () => {
    if (inputBaru.trim() !== ""){
      setItems([...items, inputBaru]);
      setInputBaru(''); // Kosongkan input setelah tambah
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Daftar Kegiatan</h2>

      {/* Input Form */}
      <input
        type="text"
        value={inputBaru}
        onChange={(e) => setInputBaru(e.target.value)}
        placeholder="Ketik sesuatu..."
      />
      <button onClick={tambahData}>Tambah</button>

      {/* Menampilkan Data*/}
      <ul>
        {items.map((item, index) => (
          <li>
            {item}
            <button onClick={() => setItems(items.filter((_, i) => i !== index))}>
              Hapus
            </button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
