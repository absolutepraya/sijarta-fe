import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegisterPekerja() {
    const [formData, setFormData] = useState({
        nama: '',
        nohp: '',
        password: '',
        tglLahir: '',
        gender: '',
        alamat: '',
        bank: '',
        nomorRekening: '',
        npwp: '',
        urlFoto: '',
    });

    useEffect(() => {
        // Check if user is already logged in
        if (sessionStorage.getItem('id')) {
            window.location.href = '/home';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const { nama, nohp, password, tglLahir, gender, alamat, bank, nomorRekening, npwp, urlFoto } = formData;

        // Validasi data di frontend
        if (!nama || !nohp || !password || !tglLahir || !gender || !alamat || !bank || !nomorRekening || !npwp || !urlFoto) {
            alert('Semua field harus diisi!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/yellow/register/pekerja', null, {
                params: formData,
            });
            alert(response.data);
            window.location.href = '/login';
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat registrasi!');
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
            <div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
                <h1 className="text-xl font-bold">Register</h1>
                <input
                    type="text"
                    name="nama"
                    placeholder="Nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <input
                    type="tel"
                    name="nohp"
                    placeholder="Nomor handphone"
                    value={formData.nohp}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <div className="flex w-1/2 flex-col">
                    <label htmlFor="tglLahir" className="text-sm font-semibold">
                        Tanggal Lahir
                    </label>
                    <input
                        type="date"
                        id="tglLahir"
                        name="tglLahir"
                        value={formData.tglLahir}
                        onChange={handleChange}
                        className="w-full rounded-md border-2 p-2"
                    />
                </div>
                <div className="flex flex-row items-center gap-4">
                    <input
                        type="radio"
                        id="laki"
                        name="gender"
                        value="L"
                        checked={formData.gender === 'L'}
                        onChange={handleChange}
                        className="w-1/3 border-2 p-1"
                    />
                    <label htmlFor="laki">Lelaki</label>
                    <input
                        type="radio"
                        id="perempuan"
                        name="gender"
                        value="P"
                        checked={formData.gender === 'P'}
                        onChange={handleChange}
                        className="w-1/3 border-2 p-1"
                    />
                    <label htmlFor="perempuan">Perempuan</label>
                </div>
                <input
                    type="text"
                    name="alamat"
                    placeholder="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <select
                    id="nama-bank"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                >
                    <option value="" disabled>
                        Pilih bank
                    </option>
                    <option value="gopay">GoPay</option>
                    <option value="ovo">OVO</option>
                    <option value="va_bca">Virtual Account BCA</option>
                    <option value="va_bni">Virtual Account BNI</option>
                    <option value="va_mandiri">Virtual Account Mandiri</option>
                </select>
                <input
                    type="text"
                    name="nomorRekening"
                    placeholder="No Rekening"
                    value={formData.nomorRekening}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <input
                    type="text"
                    name="npwp"
                    placeholder="NPWP"
                    value={formData.npwp}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <input
                    type="url"
                    name="urlFoto"
                    placeholder="URL Foto"
                    value={formData.urlFoto}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
                <button
                    onClick={handleSubmit}
                    className="w-1/3 rounded-md bg-green-800 p-2 font-bold text-white"
                >
                    Register
                </button>
            </div>
        </div>
    );
}
