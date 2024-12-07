export default function LoginPage() {
  return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
				<h1 className="text-xl font-bold">Login</h1>
				{/* input nomor hp */}
				<input
					type="text"
					placeholder="Nomor handphone"
					className="w-1/2 rounded-md border-2 p-2"
				></input>
				{/* input pw */}
				<input
					type="text"
					placeholder="Password"
					className="w-1/2 rounded-md border-2 p-2"
				></input>

				<input
					type="submit"
					value="Sign in"
					className="w-1/3 rounded-md bg-green-800 py-2 font-bold text-white"
				></input>
			</div>
		</div>
  );
}
