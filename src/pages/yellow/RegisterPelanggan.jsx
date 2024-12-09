import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RegisterPengguna() {
    const [formData, setFormData] = useState({
        nama: '',
        nohp: '',
        password: '',
        tglLahir: '',
        gender: '',
        alamat: '',
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
        const { nama, nohp, password, tglLahir, gender, alamat } = formData;

        // Validasi data di frontend
        if (!nama || !nohp || !password || !tglLahir || !gender || !alamat) {
            alert('Semua field harus diisi!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/yellow/register/pengguna', null, {
                params: formData,
            });
            alert(response.data);
            window.location.href = '/login'; // Redirect ke halaman login setelah registrasi berhasil
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
                <label className="w-1/2 text-left text-gray-600">Tanggal Lahir:</label>
                <input
                    type="date"
                    name="tglLahir"
                    placeholder="Tanggal Lahir"
                    value={formData.tglLahir}
                    onChange={handleChange}
                    className="w-1/2 rounded-md border-2 p-2"
                />
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
                <button
                    onClick={handleSubmit}
                    className="w-1/3 rounded-md bg-green-800 p-1 font-bold text-white"
                >
                    Register
                </button>
            </div>
        </div>
    );
}
