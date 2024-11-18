import KategoriHomepage from '../../components/KategoriHomepage'

export default function Homepage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <div className="flex w-3/4 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
        {/* header div */}
        <div className="flex w-[90%] flex-row justify-between gap-6">
          {/* kategori dropdown */}
          <select className="w-1/5">
            <option value="" disabled selected>
              Pilih kategori
            </option>
          </select>
          {/* nama subkategori */}
          <h1 className="w-1/5 text-center text-2xl font-bold">Subkategori</h1>
          {/* search bar */}
          <input
            type="text"
            placeholder="Search"
            className="w-1/5 border-2 p-1"
          ></input>
        </div>

        {/* content div */}
        <div className="flex w-[90%] flex-col items-center gap-6">
          <KategoriHomepage
            kategoriName="Kategori jasa contoh aja"
            subkategoriList={['hola', 'hai', 'halo']}
          />
        </div>
      </div>
    </div>
  )
}
