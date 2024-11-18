import { useState } from 'react';
import NavBar from '../../components/NavBar';

// Dummy data: nominal, tanggal, dan kategori transaksi
const data = [
	{
		nominal: 100000,
		tanggal: '10/11/2024',
		kategori: 'Top-Up',
	},
	{
		nominal: 200000,
		tanggal: '10/11/2024',
		kategori: 'Pembayaran',
	},
	{
		nominal: 300000,
		tanggal: '10/11/2024',
		kategori: 'Transfer',
	},
	{
		nominal: 400000,
		tanggal: '10/11/2024',
		kategori: 'Withdrawal',
	},
];

export default function MyPay({ isPekerja }) {
	const [formOpen, setFormOpen] = useState(false);
	const [formCategory, setFormCategory] = useState(1);

	return (
		<div className="flex min-h-screen w-full flex-col items-center space-y-8 px-24 py-16">
			<NavBar isLoggedIn={true} role={isPekerja ? 'Pekerja' : 'Pengguna'} name="John Doe" />
			{formOpen && (
				<div className="fixed z-20 flex w-[40rem] flex-col items-center space-y-4 rounded-xl bg-slate-200 px-8 py-6">
					<p className="font-bold">Form</p>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold">Nama: John Doe</p>
						<p className="font-semibold">Tanggal: 10/11/2024</p>
						<p className="font-semibold">Saldo: Rp420.000</p>
					</div>

					{/* Dropdown kategori transaksi */}
					<div className="flex w-full flex-col space-y-2">
						<p className="font-semibold">Kategori Transaksi</p>
						<select
							className="h-12 w-full rounded-xl border bg-white px-4"
							onChange={(e) => setFormCategory(parseInt(e.target.value))}
						>
							<option value={1}>Top-Up</option>
							{!isPekerja && <option value={2}>Pembayaran</option>}
							<option value={3}>Transfer</option>
							<option value={4}>Withdrawal</option>
						</select>
					</div>

					{/* Input field based on formCategory */}
					{formCategory === 1 ? (
						<div className="flex w-1/2 flex-col space-y-3">
							<div className="flex flex-row items-center space-x-2">
								<p>Nominal:</p>
								<input
									type="text"
									className="h-12 w-40 rounded-xl border px-4"
								/>
							</div>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(!formOpen)}
								>
									Batal
								</button>
								<button className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white">Top Up</button>
							</div>
						</div>
					) : formCategory === 2 ? (
						<div className="flex w-1/2 flex-col space-y-3">
							<div className="flex flex-row items-center space-x-2">
								{/* Drop down for pesanan jasa */}
								<p>Pesanan Jasa:</p>
								<select className="h-12 w-40 rounded-xl border bg-white px-4">
									<option value={1}>Jasa 1</option>
									<option value={2}>Jasa 2</option>
									<option value={3}>Jasa 3</option>
								</select>
							</div>

							<p className="font-semibold">Harga Jasa: </p>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(!formOpen)}
								>
									Batal
								</button>
								<button className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white">Bayar</button>
							</div>
						</div>
					) : formCategory === 3 ? (
						<div className="flex w-1/2 flex-col space-y-3">
							<div className="flex flex-col items-center space-y-1">
								<p>Nominal:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
								/>
							</div>

							<div className="flex flex-col items-center space-y-1">
								<p>No. HP:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
								/>
							</div>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(!formOpen)}
								>
									Batal
								</button>
								<button className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white">Transfer</button>
							</div>
						</div>
					) : formCategory === 4 ? (
						<div className="flex w-1/2 flex-col items-center space-y-3">
							{/* Dropdown for bank names */}
							<div className="flex flex-row items-center space-x-2">
								<p>Bank:</p>
								<select className="h-12 w-40 rounded-xl border bg-white px-4">
									<option value={1}>Bank 1</option>
									<option value={2}>Bank 2</option>
									<option value={3}>Bank 3</option>
								</select>
							</div>

							<div className="flex flex-col items-center space-y-1">
								<p>Nominal:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
								/>
							</div>

							<div className="flex flex-col items-center space-y-1">
								<p>No. HP:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
								/>
							</div>

							<div className="flex w-full flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(!formOpen)}
								>
									Batal
								</button>
								<button className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white">Transfer</button>
							</div>
						</div>
					) : null}
				</div>
			)}

			{/* Dim background overlay */}
			{formOpen && <div className="fixed -top-40 z-10 h-[100rem] w-screen bg-black opacity-50" />}

			<p className="text-2xl font-bold">MyPay</p>
			<div className="flex flex-row space-x-6">
				<div className="flex h-12 w-[30rem] flex-row items-center justify-between rounded-xl border bg-blue-600 px-4 font-semibold text-white">
					<p>No. HP: 08123456789</p>
					<p>Saldo: Rp420.000</p>
				</div>
				<button
					className="h-12 w-[12rem] rounded-xl bg-black font-bold text-white"
					onClick={() => setFormOpen(!formOpen)}
				>
					Lakukan Transaksi
				</button>
			</div>

			<div className="flex w-[50rem] flex-col space-y-4 rounded-xl bg-slate-200 px-8 py-6">
				<p className="font-bold">Riwayat Transaksi</p>
				<p className="flex w-full flex-col items-center space-y-2">
					{data.map((item, index) => (
						<div
							key={index}
							className="flex w-full flex-row items-center justify-between"
						>
							<p className="w-1/2">{item.tanggal}</p>
							<p className="w-1/2 justify-center text-center">{item.nominal}</p>
							<p className="w-1/2 justify-end text-end">{item.kategori}</p>
						</div>
					))}
				</p>
			</div>

			<p>To check from Pekerja side, go to <a href='/mypay/pekerja' className='text-blue-600 underline'>/mypay/pekerja</a>.</p>
		</div>
	);
}
