import { useState } from 'react';
import NavBar from '../../components/NavBar';

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

const statusList = ['Menunggu Pekerja Berangkat', 'Tiba Di Lokasi', 'Melakukan Pelayanan Jasa', 'Pesanan Selesai'];

export default function StatusPekerjaanJasa() {
	const [filteredData, setFilteredData] = useState(data);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');

	const handleUpdateStatus = (index) => {
		setFilteredData((prevData) =>
			prevData.map((item, idx) => {
				if (idx === index) {
					const currentStatusIndex = statusList.indexOf(item.status);
					if (currentStatusIndex < statusList.length - 1) {
						return { ...item, status: statusList[currentStatusIndex + 1] };
					}
				}
				return item;
			})
		);
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleStatusChange = (e) => {
		setSelectedStatus(e.target.value);
	};

	const applyFilters = () => {
		let updatedData = data;

		if (searchTerm.trim() !== '') {
			updatedData = updatedData.filter((item) => item.subkategori.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		if (selectedStatus !== '') {
			updatedData = updatedData.filter((item) => item.status === selectedStatus);
		}

		setFilteredData(updatedData);
	};

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
					value={searchTerm}
					onChange={handleSearch}
					className="h-12 w-[12rem] rounded-xl border px-4"
				/>
				<select
					value={selectedStatus}
					onChange={handleStatusChange}
					className="h-12 w-[12rem] rounded-xl px-4"
				>
					<option value="">All Status</option>
					{statusList.map((status, index) => (
						<option
							key={index}
							value={status}
						>
							{status}
						</option>
					))}
				</select>
				<button
					onClick={applyFilters}
					className="h-12 w-[12rem] rounded-xl bg-black font-bold text-white"
				>
					Filter
				</button>
			</div>
			<div className="flex w-[50rem] flex-col space-y-4 rounded-xl bg-slate-200 px-8 py-6">
				{filteredData.length > 0 ? (
					filteredData.map((item, index) => (
						<div
							className="flex h-20 w-full space-x-3 rounded-xl bg-white px-3"
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
							<div className="flex h-full flex-row items-center justify-end">
								<p>Rp{item.biaya.toLocaleString()}</p>
							</div>
							<div className="flex h-full w-1/3 flex-col items-center justify-center space-y-1">
								<p>{item.status}</p>
								{item.status !== 'Pesanan Selesai' && (
									<button
										className="rounded-xl bg-blue-600 px-3 py-1 font-semibold text-white"
										onClick={() => handleUpdateStatus(index)}
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
