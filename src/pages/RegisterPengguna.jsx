export default function RegisterPengguna() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
				<h1 className="text-xl font-bold">Register</h1>
				<input
					type="text"
					placeholder="Nama"
					className="w-1/3 border-2 p-1"
				></input>

				<input
					type="text"
					placeholder="Nomor handphone"
					className="w-1/3 border-2 p-1"
				></input>

				<input
					type="text"
					placeholder="Password"
					className="w-1/3 border-2 p-1"
				></input>

				<input
					type="date"
					placeholder="Tanggal lahir"
					className="w-1/3 border-2 p-1"
				></input>

				<div className="flex flex-row gap-4 items-center">
					<input
						type="radio"
						id="laki"
						value="Laki-laki"
						name="gender"
						placeholder="Tanggal lahir"
						className="w-1/3 border-2 p-1"
					></input>
					<label for="laki">Lelaki</label>

					<input
						type="radio"
						id="perempuan"
						value="Perempuan"
						name="gender"
						placeholder="Tanggal lahir"
						className="w-1/3 border-2 p-1"
					></input>
					<label for="perempuan">Perempuan</label>
				</div>

				<input
					type="text"
					placeholder="Alamat"
					className="w-1/3 border-2 p-1"
				></input>

				<input
					type="submit"
					value="Register"
					className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white"
				></input>
			</div>
		</div>
	)
}