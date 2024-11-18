import { useState } from 'react'

export default function SesiLayanan({ sesiLayanan, harga }) {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    // info daftar sesi layanan
    <div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">
      {/* sesi layanan dan harga */}
      <p>
        {sesiLayanan} | {harga}
      </p>
      {/* button pesan */}
      <button
        onClick={toggleModal}
        className="rounded-md bg-green-800 px-2 py-1 text-white"
      >
        Pesan
      </button>

      {modal && (
        <div className="fixed bottom-0 left-0 right-0 top-0">
          <div
            onClick={toggleModal}
            className="h-[100vh] w-[100vw] bg-gray-600 opacity-70"
          ></div>
          <div className="absolute left-[30%] top-1/3 flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
            <h1 className="text-2xl font-bold">Pemesanan Jasa</h1>
            {/* content container dibagi jadi 2 */}
            <div className="flex w-[90%] flex-row justify-center">
              {/* left container */}
              <div className="flex w-1/2 flex-col justify-center gap-2">
                <p>Tanggal pemesanan:</p>
                <p>Diskon:</p>
                <p>Total pembayaran:</p>
                <p>Metode pembayaran:</p>
              </div>
              {/* right container */}
              <div className="flex w-1/2 flex-col justify-center gap-2">
                <p>Tanggal nay disini</p>
                <input
                  type="text"
                  placeholder="Kode diskon"
                  className="w-2/3 border-2 px-1"
                ></input>
                <p>Rpx.xxx.xxx</p>
                <select id="nama-bank">
                  <option value="" disabled selected>
                    Pilih bank
                  </option>
                  <option value="gopay">GoPay</option>
                  <option value="ovo">OVO</option>
                  <option value="va_bca">Virtual Account BCA</option>
                  <option value="va_bni">Virtual Account BNI</option>
                  <option value="va_mandiri">Virtual Account Mandiri</option>
                </select>
              </div>
            </div>
            <input
              type="submit"
              value="Pesan"
              className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white"
            ></input>
          </div>
        </div>
      )}
    </div>
  )
}
