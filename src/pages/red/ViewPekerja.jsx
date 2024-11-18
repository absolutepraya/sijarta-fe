export default function ViewPekerja() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <div className="flex w-2/5 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
        <h1 className="text-2xl font-bold">PROFIL PEKERJA</h1>
        <img src="meme"/>
        <div className="w-[90%] flex flex-col gap-2">
          <p>Nama: abhiseka</p>
          <p>Rating: 9/10</p>
          <p>Jumlah pesanan selesai: 20</p>
          <p>No. HP: 08123456789</p>
          <p>Tanggal lahir: 06/01/2006</p>
          <p>Alamat: Jl. Ambasing</p>
        </div>
      </div>
    </div>
  )
}