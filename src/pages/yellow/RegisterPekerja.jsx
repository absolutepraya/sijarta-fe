import { useEffect } from 'react';

export default function RegisterPekerja() {
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
				{/* input nama */}
				<input
					type="text"
					placeholder="Nama"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input nomor hp */}
				<input
					type="tel"
					placeholder="Nomor handphone"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input pw */}
				<input
					type="password"
					placeholder="Password"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input tanggal lahir */}
				<input
					type="date"
					placeholder="Tanggal lahir"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input gender radio button */}
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
				{/* input alamat rumah */}
				<input
					type="text"
					placeholder="Alamat"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* dropdown bank */}
				<select
					id="nama-bank"
					className="w-1/2 rounded-md border-2 p-2"
					defaultValue=""
				>
					<option
						value=""
						disabled
					>
						Pilih bank
					</option>
					<option value="gopay">GoPay</option>
					<option value="ovo">OVO</option>
					<option value="va_bca">Virtual Account BCA</option>
					<option value="va_bni">Virtual Account BNI</option>
					<option value="va_mandiri">Virtual Account Mandiri</option>
				</select>
				{/* input npwp */}
				<input
					type="text"
					placeholder="NPWP"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input url foto */}
				<input
					type="url"
					placeholder="URL foto"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<button className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white">Register</button>
			</div>
		</div>
	);
}
