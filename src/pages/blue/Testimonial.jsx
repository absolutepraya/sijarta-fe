// src/pages/Testimonial.js
import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Clock, Award, Users, ThumbsUp, CloudCog } from 'lucide-react';
import { Card, CardContent, Button } from '../../components/CustomerComponents';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import axios from 'axios';
// import { getTestimonials, getServices, getWorkers, postTestimonial } from ''; // Adjust the import based on your API service

export default function Testimonial() {
  const [selectedService, setSelectedService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [services, setServices] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const API_BASE_URL = 'http://localhost:5000/blue';

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const [testimonialsData] = await Promise.all([
          axios.get(`${API_BASE_URL}/testimoni`)
        ]);
        console.log(testimonialsData)
        setTestimonials(testimonialsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const serviceVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  // Function to handle posting a new testimonial
  const handlePostTestimonial = async (newTestimonial) => {
    try {
      const response = await postTestimonial(newTestimonial);
      // Optionally, fetch testimonials again or update state
      setTestimonials([...testimonials, response]);
    } catch (error) {
      console.error('Error posting testimonial:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
      <NavBar isLoggedIn={true} role="Pengguna" name="John Doe" />
      {/* Sticky Header */}
      {/* ... existing code ... */}

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Description */}
        {/* ... existing code ... */}

        {/* Service Sessions */}
        {/* ... existing code ... */}

        {/* Workers */}
        {/* ... existing code ... */}

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Testimoni Pelanggan
          </h2>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg">{testimonial.nama}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.date}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.teks}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <p className="text-gray-600">Pekerja: <span className="font-medium">{testimonial.worker}</span></p>
                      <div className="flex items-center gap-1 text-gray-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{testimonial.likes}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-1 hover:bg-blue-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Balas
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Optional: Form to submit a new testimonial */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Tulis Testimoni Anda</h3>
            <TestimonialForm onSubmit={handlePostTestimonial} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Example TestimonialForm Component
function TestimonialForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    idtrpemesanan: '',
    tgl: '',
    teks: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form or show success message
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="idtrpemesanan"
        placeholder="ID Pemesanan"
        value={formData.idtrpemesanan}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="tgl"
        placeholder="Tanggal"
        value={formData.tgl}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="teks"
        placeholder="Tulis testimoni Anda..."
        value={formData.teks}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </Button>
    </form>
  );
}
