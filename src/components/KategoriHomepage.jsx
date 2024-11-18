export default function KategoriHomepage({ kategoriName, subkategoriList }) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* div kategori */}
      <div className="w-full rounded-md border-2 border-black p-2">
        <h1 className="text-lg">{kategoriName}</h1>
      </div>
      {/* map over subkategori list */}
      {subkategoriList.map((subkategoriName, index) => (
        // mungkin perlu key
        <div className="mt-[-0.125rem] w-[97%] border-2 border-black p-2">
          <h2>{subkategoriName}</h2>
        </div>
      ))}
    </div>
  )
}
