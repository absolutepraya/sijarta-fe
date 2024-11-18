import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../../components/dialog";

const Diskon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    status: 'success',
    voucher: ''
  });

  // Mock data
  const vouchers = [
    {
      code: 'VCHR10',
      discount: '10%',
      minOrder: 'Rp 100,000',
      duration: '7 days',
      usageQuota: '50 uses',
      price: 'Rp 10,000',
    },
    {
      code: 'VCHR20',
      discount: '20%',
      minOrder: 'Rp 200,000',
      duration: '14 days',
      usageQuota: '30 uses',
      price: 'Rp 15,000',
    },
  ];

  const promos = [
    {
      code: 'PROMO1',
      expiryDate: '2024-12-31',
    },
    {
      code: 'PROMO2',
      expiryDate: '2025-01-15',
    },
  ];

  const checkBalance = () => {
    return Math.random() > 0.5;
  };

  const handleBuy = (code) => {
    const hasBalance = checkBalance();
    setModalContent({
      status: hasBalance ? 'success' : 'failed',
      voucher: code
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Diskon
      </h1>

      {/* Vouchers Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Voucher</h2>
        <div className="space-y-4">
          {vouchers.map((voucher, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 grid grid-cols-6 gap-4 items-center"
            >
              <div>
                <span className="font-bold">Kode:</span> {voucher.code}
              </div>
              <div>
                <span className="font-bold">Potongan:</span> {voucher.discount}
              </div>
              <div>
                <span className="font-bold">Min Transaksi:</span> {voucher.minOrder}
              </div>
              <div>
                <span className="font-bold">Durasi:</span> {voucher.duration}
              </div>
              <div>
                <span className="font-bold">Harga:</span> {voucher.price}
              </div>
              <button
                onClick={() => handleBuy(voucher.code)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300"
              >
                Beli
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Promo</h2>
        <div className="space-y-4">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <span className="font-bold">Kode:</span> {promo.code}
              </div>
              <div>
                <span className="font-bold">Tanggal Berakhir:</span>{' '}
                {promo.expiryDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styled Purchase Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-t-lg">
          <DialogTitle className="text-white text-xl font-bold text-center">
            {modalContent.status === 'success' ? 'SUKSES' : 'GAGAL'}
          </DialogTitle>
        </DialogHeader>
        <DialogContent className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-b-lg">
          <div className="text-center py-6">
            {modalContent.status === 'success' ? (
              <div className="space-y-2">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <p className="text-gray-800 font-semibold">Selamat! Anda berhasil</p>
                <p className="text-gray-800 font-semibold">membeli voucher kode <span className="text-purple-600 font-bold">{modalContent.voucher}</span>.</p>
                <p className="text-gray-800 font-semibold">Voucher ini akan berlaku</p>
                <p className="text-gray-800 font-semibold">hingga tanggal XX/XX/XXXX</p>
                <p className="text-gray-800 font-semibold">dengan kuota penggunaan</p>
                <p className="text-gray-800 font-semibold">sebanyak X kali.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-red-600 text-6xl mb-4">✕</div>
                <p className="text-gray-800 font-semibold">Maaf, saldo Anda tidak cukup</p>
                <p className="text-gray-800 font-semibold">untuk membeli voucher ini.</p>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:scale-105 transform transition duration-300"
            >
              Tutup
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Diskon;