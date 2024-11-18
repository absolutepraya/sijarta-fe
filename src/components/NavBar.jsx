export default function NavBar({ isLoggedIn, role, name }) {
  return (
    <nav className="fixed bg-green-800 shadow-lg top-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <a href="/" className="text-white text-2xl font-bold">
            SIJARTA
          </a>
          {/* Navbar Links */}
          <ul className="flex items-center space-x-6 text-white">
            {!isLoggedIn ? (
              // Navbar untuk Guest
              <>
                <li>
                  <a
                    href="/login"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Register
                  </a>
                </li>
              </>
            ) : role === "Pengguna" ? (
              // Navbar untuk Pengguna
              <>
                <li>
                  <span className="font-semibold">
                    Role: {role} | {name}
                  </span>
                </li>
                <li>
                  <a
                    href="/homepage"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Homepage
                  </a>
                </li>
                <li>
                  <a
                    href="/mypay"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    MyPay
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Kelola Pesanan Saya
                  </a>
                </li>
                <li>
                  <a
                    href="/discounts"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Diskon
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : role === "Pekerja" ? (
              // Navbar untuk Pekerja
              <>
                <li>
                  <span className="font-semibold">
                    Role: {role} | {name}
                  </span>
                </li>
                <li>
                  <a
                    href="/homepage"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Homepage
                  </a>
                </li>
                <li>
                  <a
                    href="/manage-jobs"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Kelola Pekerjaan Saya
                  </a>
                </li>
                <li>
                  <a
                    href="/manage-status"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Kelola Status Pekerjaan
                  </a>
                </li>
                <li>
                  <a
                    href="/mypay"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    MyPay
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="hover:bg-green-700 rounded px-4 py-2"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
