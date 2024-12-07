import { useState } from 'react';

export default function NavBar({ isLoggedIn, role, name }) {
	const [isMyPayOpen, setIsMyPayOpen] = useState(false);

	const toggleMyPay = () => {
		setIsMyPayOpen(!isMyPayOpen);
	};

	return (
		<nav className="fixed top-0 w-full bg-green-800 shadow-lg">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-4">
					{/* Brand */}
					<a
						href="/"
						className="text-2xl font-bold text-white"
					>
						SIJARTA
					</a>
					{/* Navbar Links */}
					<ul className="flex items-center space-x-6 text-white">
						{!isLoggedIn ? (
							// Navbar for Guest
							<>
								<li>
									<a
										href="/login"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="/register"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Register
									</a>
								</li>
							</>
						) : role === 'Pengguna' ? (
							// Navbar for Pengguna
							<>
								<li>
									<span className="font-semibold">
										Role: {role} | {name}
									</span>
								</li>
								<li>
									<a
										href="/homepage"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/mypay/pelanggan"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										MyPay
									</a>
								</li>
								<li>
									<a
										href="/orders"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Kelola Pesanan Saya
									</a>
								</li>
								<li>
									<a
										href="/discounts"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Diskon
									</a>
								</li>
								<li>
									<a
										href="/profile"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Profile
									</a>
								</li>
								<li>
									<a
										href="/logout"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Logout
									</a>
								</li>
							</>
						) : role === 'Pekerja' ? (
							// Navbar for Pekerja
							<>
								<li>
									<span className="font-semibold">
										Role: {role} | {name}
									</span>
								</li>
								<li>
									<a
										href="/home"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="/subkategori-pekerja"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Subcategory
									</a>
								</li>
								<li>
									<a
										href="/status-pekerjaan-jasa"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Status Pekerjaan
									</a>
								</li>
								<li className="relative">
									<button
										onClick={toggleMyPay}
										className="rounded px-4 py-2 hover:bg-green-700 focus:outline-none flex flex-row items-center space-x-2"
									>
										<p>MyPay</p>
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
									{isMyPayOpen && (
										<ul className="absolute right-0 mt-2 w-40 rounded-md bg-green-700 shadow-lg overflow-hidden">
											<li>
												<a
													href="/mypay/pelanggan"
													className="block px-4 py-2 hover:bg-green-600"
												>
													Pelanggan
												</a>
											</li>
											<li>
												<a
													href="/mypay/pekerja"
													className="block px-4 py-2 hover:bg-green-600"
												>
													Pekerja
												</a>
											</li>
										</ul>
									)}
								</li>
								<li>
									<a
										href="/profile"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Profile
									</a>
								</li>
								<li>
									<a
										href="/logout"
										className="rounded px-4 py-2 hover:bg-green-700"
									>
										Logout
									</a>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</div>
		</nav>
	);
}
