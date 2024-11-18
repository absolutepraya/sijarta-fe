export default function LandingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      <div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
        <h1 className="text-xl font-bold">SIJARTA by Bust That</h1>
        {/* redirect ke login page */}
        <a
          href="/login"
          className="flex w-3/5 justify-center rounded-lg bg-green-800 py-2 text-white"
        >
          Login
        </a>
        {/* redirect ke register page pilih role */}
        <a
          href="/register"
          className="flex w-3/5 justify-center rounded-lg bg-green-800 py-2 text-white"
        >
          Register
        </a>
      </div>
    </div>
  )
}
