import { useEffect } from 'react';

export default function RegisterPage() {
	useEffect(() => {
		// Check if user is already logged in
		if (sessionStorage.getItem('id')) {
			window.location.href = '/home';
		}
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gray-300">
			<div className="flex w-2/5 flex-col items-center justify-center gap-4 rounded-lg bg-white py-8 shadow-lg">
				<h1 className="text-xl font-bold">Role</h1>
				{/* redirect ke pengguna */}
				<a
					href="/register/pelanggan"
					className="flex w-3/5 justify-center rounded-lg bg-green-800 py-2 text-white"
				>
					Pengguna
				</a>
				{/* redirect ke pekerja */}
				<a
					href="/register/pekerja"
					className="flex w-3/5 justify-center rounded-lg bg-green-800 py-2 text-white"
				>
					Pekerja
				</a>
			</div>
		</div>
	);
}
