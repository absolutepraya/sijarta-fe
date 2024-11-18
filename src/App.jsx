import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterPengguna from './pages/RegisterPengguna';
import RegisterPekerja from './pages/RegisterPekerja';
import Homepage from './pages/Homepage';
import SubkategoriPengguna from './pages/SubkategoriPengguna';
import SubkategoriPekerja from './pages/SubkategoriPekerja';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Navigate to='/' replace />} />
        <Route index element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/register/pengguna' element={<RegisterPengguna />} />
        <Route path='/register/pekerja' element={<RegisterPekerja />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/subkategori-pengguna' element={<SubkategoriPengguna />} />
        <Route path='/subkategori-pekerja' element={<SubkategoriPekerja />} />
      </Routes>
    </Router>
  )
}

export default App
