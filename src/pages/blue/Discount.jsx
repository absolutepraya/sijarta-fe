// Diskon.jsx
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import axios from 'axios'; 

const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-lg w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

const DialogContent = ({ children }) => {
    return <div className="p-6">{children}</div>;
};

const DialogHeader = ({ children }) => {
    return <div className="p-4 border-b border-gray-300 font-semibold">{children}</div>;
};

const DialogTitle = ({ children }) => {
    return <h2 className="text-xl text-gray-800">{children}</h2>;
};

const Diskon = () => {
    const userId = sessionStorage.getItem('id');
    const nohp = sessionStorage.getItem('nohp');
    const nama = sessionStorage.getItem('nama');
    const role = sessionStorage.getItem('role');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        status: 'success',
        voucher: '',
        tglAkhir: '',
        kuota: 0,
    });
    const [vouchers, setVouchers] = useState([]);
    const [promos, setPromos] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('MyPay'); // Default payment method
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    

    // Replace with your API base URL
    const API_BASE_URL = 'http://localhost:5000/blue';

    // Fetch vouchers and promos on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vouchersRes, promosRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/voucher`),
                    axios.get(`${API_BASE_URL}/promo`)
                ]);
                setVouchers(vouchersRes.data);
                setPromos(promosRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Mock user data (Replace this with actual user data from authentication context)
    const user = {
        id: userId,
        name: nama,
        balanceMyPay: 20000 // Example balance
    };

    const handleBuy = (voucher) => {
        setSelectedVoucher(voucher);
        setPaymentMethod('MyPay'); // Reset to default or set based on user preference
        setIsPaymentModalOpen(true);
    };

    const handlePurchase = async () => {
        if (!selectedVoucher) return;

        try {
            // Make a PUT request to purchase the voucher
            const response = await axios.put(`${API_BASE_URL}/voucher`, null, {
                params: {
                    userid: user.id,
                    voucherid: selectedVoucher.kode,
                    paymentMethod: paymentMethod
                }
            });

            console.log(response)

            // Handle success
            setModalContent((prevModalContent) => ({
                ...prevModalContent,
                status: 'success',
                voucher: selectedVoucher.kode,
                tglAkhir: new Date(response.data.voucher.tglakhir).toLocaleDateString(),
                kuota: response.data.voucher.telahdigunakan
            }));
            console.log(modalContent)
        } catch (error) {
            // Handle failure
            setModalContent((prevModalContent) => ({
                ...prevModalContent,
                status: 'failed',
                voucher: selectedVoucher.kode
            }));
        } finally {
            setIsPaymentModalOpen(false);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8 pt-20">
            <NavBar isLoggedIn={true} role="Pengguna" name={user.name} />
            
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
                                <span className="font-bold">Kode:</span> {voucher.kode}
                            </div>
                            <div>
                                <span className="font-bold">Potongan:</span> {voucher.potongan}
                            </div>
                            <div>
                                <span className="font-bold">Min Transaksi:</span> {voucher.mintrpemesanan}
                            </div>
                            <div>
                                <span className="font-bold">Durasi:</span> {voucher.jmlhariberlaku}
                            </div>
                            <div>
                                <span className="font-bold">Harga:</span> {voucher.harga}
                            </div>
                            <button
                                onClick={() => handleBuy(voucher)}
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
                                <span className="font-bold">Kode:</span> {promo.kode}
                            </div>
                            <div>
                                <span className="font-bold">Tanggal Berakhir:</span>{' '}
                                {new Date(promo.tglakhirberlaku).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method Modal */}
            <Dialog isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}>
                <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-t-lg">
                    <DialogTitle className="text-white text-xl font-bold text-center">
                        Pilih Metode Pembayaran
                    </DialogTitle>
                </DialogHeader>
                <DialogContent className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-b-lg">
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold">Metode Pembayaran:</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full mt-2 p-2 border rounded"
                            >
                                <option value="MyPay">MyPay</option>
                                <option value="GoPay">GoPay</option>
                                <option value="OVO">OVO</option>
                                <option value="LinkAja">LinkAja</option>
                                <option value="Dana">Dana</option>
                                <option value="Transfer Bank">Transfer Bank</option>
                                {/* Add other payment methods as needed */}
                            </select>
                        </div>
                        {/* If needed, add more fields based on payment method */}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handlePurchase}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:scale-105 transform transition duration-300"
                        >
                            Konfirmasi Pembelian
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

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
                                <p className="text-gray-800 font-semibold">hingga tanggal {modalContent.tglAkhir}</p>
                                <p className="text-gray-800 font-semibold">dengan kuota penggunaan</p>
                                <p className="text-gray-800 font-semibold">sebanyak {modalContent.kuota} kali.</p>
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
