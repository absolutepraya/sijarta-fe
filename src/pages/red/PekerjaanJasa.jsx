import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';

function PekerjaanJasa() {
	// Add the kategori and subkategori arrays
	const kategoriList = [
		{ id: 'f146a32a-62e5-4fad-98d2-667f6c38473f', namakategori: 'Home Cleaning' },
		{ id: 'a2ac2abd-5e1c-4a92-b998-3f6735dd1cc7', namakategori: 'Deep Cleaning' },
		{ id: 'b0170eb8-ea51-42d8-be50-8d2b0a70957b', namakategori: 'Laundry Service' },
		{ id: '4c750792-3ff0-4fd9-bc14-847641d5783e', namakategori: 'AC Service' },
		{ id: 'af5118eb-6c5a-4390-a1f8-682fad7fa74a', namakategori: 'Garden Maintenance' },
	];

	const subkategoriList = [
		{ id: '605c62a8-de4e-4ff3-8943-44ae8d5667a5', namasubkategori: 'Daily Cleaning', kategorijasaid: 'f146a32a-62e5-4fad-98d2-667f6c38473f' },
		{ id: 'c8516a35-dd32-430e-b7c6-8581d34813b5', namasubkategori: 'Spring Cleaning', kategorijasaid: 'f146a32a-62e5-4fad-98d2-667f6c38473f' },
		{ id: '1a773b8b-a6a1-40f0-be3e-6db4f3e19170', namasubkategori: 'Deep Clean Kitchen', kategorijasaid: 'a2ac2abd-5e1c-4a92-b998-3f6735dd1cc7' },
		{ id: '6061279a-b64c-4654-9727-068d35861aab', namasubkategori: 'Deep Clean Bathroom', kategorijasaid: 'a2ac2abd-5e1c-4a92-b998-3f6735dd1cc7' },
		{ id: '5575e017-1574-4872-8b47-d2db6576f2e2', namasubkategori: 'Regular Laundry', kategorijasaid: 'b0170eb8-ea51-42d8-be50-8d2b0a70957b' },
		{ id: 'fb4646dc-21c4-4805-8785-753384140cf0', namasubkategori: 'Dry Cleaning', kategorijasaid: 'b0170eb8-ea51-42d8-be50-8d2b0a70957b' },
		{ id: 'a7f9cd62-43ea-4a00-bb96-05fbb15a8584', namasubkategori: 'AC Checkup', kategorijasaid: '4c750792-3ff0-4fd9-bc14-847641d5783e' },
		{ id: 'd0aa514a-61c9-41b8-ab20-a725c378992c', namasubkategori: 'AC Deep Clean', kategorijasaid: '4c750792-3ff0-4fd9-bc14-847641d5783e' },
		{ id: '29817a8b-adc2-4062-9b5f-e5c9932f113a', namasubkategori: 'Lawn Mowing', kategorijasaid: 'af5118eb-6c5a-4390-a1f8-682fad7fa74a' },
		{ id: 'c60b753c-090c-4710-89cf-c0eabf894f46', namasubkategori: 'Garden Fertilizing', kategorijasaid: 'af5118eb-6c5a-4390-a1f8-682fad7fa74a' },
	];

	// Update state variables
	const [pesanan, setPesanan] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedKategori, setSelectedKategori] = useState('');
	const [selectedSubkategori, setSelectedSubkategori] = useState('');

	// Handle Search button click
	const handleSearch = () => {
		let filtered = pesanan;
		if (selectedKategori) {
			filtered = filtered.filter((item) => item.namakategori === selectedKategori);
		}
		if (selectedSubkategori) {
			filtered = filtered.filter((item) => item.namasubkategori === selectedSubkategori);
		}
		setFilteredData(filtered);
	};

	// Fetch data from API
	useEffect(() => {
		axios
			.get('http://localhost:5000/red/pesanan')
			.then((res) => {
				setPesanan(res.data);
				setFilteredData(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const options = { year: 'numeric', month: 'short', day: 'numeric' };

	// Return JSX from the component
	return (
		<div className="flex min-h-screen w-full flex-col items-center space-y-8 px-24 py-16">
			<NavBar
				isLoggedIn={true}
				role="Pekerja"
				name="John Doe"
			/>
			<p className="text-2xl font-bold">MyPay</p>
			<div className="flex flex-row space-x-6">
				{/* Kategori dropdown */}
				<select
					className="h-12 w-[12rem] rounded-xl border bg-white px-4"
					value={selectedKategori}
					onChange={(e) => {
						setSelectedKategori(e.target.value);
						setSelectedSubkategori('');
					}}
				>
					<option
						value=""
						disabled
					>
						Pilih Kategori
					</option>
					{kategoriList.map((item) => (
						<option
							key={item.id}
							value={item.namakategori}
						>
							{item.namakategori}
						</option>
					))}
				</select>

				{/* Subkategori dropdown */}
				<select
					className={`h-12 w-[12rem] rounded-xl border px-4 ${!selectedKategori ? 'bg-gray-200' : 'bg-white'}`}
					value={selectedSubkategori}
					onChange={(e) => setSelectedSubkategori(e.target.value)}
					disabled={!selectedKategori}
				>
					<option
						value=""
						disabled
					>
						Pilih Subkategori
					</option>
					{subkategoriList
						.filter((item) => item.kategorijasaid === kategoriList.find((k) => k.namakategori === selectedKategori)?.id)
						.map((item) => (
							<option
								key={item.id}
								value={item.namasubkategori}
							>
								{item.namasubkategori}
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
									<p>{item.namasubkategori} - </p>
									<p>{item.namapelanggan}</p>
								</div>
								<div className="flex flex-row space-x-1">
									<p>
										{new Date(item.tglpemesanan).toLocaleDateString('en-US', options)} | {new Date(item.tglpekerjaan).toLocaleDateString('en-US', options)}
									</p>
								</div>
							</div>
							<div className="flex h-full w-1/4 flex-row items-center justify-end">
								<p>Rp{item.totalbiaya.toLocaleString()}</p>
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

export default PekerjaanJasa;
