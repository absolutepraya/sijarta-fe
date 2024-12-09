import NavBar from "../../components/NavBar"

export default function ViewPekerja() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <NavBar
				isLoggedIn={true}
				role="Pengguna"
				name="John Doe"
			/>
      <div className="flex w-2/5 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
        <h1 className="text-2xl font-bold">PROFIL PEKERJA</h1>
        <img src="meme"/>
        <div className="w-[90%] flex flex-col gap-2">
          <p>Nama: User 7</p>
          <p>Rating: 4.5/5</p>
          <p>Jumlah pesanan selesai: 50</p>
          <p>No. HP: 081234567896</p>
          <p>Tanggal lahir: 2002-07-07</p>
          <p>Alamat: Alamat 7</p>
        </div>
      </div>
    </div>
  )
}