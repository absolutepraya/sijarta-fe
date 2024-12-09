import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/green/LandingPage';
import LoginPage from './pages/yellow/LoginPage';
import RegisterPage from './pages/yellow/RegisterPage';
import RegisterPengguna from './pages/yellow/RegisterPengguna';
import RegisterPekerja from './pages/yellow/RegisterPekerja';
import Homepage from './pages/green/Homepage';
import SubkategoriPengguna from './pages/green/SubkategoriPengguna';
import SubkategoriPekerja from './pages/green/SubkategoriPekerja';
import ViewPekerja from './pages/green/ViewPekerja';
import MyPay from './pages/red/MyPay';
import PekerjaanJasa from './pages/red/PekerjaanJasa';
import StatusPekerjaanJasa from './pages/red/StatusPekerjaanJasa';
import ProfilePekerja from './pages/yellow/ProfilePekerja';
import ProfilePengguna from './pages/yellow/ProfilePengguna';
import Diskon from './pages/blue/Discount';
import Testimonial from './pages/blue/Testimonial';
import AddTestimonialForm from './pages/blue/AddTestimonialForm';

// TODO: There are some temporary routes here that need to be removed

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/*"
					element={
						<Navigate
							to="/"
							replace
						/>
					}
				/>
				<Route
					index
					element={<LandingPage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route
					path="/register/pengguna"
					element={<RegisterPengguna />}
				/>
				<Route
					path="/register/pekerja"
					element={<RegisterPekerja />}
				/>
				<Route
					path="/home"
					element={<Homepage />}
				/>
				<Route
					path="/home-pekerja" // Temporary
					element={<Homepage isPekerja={true} />}
				/>
				<Route
					path="/kategori/:catId/subkategori/:subId"
					element={<SubkategoriPengguna />}
				/>
				<Route
					path="/subkategori-pekerja"
					element={<SubkategoriPekerja />}
				/>
				<Route
					path="/view-pekerja/:pkId"
					element={<ViewPekerja />}
				/>
				<Route
					path="/mypay/pelanggan"
					element={<MyPay isPekerja={false} />}
				/>
				<Route
					path="/mypay/pekerja"
					element={<MyPay isPekerja={true} />}
				/>
				<Route
					path="/pekerjaan-jasa"
					element={<PekerjaanJasa />}
				/>
				<Route
					path="/status-pekerjaan-jasa"
					element={<StatusPekerjaanJasa />}
				/>
				<Route
					path="/profile/pengguna"
					element={<ProfilePengguna />}
				/>
				<Route
					path="/profile/pekerja"
					element={<ProfilePekerja />}
				/>
				<Route
					path="/discounts"
					element={<Diskon />}
				/>
				<Route
					path="/testimonials"
					element={<Testimonial />}
				/>
				<Route
					path="/add-testimonial"
					element={<AddTestimonialForm />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
