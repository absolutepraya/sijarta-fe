import axios from 'axios';
import { useEffect, useState } from 'react';
import KategoriHomepage from '../../components/KategoriHomepage';
import NavBar from '../../components/NavBar';

// URL BE
const URL = 'http://localhost:5000/';

export default function Homepage({ isPekerja = false }) {
  // State to hold fetched categories
  const [kategoriJasa, setKategoriJasa] = useState([]);
  
  // Fetch categories from the backend
  const homeDropdown = () => {
    axios
      .get(URL + 'green/daftar-kategori') // Make a GET request
      .then((res) => {
        // Set the categories in state
        setKategoriJasa(res.data); // Assuming res.data is an array of categories
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Use useEffect to call homeDropdown when the component mounts
  useEffect(() => {
    homeDropdown(); // Call the function once when the page loads
  }, []);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-300">
      <NavBar
        isLoggedIn={true}
        role={isPekerja ? 'Pekerja' : 'Pengguna'}
        name="John Doe"
      />
      <div className="flex w-3/4 flex-col items-center justify-center gap-8 rounded-lg bg-white py-8 shadow-lg">
        {/* header div */}
        <div className="flex w-[90%] flex-row justify-between gap-6">
          {/* kategori dropdown */}
          <select className="w-1/5 rounded-md px-3">
            <option value="" disabled selected>
              Pilih kategori
            </option>
            {/* Map over categories to create dropdown options */}
            {kategoriJasa.map((kategori, index) => (
              <option key={index} value={kategori.idkategorijasa || kategori.namakategori}>
                {kategori.namakategori}
              </option>
            ))}
          </select>
          {/* nama subkategori */}
          <h1 className="w-1/5 text-center text-2xl font-bold">Subkategori</h1>
          {/* search bar */}
          <input
            type="text"
            placeholder="Search"
            className="w-1/5 rounded-md border-2 p-1 px-3"
          ></input>
        </div>

        {/* content div */}
				{kategoriJasa.map((kategori, index) => (
					<div className="flex w-[90%] flex-col items-center gap-6">
						<KategoriHomepage
							kategoriName={kategori.namakategori}
							subkategoriList={kategori.listsubkategori}
						/>
					</div>
				))}
      </div>
    </div>
  );
}
