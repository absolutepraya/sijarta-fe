import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import axios from 'axios';

// Dummy data: subkategori, nama, tanggal_pemesanan, tanggal_pekerjaan, biaya
const data = [
	{
		subkategori: 'Setrika',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 100000,
		status: 'Menunggu Pekerja Berangkat',
	},
	{
		subkategori: 'Cuci Karpet',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 200000,
		status: 'Menunggu Pekerja Berangkat',
	},
	{
		subkategori: 'Pijat',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 300000,
		status: 'Menunggu Pekerja Berangkat',
	},
	{
		subkategori: 'Daily Cleaning',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 400000,
		status: 'Menunggu Pekerja Berangkat',
	},
	{
		subkategori: 'Cuci Kasur',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 500000,
		status: 'Menunggu Pekerja Berangkat',
	},
	{
		subkategori: 'Refleksi',
		nama: 'John Doe',
		tanggal_pemesanan: '10/11/2024',
		tanggal_pekerjaan: '11/11/2024',
		biaya: 600000,
		status: 'Menunggu Pekerja Berangkat',
	},
];

const statusList = [
	// 'Menunggu Pembayaran',
	// 'Pembayaran Berhasil',
	// 'Mencari Pekerja Terdekat',
	// 'Pemesanan Dibatalkan',
	'Pesanan Selesai',
	'Menunggu Pekerja Berangkat',
	'Pekerja Tiba di Lokasi',
	'Pelayanan Jasa Sedang Dilakukan',
]

export default function StatusPekerjaanJasa() {
	const [filteredData, setFilteredData] = useState(data);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [pesanan, setPesanan] = useState([]);

	// Fetch data from API
	useEffect(() => {
		axios
			.get('http://localhost:5000/red/pesanan-untuk-update?idpekerja=' + sessionStorage.getItem('id'))
			.then((res) => {
				setPesanan(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// postgres=> select * from status_pesanan;
	//                   id                  |             status
	// --------------------------------------+---------------------------------
	//  8b6930c6-2d60-490d-a038-0ca3c5c44abe | Menunggu Pembayaran
	//  db1c5a8e-0220-4b96-a9a3-a4a965ca2c5e | Pembayaran Berhasil
	//  5db7572e-9dba-4467-b69b-c09ac3551f4a | Mencari Pekerja Terdekat
	//  3fb470d6-6526-423d-a5fb-176e156d3eaf | Pemesanan Dibatalkan
	//  3870e6de-c3de-4cdc-a0f7-deb3059abfdc | Pesanan Selesai
	//  90473fc0-da6a-41f0-bae4-7952c56d019d | Menunggu Pekerja Berangkat
	//  3f7fc2b2-862f-4c1d-a660-70ff0469d236 | Pekerja Tiba di Lokasi
	//  e24819cf-655b-4690-8541-b5969a03ecc6 | Pelayanan Jasa Sedang Dilakukan
	// (8 rows)

	const statusObject = {
		'8b6930c6-2d60-490d-a038-0ca3c5c44abe': 'Menunggu Pembayaran',
		'db1c5a8e-0220-4b96-a9a3-a4a965ca2c5e': 'Pembayaran Berhasil',
		'5db7572e-9dba-4467-b69b-c09ac3551f4a': 'Mencari Pekerja Terdekat',
		'3fb470d6-6526-423d-a5fb-176e156d3eaf': 'Pemesanan Dibatalkan',
		'3870e6de-c3de-4cdc-a0f7-deb3059abfdc': 'Pesanan Selesai',
		'90473fc0-da6a-41f0-bae4-7952c56d019d': 'Menunggu Pekerja Berangkat',
		'3f7fc2b2-862f-4c1d-a660-70ff0469d236': 'Pekerja Tiba di Lokasi',
		'e24819cf-655b-4690-8541-b5969a03ecc6': 'Pelayanan Jasa Sedang Dilakukan',
	};

	// Flow of update status
	// Menunggu Pekerja Berangkat -> Pekerja Tiba di Lokasi
	// Pekerja Tiba di Lokasi -> Pelayanan Jasa Sedang Dilakukan
	// Pelayanan Jasa Sedang Dilakukan -> Pesanan Selesai

	const handleUpdateStatus = (item) => {
		const idpesanan = item.id;
		const currentStatus = item.idstatus;
		let newStatus = '';

		if (currentStatus === '90473fc0-da6a-41f0-bae4-7952c56d019d') {
			newStatus = '3f7fc2b2-862f-4c1d-a660-70ff0469d236';
		} else if (currentStatus === '3f7fc2b2-862f-4c1d-a660-70ff0469d236') {
			newStatus = 'e24819cf-655b-4690-8541-b5969a03ecc6';
		} else if (currentStatus === 'e24819cf-655b-4690-8541-b5969a03ecc6') {
			newStatus = '3870e6de-c3de-4cdc-a0f7-deb3059abfdc';
		}

		axios
			.put('http://localhost:5000/red/pesanan?idpesanan=' + idpesanan + '&idstatus=' + newStatus)
			.then((res) => {
				console.log(res.data);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const handleSearch = (e) => {
	// 	setSearchTerm(e.target.value);
	// };

	// const handleStatusChange = (e) => {
	// 	setSelectedStatus(e.target.value);
	// };

	// const applyFilters = () => {
	// 	let updatedData = pesanan;

	// 	if (searchTerm.trim() !== '') {
	// 		updatedData = updatedData.filter((item) => item.subkategori.toLowerCase().includes(searchTerm.toLowerCase()));
	// 	}

	// 	if (selectedStatus !== '') {
	// 		updatedData = updatedData.filter((item) => item.status === selectedStatus);
	// 	}

	// 	setFilteredData(updatedData);
	// };

	const options = { year: 'numeric', month: 'short', day: 'numeric' };

	return (
		<div className="flex min-h-screen w-full flex-col items-center space-y-8 px-24 py-16">
			<NavBar
				isLoggedIn={true}
				role="Pekerja"
				name="John Doe"
			/>
			<p className="text-2xl font-bold">MyPay</p>
			<div className="flex flex-row space-x-6">
				<input
					type="text"
					placeholder="Search Subkategori"
					// onChange={handleSearch}
					className="h-12 w-[12rem] rounded-xl border px-4"
				/>
				<select
					// onChange={handleStatusChange}
					className="h-12 w-[12rem] rounded-xl px-4"
				>
					<option default value="">All Status</option>
				</select>
				<button
					// onClick={applyFilters}
					className="h-12 w-[12rem] rounded-xl bg-black font-bold text-white"
				>
					Filter
				</button>
			</div>
			<p>(Filter di page ini gasempet keimplement 😞)</p>
			<div className="flex w-[50rem] flex-col space-y-4 rounded-xl bg-slate-200 px-8 py-6">
				{pesanan.length > 0 ? (
					pesanan.map((item, index) => (
						<div
							className="flex h-20 w-full space-x-3 rounded-xl bg-white px-3"
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
							<div className="flex h-full flex-row items-center justify-end">
								<p>Rp{item.totalbiaya.toLocaleString()}</p>
							</div>
							<div className="flex h-full w-1/3 flex-col items-center justify-center space-y-1">
								<p>{statusObject[item.idstatus]}</p>
								{statusObject[item.idstatus] !== 'Pesanan Selesai' && (
									<button
										className="rounded-xl bg-blue-600 px-3 py-1 font-semibold text-white"
										onClick={() => handleUpdateStatus(item)}
									>
										Update Status
									</button>
								)}
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
