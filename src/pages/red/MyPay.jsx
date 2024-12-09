import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import axios from 'axios';

export default function MyPay({ isPekerja }) {
	const userId = sessionStorage.getItem('id');
	const nohp = sessionStorage.getItem('nohp');
	const nama = sessionStorage.getItem('nama');
	const role = sessionStorage.getItem('role');
	const [formOpen, setFormOpen] = useState(false);
	const [formCategory, setFormCategory] = useState(1);
	const [saldo, setSaldo] = useState('Fetching data...');
	const [transactions, setTransactions] = useState([]);
	const [useEffectTrigger, setUseEffectTrigger] = useState(0);

	// Input state
	const [nominal1, setNominal1] = useState(0);
	const [nominal2, setNominal2] = useState(0);
	const [nominal3, setNominal3] = useState(0);
	const [nohpTransfer, setNohpTransfer] = useState('');

	// Fetch data from BE
	useEffect(() => {
		axios
			.get(`https://sijarta-be-b66f1ae5c3c1.herokuapp.com/red/user/${userId}`)
			.then((res) => {
				setSaldo(res.data.saldomypay);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get(`https://sijarta-be-b66f1ae5c3c1.herokuapp.com/red/transaksi/${userId}`)
			.then((res) => {
				setTransactions(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [useEffectTrigger, userId]);

	// Function to handle topup with PUT
	const handleTopUp = () => {
		axios
			.put(`https://sijarta-be-b66f1ae5c3c1.herokuapp.com/red/topup`, null, {
				params: {
					userid: userId,
					nominal: nominal1,
				},
			})
			.then((res) => {
				console.log(res.data);
				setUseEffectTrigger((prev) => prev + 1);
				setFormOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleTransfer = () => {
		axios
			.put(`https://sijarta-be-b66f1ae5c3c1.herokuapp.com/red/transfer`, null, {
				params: {
					senderid: userId,
					nominal: nominal2,
					receivernohp: nohpTransfer,
				},
			})
			.then((res) => {
				console.log(res.data);
				setUseEffectTrigger((prev) => prev + 1);
				setFormOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleWithdrawal = () => {
		axios
			.put(`https://sijarta-be-b66f1ae5c3c1.herokuapp.com/red/withdraw`, null, {
				params: {
					userid: userId,
					nominal: nominal3,
				},
			})
			.then((res) => {
				console.log(res.data);
				setUseEffectTrigger((prev) => prev + 1);
				setFormOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center space-y-8 px-24 py-16">
			<NavBar
				isLoggedIn={true}
				role={isPekerja ? 'Pekerja' : 'Pengguna'}
				name={nama || 'John Doe'}
			/>
			{formOpen && (
				<div className="fixed z-20 flex w-[40rem] flex-col items-center space-y-4 rounded-xl bg-slate-200 px-8 py-6">
					<p className="font-bold">Form</p>
					<div className="flex flex-col space-y-1">
						<p className="font-semibold">Nama: {nama}</p>
						<p className="font-semibold">Tanggal: {new Date().toLocaleDateString()}</p>
						<p className="font-semibold">Saldo: Rp{saldo}</p>
					</div>

					{/* Dropdown kategori transaksi */}
					<div className="flex w-full flex-col space-y-2">
						<p className="font-semibold">Kategori Transaksi</p>
						<select
							className="h-12 w-full rounded-xl border bg-white px-4"
							value={formCategory}
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
									type="number"
									className="h-12 w-40 rounded-xl border px-4"
									value={nominal1}
									onChange={(e) => setNominal1(e.target.value)}
								/>
							</div>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(false)}
								>
									Batal
								</button>
								<button
									className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white"
									onClick={handleTopUp}
								>
									Top Up
								</button>
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

							<p className="font-semibold">Harga Jasa: Rp{/* Add dynamic price if available */}</p>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(false)}
								>
									Batal
								</button>
								<button
									className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white"
									onClick={() => alert('Pembayaran belum diimplementasikan.')}
								>
									Bayar
								</button>
							</div>
						</div>
					) : formCategory === 3 ? (
						<div className="flex w-1/2 flex-col space-y-3">
							<div className="flex flex-col items-center space-y-1">
								<p>Nominal:</p>
								<input
									type="number"
									className="h-12 w-60 rounded-xl border px-4"
									value={nominal2}
									onChange={(e) => setNominal2(e.target.value)}
								/>
							</div>

							<div className="flex flex-col items-center space-y-1">
								<p>No. HP Penerima:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
									value={nohpTransfer}
									onChange={(e) => setNohpTransfer(e.target.value)}
								/>
							</div>

							<div className="flex flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(false)}
								>
									Batal
								</button>
								<button
									className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white"
									onClick={handleTransfer}
								>
									Transfer
								</button>
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
									type="number"
									className="h-12 w-60 rounded-xl border px-4"
									value={nominal3}
									onChange={(e) => setNominal3(e.target.value)}
								/>
							</div>

							<div className="flex flex-col items-center space-y-1">
								<p>Nomor Rekening:</p>
								<input
									type="text"
									className="h-12 w-60 rounded-xl border px-4"
									// You might want to add state for this input if needed
								/>
							</div>

							<div className="flex w-full flex-row space-x-3">
								<button
									className="h-12 w-1/2 rounded-xl bg-black font-bold text-white"
									onClick={() => setFormOpen(false)}
								>
									Batal
								</button>
								<button
									className="h-12 w-1/2 text-nowrap rounded-xl bg-blue-600 font-semibold text-white"
									onClick={handleWithdrawal}
								>
									Withdraw
								</button>
							</div>
						</div>
					) : null}
				</div>
			)}

			{/* Dim background overlay */}
			{formOpen && <div className="fixed top-0 z-10 h-full w-full bg-black opacity-50" />}

			<p className="text-2xl font-bold">MyPay</p>
			<div className="flex flex-row space-x-6">
				<div className="flex h-12 w-[30rem] flex-row items-center justify-between rounded-xl border bg-blue-600 px-4 font-semibold text-white">
					<p>No. HP: {nohp}</p>
					<p>Saldo: Rp{saldo}</p>
				</div>
				<button
					className="h-12 w-[12rem] rounded-xl bg-black font-bold text-white"
					onClick={() => setFormOpen(true)}
				>
					Lakukan Transaksi
				</button>
			</div>

			<div className="flex w-[50rem] flex-col space-y-4 rounded-xl bg-slate-200 px-8 py-6">
				<p className="font-bold">Riwayat Transaksi</p>
				<div className="flex w-full flex-col items-center space-y-2">
					{transactions.length > 0 ? (
						transactions.map((item, index) => (
							<div
								key={index}
								className="flex w-full flex-row items-center justify-between"
							>
								<p className="w-1/3">{new Date(item.tgl).toLocaleDateString()}</p>
								<p className="w-1/3 text-center">Rp{item.nominal}</p>
								<p className="w-1/3 text-end">{item.kategori}</p>
							</div>
						))
					) : (
						<p>No transactions found.</p>
					)}
				</div>
			</div>

			<div className="flex flex-col items-center space-y-1">
				<p>
					To check from Pekerja side, go to{' '}
					<a
						href="/mypay/pekerja"
						className="text-blue-600 underline"
					>
						/mypay/pekerja
					</a>
					.
				</p>
				<p>
					To check from Pengguna side, go to{' '}
					<a
						href="/mypay/pengguna"
						className="text-blue-600 underline"
					>
						/mypay/pengguna
					</a>
					.
				</p>
			</div>
		</div>
	);
}
