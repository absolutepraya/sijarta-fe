import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/dialog';

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
      status: 'Completed'
    },
    {
      id: 2,
      subcategory: 'Deep Cleaning',
      session: 'Extended Session',
      price: 'Rp 250.000',
      worker: 'Budi',
      status: 'In Progress'
    },
    {
      id: 3,
      subcategory: 'Basic Cleaning',
      session: 'Quick Session',
      price: 'Rp 100.000',
      worker: 'Charlie',
      status: 'Scheduled'
    }
  ];

  const handleSubmitTestimonial = () => {
    // Here you would typically handle the submission to your backend
    console.log({ rating: selectedRating, comment });
    setShowTestimonialForm(false);
    setComment('');
    setSelectedRating(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Search and Filter Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex gap-4">
          <select className="w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Subkategori</option>
            <option>Premium Cleaning</option>
            <option>Deep Cleaning</option>
            <option>Basic Cleaning</option>
          </select>
          <select className="w-48 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Status Pesanan</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Scheduled</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subkategori Jasa</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Sesi Layanan</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Harga</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nama Pekerja</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{service.subcategory}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{service.session}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{service.price}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{service.worker}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      service.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {service.status === 'Completed' && (
                    <button
                      onClick={() => setShowTestimonialForm(true)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
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
      <Dialog open={showTestimonialForm} onOpenChange={setShowTestimonialForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Form Testimoni</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rating:</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Komentar:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tulis komentar Anda di sini..."
              />
            </div>
            <button
              onClick={handleSubmitTestimonial}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}