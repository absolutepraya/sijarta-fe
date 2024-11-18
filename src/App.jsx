import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import LandingPage from './pages/red/LandingPage';
import LoginPage from './pages/red/LoginPage';
import RegisterPage from './pages/red/RegisterPage';
import RegisterPengguna from './pages/red/RegisterPengguna';
import RegisterPekerja from './pages/red/RegisterPekerja';
import Homepage from './pages/red/Homepage';
import SubkategoriPengguna from './pages/red/SubkategoriPengguna';
import SubkategoriPekerja from './pages/red/SubkategoriPekerja';
import ViewPekerja from './pages/red/ViewPekerja';

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
