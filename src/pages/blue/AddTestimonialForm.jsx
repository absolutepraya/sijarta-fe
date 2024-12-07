import React, { useState } from 'react';
import { Star, Search, MessageCircle } from 'lucide-react';
import NavBar from '../../components/NavBar';

function Dialog({ open, onOpenChange, children }) {
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={() => onOpenChange(false)}
		>
			<div
				className="relative w-full max-w-lg rounded-lg bg-white shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
				<button
					onClick={() => onOpenChange(false)}
					className="absolute right-2 top-2 rounded-full bg-gray-200 w-8 h-8 hover:bg-gray-300"
				>
					✕
				</button>
			</div>
		</div>
	);
}

function DialogContent({ children, className }) {
	return <div className={`p-4 ${className}`}>{children}</div>;
}

function DialogHeader({ children }) {
	return <div className="p-4 font-semibold">{children}</div>;
}

function DialogTitle({ children }) {
	return <h2 className="text-xl text-gray-800">{children}</h2>;
}

export default function AddTestimonialForm() {
	const [showTestimonialForm, setShowTestimonialForm] = useState(false);
	const [selectedRating, setSelectedRating] = useState(1);
	const [comment, setComment] = useState('');

	const services = [
		{
			id: 1,
			subcategory: 'Premium Cleaning',
			session: 'Regular Session',
			price: 'Rp 150.000',
			worker: 'Ahmad',
			status: 'Completed',
		},
		{
			id: 2,
			subcategory: 'Deep Cleaning',
			session: 'Extended Session',
			price: 'Rp 250.000',
			worker: 'Budi',
			status: 'In Progress',
		},
		{
			id: 3,
			subcategory: 'Basic Cleaning',
			session: 'Quick Session',
			price: 'Rp 100.000',
			worker: 'Charlie',
			status: 'Scheduled',
		},
	];

	const handleSubmitTestimonial = () => {
		console.log({ rating: selectedRating, comment });
		setShowTestimonialForm(false);
		setComment('');
		setSelectedRating(1);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
			<NavBar
				isLoggedIn={true}
				role="Pengguna"
				name="John Doe"
			/>
			<div className="mx-auto max-w-4xl space-y-8 p-6">
				{/* Search and Filter Section */}
				<div className="space-y-4 rounded-xl bg-white/90 p-6 shadow-lg backdrop-blur-sm">
					<h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-semibold text-transparent">Filter Layanan</h2>
					<div className="grid grid-cols-3 gap-4">
						<div className="col-span-2 flex gap-4">
							<select className="w-48 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 text-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>Subkategori</option>
								<option>Premium Cleaning</option>
								<option>Deep Cleaning</option>
								<option>Basic Cleaning</option>
							</select>
							<select className="w-48 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 text-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option>Status Pesanan</option>
								<option>Completed</option>
								<option>In Progress</option>
								<option>Scheduled</option>
							</select>
						</div>
						<div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-blue-400">
							<Search className="h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search"
								className="flex-1 bg-transparent text-sm focus:outline-none"
							/>
						</div>
					</div>
				</div>

				{/* Services Table */}
				<div className="overflow-hidden rounded-xl bg-white/90 shadow-lg backdrop-blur-sm">
					<table className="w-full">
						<thead className="bg-gradient-to-r from-blue-600/10 to-purple-600/10">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subkategori Jasa</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sesi Layanan</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Harga</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama Pekerja</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{services.map((service) => (
								<tr
									key={service.id}
									className="transition-colors hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
								>
									<td className="px-6 py-4 text-sm text-gray-700">{service.subcategory}</td>
									<td className="px-6 py-4 text-sm text-gray-700">{service.session}</td>
									<td className="text-nowrap bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text px-6 py-4 text-sm font-medium text-transparent">{service.price}</td>
									<td className="px-6 py-4 text-sm text-gray-700">{service.worker}</td>
									<td className="px-6 py-4 text-sm">
										<span className={`inline-flex items-center text-nowrap rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${service.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : service.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'}`}>{service.status}</span>
									</td>
									<td className="px-6 py-4 text-sm">
										{service.status === 'Completed' && (
											<button
												onClick={() => setShowTestimonialForm(true)}
												className="inline-flex items-center gap-2 text-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
											>
												<MessageCircle className="h-4 w-4" />
												Buat Testimoni
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Testimonial Form Dialog */}
				<Dialog
					open={showTestimonialForm}
					onOpenChange={setShowTestimonialForm}
				>
					<DialogContent className="bg-white/90 backdrop-blur-sm rounded-lg">
						<DialogHeader>
							<DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-semibold text-transparent">Form Testimoni</DialogTitle>
						</DialogHeader>
						<div className="space-y-2 p-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">Rating:</label>
								<div className="flex gap-2">
									{[1, 2, 3, 4, 5].map((num) => (
										<button
											key={num}
											onClick={() => setSelectedRating(num)}
											className="p-1 transition-transform hover:scale-110"
										>
											<Star className={`h-6 w-6 ${num <= selectedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
										</button>
									))}
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">Komentar:</label>
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="h-32 w-full rounded-lg border border-gray-200 bg-white/90 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Tulis komentar Anda di sini..."
								/>
							</div>
							<button
								onClick={handleSubmitTestimonial}
								className="w-full rounded-lg !mt-6 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
							>
								Submit Testimoni
							</button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
