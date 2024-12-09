import axios from 'axios';
import { useEffect, useState } from 'react'

// URL BE
const URL = 'http://localhost:5000/';

export default function SesiLayanan({ sesiLayanan, harga, idkategorijasa, idpelanggan }) {
  let tglSkrg = new Date();

  const [discountInput, setDiscountInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [totalPrice, setTotalPrice] = useState(harga);
  const [selectedMetodeBayar, setSelectedMetodeBayar] = useState('');
  const [submitError, setSubmitError] = useState('');

  const discountHandler = async () => {
    // Reset states
    setDiscountError('');
    
    try {
      const response = await axios.get(URL + `green/check-discount`, {
        params: {
          code: discountInput,
          amount: harga
        }
      });
      
      const { kode, potongan, mintrpemesanan} = response.data;      
      
      if (kode) {
        if (harga >= mintrpemesanan) {
          // Calculate discounted price
          setTotalPrice(harga - potongan);
        } else {
          setDiscountError(`Minimal pembelian Rp${mintrpemesanan} untuk menggunakan kode ini`);
        }
      } else {
        setDiscountError('Kode diskon tidak valid');
      }
    } catch (error) {
      console.error('Error checking discount:', error);
      setDiscountError('Terjadi kesalahan saat memeriksa kode diskon');
    }
  };

  // get metode bayar
  const [metodeBayar, setMetodeBayar] = useState([]);
  const getMetodeBayar = () => {
    axios
      .get(URL + 'green/get-metode-bayar')
      .then((res) => {
        setMetodeBayar(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  useEffect(() => {
    getMetodeBayar();
  }, []);

  // modal handler
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
    // Reset form state when closing modal
    if (!modal) {
      setSubmitError('');
      setSelectedMetodeBayar('');
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!selectedMetodeBayar) {
      setSubmitError('Silakan pilih metode pembayaran');
      return;
    }

    try {
      const response = await axios.post(URL + 'green/insert-pemesanan-jasa', {
        tanggal: `${tglSkrg.getFullYear()}-${tglSkrg.getMonth()+1}-${tglSkrg.getDate()}`,
        idpelanggan,
        idkategorijasa,
        totalHarga: totalPrice,
        metodeBayar: selectedMetodeBayar,
      });

      if (response.data.success) {
        // Close modal and show success message
        toggleModal();
        alert('Pemesanan berhasil!');
      } else {
        setSubmitError('Gagal melakukan pemesanan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError('Terjadi kesalahan saat memproses pemesanan');
    }
  };

  return (
    // info daftar sesi layanan
    <div className="flex w-[95%] flex-row items-center justify-between rounded-lg border-2 border-black p-2">
      {/* sesi layanan dan harga */}
      <p>
        Sesi {sesiLayanan} | {harga}
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
                <p>{tglSkrg.getDate()}/{tglSkrg.getMonth()+1}/{tglSkrg.getFullYear()} </p>
                <input
                  type="text"
                  placeholder="Kode diskon"
                  className="w-2/3 border-2 px-1"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                ></input>
                <div className='flex flex-row gap-2'>
                  <button 
                    onClick={discountHandler}
                    className="w-1/2 text-sm bg-green-600 text-white rounded px-2 py-1"
                  >
                    Cek Diskon
                  </button>
                  {discountError && (
                    <p className="text-red-500 text-xs">{discountError}</p>
                  )}
                </div>
                <p>Rp{totalPrice}</p>
                <select 
                  id="nama-bank"
                  value={selectedMetodeBayar}
                  onChange={(e) => setSelectedMetodeBayar(e.target.value)}
                  className={submitError && !selectedMetodeBayar ? 'border-red-500' : ''}
                >
                  <option value="" disabled>
                    Pilih bank
                  </option>
                  {metodeBayar.map((methods, index) => (
                    <option key={index} value={methods.nama}>{methods.nama}</option>
                  ))}
                </select>
              </div>
            </div>
            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            <button
              onClick={handleSubmit}
              className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white"
            >
              Pesan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}