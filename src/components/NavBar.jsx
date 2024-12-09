import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NavBar({ isLoggedIn }) {
	const [isPekerjaanOpen, setIsPekerjaanOpen] = useState(false);

	const nama = sessionStorage.getItem('nama');
	const role = sessionStorage.getItem('role');

	const togglePekerjaan = () => {
		setIsPekerjaanOpen(!isPekerjaanOpen);
	};

	const handleLogOut = () => {
		sessionStorage.clear();
		window.location.href = '/login';
	};

	return (
		<nav className="fixed left-0 top-0 !z-[100] w-full text-nowrap bg-green-800 shadow-lg">
			<div className="container mx-auto">
				<div className="flex items-center justify-center py-4">
					{/* Navbar Links */}
					<ul className="flex items-center space-x-6 text-white">
						{!isLoggedIn ? (
							// Navbar for Guest
							<>
								<li>
									<a
										href="/login"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="/register"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Register
									</a>
								</li>
							</>
						) : role === 'pelanggan' ? (
							// Navbar for pelanggan
							<>
								<li>
									<p className="font-bold">
										🧑🏼 {nama} | {role.toUpperCase()}
									</p>
								</li>
								<li>
									<a
										href="/home"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/mypay/pelanggan"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										MyPay
									</a>
								</li>
								<li>
									<a
										href="/orders"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Kelola Pesanan
									</a>
								</li>
								<li>
									<a
										href="/discounts"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Diskon
									</a>
								</li>
								<li>
									<a
										href="/profile/pengguna"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Profile
									</a>
								</li>
								<li>
									<button
										className="rounded px-3 py-2 hover:bg-green-700"
										onClick={handleLogOut}
									>
										Logout
									</button>
								</li>
							</>
						) : role === 'pekerja' ? (
							// Navbar for pekerja
							<>
								<li>
									<p className="font-bold">
										🧑🏼 {nama} | {role.toUpperCase()}
									</p>
								</li>
								<li>
									<a
										href="/home-pekerja"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/mypay/pekerja"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										MyPay
									</a>
								</li>
								<li className="relative">
									<button
										onClick={togglePekerjaan}
										className="flex flex-row items-center space-x-2 rounded px-3 py-2 hover:bg-green-700 focus:outline-none"
									>
										<p>Pekerjaan</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
										>
											<path
												stroke="none"
												d="M0 0h24v24H0z"
												fill="none"
											/>
											<path d="M6 9l6 6l6 -6" />
										</svg>
									</button>
									{isPekerjaanOpen && (
										<ul className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md bg-green-700 shadow-lg">
											<li>
												<a
													href="/pekerjaan-jasa"
													className="block px-3 py-2 hover:bg-green-600"
												>
													Pilih Pekerjaan
												</a>
											</li>
											<li>
												<a
													href="/status-pekerjaan-jasa"
													className="block px-3 py-2 hover:bg-green-600"
												>
													Status Pekerjaan
												</a>
											</li>
										</ul>
									)}
								</li>
								<li>
									<a
										href="/subkategori-pekerja"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Subkategori
									</a>
								</li>
								<li>
									<a
										href="/profile/pekerja"
										className="rounded px-3 py-2 hover:bg-green-700"
									>
										Profile
									</a>
								</li>
								<li>
									<button
										className="rounded px-3 py-2 hover:bg-green-700"
										onClick={handleLogOut}
									>
										Logout
									</button>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</div>
		</nav>
	);
}
