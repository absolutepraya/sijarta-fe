import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import NavBar from './components/NavBar';
import LandingPage from './pages/green/LandingPage';
import LoginPage from './pages/yellow/LoginPage';
import RegisterPage from './pages/yellow/RegisterPage';
import RegisterPengguna from './pages/yellow/RegisterPengguna';
import RegisterPekerja from './pages/yellow/RegisterPekerja';
import Homepage from './pages/green/Homepage';
import SubkategoriPengguna from './pages/green/SubkategoriPengguna';
import SubkategoriPekerja from './pages/green/SubkategoriPekerja';
import ViewPekerja from './pages/green/ViewPekerja';
import AddTestimonialForm from './pages/blue/AddTestimonialForm';
import Testimonial from './pages/blue/Testimonial';
import Discount from './pages/blue/Discount';

function App() {
  return (
    <Router>
      <NavBar />
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
        <Route path='/testimonial' element={<Testimonial />} />
        <Route path='/add-testimonial' element={<AddTestimonialForm />} />
        <Route path='/discount' element={<Discount />} />
      </Routes>
    </Router>
  )
}

export default App
