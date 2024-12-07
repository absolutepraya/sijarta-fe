export default function KategoriHomepage({ kategoriName, subkategoriList }) {
	return (
		<div className="flex w-full flex-col items-center">
			{/* div kategori */}
			<div className="mb-4 w-full rounded-md border-2 border-black p-2 px-3">
				<h1 className="text-lg">{kategoriName}</h1>
			</div>
			{/* map over subkategori list */}
			{subkategoriList.map((subkategoriName, index) => (
				// mungkin perlu key
				<div className="mt-2 flex w-[97%] flex-row justify-between items-center rounded-md border-2 border-black p-2 px-3">
					<h2>{subkategoriName}</h2>
					<a href="/testimonials">
						<button className="rounded-md bg-green-800 px-2 py-1 text-white">Lihat testimoni</button>
					</a>
				</div>
			))}
		</div>
	);
}
