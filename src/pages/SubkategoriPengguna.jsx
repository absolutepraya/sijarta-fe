export default function SubkategoriPengguna() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <div className="flex w-2/3 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
        {/* main content div */}
        <div className="flex w-[90%] flex-col gap-8">
          {/* header div */}
          <div className="flex w-full flex-row justify-between">
            <h1 className="w-[35%] text-center text-2xl font-bold">
              Nama Subkategori
            </h1>
            <h1 className="w-[35%] text-center text-2xl font-bold">Kategori</h1>
          </div>
          {/* deskripsi */}
          <p className="w-2/3">Deskripsi</p>
          {/* pilihan sesi layanan */}
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Pilihan sesi layanan</h2>
            {/* info daftar sesi layanan */}
            <div className="flex w-[95%] flex-row justify-between items-center rounded-lg border-2 border-black p-2">
              {/* sesi layanan dan harga */}
              <p>Sesi layanan | Harga</p>
              {/* button pesan */}
              <button className="rounded-md bg-green-800 px-2 py-1 text-white">
                Pesan
              </button>
            </div>
          </div>
          {/* daftar pekerja */}
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Pekerja</h2>
            <div className="flex w-[95%] flex-row gap-4">
              <button className="min-h-6 w-[10%] rounded-md bg-green-800 px-2 py-1 text-white">
                Nama pekerja 1
              </button>
            </div>
          </div>
          {/* testimoni */}
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Testimoni</h2>
            <div className="flex w-[95%] flex-row justify-between items-center rounded-lg border-2 border-black p-2">
              lol
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
