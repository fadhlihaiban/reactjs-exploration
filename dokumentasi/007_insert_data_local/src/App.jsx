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
  //1. State untuk List Data
  const [users, setUsers] = useState([
    { id: 1, nama: 'Budi', email: 'budi@mail.com' }
  ]);

  //state form harus didefinisikan dulu
  const [form, setForm] = useState({
    nama: '',
    email: ''
  });

  //2. State untuk Form (Satu objek untuk semua input)
  const handleChange = (e) => {
    // seperti menangkap $_POST secara real-time
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //4. Fungsi Simpan (submit)
  const simpanData = (e) => {
    e.preventDefault(); //Mencegah refresh halaman (khas SPA)

    //validasi sederhana
    if(!form.nama || !form.email) return alert("Isi semua formulir!");

    const dataBaru = {
      id: Date.now(), // Generate ID untuk sementara
      nama: form.nama,
      email: form.email
    };

    setUsers([...users, dataBaru]); //tambahkan ke list
    setForm({ nama: '', email: ''}); //reset form

  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Input Data Pengguna</h2>
      <form onSubmit={simpanData}>
        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button type="submit">Simpan</button>
      </form>

      <hr />

      <h3>Daftar User:</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.nama}</li>
        ))}
      </ul>
      

    </div>
  )
}

export default App
