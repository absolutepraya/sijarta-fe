export default function ProfilePengguna() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      {/* container putih bakal dibagi jadi 2 secara horizontal */}
      <div className="flex w-2/5 flex-row items-center justify-center gap-2 rounded-lg bg-white py-8 shadow-lg">
        {/* left sub container */}
        <div className="flex flex-col">
          <p>Nama:</p>
          <p>Level:</p>
          <p>Jenis kelamin:</p>
          <p>No HP:</p>
          <p>Tanggal lahir:</p>
          <p>Alamat:</p>
          <p>Saldo MyPay:</p>
        </div>
        {/* right sub container */}
        <div className="flex flex-col">
          <p>Nama:</p>
          <p>Level:</p>
          <p>Jenis kelamin:</p>
          <p>No HP:</p>
          <p>Tanggal lahir:</p>
          <p>Alamat:</p>
          <p>Saldo MyPay:</p>
          <input
            type="submit"
            value="Update"
            className="w-3/4 rounded-md bg-green-800 p-1 font-bold text-white"
          ></input>
        </div>
      </div>
    </div>
  )
}