export default function ProfilePekerja() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			{/* container putih bakal dibagi jadi 2 secara horizontal */}
			<div className="flex w-2/5 flex-row items-center justify-center gap-2 rounded-lg bg-white py-8 shadow-lg">
				{/* left sub container */}
				{/* <div className="flex flex-col">
          <p>Nama:</p>
          <p>Level:</p>
          <p>Jenis kelamin:</p>
          <p>No HP:</p>
          <p>Tanggal lahir:</p>
          <p>Alamat:</p>
          <p>Saldo MyPay:</p>
          <p>Nama bank:</p>
          <p>No rekening:</p>
          <p>NPWP:</p>
          <p>Rating:</p>
          <p>Jumlah pesanan selesai:</p>
          <p>Kategori pekerjaan:</p>
        </div> */}
				{/* right sub container */}
				<div className="relative flex flex-col space-y-3">
					{/* <img
						src="gambar"
						className="absolute right-1 top-1"
						alt="food"
					></img> */}
					<p>Nama:</p>
					<p>Level:</p>
					<p>Jenis kelamin:</p>
					<p>No HP:</p>
					<p>Tanggal lahir:</p>
					<p>Alamat:</p>
					<p>Saldo MyPay:</p>
					<p>Nama bank:</p>
					<p>No rekening:</p>
					<p>NPWP:</p>
					<p>Rating:</p>
					<p>Jumlah pesanan selesai:</p>
					<p>Kategori pekerjaan:</p>
					<div className="!mt-8 flex w-full justify-center">
						<input
							type="submit"
							value="Update"
							className="rounded-md bg-green-800 p-2 px-3 font-bold text-white"
						></input>
					</div>
				</div>
			</div>
		</div>
	);
}
