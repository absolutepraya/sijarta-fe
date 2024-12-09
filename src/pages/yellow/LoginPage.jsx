import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LoginPage() {
	const [nohpInput, setNohpInput] = useState('');
	const [pwdInput, setPwdInput] = useState('');

	const handleLogin = () => {
		axios
			.get('https://sijarta-be-b66f1ae5c3c1.herokuapp.com/yellow/login?nohp=' + nohpInput + '&pwd=' + pwdInput)
			.then((res) => {
				// Save id, nama, nohp, role to session storage
				sessionStorage.setItem('id', res.data.id);
				sessionStorage.setItem('nama', res.data.nama);
				sessionStorage.setItem('nohp', res.data.nohp);
				sessionStorage.setItem('role', res.data.role);
				window.location.href = '/home';
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		// Check if user is already logged in
		if (sessionStorage.getItem('id')) {
			window.location.href = '/home';
		}
	})

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
				<h1 className="text-xl font-bold">Login</h1>
				{/* input nomor hp */}
				<input
					type="text"
					placeholder="Nomor handphone"
					className="w-1/2 rounded-md border-2 p-2"
					onChange={(e) => setNohpInput(e.target.value)}
				></input>
				{/* input pw */}
				<input
					type="text"
					placeholder="Password"
					className="w-1/2 rounded-md border-2 p-2"
					onChange={(e) => setPwdInput(e.target.value)}
				></input>

				<button
					onClick={handleLogin}
					className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white"
				>
					Login
				</button>
			</div>
		</div>
	);
}
