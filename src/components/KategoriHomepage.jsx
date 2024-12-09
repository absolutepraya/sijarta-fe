export default function KategoriHomepage({ kategori, subkategoriList }) {
	return (
		<div className="flex w-full flex-col items-center">
			{/* div kategori */}
			<div className="w-full rounded-md border-2 border-black p-2 px-3">
				<h1 className="text-lg">{kategori.namakategori}</h1>
			</div>
			{/* map over subkategori list */}
			{subkategoriList.map((subKategori, index) => (
				// mungkin perlu key
				<div className="-mt-[0.125rem] flex w-[97%] flex-row items-center justify-between rounded-md border-2 border-black p-2 px-3">
					<a href={`/kategori/${kategori.idkategorijasa}/subkategori/${subKategori.idSubkategoriJasa}`}>{subKategori.namaSubkategoriJasa}</a>
					<a href="/testimonials">
						<button className="rounded-md bg-green-800 px-2 py-1 text-white">Lihat testimoni</button>
					</a>
				</div>
			))}
		</div>
	);
}
