import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import LandingPage from './pages/green/LandingPage';
import LoginPage from './pages/green/LoginPage';
import RegisterPage from './pages/green/RegisterPage';
import RegisterPengguna from './pages/green/RegisterPengguna';
import RegisterPekerja from './pages/green/RegisterPekerja';
import Homepage from './pages/green/Homepage';
import SubkategoriPengguna from './pages/green/SubkategoriPengguna';
import SubkategoriPekerja from './pages/green/SubkategoriPekerja';
import ViewPekerja from './pages/green/ViewPekerja';

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
        <Route path='/view-pekerja' element={<ViewPekerja />} />
      </Routes>
    </Router>
  )
}

export default App
