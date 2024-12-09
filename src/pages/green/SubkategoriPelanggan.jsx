import { useState } from 'react'
import SesiLayanan from '../../components/SesiLayanan'
import PekerjaButton from '../../components/PekerjaButton'
import NavBar from '../../components/NavBar'

export default function SubkategoriPengguna() {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <NavBar isLoggedIn={true} role="Pengguna" name="John Doe" />
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
            <SesiLayanan sesiLayanan="pagi" harga={20000} />
            <SesiLayanan sesiLayanan="malam" harga={15000} />
          </div>
          {/* daftar pekerja */}
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Pekerja</h2>
            <div className="flex w-[95%] flex-row gap-4">
              <PekerjaButton namaPekerja="Azril" />
              <PekerjaButton namaPekerja="Rusdi" />
            </div>
          </div>
          {/* testimoni */}
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-lg font-bold">Testimoni</h2>
            <div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">
              lol
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
