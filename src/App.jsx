import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import MyPay from './pages/red/MyPay';
import PekerjaanJasa from './pages/red/PekerjaanJasa';
import StatusPekerjaanJasa from './pages/red/StatusPekerjaanJasa';
import ProfilePekerja from './pages/yellow/ProfilePekerja';
import ProfilePengguna from './pages/yellow/ProfilePengguna';

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
					path="/subkategori-pengguna"
					element={<SubkategoriPengguna />}
				/>
				<Route
					path="/subkategori-pekerja"
					element={<SubkategoriPekerja />}
				/>
				<Route
					path="/view-pekerja"
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
					path='/status-pekerjaan-jasa'
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
			</Routes>
		</Router>
	);
}

export default App;
