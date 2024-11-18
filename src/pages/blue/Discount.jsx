export default function Diskon() {
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
  
    // Handle buy button click
    const handleBuy = (code) => {
      alert(`Voucher ${code} purchased!`);
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
      </div>
    );
  }
  