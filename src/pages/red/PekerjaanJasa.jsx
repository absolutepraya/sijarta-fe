import { useState } from 'react';

// Dummy data: subkategori, nama, tanggal_pemesanan, tanggal_pekerjaan, biaya
const data = [
	{
		subkategori: 'Setrika',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 100000,
	},
	{
		subkategori: 'Cuci Karpet',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 200000,
	},
	{
		subkategori: 'Pijat',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 300000,
	},
    {
        subkategori: 'Daily Cleaning',
        nama: 'John Doe',
        tanggal_pemesanan: '10/11/2024',
        tanggal_pekerjaan: '11/11/2024',
        biaya: 400000,
    },
    {
        subkategori: 'Cuci Kasur',
        nama: 'John Doe',
        tanggal_pemesanan: '10/11/2024',
        tanggal_pekerjaan: '11/11/2024',
        biaya: 500000,
    },
    {
        subkategori: 'Refleksi',
        nama: 'John Doe',
        tanggal_pemesanan: '10/11/2024',
        tanggal_pekerjaan: '11/11/2024',
        biaya: 600000,
    }
];

const subkategori = [
	{
		subkategori: ['Daily Cleaning', 'Setrika'],
	},
	{
		subkategori: ['Cuci Kasur', 'Cuci Karpet'],
	},
	{
		subkategori: ['Refleksi', 'Pijat'],
	},
];

export default function PekerjaanJasa() {
	const [filteredData, setFilteredData] = useState(data);
	const [kategori, setKategori] = useState(0);
	const [selectedSubkategori, setSelectedSubkategori] = useState(0);

	// Handle Search button click
	const handleSearch = () => {
		if (kategori === 0 || selectedSubkategori === 0) {
			// If kategori or subkategori is not selected, show all data
			setFilteredData(data);
		} else {
			// Get the selected subkategori name
			const subkategoriName = subkategori[kategori - 1].subkategori[selectedSubkategori - 1];
			// Filter the data based on subkategori
			const filtered = data.filter((item) => item.subkategori === subkategoriName);
			setFilteredData(filtered);
		}
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center space-y-8 px-24 py-16">
			<NavBar
				isLoggedIn={true}
				role={isPekerja ? 'Pekerja' : 'Pengguna'}
				name="John Doe"
			/>
			<p className="text-2xl font-bold">MyPay</p>
			<div className="flex flex-row space-x-6">
				{/* Dropdown select for kategori */}
				<select
					className="h-12 w-[12rem] rounded-xl border bg-white px-4"
					value={kategori}
					onChange={(e) => {
						setKategori(parseInt(e.target.value));
						setSelectedSubkategori(0); // Reset subkategori when kategori changes
					}}
				>
					<option
						value={0}
						disabled
					>
						Pilih Kategori
					</option>
					<option value={1}>Home Cleaning</option>
					<option value={2}>Deep Cleaning</option>
					<option value={3}>Massage</option>
				</select>
				{/* Dropdown select for subkategori */}
				<select
					className={`h-12 w-[12rem] rounded-xl border px-4 ${kategori === 0 ? 'bg-gray-200' : 'bg-white'}`}
					value={selectedSubkategori}
					onChange={(e) => setSelectedSubkategori(parseInt(e.target.value))}
					disabled={kategori === 0}
				>
					<option
						value={0}
						disabled
					>
						Pilih Subkategori
					</option>
					{kategori !== 0 &&
						subkategori[kategori - 1].subkategori.map((item, index) => (
							<option
								key={index + 1}
								value={index + 1}
							>
								{item}
							</option>
						))}
				</select>
				<button
					className="h-12 w-[12rem] rounded-xl bg-black font-bold text-white"
					onClick={handleSearch}
				>
					Search
				</button>
			</div>

			<div className="flex w-[50rem] flex-col space-y-4 rounded-xl bg-slate-200 px-8 py-6">
				{filteredData.length > 0 ? (
					filteredData.map((item, index) => (
						<div
							className="flex h-16 w-full space-x-3 rounded-xl bg-white px-3"
							key={index}
						>
							<div className="flex h-full w-1/2 flex-col justify-center">
								<div className="flex flex-row space-x-1">
									<p>{item.subkategori} - </p>
									<p>{item.nama}</p>
								</div>
								<div className="flex flex-row space-x-1">
									<p>{item.tanggal_pemesanan} - </p>
									<p>{item.tanggal_pekerjaan}</p>
								</div>
							</div>
							<div className="flex h-full w-1/4 flex-row items-center justify-end">
								<p>Rp{item.biaya.toLocaleString()}</p>
							</div>
							<div className="flex h-full w-1/4 flex-row items-center justify-end">
								<button className="rounded-xl bg-blue-600 px-3 py-2 font-semibold text-white">Kerjakan</button>
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">No data available.</p>
				)}
			</div>
		</div>
	);
}
