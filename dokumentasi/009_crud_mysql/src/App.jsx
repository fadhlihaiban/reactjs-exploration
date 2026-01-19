import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'; // Seperti 'include' atau 'required' di PHP

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' ;

//1. Buat Kompnen Halaman Sederhana
const Home = () => <h2>Ini Halaman Home</h2>;
const About = () => <h2>Ini Halaman About</h2>;
const apiUrl = import.meta.env.VITE_API_URL;


function App() {

  //definisikan state
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  //state form harus didefinisikan dulu
  const [form, setForm] = useState({
    nama: '',
    email: ''
  });

  useEffect(() => {
   
    fetch(`${apiUrl}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  //2. State untuk Form (Satu objek untuk semua input)
  const handleChange = (e) => {
    // seperti menangkap $_POST secara real-time
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //4. Fungsi Simpan (submit)
  const simpanData = async (e) => {
    e.preventDefault(); //Mencegah refresh halaman (khas SPA)
    //kirim data ke backend (nodejs)

    if(editId){
      //Logika Update (PUT)
      await fetch(`${apiUrl}/users/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form) // Mengirim objek form
    });
    } else {
      //Logika simpan baru
      await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form) // Mengirim objek form
      });

    }

    setForm({ nama: '', email: ''});
    //panggil ulang data dari database agar tabel update
    fetch(`${apiUrl}/users`).then(res => res.json()).then(data => setUsers(data));
  };

  const hapusUser = async (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      const apiUrl = import.meta.env.VITE_API_URL;
      await fetch(`${apiUrl}/users/${id}`, { method: 'DELETE' });

      //Update state agar tampilan langsung berubah tanpa refresh
      setUsers(users.filter(user => users.id !== id));
    }
  };

  const klikEdit = (user) => {
    setEditId(user.id);
    setForm({ nama: user.nama, email: user.email});
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Input Data Pengguna</h2>
      <form onSubmit={simpanData} style={{ marginBottom: '20px' }}>
        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>
          {editId ? 'Update Data' : 'Simpan Data'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({nama: '', email: ''}) }} style={{ marginLeft: '5px' }}>Batal</button>}
      </form>

      <hr />

      <h3>Daftar User:</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', bordeCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nama}</td>
              <td>{u.email}</td>
              <td>
                {/*Tombol Edit*/}
                <button
                  onClick={() => klikEdit(u)}
                  style={{ marginRight: '10px', cursor: 'pointer', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '3px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => hapusUser(u.id)}
                  style={{ cursor: 'pointer', backgroundColor: '#dc3545' , color: 'white', border: 'nonte', padding: '5px 10px', borderRadius: '3px' }}
                >Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    

    </div>
  )
}

export default App
