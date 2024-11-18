import { useState } from 'react'

export default function SubkategoriPengguna() {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

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
            <div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">
              {/* sesi layanan dan harga */}
              <p>Sesi layanan | Harga</p>
              {/* button pesan */}
              <button
                onClick={toggleModal}
                className="rounded-md bg-green-800 px-2 py-1 text-white"
              >
                Pesan
              </button>
              {/* modal form */}
              {modal && (
                <div className="fixed bottom-0 left-0 right-0 top-0">
                  <div
                    onClick={toggleModal}
                    className="h-[100vh] w-[100vw] bg-gray-600 opacity-70"
                  ></div>
                  <div className="top-1/3 absolute left-[30%] flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
                    <h1 className='text-2xl font-bold'>Pemesanan Jasa</h1>
                    {/* main container dibagi jadi 2 */}
                    <div className='flex flex-row w-[90%] justify-center'>
                      {/* left container */}
                      <div className='w-1/2 flex flex-col gap-2 justify-center'>
                        <p>Tanggal pemesanan:</p>
                        <p>Diskon:</p>
                        <p>Total pembayaran:</p>
                        <p>Metode pembayaran:</p>
                      </div>
                      <div className='w-1/2 flex flex-col gap-2 justify-center'>
                        <p>Tanggal nay disini</p>
                        <input
                          type="text"
                          placeholder="Kode diskon"
                          className="w-2/3 border-2 px-1"
                        ></input>
                        <p>Rpx.xxx.xxx</p>
                        <select id="nama-bank">
                          <option value="" disabled selected>Pilih bank</option>
                          <option value="gopay">GoPay</option>
                          <option value="ovo">OVO</option>
                          <option value="va_bca">Virtual Account BCA</option>
                          <option value="va_bni">Virtual Account BNI</option>
                          <option value="va_mandiri">Virtual Account Mandiri</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
            <div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">
              lol
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
