import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SesiLayanan from '../../components/SesiLayanan';
import PekerjaButton from '../../components/PekerjaButton';
import NavBar from '../../components/NavBar';
import { sub } from 'framer-motion/client';

const URL = 'http://localhost:5000/';

export default function SubkategoriPengguna() {
  const { catId, subId } = useParams();
	const [subkategoriJasa, setSubkategoriJasa] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

  console.log(sessionStorage.getItem('id'))

	const subPenggunaAsync = (subkategoriId) => {
		setIsLoading(true);
		axios
			.get(URL + 'green/subkategori-detail/' + subkategoriId)
			.then((res) => {
				setSubkategoriJasa(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError('Failed to fetch data');
				setIsLoading(false);
			});
	};

	useEffect(() => {
    if (subId !== null) {
      subPenggunaAsync(subId); // Call API with dynamic subId
    }
  }, [subId]);

	if (isLoading) {
		return (
			<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	if (error || !subkategoriJasa || subkategoriJasa.length === 0) {
		return (
			<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
				<div className="text-xl text-red-500">{error || 'No data available'}</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<NavBar
				isLoggedIn={true}
				role="Pengguna"
				name="John Doe"
			/>
			<div className="flex w-2/3 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
				<div className="flex w-[90%] flex-col gap-8">
					<div className="flex w-full flex-row justify-between">
						<h1 className="w-[35%] text-center text-2xl font-bold">{subkategoriJasa[0].namasubkategori}</h1>
						<h1 className="w-[35%] text-center text-2xl font-bold">{subkategoriJasa[0].namakategori}</h1>
					</div>
					<p className="w-2/3">{subkategoriJasa[0].deskripsi}</p>
					<div className="flex w-full flex-col gap-2">
						<h2 className="text-lg font-bold">Pilihan sesi layanan</h2>
						{subkategoriJasa[0].sesi_info.map((sesiSub, index) => (
							<SesiLayanan
								key={index}
                idkategorijasa={catId}
                idpelanggan={sessionStorage.getItem('id')}
								sesiLayanan={sesiSub.sesi}
								harga={sesiSub.harga}
							/>
						))}
					</div>
					<div className="flex w-full flex-col gap-2">
						<h2 className="text-lg font-bold">Pekerja</h2>
						<div className="flex w-[95%] flex-row gap-4">
							{subkategoriJasa[0].pekerja_info.map((pekerja, index) => (
								<PekerjaButton
									key={index}
									pekerja={pekerja}
								/>
							))}
						</div>
					</div>
					<div className="flex w-full flex-col gap-2">
						<h2 className="text-lg font-bold">Testimoni</h2>
						<div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">lol</div>
					</div>
				</div>
			</div>
		</div>
	);
}
