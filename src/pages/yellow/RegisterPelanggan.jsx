import { useEffect } from 'react';

export default function RegisterPengguna() {
	useEffect(() => {
		// Check if user is already logged in
		if (sessionStorage.getItem('id')) {
			window.location.href = '/home';
		}
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
				<h1 className="text-xl font-bold">Register</h1>
				<input
					type="text"
					placeholder="Nama"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<input
					type="text"
					placeholder="Nomor handphone"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<input
					type="text"
					placeholder="Password"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<input
					type="date"
					placeholder="Tanggal lahir"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<div className="flex flex-row items-center gap-4">
					<input
						type="radio"
						id="laki"
						value="Laki-laki"
						name="gender"
						placeholder="Tanggal lahir"
						className="w-1/3 border-2 p-1"
					></input>
					<label htmlFor="laki">Lelaki</label>

					<input
						type="radio"
						id="perempuan"
						value="Perempuan"
						name="gender"
						placeholder="Tanggal lahir"
						className="w-1/3 border-2 p-1"
					></input>
					<label htmlFor="perempuan">Perempuan</label>
				</div>

				<input
					type="text"
					placeholder="Alamat"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<button className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white">Register</button>
			</div>
		</div>
	);
}
